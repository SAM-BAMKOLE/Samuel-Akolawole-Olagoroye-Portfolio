"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight, Code2, GraduationCap, MapPin } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

export default function Education() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const degreeCardRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    const degreeCard = degreeCardRef.current

    if (!section || !scene || !degreeCard) return

    const ctx = gsap.context(() => {
      const floatingElements = gsap.utils.toArray<HTMLElement>(
        scene.querySelectorAll("[data-float]")
      )

      /*
       * Main entrance animation
       */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      })

      tl.from("[data-eyebrow]", {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          "[data-title]",
          {
            yPercent: 110,
            rotateX: -60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .from(
          degreeCard,
          {
            y: 160,
            rotateX: -25,
            rotateY: 18,
            scale: 0.85,
            opacity: 0,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=0.7"
        )
        .from(
          "[data-info]",
          {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.8"
        )

      /*
       * Floating elements
       */
      floatingElements.forEach((element, index) => {
        const distance = 15 + index * 8
        const duration = 3 + index * 0.8

        gsap.to(element, {
          y: index % 2 === 0 ? -distance : distance,
          x: index % 2 === 0 ? distance / 2 : -distance / 2,
          rotation: index % 2 === 0 ? 8 : -8,
          duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      /*
       * Gentle 3D movement while scrolling
       */
      gsap.to(degreeCard, {
        rotateY: -12,
        rotateX: 8,
        y: -40,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      /*
       * Mouse-controlled 3D tilt
       */
      const handleMouseMove = (event: MouseEvent) => {
        const rect = section.getBoundingClientRect()

        const x = (event.clientX - rect.left) / rect.width
        const y = (event.clientY - rect.top) / rect.height

        gsap.to(degreeCard, {
          rotateY: (x - 0.5) * 14,
          rotateX: (0.5 - y) * 10,
          duration: 0.8,
          ease: "power3.out",
        })

        floatingElements.forEach((element, index) => {
          const depth = (index + 1) * 3

          gsap.to(element, {
            xPercent: (x - 0.5) * depth,
            yPercent: (y - 0.5) * depth,
            duration: 1,
            ease: "power3.out",
          })
        })
      }

      const handleMouseLeave = () => {
        gsap.to(degreeCard, {
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
        })

        floatingElements.forEach((element) => {
          gsap.to(element, {
            xPercent: 0,
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
          })
        })
      }

      section.addEventListener("mousemove", handleMouseMove)
      section.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        section.removeEventListener("mousemove", handleMouseMove)
        section.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-primary py-28 text-primary-foreground md:py-40"
      style={{
        perspective: "1200px",
      }}
    >
      <div
        ref={sceneRef}
        className="relative mx-auto min-h-[800px] w-full max-w-7xl px-6 md:px-10 lg:px-16"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Background typography */}
        <div className="pointer-events-none absolute top-[5%] left-1/2 -translate-x-1/2 whitespace-nowrap select-none">
          <span className="text-[24vw] leading-none font-semibold tracking-[-0.1em] text-primary-foreground/[0.08]">
            EDUCATION
          </span>
        </div>

        {/* Eyebrow */}
        <div className="relative z-10 pt-8">
          <p
            data-eyebrow
            className="text-xs font-medium tracking-[0.3em] uppercase"
          >
            Academic foundation
          </p>
        </div>

        {/* Main title */}
        <div className="relative z-10 mt-12 max-w-4xl">
          <div className="overflow-hidden">
            <h2
              data-title
              className="text-[clamp(4.5rem,13vw,12rem)] leading-[0.75] font-normal tracking-[-0.08em]"
              style={{ transformOrigin: "bottom center" }}
            >
              BUILT
            </h2>
          </div>

          <div className="overflow-hidden">
            <h2
              data-title
              className="ml-[8vw] text-[clamp(4.5rem,13vw,12rem)] leading-[0.75] font-normal tracking-[-0.08em]"
              style={{ transformOrigin: "bottom center" }}
            >
              TO LEARN.
            </h2>
          </div>
        </div>

        {/* Main 3D degree card */}
        <Card
          ref={degreeCardRef}
          className="relative z-20 mt-24 ml-auto w-full max-w-2xl rounded-none border border-primary-foreground/30 bg-primary-foreground text-foreground shadow-2xl md:mt-32"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <CardContent className="relative p-6 sm:p-10 md:p-14">
            {/* Card number */}
            <span
              data-info
              className="absolute top-6 right-6 text-xs tracking-[0.25em] text-muted-foreground sm:top-10 sm:right-10"
            >
              01 / 01
            </span>

            <Badge
              data-info
              variant="outline"
              className="rounded-none border-border"
            >
              2026
            </Badge>

            <div className="mt-20 md:mt-28">
              <div
                data-info
                className="mb-6 flex size-14 items-center justify-center border border-border"
              >
                <GraduationCap className="size-7" />
              </div>

              <p
                data-info
                className="mb-3 text-xs tracking-[0.25em] text-muted-foreground uppercase"
              >
                Bachelor of Science
              </p>

              <h3
                data-info
                className="max-w-xl text-4xl leading-[0.9] font-normal tracking-[-0.06em] sm:text-5xl md:text-7xl"
              >
                Computer
                <br />
                Science.
              </h3>
            </div>

            <div className="mt-16 grid gap-8 border-t border-border pt-6 sm:grid-cols-2 md:mt-24">
              <div data-info>
                <p className="mb-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  Institution
                </p>

                <p className="text-sm leading-relaxed">
                  Federal University Oye-Ekiti
                </p>
              </div>

              <div data-info>
                <p className="mb-2 text-[10px] tracking-[0.25em] text-muted-foreground uppercase">
                  Location
                </p>

                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="size-4" />
                  Oye-Ekiti, Nigeria
                </div>
              </div>
            </div>

            {/* Decorative corner */}
            <ArrowUpRight className="absolute right-6 bottom-6 size-7 sm:right-10 sm:bottom-10" />
          </CardContent>
        </Card>

        {/* Floating element — code */}
        <div
          data-float
          className="absolute top-[35%] left-[4%] z-30 hidden border border-primary-foreground/30 bg-primary px-5 py-4 shadow-lg sm:block"
          style={{ transform: "translateZ(80px)" }}
        >
          <Code2 className="size-7" />
        </div>

        {/* Floating element — degree */}
        <div
          data-float
          className="absolute top-[58%] left-[8%] z-30 border border-primary-foreground/30 bg-primary px-6 py-5 text-xs tracking-[0.2em] uppercase shadow-lg"
          style={{ transform: "translateZ(120px)" }}
        >
          B.Sc
        </div>

        {/* Floating element — graduation */}
        <div
          data-float
          className="absolute top-[22%] right-[6%] z-30 border border-primary-foreground/30 bg-primary p-5 shadow-lg"
          style={{ transform: "translateZ(100px)" }}
        >
          <GraduationCap className="size-8" />
        </div>

        {/* Floating year */}
        <div
          data-float
          className="pointer-events-none absolute top-[38%] -right-[2%] z-40 text-[clamp(5rem,11vw,13rem)] leading-none font-normal tracking-[-0.1em] text-primary-foreground"
          style={{
            transform: "translateZ(180px)",
          }}
        >
          2026
        </div>

        {/* Bottom statement */}
        <p className="absolute bottom-0 left-6 z-10 max-w-xs text-sm leading-relaxed md:left-10 lg:left-16">
          A foundation in computer science, strengthened through practical
          development, data systems, and applied machine learning.
        </p>
      </div>
    </section>
  )
}
