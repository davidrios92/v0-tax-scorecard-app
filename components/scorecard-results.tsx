"use client"

import {
  AlertTriangle,
  Lightbulb,
  Phone,
  Download,
} from "lucide-react"
import type { ScorecardResult } from "@/lib/scorecard-config"

interface ScorecardResultsProps {
  result: ScorecardResult
  onRestart: () => void
}

function getBandColor(band: string) {
  switch (band) {
    case "high":
      return { bg: "#dc2626", text: "#ffffff", label: "High Risk" }
    case "moderate":
      return { bg: "#f5893d", text: "#ffffff", label: "Moderate Risk" }
    case "low":
      return { bg: "#16a34a", text: "#ffffff", label: "Low Risk" }
    default:
      return { bg: "#6b7280", text: "#ffffff", label: "Risk" }
  }
}

export function ScorecardResults({ result, onRestart }: ScorecardResultsProps) {
  // Handle both array response and single object
  const data = Array.isArray(result) ? result[0] : result

  const scorecard = data?.scorecard ?? {
    taxEfficiencyScore: 50,
    riskScore: 50,
    leakageBand: "moderate" as const,
    leakageLabel: "Moderate Leakage Detected",
    urgencyLevel: 2,
  }

  const findings = data?.findings ?? {
    riskFlags: [],
    opportunities: [],
    flagCount: 0,
  }

  const pdf = data?.pdf ?? { url: "", fileName: "" }
  const cta = data?.cta ?? {
    message: "Book a free 30-minute strategy call with an AWTS specialist.",
    bookingUrl:
      "https://api.callconnect360.com/widget/bookings/discoverysessions1-15622ab6-ed84-4dd2-b9a4-b073072c17f2",
  }

  const band = getBandColor(scorecard.leakageBand)
  const circumference = 2 * Math.PI * 45
  const offset =
    circumference - (scorecard.taxEfficiencyScore / 100) * circumference

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <div className="border-b bg-[var(--card)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 lg:px-8">
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

      <div className="mx-auto max-w-3xl px-4 py-8 lg:py-12 lg:px-8">
        {/* Score Header */}
        <div className="mb-8 rounded-2xl border bg-[var(--card)] p-6 shadow-sm lg:p-8">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
            {/* Score gauge */}
            <div className="relative flex size-32 shrink-0 items-center justify-center">
              <svg
                className="-rotate-90"
                width="128"
                height="128"
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
                  stroke={band.bg}
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
                <span className="text-2xl font-bold text-[var(--foreground)]">
                  {scorecard.taxEfficiencyScore}
                </span>
                <span className="text-xs text-[var(--muted-foreground)]">
                  / 100
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <span
                className="mb-3 inline-block rounded-full px-4 py-1.5 text-sm font-bold"
                style={{ backgroundColor: band.bg, color: band.text }}
              >
                {band.label}
              </span>
              <h1 className="text-balance text-xl font-bold text-[var(--foreground)] lg:text-2xl">
                {scorecard.leakageLabel}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)]">
                {cta.message}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Flags */}
        {findings.riskFlags.length > 0 && (
          <div className="mb-6 rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-red-50">
                <AlertTriangle className="size-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Risk Flags ({findings.flagCount})
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {findings.riskFlags.map((flag, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg bg-red-50/50 p-3 text-sm"
                >
                  <span className="mt-0.5 block size-2 shrink-0 rounded-full bg-red-500" />
                  <span className="flex-1 text-[var(--foreground)]">
                    {flag.trigger}
                  </span>
                  <span className="shrink-0 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                    +{flag.points} pts
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opportunities */}
        {findings.opportunities.length > 0 && (
          <div className="mb-8 rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex size-10 items-center justify-center rounded-xl"
                style={{
                  background:
                    "linear-gradient(30deg, rgba(235,98,68,0.1), rgba(245,137,61,0.1))",
                }}
              >
                <Lightbulb className="size-5 text-[var(--chart-1)]" />
              </div>
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                Opportunities
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {findings.opportunities.map((opportunity, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm leading-relaxed text-[var(--awts-subheader)]"
                >
                  <span
                    className="mt-1.5 block size-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "var(--chart-1)" }}
                  />
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={cta.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 sm:w-auto"
            style={{
              background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
            }}
          >
            <Phone className="size-5" />
            Book Free 30-Min Call
          </a>
          {pdf.url && (
            <a
              href={pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              download={pdf.fileName}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[var(--primary)] px-8 py-4 text-base font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)] sm:w-auto"
            >
              <Download className="size-5" />
              Download PDF
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
