"use client"

import {
  Building2,
  Search,
  TrendingUp,
  Landmark,
  ShieldAlert,
} from "lucide-react"

const benefits = [
  {
    icon: Building2,
    title: "Structure Review",
    description:
      "Evaluate whether your current business structure is optimised for tax efficiency and liability protection.",
  },
  {
    icon: Search,
    title: "Deductions Audit",
    description:
      "Identify commonly missed deductions and ensure you are claiming everything you are entitled to.",
  },
  {
    icon: TrendingUp,
    title: "GST & Cashflow Health",
    description:
      "Assess your GST management practices and cashflow habits to avoid unnecessary BAS stress.",
  },
  {
    icon: Landmark,
    title: "Asset Planning",
    description:
      "Review your asset ownership structure and upcoming purchases for maximum tax advantage.",
  },
  {
    icon: ShieldAlert,
    title: "ATO Risk Check",
    description:
      "Flag potential compliance risks before they become costly ATO audits or penalties.",
  },
]

export function BenefitsSection() {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] lg:text-4xl">
            What your scorecard covers
          </h2>
          <p className="mt-4 text-lg text-[var(--awts-subheader)]">
            Five key areas analysed to give you a complete picture of your tax
            position.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-2xl border bg-[var(--card)] p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div
                className="mb-4 flex size-12 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(30deg, rgba(235,98,68,0.1), rgba(245,137,61,0.1) 100%)",
                }}
              >
                <benefit.icon className="size-6 text-[var(--chart-1)]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--awts-subheader)]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
