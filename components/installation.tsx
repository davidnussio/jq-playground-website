"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, ExternalLink } from "lucide-react"

export function Installation() {
  const [copied, setCopied] = useState(false)
  const command = "ext install davidnussio.vscode-jq-playground"

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="border-y border-border bg-primary px-6 py-24 lg:px-8" aria-label="Installation">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
          Install jq Playground for VS Code and start working with JSON data more efficiently.
        </p>

        <div className="mt-10 flex flex-col items-center gap-6">
          {/* Command to copy */}
          <div className="flex w-full max-w-xl items-center gap-2 rounded-lg bg-primary-foreground/10 p-2">
            <code className="flex-1 overflow-x-auto whitespace-nowrap px-4 py-2 text-left font-mono text-sm text-primary-foreground">
              {command}
            </code>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="shrink-0 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy command</span>
            </Button>
          </div>

          <p className="text-sm text-primary-foreground/60">
            or
          </p>

          <Button
            size="lg"
            variant="secondary"
            asChild
          >
            <a
              href="https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Open VS Code Marketplace
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-primary-foreground/70">
          <span>Works with VS Code 1.51.0+</span>
          <span className="hidden sm:inline">•</span>
          <span>Requires jq installed on your system</span>
        </div>
      </div>
    </section>
  )
}
