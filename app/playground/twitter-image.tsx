import { renderOgImage, ogSize } from '@/lib/og-image'
import { JQ_WASM_VERSION } from '@/lib/site'

export const alt = 'jq Playground Online — run jq filters in your browser'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderOgImage({
    title: 'jq Playground Online',
    subtitle: 'Run jq filters on JSON right in your browser',
    footer: [`jq ${JQ_WASM_VERSION}`, 'WebAssembly', 'No sign-up'],
    badge: 'jq.dambox.ch/playground',
  })
}
