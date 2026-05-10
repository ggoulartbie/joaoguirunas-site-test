'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { Modulo } from './ModuloLayout';
import { MODULOS_PRESENCIAIS } from './ModuloLayout';

export interface Slide {
  label: string;
  title: string;
  body: string;
  note?: string;
}

interface ModuloSlideshowProps {
  slug: string;
  slides: Slide[];
}

const ACCENT   = '#FF3A0E';
const MONO     = 'var(--font-mono)';
const SERIF    = 'var(--font-display-serif)';
const DISPLAY  = 'var(--font-display)';

const slideVariants = {
  enter:  { opacity: 0, y: 24, filter: 'blur(4px)' },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -24, filter: 'blur(4px)' },
};

const slideTransition = { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

export function ModuloSlideshow({ slug, slides }: ModuloSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const modulo  = MODULOS_PRESENCIAIS.find((m) => m.slug === slug)!;
  const idx     = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev    = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;
  const next    = idx < MODULOS_PRESENCIAIS.length - 1 ? MODULOS_PRESENCIAIS[idx + 1] : null;
  const isFirst = current === 0;
  const isLast  = current === slides.length - 1;

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  const goNext = useCallback(() => {
    if (!isLast) goTo(current + 1);
  }, [current, isLast, goTo]);

  const goPrev = useCallback(() => {
    if (!isFirst) goTo(current - 1);
  }, [current, isFirst, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  const slide = slides[current]!;
  const slideNumber = String(current + 1).padStart(2, '0');
  const slideTotal  = String(slides.length).padStart(2, '0');
  const progressPct = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 100;

  return (
    <div
      className="relative flex flex-col"
      style={{
        height: '100dvh',
        background:
          'radial-gradient(ellipse 60% 50% at 15% 50%, rgba(255,58,14,0.04) 0%, transparent 70%),' +
          'radial-gradient(ellipse 40% 60% at 85% 20%, rgba(255,255,255,0.02) 0%, transparent 60%),' +
          '#050507',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* ── Top bar ── */}
      <div
        className="flex items-center justify-between px-8 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link
          href="/mentoria/modulos"
          className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]"
          style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Dia Presencial
        </Link>

        <div className="flex items-center gap-4">
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
            Módulo {String(modulo.number).padStart(2, '0')}
          </span>
          <span
            className="border px-2.5 py-1"
            style={{
              fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: ACCENT, borderColor: 'rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.08)',
            }}
          >
            {modulo.type}
          </span>
        </div>
      </div>

      {/* ── Module progress bar — full-width, no lateral padding ── */}
      <div className="flex gap-1 flex-shrink-0">
        {MODULOS_PRESENCIAIS.map((m) => (
          <Link
            key={m.slug}
            href={m.href}
            title={`Módulo ${m.number} — ${m.title}`}
            className="flex-1 transition-colors"
            style={{
              height: '1px',
              background: m.number < modulo.number
                ? 'rgba(255,58,14,0.4)'
                : m.slug === slug
                ? ACCENT
                : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>

      {/* ── Slide progress bar — fills proportionally as slides advance ── */}
      <div className="flex-shrink-0" style={{ height: '2px', background: 'rgba(255,255,255,0.07)', position: 'relative' }}>
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: ACCENT }}
        />
      </div>

      {/* ── Slide content ── */}
      <div className="relative flex-1 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
            className="absolute inset-0 flex items-center px-8 md:px-16 lg:px-24"
            style={{ position: 'relative' }}
          >
            {/* Watermark slide number */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                right: '-2rem',
                bottom: '-3rem',
                fontSize: '22rem',
                fontWeight: 900,
                color: 'rgba(255,255,255,0.025)',
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: 1,
                fontFamily: DISPLAY,
              }}
            >
              {slideNumber}
            </span>

            <div className="w-full max-w-5xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>
              {/* Prominent slide counter */}
              <div className="mb-8 flex items-baseline gap-1" style={{ fontFamily: MONO }}>
                <span style={{ fontSize: '2rem', fontWeight: 700, color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1 }}>
                  {slideNumber}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
                  / {slideTotal}
                </span>
              </div>

              {/* Desktop: 2-column asymmetric grid; mobile: single column */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_3fr] md:gap-16">
                {/* Left column: label + title + accent-line */}
                <div>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      fontFamily: MONO, fontSize: '11px', letterSpacing: '0.22em',
                      textTransform: 'uppercase', color: ACCENT, marginBottom: '1.5rem',
                    }}
                  >
                    {slide.label}
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{
                      fontFamily: SERIF,
                      fontSize: 'clamp(3.2rem, 7vw, 6.5rem)',
                      fontWeight: 300,
                      lineHeight: 1.08,
                      letterSpacing: '-0.025em',
                      color: '#fff',
                      marginBottom: '2rem',
                    }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                    style={{ width: '3rem', height: '2px', background: ACCENT }}
                  />
                </div>

                {/* Right column: body + note */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                      lineHeight: 1.7,
                      color: 'rgba(255,255,255,0.62)',
                      maxWidth: '38rem',
                    }}
                  >
                    {slide.body}
                  </motion.p>

                  {slide.note && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35 }}
                      className="mt-8 border-l-2 pl-5"
                      style={{ borderColor: 'rgba(255,58,14,0.4)' }}
                    >
                      <p style={{ fontFamily: DISPLAY, fontSize: '0.9rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.6 }}>
                        {slide.note}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-8 py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Slide dots */}
        <div
          className="flex items-center gap-2"
          role="region"
          aria-label="Navegação de slides"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className="transition-all rounded-full"
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                background: i === current ? ACCENT : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {/* Prev slide or prev module */}
          {!isFirst ? (
            <button
              onClick={goPrev}
              className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
          ) : prev ? (
            <Link
              href={prev.href}
              className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Módulo {prev.number}
            </Link>
          ) : null}

          {/* Next slide or next module */}
          {!isLast ? (
            <button
              onClick={goNext}
              className="flex items-center gap-2 px-5 py-2.5"
              style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                background: ACCENT, color: '#050507', border: 'none', cursor: 'pointer', fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,58,14,0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
            >
              Próximo
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : next ? (
            <Link
              href={next.href}
              className="flex items-center gap-2 px-5 py-2.5 transition-all hover:brightness-110"
              style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                background: ACCENT, color: '#050507', fontWeight: 600,
              }}
            >
              Módulo {next.number}
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/mentoria#inscricao"
              className="flex items-center gap-2 px-5 py-2.5 transition-all hover:brightness-110"
              style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                background: ACCENT, color: '#050507', fontWeight: 600,
              }}
            >
              Garantir vaga
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* ── Keyboard hint ── */}
      <div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)' }}
      >
        ← → para navegar
      </div>
    </div>
  );
}
