import {
  Dialog, DialogCloseButton, DialogContent, DialogDescription, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

type Section = { heading: string; paragraphs: string[]; bullets?: string[] };

export function PrivacyDialog({
  title, updated, sections,
}: { title: string; updated: string; sections: Section[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="eyebrow !text-current transition-colors hover:!text-brand">
          Privacy
        </button>
      </DialogTrigger>

      <DialogContent className="h-[min(74vh,760px)] w-[min(1140px,92vw)] rounded-xl bg-[#1b1a19] text-[#f6eee7] shadow-2xl">
        <div className="absolute right-5 top-5 z-10 md:right-7 md:top-7">
          <DialogCloseButton />
        </div>

        {/* data-lenis-prevent lets the panel scroll natively while smooth-scroll is active */}
        <div
          data-lenis-prevent
          className="privacy-scroll h-full overflow-y-auto overscroll-contain px-7 py-9 md:px-14 md:py-12"
        >
          <DialogTitle className="pr-20 text-[clamp(2.4rem,5vw,4.4rem)] font-bold leading-none tracking-[-0.045em] md:pr-28">
            {title}
          </DialogTitle>
          <DialogDescription className="sr-only">How this website handles personal data.</DialogDescription>

          <div className="mt-10 text-[1.05rem] leading-[1.65] md:text-[1.2rem]">
            <p>Last Updated: {updated}</p>
            {sections.map((s) => (
              <section key={s.heading} className="mt-9">
                <h3 className="font-bold">{s.heading}</h3>
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="mt-4">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 list-[square] space-y-3 pl-6 marker:text-[#f6eee7]">
                    {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
