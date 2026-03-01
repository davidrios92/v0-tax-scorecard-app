"use client"

import {
  AlertTriangle,
  Zap,
  ListChecks,
  DollarSign,
  Phone,
  FileText,
} from "lucide-react"
import type { ScorecardResult } from "@/lib/scorecard-config"

interface ScorecardResultsProps {
  result: ScorecardResult
  onRestart: () => void
}

function tierColor(tier: string) {
  switch (tier) {
    case "High":
      return { bg: "#dc2626", text: "#ffffff" }
    case "Medium":
      return { bg: "#f5893d", text: "#ffffff" }
    case "Low":
      return { bg: "#16a34a", text: "#ffffff" }
    default:
      return { bg: "#6b7280", text: "#ffffff" }
  }
}

function formatAUD(amount: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ScorecardResults({ result, onRestart }: ScorecardResultsProps) {
  const tier = tierColor(result.tier)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (result.score / 100) * circumference

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <div className="border-b bg-[var(--card)]">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]">
              <span className="text-sm font-bold text-[var(--primary-foreground)]">
                AW
              </span>
            </div>
            <span className="text-xl font-bold text-[var(--foreground)]">
              AWTS
            </span>
          </div>
          <button
            onClick={onRestart}
            className="text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
          >
            Start Over
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 lg:py-12 lg:px-8">
        {/* Score Header */}
        <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl border bg-[var(--card)] p-8 shadow-sm md:flex-row md:gap-10">
          {/* Score gauge */}
          <div className="relative flex size-36 shrink-0 items-center justify-center">
            <svg
              className="-rotate-90"
              width="144"
              height="144"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--secondary)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={tier.bg}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{
                  animation: "score-fill 1.5s ease-out forwards",
                }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold text-[var(--foreground)]">
                {result.score}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                / 100
              </span>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-3 flex items-center justify-center gap-3 md:justify-start">
              <span
                className="rounded-full px-4 py-1.5 text-sm font-bold"
                style={{ backgroundColor: tier.bg, color: tier.text }}
              >
                {result.tier} Risk
              </span>
            </div>
            <h1 className="text-balance text-2xl font-bold text-[var(--foreground)] lg:text-3xl">
              {result.headline}
            </h1>
            <p className="mt-3 text-pretty leading-relaxed text-[var(--awts-subheader)]">
              {result.summary}
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Key Risks */}
          <div className="rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Key Risks
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {result.keyRisks.map((risk, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-[var(--awts-subheader)]"
                >
                  <span className="mt-1.5 block size-1.5 shrink-0 rounded-full bg-red-500" />
                  {risk}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Wins */}
          <div className="rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(30deg, rgba(235,98,68,0.1), rgba(245,137,61,0.1))",
                }}
              >
                <Zap className="size-5 text-[var(--chart-1)]" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Quick Wins
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {result.quickWins.map((win, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm leading-relaxed text-[var(--awts-subheader)]"
                >
                  <span
                    className="mt-1.5 block size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--chart-1)" }}
                  />
                  {win}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Next Steps */}
          <div className="rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                <ListChecks className="size-5 text-[var(--primary)]" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Recommended Next Steps
              </h2>
            </div>
            <ol className="flex flex-col gap-3">
              {result.recommendedNextSteps.map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[var(--awts-subheader)]"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-[var(--primary-foreground)]">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Estimated Savings */}
          <div className="rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-green-50">
                <DollarSign className="size-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Estimated Savings
              </h2>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-[var(--secondary)] p-6">
              <span className="text-sm text-[var(--muted-foreground)]">
                Potential annual savings
              </span>
              <span className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                {formatAUD(result.estimatedSavingsRange.min)} &ndash;{" "}
                {formatAUD(result.estimatedSavingsRange.max)}
              </span>
              <span className="mt-1 text-sm text-[var(--muted-foreground)]">
                {result.estimatedSavingsRange.currency}
              </span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="https://api.callconnect360.com/widget/bookings/discoverysessions1-15622ab6-ed84-4dd2-b9a4-b073072c17f2"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
            style={{
              background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
            }}
          >
            <Phone className="size-5" />
            Book Free 15-Min Call
          </a>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-xl border-2 border-[var(--primary)] px-8 py-4 text-base font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)]"
          >
            <FileText className="size-5" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
