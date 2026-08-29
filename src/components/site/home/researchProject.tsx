"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDownToLine, ArrowUpRight, AudioLines, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

gsap.registerPlugin(ScrollTrigger)

const scenes = [
  {
    number: "01",
    type: "intro",
  },
  {
    number: "02",
    type: "model",
  },
  {
    number: "03",
    type: "modalities",
  },
  {
    number: "04",
    type: "results",
  },
  {
    number: "05",
    type: "prototype",
  },
]

export default function ResearchProject() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const scenesRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const container = scenesRef.current

    if (!section || !container) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll("[data-scene]")
      )

      panels.forEach((panel, index) => {
        const title = panel.querySelectorAll("[data-title]")
        const content = panel.querySelectorAll("[data-content]")
        const visuals = panel.querySelectorAll("[data-visual]")

        if (index === 0) {
          gsap.set(panel, {
            autoAlpha: 1,
            pointerEvents: "auto",
          })

          return
        }

        gsap.set(panel, {
          autoAlpha: 0,
          pointerEvents: "none",
        })

        gsap.set(title, {
          yPercent: 120,
        })

        gsap.set(content, {
          y: 40,
          opacity: 0,
        })

        gsap.set(visuals, {
          scale: 0.85,
          opacity: 0,
        })
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * scenes.length}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return

        const previousPanel = panels[index - 1]

        const currentTitle = panel.querySelectorAll("[data-title]")
        const previousTitle = previousPanel.querySelectorAll("[data-title]")

        const currentContent = panel.querySelectorAll("[data-content]")

        const previousContent = previousPanel.querySelectorAll("[data-content]")

        const currentVisual = panel.querySelectorAll("[data-visual]")

        const previousVisual = previousPanel.querySelectorAll("[data-visual]")

        timeline
          .set(
            panel,
            {
              autoAlpha: 1,
              pointerEvents: "auto",
            },
            `scene-${index}`
          )

          .set(
            previousPanel,
            {
              pointerEvents: "none",
            },
            `scene-${index}`
          )

          .to(
            previousTitle,
            {
              yPercent: -120,
              duration: 0.7,
              stagger: 0.04,
              ease: "power4.in",
            },
            `scene-${index}`
          )

          .to(
            previousContent,
            {
              y: -40,
              opacity: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "power3.in",
            },
            `scene-${index}`
          )

          .to(
            previousVisual,
            {
              scale: 1.1,
              opacity: 0,
              duration: 0.6,
              stagger: 0.04,
              ease: "power3.in",
            },
            `scene-${index}`
          )

          .to(
            currentTitle,
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.05,
              ease: "power4.out",
            },
            `scene-${index}+=0.1`
          )

          .to(
            currentVisual,
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: "power3.out",
            },
            `scene-${index}+=0.15`
          )

          .to(
            currentContent,
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.06,
              ease: "power3.out",
            },
            `scene-${index}+=0.3`
          )

          .set(
            previousPanel,
            {
              autoAlpha: 0,
            },
            `scene-${index}+=1`
          )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-[#0c0f14] text-white"
    >
      {/* Header */}

      <div className="absolute top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-6 md:px-10 lg:px-16">
        <p className="text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
          Final year project
        </p>

        <p className="text-xs font-medium tracking-[0.25em] text-white/40">
          Research / 2026
        </p>
      </div>

      <div ref={scenesRef} className="relative h-full w-full">
        {scenes.map((scene) => (
          <article
            key={scene.number}
            data-scene
            className="absolute inset-0 flex min-h-screen items-center"
          >
            {/* =========================
                01 — INTRO
            ========================== */}

            {scene.type === "intro" && (
              <div className="w-full px-6 md:px-10 lg:px-16">
                <p
                  data-content
                  className="mb-8 text-[10px] tracking-[0.3em] text-white/40 uppercase"
                >
                  01 — The project
                </p>

                <div className="overflow-hidden">
                  <h2
                    data-title
                    className="max-w-375 text-[clamp(4.5rem,10.5vw,13rem)] leading-[0.78] font-normal tracking-[-0.085em]"
                  >
                    I BUILT A
                  </h2>
                </div>

                <div className="overflow-hidden">
                  <h2
                    data-title
                    className="text-[clamp(4.5rem,10.5vw,13rem)] leading-[0.78] font-normal tracking-[-0.085em]"
                  >
                    DEPRESSION
                  </h2>
                </div>

                <div className="overflow-hidden">
                  <h2
                    data-title
                    className="text-[clamp(4.5rem,10.5vw,13rem)] leading-[0.78] font-normal tracking-[-0.085em] text-white/35"
                  >
                    DETECTION MODEL.
                  </h2>
                </div>

                <div
                  data-content
                  className="mt-10 flex max-w-2xl flex-col gap-6 md:mr-[10%] md:ml-auto"
                >
                  <p className="text-sm leading-relaxed text-white/60 md:text-base">
                    The model uses visual and audio information to identify
                    patterns associated with depression, with a Shifted Window
                    Transformer architecture used as the primary approach.
                  </p>

                  <Button
                    asChild
                    variant="outline"
                    className="w-fit rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
                  >
                    <Link
                      href="/files/depression-detection-project.pptx"
                      download
                    >
                      Download project presentation
                      <ArrowDownToLine className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}

            {/* =========================
                02 — MODEL
            ========================== */}

            {scene.type === "model" && (
              <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
                <div>
                  <p
                    data-content
                    className="mb-8 text-[10px] tracking-[0.3em] text-white/40 uppercase"
                  >
                    02 — The model
                  </p>

                  <div className="overflow-hidden">
                    <h2
                      data-title
                      className="text-[clamp(4.5rem,9vw,11rem)] leading-[0.76] tracking-[-0.08em]"
                    >
                      SHIFTED
                    </h2>
                  </div>

                  <div className="overflow-hidden">
                    <h2
                      data-title
                      className="text-[clamp(4.5rem,9vw,11rem)] leading-[0.76] tracking-[-0.08em] text-white/35"
                    >
                      WINDOWS.
                    </h2>
                  </div>

                  <p
                    data-content
                    className="mt-8 max-w-lg text-sm leading-relaxed text-white/60 md:text-base"
                  >
                    I compared a Swin Transformer architecture against a CNN
                    baseline to evaluate how effectively the models could
                    distinguish between depressed and non-depressed individuals.
                  </p>
                </div>

                <div className="relative flex min-h-80 items-center justify-center">
                  <div
                    data-visual
                    className="absolute grid size-65 grid-cols-4 gap-2 border border-white/10 p-4 md:size-105"
                  >
                    {Array.from({ length: 16 }).map((_, index) => (
                      <div
                        key={index}
                        className="border border-white/15 bg-white/4"
                      />
                    ))}
                  </div>

                  <div
                    data-visual
                    className="relative z-10 border border-white/30 bg-[#0c0f14] px-6 py-4 text-center"
                  >
                    <p className="text-[10px] tracking-[0.3em] text-white/40 uppercase">
                      Architecture
                    </p>

                    <p className="mt-2 text-xl tracking-[-0.04em]">
                      Swin Transformer
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* =========================
                03 — MODALITIES
            ========================== */}

            {scene.type === "modalities" && (
              <div className="mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16">
                <p
                  data-content
                  className="mb-8 text-[10px] tracking-[0.3em] text-white/40 uppercase"
                >
                  03 — What mattered
                </p>

                <div className="grid gap-8 lg:grid-cols-2">
                  <div
                    data-visual
                    className="relative min-h-95 overflow-hidden border border-white/15 p-8 md:p-12"
                  >
                    <AudioLines className="absolute top-8 right-8 size-8 text-white/30" />

                    <div className="flex h-full flex-col justify-end">
                      <p className="text-xs tracking-[0.3em] text-white/40 uppercase">
                        Audio only
                      </p>

                      <div className="mt-6 overflow-hidden">
                        <h2
                          data-title
                          className="text-[clamp(5rem,10vw,10rem)] leading-none tracking-[-0.08em]"
                        >
                          0.587
                        </h2>
                      </div>

                      <p
                        data-content
                        className="mt-5 max-w-sm text-sm leading-relaxed text-white/55"
                      >
                        Audio features alone performed only slightly better than
                        random guessing.
                      </p>
                    </div>
                  </div>

                  <div
                    data-visual
                    className="relative min-h-95 overflow-hidden border border-white/15 bg-white p-8 text-black md:p-12"
                  >
                    <Eye className="absolute top-8 right-8 size-8 text-black/30" />

                    <div className="flex h-full flex-col justify-end">
                      <p className="text-xs tracking-[0.3em] text-black/40 uppercase">
                        Visual only
                      </p>

                      <div className="mt-6 overflow-hidden">
                        <h2
                          data-title
                          className="text-[clamp(5rem,10vw,10rem)] leading-none tracking-[-0.08em]"
                        >
                          0.784
                        </h2>
                      </div>

                      <p
                        data-content
                        className="mt-5 max-w-sm text-sm leading-relaxed text-black/55"
                      >
                        Visual features provided substantially stronger results.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  data-content
                  className="mt-8 border-t border-white/15 pt-6"
                >
                  <p className="max-w-3xl text-xl leading-tight tracking-[-0.04em] text-white/80 md:text-3xl">
                    Combining both modalities is what pushed the model
                    performance further.
                  </p>
                </div>
              </div>
            )}

            {/* =========================
                04 — RESULTS
            ========================== */}

            {scene.type === "results" && (
              <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1.4fr_0.6fr] lg:px-16">
                <div>
                  <p
                    data-content
                    className="mb-8 text-[10px] tracking-[0.3em] text-white/40 uppercase"
                  >
                    04 — The result
                  </p>

                  <div className="overflow-hidden">
                    <h2
                      data-title
                      className="text-[clamp(7rem,18vw,20rem)] leading-[0.7] -tracking-widest"
                    >
                      0.846
                    </h2>
                  </div>

                  <p
                    data-content
                    className="mt-8 text-sm tracking-[0.25em] text-white/40 uppercase"
                  >
                    AUC-ROC — Swin Transformer
                  </p>
                </div>

                <div className="flex flex-col justify-end">
                  <div data-visual className="border-t border-white/20 pt-6">
                    <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase">
                      Compared with
                    </p>

                    <p className="mt-4 text-6xl leading-none tracking-[-0.07em] text-white/35 md:text-8xl">
                      0.817
                    </p>

                    <p className="mt-3 text-xs tracking-[0.2em] text-white/35 uppercase">
                      CNN baseline
                    </p>
                  </div>

                  <p
                    data-content
                    className="mt-10 text-base leading-relaxed text-white/70 md:text-lg"
                  >
                    The Swin Transformer outperformed the CNN baseline on
                    <span className="text-white"> 4 out of 5 metrics</span>,
                    including a higher AUC-ROC, showing stronger reliability in
                    distinguishing depressed from non-depressed individuals.
                  </p>
                </div>
              </div>
            )}

            {/* =========================
                05 — LIMITATION / NEXT
            ========================== */}

            {scene.type === "prototype" && (
              <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 md:px-10 lg:grid-cols-[1fr_1fr] lg:px-16">
                <div>
                  <p
                    data-content
                    className="mb-8 text-[10px] tracking-[0.3em] text-white/40 uppercase"
                  >
                    05 — The important part
                  </p>

                  <div className="overflow-hidden">
                    <h2
                      data-title
                      className="text-[clamp(6rem,15vw,17rem)] leading-[0.72] -tracking-widest"
                    >
                      ~77%
                    </h2>
                  </div>

                  <div className="overflow-hidden">
                    <h2
                      data-title
                      className="text-[clamp(3.5rem,8vw,9rem)] leading-[0.78] tracking-[-0.08em] text-white/35"
                    >
                      ACCURACY.
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col justify-end">
                  <Badge
                    data-visual
                    variant="outline"
                    className="mb-8 w-fit rounded-none border-white/20 px-4 py-2 text-white/60"
                  >
                    RESEARCH PROTOTYPE
                  </Badge>

                  <p
                    data-content
                    className="max-w-xl text-2xl leading-[1.1] tracking-[-0.04em] text-white md:text-4xl"
                  >
                    This is not a clinically validated diagnostic tool.
                  </p>

                  <p
                    data-content
                    className="mt-6 max-w-lg text-sm leading-relaxed text-white/55 md:text-base"
                  >
                    The next stage is to improve the audio features, strengthen
                    the dataset, and test the system on a Nigerian population
                    before making stronger conclusions about real-world use.
                  </p>

                  <Button
                    data-content
                    asChild
                    variant="outline"
                    className="mt-8 w-fit rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
                  >
                    <Link
                      href="/files/depression-detection-project.pptx"
                      download
                    >
                      View the full project
                      <ArrowUpRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      {/* Scene progress */}

      <div className="absolute right-6 bottom-8 left-6 z-50 flex gap-2 md:right-10 md:left-10 lg:right-16 lg:left-16">
        {scenes.map((scene) => (
          <div key={scene.number} className="h-px flex-1 bg-white/20" />
        ))}
      </div>
    </section>
  )
}
