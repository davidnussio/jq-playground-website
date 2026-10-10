export const SITE_URL = "https://jq.dambox.ch"
export const SITE_NAME = "jq Playground for VS Code"

export const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=davidnussio.vscode-jq-playground"
export const GITHUB_URL = "https://github.com/davidnussio/vscode-jq-playground"
export const JQ_MANUAL_URL = "https://jqlang.org/manual/"

// VS Code Marketplace figures (extensionquery API, 2026-10-10). The rating is
// published in JSON-LD, so keep it in sync with the Marketplace: update these
// numbers instead of rounding them up.
export const EXTENSION_STATS = {
  version: "5.0.8",
  installs: "33k+",
  ratingValue: "4.7",
  ratingCount: 16,
  minVSCodeVersion: "1.100.0",
}

// Version bundled by the jq-wasm package used on /playground
export const JQ_WASM_VERSION = "1.8.2"
