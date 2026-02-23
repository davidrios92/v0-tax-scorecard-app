"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Is this actually free or is there a catch?",
    answer:
      "No catch. The scorecard is 100% free. We built it to help tradies see where they stand with their tax -- if you want help acting on the results, we are here, but there is zero obligation.",
  },
  {
    question: "I am a sole trader sparky -- is this relevant to me?",
    answer:
      "Absolutely. Whether you are a sole trader, running a company or using a trust, the scorecard covers structure, deductions, vehicles, GST and ATO risks that apply to every trade -- plumbing, electrical, building, concreting, landscaping, you name it.",
  },
  {
    question: "How long does it take? I am flat out on site.",
    answer:
      "Under 3 minutes. We kept it short on purpose -- no jargon, no essays. You can knock it out on a smoko or waiting for a delivery.",
  },
  {
    question: "Is my information kept private?",
    answer:
      "Yes. All your information is encrypted and stored securely. We only use your responses to generate your scorecard and will never share your data with anyone without your consent.",
  },
  {
    question: "What happens after I get my score?",
    answer:
      "You will see your score, the biggest risks to fix, quick wins you can act on now and clear next steps. If you want a hand putting it into action, you can book a free 15-minute call with one of our tax specialists who work with tradies every day.",
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
