import React from 'react'
import { User2 } from 'lucide-react'

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

export interface Persona {
  title: string
  description: string
}

export interface CursoParaQuemProps {
  personas: Persona[]
}

export function CursoParaQuem({ personas }: CursoParaQuemProps) {
  return (
    <section
      id="para-quem"
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
            Para quem é
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Este curso é{' '}
            <span className="text-[#FF3A0E]">para você</span>
          </h2>
          <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        {/* Persona cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {personas.map((persona, i) => (
            <div
              key={i}
              className="p-6 sm:p-8 flex flex-col gap-4 group hover:border-[#FF3A0E]/25 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center"
                style={{
                  background: 'rgba(255,58,14,0.1)',
                  border: '1px solid rgba(255,58,14,0.2)',
                }}
              >
                <User2
                  className="h-4 w-4"
                  style={{ color: '#FF3A0E' }}
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3
                  className="text-white text-lg mb-2 group-hover:text-[#FF3A0E] transition-colors"
                  style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400 }}
                >
                  {persona.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {persona.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
