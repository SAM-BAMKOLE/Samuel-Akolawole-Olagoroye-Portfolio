"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Bot,
  Boxes,
  BrainCircuit,
  Code2,
  Database,
  Layers3,
  Radio,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const interests = [
  {
    title: "AI Systems",
    description:
      "Exploring how intelligent models can move from experiments into useful, reliable applications.",
    icon: BrainCircuit,
    className: "left-[4%] top-[16%] md:left-[8%] md:top-[18%]",
    rotation: -8,
    speed: -90,
  },
  {
    title: "AI Agents",
    description:
      "Thinking about autonomous workflows, tool use, reasoning, and systems that can actually get work done.",
    icon: Bot,
    className: "right-[3%] top-[10%] md:right-[10%] md:top-[14%]",
    rotation: 7,
    speed: 110,
  },
  {
    title: "Real-time Apps",
    description:
      "Building responsive experiences around streaming, events, and live interactions.",
    icon: Radio,
    className: "left-[2%] bottom-[16%] md:left-[14%] md:bottom-[18%]",
    rotation: 6,
    speed: 80,
  },
  {
    title: "System Design",
    description:
      "Exploring how applications scale, communicate, and remain maintainable as complexity grows.",
    icon: Boxes,
    className: "right-[4%] bottom-[12%] md:right-[12%] md:bottom-[16%]",
    rotation: -7,
    speed: -100,
  },
  {
    title: "Databases",
    description:
      "Learning more about data architecture, performance, and the decisions behind reliable storage.",
    icon: Database,
    className: "left-[35%] bottom-[3%] md:left-[39%] md:bottom-[8%]",
    rotation: 4,
    speed: 60,
  },
  {
    title: "Open Source",
    description:
      "Learning from the tools and communities that make modern software development possible.",
    icon: Code2,
    className: "right-[32%] top-[3%] md:right-[38%] md:top-[8%]",
    rotation: -4,
    speed: -50,
  },
]

export default function CurrentlyExploring() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const titleLines = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-title]")
      )

      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-card]")
      )

      /*
       * Heading reveal
       */
      gsap.from(titleLines, {
        yPercent: 120,
        rotate: 3,
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Floating cards enter independently.
       */
      gsap.from(cards, {
        scale: 0.7,
        opacity: 0,
        duration: 1,
        stagger: {
          each: 0.08,
          from: "random",
        },
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Every card moves differently as the user scrolls.
       */
      cards.forEach((card) => {
        const speed = Number(card.dataset.speed)

        gsap.to(card, {
          y: speed,
          rotate: `+=${speed * 0.04}`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      })

      /*
       * Slight movement of the central content.
       */
      gsap.to("[data-center]", {
        y: -70,
        scale: 1.03,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[130svh] overflow-hidden bg-background py-24 text-foreground md:min-h-[150svh] md:py-32"
    >
      {/* Section label */}

      <div className="absolute top-6 left-6 z-30 md:top-10 md:left-10 lg:left-16">
        <p className="text-[10px] font-medium tracking-[0.3em] text-muted-foreground uppercase">
          06 — Currently exploring
        </p>
      </div>

      {/* Floating cards */}

      <div className="pointer-events-none absolute inset-0">
        {interests.map((interest) => {
          const Icon = interest.icon

          return (
            <Card
              key={interest.title}
              data-card
              data-speed={interest.speed}
              style={{
                rotate: `${interest.rotation}deg`,
              }}
              className={`pointer-events-auto absolute z-10 hidden w-[240px] rounded-none border-border/70 bg-background/80 shadow-xl backdrop-blur-md md:block ${interest.className}`}
            >
              <CardContent className="p-5">
                <Icon className="mb-10 size-5 text-muted-foreground" />

                <p className="mb-2 text-lg tracking-tight">{interest.title}</p>

                <p className="text-xs leading-relaxed text-muted-foreground">
                  {interest.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main content */}

      <div
        data-center
        className="relative z-20 mx-auto flex min-h-[100svh] max-w-7xl items-center justify-center px-6 pt-24 md:px-10 lg:px-16"
      >
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-8 rounded-none px-4 py-1.5 text-[10px] tracking-[0.25em] uppercase"
          >
            Curiosity drives the next build
          </Badge>

          <div className="overflow-hidden">
            <h2
              data-title
              className="text-[clamp(4rem,11vw,13rem)] leading-[0.76] font-normal tracking-[-0.09em]"
            >
              CURRENTLY
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2
              data-title
              className="text-[clamp(4rem,11vw,13rem)] leading-[0.76] font-normal tracking-[-0.09em] text-muted-foreground"
            >
              EXPLORING.
            </h2>
          </div>

          <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            Outside the projects already in this portfolio, I'm continuously
            exploring new technologies, better architectures, and ideas that
            could become the next thing I build.
          </p>

          {/* Mobile interests */}

          <div className="mt-12 grid grid-cols-2 gap-3 text-left md:hidden">
            {interests.map((interest) => {
              const Icon = interest.icon

              return (
                <Card
                  key={interest.title}
                  className="rounded-none border-border bg-muted/30 shadow-none"
                >
                  <CardContent className="p-4">
                    <Icon className="mb-8 size-4 text-muted-foreground" />

                    <p className="text-sm font-medium">{interest.title}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-10 flex items-center justify-center gap-2 text-xs tracking-[0.22em] text-muted-foreground uppercase">
            <Code2 className="size-4" />
            Always learning
            <Layers3 className="size-4" />
          </div>
        </div>
      </div>

      {/* Decorative background */}

      <div className="pointer-events-none absolute right-0 bottom-[-8vw] left-0 overflow-hidden text-center whitespace-nowrap select-none">
        <span className="text-[22vw] font-medium tracking-[-0.1em] text-foreground/[0.025]">
          EXPLORE
        </span>
      </div>
    </section>
  )
}
