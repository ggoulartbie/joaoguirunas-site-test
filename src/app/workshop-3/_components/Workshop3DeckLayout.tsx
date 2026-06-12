'use client';

import Link from 'next/link';
import { useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { WORKSHOP_3_SLIDES, type DeckSlide } from './slides';
import { GrowthLogo } from './GrowthLogo';

export { WORKSHOP_3_SLIDES, type DeckSlide };

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const EMBER   = '#FF3A0E';

interface Workshop3DeckLayoutProps {
  slug: string;
  children: ReactNode;
  className?: string;
}

export function Workshop3DeckLayout({ slug, children, className }: Workshop3DeckLayoutProps) {
  const slide = WORKSHOP_3_SLIDES.find((s) => s.slug === slug);
  if (!slide) throw new Error(`Workshop-3 slide not found for slug: ${slug}`);

  const idx   = WORKSHOP_3_SLIDES.indexOf(slide);
  const prev  = idx > 0 ? WORKSHOP_3_SLIDES[idx - 1] ?? null : null;
  const next  = idx < WORKSHOP_3_SLIDES.length - 1 ? WORKSHOP_3_SLIDES[idx + 1] ?? null : null;
  const total = WORKSHOP_3_SLIDES.length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && next) {
        window.location.href = next.href;
      } else if (e.key === 'ArrowLeft' && prev) {
        window.location.href = prev.href;
      } else if (e.key === 'ArrowLeft' && !prev) {
        window.location.href = '/workshop-3';
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  return (
    <article className={cn('relative min-h-screen bg-[#050507] text-white overflow-hidden', className)}>
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 pt-8 pb-0 md:px-12 md:pt-10">
        <Link href="/workshop-3" className="opacity-60 hover:opacity-100 transition-opacity">
          <GrowthLogo size="sm" />
        </Link>

        <div className="flex items-center gap-6">
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            {slide.duration}
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
          >
            {String(slide.number).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="flex items-center gap-1 px-8 pt-5 md:px-12">
        {WORKSHOP_3_SLIDES.map((s) => {
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
                  ? EMBER
                  : isDone
                  ? 'rgba(255,58,14,0.3)'
                  : 'rgba(255,255,255,0.08)',
              }}
            />
          );
        })}
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-5xl px-8 py-12 md:px-12 md:py-16">
        {children}
      </div>

      {/* ── Nav ── */}
      <div className="mx-auto max-w-5xl px-8 pb-12 md:px-12 md:pb-16">
        <div
          className="flex items-stretch justify-between gap-4 border-t pt-8"
          style={{ borderColor: 'rgba(255,255,255,0.08)' }}
        >
          {prev ? (
            <Link
              href={prev.href}
              className="group flex flex-col gap-1.5 flex-1 max-w-xs"
            >
              <span
                className="font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
              >
                ← Anterior
              </span>
              <span
                className="text-lg font-semibold text-white/60 transition-colors group-hover:text-white leading-tight"
                style={{ fontFamily: DISPLAY }}
              >
                {String(prev.number).padStart(2, '0')} · {prev.title}
              </span>
            </Link>
          ) : (
            <Link href="/workshop-3" className="group flex flex-col gap-1.5 flex-1 max-w-xs">
              <span
                className="font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
              >
                ← Índice
              </span>
              <span
                className="text-lg font-semibold text-white/60 transition-colors group-hover:text-white leading-tight"
                style={{ fontFamily: DISPLAY }}
              >
                Workshop 3
              </span>
            </Link>
          )}

          <div className="hidden sm:flex items-center">
            <span
              className="font-mono text-[9px] tracking-[0.15em] uppercase"
              style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.18)' }}
            >
              ← →
            </span>
          </div>

          {next ? (
            <Link
              href={next.href}
              className="group flex flex-col gap-1.5 flex-1 max-w-xs items-end text-right"
            >
              <span
                className="font-mono text-[9px] tracking-[0.25em] uppercase"
                style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
              >
                Próximo →
              </span>
              <span
                className="text-lg font-semibold text-white/60 transition-colors group-hover:text-white leading-tight"
                style={{ fontFamily: DISPLAY }}
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
