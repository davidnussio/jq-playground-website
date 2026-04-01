import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'jq Playground for VS Code — Interactive JSON Notebook Editor'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
            jq Playground
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
          Interactive JSON Notebook Editor for VS Code
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
          <span>30k+ installs</span>
          <span>•</span>
          <span>4.7+ rating</span>
          <span>•</span>
          <span>MIT License</span>
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
          VS Code Extension
        </div>
      </div>
    ),
    { ...size }
  )
}
