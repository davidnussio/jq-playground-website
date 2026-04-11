import type { Metadata, Viewport } from 'next'
import { Montserrat, Space_Grotesk, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  preload: false,
})

const SITE_URL = 'https://jq.dambox.ch'
const SITE_TITLE = 'jq Playground for VS Code — Interactive JSON Notebook Editor'
const SITE_DESCRIPTION = 'Create interactive notebooks with jq filters in VS Code. Work with JSON data from files, URLs, or CLI outputs. Autocomplete, syntax highlighting, 30k+ installs. Free & open source.'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4F1EC' },
    { media: '(prefers-color-scheme: dark)', color: '#1C2A3A' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | jq Playground for VS Code',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'jq', 'jq playground', 'VS Code extension', 'JSON', 'JSON editor',
    'jq filters', 'jq notebook', 'vscode jq', 'JSON query', 'jq tutorial',
    'JSON transformation', 'jq examples', 'command line JSON', 'API testing',
    'JSON processing', 'jq autocomplete', 'data transformation',
  ],
  authors: [{ name: 'David Nussio', url: 'https://github.com/davidnussio' }],
  creator: 'David Nussio',
  publisher: 'David Nussio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'jq Playground for VS Code',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'jq Playground for VS Code — Interactive JSON Notebook Editor',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
    creator: '@davidnussio',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  category: 'developer tools',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
