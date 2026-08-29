"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Braces,
  BrainCircuit,
  Database,
  Layers3,
  Server,
  Terminal,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

const stacks = [
  {
    title: "FRONTEND",
    icon: Layers3,
    tools: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "GSAP",
    ],
    direction: 1,
  },
  {
    title: "BACKEND",
    icon: Server,
    tools: ["Node.js", "Bun", "Hono", "REST APIs", "Prisma", "Authentication"],
    direction: -1,
  },
  {
    title: "DATA",
    icon: Database,
    tools: ["PostgreSQL", "SQLite", "Neon", "Turso", "Database Design", "ORMs"],
    direction: 1,
  },
  {
    title: "AI / ML",
    icon: BrainCircuit,
    tools: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "Multimodal AI",
      "Transformers",
      "Model Evaluation",
    ],
    direction: -1,
  },
]

export default function TechStack() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-row]")
      )

      const heading = section.querySelector("[data-heading]")
      const intro = section.querySelector("[data-intro]")

      /*
       * HEADER
       */

      gsap.from([heading, intro], {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      })

      /*
       * TECHNOLOGY ROWS
       */

      rows.forEach((row) => {
        const tools = row.querySelector("[data-tools]") as HTMLElement | null

        if (!tools) return

        const direction = Number(row.dataset.direction)

        /*
         * Start badges in a visible position.
         *
         * This is deliberately NOT a huge xPercent.
         */

        gsap.set(tools, {
          x: direction === 1 ? -30 : 30,
        })

        /*
         * Horizontal movement while scrolling.
         */

        gsap.to(tools, {
          x: direction === 1 ? 30 : -30,
          ease: "none",

          scrollTrigger: {
            trigger: row,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        /*
         * Badge entrance.
         */

        const badges = gsap.utils.toArray<HTMLElement>(
          row.querySelectorAll("[data-tool]")
        )

        gsap.fromTo(
          badges,
          {
            opacity: 0,
            y: 20,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.035,
            ease: "power3.out",

            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              once: true,
            },
          }
        )
      })

      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 py-28 md:py-40"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mx-auto mb-16 max-w-7xl px-6 md:mb-20 md:px-10 lg:px-16">
        <div className="max-w-4xl">
          <p className="mb-6 text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
            07 — Technology
          </p>

          <div className="overflow-hidden">
            <h2
              data-heading
              className="text-[clamp(4rem,10vw,12rem)] leading-[0.76] font-normal tracking-[-0.085em]"
            >
              WHAT I BUILD
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2 className="text-[clamp(4rem,10vw,12rem)] leading-[0.76] font-normal tracking-[-0.085em] text-muted-foreground">
              WITH.
            </h2>
          </div>

          <p
            data-intro
            className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            The tools change depending on the problem. These are some of the
            technologies, frameworks, and areas I work with when building
            applications and experimenting with new ideas.
          </p>
        </div>
      </div>

      {/* =================================================
          TECHNOLOGY ROWS
      ================================================= */}

      <div className="space-y-4 md:space-y-6">
        {stacks.map((stack) => {
          const Icon = stack.icon

          return (
            <div
              key={stack.title}
              data-row
              data-direction={stack.direction}
              className="relative flex w-full border-y border-border bg-background"
            >
              {/* CATEGORY */}
              <div className="relative z-20 flex w-27.5 shrink-0 items-center gap-2 bg-background px-4 py-5 md:w-47.5 md:gap-3 md:px-10 md:py-7 lg:w-57.5 lg:px-16">
                <Icon className="size-4 shrink-0 text-muted-foreground md:size-6" />

                <span className="text-[9px] font-medium tracking-[0.14em] text-muted-foreground md:text-sm md:tracking-[0.2em]">
                  {stack.title}
                </span>
              </div>

              {/* TOOLS VIEWPORT */}
              <div
                data-tools-viewport
                className="relative min-w-0 flex-1 overflow-hidden"
              >
                {/* MOVING TOOLS */}
                <div
                  data-tools
                  className="flex w-max items-center gap-2 py-5 pr-6 md:gap-3 md:py-7 md:pr-10"
                >
                  {stack.tools.map((tool) => (
                    <Badge
                      key={tool}
                      data-tool
                      variant="outline"
                      className="shrink-0 rounded-none border-border bg-transparent px-3 py-2 text-[9px] font-medium tracking-widest whitespace-nowrap text-foreground uppercase md:px-4 md:text-xs md:tracking-[0.15em]"
                    >
                      {tool}
                    </Badge>
                  ))}

                  {stack.tools.slice(0, 4).map((tool) => (
                    <Badge
                      key={`${tool}-repeat`}
                      data-tool
                      variant="outline"
                      className="shrink-0 rounded-none border-border/60 bg-transparent px-3 py-2 text-[9px] font-medium tracking-widest whitespace-nowrap text-muted-foreground uppercase md:px-4 md:text-xs md:tracking-[0.15em]"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* =================================================
          BOTTOM STATEMENT
      ================================================= */}

      <div className="mx-auto mt-28 max-w-7xl px-6 md:mt-40 md:px-10 lg:px-16">
        <div className="grid gap-10 border-t border-border pt-8 md:grid-cols-[0.5fr_1fr]">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Terminal className="size-5" />

            <span className="text-xs tracking-[0.25em] uppercase">
              The stack keeps evolving
            </span>
          </div>

          <p className="max-w-2xl text-2xl leading-tight tracking-[-0.04em] md:text-4xl">
            I don't think the goal is to know every tool. It's knowing how to
            choose the right ones and learn the rest when the problem demands
            it.
          </p>
        </div>
      </div>

      {/* =================================================
          DECORATIVE BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute top-[40%] left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap select-none">
        <Braces className="size-[80vw] text-foreground/2.5" />
      </div>
    </section>
  )
}
