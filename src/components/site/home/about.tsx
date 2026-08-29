"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const statement =
  "I'm a Computer Science graduate and fullstack engineer who cares as much about how code runs as how it feels to use."

const words = statement.split(" ")

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const text = textRef.current

    if (!section || !text) return

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(
        text.querySelectorAll("[data-letter]")
      )

      /*
       * Start with every letter faded.
       */
      gsap.set(letters, {
        color: "rgba(24, 34, 55, 0.16)",
      })

      /*
       * Restore the color one letter at a time.
       *
       * Because each word is wrapped in whitespace-nowrap,
       * words can never break in the middle.
       */
      gsap.to(letters, {
        color: "#182237",
        stagger: {
          each: 0.025,
        },
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 65%",
          scrub: 1,
        },
      })

      /*
       * Section label.
       */
      gsap.from("[data-label]", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Supporting information.
       */
      gsap.from("[data-meta]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",

        scrollTrigger: {
          trigger: section,
          start: "top 55%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Decorative background movement.
       */
      gsap.to("[data-background]", {
        yPercent: -15,
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
      className="relative overflow-hidden bg-background px-6 py-32 text-[#182237] md:px-10 md:py-40 lg:px-16 lg:py-48"
    >
      {/* Decorative background */}

      <div
        data-background
        className="pointer-events-none absolute top-[-10%] right-[-10%] select-none"
      >
        <span className="text-[35vw] leading-none font-medium tracking-[-0.12em] text-foreground/2.5">
          01
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section label */}

        <div data-label className="mb-16 flex items-center gap-4 md:mb-24">
          <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            01
          </span>

          <div className="h-px w-10 bg-border" />

          <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
            Who I am
          </span>
        </div>

        {/* Main statement */}

        <div className="max-w-362.5">
          <h2
            ref={textRef}
            className="text-[clamp(3.5rem,7.8vw,7.3rem)] leading-[0.9] font-normal tracking-[-0.075em]"
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split("").map((character, characterIndex) => (
                  <span
                    key={characterIndex}
                    data-letter
                    aria-hidden="true"
                    className="inline-block"
                  >
                    {character}
                  </span>
                ))}

                {/* Normal space between words */}
                {wordIndex < words.length - 1 && (
                  <span aria-hidden="true" className="inline-block">
                    &nbsp;
                  </span>
                )}
              </span>
            ))}

            {/* Accessible text */}
            <span className="sr-only">{statement}</span>
          </h2>
        </div>

        {/* Supporting information */}

        <div className="mt-20 grid gap-12 border-t border-border pt-8 md:mt-32 md:grid-cols-[0.7fr_1fr] lg:grid-cols-[0.8fr_1fr_0.5fr]">
          <div data-meta>
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              Based in
            </p>

            <p className="mt-3 text-sm">Nigeria</p>
          </div>

          <div data-meta>
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              I care about
            </p>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Building thoughtful digital products, solving complex problems,
              and finding the balance between technical quality and a great user
              experience.
            </p>
          </div>

          <div data-meta className="md:ml-auto">
            <p className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
              Keep scrolling
            </p>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center border border-border">
                <ArrowDown className="size-4" />
              </span>

              <span className="text-xs text-muted-foreground">
                More about me
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}

        <div data-meta className="mt-16 flex justify-end md:mt-20">
          <Button
            variant="outline"
            className="rounded-none border-border bg-transparent"
            asChild
          >
            <Link href="#experience">
              Explore my experience
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Bottom detail */}

      <div className="absolute right-6 bottom-6 left-6 flex items-center justify-between md:right-10 md:left-10 lg:right-16 lg:left-16">
        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
          Samuel Olagoroye
        </span>

        <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
          About
        </span>
      </div>
    </section>
  )
}
