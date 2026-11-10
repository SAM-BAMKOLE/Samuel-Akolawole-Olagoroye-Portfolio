import type { APIRoute } from "astro";
import { APPS_SCRIPT_URL, APPS_SCRIPT_SECRET } from "astro:env/server";

// Runs on the server only. The browser talks to THIS endpoint, never to Google.
// This endpoint forwards to a private Google Apps Script web app that writes the
// Google Sheet and sends the notification email. URL + secret live in env vars.
export const prerender = false;

const TYPES = ["Fullstack project", "Frontend / UI", "Backend / API", "Job opportunity", "Something else"];
const json = (body: object, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

// Best-effort rate limit (per server instance): 3 messages / 10 min / IP.
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 3) { hits.set(ip, recent); return true; }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const clean = (v: unknown, max: number) =>
  String(v ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Same-site requests only
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ ok: false, error: "Forbidden" }, 403);

  if (!(request.headers.get("content-type") ?? "").includes("application/json")) return json({ ok: false, error: "Bad request" }, 400);
  let b: Record<string, unknown>;
  try { b = await request.json(); } catch { return json({ ok: false, error: "Bad request" }, 400); }

  // Spam traps: hidden honeypot field + "submitted impossibly fast". Pretend success so bots learn nothing.
  if (clean(b.website, 200) !== "" || Number(b.t) < 2500) return json({ ok: true });

  const name = clean(b.name, 100);
  const email = clean(b.email, 200);
  const type = TYPES.includes(String(b.type)) ? String(b.type) : "Something else";
  const message = clean(b.message, 3000);

  if (name.length < 2) return json({ ok: false, error: "Please enter your name." }, 422);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: "Please enter a valid email address." }, 422);
  if (message.length < 10) return json({ ok: false, error: "Your message is a bit short, please add some detail." }, 422);

  if (limited(clientAddress)) return json({ ok: false, error: "Too many messages. Please try again in a few minutes." }, 429);

  if (!APPS_SCRIPT_URL || !APPS_SCRIPT_SECRET) {
    console.error("[contact] APPS_SCRIPT_URL / APPS_SCRIPT_SECRET are not set");
    return json({ ok: false, error: "The form isn't configured yet. Please email me directly." }, 503);
  }

  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // avoids a CORS preflight; Apps Script reads the raw body
      body: JSON.stringify({ secret: APPS_SCRIPT_SECRET, name, email, type, message, source: new URL(request.url).host }),
      redirect: "follow",
      signal: AbortSignal.timeout(15_000),
    });
    const out = await res.json().catch(() => null);
    if (!res.ok || !out?.ok) throw new Error(`Apps Script responded ${res.status}: ${JSON.stringify(out)}`);
    return json({ ok: true });
  } catch (err) {
    console.error("[contact] forward failed:", err);
    return json({ ok: false, error: "Couldn't send your message. Please try again or email me directly." }, 502);
  }
};

// Anything but POST
export const ALL: APIRoute = () => json({ ok: false, error: "Method not allowed" }, 405);
