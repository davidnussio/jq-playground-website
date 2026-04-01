import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DemoPreview } from "@/components/demo-preview"
import { Features } from "@/components/features"
import { ExamplesSection } from "@/components/examples-section"
import { Documentation } from "@/components/documentation"
import { Installation } from "@/components/installation"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
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
  )
}
