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
  agents?: SlideAgent[];
  belt?: boolean;
  clients?: string[];
  stats?: { label: string; value: string }[];
  screenshot?: string;
}

interface ModuloSlideshowProps {
  slug: string;
  slides: Slide[];
}

const ACCENT  = '#FF3A0E';
const MONO    = 'var(--font-mono)';
const SERIF   = 'var(--font-display-serif)';
const DISPLAY = 'var(--font-display)';

const slideVariants = {
  enter:  { opacity: 0, y: 32, filter: 'blur(8px)' },
  center: { opacity: 1, y: 0,  filter: 'blur(0px)' },
  exit:   { opacity: 0, y: -20, filter: 'blur(4px)' },
};
const slideTx = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

/* ── Agent mini card — 110×147 ── */
function AgentCard({ agent, delay = 0 }: { agent: SlideAgent; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="relative overflow-hidden flex-shrink-0"
      style={{
        width: 110,
        height: 147,
        border: `1px solid ${agent.accent}30`,
        background: `linear-gradient(160deg, ${agent.accent}18 0%, #050507 65%)`,
      }}
    >
      <Image src={`/agentes/${agent.slug}.png`} alt={agent.codename} fill className="object-cover object-top" sizes="110px" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px' }}>
        <div style={{ height: 1, background: agent.accent, opacity: 0.6, marginBottom: 5 }} />
        <p style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.8)', lineHeight: 1.3 }}>
          {agent.codename}
        </p>
        {agent.title && (
          <p style={{ fontFamily: MONO, fontSize: '7px', letterSpacing: '0.04em', color: 'rgba(255,255,255,0.38)', lineHeight: 1.2, marginTop: 2 }}>
            {agent.title}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Belt ── */
function AgentBelt({ agents }: { agents: SlideAgent[] }) {
  const cardW = 110;
  const gap   = 10;
  const totalW = agents.length * (cardW + gap);
  return (
    <div className="overflow-hidden w-full" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}>
      <motion.div
        className="flex items-end"
        style={{ gap, width: totalW * 2 }}
        animate={{ x: [0, -totalW] }}
        transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
      >
        {[...agents, ...agents].map((a, i) => (
          <div key={`${a.slug}-${i}`} className="flex-shrink-0">
            <AgentCard agent={a} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Agent grid ── */
function AgentGrid({ agents }: { agents: SlideAgent[] }) {
  const cols = agents.length <= 4 ? 2 : 3;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 110px)`, gap: 8, alignContent: 'start' }}>
      {agents.map((a, i) => <AgentCard key={a.slug} agent={a} delay={0.3 + i * 0.06} />)}
    </div>
  );
}

/* ── Screenshot frame ── */
function ScreenshotFrame({ src }: { src: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 overflow-hidden"
      style={{
        width: '100%',
        maxWidth: 520,
        border: '1px solid rgba(255,255,255,0.1)',
        background: '#080810',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Browser chrome */}
      <div style={{ padding: '7px 10px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,100,80,0.5)' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,200,50,0.35)' }} />
        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(80,200,80,0.35)' }} />
      </div>
      <div style={{ position: 'relative', aspectRatio: '16/10' }}>
        <Image src={src} alt="screenshot" fill className="object-cover object-top" sizes="520px" />
      </div>
    </motion.div>
  );
}

export function ModuloSlideshow({ slug, slides }: ModuloSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const modulo = MODULOS_PRESENCIAIS.find((m) => m.slug === slug)!;
  const idx    = MODULOS_PRESENCIAIS.indexOf(modulo);
  const prev   = idx > 0 ? MODULOS_PRESENCIAIS[idx - 1] : null;
  const next   = idx < MODULOS_PRESENCIAIS.length - 1 ? MODULOS_PRESENCIAIS[idx + 1] : null;
  const isFirst = current === 0;
  const isLast  = current === slides.length - 1;

  const goTo   = useCallback((i: number) => setCurrent(i), []);
  const goNext = useCallback(() => { if (!isLast)  goTo(current + 1); }, [current, isLast, goTo]);
  const goPrev = useCallback(() => { if (!isFirst) goTo(current - 1); }, [current, isFirst, goTo]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  const slide = slides[current]!;
  const num   = String(current + 1).padStart(2, '0');
  const total = String(slides.length).padStart(2, '0');
  const pct   = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 100;

  const hasBelt       = !!(slide.belt && slide.agents?.length);
  const hasGrid       = !!(slide.agents?.length && !slide.belt);
  const hasScreenshot = !!slide.screenshot;
  const hasRight      = hasGrid || hasScreenshot;

  return (
    <div className="relative flex flex-col" style={{ height: '100dvh', background: '#050507', color: '#fff', overflow: 'hidden' }}>

      {/* Glow */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 55% 50% at 5% 60%, rgba(255,58,14,0.05) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 90% 10%, rgba(255,255,255,0.018) 0%, transparent 55%)' }} />

      {/* Top bar */}
      <div className="relative flex items-center justify-between px-8 py-4 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/mentoria/modulos" className="flex items-center gap-2 transition-colors hover:text-[#FF3A0E]" style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Dia Presencial
        </Link>
        <div className="flex items-center gap-3">
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>Módulo {String(modulo.number).padStart(2, '0')}</span>
          <span className="border px-2.5 py-0.5" style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: ACCENT, borderColor: 'rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.06)' }}>{modulo.type}</span>
        </div>
      </div>

      {/* Module progress */}
      <div className="flex gap-px flex-shrink-0">
        {MODULOS_PRESENCIAIS.map((m) => (
          <Link key={m.slug} href={m.href} title={`Módulo ${m.number} — ${m.title}`} className="flex-1 transition-opacity hover:opacity-60"
            style={{ height: 2, background: m.number < modulo.number ? 'rgba(255,58,14,0.5)' : m.slug === slug ? ACCENT : 'rgba(255,255,255,0.08)' }} />
        ))}
      </div>

      {/* Slide progress */}
      <div className="flex-shrink-0" style={{ height: 1, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
        <motion.div animate={{ width: `${pct}%` }} transition={{ duration: 0.4 }} style={{ position: 'absolute', inset: 0, width: 0, background: 'rgba(255,58,14,0.55)' }} />
      </div>

      {/* Slide content */}
      <div className="relative flex-1 flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={slideTx}
            className="absolute inset-0 flex items-center overflow-y-auto"
            style={{ padding: hasBelt ? '1.5rem 2.5rem 1rem' : '1.5rem 2.5rem 2rem' }}
          >
            <div className="w-full max-w-6xl mx-auto">

              {/* Counter + label */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="flex items-center gap-3 mb-6">
                <span style={{ fontFamily: MONO, fontSize: '12px', fontWeight: 700, color: ACCENT }}>{num}</span>
                <span style={{ fontFamily: MONO, fontSize: '10px', color: 'rgba(255,255,255,0.15)' }}>/</span>
                <span style={{ fontFamily: MONO, fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>{total}</span>
                <span style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.12)', margin: '0 4px' }} />
                <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: ACCENT }}>{slide.label}</span>
              </motion.div>

              {/* Main layout: left text + right visual */}
              <div className={hasRight ? 'flex gap-10 xl:gap-16 items-start' : 'flex flex-col'}>

                {/* Left */}
                <div className="flex-1 min-w-0">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: SERIF,
                      fontSize: hasRight ? 'clamp(1.8rem, 3.5vw, 3.4rem)' : hasBelt ? 'clamp(2rem, 4vw, 3.8rem)' : 'clamp(2.2rem, 5vw, 5rem)',
                      fontWeight: 300, lineHeight: 1.1, letterSpacing: '-0.025em', color: '#fff', marginBottom: '1.25rem',
                    }}
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2, duration: 0.45 }}
                    style={{ width: '2rem', height: 2, background: ACCENT, marginBottom: '1.25rem' }} />

                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    style={{ fontFamily: DISPLAY, fontSize: 'clamp(0.88rem, 1.4vw, 1.05rem)', lineHeight: 1.8, color: 'rgba(255,255,255,0.62)', maxWidth: hasRight ? '34rem' : '42rem' }}>
                    {slide.body}
                  </motion.p>

                  {/* Note */}
                  {slide.note && !hasScreenshot && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
                      className="mt-5 border-l pl-5" style={{ borderColor: 'rgba(255,58,14,0.35)' }}>
                      <p style={{ fontFamily: DISPLAY, fontSize: '0.875rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontStyle: 'italic' }}>{slide.note}</p>
                    </motion.div>
                  )}

                  {/* Clients */}
                  {slide.clients?.length && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} className="mt-5 flex flex-wrap gap-2">
                      {slide.note && (
                        <p style={{ width: '100%', fontFamily: MONO, fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 4 }}>
                          {slide.note}
                        </p>
                      )}
                      {slide.clients.map((c) => (
                        <span key={c} style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)', padding: '4px 12px', background: 'rgba(255,255,255,0.03)' }}>{c}</span>
                      ))}
                    </motion.div>
                  )}

                  {/* Stats */}
                  {slide.stats?.length && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}
                      className="mt-6 flex gap-8 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.25rem' }}>
                      {slide.stats.map((s) => (
                        <div key={s.label}>
                          <p style={{ fontFamily: MONO, fontSize: '8.5px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: 4 }}>{s.label}</p>
                          <p style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 300, color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Right: screenshot */}
                {hasScreenshot && (
                  <div className="flex-shrink-0 w-[45%] min-w-[300px] max-w-[560px]">
                    <ScreenshotFrame src={slide.screenshot!} />
                  </div>
                )}

                {/* Right: agent grid */}
                {hasGrid && (
                  <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-shrink-0">
                    <AgentGrid agents={slide.agents!} />
                  </motion.div>
                )}
              </div>

              {/* Belt */}
              {hasBelt && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="mt-8">
                  <AgentBelt agents={slide.agents!} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="relative flex-shrink-0 flex items-center justify-between px-8 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
              style={{ width: i === current ? 18 : 5, height: 5, background: i === current ? ACCENT : 'rgba(255,255,255,0.18)', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 9999, transition: 'all 0.2s' }} />
          ))}
        </div>
        <div className="flex items-center gap-3">
          {!isFirst ? (
            <button onClick={goPrev} className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Anterior
            </button>
          ) : prev ? (
            <Link href={prev.href} className="flex items-center gap-2 transition-colors hover:text-white"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              Módulo {prev.number}
            </Link>
          ) : null}

          {!isLast ? (
            <button onClick={goNext} className="flex items-center gap-3 px-5 py-2.5"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', border: 'none', cursor: 'pointer', fontWeight: 700 }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}>
              Próximo
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          ) : next ? (
            <Link href={next.href} className="flex items-center gap-3 px-5 py-2.5 transition-opacity hover:opacity-85"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 700 }}>
              Módulo {next.number}
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          ) : (
            <Link href="/mentoria#inscricao" className="flex items-center gap-3 px-5 py-2.5 transition-opacity hover:opacity-85"
              style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', background: ACCENT, color: '#050507', fontWeight: 700 }}>
              Garantir vaga
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </Link>
          )}
        </div>
      </div>

      <div className="absolute bottom-[4.2rem] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.1)' }}>
        ← → para navegar
      </div>
    </div>
  );
}
