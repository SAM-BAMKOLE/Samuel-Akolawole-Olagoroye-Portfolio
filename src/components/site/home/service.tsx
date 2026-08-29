"use client"

import { useCallback, useEffect, useState } from "react"
import { slides } from "@/lib/data"
import Image from "next/image"

const DURATION = 5000

export default function CarouselSection() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [progressKey, setProgressKey] = useState(0)
  const [progress, setProgress] = useState(false)

  const restartProgress = useCallback(() => {
    setProgress(false)
    setProgressKey((prev) => prev + 1)

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setProgress(true)
      })
    })
  }, [])

  const changeSlide = useCallback(
    (index: number) => {
      setActiveIndex(index)
      restartProgress()
    },
    [restartProgress]
  )

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length)
    restartProgress()
  }, [restartProgress])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setProgress(true)
    })

    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const timer = setTimeout(nextSlide, DURATION)

    return () => clearTimeout(timer)
  }, [activeIndex, progressKey, nextSlide])

  return (
    <section className="w-full overflow-hidden bg-[#f3f3f3] py-16 sm:py-20 lg:py-26.5">
      <div className="mx-auto grid w-[calc(100%-32px)] max-w-7xl grid-cols-1 items-center gap-12 sm:w-[calc(100%-48px)] lg:w-[calc(100%-80px)] lg:grid-cols-[minmax(0,1fr)_minmax(450px,625px)] lg:gap-16">
        {/* LEFT */}
        <div className="min-w-0">
          <h2 className="mb-10 text-[42px] leading-[0.98] font-normal tracking-[-1.8px] text-[#182237] sm:text-[50px] lg:mb-14.5 lg:text-[clamp(48px,4vw,64px)] lg:tracking-[-2.8px]">
            Let’s Build Something Great
          </h2>

          <div className="w-full">
            {slides.map((slide, index) => {
              const active = index === activeIndex

              return (
                <button
                  key={slide.title}
                  type="button"
                  onClick={() => changeSlide(index)}
                  className={[
                    "block w-full border-t border-[#dedede] bg-transparent pt-5 text-left lg:pt-6.5",
                    index === slides.length - 1 ? "border-b" : "",
                  ].join(" ")}
                >
                  {/* Title */}
                  <div className="grid min-h-10 grid-cols-[55px_1fr] items-center lg:min-h-11.25 lg:grid-cols-[80px_1fr]">
                    <span
                      className={[
                        "text-[22px] leading-none font-normal tracking-[-1px] transition-colors duration-300 lg:text-[30px]",
                        active ? "text-[#111d34]" : "text-[#858a94]",
                      ].join(" ")}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={[
                        "text-[24px] leading-[1.1] font-normal tracking-[-0.7px] transition-colors duration-300 lg:text-[32px] lg:tracking-[-1.2px]",
                        active ? "text-[#111d34]" : "text-[#858a94]",
                      ].join(" ")}
                    >
                      {slide.title}
                    </span>
                  </div>

                  {/* Description */}
                  <div
                    className={[
                      "grid transition-all duration-500",
                      active
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="mt-3 mb-6 ml-13.75 max-w-137.5 text-base leading-[1.45] font-normal text-[#17243a] lg:mt-4.5 lg:mb-7.5 lg:ml-20 lg:text-[18px] lg:leading-normal">
                        {slide.description}
                      </p>
                    </div>
                  </div>

                  {/* Loading bar */}
                  <div className="relative mt-5 h-px w-full overflow-hidden bg-[#dedede] lg:mt-7">
                    {active && (
                      <span
                        key={progressKey}
                        className={[
                          "absolute inset-y-0 left-0 bg-[#ff3039]",
                          "transition-[width] ease-linear",
                          progress ? "w-full" : "w-0",
                        ].join(" ")}
                        style={{
                          transitionDuration: `${DURATION}ms`,
                        }}
                      />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative order-2 aspect-3/4 w-full overflow-hidden bg-gray-300 lg:aspect-528/625">
          {slides.map((slide, index) => (
            <Image
              key={slide.image}
              src={slide.image}
              fill
              sizes="300px"
              alt=""
              className={[
                "absolute inset-0 h-full w-full object-cover",
                "transition-all duration-500 ease-out",
                index === activeIndex
                  ? "scale-100 opacity-100"
                  : "scale-[1.015] opacity-0",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
