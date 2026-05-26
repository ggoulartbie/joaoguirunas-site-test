'use client'

import React from 'react'

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

export interface EmBreveHeroProps {
  area: string
  headline: string
  headlineAccent?: string
  subtitle: string
  tags?: string[]
  stats?: Array<{ value: string; label: string }>
}

export function EmBreveHero({
  area,
  headline,
  headlineAccent,
  subtitle,
  tags = [],
  stats = [],
}: EmBreveHeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full -mt-16 min-h-[92vh] flex items-center"
      style={{
        background:
          'radial-gradient(ellipse at 60% 40%, rgba(255,58,14,0.06) 0%, transparent 60%)',
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-10 lg:px-16 w-full pt-28 sm:pt-0">
        <div className="sm:max-w-2xl lg:max-w-3xl">

          {/* Área / EM BREVE badge */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className="inline-flex items-center gap-2 border border-[#FF3A0E]/60 px-3 py-1.5"
              style={{ background: 'rgba(255,58,14,0.08)', ...KV_MONO }}
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
              </span>
              <span className="text-[#FF3A0E]">{area}</span>
            </span>

            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5"
              style={{
                background: 'rgba(255, 176, 0, 0.1)',
                border: '1px solid rgba(255,176,0,0.45)',
                ...KV_MONO,
                color: '#FFB000',
                fontSize: '10px',
              }}
            >
              EM BREVE
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-7xl text-white mb-6"
            style={{ ...KV_DISPLAY, lineHeight: 0.92 }}
          >
            {headlineAccent ? (
              <>
                {headline}{' '}
                <span
                  style={{
                    ...KV_DISPLAY,
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: '#FF3A0E',
                  }}
                >
                  {headlineAccent}
                </span>
              </>
            ) : (
              headline
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed mb-8">
            {subtitle}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    ...KV_MONO,
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '10px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              href="#inscricao"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98]"
              style={{
                background: '#FF3A0E',
                color: '#050507',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.16em',
              }}
            >
              Quero ser avisado(a)
            </a>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-6">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span
                    className="text-2xl sm:text-3xl"
                    style={{ ...KV_DISPLAY, color: '#FF3A0E' }}
                  >
                    {value}
                  </span>
                  <span style={{ ...KV_MONO, color: 'rgba(255,255,255,0.35)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
