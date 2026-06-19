'use client'

import { useState, useEffect } from 'react'

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  fontWeight: 500,
}

interface RoteiroToggleProps {
  roteiro: string
  formato: 'Reel' | 'Carrossel'
  duracao: string
}

export function RoteiroToggle({ roteiro, formato, duracao }: RoteiroToggleProps) {
  // Desktop: expanded by default; mobile: collapsed
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Collapse by default on mobile
    if (window.innerWidth < 640) {
      setIsExpanded(false)
    }
  }, [])

  const paragraphs = roteiro.split(/\n\n+/).filter(Boolean)
  const eyebrowLabel = formato === 'Reel' ? 'ROTEIRO DO REEL' : 'ROTEIRO DO CARROSSEL'
  const slideCount = paragraphs.length

  return (
    <section
      className="py-14 sm:py-20 lg:py-24"
      style={{ background: '#050507' }}
      aria-labelledby="roteiro-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
        <div
          style={{
            background: '#0e0e11',
            border: '1px solid rgba(255,255,255,0.07)',
            padding: '24px',
          }}
        >
          {/* Eyebrow row */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <p
              id="roteiro-heading"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                fontWeight: 500,
                color: 'rgba(255,58,14,0.8)',
              }}
            >
              {eyebrowLabel}
            </p>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.08em',
              }}
            >
              {formato === 'Reel' ? `~${duracao}` : `${slideCount} slides`}
            </span>
          </div>

          {/* Roteiro body */}
          <div className="relative">
            <div
              className="roteiro-body"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 15,
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.7,
                // On mobile before mount, start collapsed
                maxHeight: isMounted && !isExpanded ? '5.5rem' : undefined,
                overflow: isMounted && !isExpanded ? 'hidden' : undefined,
                transition: 'max-height 0.3s ease',
              }}
            >
              {paragraphs.map((para, i) => (
                <p key={i} style={{ marginTop: i > 0 ? '1rem' : 0 }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Fade gradient when collapsed */}
            {isMounted && !isExpanded && (
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3rem',
                  background: 'linear-gradient(transparent 0%, #0e0e11 100%)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>

          {/* Toggle button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            className="mt-5 transition-colors hover:opacity-100"
            style={{
              ...MONO,
              color: 'rgba(255,58,14,0.7)',
              background: 'none',
              border: 'none',
              padding: '4px 0',
              cursor: 'pointer',
              display: 'block',
            }}
          >
            {isExpanded ? 'Recolher ↑' : 'Ver roteiro completo ↓'}
          </button>
        </div>
      </div>
    </section>
  )
}
