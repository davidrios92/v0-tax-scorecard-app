"use client"

import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorCardProps {
  message: string
  onRetry: () => void
  onGoHome: () => void
}

export function ErrorCard({ message, onRetry, onGoHome }: ErrorCardProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md rounded-2xl border bg-[var(--card)] p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-red-50">
          <AlertCircle className="size-8 text-red-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-[var(--foreground)]">
          Something went wrong
        </h2>
        <p className="mb-8 leading-relaxed text-[var(--awts-subheader)]">
          {message}
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
            style={{
              background: "linear-gradient(30deg, #eb6244, #f5893d 100%)",
            }}
          >
            <RefreshCw className="size-4" />
            Try Again
          </button>
          <button
            onClick={onGoHome}
            className="rounded-xl border border-[var(--primary)] px-6 py-3 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--secondary)]"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
