"use client"

import { ClipboardList, Cpu, FileCheck } from "lucide-react"

interface HowItWorksSectionProps {
  onStartScorecard: () => void
}

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Answer a few quick questions",
    description:
      "Tell us about your trade, how you pay yourself, your ute setup and tax habits. No accounting knowledge needed.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "We crunch the numbers",
    description:
      "Our engine compares your answers against the best-practice tax strategies used by the top-performing trade businesses in Australia.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Get your tradie tax plan",
    description:
      "Receive a personalised report with your score, the ATO risks to fix first, quick wins and clear next steps.",
  },
]

export function HowItWorksSection({ onStartScorecard }: HowItWorksSectionProps) {
  return (
    <section id="how-it-works" className="bg-[var(--secondary)] py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] lg:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-[var(--awts-subheader)]">
            Three simple steps -- done before your smoko is over.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative flex flex-col items-center rounded-2xl bg-[var(--card)] p-8 text-center shadow-sm"
            >
              <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--chart-1)]">
                Step {step.step}
              </span>
              <div
                className="mb-4 flex size-14 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(30deg, rgba(235,98,68,0.1), rgba(245,137,61,0.1) 100%)",
                }}
              >
                <step.icon className="size-7 text-[var(--chart-1)]" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-[var(--foreground)]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--awts-subheader)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={onStartScorecard}
            className="rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            style={{
              background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
            }}
          >
            Get My Free Tax Score
          </button>
        </div>
      </div>
    </section>
  )
}
