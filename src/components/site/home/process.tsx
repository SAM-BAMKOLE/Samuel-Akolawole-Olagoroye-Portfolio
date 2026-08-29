"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "01",
    title: "UNDERSTAND",
    label: "Start with the problem",
    description:
      "Before building, I focus on understanding what needs to be solved, who it is for, and what a useful outcome should look like.",
  },
  {
    number: "02",
    title: "EXPLORE",
    label: "Find the right direction",
    description:
      "I explore the technical approach, tools, architecture, and structure needed to turn the problem into a practical solution.",
  },
  {
    number: "03",
    title: "BUILD",
    label: "Turn ideas into systems",
    description:
      "From interfaces to APIs and databases, I build the pieces into a working system with attention to structure and maintainability.",
  },
  {
    number: "04",
    title: "TEST",
    label: "Break it before users do",
    description:
      "I test flows, investigate issues, validate data, and refine the system until the important parts work reliably.",
  },
  {
    number: "05",
    title: "SHIP",
    label: "Make it real",
    description:
      "Deployment, production troubleshooting, documentation, and iteration turn the finished build into something people can actually use.",
  },
]

export default function Process() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stepsRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const container = stepsRef.current

    if (!section || !container) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll("[data-step]")
      )

      /*
       * Set all panels except the first one
       * outside of the viewport initially.
       */
      panels.forEach((panel, index) => {
        if (index === 0) {
          gsap.set(panel, {
            autoAlpha: 1,
            pointerEvents: "auto",
            scale: 1,
          })

          return
        }

        gsap.set(panel, {
          yPercent: 100,
          autoAlpha: 0,
          pointerEvents: "none",
          scale: 1,
        })
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * panels.length}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return

        const previousPanel = panels[index - 1]

        const currentTitle = panel.querySelector("[data-title]")

        const previousTitle = previousPanel.querySelector("[data-title]")

        /*
         * Make the incoming panel active.
         */
        timeline
          .set(
            panel,
            {
              autoAlpha: 1,
              pointerEvents: "auto",
            },
            `step-${index}`
          )

          /*
           * Prevent interaction with the old panel.
           */
          .set(
            previousPanel,
            {
              pointerEvents: "none",
            },
            `step-${index}`
          )

          /*
           * Bring the new panel upward.
           */
          .to(
            panel,
            {
              yPercent: 0,
              duration: 1,
              ease: "power4.inOut",
            },
            `step-${index}`
          )

          /*
           * Move the old panel away.
           */
          .to(
            previousPanel,
            {
              scale: 0.94,
              yPercent: -8,
              duration: 0.8,
              ease: "power3.inOut",
            },
            `step-${index}`
          )

          /*
           * Animate the previous title away.
           */
          .to(
            previousTitle,
            {
              yPercent: -100,
              opacity: 0,
              duration: 0.7,
              ease: "power4.in",
            },
            `step-${index}`
          )

          /*
           * Animate the new title in.
           */
          .fromTo(
            currentTitle,
            {
              yPercent: 100,
              rotateX: -50,
            },
            {
              yPercent: 0,
              rotateX: 0,
              duration: 0.9,
              ease: "power4.out",
            },
            `step-${index}+=0.15`
          )

          /*
           * Completely hide the previous layer.
           *
           * This is the important part.
           */
          .set(
            previousPanel,
            {
              autoAlpha: 0,
            },
            `step-${index}+=0.95`
          )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#182237] text-white"
    >
      {/* Fixed section label */}

      <div className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <p className="text-xs font-medium tracking-[0.3em] text-white/50 uppercase">
          How I work
        </p>

        <p className="text-xs font-medium tracking-[0.25em] text-white/50 uppercase">
          01 — 05
        </p>
      </div>

      {/* Huge decorative background */}

      <div className="pointer-events-none absolute bottom-[-8vw] left-1/2 z-0 -translate-x-1/2 text-[28vw] leading-none font-semibold -tracking-widest whitespace-nowrap text-white/2.5">
        PROCESS
      </div>

      <div ref={stepsRef} className="relative h-full w-full">
        {steps.map((step, index) => (
          <article
            key={step.number}
            data-step
            className="absolute inset-0 flex min-h-screen items-center px-6 pt-20 pb-10 md:px-10 lg:px-16"
          >
            <div className="relative mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.7fr_2fr_0.8fr] lg:items-center">
              {/* Step number */}

              <div className="self-start lg:self-auto">
                <span className="text-sm tracking-[0.3em] text-white/40">
                  {step.number}
                </span>
              </div>

              {/* Main title */}

              <div>
                <div className="overflow-hidden">
                  <h2
                    data-title
                    className="origin-bottom text-[clamp(4.5rem,11vw,13rem)] leading-[0.78] font-normal tracking-[-0.08em]"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {step.title}
                  </h2>
                </div>

                <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <p className="text-xs tracking-[0.25em] text-white/40 uppercase">
                    {step.label}
                  </p>

                  <ArrowDownRight className="size-6 shrink-0 text-white/40" />
                </div>
              </div>

              {/* Description card */}

              <Card className="rounded-none border border-white/15 bg-white/4 text-white shadow-none backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-12 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                      Process
                    </span>

                    <ArrowUpRight className="size-4 text-white/40" />
                  </div>

                  <p className="text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </article>
        ))}
      </div>

      {/* Progress lines */}

      <div className="absolute right-6 bottom-8 left-6 z-50 flex gap-2 md:right-10 md:left-10 lg:right-16 lg:left-16">
        {steps.map((step) => (
          <div key={step.number} className="h-px flex-1 bg-white/20" />
        ))}
      </div>
    </section>
  )
}
