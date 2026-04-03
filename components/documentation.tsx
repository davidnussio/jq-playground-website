"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown, Copy, Check, ExternalLink, Sparkles, Zap, Terminal, FileJson, Command as CommandIcon, Keyboard, Settings, AlertCircle, LayoutPanelLeft } from "lucide-react"

// Code block component with copy functionality
function CodeBlock({ children, language = "jq" }: { children: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative mt-3 rounded-lg bg-[#1e1e1e] font-mono text-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-xs text-white/50">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/50 transition-colors hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-white/90">
        <code>{children}</code>
      </pre>
    </div>
  )
}

// Keyboard shortcut display
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium">
      {children}
    </kbd>
  )
}

// Table component
function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-4 py-3 text-left font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-muted/30">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 font-mono text-xs">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const sections = [
  {
    id: "filter-panel",
    title: "Filter Panel",
    icon: LayoutPanelLeft,
    subsections: [
      {
        id: "filter-panel-overview",
        title: "Overview",
        content: (
          <>
            <div className="mb-4 rounded-lg border border-accent/30 bg-accent/5 p-4">
              <p className="text-sm font-medium text-accent">
                New in v5.0.6 — A dedicated webview panel to experiment with jq filters without leaving the editor.
              </p>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">JQPG: Open Playground Panel</code> from the Command Palette, or click the <strong>jq Playground</strong> icon in the Activity Bar to open the filter panel.
            </p>
            <img
              src="https://raw.githubusercontent.com/davidnussio/vscode-jq-playground/master/images/filter-panel.png"
              alt="Filter panel screenshot showing the file picker, filter textarea, and output area"
              className="mt-6 rounded-lg border border-border shadow-sm"
            />
          </>
        ),
      },
      {
        id: "filter-panel-pick-files",
        title: "Pick Files",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Click <strong>📂 Pick File</strong> to select a JSON or JSONL file from open editors or the workspace. Up to 4 files can be loaded at once and displayed as selectable chips.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Click any file chip to switch the active data source. The panel remembers your selection across sessions.
            </p>
          </>
        ),
      },
      {
        id: "filter-panel-write-run",
        title: "Write & Run Filters",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Type your jq filter in the text area. The panel provides autocomplete for jq builtins with keyboard navigation.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Press <Kbd>▶ Run</Kbd> or <Kbd>Cmd+Enter</Kbd> / <Kbd>Ctrl+Enter</Kbd> to execute. The output appears instantly below the filter area.
            </p>
          </>
        ),
      },
      {
        id: "filter-panel-state",
        title: "Session Persistence",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              The panel state — your filter text and selected files — persists across tab switches via <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">vscode.getState()</code>. You can switch to other tabs and come back without losing your work.
            </p>
          </>
        ),
      },
      {
        id: "filter-panel-errors",
        title: "Error Feedback",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Execution errors are displayed inline in the output area so you can iterate quickly without switching panels.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started",
    icon: Zap,
    subsections: [
      {
        id: "installation",
        title: "Installation",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Install the extension from the VS Code Marketplace by searching for{" "}
              <strong>&quot;jq playground&quot;</strong> in the Extensions view (<Kbd>Ctrl+Shift+X</Kbd> / <Kbd>Cmd+Shift+X</Kbd>), or install directly from:
            </p>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              VS Code Marketplace
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
              <p className="text-sm text-blue-700 dark:text-blue-400">
                <strong>Dependency:</strong> The extension requires <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq-syntax-highlighting</code> which is installed automatically.
              </p>
            </div>
          </>
        ),
      },
      {
        id: "jq-configuration",
        title: "jq Configuration (Onboarding)",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              On first launch, the extension automatically searches for the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> binary in your system:
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="font-medium">1. Auto-detection</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  The extension runs <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">which jq</code> to find the binary in your system PATH.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="font-medium">2. If found</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  Shows a notification with three options:
                </p>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>&quot;Yes, use system jq&quot;</strong> — Saves the path to configuration</li>
                  <li>• <strong>&quot;Configure manually&quot;</strong> — Opens VS Code settings</li>
                  <li>• <strong>&quot;Download latest&quot;</strong> — Downloads jq 1.8.1 from GitHub</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <h5 className="font-medium">3. Automatic download</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  The binary is downloaded from GitHub Releases with SHA256 checksum verification. Supported platforms: macOS (amd64, arm64), Linux (amd64, arm64), Windows (amd64).
                </p>
              </div>
            </div>
            <div className="mt-6">
              <h5 className="font-medium">Manual commands available anytime:</h5>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">JQPG: Configure jq path</code> — Open settings to configure manually</li>
                <li>• <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">JQPG: Download jq binary</code> — Force download for current platform</li>
              </ul>
            </div>
          </>
        ),
      },
      {
        id: "create-playground",
        title: "Create a Playground",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Create a new file with the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.jqpg</code> extension, or open any file and change the Language Mode to <strong>&quot;jqpg&quot;</strong> (JQ PlayGround) from the status bar.
            </p>
          </>
        ),
      },
      {
        id: "first-filter",
        title: "Write Your First Filter",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Write a simple jq filter followed by JSON data on the next line:
            </p>
            <CodeBlock language="jq">{`jq '.name'
{"name": "Ada Lovelace", "year": 1815}`}</CodeBlock>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Press <Kbd>Cmd+Enter</Kbd> (macOS) or <Kbd>Ctrl+Enter</Kbd> (Windows/Linux) to execute. The result appears in the Output panel.
              </p>
              <p className="text-sm text-muted-foreground">
                Press <Kbd>Shift+Enter</Kbd> to open the result in a side editor.
              </p>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "input-sources",
    title: "Input Sources",
    icon: FileJson,
    subsections: [
      {
        id: "input-priority",
        title: "Priority Order",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Each filter block in a <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.jqpg</code> file can use a different data source. The extension tries sources in this priority order:
            </p>
            <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">1</span> URL</li>
              <li className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">2</span> Open workspace document</li>
              <li className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">3</span> Shell command</li>
              <li className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">4</span> Local file</li>
              <li className="flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-xs font-medium text-accent">5</span> Inline JSON</li>
            </ol>
          </>
        ),
      },
      {
        id: "inline-json",
        title: "Inline JSON",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Write JSON directly after the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> line. Supports single-line or multi-line:
            </p>
            <CodeBlock language="jq">{`jq '[.[] | select(.active)]'
[{"id": 1, "active": true}, {"id": 2, "active": false}]`}</CodeBlock>
            <p className="mt-4 text-sm font-medium">Multi-line JSON:</p>
            <CodeBlock language="jq">{`jq '.users | map(.name)'
{
  "users": [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
  ]
}`}</CodeBlock>
          </>
        ),
      },
      {
        id: "local-files",
        title: "Local Files",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Specify a relative (to current file) or absolute path:
            </p>
            <CodeBlock language="jq">{`jq '.dependencies | keys'
./package.json`}</CodeBlock>
            <p className="mt-4 text-sm text-muted-foreground">
              Multiple files can be specified separated by spaces:
            </p>
            <CodeBlock language="jq">{`jq '.'
./file1.json ./file2.json`}</CodeBlock>
          </>
        ),
      },
      {
        id: "workspace-docs",
        title: "Workspace Documents",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Reference a JSON file open in another VS Code tab by name:
            </p>
            <CodeBlock language="jq">{`jq '.settings'
settings.json`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground">
              The extension searches open documents by full filename or basename.
            </p>
          </>
        ),
      },
      {
        id: "urls",
        title: "URLs",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Provide a complete URL. The extension performs an HTTP GET request with a 10-second timeout:
            </p>
            <CodeBlock language="jq">{`jq '.[0].commit.message'
https://api.github.com/repos/stedolan/jq/commits?per_page=5`}</CodeBlock>
          </>
        ),
      },
      {
        id: "shell-commands",
        title: "Shell Commands",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Prefix the command with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">$ </code>. The command is executed in the system shell with a 10-second timeout:
            </p>
            <CodeBlock language="jq">{`jq '.items | length'
$ echo '{"items": [1, 2, 3, 4, 5]}'`}</CodeBlock>
            <CodeBlock language="jq">{`jq -R -s 'split("\\n") | map(select(length > 0))'
$ ls -la`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground">
              Variables defined in the file are substituted in shell commands (see Variables section).
            </p>
          </>
        ),
      },
      {
        id: "raw-input",
        title: "Raw String Input",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              If the input is not valid JSON and does not match any other source, it is treated as inline text. Use the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">-R</code> (raw input) option to process it:
            </p>
            <CodeBlock language="jq">{`jq -R 'split(" ")'
Lorem ipsum dolor sit amet`}</CodeBlock>
          </>
        ),
      },
    ],
  },
  {
    id: "commands",
    title: "Commands",
    icon: CommandIcon,
    subsections: [
      {
        id: "execution-commands",
        title: "Filter Execution",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              All commands are available from the Command Palette (<Kbd>Cmd+Shift+P</Kbd> / <Kbd>Ctrl+Shift+P</Kbd>) with the prefix <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">JQPG</code>.
            </p>
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["JQPG: Run query in output", "Execute the current jq filter and show results in the Output panel (channel \"jqpg\", formatted as JSON)"],
                ["JQPG: Run query in editor", "Execute the current jq filter and open results in a new side editor as a JSON document"],
                ["JQPG: Execute jq filter", "Opens an input box for a jq filter. Uses the active editor content (or selection) as input and creates a temporary playground"],
                ["JQPG: Create playground from filter", "Asks for a filter, takes the active editor text (or selection), and creates a new .jqpg file in a side editor"],
                ["JQPG: Open Playground Panel", "Open the interactive filter panel in a webview tab or the sidebar"],
              ]}
            />
          </>
        ),
      },
      {
        id: "resource-commands",
        title: "Resources & Documentation",
        content: (
          <>
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["JQPG: Manual", "Opens the official jq manual in the browser"],
                ["JQPG: Tutorial", "Opens the official jq tutorial in the browser"],
                ["JQPG: Examples", "Opens a playground file with all executable examples from the official jq manual"],
                ["JQPG: Open in jqplay.org", "Asks for a filter, takes JSON from the active editor, and opens jqplay.org with pre-filled filter and data"],
              ]}
            />
          </>
        ),
      },
      {
        id: "config-commands",
        title: "Configuration",
        content: (
          <>
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["JQPG: Configure jq path", "Opens VS Code settings at jqPlayground.binaryPath"],
                ["JQPG: Download jq binary", "Downloads the jq binary for the current platform from GitHub Releases"],
              ]}
            />
          </>
        ),
      },
      {
        id: "ai-commands",
        title: "AI Commands",
        content: (
          <>
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-purple-700 dark:text-purple-400">Requires GitHub Copilot</span>
            </div>
            <Table
              headers={["Command", "Description"]}
              rows={[
                ["JQPG: Explain filter with AI", "Explains the current jq filter step by step. Results shown in a Markdown side editor with real-time streaming"],
                ["JQPG: Generate filter with AI", "Asks for a natural language description (e.g., \"extract all names where active is true\") and generates a valid jq filter. If a JSON file is open, it is used as a sample for more precise generation"],
              ]}
            />
          </>
        ),
      },
    ],
  },
  {
    id: "keyboard-shortcuts",
    title: "Keyboard Shortcuts",
    icon: Keyboard,
    subsections: [
      {
        id: "shortcuts-table",
        title: "Shortcuts",
        content: (
          <>
            <Table
              headers={["Shortcut", "Action", "Condition"]}
              rows={[
                ["Cmd+Enter (macOS) / Ctrl+Enter (Win/Linux)", "Execute filter → result in Output panel", "Editor focused and language is jqpg"],
                ["Shift+Enter", "Execute filter → result in side editor", "Editor focused and language is jqpg"],
              ]}
            />
            <div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> The cursor does not need to be on the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> line. The extension searches backward from the cursor position to find the nearest <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> line.
              </p>
            </div>
          </>
        ),
      },
      {
        id: "code-lens",
        title: "Code Lens",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Clickable buttons appear above each <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> line in the file:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-muted px-2 py-1 font-mono text-xs"><Zap className="h-3 w-3 text-yellow-500" /> console</span>
                <span className="text-muted-foreground">— Execute and show in Output panel</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-muted px-2 py-1 font-mono text-xs"><Zap className="h-3 w-3 text-yellow-500" /> editor</span>
                <span className="text-muted-foreground">— Execute and show in side editor</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex items-center gap-1 rounded bg-muted px-2 py-1 font-mono text-xs"><Sparkles className="h-3 w-3 text-purple-500" /> Explain</span>
                <span className="text-muted-foreground">— (requires GitHub Copilot) Explain the filter with AI</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Code lens labels can be customized via <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jqPlayground.shortcutLabelConsole</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jqPlayground.shortcutLabelEditor</code> settings.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Usage",
    icon: Settings,
    subsections: [
      {
        id: "variables",
        title: "Variables",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Define variables at the beginning of the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.jqpg</code> file (before the first <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> line) using the <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">KEY = value</code> syntax:
            </p>
            <CodeBlock language="jq">{`TOKEN = "abc123"
ENDPOINT = "users"

jq '.results'
$ curl -s -H "Authorization: Bearer $TOKEN" "https://api.example.com/$ENDPOINT"`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground">
              Variables are substituted in shell commands (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">$ ...</code>). Lines starting with <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">#</code> are comments and are ignored.
            </p>
          </>
        ),
      },
      {
        id: "output-redirect",
        title: "Output Redirect",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Redirect filter output to a file by inserting a <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&gt;</code> or <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&gt;&gt;</code> line between the filter and input:
            </p>
            <p className="mt-4 text-sm font-medium">Overwrite (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&gt;</code>):</p>
            <CodeBlock language="jq">{`jq '[.[] | .url]'
> urls.json
$ curl -s 'https://api.github.com/repos/stedolan/jq/commits?per_page=5'`}</CodeBlock>
            <p className="mt-4 text-sm font-medium">Append (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&gt;&gt;</code>):</p>
            <CodeBlock language="jq">{`jq '.'
>> /tmp/log.json
{"event": "new_entry"}`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground">
              The path can be relative (to current file) or absolute.
            </p>
          </>
        ),
      },
      {
        id: "multiline-filters",
        title: "Multiline Filters",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Enclose the filter in single quotes and use line breaks:
            </p>
            <CodeBlock language="jq">{`jq '
  .[] |
  select(.age > 20) |
  {name, age}
'
[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 15}]`}</CodeBlock>
            <p className="mt-3 text-sm text-muted-foreground">
              The extension detects the opening quote and searches for the closing quote on subsequent lines.
            </p>
          </>
        ),
      },
      {
        id: "jq-options",
        title: "Supported jq Options",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              All standard jq options are supported on the filter line:
            </p>
            <Table
              headers={["Option", "Args", "Description"]}
              rows={[
                ["-r / --raw-output", "0", "Output as raw string (no quotes)"],
                ["-c / --compact-output", "0", "Compact output on a single line"],
                ["-S / --sort-keys", "0", "Sort object keys"],
                ["-s / --slurp", "0", "Read all input into a single array"],
                ["-R / --raw-input", "0", "Treat input as raw string"],
                ["-n / --null-input", "0", "Don't read input, use null"],
                ["-j / --join-output", "0", "Like raw-output but without trailing newline"],
                ["-e / --exit-status", "0", "Exit status based on output"],
                ["--tab", "0", "Indent with tabs"],
                ["--indent N", "1", "Indent with N spaces"],
                ["--arg name value", "2", "Define a string variable $name"],
                ["--argjson name value", "2", "Define a JSON variable $name"],
                ["--slurpfile name path", "2", "Load a JSON file into $name"],
                ["--rawfile name path", "2", "Load a raw file into $name"],
                ["-f / --from-file path", "1", "Read filter from a file"],
              ]}
            />
            <p className="mt-4 text-sm font-medium">Example with combined options:</p>
            <CodeBlock language="jq">{`jq -r -S '.[] | keys[]'
[{"z": 1, "a": 2}, {"m": 3, "b": 4}]`}</CodeBlock>
          </>
        ),
      },
      {
        id: "vscode-input",
        title: "VS Code Input Variables",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              Use jq results as input variables in <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">tasks.json</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">launch.json</code> configurations:
            </p>
            <CodeBlock language="json">{`{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Deploy",
      "type": "shell",
      "command": "deploy --url \${input:apiUrl}"
    }
  ],
  "inputs": [
    {
      "id": "apiUrl",
      "type": "command",
      "command": "extension.executeJqInputCommand",
      "args": {
        "filter": ".endpoints.api",
        "input": "./config.json"
      }
    }
  ]
}`}</CodeBlock>
            <div className="mt-4">
              <h5 className="font-medium">Parameters:</h5>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">filter</code> — The jq filter to execute (default: <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.</code>)</li>
                <li>• <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">input</code> — Path to a file (relative to workspace root) or inline JSON. If omitted, uses active editor content</li>
              </ul>
            </div>
          </>
        ),
      },
      {
        id: "autocomplete",
        title: "Autocomplete (IntelliSense)",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              The extension provides two autocomplete providers in <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.jqpg</code> files:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="rounded-lg border border-border bg-card p-4">
                <h5 className="font-medium">jq builtins</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  All jq builtins with documentation and examples. Appear as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Function</code> completion items.
                </p>
              </li>
              <li className="rounded-lg border border-border bg-card p-4">
                <h5 className="font-medium">Workspace files</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  JSON and plaintext documents open in the workspace. Appear as <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">File</code> completion items and insert the complete file path.
                </p>
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "syntax-highlighting",
        title: "Syntax Highlighting",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              The extension includes a complete TextMate grammar for <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.jqpg</code> and <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">.jq</code> files with support for:
            </p>
            <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
              <li>• jq syntax (filters, operators, builtins)</li>
              <li>• Embedded JSON</li>
              <li>• Comments (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">#</code>)</li>
              <li>• Variables (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">$name</code>)</li>
              <li>• Strings with interpolation</li>
            </ul>
          </>
        ),
      },
      {
        id: "error-handling",
        title: "Error Handling",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              The extension provides structured and typed error messages:
            </p>
            <Table
              headers={["Error", "When", "Behavior"]}
              rows={[
                ["jq not found", "Binary not configured or does not exist", "Prompt with options: configure manually or download"],
                ["Invalid JSON input", "Input is not valid JSON (when required)", "Message in Output panel + notification"],
                ["Execution error", "jq returns an error (stderr)", "Error in Output panel. If Copilot available, shows \"✨ Explain & Fix\" button"],
                ["File not found", "Specified input file does not exist", "Clear message with attempted path"],
                ["Command timeout", "jq execution exceeds 10 seconds", "Process terminated with SIGKILL"],
                ["Input resolution error", "Data source (URL, file, shell) cannot be resolved", "Message with failed source detail"],
                ["Unsupported platform", "OS/architecture not supported for download", "Message with platform and architecture"],
                ["Checksum mismatch", "Downloaded binary does not match expected checksum", "Download cancelled with SHA256 detail"],
              ]}
            />
            <div className="mt-4 flex items-center gap-2 rounded-lg border border-purple-500/20 bg-purple-500/5 p-3">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-purple-700 dark:text-purple-400">
                When a filter fails and GitHub Copilot is installed, the error notification includes an <strong>&quot;Explain &amp; Fix&quot;</strong> button that opens a side editor with an explanation and corrected filter.
              </span>
            </div>
          </>
        ),
      },
      {
        id: "ai-features",
        title: "AI Features",
        content: (
          <>
            <div className="mb-4 rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
              <p className="text-sm text-purple-700 dark:text-purple-400">
                Requires <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot" className="underline">GitHub Copilot</a>. Can be disabled via <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jqPlayground.ai.enabled</code>.
              </p>
            </div>
            <div className="space-y-6">
              <div>
                <h5 className="flex items-center gap-2 font-medium"><Sparkles className="h-4 w-4 text-purple-500" /> Explain filter</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  Click the <strong>Explain</strong> code lens above any <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">jq</code> line to get a step-by-step explanation of the filter: which builtins are used, what each step does, and why. The response is shown via streaming in a Markdown side editor.
                </p>
              </div>
              <div>
                <h5 className="flex items-center gap-2 font-medium"><AlertCircle className="h-4 w-4 text-red-500" /> Fix errors with AI</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  When a jq filter fails, the extension shows the error and offers an <strong>&quot;Explain &amp; Fix&quot;</strong> button. Clicking it opens a side panel with an explanation and the corrected filter.
                </p>
              </div>
              <div>
                <h5 className="flex items-center gap-2 font-medium"><Sparkles className="h-4 w-4 text-purple-500" /> Generate filter</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  Run <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">JQPG: Generate filter with AI</code> from the Command Palette, describe what you want in natural language, and the extension generates a valid jq filter. If a JSON file is open in the editor, it is used as a sample for more precise generation.
                </p>
              </div>
              <div>
                <h5 className="flex items-center gap-2 font-medium"><Terminal className="h-4 w-4 text-blue-500" /> Chat participant @jq</h5>
                <p className="mt-1 text-sm text-muted-foreground">
                  Type <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">@jq</code> in GitHub Copilot chat to ask questions about jq syntax, get help writing filters, or debug existing filters. The participant is context-aware: it automatically detects the filter and input sample from the active editor.
                </p>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Settings,
    subsections: [
      {
        id: "config-reference",
        title: "Configuration Reference",
        content: (
          <>
            <Table
              headers={["Setting", "Type", "Default", "Description"]}
              rows={[
                ["jqPlayground.binaryPath", "string", '""', "Path to jq binary. Leave empty for auto-detection. Scope: application."],
                ["jqPlayground.shortcutLabelConsole", "string", '""', "Custom label for the \"console\" code lens. Leave empty for auto-detect from keybinding."],
                ["jqPlayground.shortcutLabelEditor", "string", '""', "Custom label for the \"editor\" code lens. Leave empty for auto-detect from keybinding."],
                ["jqPlayground.ai.enabled", "boolean", "true", "Enable AI features (Explain, Fix, Generate). Requires GitHub Copilot. Disable for sensitive data."],
                ["jqPlayground.progressDelay", "number", "2", "Seconds to wait before showing progress notification for long queries. Set to 0 to always show immediately."],
              ]}
            />
          </>
        ),
      },
      {
        id: "output-destinations",
        title: "Output Destinations",
        content: (
          <>
            <p className="leading-relaxed text-muted-foreground">
              The extension offers four output destinations:
            </p>
            <Table
              headers={["Destination", "How to Activate", "Where It Appears"]}
              rows={[
                ["Output Panel", "Cmd+Enter / Ctrl+Enter or code lens \"⚡ console\"", "VS Code Output panel, channel \"jqpg\" (formatted as JSON). Channel is cleared on each execution."],
                ["Side Editor", "Shift+Enter or code lens \"⚡ editor\"", "New JSON document in a side editor (ViewColumn.Beside)."],
                ["File (overwrite)", "Line > path/to/file.json in playground", "Result is written to the specified file."],
                ["File (append)", "Line >> path/to/file.json in playground", "Result is appended to the specified file."],
              ]}
            />
            <p className="mt-4 text-sm text-muted-foreground">
              Errors are always shown in the Output panel (channel &quot;jqpg&quot;) and as VS Code notifications.
            </p>
          </>
        ),
      },
    ],
  },
]

export function Documentation() {
  const [activeSection, setActiveSection] = useState(sections[0])
  const [activeSubsection, setActiveSubsection] = useState(sections[0].subsections[0])
  const [expandedSections, setExpandedSections] = useState<string[]>([sections[0].id])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleSectionClick = (section: typeof sections[0]) => {
    setActiveSection(section)
    setActiveSubsection(section.subsections[0])
    if (!expandedSections.includes(section.id)) {
      setExpandedSections((prev) => [...prev, section.id])
    }
  }

  const handleSubsectionClick = (section: typeof sections[0], subsection: typeof sections[0]["subsections"][0]) => {
    setActiveSection(section)
    setActiveSubsection(subsection)
  }

  return (
    <section id="documentation" className="bg-secondary/30 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Documentation
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Everything you need to master jq Playground
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-4">
          {/* Sidebar navigation */}
          <nav className="lg:col-span-1">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <div
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-colors",
                      activeSection.id === section.id
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <button 
                      onClick={() => handleSectionClick(section)}
                      className="flex flex-1 items-center gap-2"
                    >
                      <section.icon className="h-4 w-4" />
                      {section.title}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSection(section.id)
                      }}
                      className="p-0.5"
                    >
                      {expandedSections.includes(section.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {expandedSections.includes(section.id) && (
                    <ul className="ml-6 mt-1 space-y-1 border-l border-border pl-4">
                      {section.subsections.map((sub) => (
                        <li key={sub.id}>
                          <button
                            onClick={() => handleSubsectionClick(section, sub)}
                            className={cn(
                              "w-full rounded px-3 py-1.5 text-left text-xs transition-colors",
                              activeSubsection.id === sub.id
                                ? "bg-accent/20 font-medium text-accent"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          >
                            {sub.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Content area */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center gap-3">
                <activeSection.icon className="h-6 w-6 text-accent" />
                <h3 className="font-serif text-2xl font-bold">
                  {activeSubsection.title}
                </h3>
              </div>
              <div className="mt-6">
                {activeSubsection.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
