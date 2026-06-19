'use client';

import Link from 'next/link';
import { useEffect, type ReactNode } from 'react';
import { WORKSHOP_CD_SLIDES, type DeckSlide } from './slides';

export { WORKSHOP_CD_SLIDES, type DeckSlide };

const BG      = '#0D0B12';
const SURFACE = '#161322';
const TEXT    = '#EDE9FF';
const MUTED   = '#8B84A7';
const ACCENT  = '#9B6DFF';
const WARM    = '#FF6B35';

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "'Fraunces', 'Space Grotesk', serif";

interface WorkshopClaudeDesignLayoutProps {
  slug: string;
  children: ReactNode;
}

export function WorkshopClaudeDesignLayout({ slug, children }: WorkshopClaudeDesignLayoutProps) {
  const slide = WORKSHOP_CD_SLIDES.find((s) => s.slug === slug);
  if (!slide) throw new Error(`Workshop Claude Design slide not found for slug: ${slug}`);

  const idx   = WORKSHOP_CD_SLIDES.indexOf(slide);
  const prev  = idx > 0 ? WORKSHOP_CD_SLIDES[idx - 1] ?? null : null;
  const next  = idx < WORKSHOP_CD_SLIDES.length - 1 ? WORKSHOP_CD_SLIDES[idx + 1] ?? null : null;
  const total = WORKSHOP_CD_SLIDES.length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && next) {
        window.location.href = next.href;
      } else if (e.key === 'ArrowLeft' && prev) {
        window.location.href = prev.href;
      } else if (e.key === 'ArrowLeft' && !prev) {
        window.location.href = '/workshop-claude-design';
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  return (
    <article
      className="relative min-h-screen overflow-hidden"
      style={{ background: BG, color: TEXT }}
    >
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 pt-8 pb-0 md:px-12 md:pt-10">
        <Link
          href="/workshop-claude-design"
          className="transition-opacity hover:opacity-100"
          style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6, color: TEXT }}
        >
          João Guirunas
        </Link>

        <div className="flex items-center gap-6">
          <span
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: ACCENT }}
          >
            {slide.duration}
          </span>
          <span
            style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: MUTED }}
          >
            {String(slide.number).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Progress dots ── */}
      <div className="flex items-center gap-1 px-8 pt-5 md:px-12">
        {WORKSHOP_CD_SLIDES.map((s) => {
          const isCurrent = s.slug === slug;
          const isDone    = s.number < slide.number;
          return (
            <Link
              key={s.slug}
              href={s.href}
              title={`${String(s.number).padStart(2, '0')} — ${s.title}`}
              className="flex-1 h-[3px] transition-all hover:opacity-80"
              style={{
                background: isCurrent
                  ? ACCENT
                  : isDone
                  ? 'rgba(155,109,255,0.35)'
                  : 'rgba(255,255,255,0.08)',
              }}
            />
          );
        })}
      </div>

      {/* ── Header ── */}
      <div
        className="mx-auto px-8 pt-10 pb-4 md:px-12"
        style={{ maxWidth: '56rem' }}
      >
        <p
          style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: MUTED, marginBottom: '0.5rem' }}
        >
          Slide {String(slide.number).padStart(2, '0')} de {String(total).padStart(2, '0')}
        </p>
        <h1
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 600,
            color: TEXT,
            lineHeight: 1.15,
          }}
        >
          {slide.title}
        </h1>
      </div>

      {/* ── Main content ── */}
      <div
        className="mx-auto px-8 py-10 md:px-12 md:py-14"
        style={{ maxWidth: '56rem', paddingInline: 'clamp(1.5rem, 5vw, 3rem)' }}
      >
        {children}
      </div>

      {/* ── Nav ── */}
      <div
        className="mx-auto px-8 pb-12 md:px-12 md:pb-16"
        style={{ maxWidth: '56rem' }}
      >
        <div
          className="flex items-stretch justify-between gap-4 border-t pt-8"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {prev ? (
            <Link href={prev.href} className="group flex flex-col gap-1.5 flex-1 max-w-xs">
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTED }}>
                ← Anterior
              </span>
              <span
                className="text-lg font-semibold leading-tight transition-colors group-hover:opacity-100"
                style={{ fontFamily: DISPLAY, color: 'rgba(237,233,255,0.6)' }}
              >
                {String(prev.number).padStart(2, '0')} · {prev.title}
              </span>
            </Link>
          ) : (
            <Link href="/workshop-claude-design" className="group flex flex-col gap-1.5 flex-1 max-w-xs">
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTED }}>
                ← Início
              </span>
              <span
                className="text-lg font-semibold leading-tight transition-colors group-hover:opacity-100"
                style={{ fontFamily: DISPLAY, color: 'rgba(237,233,255,0.6)' }}
              >
                Workshop Claude Design
              </span>
            </Link>
          )}

          <div className="hidden sm:flex items-center">
            <Link
              href="/workshop-claude-design"
              style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}
              className="hover:opacity-60 transition-opacity"
            >
              Voltar ao índice
            </Link>
          </div>

          {next ? (
            <Link href={next.href} className="group flex flex-col gap-1.5 flex-1 max-w-xs items-end text-right">
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: MUTED }}>
                Próximo →
              </span>
              <span
                className="text-lg font-semibold leading-tight transition-colors group-hover:opacity-100"
                style={{ fontFamily: DISPLAY, color: 'rgba(237,233,255,0.6)' }}
              >
                {String(next.number).padStart(2, '0')} · {next.title}
              </span>
            </Link>
          ) : (
            <div className="flex-1 max-w-xs" />
          )}
        </div>
      </div>
    </article>
  );
}
