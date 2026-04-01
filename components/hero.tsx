import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Download, Star } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8" aria-label="jq Playground introduction">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 opacity-[0.03]">
          <svg width="1200" height="600" viewBox="0 0 1200 600" fill="none">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="secondary" className="mb-6 gap-2 px-4 py-1.5">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="font-mono text-xs">50+ stars on GitHub</span>
        </Badge>

        <h1 className="font-serif text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance">
          The jq Playground
          <br />
          <span className="text-accent">for VS Code</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Create interactive notebooks with the full power of jq filters.
          Work with JSON data from files, URLs, or command line outputs —
          all within your favorite editor.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Install from Marketplace
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#documentation" className="gap-2">
              View Documentation
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold text-foreground">30k+</span>
            <span>installs</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold text-foreground">MIT</span>
            <span>license</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg font-semibold text-foreground">4.7+</span>
            <span>rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
