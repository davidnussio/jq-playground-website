"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

const sections = [
  {
    id: "getting-started",
    title: "Getting Started",
    content: [
      {
        title: "Installation",
        text: "Install the extension from the VS Code Marketplace or search for \"jq playground\" in the Extensions view (Ctrl+Shift+X).",
      },
      {
        title: "Create a Playground",
        text: "Open a new file and change the Language Mode to \"jqpg\" (JQ PlayGround), or create a file with the .jqpg extension.",
      },
      {
        title: "Write Your First Filter",
        text: "Start with a simple filter like jq '.foo' followed by your JSON data on the next line. Press Ctrl+Enter to see the output.",
      },
    ],
  },
  {
    id: "input-sources",
    title: "Input Sources",
    content: [
      {
        title: "JSON Text",
        text: "Write inline JSON directly after your jq command. Supports both single-line and multi-line formatted JSON.",
      },
      {
        title: "Strings",
        text: "Use the -R flag for raw input strings. Perfect for processing text data that isn't JSON.",
      },
      {
        title: "URLs",
        text: "Provide a URL directly as input to fetch and filter remote JSON data from APIs.",
      },
      {
        title: "Files",
        text: "Reference local files using relative or absolute paths, or open workspace files by name.",
      },
      {
        title: "Command Line",
        text: "Prefix commands with $ to execute them and pipe their output to your jq filter.",
      },
    ],
  },
  {
    id: "commands",
    title: "Commands",
    content: [
      {
        title: "jq playground: Examples",
        text: "Open the official jq manual examples directly in VS Code. Access via Command Palette (Ctrl+Shift+P).",
      },
      {
        title: "jq playground: Manual",
        text: "Open the jq online manual for comprehensive documentation.",
      },
      {
        title: "jq playground: Tutorial",
        text: "Access the jq tutorial for learning the basics of jq filtering.",
      },
    ],
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    content: [
      {
        title: "Ctrl+Enter",
        text: "Execute the current filter and send output to the Output panel.",
      },
      {
        title: "Shift+Enter",
        text: "Execute the current filter and open the result in a new editor buffer.",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Usage",
    content: [
      {
        title: "Variables",
        text: "Define variables at the top of your file using VAR = value syntax. Reference them in commands with $VAR.",
      },
      {
        title: "Output Redirect",
        text: "Use > filename.json after your filter to save the output directly to a file.",
      },
      {
        title: "Multiple Files",
        text: "Process multiple files by listing them space-separated after your filter. Use input_filename to identify the source.",
      },
      {
        title: "Workspace Filters",
        text: "Reference .jq files from your workspace to apply reusable filter definitions.",
      },
    ],
  },
]

export function Documentation() {
  const [activeSection, setActiveSection] = useState(sections[0])

  return (
    <section id="documentation" className="bg-secondary/30 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Documentation
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Learn how to use jq Playground effectively
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-4">
          {/* Sidebar navigation */}
          <nav className="lg:col-span-1">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors",
                      activeSection.id === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {section.title}
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeSection.id === section.id && "rotate-90"
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content area */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-8">
              <h3 className="font-serif text-2xl font-bold">
                {activeSection.title}
              </h3>
              <div className="mt-8 space-y-8">
                {activeSection.content.map((item, index) => (
                  <div key={index} className="border-l-2 border-accent/30 pl-6">
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
