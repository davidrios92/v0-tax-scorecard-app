"use client"

import { ArrowRight, Star, Users, ShieldCheck, Clock, UserCheck } from "lucide-react"

interface HeroSectionProps {
  onStartScorecard: () => void
}

const trustIndicators = [
  { icon: Users, label: "10k+ annual returns" },
  { icon: ShieldCheck, label: "Australian owned" },
  { icon: Clock, label: "Efficient service" },
  { icon: UserCheck, label: "Personalised service" },
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
            Free Tax Optimisation Scorecard
          </div>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-[var(--foreground)] lg:text-6xl lg:leading-[1.1]">
            Maximise your tax return with{" "}
            <span className="relative">
              AWTS tax experts
              <span
                className="absolute -bottom-1 left-0 h-1 w-full rounded-full"
                style={{
                  background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
                }}
              />
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-[var(--awts-subheader)]">
            Our free Tax Optimisation Scorecard analyses your business structure,
            deductions, and compliance to identify risks, missed deductions, and
            potential savings — in minutes.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={onStartScorecard}
              className="group flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
              style={{
                background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
              }}
            >
              Start Free Tax Scorecard
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-sm text-[var(--muted-foreground)]">
              Takes less than 3 minutes
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
