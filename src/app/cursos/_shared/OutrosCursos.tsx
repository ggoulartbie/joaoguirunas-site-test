'use client'

import Link from 'next/link'
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
  textTransform: 'uppercase' as const,
  fontWeight: 500,
}

const CURSOS = [
  {
    slug: 'curso-dev',
    label: 'Devs',
    href: '/curso-dev',
    description: 'Construa sites e apps full-stack com agentes de IA. Next.js, Supabase e deploy em produção.',
  },
  {
    slug: 'curso-social-media',
    label: 'Social Media',
    href: '/curso-social-media',
    description: 'Estratégia, criação de conteúdo e crescimento orgânico para redes sociais com IA.',
  },
  {
    slug: 'curso-design',
    label: 'Site',
    href: '/curso-design',
    description: 'Crie e lance sua presença digital com Claude Design e deploy automatizado.',
  },
  {
    slug: 'curso-ia-agentes',
    label: 'Tráfego',
    href: '/curso-ia-agentes',
    description: 'Automatize prospecção, conteúdo e conversão de leads com agentes de IA.',
  },
]

interface OutrosCursosProps {
  currentSlug: string
}

export function OutrosCursos({ currentSlug }: OutrosCursosProps) {
  const outros = CURSOS.filter((c) => c.slug !== currentSlug)

  if (outros.length === 0) return null

  return (
    <section
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
            Outros cursos
          </p>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4"
            style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
          >
            Também temos{' '}
            <span className="text-[#FF3A0E]">esses outros cursos</span>
          </h2>
          <div className="mx-auto w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
        </div>

        {/* Grid */}
        <div
          className={
            outros.length === 1
              ? 'grid grid-cols-1 max-w-sm mx-auto gap-6'
              : outros.length === 2
                ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
          }
        >
          {outros.map(({ slug, label, href, description }) => (
            <Link
              key={slug}
              href={href}
              className="group flex flex-col gap-3 p-5 sm:p-6 transition-colors"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,58,14,0.5)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'
              }}
            >
              <p
                className="text-white group-hover:text-[#FF3A0E] transition-colors"
                style={{ ...KV_MONO, fontSize: '12px' }}
              >
                {label}
              </p>
              <p
                className="text-sm leading-relaxed flex-1"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {description}
              </p>
              <span
                className="text-[11px] font-medium uppercase tracking-widest transition-colors group-hover:text-[#FF3A0E]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                Ver curso →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
