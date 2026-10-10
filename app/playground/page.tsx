import type { Metadata } from "next"
import Link from "next/link"
import { Download, Play } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Faq, faqJsonLd, type FaqItem } from "@/components/faq"
import { JqPlayground } from "@/components/playground/jq-playground"
import { jqExampleCategories, type JqExample } from "@/lib/jq-examples"
import { EXTENSION_STATS, JQ_MANUAL_URL, JQ_WASM_VERSION, MARKETPLACE_URL, SITE_NAME, SITE_URL } from "@/lib/site"

const TITLE = "jq Playground Online — Run jq Filters in Your Browser"
const DESCRIPTION = `Free online jq playground: test jq filters on your JSON instantly. Runs real jq ${JQ_WASM_VERSION} in WebAssembly, so data never leaves your browser. With jq examples.`
const PAGE_URL = `${SITE_URL}/playground`

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/playground" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: "/playground",
    title: TITLE,
    description: DESCRIPTION,
  },
}

const CLI_FLAGS = [
  { flag: "-r", name: "--raw-output", description: "Print strings without JSON quotes, e.g. for CSV or shell scripts." },
  { flag: "-c", name: "--compact-output", description: "Print each JSON value on a single line." },
  { flag: "-s", name: "--slurp", description: "Read every input value into one array before running the filter." },
  { flag: "-n", name: "--null-input", description: "Ignore the input and run the filter once with null." },
  { flag: "-S", name: "--sort-keys", description: "Sort the keys of every object in the output." },
]

const faqItems: FaqItem[] = [
  {
    question: "Is this online jq playground free?",
    answer:
      "Yes. The jq playground is free, needs no account and has no usage limits. It is built by the author of the jq Playground extension for VS Code.",
  },
  {
    question: "Is my JSON sent to a server?",
    answer: `No. jq ${JQ_WASM_VERSION} is compiled to WebAssembly and runs inside your browser, in a Web Worker. Your filter and JSON never leave your device, so you can safely test filters on private API responses or logs. Share links store the filter and input in the URL fragment, which browsers do not send to the server.`,
  },
  {
    question: "Which version of jq does the playground use?",
    answer: `The playground runs jq ${JQ_WASM_VERSION}, the official jq source code compiled to WebAssembly with the jq-wasm package. Filters behave exactly like the jq command-line tool.`,
  },
  {
    question: "How is this different from jqplay?",
    answer:
      "jqplay.org is another popular online jq playground. This one runs jq entirely in your browser, lets you share a filter with a link, and comes with a cheat sheet of runnable jq examples. When you outgrow the browser, the same filters run in VS Code with the jq Playground extension.",
  },
  {
    question: "Can I use jq with files, URLs or shell commands?",
    answer:
      "Not in the browser playground, which works on pasted JSON. The jq Playground extension for VS Code runs filters against workspace files, URLs and shell command output, and saves them in reusable .jqpg notebooks.",
    link: { href: "/", label: "See the VS Code extension →" },
  },
  {
    question: "Why does my filter stop after a few seconds?",
    answer:
      "To keep the page responsive, the playground stops a filter that runs for more than 3 seconds, which usually means an infinite generator such as repeat or range(infinite). Add limit(n; ...) or first(...) to take only the values you need.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${PAGE_URL}#app`,
      name: "jq Playground Online",
      url: PAGE_URL,
      description: DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript and WebAssembly",
      softwareVersion: JQ_WASM_VERSION,
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: { "@type": "Person", name: "David Nussio", url: "https://github.com/davidnussio" },
      isPartOf: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "jq Playground Online", item: PAGE_URL },
      ],
    },
    faqJsonLd(faqItems),
  ],
}

// Renders `code` spans written with backticks in the example descriptions
function InlineCode({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} className="rounded bg-secondary px-1 py-0.5 font-mono text-[0.85em] text-foreground">
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  )
}

function command(example: JqExample) {
  return ["jq", ...example.flags, `'${example.filter}'`].join(" ")
}

