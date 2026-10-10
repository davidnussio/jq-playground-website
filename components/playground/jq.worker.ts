import { loadJq, type Jq } from "jq-wasm"

// jq runs in a worker so that a filter that never ends (e.g. `repeat(1)`)
// can be stopped by terminating the worker instead of freezing the page.

export type JqWorkerRequest = { id: number; filter: string; input: string; flags: string[] }

export type JqWorkerResponse =
  | { type: "ready"; version: string }
  | { type: "load-error"; message: string }
  | { type: "result"; id: number; stdout: string; stderr: string; exitCode: number }

function post(message: JqWorkerResponse) {
  self.postMessage(message)
}

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error)
}

let jq: Jq | undefined

const ready = loadJq().then(
  (handle) => {
    jq = handle
    post({ type: "ready", version: handle.version })
  },
  (error: unknown) => post({ type: "load-error", message: errorMessage(error) }),
)

self.onmessage = async (event: MessageEvent<JqWorkerRequest>) => {
  await ready
  if (!jq) return
  const { id, filter, input, flags } = event.data
  try {
    post({ type: "result", id, ...jq.raw(input, filter, flags) })
  } catch (error) {
    post({ type: "result", id, stdout: "", stderr: errorMessage(error), exitCode: 1 })
  }
}
