import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DemoPreview } from "@/components/demo-preview"
import { Features } from "@/components/features"
import { ExamplesSection } from "@/components/examples-section"
import { Documentation } from "@/components/documentation"
import { Installation } from "@/components/installation"
import { Faq, faqJsonLd, type FaqItem } from "@/components/faq"
import { Footer } from "@/components/footer"
import { EXTENSION_STATS, GITHUB_URL, MARKETPLACE_URL, SITE_NAME, SITE_URL } from "@/lib/site"

const TITLE = "VS Code jq Playground — jq Editor & JSON Notebook Extension"
const DESCRIPTION =
  "Free jq extension for VS Code: write and run jq filters in a notebook-style jq editor with live output, autocomplete and syntax highlighting. 33k+ installs."

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
  },
}

const faqItems: FaqItem[] = [
  {
    question: "How do I use jq in VS Code?",
    answer:
      'Install jq Playground from the VS Code Marketplace (search "jq playground" in the Extensions view or run "ext install davidnussio.vscode-jq-playground"), create a file with the .jqpg extension, write a jq filter followed by its JSON input, then press Ctrl+Enter (Cmd+Enter on macOS). The result appears in the output panel, or in a side editor with Shift+Enter.',
  },
  {
    question: "What is a .jqpg file?",
    answer:
      "A .jqpg file is a jq playground notebook: it holds one or more jq filters, each with its own input (inline JSON, a workspace file, a URL or the output of a shell command). The extension adds syntax highlighting, autocomplete and run buttons for every filter in the file.",
  },
  {
    question: "Do I need to install jq first?",
    answer:
      "No. The extension looks for jq on your system and, if it is missing, offers to download the official jq binary for your platform. You can also point it to a custom jq binary with the jqPlayground.binaryPath setting.",
  },
  {
    question: "Can I try jq online without installing anything?",
    answer:
      "Yes. The online jq playground on this site runs jq 1.8.2 compiled to WebAssembly directly in your browser, so you can test filters on your JSON without installing anything and without sending your data to a server.",
    link: { href: "/playground", label: "Open the jq playground →" },
  },
  {
    question: "Is jq Playground for VS Code free?",
    answer: `Yes. It is free and open source under the MIT license, with ${EXTENSION_STATS.installs} installs and a ${EXTENSION_STATS.ratingValue}/5 rating from ${EXTENSION_STATS.ratingCount} reviews on the VS Code Marketplace.`,
  },
  {
    question: "Does it work with GitHub Copilot?",
    answer:
      "Yes. With GitHub Copilot installed you can explain a jq filter step by step, fix a failing filter, generate a filter from a plain-language description, and ask the @jq chat participant. AI features can be turned off with the jqPlayground.ai.enabled setting.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      alternateName: ["vscode-jq-playground", "jq Playground — JSON Filter Notebook"],
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "Visual Studio Code extension",
      operatingSystem: "Windows, macOS, Linux",
      softwareRequirements: `Visual Studio Code ${EXTENSION_STATS.minVSCodeVersion} or later`,
      description:
        "VS Code extension for jq: write and run jq filters in notebook-style .jqpg files with live results, autocomplete, syntax highlighting and AI-assisted explain, fix and generate.",
      url: SITE_URL,
      downloadUrl: MARKETPLACE_URL,
      installUrl: MARKETPLACE_URL,
      softwareVersion: EXTENSION_STATS.version,
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      image: `${SITE_URL}/opengraph-image`,
      screenshot: "https://raw.githubusercontent.com/davidnussio/vscode-jq-playground/main/images/filter-panel.png",
      sameAs: [MARKETPLACE_URL, GITHUB_URL],
      author: {
        "@type": "Person",
        name: "David Nussio",
        url: "https://github.com/davidnussio",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: EXTENSION_STATS.ratingValue,
        ratingCount: EXTENSION_STATS.ratingCount,
        bestRating: "5",
        worstRating: "1",
      },
      featureList: [
        "Notebook-style .jqpg files with multiple jq filters",
        "Inputs from inline JSON, workspace files, URLs and shell commands",
        "Autocomplete for jq builtins and workspace files",
        "Syntax highlighting for jq and .jqpg files",
        "Interactive filter panel with live results",
        "AI explain, fix and generate with GitHub Copilot",
        "@jq chat participant for Copilot Chat",
        "Automatic jq binary detection and download",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "en",
    },
    faqJsonLd(faqItems),
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <DemoPreview />
          <Features />
          <ExamplesSection />
          <Documentation />
          <Faq
            id="faq"
            title="jq in VS Code: FAQ"
            subtitle="Installing, .jqpg files, the jq binary and the online playground"
            items={faqItems}
          />
          <Installation />
        </main>
        <Footer />
      </div>
    </>
  )
}
