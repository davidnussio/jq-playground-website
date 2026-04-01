import Link from "next/link"
import { Github, ExternalLink } from "lucide-react"

const links = {
  product: [
    { name: "Features", href: "#features" },
    { name: "Documentation", href: "#documentation" },
    { name: "Examples", href: "#examples" },
  ],
  resources: [
    { name: "jq Manual", href: "https://stedolan.github.io/jq/manual/", external: true },
    { name: "jq Tutorial", href: "https://stedolan.github.io/jq/tutorial/", external: true },
    { name: "Changelog", href: "https://github.com/davidnussio/vscode-jq-playground/blob/master/CHANGELOG.md", external: true },
  ],
  community: [
    { name: "GitHub", href: "https://github.com/davidnussio/vscode-jq-playground", external: true },
    { name: "Report Issue", href: "https://github.com/davidnussio/vscode-jq-playground/issues", external: true },
    { name: "Discussions", href: "https://github.com/davidnussio/vscode-jq-playground/discussions", external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-mono text-sm font-bold">jq</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">
                jq Playground
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A VS Code extension for working with JSON data using jq filters. 
              Created by David Nussio.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://github.com/davidnussio/vscode-jq-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="mt-4 space-y-3">
              {links.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold">Resources</h3>
            <ul className="mt-4 space-y-3">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h3 className="text-sm font-semibold">Community</h3>
            <ul className="mt-4 space-y-3">
              {links.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Released under the MIT License.
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-mono">jq</span> is developed by{" "}
            <a
              href="https://github.com/stedolan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              Stephen Dolan
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
