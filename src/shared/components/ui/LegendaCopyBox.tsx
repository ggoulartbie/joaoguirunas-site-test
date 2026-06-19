'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.08em',
}

interface LegendaCopyBoxProps {
  legenda: string
}

function renderLegendaWithHashtags(text: string): React.ReactNode[] {
  const parts = text.split(/(#\w+)/g)
  return parts.map((part, i) => {
    if (/^#\w+$/.test(part)) {
      return (
        <span key={i} style={{ color: '#FF3A0E' }}>
          {part}
        </span>
      )
    }
    return part
  })
}

function extractHashtags(legenda: string): string[] {
  const matches = legenda.match(/#\w+/g)
  if (!matches) return []
  // Deduplicate preserving order
  return [...new Set(matches)]
}

export function LegendaCopyBox({ legenda }: LegendaCopyBoxProps) {
  const [copied, setCopied] = useState(false)

  const hashtags = extractHashtags(legenda)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(legenda)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Fallback: no-op (clipboard unavailable)
    }
  }

  return (
    <section
      className="py-14 sm:py-20 lg:py-24"
      style={{ background: '#0e0e11', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      aria-labelledby="legenda-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
        {/* Eyebrow */}
        <p
          id="legenda-heading"
          className="mb-5"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            fontWeight: 500,
            color: 'rgba(255,58,14,0.8)',
          }}
        >
          Legenda Pronta
        </p>

        {/* Legenda copyable box */}
        <div
          className="relative sm:pr-24"
          style={{
            background: '#16161a',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '20px 20px 16px',
          }}
        >
          <p
            style={{
              whiteSpace: 'pre-wrap',
              fontSize: 14,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.65,
              fontFamily: 'var(--font-sans)',
            }}
          >
            {renderLegendaWithHashtags(legenda)}
          </p>

          {/* Copy button — absolute on desktop, static on mobile */}
          <div className="flex justify-end mt-3 sm:mt-0 sm:absolute sm:bottom-3 sm:right-3">
            <button
              onClick={handleCopy}
              aria-live="polite"
              aria-label={copied ? 'Legenda copiada' : 'Copiar legenda'}
              className="inline-flex items-center gap-1.5 transition-colors min-h-[44px] px-3"
              style={{
                ...MONO,
                color: copied ? '#22C55E' : 'rgba(255,255,255,0.45)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hashtag chips */}
        {hashtags.length > 0 && (
          <div className="flex flex-wrap mt-4" style={{ gap: '6px' }}>
            {hashtags.map((tag) => {
              const tagWithout = tag.replace('#', '')
              return (
                <a
                  key={tag}
                  href={`https://www.instagram.com/explore/tags/${tagWithout}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Explorar ${tag} no Instagram`}
                  className="transition-colors"
                  style={{
                    ...MONO,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                    padding: '3px 10px',
                    borderRadius: 0,
                    textDecoration: 'none',
                    display: 'inline-block',
                    minHeight: '28px',
                    lineHeight: '22px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                  }}
                >
                  {tag}
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
