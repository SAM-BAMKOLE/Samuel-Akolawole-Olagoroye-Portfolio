"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    number: "01",
    role: "Fullstack Web/UI Developer",
    company: "Phos Consults Ltd",
    location: "Nigeria",
    period: "Apr 2023 — Oct 2025",
    description:
      "Designed, built, and maintained the firm's consulting website, taking ownership of its structure, content, uptime, and ongoing data accuracy.",
    highlights: [
      "Built the consulting website from scratch",
      "Reduced manual follow-ups by 25%",
      "Increased client engagement by 15%",
      "Maintained technical documentation and update procedures",
    ],
    accent: "Web Development",
  },
  {
    number: "02",
    role: "Software Development Intern",
    company: "Nextswitch Ltd",
    location: "Ibadan, Nigeria",
    period: "Aug 2025 — Sep 2025",
    description:
      "Contributed across frontend and backend development for fintech platforms, while also deploying applications and helping junior developers build practical skills.",
    highlights: [
      "Worked on MyRiteWallet and Dgnravepay",
      "Used Django, Vue, Laravel, and Node.js",
      "Deployed and debugged applications on Netlify and cPanel",
      "Trained junior students in HTML and Node.js",
    ],
    accent: "Fintech Development",
  },
  {
    number: "03",
    role: "Backend Developer Intern",
    company: "Savertech Nig Ltd",
    location: "Nigeria",
    period: "Aug 2024 — Oct 2024",
    description:
      "Built backend services and RESTful APIs for fullstack applications, focusing on frontend integration, secure authentication, and improved API performance.",
    highlights: [
      "Built RESTful APIs using PHP Slim",
      "Integrated backend services with React",
      "Implemented secure authentication flows",
      "Optimised API response performance",
    ],
    accent: "Backend Systems",
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const headingRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const heading = headingRef.current
    const cardsContainer = cardsRef.current

    if (!section || !heading || !cardsContainer) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        cardsContainer.querySelectorAll("[data-experience-card]")
      )

      /*
       * -----------------------------------------------
       * HEADING
       * -----------------------------------------------
       */

      gsap.from(heading.querySelectorAll("[data-reveal]"), {
        yPercent: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",

        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          once: true,
        },
      })

      /*
       * -----------------------------------------------
       * CARDS
       * -----------------------------------------------
       */

      cards.forEach((card, index) => {
        const number = card.querySelector("[data-number]")
        const line = card.querySelector("[data-line]")
        const content = card.querySelectorAll("[data-content]")

        /*
         * Initial state.
         *
         * Keep the movement relatively small so the card
         * enters quickly rather than travelling a long way.
         */

        gsap.set(card, {
          opacity: 0,
          y: 45,
        })

        gsap.set(number, {
          opacity: 0,
          y: 20,
        })

        gsap.set(line, {
          scaleX: 0,
          transformOrigin: "left center",
        })

        gsap.set(content, {
          opacity: 0,
          y: 20,
        })

        /*
         * Fast entrance timeline.
         */

        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            once: true,
          },
        })

        entrance
          .to(card, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          })
          .to(
            number,
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "-=0.3"
          )
          .to(
            line,
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.2"
          )
          .to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              stagger: 0.035,
              ease: "power3.out",
            },
            "-=0.3"
          )

        /*
         * -----------------------------------------------
         * PARALLAX
         * -----------------------------------------------
         *
         * Do NOT animate the card's y value here.
         *
         * Instead, animate an inner element so the entrance
         * animation and parallax don't fight over transform.
         */

        const inner = card.querySelector("[data-parallax]")

        if (inner) {
          gsap.fromTo(
            inner,
            {
              y: index % 2 === 0 ? 20 : 35,
            },
            {
              y: index % 2 === 0 ? -20 : -35,
              ease: "none",

              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          )
        }
      })

      /*
       * Refresh after all ScrollTriggers have been created.
       */

      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-28 md:py-40"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
        {/* Heading */}
        <div
          ref={headingRef}
          className="mb-20 grid gap-10 md:mb-32 md:grid-cols-2 md:items-end"
        >
          <div className="overflow-hidden">
            <p
              data-reveal
              className="mb-4 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase"
            >
              Professional journey
            </p>

            <div className="overflow-hidden">
              <h2
                data-reveal
                className="text-[clamp(4rem,9vw,10rem)] leading-[0.8] font-normal tracking-[-0.07em] text-[#182237]"
              >
                EXPERIENCE
              </h2>
            </div>
          </div>

          <p
            data-reveal
            className="max-w-md text-sm leading-relaxed text-muted-foreground md:justify-self-end md:text-base"
          >
            Over 4 years of practical experience across consulting, fintech, and
            software development — building systems, solving deployment
            problems, and working across the full development lifecycle.
          </p>
        </div>

        {/* Experience cards */}
        <div ref={cardsRef} className="flex flex-col gap-6 md:gap-10">
          {experiences.map((experience) => (
            <Card
              key={experience.number}
              data-experience-card
              className="group relative overflow-hidden rounded-none border border-[#182237]/15 bg-transparent shadow-none"
            >
              <div data-parallax>
                <CardContent className="p-0">
                  {/* Top */}
                  <div className="grid gap-8 p-6 md:grid-cols-[120px_1fr] md:p-10 lg:grid-cols-[160px_1.2fr_0.8fr] lg:p-14">
                    {/* Number */}
                    <div>
                      <span
                        data-number
                        className="text-sm tracking-[0.2em] text-muted-foreground"
                      >
                        {experience.number}
                      </span>
                    </div>

                    {/* Main content */}
                    <div>
                      <p
                        data-content
                        className="mb-4 text-xs tracking-[0.22em] text-muted-foreground uppercase"
                      >
                        {experience.accent}
                      </p>

                      <h3
                        data-content
                        className="max-w-2xl text-3xl leading-[0.95] font-normal tracking-[-0.045em] text-[#182237] sm:text-4xl lg:text-5xl"
                      >
                        {experience.role}
                      </h3>

                      <p
                        data-content
                        className="mt-4 text-lg text-[#182237]/70"
                      >
                        {experience.company}
                      </p>
                    </div>

                    {/* Meta */}
                    <div
                      data-content
                      className="flex flex-col justify-between gap-4 lg:items-end lg:text-right"
                    >
                      <div>
                        <p className="text-sm text-[#182237]">
                          {experience.period}
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {experience.location}
                        </p>
                      </div>

                      <ArrowUpRight className="size-6 text-[#182237]/50 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>

                  {/* Animated line */}
                  <div
                    data-line
                    className="mx-6 h-px bg-[#182237]/15 md:mx-10 lg:mx-14"
                  />

                  {/* Bottom */}
                  <div className="grid gap-10 p-6 md:grid-cols-2 md:p-10 lg:p-14">
                    <p
                      data-content
                      className="max-w-xl text-sm leading-7 text-[#182237]/70 md:text-base"
                    >
                      {experience.description}
                    </p>

                    <div
                      data-content
                      className="grid gap-x-6 gap-y-4 sm:grid-cols-2"
                    >
                      {experience.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex gap-3 text-sm leading-relaxed text-[#182237]/70"
                        >
                          <span className="mt-[0.55rem] size-1.5 shrink-0 bg-[#182237]" />

                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
