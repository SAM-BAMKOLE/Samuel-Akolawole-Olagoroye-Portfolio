"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ArrowUpRight, AtSign, Code2, Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const contacts = [
  {
    title: "Email me",
    value: "olagoroyesamuelakolawole@gmail.com",
    href: "mailto:olagoroyesamuelakolawole@gmail.com",
    icon: Mail,
    className: "left-[6%] top-[16%] md:left-[8%] md:top-[20%]",
  },
  {
    title: "LinkedIn",
    value: "Let's connect",
    href: "https://www.linkedin.com/in/samuel-olagoroye-bamicole",
    icon: AtSign,
    className: "right-[6%] top-[12%] md:right-[9%] md:top-[16%]",
  },
  {
    title: "GitHub",
    value: "See the code",
    href: "https://github.com/SAM-BAMKOLE",
    icon: Code2,
    className: "left-[8%] bottom-[13%] md:left-[14%] md:bottom-[18%]",
  },
  {
    title: "Let's talk",
    value: "Start a conversation",
    href: "mailto:olagoroyesamuelakolawole@gmail.com",
    icon: MessageCircle,
    className: "right-[5%] bottom-[10%] md:right-[12%] md:bottom-[16%]",
  },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const cursor = cursorRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const title = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-title]")
      )

      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-contact]")
      )

      /*
       * Main heading reveal
       */
      gsap.from(title, {
        yPercent: 120,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Contact cards
       */
      gsap.from(cards, {
        scale: 0.7,
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: {
          each: 0.1,
          from: "random",
        },
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      })

      /*
       * Slow background movement
       */
      gsap.to("[data-background]", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      /*
       * Desktop pointer interaction
       */
      if (window.matchMedia("(min-width: 768px)").matches && cursor) {
        const xTo = gsap.quickTo(cursor, "x", {
          duration: 0.5,
          ease: "power3.out",
        })

        const yTo = gsap.quickTo(cursor, "y", {
          duration: 0.5,
          ease: "power3.out",
        })

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = section.getBoundingClientRect()

          xTo(event.clientX - bounds.left)
          yTo(event.clientY - bounds.top)
        }

        section.addEventListener("pointermove", handlePointerMove)

        return () => {
          section.removeEventListener("pointermove", handlePointerMove)
        }
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-svh overflow-hidden bg-primary py-24 text-primary-foreground md:py-32"
    >
      {/* Background text */}

      <div
        data-background
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none"
      >
        <span className="text-[32vw] font-medium -tracking-widest text-black/6">
          HELLO
        </span>
      </div>

      {/* Cursor circle */}

      <div
        ref={cursorRef}
        className="pointer-events-none absolute hidden size-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/20 bg-primary-foreground/4 md:block"
      />

      {/* Label */}

      <div className="absolute top-6 left-6 z-20 md:top-10 md:left-10 lg:left-16">
        <p className="text-[10px] font-medium tracking-[0.3em] text-primary-foreground/60 uppercase">
          08 — Contact
        </p>
      </div>

      {/* Main heading */}

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl items-center justify-center px-6 md:px-10 lg:px-16">
        <div className="w-full text-center">
          <div className="overflow-hidden">
            <h2
              data-title
              className="text-[clamp(5rem,14vw,17rem)] leading-[0.72] font-normal tracking-[-0.09em]"
            >
              LET&apos;S BUILD
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2
              data-title
              className="text-[clamp(5rem,14vw,17rem)] leading-[0.72] font-normal tracking-[-0.09em] text-primary-foreground/60"
            >
              SOMETHING
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2
              data-title
              className="text-[clamp(5rem,14vw,17rem)] leading-[0.72] font-normal tracking-[-0.09em]"
            >
              GOOD.
            </h2>
          </div>

          <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-primary-foreground/70 md:text-base">
            Have an idea, a project, or an interesting problem? I&apos;m always
            open to talking about what we could build together.
          </p>

          <Button
            asChild
            size="lg"
            className="mt-8 rounded-none bg-primary-foreground px-7 text-primary hover:bg-primary-foreground/90"
          >
            <Link href="mailto:olagoroyesamuelakolawole@gmail.com">
              Start a conversation
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Desktop floating cards */}

      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        {contacts.map((contact) => {
          const Icon = contact.icon

          return (
            <Card
              key={contact.title}
              data-contact
              className={`pointer-events-auto absolute w-76 rounded-none border-primary-foreground/20 bg-white/30 text-primary-foreground shadow-xl backdrop-blur-md ${contact.className}`}
            >
              <CardContent className="p-5">
                <Icon className="mb-10 size-5 text-primary-foreground/70" />

                <p className="text-xs tracking-[0.2em] text-primary-foreground/50 uppercase">
                  {contact.title}
                </p>

                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("http") ? "_blank" : undefined
                  }
                  rel={
                    contact.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="mt-2 flex items-center justify-between gap-3 text-sm font-medium hover:underline"
                >
                  <span>{contact.value}</span>

                  <ArrowUpRight className="size-4 shrink-0" />
                </a>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Mobile contacts */}

      <div className="relative z-20 mx-auto grid max-w-xl grid-cols-2 gap-3 px-6 pb-16 md:hidden">
        {contacts.map((contact) => {
          const Icon = contact.icon

          return (
            <Card
              key={contact.title}
              data-contact
              className="rounded-none border-primary-foreground/20 bg-primary/50 text-primary-foreground shadow-none"
            >
              <CardContent className="p-4">
                <Icon className="mb-8 size-4 text-primary-foreground/70" />

                <p className="text-[10px] tracking-[0.18em] text-primary-foreground/50 uppercase">
                  {contact.title}
                </p>

                <a
                  href={contact.href}
                  className="mt-2 block text-xs font-medium"
                >
                  {contact.value}
                </a>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer */}

      <div className="absolute right-6 bottom-6 left-6 z-30 flex items-center justify-between border-t border-primary-foreground/20 pt-5 text-[10px] tracking-[0.2em] text-primary-foreground/50 uppercase md:right-10 md:left-10 lg:right-16 lg:left-16">
        <span>Samuel Olagoroye</span>

        <span>{new Date().getFullYear()}</span>
      </div>
    </section>
  )
}
