import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { DemoPreview } from "@/components/demo-preview"
import { Features } from "@/components/features"
import { CodeExamples } from "@/components/code-example"
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
        <CodeExamples />
        <Documentation />
        <Installation />
      </main>
      <Footer />
    </div>
  )
}
