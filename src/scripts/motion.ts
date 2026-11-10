import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { initLiquid } from "./liquid";

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

/* ---------- Liquid background (visible only in hero + contact) ---------- */
const canvas = $<HTMLCanvasElement>("#liquid");
const liquid = canvas && !reduced ? initLiquid(canvas) : null;
if (liquid) {
  const zones = $$("[data-liquid-zone]");
  const visible = new Set<Element>();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
    liquid.setActive(visible.size > 0);
  });
  zones.forEach((z) => io.observe(z));
}

/* ---------- Smooth scroll (Lenis ↔ ScrollTrigger) ---------- */
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.stop(); // until the loader finishes
}
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href")!;
    if (id.length < 2) return;
    const el = $(id);
    if (!el) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(el, { duration: 1.4 }) : el.scrollIntoView({ behavior: "smooth" });
  }),
);

/* ---------- Per-letter roll hover (text hover #2) ---------- */
$$("[data-roll-chars]").forEach((el) => {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text);
  el.innerHTML = "";
  [...text].forEach((ch, i) => {
    const wrap = document.createElement("span");
    wrap.className = "rc";
    wrap.setAttribute("aria-hidden", "true");
    wrap.style.setProperty("--d", `${i * 18}ms`);
    const glyph = ch === " " ? " " : ch;
    wrap.innerHTML = `<i>${glyph}</i><i>${glyph}</i>`;
    el.appendChild(wrap);
  });
});

/* ---------- Custom cursor ---------- */
if (finePointer && !reduced) {
  const cursor = $(".cursor");
  const label = $(".cursor span");
  if (cursor && label) {
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    addEventListener("pointermove", (e) => { xTo(e.clientX); yTo(e.clientY); }, { passive: true });
    $$("[data-cursor]").forEach((el) => {
      el.addEventListener("pointerenter", () => { label.textContent = el.dataset.cursor ?? ""; cursor.classList.add("is-view"); });
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-view"));
    });
    $$("a, button").forEach((el) => {
      if (el.closest("[data-cursor]")) return;
      el.addEventListener("pointerenter", () => cursor.classList.add("is-link"));
      el.addEventListener("pointerleave", () => cursor.classList.remove("is-link"));
    });
  }

  /* Magnetic buttons */
  $$("[data-magnetic]").forEach((el) => {
    const x = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const y = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.28);
      y((e.clientY - (r.top + r.height / 2)) * 0.28);
    });
    el.addEventListener("pointerleave", () => { x(0); y(0); });
  });
}

/* ---------- Hero intro + loader ---------- */
const heroTitle = $("[data-hero-title]");
const heroSplit = heroTitle && !reduced ? SplitText.create(heroTitle, { type: "lines", mask: "lines" }) : null;
const heroBits = $$("[data-hero-in]");

