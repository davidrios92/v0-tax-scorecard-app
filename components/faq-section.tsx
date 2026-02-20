"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is the Tax Optimisation Scorecard really free?",
    answer:
      "Yes, completely free. We provide the scorecard as a service to help Australian businesses understand their current tax position. There is no obligation to use our paid services afterwards.",
  },
  {
    question: "How long does the scorecard take to complete?",
    answer:
      "The questionnaire takes approximately 2\u20133 minutes to complete. Our AI engine then analyses your responses and returns your personalised report within seconds.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Absolutely. All information you provide is encrypted and stored securely. We only use your responses to generate your scorecard and will never share your data with third parties without your consent.",
  },
  {
    question: "What happens after I receive my scorecard?",
    answer:
      "You will receive a detailed report showing your tax optimisation score, key risks, quick wins and recommended next steps. If you would like help implementing the recommendations, you can book a free 15-minute call with one of our tax specialists.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] lg:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-[var(--awts-subheader)]">
            Everything you need to know before getting started.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold text-[var(--foreground)]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[var(--awts-subheader)] leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
