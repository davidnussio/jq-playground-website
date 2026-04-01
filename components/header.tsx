"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Github, ExternalLink } from "lucide-react"

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Documentation", href: "#documentation" },
  { name: "Examples", href: "#examples" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex items-center gap-x-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="font-mono text-sm font-bold">jq</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              jq Playground
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex md:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-x-4">
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/davidnussio/vscode-jq-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button size="sm" asChild>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Install Extension
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
        
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-6 pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com/davidnussio/vscode-jq-playground"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button size="sm" asChild>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Install Extension
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
