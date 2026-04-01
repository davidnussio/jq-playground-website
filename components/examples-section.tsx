"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Copy, Check, Play, ChevronRight } from "lucide-react"

const exampleCategories = [
  {
    id: "basic",
    title: "Basic Filters",
    description: "Fundamental jq operations",
    examples: [
      {
        title: "Identity",
        filter: "jq '.'",
        input: '{"name": "Alice", "age": 30}',
        output: '{\n  "name": "Alice",\n  "age": 30\n}',
        description: "Returns the input unchanged",
      },
      {
        title: "Field Access",
        filter: "jq '.name'",
        input: '{"name": "Alice", "age": 30}',
        output: '"Alice"',
        description: "Access a specific field",
      },
      {
        title: "Nested Access",
        filter: "jq '.user.profile.email'",
        input: '{"user": {"profile": {"email": "alice@example.com"}}}',
        output: '"alice@example.com"',
        description: "Access nested fields with dot notation",
      },
      {
        title: "Array Index",
        filter: "jq '.[0]'",
        input: '["first", "second", "third"]',
        output: '"first"',
        description: "Access array elements by index",
      },
      {
        title: "Negative Index",
        filter: "jq '.[-1]'",
        input: '["first", "second", "third"]',
        output: '"third"',
        description: "Access from the end with negative index",
      },
      {
        title: "Array Slicing",
        filter: "jq '.[1:3]'",
        input: '["a", "b", "c", "d", "e"]',
        output: '["b", "c"]',
        description: "Get a slice of an array",
      },
    ],
  },
  {
    id: "iteration",
    title: "Iteration & Pipes",
    description: "Processing multiple values",
    examples: [
      {
        title: "Array Iterator",
        filter: "jq '.[]'",
        input: '[1, 2, 3]',
        output: '1\n2\n3',
        description: "Iterate over array elements",
      },
      {
        title: "Object Iterator",
        filter: "jq '.[]'",
        input: '{"a": 1, "b": 2}',
        output: '1\n2',
        description: "Iterate over object values",
      },
      {
        title: "Pipe",
        filter: "jq '.users[] | .name'",
        input: '{"users": [{"name": "Alice"}, {"name": "Bob"}]}',
        output: '"Alice"\n"Bob"',
        description: "Chain operations with pipe",
      },
      {
        title: "Multiple Outputs",
        filter: "jq '.name, .age'",
        input: '{"name": "Alice", "age": 30}',
        output: '"Alice"\n30',
        description: "Produce multiple outputs with comma",
      },
    ],
  },
  {
    id: "construction",
    title: "Data Construction",
    description: "Building new structures",
    examples: [
      {
        title: "Array Construction",
        filter: "jq '[.users[] | .name]'",
        input: '{"users": [{"name": "Alice"}, {"name": "Bob"}]}',
        output: '["Alice", "Bob"]',
        description: "Collect results into an array",
      },
      {
        title: "Object Construction",
        filter: "jq '{user: .name, years: .age}'",
        input: '{"name": "Alice", "age": 30}',
        output: '{\n  "user": "Alice",\n  "years": 30\n}',
        description: "Create a new object structure",
      },
      {
        title: "Dynamic Keys",
        filter: "jq '{(.type): .value}'",
        input: '{"type": "color", "value": "blue"}',
        output: '{\n  "color": "blue"\n}',
        description: "Use expression results as keys",
      },
    ],
  },
  {
    id: "filtering",
    title: "Filtering & Selection",
    description: "Conditional processing",
    examples: [
      {
        title: "Select",
        filter: "jq '.[] | select(.active)'",
        input: '[{"name": "Alice", "active": true}, {"name": "Bob", "active": false}]',
        output: '{\n  "name": "Alice",\n  "active": true\n}',
        description: "Filter elements by condition",
      },
      {
        title: "Select with Comparison",
        filter: "jq '.[] | select(.age > 25)'",
        input: '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 20}]',
        output: '{\n  "name": "Alice",\n  "age": 30\n}',
        description: "Filter with comparison operators",
      },
      {
        title: "Map",
        filter: "jq 'map(.name)'",
        input: '[{"name": "Alice"}, {"name": "Bob"}]',
        output: '["Alice", "Bob"]',
        description: "Transform each element",
      },
      {
        title: "Map with Select",
        filter: "jq '[.[] | select(.score > 80) | .name]'",
        input: '[{"name": "Alice", "score": 95}, {"name": "Bob", "score": 70}]',
        output: '["Alice"]',
        description: "Combine filtering and transformation",
      },
    ],
  },
  {
    id: "sorting",
    title: "Sorting & Grouping",
    description: "Organizing data",
    examples: [
      {
        title: "Sort",
        filter: "jq 'sort'",
        input: '[3, 1, 4, 1, 5, 9, 2, 6]',
        output: '[1, 1, 2, 3, 4, 5, 6, 9]',
        description: "Sort an array",
      },
      {
        title: "Sort by Field",
        filter: "jq 'sort_by(.age)'",
        input: '[{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]',
        output: '[{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]',
        description: "Sort objects by a field",
      },
      {
        title: "Reverse",
        filter: "jq 'reverse'",
        input: '[1, 2, 3, 4, 5]',
        output: '[5, 4, 3, 2, 1]',
        description: "Reverse an array",
      },
      {
        title: "Unique",
        filter: "jq 'unique'",
        input: '[1, 2, 1, 3, 2, 4]',
        output: '[1, 2, 3, 4]',
        description: "Remove duplicates",
      },
      {
        title: "Group By",
        filter: "jq 'group_by(.type)'",
        input: '[{"type": "a", "v": 1}, {"type": "b", "v": 2}, {"type": "a", "v": 3}]',
        output: '[[{"type": "a", "v": 1}, {"type": "a", "v": 3}], [{"type": "b", "v": 2}]]',
        description: "Group elements by a field",
      },
    ],
  },
  {
    id: "strings",
    title: "Strings & Regex",
    description: "Text processing",
    examples: [
      {
        title: "String Interpolation",
        filter: 'jq \'"Hello, \\(.name)!"\'',
        input: '{"name": "World"}',
        output: '"Hello, World!"',
        description: "Embed values in strings",
      },
      {
        title: "Split",
        filter: "jq 'split(\",\")'",
        input: '"a,b,c,d"',
        output: '["a", "b", "c", "d"]',
        description: "Split string into array",
      },
      {
        title: "Join",
        filter: "jq 'join(\"-\")'",
        input: '["a", "b", "c"]',
        output: '"a-b-c"',
        description: "Join array into string",
      },
      {
        title: "Test Regex",
        filter: 'jq \'test("^[a-z]+$")\'',
        input: '"hello"',
        output: 'true',
        description: "Test if string matches regex",
      },
      {
        title: "Capture Groups",
        filter: 'jq \'capture("(?<name>[a-z]+)-(?<num>[0-9]+)")\'',
        input: '"item-42"',
        output: '{\n  "name": "item",\n  "num": "42"\n}',
        description: "Extract named groups from regex",
      },
      {
        title: "Uppercase",
        filter: "jq 'ascii_upcase'",
        input: '"hello world"',
        output: '"HELLO WORLD"',
        description: "Convert to uppercase",
      },
    ],
  },
  {
    id: "aggregation",
    title: "Aggregation",
    description: "Combining and reducing",
    examples: [
      {
        title: "Length",
        filter: "jq 'length'",
        input: '[1, 2, 3, 4, 5]',
        output: '5',
        description: "Get array/string/object length",
      },
      {
        title: "Add",
        filter: "jq 'add'",
        input: '[1, 2, 3, 4, 5]',
        output: '15',
        description: "Sum array elements",
      },
      {
        title: "Min/Max",
        filter: "jq '[min, max]'",
        input: '[3, 1, 4, 1, 5, 9]',
        output: '[1, 9]',
        description: "Find minimum and maximum",
      },
      {
        title: "Reduce",
        filter: "jq 'reduce .[] as $x (0; . + $x)'",
        input: '[1, 2, 3, 4, 5]',
        output: '15',
        description: "Custom aggregation with reduce",
      },
      {
        title: "Keys",
        filter: "jq 'keys'",
        input: '{"c": 3, "a": 1, "b": 2}',
        output: '["a", "b", "c"]',
        description: "Get object keys (sorted)",
      },
      {
        title: "Values",
        filter: "jq '[.[] | values]'",
        input: '{"a": 1, "b": null, "c": 3}',
        output: '[1, 3]',
        description: "Get non-null values",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Patterns",
    description: "Complex transformations",
    examples: [
      {
        title: "Recursive Descent",
        filter: "jq '.. | numbers'",
        input: '{"a": {"b": 1, "c": {"d": 2}}, "e": 3}',
        output: '1\n2\n3',
        description: "Find all numbers at any depth",
      },
      {
        title: "Entries",
        filter: "jq 'to_entries'",
        input: '{"a": 1, "b": 2}',
        output: '[{"key": "a", "value": 1}, {"key": "b", "value": 2}]',
        description: "Convert object to key-value pairs",
      },
      {
        title: "With Entries",
        filter: "jq 'with_entries(.key |= \"prefix_\" + .)'",
        input: '{"a": 1, "b": 2}',
        output: '{\n  "prefix_a": 1,\n  "prefix_b": 2\n}',
        description: "Transform object keys",
      },
      {
        title: "Flatten",
        filter: "jq 'flatten'",
        input: '[[1, 2], [3, [4, 5]]]',
        output: '[1, 2, 3, 4, 5]',
        description: "Flatten nested arrays",
      },
      {
        title: "Try-Catch",
        filter: "jq 'try .foo.bar catch \"not found\"'",
        input: '{"foo": null}',
        output: '"not found"',
        description: "Handle errors gracefully",
      },
      {
        title: "Alternative Operator",
        filter: "jq '.name // \"Unknown\"'",
        input: '{"age": 30}',
        output: '"Unknown"',
        description: "Provide default for null/false",
      },
    ],
  },
]

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn("group relative rounded-lg bg-[#1e1e1e] font-mono text-xs", className)}>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded p-1 text-white/30 opacity-0 transition-opacity hover:text-white group-hover:opacity-100"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <pre className="overflow-x-auto p-3 text-white/90">
        <code>{children}</code>
      </pre>
    </div>
  )
}

