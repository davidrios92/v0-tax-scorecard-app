"use client"

import { ArrowRight, Star, HardHat, ShieldCheck, Clock, Wrench } from "lucide-react"

interface HeroSectionProps {
  onStartScorecard: () => void
}

const trustIndicators = [
  { icon: HardHat, label: "Built for tradies" },
  { icon: ShieldCheck, label: "Australian owned" },
  { icon: Wrench, label: "All trades covered" },
  { icon: Clock, label: "Under 3 minutes" },
  { icon: Star, label: "4.9 rating" },
]

export function HeroSection({ onStartScorecard }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[var(--card)] to-[var(--background)]" />

      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-[var(--card)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)]">
            <span
              className="inline-block size-2 rounded-full"
              style={{
                background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
              }}
            />
            Free Tax Scorecard for Tradies
          </div>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] lg:text-6xl lg:leading-[1.1]">
            Are you overpaying tax in your trade/construction business?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--awts-subheader)]">
            Whether you are a sparky, plumber, builder or concreter -- our free
            Tax Scorecard spots the deductions you are missing, flags ATO risks
            and shows you where the real savings are. Built specifically for
            Australian tradies.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onStartScorecard}
              className="group flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              style={{
                background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
              }}
            >
              Get My Free Tax Score
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-sm text-[var(--muted-foreground)]">
              Takes less than 3 minutes -- no jargon, no BS
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          {trustIndicators.map((indicator) => (
            <div
              key={indicator.label}
              className="flex items-center gap-2.5 text-sm font-medium text-[var(--muted-foreground)]"
            >
              <div className="flex size-9 items-center justify-center rounded-lg bg-[var(--secondary)]">
                <indicator.icon className="size-4 text-[var(--foreground)]" />
              </div>
              {indicator.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
