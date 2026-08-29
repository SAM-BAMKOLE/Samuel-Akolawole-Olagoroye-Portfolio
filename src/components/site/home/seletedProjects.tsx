"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    number: "01",
    category: "AI / Research",
    title: ["Multimodal", "Depression", "Detection"],
    description:
      "A multimodal deep learning system exploring audio and visual data for depression detection through comparative model analysis.",
    image: "/images/projects/depression-detection.png",
    technologies: ["PyTorch", "TensorFlow", "OpenFace", "VGGish"],
    href: "#",
  },
  {
    number: "02",
    category: "Fullstack / Analytics",
    title: ["Quicklink", "Analytics", "Platform"],
    description:
      "An analytics-driven URL shortener that tracks clicks across location, device, and referrer while preserving user privacy.",
    image: "/images/projects/quicklink.png",
    technologies: ["Next.js", "PostgreSQL", "Drizzle", "Neon"],
    href: "https://quicklink-three.vercel.app/",
  },
  {
    number: "03",
    category: "Security / Fullstack",
    title: ["Secret", "Share", "Express"],
    description:
      "A secure, self-destructing data-sharing tool built around client-side encryption and Redis-managed expiry.",
    image: "/images/projects/secret-share.png",
    technologies: ["Next.js", "Redis", "Encryption"],
    href: "https://securely-share-secrets.vercel.app/",
  },
]

