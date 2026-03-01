"use client"

import { useState, useCallback, useEffect } from "react"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SCORECARD_SECTIONS,
  AUSTRALIAN_STATES,
  N8N_WEBHOOK_URL,
  type ScorecardResult,
  type LeadInfo,
} from "@/lib/scorecard-config"

interface ScorecardFormProps {
  onComplete: (result: ScorecardResult) => void
  onError: (message: string) => void
  onBack: () => void
}

const TOTAL_STEPS = SCORECARD_SECTIONS.length + 1 // sections + lead details

export function ScorecardForm({ onComplete, onError, onBack }: ScorecardFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [lead, setLead] = useState<LeadInfo>({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    state: "",
    consent: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("awts-scorecard-answers")
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.answers) setAnswers(parsed.answers)
        if (parsed.lead) setLead(parsed.lead)
        if (typeof parsed.currentStep === "number") setCurrentStep(parsed.currentStep)
      }
    } catch {
      // ignore parse errors
    }
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(
        "awts-scorecard-answers",
        JSON.stringify({ answers, lead, currentStep })
      )
    } catch {
      // ignore storage errors
    }
  }, [answers, lead, currentStep])

  const setAnswer = useCallback(
    (questionId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }))
      setErrors((prev) => {
        const next = { ...prev }
        delete next[questionId]
        return next
      })
    },
    []
  )

  const validateCurrentStep = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}

    if (currentStep < SCORECARD_SECTIONS.length) {
      const section = SCORECARD_SECTIONS[currentStep]
      for (const q of section.questions) {
        if (q.required && !answers[q.id]) {
          newErrors[q.id] = "Please select an answer"
        }
      }
    } else {
      // Lead details step
      if (!lead.fullName || lead.fullName.trim().length < 2) {
        newErrors.fullName = "Full name must be at least 2 characters"
      }
      if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
        newErrors.email = "Please enter a valid email address"
      }
      const digitsOnly = lead.phone.replace(/[\s+()\-]/g, "")
      if (!lead.phone || digitsOnly.length < 8) {
        newErrors.phone = "Phone number must have at least 8 digits"
      }
      if (!lead.consent) {
        newErrors.consent = "You must agree to be contacted"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [currentStep, answers, lead])

  const handleNext = useCallback(() => {
    if (!validateCurrentStep()) return
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentStep, validateCurrentStep])

  const handleBack = useCallback(() => {
    if (currentStep === 0) {
      onBack()
    } else {
      setCurrentStep((s) => s - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [currentStep, onBack])

  const handleSubmit = useCallback(async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)

    const payload = {
      source: "awts-tax-scorecard",
      submittedAt: new Date().toISOString(),
      answers,
      lead: {
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        businessName: lead.businessName,
        state: lead.state,
        consent: lead.consent,
      },
    }

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`)
      }

      const json = await res.json()
      // n8n may return an array or a single object
      const result: ScorecardResult = Array.isArray(json) ? json[0] : json
      localStorage.removeItem("awts-scorecard-answers")
      onComplete(result)
    } catch {
      onError(
        "We couldn't complete your analysis. Please try again or contact AWTS."
      )
    } finally {
      setIsSubmitting(false)
    }
  }, [answers, lead, validateCurrentStep, onComplete, onError])

  const progressPercent = ((currentStep + 1) / TOTAL_STEPS) * 100
  const isLastStep = currentStep === TOTAL_STEPS - 1
  const isQuestionStep = currentStep < SCORECARD_SECTIONS.length

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 border-b bg-[var(--card)]/95 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            <span className="text-sm font-medium text-[var(--muted-foreground)]">
              Step {currentStep + 1} of {TOTAL_STEPS}
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="h-2 bg-[var(--secondary)]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-8 lg:py-12">
        {isSubmitting ? (
          <LoadingState />
        ) : isQuestionStep ? (
          <QuestionStep
            section={SCORECARD_SECTIONS[currentStep]}
            answers={answers}
            errors={errors}
            onAnswer={setAnswer}
          />
        ) : (
          <LeadStep
            lead={lead}
            errors={errors}
            onUpdate={(updates) => {
              setLead((prev) => ({ ...prev, ...updates }))
              setErrors((prev) => {
                const next = { ...prev }
                for (const key of Object.keys(updates)) {
                  delete next[key]
                }
                return next
              })
            }}
          />
        )}

        {!isSubmitting && (
          <div className="mt-8 flex justify-between">
            <button
              onClick={handleBack}
              className="rounded-xl border border-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)]"
            >
              Back
            </button>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                className="rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
                style={{
                  background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
                }}
              >
                Get My Scorecard
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="group flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
                style={{
                  background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
                }}
              >
                Next
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Sub-components ─── */

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative mb-6">
        <div
          className="size-16 rounded-full"
          style={{
            background: "linear-gradient(30deg, rgba(235,98,68,0.15), rgba(245,137,61,0.15) 100%)",
          }}
        />
        <Loader2
          className="absolute inset-0 m-auto size-8 text-[var(--chart-1)]"
          style={{ animation: "spin 1.2s linear infinite" }}
        />
      </div>
      <p
        className="text-lg font-semibold text-[var(--foreground)]"
        style={{ animation: "pulse-soft 2s ease-in-out infinite" }}
      >
        Analysing your tax profile...
      </p>
      <p className="mt-2 text-sm text-[var(--muted-foreground)]">
        This usually takes a few seconds
      </p>
    </div>
  )
}

interface QuestionStepProps {
  section: (typeof SCORECARD_SECTIONS)[number]
  answers: Record<string, string>
  errors: Record<string, string>
  onAnswer: (id: string, value: string) => void
}

function QuestionStep({ section, answers, errors, onAnswer }: QuestionStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--foreground)] lg:text-3xl">
        {section.title}
      </h2>
      <p className="mt-2 mb-8 text-[var(--awts-subheader)]">
        {section.subtitle}
      </p>

      <div className="flex flex-col gap-8">
        {section.questions.map((q) => (
          <div key={q.id} className="rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
            <Label className="mb-4 text-base font-semibold text-[var(--foreground)]">
              {q.label}
              {q.required && (
                <span className="ml-1 text-[var(--destructive)]">*</span>
              )}
            </Label>

            {q.type === "radio" ? (
              <RadioGroup
                value={answers[q.id] || ""}
                onValueChange={(val) => onAnswer(q.id, val)}
                className="mt-3 grid gap-3"
              >
                {q.options.map((option) => (
                  <label
                    key={option}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                      answers[q.id] === option
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-[var(--border)] hover:border-[var(--primary)]/40"
                    }`}
                  >
                    <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                    <span className="text-sm text-[var(--foreground)]">
                      {option}
                    </span>
                  </label>
                ))}
              </RadioGroup>
            ) : (
              <Select
                value={answers[q.id] || ""}
                onValueChange={(val) => onAnswer(q.id, val)}
              >
                <SelectTrigger className="mt-3 w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {q.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {errors[q.id] && (
              <p className="mt-2 text-sm text-[var(--destructive)]">
                {errors[q.id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface LeadStepProps {
  lead: LeadInfo
  errors: Record<string, string>
  onUpdate: (updates: Partial<LeadInfo>) => void
}

function LeadStep({ lead, errors, onUpdate }: LeadStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-[var(--foreground)] lg:text-3xl">
        Your details
      </h2>
      <p className="mt-2 mb-8 text-[var(--awts-subheader)]">
        Almost done! Tell us where to send your personalised scorecard.
      </p>

      <div className="flex flex-col gap-6 rounded-2xl border bg-[var(--card)] p-6 shadow-sm">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            Full Name <span className="text-[var(--destructive)]">*</span>
          </Label>
          <Input
            id="fullName"
            value={lead.fullName}
            onChange={(e) => onUpdate({ fullName: e.target.value })}
            placeholder="John Smith"
            className="mt-1"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-[var(--destructive)]">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            Email <span className="text-[var(--destructive)]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={lead.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="john@business.com.au"
            className="mt-1"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-[var(--destructive)]">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone" className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            Phone <span className="text-[var(--destructive)]">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            value={lead.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="0400 000 000"
            className="mt-1"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-[var(--destructive)]">{errors.phone}</p>
          )}
        </div>

        {/* Business Name (optional) */}
        <div>
          <Label htmlFor="businessName" className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            Business Name <span className="text-sm font-normal text-[var(--muted-foreground)]">(optional)</span>
          </Label>
          <Input
            id="businessName"
            value={lead.businessName}
            onChange={(e) => onUpdate({ businessName: e.target.value })}
            placeholder="Smith Construction Pty Ltd"
            className="mt-1"
          />
        </div>

        {/* State (optional) */}
        <div>
          <Label className="mb-2 text-sm font-semibold text-[var(--foreground)]">
            State <span className="text-sm font-normal text-[var(--muted-foreground)]">(optional)</span>
          </Label>
          <Select
            value={lead.state}
            onValueChange={(val) => onUpdate({ state: val })}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {AUSTRALIAN_STATES.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Consent */}
        <div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={lead.consent}
              onCheckedChange={(checked) =>
                onUpdate({ consent: checked === true })
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="consent"
              className="text-sm leading-relaxed text-[var(--foreground)]"
            >
              I agree to be contacted by AWTS regarding my tax assessment.{" "}
              <span className="text-[var(--destructive)]">*</span>
            </Label>
          </div>
          {errors.consent && (
            <p className="mt-1 text-sm text-[var(--destructive)]">{errors.consent}</p>
          )}
        </div>
      </div>
    </div>
  )
}
