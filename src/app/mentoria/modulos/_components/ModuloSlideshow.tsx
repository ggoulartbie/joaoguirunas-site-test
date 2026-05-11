'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MODULOS_PRESENCIAIS } from './ModuloLayout';

export interface SlideAgent {
  slug: string;
  codename: string;
  accent: string;
  title?: string;
}

export interface Slide {
  label: string;
  title: string;
  body: string;
  note?: string;
  /** Grid of agent mini-cards shown on the right column */
  agents?: SlideAgent[];
  /** When true + agents set, renders a full-width scrolling belt below the body */
  belt?: boolean;
  /** Client names rendered as accent pill list below body */
  clients?: string[];
  /** Metrics grid shown below body */
  stats?: { label: string; value: string }[];
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
  enter:  { opacity: 0, y: 28, filter: 'blur(6px)' },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -16, filter: 'blur(4px)' },
};

const slideTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ── Agent mini card ── */
function AgentMiniCard({ agent }: { agent: SlideAgent }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: 78,
        height: 104,
        border: `1px solid ${agent.accent}28`,
        background: `linear-gradient(160deg, ${agent.accent}14 0%, #050507 70%)`,
      }}
    >
      <Image
        src={`/agentes/${agent.slug}.png`}
        alt={agent.codename}
        fill
        className="object-cover object-top"
        sizes="78px"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '5px 6px' }}>
        <div style={{ height: 1, background: agent.accent, opacity: 0.55, marginBottom: 4 }} />
        <p style={{ fontFamily: MONO, fontSize: '7.5px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.75)', lineHeight: 1.2 }}>
          {agent.codename}
        </p>
        {agent.title && (
          <p style={{ fontFamily: MONO, fontSize: '6.5px', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.35)', lineHeight: 1.2, marginTop: 1 }}>
            {agent.title}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Scrolling agent belt ── */
function AgentBelt({ agents }: { agents: SlideAgent[] }) {
  const cardW = 78;
  const gap = 10;
  const totalW = agents.length * (cardW + gap);

  return (
    <div
      className="overflow-hidden w-full"
      style={{ WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)' }}
    >
      <motion.div
        className="flex items-end"
        style={{ gap, width: totalW * 2 }}
        animate={{ x: [0, -totalW] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {[...agents, ...agents].map((a, i) => (
          <AgentMiniCard key={`${a.slug}-${i}`} agent={a} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Agent grid ── */
function AgentGrid({ agents }: { agents: SlideAgent[] }) {
  const cols = agents.length <= 4 ? 2 : 3;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 78px)`,
        gap: 8,
        alignContent: 'start',
      }}
    >
      {agents.map((a) => (
        <AgentMiniCard key={a.slug} agent={a} />
      ))}
    </div>
  );
}

export function ModuloSlideshow({ slug, slides }: ModuloSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const modulo  = MODULOS_PRESENCIAIS.find((m) => m.slug === slug)!;
  const idx     = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev    = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;
  const next    = idx < MODULOS_PRESENCIAIS.length - 1 ? MODULOS_PRESENCIAIS[idx + 1] : null;
  const isFirst = current === 0;
  const isLast  = current === slides.length - 1;

  const goTo   = useCallback((i: number) => setCurrent(i), []);
  const goNext = useCallback(() => { if (!isLast)  goTo(current + 1); }, [current, isLast, goTo]);
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

  const hasBelt    = !!(slide.belt && slide.agents?.length);
  const hasGrid    = !!(slide.agents?.length && !slide.belt);
  const hasClients = !!(slide.clients?.length);
  const hasStats   = !!(slide.stats?.length);

  return (
    <div
      className="relative flex flex-col"
      style={{ height: '100dvh', background: '#050507', color: '#fff', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 45% at 8% 55%, rgba(255,58,14,0.04) 0%, transparent 65%),' +
            'radial-gradient(ellipse 35% 55% at 92% 15%, rgba(255,255,255,0.015) 0%, transparent 55%)',
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
            style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, borderColor: 'rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.06)' }}
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
              background: m.number < modulo.number ? 'rgba(255,58,14,0.5)' : m.slug === slug ? ACCENT : 'rgba(255,255,255,0.08)',
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
            style={{ padding: hasBelt ? '1.5rem 2.5rem 1rem' : '1.5rem 2.5rem', paddingBottom: hasBelt ? '1rem' : '2.5rem' }}
          >
            <div className="w-full max-w-5xl mx-auto flex flex-col h-full justify-center" style={{ gap: hasBelt ? '0' : undefined, overflowY: 'auto', maxHeight: '100%' }}>

              {/* Counter + label */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-3 mb-5"
              >
                <span style={{ fontFamily: MONO, fontSize: '11px', fontWeight: 700, color: ACCENT }}>
                  {slideNumber}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontFamily: MONO, fontSize: '10px' }}>/</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>
                  {slideTotal}
                </span>
                <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', display: 'inline-block', margin: '0 2px' }} />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.12 }}
                  style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}
                >
                  {slide.label}
                </motion.span>
              </motion.div>

              {/* Main content row: text + optional agent grid */}
              <div className={hasGrid ? 'flex gap-12 lg:gap-20 items-start' : 'flex flex-col'}>

                {/* Left: title + accent + body + note */}
                <div className="flex-1 min-w-0">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: SERIF,
                      fontSize: hasBelt
                        ? 'clamp(2rem, 4.5vw, 4rem)'
                        : hasGrid
                        ? 'clamp(2rem, 4vw, 3.8rem)'
                        : 'clamp(2.4rem, 5.5vw, 5.2rem)',
                      fontWeight: 300,
                      lineHeight: 1.1,
                      letterSpacing: '-0.025em',
                      color: '#fff',
                      marginBottom: '1.25rem',
                      maxWidth: hasGrid ? '34rem' : '44rem',
                    }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.22, duration: 0.45 }}
                    style={{ width: '2.5rem', height: '2px', background: ACCENT, marginBottom: '1.25rem' }}
                  />

                  {!hasGrid ? (
                    <div className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-20">
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.28 }}
                          style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)' }}
                        >
                          {slide.body}
                        </motion.p>
                        {slide.note && !hasClients && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.38 }}
                            className="border-l pl-6 self-start"
                            style={{ borderColor: 'rgba(255,58,14,0.35)' }}
                          >
                            <p style={{ fontFamily: DISPLAY, fontSize: '0.88rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.7, fontStyle: 'italic' }}>
                              {slide.note}
                            </p>
                          </motion.div>
                        )}
                      </div>
                      {hasClients && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex flex-wrap gap-2"
                        >
                          {slide.clients!.map((c) => (
                            <span
                              key={c}
                              style={{
                                fontFamily: MONO,
                                fontSize: '10px',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.55)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                padding: '4px 10px',
                                background: 'rgba(255,255,255,0.03)',
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </motion.div>
                      )}
                      {hasStats && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex gap-8 flex-wrap"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.25rem' }}
                        >
                          {slide.stats!.map((s) => (
                            <div key={s.label}>
                              <p style={{ fontFamily: MONO, fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '4px' }}>
                                {s.label}
                              </p>
                              <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 300, color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1 }}>
                                {s.value}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 }}
                      style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.6)', maxWidth: '30rem' }}
                    >
                      {slide.body}
                      {slide.note && (
                        <span style={{ display: 'block', marginTop: '1rem', paddingLeft: '1rem', borderLeft: '2px solid rgba(255,58,14,0.35)', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', fontSize: '0.85em' }}>
                          {slide.note}
                        </span>
                      )}
                    </motion.p>
                  )}
                </div>

                {/* Right: agent grid */}
                {hasGrid && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32, duration: 0.5 }}
                    className="flex-shrink-0"
                  >
                    <AgentGrid agents={slide.agents!} />
                  </motion.div>
                )}
              </div>

              {/* Agent belt below — for intro slides */}
              {hasBelt && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-8"
                >
                  <AgentBelt agents={slide.agents!} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="relative flex-shrink-0 flex items-center justify-between px-6 py-4 md:px-10 md:py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
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
                border: 'none', cursor: 'pointer', padding: 0,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
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

          {!isLast ? (
            <button
              onClick={goNext}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', border: 'none', cursor: 'pointer', fontWeight: 700 }}
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
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 700 }}
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
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 700 }}
            >
              Garantir vaga
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Keyboard hint */}
      <div
        className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.1)' }}
      >
        ← → para navegar
      </div>
    </div>
  );
}