export default function SelectedProjects() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const panelsRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const container = panelsRef.current

    if (!section || !container) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-project-panel]")

      /*
       * -----------------------------------------------
       * IMPORTANT:
       *
       * The first panel is NEVER hidden.
       * It is the initial state of the section.
       * -----------------------------------------------
       */

      gsap.set(panels[0], {
        opacity: 1,
        visibility: "visible",
        zIndex: 2,
      })

      /*
       * Every subsequent panel sits above it but is
       * invisible until its turn.
       */

      panels.slice(1).forEach((panel) => {
        gsap.set(panel, {
          opacity: 0,
          visibility: "hidden",
          zIndex: 1,
        })
      })

      /*
       * Prepare incoming images and content.
       */

      panels.slice(1).forEach((panel) => {
        gsap.set(panel.querySelector("[data-project-image]"), {
          scale: 1.08,
        })

        gsap.set(panel.querySelectorAll("[data-project-content]"), {
          opacity: 0,
          y: 40,
        })
      })

      /*
       * First project is already fully visible.
       */

      gsap.set(panels[0].querySelector("[data-project-image]"), {
        scale: 1,
      })

      gsap.set(panels[0].querySelectorAll("[data-project-content]"), {
        opacity: 1,
        y: 0,
      })

      /*
       * -----------------------------------------------
       * MASTER SCROLL TIMELINE
       * -----------------------------------------------
       */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",

          /*
           * One viewport of scrolling per transition.
           */
          end: () => `+=${window.innerHeight * (projects.length - 1)}`,

          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      /*
       * -----------------------------------------------
       * PROJECT 01 → 02 → 03
       * -----------------------------------------------
       */

      for (let i = 1; i < panels.length; i++) {
        const previous = panels[i - 1]
        const current = panels[i]

        const previousImage = previous.querySelector("[data-project-image]")

        const currentImage = current.querySelector("[data-project-image]")

        const previousContent = previous.querySelectorAll(
          "[data-project-content]"
        )

        const currentContent = current.querySelectorAll(
          "[data-project-content]"
        )

        /*
         * Put incoming panel on top.
         */

        timeline.set(current, {
          visibility: "visible",
          opacity: 1,
          zIndex: 3,
        })

        /*
         * Incoming image.
         */

        timeline.to(
          currentImage,
          {
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "<"
        )

        /*
         * Incoming text.
         */

        timeline.to(
          currentContent,
          {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.65,
            ease: "power3.out",
          },
          "<0.1"
        )

        /*
         * Previous image subtly retreats.
         */

        timeline.to(
          previousImage,
          {
            scale: 0.94,
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "<"
        )

        /*
         * Previous content leaves upward.
         */

        timeline.to(
          previousContent,
          {
            opacity: 0,
            y: -40,
            stagger: 0.04,
            duration: 0.6,
            ease: "power3.in",
          },
          "<"
        )

        /*
         * Once transition finishes, remove previous
         * panel from the visual stack.
         */

        timeline.set(previous, {
          opacity: 0,
          visibility: "hidden",
          zIndex: 0,
        })
      }

      ScrollTrigger.refresh()
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-svh min-h-170 overflow-hidden bg-[#182237] text-white"
    >
      {/* ================================================
          HEADER
      ================================================= */}

      <div className="absolute top-0 left-0 z-50 w-full px-6 pt-7 md:px-10 md:pt-9 lg:px-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/45 uppercase">
              Selected projects
            </span>

            <span className="h-px w-8 bg-white/20" />

            <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
              03
            </span>
          </div>

          <span className="font-mono text-[9px] tracking-[0.2em] text-white/35 uppercase">
            Scroll to explore
          </span>
        </div>
      </div>

      {/* ================================================
          PROJECT PANELS
      ================================================= */}

      <div ref={panelsRef} className="absolute inset-0">
        {projects.map((project, index) => (
          <article
            key={project.number}
            data-project-panel
            className="absolute inset-0"
          >
            <div className="mx-auto flex h-full w-full max-w-[1600px] items-center px-6 pt-20 pb-20 md:px-10 lg:px-16">
              <div className="grid w-full items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 xl:grid-cols-[0.8fr_1.2fr]">
                {/* ========================================
                    LEFT — PROJECT INFORMATION
                ======================================== */}

                <div className="relative z-20">
                  <div
                    data-project-content
                    className="mb-8 flex items-center gap-4"
                  >
                    <span className="font-mono text-xs text-white/40">
                      {project.number}
                    </span>

                    <span className="h-px w-8 bg-white/20" />

                    <span className="font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}

                  <div className="overflow-hidden">
                    {project.title.map((line) => (
                      <h2
                        key={line}
                        data-project-content
                        className="text-[clamp(3.5rem,6.5vw,7.5rem)] leading-[0.8] font-normal tracking-[-0.075em]"
                      >
                        {line}
                      </h2>
                    ))}
                  </div>

                  {/* Description */}

                  <p
                    data-project-content
                    className="mt-10 max-w-md text-sm leading-relaxed text-white/60 md:text-base"
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}

                  <div
                    data-project-content
                    className="mt-7 flex max-w-md flex-wrap gap-2"
                  >
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-white/15 px-3 py-1.5 font-mono text-[9px] tracking-[0.12em] text-white/45 uppercase"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Link */}

                  {project.href && (
                    <div data-project-content className="mt-9">
                      <Button
                        asChild
                        className="rounded-none bg-white text-[#182237] hover:bg-white/90"
                      >
                        <a
                          href={project.href}
                          target={
                            project.href.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            project.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          View project
                          <ArrowUpRight className="ml-2 size-4" />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>

                {/* ========================================
                    RIGHT — PROJECT IMAGE
                ======================================== */}

                <div
                  data-project-content
                  className="relative order-first h-[38vh] min-h-70 overflow-hidden sm:h-[45vh] lg:order-last lg:h-[68vh]"
                >
                  <div
                    data-project-image
                    className="absolute inset-0 will-change-transform"
                  >
                    <Image
                      src={project.image}
                      alt={project.title.join(" ")}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />

                    {/* Image treatment */}

                    <div className="absolute inset-0 bg-black/10" />

                    <div className="absolute inset-0 bg-linear-to-r from-[#182237]/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ================================================
          PROGRESS
      ================================================= */}

      <div className="absolute right-6 bottom-7 z-50 flex items-center gap-4 md:right-10 lg:right-16">
        <div className="flex gap-1">
          {projects.map((project) => (
            <span key={project.number} className="h-px w-6 bg-white/30" />
          ))}
        </div>

        <span className="font-mono text-[9px] tracking-[0.15em] text-white/35">
          01 — 03
        </span>
      </div>
    </section>
  )
}
