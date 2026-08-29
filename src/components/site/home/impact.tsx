"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  {
    number: "25%",
    label: "Less manual follow-ups",
    description:
      "Reduced repetitive manual follow-up work by helping create more efficient workflows.",
    source: "PHOS CONSULTS",
  },
  {
    number: "15%",
    label: "More client engagement",
    description:
      "Improved client engagement through better digital experiences and more effective interaction flows.",
    source: "PHOS CONSULTS",
  },
  {
    number: "4+",
    label: "Years of building",
    description:
      "Practical experience across frontend development, backend systems, databases, AI, and deployment.",
    source: "EXPERIENCE",
  },
]

export default function Impact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const panelsRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const container = panelsRef.current

    if (!section || !container) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll("[data-stat]")
      )

      // Initial states
      panels.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, {
            autoAlpha: 1,
            pointerEvents: "auto",
          })

          return
        }

        gsap.set(panel, {
          autoAlpha: 0,
          pointerEvents: "none",
        })

        gsap.set(panel.querySelector("[data-number]"), {
          yPercent: 120,
          scale: 0.85,
        })

        gsap.set(panel.querySelectorAll("[data-content]"), {
          y: 40,
          opacity: 0,
        })
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * stats.length}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return

        const previousPanel = panels[index - 1]

        const currentNumber = panel.querySelector("[data-number]")
        const previousNumber = previousPanel.querySelector("[data-number]")

        const currentContent = panel.querySelectorAll("[data-content]")

        const previousContent = previousPanel.querySelectorAll("[data-content]")

        timeline
          // Activate incoming layer
          .set(
            panel,
            {
              autoAlpha: 1,
              pointerEvents: "auto",
            },
            `stat-${index}`
          )

          // Disable outgoing layer
          .set(
            previousPanel,
            {
              pointerEvents: "none",
            },
            `stat-${index}`
          )

          // Previous number exits upward
          .to(
            previousNumber,
            {
              yPercent: -120,
              scale: 1.1,
              duration: 0.9,
              ease: "power4.inOut",
            },
            `stat-${index}`
          )

          // Previous text exits
          .to(
            previousContent,
            {
              y: -30,
              opacity: 0,
              duration: 0.5,
              stagger: 0.05,
              ease: "power3.in",
            },
            `stat-${index}`
          )

          // New number enters
          .to(
            currentNumber,
            {
              yPercent: 0,
              scale: 1,
              duration: 1,
              ease: "power4.out",
            },
            `stat-${index}+=0.1`
          )

          // New content enters
          .to(
            currentContent,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
            },
            `stat-${index}+=0.3`
          )

          // Fully remove previous layer
          .set(
            previousPanel,
            {
              autoAlpha: 0,
            },
            `stat-${index}+=1`
          )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-background text-foreground"
    >
      {/* Section header */}

      <div className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <p className="text-xs font-medium tracking-[0.3em] text-muted-foreground uppercase">
          Impact
        </p>

        <p className="text-xs font-medium tracking-[0.25em] text-muted-foreground">
          01 — 03
        </p>
      </div>

      {/* Background decoration */}

      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none">
        <span className="text-[38vw] font-semibold tracking-[-0.1em] text-foreground/[0.025]">
          IMPACT
        </span>
      </div>

      <div ref={panelsRef} className="relative z-10 h-full w-full">
        {stats.map((stat) => (
          <article
            key={stat.number}
            data-stat
            className="absolute inset-0 flex min-h-screen items-center px-6 pt-20 pb-16 md:px-10 lg:px-16"
          >
            <div className="mx-auto grid w-full max-w-7xl items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
              {/* Giant number */}

              <div className="overflow-hidden">
                <div
                  data-number
                  className="text-[clamp(9rem,30vw,32rem)] leading-[0.68] font-normal tracking-[-0.1em]"
                >
                  {stat.number}
                </div>
              </div>

              {/* Supporting content */}

              <div className="max-w-sm border-t border-border pt-6">
                <p
                  data-content
                  className="mb-4 text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase"
                >
                  {stat.source}
                </p>

                <h3
                  data-content
                  className="mb-5 text-3xl leading-[0.9] font-normal tracking-[-0.05em] md:text-4xl"
                >
                  {stat.label}
                </h3>

                <p
                  data-content
                  className="text-sm leading-relaxed text-muted-foreground"
                >
                  {stat.description}
                </p>

                <div
                  data-content
                  className="mt-8 flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
                >
                  <span>Measured results</span>
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress */}

      <div className="absolute right-6 bottom-8 left-6 z-50 flex gap-2 md:right-10 md:left-10 lg:right-16 lg:left-16">
        {stats.map((stat) => (
          <div key={stat.number} className="h-px flex-1 bg-border" />
        ))}
      </div>
    </section>
  )
}
