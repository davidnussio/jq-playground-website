"use client"

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import { Check, Loader2, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { findJqExample, jqExampleCategories, type JqFlag } from "@/lib/jq-examples"
import type { JqWorkerRequest, JqWorkerResponse } from "./jq.worker"

const FLAG_OPTIONS: { flag: JqFlag; label: string }[] = [
  { flag: "-r", label: "Raw output" },
  { flag: "-c", label: "Compact" },
  { flag: "-s", label: "Slurp" },
  { flag: "-n", label: "Null input" },
  { flag: "-S", label: "Sort keys" },
]

const RUN_TIMEOUT_MS = 3000
const RUN_DEBOUNCE_MS = 150
const MAX_SHARED_INPUT_LENGTH = 8000

const DEFAULT_FILTER = ".users[] | select(.active) | {name, email}"
const DEFAULT_INPUT = `{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com", "active": true, "roles": ["admin", "dev"] },
    { "id": 2, "name": "Bob", "email": "bob@example.com", "active": false, "roles": ["dev"] },
    { "id": 3, "name": "Carol", "email": "carol@example.com", "active": true, "roles": ["ops"] }
  ]
}`

interface PlaygroundState {
  filter: string
  input: string
  flags: JqFlag[]
}

type RunResult =
  | { kind: "output"; stdout: string; stderr: string }
  | { kind: "error"; message: string }

type EngineStatus = { status: "loading" } | { status: "ready"; version: string } | { status: "failed"; message: string }

function stateKey({ filter, input, flags }: PlaygroundState) {
  return JSON.stringify([filter, input, flags])
}

function isJqFlag(value: string): value is JqFlag {
  return FLAG_OPTIONS.some((option) => option.flag === value)
}

// Supported hashes: #try=<example id> (links in the cheat sheet) and
// #f=<filter>&i=<input>&o=<flags> (share links)
function parseHash(hash: string): PlaygroundState | null {
  const params = new URLSearchParams(hash.replace(/^#/, ""))
  const exampleId = params.get("try")
  if (exampleId) {
    const example = findJqExample(exampleId)
    return example ? { filter: example.filter, input: example.input, flags: example.flags } : null
  }
  const filter = params.get("f")
  if (filter === null) return null
  return {
    filter,
    input: params.get("i") ?? "",
    flags: (params.get("o") ?? "").split(",").filter(isJqFlag),
  }
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange)
  return () => window.removeEventListener("hashchange", onChange)
}

function useJqWorker() {
  const [engine, setEngine] = useState<EngineStatus>({ status: "loading" })
  const [result, setResult] = useState<RunResult | null>(null)
  const runRef = useRef<(state: PlaygroundState) => void>(() => {})

  useEffect(() => {
    let worker: Worker
    let nextId = 0
    let pending: { id: number; key: string; timer: ReturnType<typeof setTimeout> } | null = null
    let queued: PlaygroundState | null = null
    let isReady = false
    let timedOutKey: string | null = null

    const send = (state: PlaygroundState) => {
      const id = ++nextId
      const key = stateKey(state)
      const timer = setTimeout(() => onTimeout(key), RUN_TIMEOUT_MS)
      pending = { id, key, timer }
      worker.postMessage({ id, filter: state.filter, input: state.input, flags: state.flags } satisfies JqWorkerRequest)
    }

    const flushQueue = () => {
      if (!queued) return
      const next = queued
      queued = null
      run(next)
    }

    const onMessage = (event: MessageEvent<JqWorkerResponse>) => {
      const message = event.data
      if (message.type === "ready") {
        isReady = true
        setEngine({ status: "ready", version: message.version })
        flushQueue()
      } else if (message.type === "load-error") {
        setEngine({ status: "failed", message: message.message })
      } else if (pending && message.id === pending.id) {
        clearTimeout(pending.timer)
        pending = null
        setResult(
          message.exitCode !== 0 && message.stderr
            ? { kind: "error", message: message.stderr.trim() }
            : { kind: "output", stdout: message.stdout, stderr: message.stderr.trim() },
        )
        flushQueue()
      }
    }

    const spawn = () => {
      isReady = false
      worker = new Worker(new URL("./jq.worker.ts", import.meta.url), { type: "module" })
      worker.onmessage = onMessage
      worker.onerror = () => setEngine({ status: "failed", message: "The jq WebAssembly worker could not start." })
    }

    const onTimeout = (key: string) => {
      worker.terminate()
      pending = null
      timedOutKey = key
      setEngine({ status: "loading" })
      setResult({
        kind: "error",
        message: `Stopped after ${RUN_TIMEOUT_MS / 1000} seconds: the filter is too slow or never ends (for example \`repeat\` or \`range(infinite)\`).`,
      })
      spawn()
    }

    const run = (state: PlaygroundState) => {
      // Do not re-run a filter that just timed out until something changes
      if (stateKey(state) === timedOutKey) return
      timedOutKey = null
      if (!isReady || pending) {
        queued = state
        return
      }
      send(state)
    }

    runRef.current = run
    spawn()
    return () => {
      if (pending) clearTimeout(pending.timer)
      worker.terminate()
    }
  }, [])

  const run = useCallback((state: PlaygroundState) => runRef.current(state), [])
  return { engine, result, run }
}

export function JqPlayground() {
  const [filter, setFilter] = useState(DEFAULT_FILTER)
  const [input, setInput] = useState(DEFAULT_INPUT)
  const [flags, setFlags] = useState<JqFlag[]>([])
  const [shareState, setShareState] = useState<"idle" | "copied" | "filter-only">("idle")
  const { engine, result, run } = useJqWorker()
  const editorRef = useRef<HTMLDivElement>(null)

  // Load filter/input from the URL hash, and again whenever it changes
  const hash = useSyncExternalStore(subscribeToHash, () => window.location.hash, () => "")
  const [appliedHash, setAppliedHash] = useState("")
  if (hash !== appliedHash) {
    setAppliedHash(hash)
    const fromHash = parseHash(hash)
    if (fromHash) {
      setFilter(fromHash.filter)
      setInput(fromHash.input)
      setFlags(fromHash.flags)
    }
  }

  useEffect(() => {
    if (hash.startsWith("#try=")) editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [hash])

  useEffect(() => {
    const timer = setTimeout(() => run({ filter, input, flags }), RUN_DEBOUNCE_MS)
    return () => clearTimeout(timer)
  }, [filter, input, flags, run])

  const toggleFlag = (flag: JqFlag) => {
    setFlags((current) =>
      current.includes(flag)
        ? current.filter((f) => f !== flag)
        : FLAG_OPTIONS.map((o) => o.flag).filter((f) => f === flag || current.includes(f)),
    )
  }

  const loadExample = (id: string) => {
    const example = findJqExample(id)
    if (!example) return
    setFilter(example.filter)
    setInput(example.input)
    setFlags(example.flags)
  }

  const share = async () => {
    const params = new URLSearchParams({ f: filter })
    const includeInput = input.length <= MAX_SHARED_INPUT_LENGTH
    if (includeInput) params.set("i", input)
    if (flags.length) params.set("o", flags.join(","))
    const newHash = `#${params.toString()}`
    window.history.replaceState(null, "", newHash)
    setAppliedHash(newHash)
    try {
      await navigator.clipboard.writeText(window.location.href)
    } catch {
      // The link is still in the address bar
    }
    setShareState(includeInput ? "copied" : "filter-only")
    setTimeout(() => setShareState("idle"), 2500)
  }

  const isError = result?.kind === "error"
  const output = result?.kind === "output" ? result.stdout : result?.message ?? ""

  return (
    <div ref={editorRef} id="editor" className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border px-4 py-3">
        <label className="flex items-center gap-2 text-sm">
          <span className="sr-only">Load an example</span>
          <select
            value=""
            onChange={(e) => loadExample(e.target.value)}
            className="h-9 max-w-[14rem] rounded-md border border-input bg-background px-2 text-sm"
          >
            <option value="" disabled>
              Load an example…
            </option>
            {jqExampleCategories.map((category) => (
              <optgroup key={category.id} label={category.title}>
                {category.examples.map((example) => (
                  <option key={example.id} value={example.id}>
                    {example.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
        <fieldset className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <legend className="sr-only">jq options</legend>
          {FLAG_OPTIONS.map(({ flag, label }) => (
            <label key={flag} className="flex cursor-pointer items-center gap-1.5 text-sm">
              <input
                type="checkbox"
                checked={flags.includes(flag)}
                onChange={() => toggleFlag(flag)}
                className="h-4 w-4 accent-[var(--primary)]"
              />
              {label} <code className="font-mono text-xs text-muted-foreground">{flag}</code>
            </label>
          ))}
        </fieldset>
        <Button variant="outline" size="sm" onClick={share} className="ml-auto gap-2">
          {shareState === "idle" ? <Share2 className="h-4 w-4" /> : <Check className="h-4 w-4" />}
          {shareState === "idle" ? "Share" : shareState === "copied" ? "Link copied" : "Filter link copied (input too large)"}
        </Button>
      </div>

      <div className="border-b border-border p-4">
        <label htmlFor="jq-filter" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          jq filter
        </label>
        <textarea
          id="jq-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          rows={2}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-code text-base sm:text-sm"
        />
      </div>

      <div className="grid md:grid-cols-2">
        <div className="border-b border-border p-4 md:border-b-0 md:border-r">
          <label htmlFor="jq-input" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            JSON input
          </label>
          <textarea
            id="jq-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            disabled={flags.includes("-n")}
            placeholder={flags.includes("-n") ? "Input is ignored with -n" : "Paste JSON here"}
            className="h-72 w-full resize-y rounded-md border border-input bg-background px-3 py-2 font-code text-base disabled:opacity-50 sm:text-sm md:h-96"
          />
        </div>
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span id="jq-output-label" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Output
            </span>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-live="polite">
              {engine.status === "loading" && (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" /> Loading jq (WebAssembly)…
                </>
              )}
              {engine.status === "ready" && <>{engine.version} · runs in your browser</>}
              {engine.status === "failed" && <>jq could not be loaded</>}
            </span>
          </div>
          <pre
            aria-labelledby="jq-output-label"
            aria-live="polite"
            className={`h-72 overflow-auto whitespace-pre-wrap break-words rounded-md border border-border bg-background px-3 py-2 font-code text-sm md:h-96 ${isError ? "text-destructive" : ""}`}
          >
            {engine.status === "failed" ? `${engine.message}\nWebAssembly is required to run jq in the browser.` : output}
            {result?.kind === "output" && result.stderr && (
              <span className="mt-2 block text-muted-foreground">{result.stderr}</span>
            )}
          </pre>
        </div>
      </div>
    </div>
  )
}