function ExampleCard({ example }: { example: JqExample }) {
  return (
    <article id={example.id} className="scroll-mt-24 rounded-xl border border-border bg-card p-5">
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-semibold">{example.title}</h4>
        <a
          href={`#try=${example.id}`}
          className="inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-foreground hover:bg-secondary"
          aria-label={`Run "${example.title}" in the jq playground`}
        >
          <Play className="h-3 w-3" /> Run
        </a>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        <InlineCode text={example.description} />
      </p>
      <pre className="mt-4 overflow-x-auto rounded-md bg-primary px-3 py-2 font-code text-sm text-primary-foreground">
        {command(example)}
      </pre>
      <dl className="mt-3 grid gap-3 text-xs sm:grid-cols-2">
        <div className="min-w-0">
          <dt className="mb-1 font-semibold uppercase tracking-wide text-muted-foreground">Input</dt>
          <dd>
            <pre className="whitespace-pre-wrap break-words rounded-md bg-secondary px-3 py-2 font-code">
              {example.input || "(none, -n)"}
            </pre>
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="mb-1 font-semibold uppercase tracking-wide text-muted-foreground">Output</dt>
          <dd>
            <pre className="whitespace-pre-wrap break-words rounded-md bg-secondary px-3 py-2 font-code">{example.output}</pre>
          </dd>
        </div>
      </dl>
    </article>
  )
}

export default function PlaygroundPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8" aria-labelledby="playground-title">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-3xl text-center">
                <h1 id="playground-title" className="font-serif text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                  jq Playground Online
                </h1>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground text-pretty">
                  Test jq filters on your JSON instantly. This online jq playground runs the real jq {JQ_WASM_VERSION}{" "}
                  compiled to WebAssembly, right in your browser: no sign-up, and your data never leaves your device.
                </p>
              </div>
              <div className="mt-10">
                <JqPlayground />
              </div>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Output updates as you type. New to jq? Start from the{" "}
                <a href="#jq-examples" className="font-medium text-foreground underline underline-offset-4">
                  jq examples below
                </a>{" "}
                or read the{" "}
                <a href={JQ_MANUAL_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground underline underline-offset-4">
                  jq manual
                </a>
                .
              </p>
            </div>
          </section>

          <section className="border-y border-border bg-primary px-6 py-16 lg:px-8" aria-labelledby="vscode-cta-title">
            <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
              <h2 id="vscode-cta-title" className="font-serif text-3xl font-bold tracking-tight text-primary-foreground text-balance">
                Use jq every day? Run it in VS Code
              </h2>
              <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
                jq Playground for VS Code turns jq into a notebook: keep filters in .jqpg files, run them against
                workspace files, URLs and shell commands, with autocomplete and Copilot-powered explain and fix.{" "}
                {EXTENSION_STATS.installs} installs, free and open source.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" variant="secondary" asChild>
                  <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer" className="gap-2">
                    <Download className="h-4 w-4" />
                    Install the VS Code extension
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/">Learn more about the extension</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="jq-examples" className="scroll-mt-20 px-4 py-24 sm:px-6 lg:px-8" aria-labelledby="jq-examples-title">
            <div className="mx-auto max-w-6xl">
              <div className="mx-auto max-w-3xl text-center">
                <h2 id="jq-examples-title" className="font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl">
                  jq examples and cheat sheet
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                  Common jq filters with sample input and the exact output of jq {JQ_WASM_VERSION}. Press Run to load
                  any example into the playground and edit it.
                </p>
              </div>

              <nav aria-label="jq example categories" className="mt-10 flex flex-wrap justify-center gap-2">
                {jqExampleCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="rounded-full border border-border px-4 py-1.5 text-sm hover:bg-secondary"
                  >
                    {category.title}
                  </a>
                ))}
              </nav>

              {jqExampleCategories.map((category) => (
                <div key={category.id} id={category.id} className="mt-16 scroll-mt-24">
                  <h3 className="font-serif text-2xl font-bold">{category.title}</h3>
                  <p className="mt-1 text-muted-foreground">{category.description}</p>
                  <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    {category.examples.map((example) => (
                      <ExampleCard key={example.id} example={example} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="mt-20">
                <h3 className="font-serif text-2xl font-bold">jq command-line options</h3>
                <p className="mt-1 text-muted-foreground">The flags you can toggle in the playground, and what they do.</p>
                <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                      <tr>
                        <th scope="col" className="px-4 py-3">Flag</th>
                        <th scope="col" className="px-4 py-3">Long form</th>
                        <th scope="col" className="px-4 py-3">What it does</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {CLI_FLAGS.map((row) => (
                        <tr key={row.flag}>
                          <td className="px-4 py-3 font-mono">{row.flag}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-mono">{row.name}</td>
                          <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <Faq id="faq" title="jq playground FAQ" items={faqItems} />
        </main>
        <Footer />
      </div>
    </>
  )
}
