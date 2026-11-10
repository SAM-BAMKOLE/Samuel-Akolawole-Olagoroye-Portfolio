import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TOPICS = ["Fullstack project", "Frontend / UI", "Backend / API", "Job opportunity", "Something else"];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const startedAt = useRef(0);
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          website: fd.get("website"), // honeypot, humans leave it empty
          type: topic,
          t: Date.now() - startedAt.current,
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || "Something went wrong. Please try again.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex min-h-[26rem] flex-col items-start justify-center gap-6">
        <span className="grid size-16 place-items-center rounded-full bg-brand text-white"><Check className="size-7" strokeWidth={2} /></span>
        <h3 className="display h-md">Message sent. <span className="serif-i text-brand">Thank you!</span></h3>
        <p className="max-w-md opacity-70">I'll reply to your email, usually within 1–2 working days.</p>
        <button type="button" onClick={() => { setStatus("idle"); startedAt.current = Date.now(); }} className="u-line text-sm font-medium">
          Send another message
        </button>
      </div>
    );
  }

  const label = "eyebrow !text-current opacity-60";

  return (
    <form onSubmit={onSubmit} noValidate={false} className="space-y-9" aria-describedby={status === "error" ? "form-error" : undefined}>
      <fieldset>
        <legend className={cn(label, "mb-4")}>What's it about?</legend>
        <div className="flex flex-wrap gap-2.5">
          {TOPICS.map((t, i) => (
            <div key={t} className="relative">
              <input type="radio" name="topic" id={`topic-${i}`} value={t} checked={topic === t} onChange={() => setTopic(t)} className="peer sr-only" />
              <label
                htmlFor={`topic-${i}`}
                className="pill cursor-pointer select-none !bg-transparent text-sm transition-all duration-300 hover:border-current peer-checked:border-brand peer-checked:!bg-brand peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-brand"
              >
                {t}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-9 md:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Your name</label>
          <Input id="cf-name" name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Jane Doe" />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Email</label>
          <Input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" placeholder="jane@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={label}>Message</label>
        <Textarea id="cf-message" name="message" required minLength={10} maxLength={3000} rows={4} placeholder="Tell me about the project, timeline and goals…" />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      {status === "error" && (
        <p id="form-error" role="alert" className="rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm">
          {error} <a className="u-line font-medium" href={`mailto:${email}`}>{email}</a>
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <button type="submit" disabled={status === "sending"} data-magnetic className={cn(buttonVariants({ size: "lg", variant: "brand" }), "min-w-44")}>
          {status === "sending" ? <><Loader2 className="animate-spin" /> Sending…</> : <>Send message <ArrowUpRight /></>}
        </button>
        <p className="max-w-[28ch] text-xs leading-snug opacity-60">
          Your details are used only to reply to you. See the Privacy policy below.
        </p>
      </div>
    </form>
  );
}
