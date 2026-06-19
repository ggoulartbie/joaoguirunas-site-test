'use client';

import Link from 'next/link';
import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { WORKSHOP_CD_SLIDES, type DeckSlide } from './slides';

export { WORKSHOP_CD_SLIDES, type DeckSlide };

const VOID      = '#050507';
const BONE      = '#f1f1f3';
const BONE_MUTE = '#84848c';
const HAIRLINE  = 'rgba(255,255,255,0.07)';
const EMBER     = '#FF3A0E';

const MONO    = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY = "'Fraunces', 'Instrument Serif', Georgia, serif";

interface WorkshopClaudeDesignLayoutProps {
  slug: string;
  children: ReactNode;
  background?: ReactNode;
  className?: string;
}

export function WorkshopClaudeDesignLayout({ slug, children, background, className }: WorkshopClaudeDesignLayoutProps) {
  const router = useRouter();
  const slide = WORKSHOP_CD_SLIDES.find((s) => s.slug === slug);
  if (!slide) throw new Error(`Workshop-4 slide not found for slug: ${slug}`);

  const idx   = WORKSHOP_CD_SLIDES.indexOf(slide);
  const prev  = idx > 0 ? WORKSHOP_CD_SLIDES[idx - 1] ?? null : null;
  const next  = idx < WORKSHOP_CD_SLIDES.length - 1 ? WORKSHOP_CD_SLIDES[idx + 1] ?? null : null;
  const total = WORKSHOP_CD_SLIDES.length;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && next) {
        router.push(next.href);
      } else if (e.key === 'ArrowLeft' && prev) {
        router.push(prev.href);
      } else if (e.key === 'ArrowLeft' && !prev) {
        router.push('/workshop-4');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next, router]);

  return (
    <article
      className={`relative min-h-screen overflow-hidden${className ? ` ${className}` : ''}`}
      style={{ background: VOID, color: BONE }}
    >
      {background}

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-8 pt-8 pb-0 md:px-12 md:pt-10" style={{ position: 'relative', zIndex: 10 }}>
        <Link
          href="/workshop-4"
          className="transition-opacity hover:opacity-100"
          style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', opacity: 0.6, color: BONE }}
        >
          ← Workshop 4
        </Link>

        <div className="flex items-center gap-6">
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: EMBER }}>
            {slide.duration}
          </span>
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            {String(slide.number).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="flex items-center gap-1 px-8 pt-5 md:px-12" style={{ position: 'relative', zIndex: 10 }}>
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
                  ? EMBER
                  : isDone
                  ? 'rgba(255,58,14,0.35)'
                  : 'rgba(255,255,255,0.08)',
              }}
            />
          );
        })}
      </div>

      {/* ── Header ── */}
      <div
        className="mx-auto px-8 pt-10 pb-4 md:px-12"
        style={{ maxWidth: '64rem', position: 'relative', zIndex: 10 }}
      >
        <p style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: BONE_MUTE, marginBottom: '0.5rem' }}>
          Slide {String(slide.number).padStart(2, '0')} de {String(total).padStart(2, '0')}
        </p>
        <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 300, color: BONE, lineHeight: 1.15 }}>
          {slide.title}
        </h1>
      </div>

      {/* ── Main content ── */}
      <div
        className="mx-auto px-8 py-10 md:px-12 md:py-14"
        style={{ maxWidth: '64rem', position: 'relative', zIndex: 10 }}
      >
        {children}
      </div>

      {/* ── Nav ── */}
      <div
        className="mx-auto px-8 pb-12 md:px-12 md:pb-16"
        style={{ maxWidth: '64rem', position: 'relative', zIndex: 10 }}
      >
        <div
          className="flex items-stretch justify-between gap-4 border-t pt-8"
          style={{ borderColor: HAIRLINE }}
        >
          {prev ? (
            <Link href={prev.href} className="group flex flex-col gap-1.5 flex-1 max-w-xs">
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
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
            <Link href="/workshop-4" className="group flex flex-col gap-1.5 flex-1 max-w-xs">
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                ← Índice
              </span>
              <span
                className="text-lg font-semibold text-white/60 transition-colors group-hover:text-white leading-tight"
                style={{ fontFamily: DISPLAY }}
              >
                Workshop 4
              </span>
            </Link>
          )}

          <div className="hidden sm:flex items-center">
            <Link
              href="/workshop-4"
              style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}
              className="hover:opacity-60 transition-opacity"
            >
              Voltar ao índice
            </Link>
          </div>

          {next ? (
            <Link href={next.href} className="group flex flex-col gap-1.5 flex-1 max-w-xs items-end text-right">
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
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
