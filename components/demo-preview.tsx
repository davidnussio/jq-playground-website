"use client"

import { useState, useEffect } from "react"

const demoLines = [
  { type: "comment", content: "# Filter GitHub commits" },
  { type: "command", content: "jq '.[0] | {message: .commit.message, author: .commit.author.name}'" },
  { type: "url", content: "https://api.github.com/repos/stedolan/jq/commits?per_page=5" },
  { type: "empty", content: "" },
  { type: "output-header", content: "# Output:" },
  { type: "output", content: "{" },
  { type: "output", content: '  "message": "Update documentation for new features",' },
  { type: "output", content: '  "author": "stedolan"' },
  { type: "output", content: "}" },
]

export function DemoPreview() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < demoLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      // Reset animation after a delay
      const resetTimer = setTimeout(() => {
        setVisibleLines(0)
      }, 4000)
      return () => clearTimeout(resetTimer)
    }
  }, [visibleLines])

  const getLineColor = (type: string) => {
    switch (type) {
      case "comment":
        return "text-muted-foreground"
      case "command":
        return "text-accent"
      case "url":
        return "text-blue-400"
      case "output-header":
        return "text-muted-foreground"
      case "output":
        return "text-emerald-400"
      default:
        return "text-sidebar-foreground"
    }
  }

  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Intuitive interface
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Write jq filters naturally with syntax highlighting and instant feedback
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-border shadow-2xl">
          {/* VS Code-like title bar */}
          <div className="flex items-center justify-between bg-sidebar px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-sidebar-foreground/60">
              example.jqpg — jq Playground
            </span>
            <div className="w-14" />
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-sidebar-border bg-sidebar">
            <div className="flex items-center gap-2 border-r border-sidebar-border bg-sidebar-accent px-4 py-2">
              <div className="flex h-4 w-4 items-center justify-center rounded bg-accent/20 text-[10px] font-bold text-accent">
                jq
              </div>
              <span className="font-mono text-xs text-sidebar-foreground">
                example.jqpg
              </span>
            </div>
          </div>

          {/* Editor content */}
          <div className="flex">
            {/* Line numbers */}
            <div className="flex flex-col bg-sidebar px-3 py-4 text-right font-mono text-xs text-sidebar-foreground/40">
              {demoLines.map((_, index) => (
                <div key={index} className="leading-6">
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Code content */}
            <div className="flex-1 bg-sidebar p-4 font-mono text-sm">
              {demoLines.map((line, index) => (
                <div
                  key={index}
                  className={`leading-6 transition-opacity duration-300 ${
                    index < visibleLines ? "opacity-100" : "opacity-0"
                  } ${getLineColor(line.type)}`}
                >
                  {line.content || "\u00A0"}
                </div>
              ))}
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between bg-accent px-4 py-1 text-xs text-accent-foreground">
            <div className="flex items-center gap-4">
              <span>JQ PlayGround</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Ln 3, Col 1</span>
              <span>jq 1.7</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Press <kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs">Ctrl+Enter</kbd> to execute
        </p>
      </div>
    </section>
  )
}
