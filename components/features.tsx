import { 
  FileJson, 
  Terminal, 
  Sparkles, 
  Keyboard, 
  Code2,
  Zap,
  LayoutPanelLeft,
  MessageSquare
} from "lucide-react"

const features = [
  {
    name: "Filter Panel",
    description: "A dedicated webview to pick JSON files, write filters with autocomplete, and see results side by side.",
    icon: LayoutPanelLeft,
    highlight: true,
  },
  {
    name: "Multiple Input Sources",
    description: "Work with JSON from inline text, files, URLs, workspace buffers, or command line outputs.",
    icon: FileJson,
  },
  {
    name: "AI-Powered Assistance",
    description: "Explain, fix, and generate jq filters with GitHub Copilot. Chat with @jq for interactive help.",
    icon: Sparkles,
  },
  {
    name: "Command Line Integration",
    description: "Pipe output from curl, ls, grep, and other commands directly into your jq filters.",
    icon: Terminal,
  },
  {
    name: "Intelligent Autocomplete",
    description: "IntelliSense powered by official jq builtins with docs and examples as you type.",
    icon: Code2,
  },
  {
    name: "Keyboard Shortcuts",
    description: "Execute filters quickly with Cmd/Ctrl+Enter for output or Shift+Enter for editor.",
    icon: Keyboard,
  },
  {
    name: "Variable Support",
    description: "Define variables in your playground and use them in commands and filters.",
    icon: Zap,
  },
  {
    name: "Chat Participant @jq",
    description: "Ask @jq in GitHub Copilot chat for help writing, explaining, or debugging jq filters.",
    icon: MessageSquare,
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-24 lg:px-8" aria-label="Features">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A comprehensive toolkit for working with jq in Visual Studio Code
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="group relative rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-border hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              {'highlight' in feature && feature.highlight && (
                <span className="mb-2 inline-block rounded-full bg-accent/20 px-2.5 py-0.5 text-xs font-medium text-accent">
                  New
                </span>
              )}
              <h3 className="text-base font-semibold">{feature.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
