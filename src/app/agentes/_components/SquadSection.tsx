'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AgentBelt, BELT_CARD_W, BELT_GAP } from './AgentBelt';
import { AgentCard } from './AgentCard';
import type { Agente, Squad } from '@/data/agentes';

const KV_DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' };
const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em' };

interface SquadSectionProps {
  squad: Squad;
  agentes: Agente[];
}

export function SquadSection({ squad, agentes }: SquadSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // vw atualiza no resize/orientação — evita congelar em 1280 (SSR default)
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const totalWidth = agentes.length * (BELT_CARD_W + BELT_GAP);

  // Belt entra pela direita (vw) e sai pela esquerda (-totalWidth)
  const beltX = useTransform(
    scrollYProgress,
    [0.08, 0.88],
    prefersReduced ? [0, 0] : [vw, -totalWidth],
  );

  const headerOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.22, 0.72, 0.92],
    [0, 1, 1, 0],
  );
  const headerY = useTransform(scrollYProgress, [0.05, 0.25], ['24px', '0px']);

  return (
    <section
      ref={sectionRef}
      id={`squad-${squad.id}`}
      className="relative"
    >
      {/* Vertical accent line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-[2px]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${squad.accent} 50%, transparent 100%)`,
          opacity: 0.4,
        }}
      />

      {/* ── MOBILE: grid estático, sem animações ── */}
      <div className="lg:hidden py-14 border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          {/* Header */}
          <div className="mb-6">
            <p
              className="mb-2 inline-flex items-center gap-2"
              style={{ ...MONO, color: squad.accent, textTransform: 'uppercase' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: squad.accent }} />
              {squad.label} Squad · {squad.count}
            </p>
            <h2 className="text-3xl text-white mb-2" style={{ ...KV_DISPLAY, lineHeight: 0.92 }}>
              {squad.title}
            </h2>
            <p className="text-xs text-white/60 leading-relaxed mb-3">{squad.description}</p>
            {squad.race && (
              <div className="pt-3 border-t border-white/[0.08]">
                <p className="text-xs font-medium mb-1" style={{ color: squad.accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  ◈ {squad.race}
                </p>
                <p className="text-white/45 text-xs leading-relaxed">{squad.raceDescription}</p>
              </div>
            )}
          </div>

          {/* Grid 2 colunas */}
          <div className="grid grid-cols-2 gap-2.5">
            {agentes.map((a) => (
              <AgentCard key={a.id} agente={a} squad={squad} />
            ))}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: sticky + belt scroll-driven ── */}
      <div className="hidden lg:block min-h-[150vh]">
        {/* pb-16 garante que o sticky não fique escondido atrás da sidenav */}
        <div className="sticky top-[8vh] pb-16">
          {/* Squad header */}
          <motion.div
            className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12 pt-16 pb-10"
            style={{ opacity: headerOpacity, y: prefersReduced ? 0 : headerY }}
          >
            <div className="flex items-end justify-between gap-6">
              <div>
                <p
                  className="mb-3 inline-flex items-center gap-2"
                  style={{ ...MONO, color: squad.accent, textTransform: 'uppercase' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: squad.accent, boxShadow: `0 0 8px ${squad.accent}` }}
                  />
                  {squad.label} Squad
                </p>
                <h2
                  className="text-4xl sm:text-5xl xl:text-6xl text-white"
                  style={{ ...KV_DISPLAY, lineHeight: 0.92 }}
                >
                  {squad.title}
                </h2>
              </div>
              <div className="max-w-sm text-right">
                <p className="text-sm sm:text-base text-white/65 leading-relaxed">{squad.description}</p>
                <p className="mt-2 text-white/35" style={MONO}>{squad.count} agentes</p>
              </div>
            </div>

            {squad.race && (
              <div className="mt-5 pt-5 border-t border-white/[0.08] flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span
                  className="text-sm font-medium"
                  style={{ color: squad.accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}
                >
                  ◈ {squad.race}
                </span>
                <span className="text-white/45 text-sm leading-relaxed">{squad.raceDescription}</span>
              </div>
            )}
          </motion.div>

          {/* Belt scroll-driven */}
          <AgentBelt agentes={agentes} squad={squad} x={beltX} opacity={headerOpacity} />
        </div>
      </div>
    </section>
  );
}
