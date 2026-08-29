"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Mail, MapPin, Menu, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const detailsRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const inner = innerRef.current
    const details = detailsRef.current

    if (!nav || !inner || !details) return

    /*
     * --------------------------------------------------
     * INITIAL STATE
     * --------------------------------------------------
     */

    gsap.set(nav, {
      width: "min(92vw, 1180px)",
      top: 20,
      left: "50%",
      xPercent: -50,
    })

    gsap.set(inner, {
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(0px)",
      boxShadow: "0 12px 40px rgba(24,34,55,0.08)",
    })

    /*
     * --------------------------------------------------
     * SCROLL STATE
     * --------------------------------------------------
     */

    const onScroll = () => {
      const scrolled = window.scrollY > 60

      if (scrolled) {
        gsap.to(nav, {
          width: "100%",
          top: 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        })

        gsap.to(inner, {
          borderRadius: 0,
          backgroundColor: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)",
          boxShadow: "0 8px 30px rgba(24,34,55,0.06)",
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        })

        gsap.to(details, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        })
      } else {
        gsap.to(nav, {
          width: "min(92vw, 1180px)",
          top: 20,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        })

        gsap.to(inner, {
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(0px)",
          boxShadow: "0 12px 40px rgba(24,34,55,0.08)",
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
        })

        gsap.to(details, {
          opacity: 0.8,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        })
      }
    }

    window.addEventListener("scroll", onScroll, {
      passive: true,
    })

    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  /*
   * --------------------------------------------------
   * MOBILE MENU
   * --------------------------------------------------
   */

  useEffect(() => {
    const menu = menuRef.current
    const nav = navRef.current
    const inner = innerRef.current

    if (!menu || !nav || !inner) return

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    })

    if (menuOpen) {
      /*
       * Open menu.
       *
       * Remove the floating shape first so the expanded
       * mobile menu becomes a clean rectangular panel.
       */

      tl.to(
        inner,
        {
          borderRadius: 0,
          duration: 0.25,
        },
        0
      )

      tl.to(
        menu,
        {
          height: "auto",
          opacity: 1,
          duration: 0.4,
        },
        0.05
      )
    } else {
      /*
       * Close menu first.
       */

      tl.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.inOut",
      })

      /*
       * Only restore the rounded floating shape if we're
       * at the top of the page.
       */

      if (window.scrollY <= 60) {
        tl.to(
          inner,
          {
            borderRadius: 999,
            duration: 0.3,
          },
          "-=0.15"
        )
      }
    }

    return () => {
      tl.kill()
    }
  }, [menuOpen])

  return (
    <nav ref={navRef} className="fixed z-100 overflow-hidden">
      <div
        ref={innerRef}
        className="relative overflow-hidden border border-[#182237]/10"
      >
        {/* ==============================================
            MAIN NAV
        ============================================== */}

        <div className="flex h-17 items-center justify-between px-5 md:h-18.5 md:px-8 lg:px-10">
          {/* LOGO */}

          <a
            href="#"
            className="shrink-0 text-base font-semibold tracking-[-0.04em] text-[#182237] md:text-base"
          >
            SAM.BAMICOLE
          </a>

          {/* CONTACT DETAILS */}

          <div ref={detailsRef} className="hidden items-center gap-8 lg:flex">
            {/* EMAIL */}

            <a
              href="mailto:olagoroyesamuelakolawole@gmail.com"
              className="group flex items-center gap-2 text-xs tracking-[0.08em] text-[#182237]/60 transition-colors hover:text-[#182237]"
            >
              <Mail className="size-3.5" />

              <span>olagoroyesamuelakolawole@gmail.com</span>
            </a>

            {/* PHONE */}

            <a
              href="tel:09134115254"
              className="group flex items-center gap-2 text-xs tracking-[0.08em] text-[#182237]/60 transition-colors hover:text-[#182237]"
            >
              <Phone className="size-3.5" />

              <span>09134115254</span>
            </a>

            {/* LOCATION */}

            <div className="flex items-center gap-2 text-xs tracking-[0.12em] text-[#182237]/60">
              <MapPin className="size-3.5" />

              <span>IBADAN, NIGERIA</span>
            </div>
          </div>

          {/* DESKTOP ACTION */}

          <div className="hidden md:block">
            <Button
              asChild
              size="sm"
              className="h-9 rounded-full bg-[#182237] px-5 text-xs tracking-[0.12em] text-white uppercase hover:bg-[#182237]/90"
            >
              <a href="#contact">Let's talk</a>
            </Button>
          </div>

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-9 items-center justify-center rounded-full border border-[#182237]/10 text-[#182237] md:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        {/* ==============================================
            MOBILE MENU
        ============================================== */}

        <div ref={menuRef} className="h-0 overflow-hidden opacity-0 md:hidden">
          <div className="border-t border-[#182237]/10 px-5 pt-5 pb-6">
            <div className="grid gap-4">
              <a
                href="mailto:olagoroyesamuelakolawole@gmail.com"
                className="flex items-center gap-3 text-xs text-[#182237]/65"
              >
                <Mail className="size-4" />

                <span className="break-all">
                  olagoroyesamuelakolawole@gmail.com
                </span>
              </a>

              <a
                href="tel:09134115254"
                className="flex items-center gap-3 text-xs text-[#182237]/65"
              >
                <Phone className="size-4" />

                <span>09134115254</span>
              </a>

              <div className="flex items-center gap-3 text-xs text-[#182237]/65">
                <MapPin className="size-4" />

                <span>IBADAN, NIGERIA</span>
              </div>

              <Button
                asChild
                className="mt-3 w-full rounded-none bg-[#182237] text-xs tracking-[0.12em] uppercase"
              >
                <a href="#contact" onClick={() => setMenuOpen(false)}>
                  Let's talk
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
