import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type Modulo = {
  slug: string;
  number: number;
  title: string;
  type: string;
  date: string;
  tags: string[];
  href: string;
};

export const MODULOS_PRESENCIAIS: Modulo[] = [
  {
    slug: 'o-que-e-possivel',
    number: 1,
    title: 'O que é possível',
    type: 'Presencial',
    date: '15 de junho · Segunda-feira · 13h–18h',
    tags: ['Demos', 'Cases Reais', 'IA Agêntica'],
    href: '/mentoria/presencial/o-que-e-possivel',
  },
  {
    slug: 'fundamentos-claude-code',
    number: 2,
    title: 'Fundamentos do Claude Code',
    type: 'Presencial',
    date: '15 de junho · Segunda-feira · 13h–18h',
    tags: ['Claude Code', 'MCP', 'Agentes'],
    href: '/mentoria/presencial/fundamentos-claude-code',
  },
  {
    slug: 'centro-treinamento',
    number: 3,
    title: 'Centro de Treinamento de Agentes',
    type: 'Presencial',
    date: '15 de junho · Segunda-feira · 13h–18h',
    tags: ['Primeiro Agente', 'Personalização', 'CT'],
    href: '/mentoria/presencial/centro-treinamento',
  },
  {
    slug: 'setup-instalacao',
    number: 4,
    title: 'Setup e Instalação',
    type: 'Presencial',
    date: '15 de junho · Segunda-feira · 13h–18h',
    tags: ['Setup', 'Instalação', 'Ambiente'],
    href: '/mentoria/presencial/setup-instalacao',
  },
];

const MONO    = 'var(--font-mono)';
const SERIF   = 'var(--font-display-serif)';
const DISPLAY = 'var(--font-display)';
const ACCENT  = '#FF3A0E';

interface ModuloLayoutProps {
  slug: string;
  children: ReactNode;
  className?: string;
}

export function ModuloLayout({ slug, children, className }: ModuloLayoutProps) {
  const modulo = MODULOS_PRESENCIAIS.find((m) => m.slug === slug);
  if (!modulo) throw new Error(`Módulo não encontrado: ${slug}`);

  const idx   = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev  = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;
  const next  = idx < MODULOS_PRESENCIAIS.length - 1 ? MODULOS_PRESENCIAIS[idx + 1] : null;
  const total = MODULOS_PRESENCIAIS.length;

  return (
    <article className={cn('relative min-h-screen bg-[#050507] text-white', className)}>
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">

        {/* ── Top bar ── */}
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            href="/mentoria/presencial"
            className="text-[10px] tracking-[0.22em] uppercase text-white/40 transition-colors hover:text-[#FF3A0E]"
            style={{ fontFamily: MONO }}
          >
            ← Dia Presencial
          </Link>
          <div className="flex items-center gap-3">
            <span
              className="text-[10px] tracking-[0.16em] uppercase border px-2.5 py-1"
              style={{
                fontFamily: MONO,
                color: ACCENT,
                borderColor: 'rgba(255,58,14,0.3)',
                background: 'rgba(255,58,14,0.08)',
              }}
            >
              {modulo.type}
            </span>
          </div>
        </div>

        {/* ── Progress dots ── */}
        <div className="mb-10 flex items-center gap-2">
          {MODULOS_PRESENCIAIS.map((m) => {
            const isCurrent = m.slug === slug;
            const isDone    = m.number < modulo.number;
            return (
              <Link
                key={m.slug}
                href={m.href}
                title={`Módulo ${m.number} — ${m.title}`}
                className="flex-1 h-0.5 transition-all hover:opacity-80"
                style={{
                  background: isCurrent
                    ? ACCENT
                    : isDone
                    ? 'rgba(255,58,14,0.3)'
                    : 'rgba(255,255,255,0.1)',
                }}
              />
            );
          })}
          <span
            className="flex-shrink-0 text-[10px] tracking-[0.15em] ml-2"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
          >
            {modulo.number}/{total}
          </span>
        </div>

        {/* ── Header ── */}
        <header className="mb-12 border-b pb-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <span
            className="block text-[10px] tracking-[0.22em] uppercase mb-2"
            style={{ fontFamily: MONO, color: ACCENT }}
          >
            Módulo {String(modulo.number).padStart(2, '0')} de {String(total).padStart(2, '0')}
          </span>
          <p
            className="text-[10px] tracking-[0.16em] uppercase mb-4"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}
          >
            {modulo.date}
          </p>
          <h1
            className="text-4xl font-light leading-tight md:text-5xl"
            style={{ fontFamily: SERIF, letterSpacing: '-0.02em' }}
          >
            {modulo.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {modulo.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 border"
                style={{
                  fontFamily: MONO,
                  color: 'rgba(255,255,255,0.45)',
                  borderColor: 'rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* ── Content ── */}
        <div
          className="prose prose-invert prose-sm max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-white/70 prose-p:leading-relaxed
            prose-li:text-white/70
            prose-strong:text-white
            prose-hr:border-white/10"
          style={{ fontFamily: DISPLAY }}
        >
          {children}
        </div>

        {/* ── Nav ── */}
        <nav className="mt-16 border-t pt-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {prev ? (
              <Link href={prev.href} className="group flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  ← Anterior
                </span>
                <span
                  className="text-base text-white/60 transition-colors group-hover:text-[#FF3A0E]"
                  style={{ fontFamily: DISPLAY }}
                >
                  {String(prev.number).padStart(2, '0')} · {prev.title}
                </span>
              </Link>
            ) : (
              <Link href="/mentoria/presencial" className="group flex flex-col gap-1">
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  ← Início
                </span>
                <span className="text-base text-white/60 transition-colors group-hover:text-[#FF3A0E]" style={{ fontFamily: DISPLAY }}>
                  Índice do dia presencial
                </span>
              </Link>
            )}
            {next ? (
              <Link href={next.href} className="group flex flex-col gap-1 sm:items-end">
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  Próximo →
                </span>
                <span
                  className="text-base text-white/60 transition-colors group-hover:text-[#FF3A0E]"
                  style={{ fontFamily: DISPLAY }}
                >
                  {String(next.number).padStart(2, '0')} · {next.title}
                </span>
              </Link>
            ) : (
              <Link href="/academy" className="group flex flex-col gap-1 sm:items-end">
                <span className="text-[10px] tracking-[0.22em] uppercase text-white/35" style={{ fontFamily: MONO }}>
                  Finalizado →
                </span>
                <span className="text-base text-white/60 transition-colors group-hover:text-[#FF3A0E]" style={{ fontFamily: DISPLAY }}>
                  Acessar Academy
                </span>
              </Link>
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/mentoria/presencial"
              className="text-[10px] tracking-[0.22em] uppercase text-white/25 transition-colors hover:text-[#FF3A0E]"
              style={{ fontFamily: MONO }}
            >
              Voltar ao índice
            </Link>
          </div>
        </nav>
      </div>
    </article>
  );
}
