"use client"

import Image from "next/image"

interface FooterProps {
  onStartScorecard: () => void
}

export function Footer({ onStartScorecard }: FooterProps) {
  return (
    <footer className="bg-[var(--awts-footer)] text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Image
                src="/images/awts-logo.png"
                alt="AWTS - Australia Wide Tax Solutions"
                width={160}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Australian-owned tax and accounting specialists helping tradies
              pay less tax, stay off the ATO radar and grow their trade
              business with confidence.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#services"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Get Started
            </h3>
            <p className="mb-4 text-sm text-white/60">
              Take the free Tax Scorecard built for tradies and find out how
              much you could be saving.
            </p>
            <button
              onClick={onStartScorecard}
              className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
              style={{ backgroundColor: "var(--awts-footer-accent)" }}
            >
              Start Free Scorecard
            </button>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>
            {"© "}{new Date().getFullYear()}{" AWTS. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}
