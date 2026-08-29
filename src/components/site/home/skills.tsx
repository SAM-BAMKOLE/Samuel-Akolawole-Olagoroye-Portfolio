"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  {
    name: "REACT",
    category: "Frontend",
    className: "left-[5%] top-[12%] text-[clamp(2rem,6vw,7rem)]",
  },
  {
    name: "NEXT.JS",
    category: "Frontend",
    className: "right-[5%] top-[18%] text-[clamp(2rem,5vw,6rem)]",
  },
  {
    name: "NODE.JS",
    category: "Backend",
    className: "left-[8%] bottom-[15%] text-[clamp(2rem,5.5vw,6.5rem)]",
  },
  {
    name: "DJANGO",
    category: "Backend",
    className: "right-[7%] bottom-[18%] text-[clamp(2rem,5vw,6rem)]",
  },
  {
    name: "PYTHON",
    category: "Data",
    className: "left-[22%] top-[32%] text-[clamp(1.5rem,4vw,4.5rem)]",
  },
  {
    name: "POSTGRESQL",
    category: "Database",
    className: "right-[18%] top-[42%] text-[clamp(1.4rem,4vw,4.5rem)]",
  },
  {
    name: "PYTORCH",
    category: "AI / ML",
    className: "left-[28%] bottom-[8%] text-[clamp(1.5rem,3.5vw,4rem)]",
  },
  {
    name: "TENSORFLOW",
    category: "AI / ML",
    className: "right-[28%] bottom-[7%] text-[clamp(1.3rem,3vw,3.5rem)]",
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      const skillElements = gsap.utils.toArray<HTMLElement>("[data-skill]")

      /*
       * Initial state
       */
      gsap.set(skillElements, {
        opacity: 0,
        scale: 0.7,
        filter: "blur(12px)",
      })

      /*
       * Entrance animation
       */
      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      })

      entrance.to(skillElements, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: {
          amount: 0.8,
          from: "random",
        },
        ease: "power4.out",
      })

      /*
       * Individual parallax movement
       */
      skillElements.forEach((skill, index) => {
        const direction = index % 2 === 0 ? 1 : -1

        gsap.to(skill, {
          x: direction * (60 + index * 15),
          y: direction * -(30 + index * 10),
          rotation: direction * (4 + index),
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
       * Main heading scale effect
       */
      gsap.fromTo(
        "[data-main-title]",
        {
          scale: 0.8,
          opacity: 0,
          rotateX: -40,
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#f4f1ea] text-[#182237]"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Background label */}

      <div className="absolute top-8 left-6 z-20 md:left-10 lg:left-16">
        <p className="text-xs font-medium tracking-[0.3em] text-[#182237]/50 uppercase">
          Technical toolbox
        </p>
      </div>

      {/* Background grid */}

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#182237_1px,transparent_1px),linear-gradient(to_bottom,#182237_1px,transparent_1px)] opacity-[0.07]" />

      {/* Floating skill names */}

      <div className="absolute inset-0">
        {skills.map((skill) => (
          <div
            key={skill.name}
            data-skill
            className={`absolute z-10 select-none ${skill.className}`}
          >
            <span className="block font-normal tracking-[-0.07em] text-[#182237]">
              {skill.name}
            </span>

            <span className="mt-1 block text-[9px] font-medium tracking-[0.25em] text-[#182237]/40 uppercase md:text-[10px]">
              {skill.category}
            </span>
          </div>
        ))}
      </div>

      {/* Central content */}

      <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
        <div
          data-main-title
          className="max-w-3xl text-center"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          <p className="mb-6 text-xs tracking-[0.3em] text-[#182237]/50 uppercase">
            Languages, frameworks & systems
          </p>

          <h2 className="text-[clamp(4.5rem,12vw,14rem)] leading-[0.72] font-normal tracking-[-0.09em]">
            WHAT I
            <br />
            WORK WITH.
          </h2>

          <p className="mx-auto mt-10 max-w-sm text-sm leading-relaxed text-[#182237]/60 md:text-base">
            A collection of technologies I use to build interfaces, backend
            systems, data pipelines, and machine learning applications.
          </p>
        </div>
      </div>

      {/* Bottom counter */}

      <div className="absolute right-6 bottom-8 z-20 md:right-10 lg:right-16">
        <p className="text-xs tracking-[0.25em] text-[#182237]/50 uppercase">
          Scroll to explore
        </p>
      </div>
    </section>
  )
}
