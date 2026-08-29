import { Geist, Geist_Mono, Manrope, Orbitron } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const manrope = Manrope({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

export const metadata: Metadata = {
  title: "Samuel Olagoroye | Front End & Back End Engineer",
  description: `I’m a Front End Engineer with ${(new Date().getFullYear() as number) - 2022}+ years of experience building web applications with React, TypeScript, NodeJs and Python. I enjoy turning ideas into interactive, reliable products and working across the frontend, APIs, testing, and backend to solve real problems.`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        manrope.variable,
        orbitron.variable,
        "scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent"
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
