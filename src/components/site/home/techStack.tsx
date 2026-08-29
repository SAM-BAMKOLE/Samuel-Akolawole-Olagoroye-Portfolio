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
       * Section introduction.
       */
      gsap.from([heading, intro], {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Horizontal movement.
       *
       * Each technology row moves in a
       * different direction.
       */
      rows.forEach((row) => {
        const direction = Number(row.dataset.direction)

        gsap.fromTo(
          row,
          {
            xPercent: direction * -8,
          },
          {
            xPercent: direction * 8,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        )
      })

      /*
       * Individual technology badges.
       */
      const badges = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-tool]")
      )

      gsap.from(badges, {
        y: 40,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: {
          each: 0.03,
          from: "random",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-muted/30 py-28 md:py-40"
    >
      {/* Header */}

      <div className="mx-auto mb-20 max-w-7xl px-6 md:px-10 lg:px-16">
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

      {/* Technology rows */}

      <div className="space-y-4 md:space-y-6">
        {stacks.map((stack, index) => {
          const Icon = stack.icon

          return (
            <div
              key={stack.title}
              data-row
              data-direction={stack.direction}
              className="relative flex w-[115%] items-center gap-4 border-y border-border bg-background px-6 py-5 md:w-[110%] md:px-10 md:py-7 lg:px-16"
              style={{
                marginLeft: index % 2 === 0 ? "-5%" : "-5%",
              }}
            >
              {/* Category */}

              <div className="flex shrink-0 items-center gap-3 pr-6 md:pr-10">
                <Icon className="size-5 text-muted-foreground md:size-6" />

                <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground md:text-sm">
                  {stack.title}
                </span>
              </div>

              {/* Technologies */}

              <div className="flex min-w-max items-center gap-2 md:gap-3">
                {stack.tools.map((tool) => (
                  <Badge
                    key={tool}
                    data-tool
                    variant="outline"
                    className="rounded-none border-border bg-transparent px-3 py-2 text-[10px] font-medium tracking-[0.15em] text-foreground uppercase md:px-4 md:text-xs"
                  >
                    {tool}
                  </Badge>
                ))}

                {/* Repeat first few badges for visual continuation */}

                {stack.tools.slice(0, 3).map((tool) => (
                  <Badge
                    key={`${tool}-repeat`}
                    variant="outline"
                    className="rounded-none border-border/60 bg-transparent px-3 py-2 text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase md:px-4 md:text-xs"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom statement */}

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

      {/* Decorative background */}

      <div className="pointer-events-none absolute top-[40%] left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap select-none">
        <Braces className="size-[80vw] text-foreground/2.5" />
      </div>
    </section>
  )
}
