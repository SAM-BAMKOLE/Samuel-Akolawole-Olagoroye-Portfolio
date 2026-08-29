"use client"

import Image from "next/image"
import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function PersonImage() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const text1Ref = useRef<HTMLParagraphElement>(null)
  const text2Ref = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // 1. Image scale-on-scroll (scrubbed)
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      )

      // 2. "ABOUT ME" – faded → full color / opacity reveal
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0.15,
          color: "rgba(255,255,255,0.25)",
        },
        {
          opacity: 1,
          color: "rgba(255,255,255,1)",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "center center",
            scrub: 1,
          },
        }
      )

      // 3. Side texts – slide in only after scrolling a certain distance
      // Left paragraph (from left)
      gsap.fromTo(
        text1Ref.current,
        { x: -80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top+=25% top",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Right paragraph (from right)
      gsap.fromTo(
        text2Ref.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top+=35% top",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Bottom-left label (from left)
      gsap.fromTo(
        labelRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top+=45% top",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Bottom-right location (from right)
      gsap.fromTo(
        locationRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top+=50% top",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, section) // scope all selectors/animations to this section

    return () => ctx.revert() // kills tweens + ScrollTriggers on unmount
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-0 h-[200svh]" // taller so there is scroll distance while content is sticky
    >
      {/* Sticky image + content layer */}
      <div className="relative sticky top-0 h-[100svh] w-full overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/person.png"
            alt="Olagoroye Samuel"
            fill
            priority
            sizes="100vw"
            className="pointer-events-none object-cover object-center"
          />
        </div>

        {/* Optional overlay for text readability */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Large title – faded → solid on scroll */}
        <h2
          ref={titleRef}
          className="absolute top-[8%] left-[5%] z-10 max-w-[90vw] text-6xl leading-[0.85] font-semibold tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[13rem]"
        >
          ABOUT
          <br />
          ME
        </h2>

        {/* Text block 1 – slides in from left */}
        <p
          ref={text1Ref}
          className="absolute top-[52%] left-[6%] z-10 max-w-[240px] text-xs leading-relaxed text-white/80 sm:max-w-xs md:max-w-sm md:text-sm lg:left-[10%]"
        >
          I am a creative developer and designer focused on building thoughtful
          digital experiences that combine design, technology, and storytelling.
        </p>

        {/* Text block 2 – slides in from right */}
        <p
          ref={text2Ref}
          className="absolute top-[55%] right-[6%] z-10 max-w-[220px] text-right text-xs leading-relaxed text-white/80 sm:max-w-xs md:text-sm lg:right-[10%] lg:max-w-sm"
        >
          My work explores the balance between visual expression and functional
          interaction, creating experiences that feel both intentional and
          memorable.
        </p>

        {/* Small label – slides in from left */}
        <div
          ref={labelRef}
          className="absolute bottom-[8%] left-[6%] z-10 text-[10px] font-medium tracking-[0.3em] text-white/70 uppercase md:text-xs lg:left-[10%]"
        >
          Creative Developer — 2026
        </div>

        {/* Decorative text – slides in from right */}
        <div
          ref={locationRef}
          className="absolute right-[6%] bottom-[8%] z-10 text-right text-xs tracking-[0.25em] text-white/70 uppercase md:text-sm lg:right-[10%]"
        >
          Ibadan
          <br />
          Nigeria
        </div>
      </div>
    </section>
  )
}
