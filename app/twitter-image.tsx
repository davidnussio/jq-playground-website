import { ogSize, renderExtensionOgImage } from '@/lib/og-image'

export const alt = 'jq Playground for VS Code — jq editor and JSON notebook extension'
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderExtensionOgImage()
}
