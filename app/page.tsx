"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BenefitsSection } from "@/components/benefits-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { ScorecardForm } from "@/components/scorecard-form"
import { ScorecardResults } from "@/components/scorecard-results"
import { ErrorCard } from "@/components/error-card"
import type { ScorecardResult } from "@/lib/scorecard-config"

type AppView = "landing" | "scorecard" | "results" | "error"

export default function Home() {
  const [view, setView] = useState<AppView>("landing")
  const [result, setResult] = useState<ScorecardResult | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  const startScorecard = useCallback(() => {
    setView("scorecard")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleComplete = useCallback((data: ScorecardResult) => {
    setResult(data)
    setView("results")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleError = useCallback((message: string) => {
    setErrorMessage(message)
    setView("error")
  }, [])

  const handleRestart = useCallback(() => {
    setResult(null)
    setErrorMessage("")
    setView("landing")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleRetry = useCallback(() => {
    setErrorMessage("")
    setView("scorecard")
  }, [])

  if (view === "scorecard") {
    return (
      <ScorecardForm
        onComplete={handleComplete}
        onError={handleError}
        onBack={handleRestart}
      />
    )
  }

  if (view === "results" && result) {
    return <ScorecardResults result={result} onRestart={handleRestart} />
  }

  if (view === "error") {
    return (
      <ErrorCard
        message={errorMessage}
        onRetry={handleRetry}
        onGoHome={handleRestart}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <Header onStartScorecard={startScorecard} />
      <main>
        <HeroSection onStartScorecard={startScorecard} />
        <BenefitsSection />
        <HowItWorksSection onStartScorecard={startScorecard} />
        <FaqSection />
      </main>
      <Footer onStartScorecard={startScorecard} />
    </div>
  )
}
