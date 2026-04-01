"use client"

import { useState, useEffect } from "react"

const notebookCells = [
  {
    filter: "jq .[0]",
    input: '[{"name":"JSON", "good":true}, {"name":"XML", "good":false}]',
    output: '# {"name":"JSON", "good":true}',
  },
  {
    filter: "jq .[2]",
    input: '[{"name":"JSON", "good":true}, {"name":"XML", "good":false}]',
    output: "# null",
  },
  {
    filter: "jq .[-2]",
    input: "[1,2,3]",
    output: "# 2",
  },
  {
    filter: "jq .[2:4]",
    input: '["a","b","c","d","e"]',
    output: '# ["c", "d"]',
  },
]

const jsonPanel = [
  "{",
  '  "name": "JSON",',
  '  "good": true',
  "}",
]

const tabs = [
  { name: "Untitled-1", icon: null },
  { name: "jq . Untitled-2", icon: "jq", active: true },
  { name: "Untitled-4", icon: null },
  { name: "false", icon: "bool", color: "text-cyan-400" },
  { name: "null", icon: "null", color: "text-orange-400" },
  { name: "Untitled-7", icon: "obj", color: "text-yellow-400" },
]

export function DemoPreview() {
  const [activeCell, setActiveCell] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCell((prev) => (prev + 1) % notebookCells.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            Notebook-style jq editing
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Execute jq filters interactively with instant results
          </p>
        </div>

        <div className="mt-16 overflow-hidden rounded-xl border border-border shadow-2xl">
          {/* VS Code title bar */}
          <div className="flex items-center justify-between bg-[#1e1e1e] px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <span className="font-mono text-xs text-neutral-400">
              jq Playground — Visual Studio Code
            </span>
            <div className="w-14" />
          </div>

          {/* Tab bar */}
          <div className="flex overflow-x-auto border-b border-[#2d2d2d] bg-[#252526]">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 border-r border-[#2d2d2d] px-3 py-1.5 ${
                  tab.active ? "bg-[#1e1e1e]" : "bg-[#2d2d2d]"
                }`}
              >
                {tab.icon === "jq" && (
                  <span className="text-cyan-400 text-xs">jq</span>
                )}
                {tab.icon === "bool" && (
                  <span className="text-cyan-400 text-xs">{"{}"}</span>
                )}
                {tab.icon === "null" && (
                  <span className="text-orange-400 text-xs">{"{}"}</span>
                )}
                {tab.icon === "obj" && (
                  <span className="text-yellow-400 text-xs">{"{}"}</span>
                )}
                <span className={`font-mono text-xs ${tab.active ? "text-white" : "text-neutral-400"}`}>
                  {tab.name}
                </span>
                <span className="text-neutral-500 text-xs ml-1">{"●"}</span>
              </div>
            ))}
          </div>

          {/* Editor split view */}
          <div className="flex bg-[#1e1e1e]">
            {/* Left panel - Notebook cells */}
            <div className="flex-1 border-r border-[#2d2d2d]">
              <div className="flex">
                {/* Line numbers */}
                <div className="flex flex-col bg-[#1e1e1e] px-2 py-4 text-right font-mono text-xs text-neutral-600 select-none">
                  {[70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83].map((num) => (
                    <div key={num} className="leading-6">
                      {num}
                    </div>
                  ))}
                </div>

                {/* Code content */}
                <div className="flex-1 py-4 font-mono text-sm">
                  {notebookCells.map((cell, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        activeCell === index ? "bg-[#264f78]/30" : ""
                      }`}
                    >
                      {/* Action buttons */}
                      <div className="flex items-center gap-1 leading-6 px-2">
                        <span className="text-yellow-400">{"⚡"}</span>
                        <span className="text-neutral-400 text-xs">console</span>
                        <span className="text-neutral-500">|</span>
                        <span className="text-yellow-400">{"⚡"}</span>
                        <span className="text-neutral-400 text-xs">editor</span>
                        <span className="text-neutral-500">|</span>
                        <span className="text-purple-400">{"✦"}</span>
                        <span className="text-neutral-400 text-xs">Explain</span>
                      </div>
                      
                      {/* Filter */}
                      <div className="leading-6 px-2">
                        <span className="text-cyan-400">{cell.filter}</span>
                      </div>
                      
                      {/* Input */}
                      <div className="leading-6 px-2">
                        <span className="text-yellow-300">[</span>
                        {cell.input.includes('"name"') ? (
                          <>
                            <span className="text-yellow-300">{"{"}</span>
                            <span className="text-pink-400">{'"name"'}</span>
                            <span className="text-white">:</span>
                            <span className="text-green-400">{'"JSON"'}</span>
                            <span className="text-white">, </span>
                            <span className="text-pink-400">{'"good"'}</span>
                            <span className="text-white">:</span>
                            <span className="text-cyan-300">true</span>
                            <span className="text-yellow-300">{"}"}</span>
                            <span className="text-white">, </span>
                            <span className="text-yellow-300">{"{"}</span>
                            <span className="text-pink-400">{'"name"'}</span>
                            <span className="text-white">:</span>
                            <span className="text-green-400">{'"XML"'}</span>
                            <span className="text-white">, </span>
                            <span className="text-pink-400">{'"good"'}</span>
                            <span className="text-white">:</span>
                            <span className="text-cyan-300">false</span>
                            <span className="text-yellow-300">{"}"}</span>
                          </>
                        ) : cell.input.includes('"a"') ? (
                          <>
                            <span className="text-green-400">{'"a"'}</span>
                            <span className="text-white">,</span>
                            <span className="text-green-400">{'"b"'}</span>
                            <span className="text-white">,</span>
                            <span className="text-green-400">{'"c"'}</span>
                            <span className="text-white">,</span>
                            <span className="text-green-400">{'"d"'}</span>
                            <span className="text-white">,</span>
                            <span className="text-green-400">{'"e"'}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-orange-400">1</span>
                            <span className="text-white">,</span>
                            <span className="text-orange-400">2</span>
                            <span className="text-white">,</span>
                            <span className="text-orange-400">3</span>
                          </>
                        )}
                        <span className="text-yellow-300">]</span>
                      </div>
                      
                      {/* Output */}
                      <div className="leading-6 px-2">
                        <span className="text-neutral-500 italic">{cell.output}</span>
                      </div>
                      
                      {/* Empty line */}
                      <div className="leading-6">&nbsp;</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right panel - JSON input */}
            <div className="w-72 hidden md:block">
              <div className="flex">
                {/* Line numbers */}
                <div className="flex flex-col bg-[#1e1e1e] px-2 py-4 text-right font-mono text-xs text-neutral-600 select-none">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className="leading-6">
                      {num}
                    </div>
                  ))}
                </div>

                {/* JSON content */}
                <div className="flex-1 py-4 px-2 font-mono text-sm">
                  <div className="leading-6">
                    <span className="text-yellow-300 bg-[#264f78]">{"{"}</span>
                  </div>
                  <div className="leading-6">
                    <span className="text-white">{"  "}</span>
                    <span className="text-pink-400">{'"name"'}</span>
                    <span className="text-white">: </span>
                    <span className="text-green-400">{'"JSON"'}</span>
                    <span className="text-white">,</span>
                  </div>
                  <div className="leading-6">
                    <span className="text-white">{"  "}</span>
                    <span className="text-pink-400">{'"good"'}</span>
                    <span className="text-white">: </span>
                    <span className="text-cyan-300">true</span>
                  </div>
                  <div className="leading-6">
                    <span className="text-yellow-300">{"}"}</span>
                  </div>
                  <div className="leading-6">&nbsp;</div>
                </div>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between bg-[#007acc] px-4 py-0.5 text-xs text-white">
            <div className="flex items-center gap-4">
              <span>jq Playground</span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Ln 71, Col 1</span>
              <span>jq 1.7.1</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <kbd className="rounded bg-secondary px-2 py-1 font-mono text-xs">Ctrl+Enter</kbd>
            Execute filter
          </span>
          <span className="flex items-center gap-2">
            <kbd className="rounded bg-secondary px-2 py-1 font-mono text-xs">Ctrl+Shift+Enter</kbd>
            Execute all
          </span>
        </div>
      </div>
    </section>
  )
}
