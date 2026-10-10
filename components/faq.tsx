import Link from "next/link"
import { ChevronDown } from "lucide-react"

export interface FaqItem {
  question: string
  answer: string
  link?: { href: string; label: string }
}

interface FaqProps {
  id: string
  title: string
  subtitle?: string
  items: FaqItem[]
}

// Answers sit inside <details>, so they are in the server-rendered HTML even when collapsed
export function Faq({ id, title, subtitle, items }: FaqProps) {
  return (
    <section id={id} className="px-6 py-24 lg:px-8" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 id={`${id}-title`} className="font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">{subtitle}</p>
          )}
        </div>
        <div className="mt-12 divide-y divide-border rounded-xl border border-border bg-card">
          {items.map((item) => (
            <details key={item.question} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                <h3 className="text-base">{item.question}</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {item.answer}
                {item.link && (
                  <>
                    {" "}
                    <Link href={item.link.href} className="font-medium text-foreground underline underline-offset-4">
                      {item.link.label}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}
