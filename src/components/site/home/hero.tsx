"use client"

import { useState, useLayoutEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"
import Link from "next/link"
import { ArrowUpRight, Download } from "lucide-react"
import { ResumeModal } from "@/components/site/resume-modal"

gsap.registerPlugin(TextPlugin)

const roles = [
  "Frontend Engineer",
  "Backend Engineer",
  "Fullstack Engineer",
  "UI Specialist",
]

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null)
  const typingTextRef = useRef<HTMLSpanElement>(null)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Page Entrance Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1 },
      })

      gsap.set(".hero-animate", { y: 40, opacity: 0 })
      gsap.set(".hero-bg", { scale: 1.1, opacity: 0 })

      tl.to(".hero-bg", {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      })
        .to(
          ".hero-badge",
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=1"
        )
        .to(
          ".hero-title",
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.6"
        )
        .to(
          ".hero-cta",
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.6"
        )

      // 2. Continuous Typing Loop using GSAP TextPlugin
      const typingTl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 })

      roles.forEach((role) => {
        typingTl
          .to(typingTextRef.current, {
            duration: role.length * 0.08,
            text: role,
            ease: "none",
          })
          .to({}, { duration: 1.8 }) // Pause on completed word
          .to(typingTextRef.current, {
            duration: role.length * 0.04,
            text: "",
            ease: "none",
          })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={rootRef}
        className="relative flex min-h-screen w-full items-center overflow-hidden px-6 pt-24 pb-16 md:px-12 lg:px-20"
      >
        {/* Background Video & Overlay */}
        <div className="hero-bg absolute inset-0 h-full w-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none h-full w-full object-cover"
          >
            <source src="/videos/hero.webm" type="video/webm" />
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/60" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="max-w-3xl lg:max-w-4xl">
            {/* Status Badge */}
            <div className="hero-badge hero-animate flex items-center gap-3">
              <span className="font-mono text-sm tracking-wider text-primary uppercase md:text-base">
                Samuel Olagoroye
              </span>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium tracking-widest text-zinc-400 uppercase">
                Available for work
              </span>
            </div>

            {/* Headline with Typing Effect */}
            <h1 className="hero-title hero-animate mt-6 text-4xl font-bold tracking-tight text-white capitalize sm:text-5xl md:text-6xl lg:text-7xl lg:leading-[1.1]">
              I&apos;m a{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                <span ref={typingTextRef}></span>
                <span className="animate-pulse font-light">|</span>
              </span>{" "}
              building fast, clean web experiences.
            </h1>

            {/* CTAs */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="hero-cta hero-animate h-14 px-8 text-base font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link
                  href="mailto:olagoroyesamuelakolawole@gmail.com"
                  className="flex items-center gap-2"
                >
                  <span>Contact Me</span>
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setIsResumeModalOpen(true)}
                className="hero-cta hero-animate h-14 border-white/20 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-md transition-transform hover:scale-[1.02] hover:bg-white/20 hover:text-white active:scale-[0.98]"
              >
                <Download className="mr-2 h-5 w-5" />
                <span>Download Resume</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Selection Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  )
}
