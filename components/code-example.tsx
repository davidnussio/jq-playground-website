"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const examples = [
  {
    id: "json",
    title: "JSON Input",
    description: "Filter inline JSON data directly",
    code: `# Extract a specific field
jq '.foo'
{"foo": 42, "bar": "less interesting data"}

# Output: 42`,
  },
  {
    id: "url",
    title: "URL Input",
    description: "Fetch and filter data from APIs",
    code: `# Get latest commits from GitHub
jq '.[0] | {message: .commit.message, name: .commit.committer.name}'
https://api.github.com/repos/stedolan/jq/commits?per_page=5`,
  },
  {
    id: "file",
    title: "File Input",
    description: "Work with local or workspace files",
    code: `# Filter data from a local file
jq '.foo,.bar'
../files/example.json

# Or from workspace files
jq '.'
opened-workspace-file-with-data.json`,
  },
  {
    id: "command",
    title: "Command Line",
    description: "Pipe shell command output to jq",
    code: `# Process API response from curl
jq '.token'
$ curl -X GET "http://httpbin.org/bearer" -H "Authorization: Bearer 1234"

# List files as JSON
jq -R -s 'split("\\n") | .[] | { file: ., length: . | length}'
$ ls /etc/`,
  },
  {
    id: "variables",
    title: "Variables",
    description: "Define and use variables in your commands",
    code: `TOKEN = 1234
ENDPOINT = bearer

# Use variables in commands
jq '.token'
$ curl -X GET "http://httpbin.org/$ENDPOINT" -H "Authorization: Bearer $TOKEN"`,
  },
  {
    id: "multiline",
    title: "Multiline Filters",
    description: "Write complex, readable filters",
    code: `# Convert JSON to CSV
jq -r '(map(keys)
  | add
  | unique) as $cols
  | map(. as $row
  | $cols
  | map($row[.])) as $rows
  | $cols, $rows[]
  | @csv'
[
    {"code": "NSW", "name": "New South Wales", "country": "AU"},
    {"code": "AB", "name": "Alberta", "country": "CA"}
]`,
  },
]

export function CodeExamples() {
  const [activeExample, setActiveExample] = useState(examples[0])

  return (
    <section id="examples" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            See it in action
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Explore different ways to use jq Playground
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {/* Tab navigation */}
          <div className="mb-6 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example.id}
                onClick={() => setActiveExample(example)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-all",
                  activeExample.id === example.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="overflow-hidden rounded-xl border border-border bg-sidebar">
            <div className="flex items-center justify-between border-b border-sidebar-border px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-accent/60" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
              </div>
              <span className="font-mono text-xs text-sidebar-foreground/60">
                example.jqpg
              </span>
            </div>
            <div className="p-6">
              <p className="mb-4 text-sm text-sidebar-foreground/70">
                {activeExample.description}
              </p>
              <pre className="overflow-x-auto font-mono text-sm leading-relaxed text-sidebar-foreground">
                <code>{activeExample.code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
