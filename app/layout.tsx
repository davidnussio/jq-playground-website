import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'jq Playground for VS Code',
  description: 'Create notebooks with the power of jq filters. A VS Code extension for working with JSON data using jq queries with autocomplete, multiple input sources, and interactive examples.',
  keywords: ['jq', 'VS Code', 'extension', 'JSON', 'playground', 'notebook', 'filters'],
  authors: [{ name: 'David Nussio' }],
  openGraph: {
    title: 'jq Playground for VS Code',
    description: 'Create notebooks with the power of jq filters. A VS Code extension for working with JSON data.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${spaceGrotesk.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
