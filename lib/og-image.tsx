import { ImageResponse } from 'next/og'
import { EXTENSION_STATS } from '@/lib/site'

export const ogSize = { width: 1200, height: 630 }

interface OgImageProps {
  title: string
  subtitle: string
  footer: string[]
  badge: string
}

// Shared renderer for the opengraph-image / twitter-image route files
export function renderOgImage({ title, subtitle, footer, badge }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1C2A3A 0%, #2a3f55 50%, #1C2A3A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '16px',
              background: '#F4F1EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#1C2A3A',
            }}
          >
            jq
          </div>
          <div
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#F4F1EC',
              letterSpacing: '-1px',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: '#F4F1EC',
            opacity: 0.8,
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '40px',
            fontSize: '20px',
            color: '#F4F1EC',
            opacity: 0.6,
          }}
        >
          {footer.flatMap((item, i) =>
            i === 0 ? [<span key={item}>{item}</span>] : [<span key={`sep-${i}`}>•</span>, <span key={item}>{item}</span>],
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '40px',
            fontSize: '16px',
            color: '#7A1E2D',
            fontWeight: 'bold',
          }}
        >
          {badge}
        </div>
      </div>
    ),
    { ...ogSize },
  )
}

export function renderExtensionOgImage() {
  return renderOgImage({
    title: 'jq Playground',
    subtitle: 'jq editor & JSON notebook for VS Code',
    footer: [`${EXTENSION_STATS.installs} installs`, `${EXTENSION_STATS.ratingValue} rating`, 'MIT License'],
    badge: 'VS Code Extension',
  })
}
