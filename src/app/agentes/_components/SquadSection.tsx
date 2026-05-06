'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AgentBelt, BELT_CARD_W, BELT_GAP } from './AgentBelt';
import type { Agente, Squad } from '@/data/agentes';

const KV_DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' };
const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em' };

interface SquadSectionProps {
  squad: Squad;
  agentes: Agente[];
}

export function SquadSection({ squad, agentes }: SquadSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Belt: entra pela direita (além do viewport), sai pela esquerda (além do totalWidth)
  // Cards passam 1× — sem loop
  const totalWidth = agentes.length * (BELT_CARD_W + BELT_GAP);
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1280;

  const beltX = useTransform(
    scrollYProgress,
    [0.08, 0.88],
    [vw, -totalWidth],
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
      className="relative min-h-[150vh]"
    >
      {/* Vertical accent line */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-[2px]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${squad.accent} 50%, transparent 100%)`,
          opacity: 0.4,
        }}
      />

      {/* Sticky: header + belt */}
      <div className="sticky top-[8vh]">
        {/* Squad header */}
        <motion.div
          className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-12 pt-16 pb-10"
          style={{ opacity: headerOpacity, y: headerY }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
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

            <div className="max-w-sm sm:text-right">
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

        {/* Belt — scroll-driven, borda a borda */}
        <AgentBelt agentes={agentes} squad={squad} x={beltX} opacity={headerOpacity} />
      </div>
    </section>
  );
}
