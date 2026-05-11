'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  enter:  { opacity: 0, y: 32, filter: 'blur(6px)' },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -20, filter: 'blur(4px)' },
};

const slideTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

export function ModuloSlideshow({ slug, slides }: ModuloSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const modulo  = MODULOS_PRESENCIAIS.find((m) => m.slug === slug)!;
  const idx     = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev    = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;
  const next    = idx < MODULOS_PRESENCIAIS.length - 1 ? MODULOS_PRESENCIAIS[idx + 1] : null;
  const isFirst = current === 0;
  const isLast  = current === slides.length - 1;

  const goTo = useCallback((index: number) => setCurrent(index), []);
  const goNext = useCallback(() => { if (!isLast) goTo(current + 1); }, [current, isLast, goTo]);
  const goPrev = useCallback(() => { if (!isFirst) goTo(current - 1); }, [current, isFirst, goTo]);

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
        background: '#050507',
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* ── Subtle ambient glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 45% at 8% 55%, rgba(255,58,14,0.05) 0%, transparent 65%),' +
            'radial-gradient(ellipse 35% 55% at 92% 15%, rgba(255,255,255,0.02) 0%, transparent 55%)',
        }}
      />

      {/* ── Top bar ── */}
      <div
        className="relative flex items-center justify-between px-6 py-4 md:px-10 md:py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <Link
          href="/mentoria/modulos"
          className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]"
          style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Dia Presencial
        </Link>

        <div className="flex items-center gap-3">
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
            Módulo {String(modulo.number).padStart(2, '0')}
          </span>
          <span
            className="border px-2.5 py-1"
            style={{
              fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase',
              color: ACCENT, borderColor: 'rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.06)',
            }}
          >
            {modulo.type}
          </span>
        </div>
      </div>

      {/* ── Module progress bar ── */}
      <div className="relative flex gap-px flex-shrink-0">
        {MODULOS_PRESENCIAIS.map((m) => (
          <Link
            key={m.slug}
            href={m.href}
            title={`Módulo ${m.number} — ${m.title}`}
            className="flex-1 transition-opacity hover:opacity-70"
            style={{
              height: '2px',
              background: m.number < modulo.number
                ? 'rgba(255,58,14,0.5)'
                : m.slug === slug
                ? ACCENT
                : 'rgba(255,255,255,0.08)',
            }}
          />
        ))}
      </div>

      {/* ── Slide progress bar ── */}
      <div className="relative flex-shrink-0" style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}>
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'rgba(255,58,14,0.5)' }}
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
            className="absolute inset-0 flex items-center"
            style={{ padding: '2rem 2.5rem', paddingBottom: '3.5rem' }}
          >
            <div className="w-full max-w-5xl mx-auto">

              {/* ── Counter + label row ── */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="flex items-center gap-3 mb-10"
              >
                <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: ACCENT, letterSpacing: '-0.01em' }}>
                  {slideNumber}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px', fontFamily: MONO }}>
                  /
                </span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.02em' }}>
                  {slideTotal}
                </span>
                <span style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.12)', display: 'inline-block', marginLeft: '2px' }} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}
                >
                  {slide.label}
                </motion.span>
              </motion.div>

              {/* ── Title — full width, dominant ── */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: '-0.025em',
                  color: '#fff',
                  marginBottom: '2.5rem',
                  maxWidth: '44rem',
                }}
              >
                {slide.title}
              </motion.h1>

              {/* ── Accent line ── */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.22, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: '2.5rem', height: '2px', background: ACCENT, marginBottom: '2.5rem' }}
              />

              {/* ── Body + Note ── */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-20">
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.45 }}
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.62)',
                  }}
                >
                  {slide.body}
                </motion.p>

                {slide.note && (
                  <motion.div
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.38, duration: 0.45 }}
                    className="border-l pl-6 self-start"
                    style={{ borderColor: 'rgba(255,58,14,0.35)' }}
                  >
                    <p style={{
                      fontFamily: DISPLAY,
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: 1.7,
                      fontStyle: 'italic',
                    }}>
                      {slide.note}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="relative flex-shrink-0 flex items-center justify-between px-6 py-4 md:px-10 md:py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Slide dots */}
        <div className="flex items-center gap-1.5" role="region" aria-label="Navegação de slides">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className="transition-all rounded-full"
              style={{
                width: i === current ? '18px' : '5px',
                height: '5px',
                background: i === current ? ACCENT : 'rgba(255,255,255,0.18)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {/* Prev */}
          {!isFirst ? (
            <button
              onClick={goPrev}
              className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>
          ) : prev ? (
            <Link
              href={prev.href}
              className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Módulo {prev.number}
            </Link>
          ) : null}

          {/* Next */}
          {!isLast ? (
            <button
              onClick={goNext}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                background: ACCENT, color: '#050507', border: 'none', cursor: 'pointer', fontWeight: 700,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              Próximo
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ) : next ? (
            <Link
              href={next.href}
              className="flex items-center gap-3 px-5 py-2.5 transition-opacity hover:opacity-85"
              style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                background: ACCENT, color: '#050507', fontWeight: 700,
              }}
            >
              Módulo {next.number}
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <Link
              href="/mentoria#inscricao"
              className="flex items-center gap-3 px-5 py-2.5 transition-opacity hover:opacity-85"
              style={{
                fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
                background: ACCENT, color: '#050507', fontWeight: 700,
              }}
            >
              Garantir vaga
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* ── Keyboard hint ── */}
      <div
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.1)' }}
      >
        ← → para navegar
      </div>
    </div>
  );
}
