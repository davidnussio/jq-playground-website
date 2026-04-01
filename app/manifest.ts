import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'jq Playground for VS Code',
    short_name: 'jq Playground',
    description: 'Create interactive notebooks with jq filters in VS Code.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F1EC',
    theme_color: '#1C2A3A',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
