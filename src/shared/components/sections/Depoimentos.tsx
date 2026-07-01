'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

const VIDEOS = [
  { id: '1206283070' },
  { id: '1206283071' },
  { id: '1206283072' },
  { id: '1206283073' },
  { id: '1206283139' },
  { id: '1206283151' },
  { id: '1206283234' },
]

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

function hexAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

interface ArrowBtnProps {
  dir: 'prev' | 'next'
  disabled: boolean
  accent: string
  onClick: () => void
}

function ArrowBtn({ dir, disabled, accent, onClick }: ArrowBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Anterior' : 'Próximo'}
      className="hidden sm:flex flex-shrink-0 items-center justify-center w-10 h-10 transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
      style={{
        border: `1px solid ${hexAlpha(accent, disabled ? 0.2 : 0.45)}`,
        background: disabled ? 'transparent' : hexAlpha(accent, 0.12),
        color: 'white',
      }}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {dir === 'prev'
          ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />}
      </svg>
    </button>
  )
}

interface DepoimentosProps {
  accent?: string
}

export function Depoimentos({ accent = '#FF3A0E' }: DepoimentosProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)
  const [activeIdx, setActiveIdx] = useState(0)

  function getStep(): number {
    const el = trackRef.current
    if (!el) return 300
    const items = el.querySelectorAll<HTMLElement>('[data-item]')
    if (items.length < 2) return items[0]?.offsetWidth ?? 300
    const a = items[0]!.getBoundingClientRect()
    const b = items[1]!.getBoundingClientRect()
    return b.left - a.left
  }

  const syncState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    const step = getStep()
    if (step > 0) setActiveIdx(Math.round(el.scrollLeft / step))
  }, [])

  useEffect(() => { syncState() }, [syncState])

  function scrollStep(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * getStep(), behavior: 'smooth' })
  }

  function scrollTo(i: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * getStep(), behavior: 'smooth' })
  }

  return (
    <section
      id="depoimentos"
      className="relative py-16 sm:py-24 overflow-hidden"
      style={{ background: '#080810' }}
    >
      <div
        className="absolute inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="mb-8 sm:mb-10"
        >
          <p className="mb-3" style={{ ...KV_MONO, color: accent }}>
            <span
              className="inline-flex items-center gap-2"
              style={{
                border: `1px solid ${hexAlpha(accent, 0.35)}`,
                background: hexAlpha(accent, 0.08),
                padding: '0.25rem 0.75rem',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />
              Depoimentos · Alunos reais
            </span>
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            O que dizem{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: accent }}>
              quem já fez
            </span>
          </h2>
        </motion.div>

        {/* Arrows + Track */}
        <div className="flex items-center gap-3 sm:gap-4">
          <ArrowBtn
            dir="prev"
            disabled={!canPrev}
            accent={accent}
            onClick={() => scrollStep(-1)}
          />

          {/* Scroll track */}
          <div
            ref={trackRef}
            onScroll={syncState}
            className="flex gap-3 sm:gap-4 overflow-x-auto flex-1"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            } as React.CSSProperties}
          >
            {VIDEOS.map(({ id }, i) => (
              <motion.div
                key={id}
                data-item
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.06, 0.24) }}
                className="flex-none w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className="relative overflow-hidden w-full"
                  style={{
                    aspectRatio: '9 / 16',
                    border: `1px solid ${hexAlpha(accent, 0.18)}`,
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=${id}&app_id=58479&title=0&byline=0&portrait=0&color=${accent.replace('#', '')}&dnt=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                    allowFullScreen
                    title={`Depoimento ${i + 1}`}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <ArrowBtn
            dir="next"
            disabled={!canNext}
            accent={accent}
            onClick={() => scrollStep(1)}
          />
        </div>

        {/* Mobile dots */}
        <div className="flex sm:hidden justify-center gap-2 mt-4">
          {VIDEOS.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Depoimento ${i + 1}`}
              className="h-0.5 rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? '1.5rem' : '0.5rem',
                background: activeIdx === i ? accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