export function ExamplesSection() {
  const [activeCategory, setActiveCategory] = useState(exampleCategories[0])
  const [activeExample, setActiveExample] = useState(exampleCategories[0].examples[0])

  return (
    <section id="examples" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Examples
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Learn jq through practical examples
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {exampleCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category)
                  setActiveExample(category.examples[0])
                }}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory.id === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                )}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Example list */}
            <div className="space-y-2">
              <p className="mb-4 text-sm text-muted-foreground">{activeCategory.description}</p>
              {activeCategory.examples.map((example) => (
                <button
                  key={example.title}
                  onClick={() => setActiveExample(example)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors",
                    activeExample.title === example.title
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/50 hover:bg-secondary/50"
                  )}
                >
                  <span className="font-medium">{example.title}</span>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform",
                    activeExample.title === example.title && "rotate-90"
                  )} />
                </button>
              ))}
            </div>

            {/* Example detail */}
            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{activeExample.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{activeExample.description}</p>
                  </div>
                  <a
                    href={`vscode:extension/davidnussio.vscode-jq-playground`}
                    className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    <Play className="h-3 w-3" />
                    Try in VS Code
                  </a>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Filter
                    </label>
                    <CodeBlock>{activeExample.filter}</CodeBlock>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Input
                    </label>
                    <CodeBlock>{activeExample.input}</CodeBlock>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Output
                    </label>
                    <CodeBlock className="border-l-2 border-green-500/50">{activeExample.output}</CodeBlock>
                  </div>
                </div>

                {/* Quick copy playground format */}
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Copy as .jqpg
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${activeExample.filter}\n${activeExample.input}`)
                      }}
                      className="flex items-center gap-1.5 text-xs text-accent hover:underline"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </button>
                  </div>
                  <pre className="mt-2 overflow-x-auto font-mono text-xs text-muted-foreground">
                    {activeExample.filter}{"\n"}{activeExample.input}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
