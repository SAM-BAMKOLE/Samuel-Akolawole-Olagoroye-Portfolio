# Samuel Olagoroye — Portfolio (Astro + shadcn/ui + GSAP)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Where to edit
- **All copy / projects / images / FAQ:** `src/data/content.ts` (items marked `DUMMY` are placeholders)
- **Colors, fonts, sizes, hover effects:** `src/styles/global.css` (tokens at the top)
- **Animations:** `src/scripts/motion.ts` · **Liquid shader:** `src/scripts/liquid.ts`
- **Add shadcn components:** `npx shadcn@latest add <name>` (`components.json` is configured)

## Design system
| Token | Value |
|---|---|
| Paper (bg) | `#F2F0EB` |
| Ink (text) | `#111110` |
| Accent | `#FF5A1F` |
| Display / body | Inter Tight 500 / 400, tracking −0.045em on headings |
| Italic accent | Instrument Serif italic |
| Labels | JetBrains Mono, 0.72rem, uppercase |
| Hero H1 | `clamp(3.1rem, 8.6vw, 9.5rem)`, line-height 1.02 |
| Section padding | `clamp(6rem, 12vw, 12rem)` |
| Gutter | `clamp(1.25rem, 3vw, 3rem)`, max width 1680px |
| Easing | `expo.out` reveals, `cubic-bezier(.76,0,.24,1)` hovers |

## Motion inventory
- Loader counter 000→100, panel slides up, then hero lines reveal (SplitText line masks)
- Lenis smooth scroll wired to ScrollTrigger; header hides on scroll down; top progress bar
- WebGL liquid background (hero + contact), cursor-reactive, cross-fades to dark in contact
- Scrubbed word-by-word text reveal; count-up stats
- Project cards: clip-path reveal + image parallax; "View" cursor
- Services: sticky stacking cards that scale back
- Tech marquees that speed up with scroll velocity
- Text hovers: roll (links/buttons), per-letter roll (project titles), underline draw, dim-siblings list
- Magnetic buttons, `prefers-reduced-motion` respected (no loader/GSAP/WebGL)

## Notes
- Unsplash image IDs are placeholders; verify they load and replace with real screenshots and a portrait.
- Hero "Book a call" currently points to top; hook it to Cal.com or similar.

## v2 changes
- **Liquid background:** now a lit 3D surface (normals + specular + rim light, cursor-driven light and ripples). It was hidden before by an opaque `<body>` background.
- **Showcase section** (`Showcase.astro`): full-width photo/video that expands from an inset card to full screen on scroll. Replace `showcase.image` in `src/data/content.ts` with `/images/samuel.jpg` (put the file in `public/images/`). Optional `showcase.video` for a muted loop.
- **Footer** (`Footer.astro`): reference layout (Navigation / Social / Contact, legal row, giant name). The name is auto-fitted to the width and its letters slide in from both sides, and reverse when you scroll away.
- **Privacy popup** (`PrivacyDialog.tsx` + shadcn Dialog): text lives in `src/data/privacy.ts`. It is a DRAFT adapted to Nigeria/NDPA; have it reviewed and keep it in sync with the real site (analytics, booking widget, fonts, images).
- In `.astro` files use `buttonVariants()` on plain `<a>` tags. `<Button asChild>` doesn't work with Astro children.

## v3 changes
- **Hover bug:** link labels showed `[object Object]` because `RollText` was a React component and Astro passes its children as an object. It is now `ui/RollText.astro` and takes a prop: `<RollText text="Projects" />`.
- **CV download:** `profile.cv` in `src/data/content.ts` points to `public/Samuel_Olagoroye_Fullstack_Developer_CV.pdf`. Replace that file to update the CV. Links: header, hero, experience, contact, footer.
- **Contact form:** `ContactForm.tsx` → `src/pages/api/contact.ts` (server) → Google Apps Script (`apps-script/Code.gs`) → Google Sheet + email notification. Setup guide: **SETUP-CONTACT-FORM.md**.
- **Privacy popup** rewritten to describe the form, Google Sheets/Gmail processing and the Vercel host (still a draft for legal review).
- The project now builds in `server` mode with the Vercel adapter (`@astrojs/vercel@8`, the line compatible with Astro 5). Only `/api/contact` runs on the server; pages stay static.
