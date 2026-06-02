export const dynamic = 'force-dynamic'

import Link from 'next/link';
import type { Metadata } from 'next';
import { MODULOS_PRESENCIAIS } from './_components/ModuloLayout';

export const metadata: Metadata = {
  title: 'Dia Presencial — Mentoria Claude Code + AIOX',
  description:
    'Programa completo do dia presencial: O que é possível, Fundamentos Claude Code, Setup e Instalação, Centro de Treinamento de Agentes.',
  alternates: { canonical: '/mentoria/presencial' },
};

const MONO    = 'var(--font-mono)';
const SERIF   = 'var(--font-display-serif)';
const DISPLAY = 'var(--font-display)';
const ACCENT  = '#FF3A0E';

export default function ModulosIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#050507] text-white">
      <div className="mx-auto max-w-4xl px-6 py-20 md:px-8 md:py-28">

        <header className="mb-16">
          <Link
            href="/mentoria"
            className="inline-block text-[10px] tracking-[0.22em] uppercase text-white/35 hover:text-[#FF3A0E] transition-colors mb-8"
            style={{ fontFamily: MONO }}
          >
            ← Mentoria
          </Link>
          <div
            className="inline-flex items-center gap-2 border px-3 py-1.5 mb-6"
            style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: ACCENT,
              borderColor: 'rgba(255,58,14,0.3)',
              background: 'rgba(255,58,14,0.08)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }}
            />
            Presencial · Julho 2026 · a definir
          </div>
          <h1
            className="text-5xl font-light leading-[1.05] md:text-6xl"
            style={{ fontFamily: SERIF, letterSpacing: '-0.03em' }}
          >
            Dia{' '}
            <span style={{ color: ACCENT }}>Presencial</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: DISPLAY }}>
            Cinco horas intensivas em Florianópolis. Você sai com ambiente configurado, fundamentos consolidados e seu primeiro agente funcionando.
          </p>
        </header>

        <section>
          <p
            className="mb-5 text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
          >
            Módulos · siga em ordem
          </p>
          <ol className="grid gap-3 sm:grid-cols-2">
            {MODULOS_PRESENCIAIS.map((modulo) => (
              <li key={modulo.slug}>
                <Link
                  href={modulo.href}
                  className="group block border p-6 transition-all hover:border-[#FF3A0E]/40 hover:bg-white/[0.02]"
                  style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <div className="flex items-baseline justify-between gap-3 mb-4">
                    <span
                      className="text-[10px] tracking-[0.22em] uppercase transition-colors group-hover:text-[#FF3A0E]"
                      style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
                    >
                      Módulo {String(modulo.number).padStart(2, '0')}
                    </span>
                    <span
                      className="text-[10px] tracking-[0.14em] uppercase border px-2 py-0.5"
                      style={{
                        fontFamily: MONO,
                        color: 'rgba(255,58,14,0.7)',
                        borderColor: 'rgba(255,58,14,0.2)',
                        background: 'rgba(255,58,14,0.06)',
                      }}
                    >
                      {modulo.type}
                    </span>
                  </div>
                  <h2
                    className="text-xl font-semibold leading-snug mb-4 transition-colors group-hover:text-[#FF3A0E]"
                    style={{ fontFamily: DISPLAY }}
                  >
                    {modulo.title}
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    {modulo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] tracking-[0.12em] uppercase px-2 py-0.5 border"
                        style={{
                          fontFamily: MONO,
                          color: 'rgba(255,255,255,0.35)',
                          borderColor: 'rgba(255,255,255,0.08)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <footer className="mt-16 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <Link
            href="/academy"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110"
            style={{
              fontFamily: MONO,
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              background: ACCENT,
              color: '#050507',
            }}
          >
            Acessar Academy
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </footer>
      </div>
    </main>
  );
}