function playHero() {
  if (!heroSplit) return;
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.to(heroSplit.lines, { yPercent: 0, duration: 1.4, stagger: 0.09 }, 0)
    .to(heroBits, { y: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 0.25)
    .to(".hero-img", { y: 0, rotate: (i) => (i === 0 ? -6 : 5), opacity: 1, duration: 1.6, stagger: 0.14 }, 0.3);
}

if (reduced) {
  $(".loader")?.remove();
} else {
  gsap.set(heroSplit!.lines, { yPercent: 115 });
  gsap.set(heroBits, { y: 30, opacity: 0 });
  gsap.set(".hero-img", { y: 120, opacity: 0, rotate: 0 });
  gsap.set(".site-header", { yPercent: -120 });

  const count = $(".loader-count");
  const counter = { v: 0 };
  gsap
    .timeline()
    .to(counter, {
      v: 100, duration: 1.6, ease: "power2.inOut",
      onUpdate: () => { if (count) count.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
    })
    .to(".loader-inner", { yPercent: -30, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.1")
    .to(".loader", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "<0.2")
    .add(() => { lenis?.start(); playHero(); }, "-=0.5")
    .to(".site-header", { yPercent: 0, duration: 1.1, ease: "expo.out" }, "<0.2")
    .set(".loader", { display: "none" });
}

if (!reduced) {
  /* ---------- Scroll progress + header hide/show ---------- */
  gsap.to("#progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.2 } });
  const header = $(".site-header");
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: (self) => header?.classList.toggle("is-hidden", self.direction === 1 && self.scroll() > 240),
  });

  /* ---------- Heading line-mask reveals ---------- */
  $$("[data-lines]").forEach((el) => {
    const split = SplitText.create(el, { type: "lines", mask: "lines" });
    gsap.from(split.lines, {
      yPercent: 110, duration: 1.2, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });

  /* ---------- Generic fade-up ---------- */
  $$("[data-reveal]").forEach((el) =>
    gsap.from(el, { y: 44, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }),
  );

  /* ---------- Scrubbed word-by-word statement ---------- */
  const scrub = $("[data-scrub]");
  if (scrub) {
    const split = SplitText.create(scrub, { type: "words" });
    gsap.fromTo(split.words, { opacity: 0.12 }, {
      opacity: 1, stagger: 0.12, ease: "none",
      scrollTrigger: { trigger: scrub, start: "top 78%", end: "bottom 50%", scrub: true },
    });
  }

  /* ---------- Count-up stats ---------- */
  $$("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const o = { v: 0 };
    gsap.to(o, {
      v: end, duration: 2, ease: "power3.out",
      onUpdate: () => (el.textContent = String(Math.round(o.v))),
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
    });
  });

  /* ---------- Projects: clip reveal + image parallax ---------- */
  $$(".project").forEach((card) => {
    const media = $(".project-media", card);
    const image = $("img", card);
    if (!media || !image) return;
    gsap.fromTo(media, { clipPath: "inset(100% 0 0 0)" }, {
      clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "expo.out",
      scrollTrigger: { trigger: card, start: "top 85%" },
    });
    gsap.fromTo(image, { scale: 1.3, yPercent: -9 }, {
      scale: 1.3, yPercent: 9, ease: "none",
      scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
    });
    gsap.from($$(".project-meta > *", card), {
      y: 30, opacity: 0, duration: 1, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: card, start: "top 70%" },
    });
  });

  /* ---------- Services: stacking cards that scale back ---------- */
  const cards = $$(".stack-card");
  cards.forEach((card, i) => {
    const next = cards[i + 1];
    if (!next) return;
    gsap.to(card, {
      scale: 0.93, yPercent: -2, filter: "brightness(0.9)", ease: "none",
      scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
    });
  });

  /* ---------- Marquees reacting to scroll velocity ---------- */
  const tweens = $$(".marquee").map((m, i) => {
    const track = $(".marquee__track", m)!;
    return gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 38, ease: "none", repeat: -1 });
  });
  let boost = 0, targetBoost = 0;
  ScrollTrigger.create({ onUpdate: (s) => (targetBoost = Math.min(Math.abs(s.getVelocity()) / 260, 7)) });
  gsap.ticker.add(() => {
    boost += (targetBoost - boost) * 0.08;
    targetBoost *= 0.92;
    tweens.forEach((t) => t.timeScale(1 + boost));
  });

  /* ---------- Contact: liquid → dark palette ---------- */
  const contact = $("#contact");
  if (contact && liquid) {
    ScrollTrigger.create({
      trigger: contact, start: "top 60%", end: "bottom top",
      onEnter: () => {
        gsap.to(liquid.state, { dark: 1, duration: 1.2, ease: "power2.inOut" });
        gsap.to(contact, { color: "#f2f0eb", duration: 1, ease: "power2.inOut" });
      },
      onLeaveBack: () => {
        gsap.to(liquid.state, { dark: 0, duration: 1.2, ease: "power2.inOut" });
        gsap.to(contact, { color: "#111110", duration: 1, ease: "power2.inOut" });
      },
    });
  }
}

/* ---------- Full-width showcase: inset card expands to the full viewport ---------- */
const showcaseEl = $(".showcase");
if (showcaseEl && !reduced) {
  gsap.fromTo(".showcase-frame", { clipPath: "inset(11% 7% 11% 7% round 28px)" }, {
    clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
    scrollTrigger: { trigger: showcaseEl, start: "top 75%", end: "top top", scrub: true },
  });
  gsap.fromTo(".showcase-media", { scale: 1.35 }, {
    scale: 1.02, ease: "none",
    scrollTrigger: { trigger: showcaseEl, start: "top 75%", end: "bottom bottom", scrub: true },
  });
  gsap.from(".showcase-copy .wrap > div", {
    y: 70, opacity: 0, duration: 1.3, stagger: 0.12, ease: "expo.out",
    scrollTrigger: { trigger: showcaseEl, start: "top 8%" },
  });
}

/* ---------- Footer: giant name fitted to the width, letters slide in from both sides ---------- */
const fname = $("[data-footer-name]");
if (fname) {
  const text = (fname.textContent ?? "").trim();
  fname.innerHTML = "";
  text.split(" ").forEach((word, wi, all) => {
    const w = document.createElement("span");
    w.className = "fn-w";
    w.setAttribute("aria-hidden", "true");
    [...word].forEach((ch) => {
      const c = document.createElement("span");
      c.className = "fn-c";
      c.dataset.side = wi === 0 ? "l" : "r";
      c.textContent = ch;
      w.appendChild(c);
    });
    fname.appendChild(w);
    if (wi < all.length - 1) fname.appendChild(document.createTextNode(" "));
  });

  // Scale the font so the name spans exactly the content width (negative tracking
  // pulls the last glyph 0.065em past the box, so compensate for it).
  const fit = () => {
    const box = fname.parentElement!;
    fname.style.fontSize = "100px";
    const w = fname.getBoundingClientRect().width + 6.5;
    fname.style.fontSize = `${(100 * box.clientWidth) / w}px`;
  };
  fit();
  document.fonts?.ready.then(() => { fit(); ScrollTrigger.refresh(); });
  addEventListener("resize", fit);

  if (!reduced) {
    gsap.timeline({
      scrollTrigger: { trigger: fname, start: "top 96%", toggleActions: "play reverse play reverse" },
    }).from($$(".fn-c", fname), {
      x: (_i, el: HTMLElement) => (el.dataset.side === "l" ? -1 : 1) * innerWidth * 0.42,
      opacity: 0, duration: 1.8, ease: "expo.out",
      stagger: { amount: 0.6, from: "edges" },
    });
  }
}

/* Recalculate once images are in (they shift layout) */
addEventListener("load", () => ScrollTrigger.refresh());
