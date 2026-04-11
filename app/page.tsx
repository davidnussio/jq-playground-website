import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DemoPreview } from "@/components/demo-preview"
import { Features } from "@/components/features"
import { ExamplesSection } from "@/components/examples-section"
import { Documentation } from "@/components/documentation"
import { Installation } from "@/components/installation"
import { Footer } from "@/components/footer"

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'jq Playground for VS Code',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Windows, macOS, Linux',
  description: 'Create interactive notebooks with jq filters in VS Code. Work with JSON data from files, URLs, or CLI outputs with autocomplete and syntax highlighting.',
  url: 'https://jq.dambox.ch',
  downloadUrl: 'https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground',
  softwareVersion: '5.0.7',
  author: {
    '@type': 'Person',
    name: 'David Nussio',
    url: 'https://github.com/davidnussio',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '50',
    bestRating: '5',
  },
  featureList: [
    'Multiple input sources (files, URLs, CLI)',
    'Intelligent autocomplete for jq functions',
    'Syntax highlighting for .jqpg files',
    'Keyboard shortcuts for quick execution',
    'Variable support in playground files',
    'AI-powered filter explanation (GitHub Copilot)',
    'Interactive filter panel with file picker and live results',
    'Chat participant @jq for Copilot chat',
  ],
  screenshot: 'https://jq.dambox.ch/og-image.png',
  license: 'https://opensource.org/licenses/MIT',
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is jq Playground for VS Code?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'jq Playground is a VS Code extension that lets you create interactive notebooks with jq filters. You can work with JSON data from files, URLs, or command line outputs directly in your editor.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I install jq Playground?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Search for "jq playground" in the VS Code Extensions view (Ctrl+Shift+X), or run "ext install davidnussio.vscode-jq-playground" in the command palette. The extension requires jq to be installed on your system.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is jq Playground free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, jq Playground is completely free and open source under the MIT license. It has over 30,000 installs and a 4.7+ rating on the VS Code Marketplace.',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <DemoPreview />
          <Features />
          <ExamplesSection />
          <Documentation />
          <Installation />
        </main>
        <Footer />
      </div>
    </>
  )
}
