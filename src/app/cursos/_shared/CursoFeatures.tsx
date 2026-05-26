import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

export interface Feature {
  title: string
  description: string
}

export interface CursoFeaturesProps {
  features: Feature[]
  sectionLabel?: string
  heading?: string
  headingAccent?: string
}

export function CursoFeatures({
  features,
  sectionLabel = 'O que você vai aprender',
  heading = 'Conteúdo do',
  headingAccent = 'Curso',
}: CursoFeaturesProps) {
  return (
    <section
      id="conteudo"
      className="py-16 sm:py-24"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-[140px]">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p
            className="mb-4 sm:mb-6"
            style={{ ...KV_MONO, color: 'rgba(255, 58, 14, 0.85)' }}
          >
            {sectionLabel}
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            {heading}{' '}
            <span className="text-[#FF3A0E]">{headingAccent}</span>
          </h2>
          <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 sm:p-6 group hover:border-[#FF3A0E]/25 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div className="flex-shrink-0 mt-0.5">
                <CheckCircle2
                  className="h-5 w-5"
                  style={{ color: '#FF3A0E' }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3
                  className="text-white text-base font-semibold mb-1.5 group-hover:text-[#FF3A0E] transition-colors"
                  style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
