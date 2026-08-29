"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowUpRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/data"

gsap.registerPlugin(ScrollTrigger)

/*
const projects = [
  {
    title: "Ethereal Studio",
    description:
      "A refined creative portfolio built around strong typography and immersive visual storytelling.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1600&q=90",
    href: "#",
  },
  {
    title: "Nova Commerce",
    description:
      "A modern digital shopping experience focused on simplicity, performance, and conversion.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=90",
    href: "#",
  },
  {
    title: "Form & Function",
    description:
      "A visual identity and digital experience exploring the relationship between structure and creativity.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=90",
  },
  {
    title: "Architecture Archive",
    description:
      "A minimal platform designed to present architectural work through bold imagery and clean layouts.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=90",
    href: "#",
  },
  {
    title: "Mono Journal",
    description:
      "An editorial platform combining thoughtful content, expressive imagery, and a clean reading experience.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=90",
  },
]
*/

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current

    if (!section || !track) return

    const ctx = gsap.context(() => {
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth)

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden bg-background"
    >
      <div className="mx-auto flex h-screen flex-col justify-center">
        {/* Section heading */}
        <div className="mx-auto mb-10 grid w-full max-w-7xl grid-cols-2 items-end justify-between gap-10">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.25em] text-muted-foreground uppercase">
              Selected projects
            </p>

            <h2 className="text-[42px] leading-[0.98] font-normal tracking-[-1.8px] text-[#182237] sm:text-[50px] lg:text-[clamp(48px,4vw,64px)] lg:tracking-[-2.8px]">
              Previous work
            </h2>
          </div>

          <p className="hidden max-w-xs text-sm leading-relaxed text-muted-foreground md:block">
            I've built real things for real teams across finance, tech, and
            consulting, shipping frontend and backend work that people actually
            use.
          </p>
        </div>

        {/* Horizontal scroll track */}
        <div
          ref={trackRef}
          className="flex w-max gap-5 px-6 md:gap-6 md:px-10 lg:px-16"
        >
          {projects.map((project) => (
            <Card
              key={project.title}
              className="relative h-[65vh] w-[78vw] shrink-0 overflow-hidden rounded-none border-0 bg-black shadow-none md:w-[58vw] lg:w-[42vw]"
            >
              {/* Image */}
              <Image
                fill
                sizes="(max-width: 768px) 78vw, (max-width: 1024px) 58vw, 42vw"
                src={project.image}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content */}
              <CardContent className="absolute inset-x-0 bottom-0 z-10 p-6 text-white md:p-8">
                <h3 className="mb-2 text-2xl font-medium tracking-tight md:text-3xl">
                  {project.title}
                </h3>

                <p className="mb-5 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
                  {project.description}
                </p>

                {project.href && (
                  <Button
                    asChild
                    variant="secondary"
                    className="rounded-none bg-white text-black hover:bg-white/90"
                  >
                    <Button asChild variant="secondary" className="">
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View project
                      </Link>
                      <ArrowUpRight className="ml-2 size-4" />
                    </Button>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

//  px-6 md:px-10 lg:px-16
