"use client"

import {
  Truck,
  Search,
  TrendingUp,
  Landmark,
  ShieldAlert,
} from "lucide-react"

const benefits = [
  {
    icon: Truck,
    title: "Ute & Vehicle Setup",
    description:
      "Are you claiming your ute, van or work vehicle the right way? We check if your setup is costing you or saving you.",
  },
  {
    icon: Search,
    title: "Missed Deductions",
    description:
      "Tools, PPE, fuel, phone, training -- most tradies leave thousands on the table. We find what you are not claiming.",
  },
  {
    icon: TrendingUp,
    title: "GST & BAS Health",
    description:
      "Late BAS, messy GST and cashflow gaps kill trade businesses. We check your habits so you stop getting stung.",
  },
  {
    icon: Landmark,
    title: "Structure & Setup",
    description:
      "Sole trader vs. company vs. trust -- the wrong structure can mean thousands in extra tax. We tell you where you stand.",
  },
  {
    icon: ShieldAlert,
    title: "ATO Red Flags",
    description:
      "The ATO targets tradies more than almost any other industry. We flag the risks before you get a nasty letter.",
  },
]

export function BenefitsSection() {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] lg:text-4xl">
            What we check for your trade business
          </h2>
          <p className="mt-4 text-lg text-[var(--awts-subheader)]">
            Five areas where tradies lose the most money -- and where you can
            claw it back.
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
