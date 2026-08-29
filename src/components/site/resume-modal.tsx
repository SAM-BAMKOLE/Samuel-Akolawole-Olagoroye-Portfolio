"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Code2, Database, Download } from "lucide-react"

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
}

const resumeOptions = [
  {
    title: "Frontend Engineer",
    description: "Focus on Next.js, React, GSAP, UI/UX performance, and WebGL.",
    icon: Code2,
    href: "/resumes/Samuel_Olagoroye_Frontend.pdf",
  },
  {
    title: "Backend Engineer",
    description: "Focus on Node.js, Distributed Systems, SQL/NoSQL, and APIs.",
    icon: Database,
    href: "/resumes/Samuel_Olagoroye_Backend.pdf",
  },
  //   {
  //     title: "Fullstack Engineer",
  //     description:
  //       "End-to-end architecture, modern JS stacks, and system integration.",
  //     icon: Layers,
  //     href: "/resumes/Samuel_Olagoroye_Fullstack.pdf",
  //   },
]

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Select Resume Version
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Choose the CV tailored to the role you are hiring for.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          {resumeOptions.map((option) => {
            const Icon = option.icon
            return (
              <a
                key={option.title}
                href={option.href}
                download
                onClick={onClose}
                className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition-all hover:border-primary/50 hover:bg-zinc-900"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-primary group-hover:border-primary/30">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary">
                      {option.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {option.description}
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 group-hover:text-white"
                >
                  <Download className="h-5 w-5" />
                </Button>
              </a>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
