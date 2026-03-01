"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

interface HeaderProps {
  onStartScorecard: () => void
}

export function Header({ onStartScorecard }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-[var(--card)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
        <a href="/" className="flex items-center">
          <Image
            src="/images/awts-logo.png"
            alt="AWTS - Australia Wide Tax Solutions"
            width={160}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Services
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Resources
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Contact
          </a>
          <button
            onClick={onStartScorecard}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
            style={{
              background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
            }}
          >
            Get a Quote
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[var(--foreground)] md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-[var(--card)] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#services"
              className="text-sm font-medium text-[var(--muted-foreground)]"
              onClick={() => setMobileOpen(false)}
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[var(--muted-foreground)]"
              onClick={() => setMobileOpen(false)}
            >
              Resources
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-[var(--muted-foreground)]"
              onClick={() => setMobileOpen(false)}
            >
              Contact
            </a>
            <button
              onClick={() => {
                onStartScorecard()
                setMobileOpen(false)
              }}
              className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md"
              style={{
                background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
              }}
            >
              Get a Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
