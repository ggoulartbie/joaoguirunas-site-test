'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AgentCard } from './AgentCard';
import type { Agente, Squad } from '@/data/agentes';

const KV_DISPLAY: React.CSSProperties = { fontFamily: 'var(--font-display-serif)', fontWeight: 400, letterSpacing: '-0.03em' };
const MONO: React.CSSProperties = { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.14em' };

interface SquadSectionProps {
  squad: Squad;
  agentes: Agente[];
}

/**
 * Each squad section is ~150vh tall so the scroll-driven content has room to:
 *   0.00 - 0.20  enter (cards slide in from right)
 *   0.20 - 0.70  stay centered (planet visible behind, cards present)
 *   0.70 - 1.00  exit (cards slide out to left, next planet entering)
 */
export function SquadSection({ squad, agentes }: SquadSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Cards: enter from x=80% at 0.05, settle at 0.30, hold until 0.65, exit to x=-60% at 0.90
  const cardsX = useTransform(scrollYProgress, [0.05, 0.30, 0.65, 0.90], ['80%', '0%', '0%', '-60%']);
  const cardsOpacity = useTransform(scrollYProgress, [0.05, 0.20, 0.70, 0.92], [0, 1, 1, 0]);
  const headerY = useTransform(scrollYProgress, [0.10, 0.32], ['40px', '0px']);
  const headerOpacity = useTransform(scrollYProgress, [0.08, 0.30, 0.68, 0.90], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id={`squad-${squad.id}`}
      className="relative min-h-[150vh] py-32 overflow-hidden"
    >
      {/* Vertical accent line + ambient glow on the left edge — does NOT cover the planet */}
      <div
        className="pointer-events-none absolute top-0 bottom-0 left-0 w-[2px]"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${squad.accent} 50%, transparent 100%)`,
          opacity: 0.4,
        }}
      />

      <div className="sticky top-[12vh] mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        {/* On desktop: cards live in the right half so the planet is visible on the left */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(640px,720px)] gap-10 items-start">
          {/* LEFT — squad label hovering near the planet (desktop only) */}
          <motion.div
            className="hidden lg:flex flex-col justify-center min-h-[60vh]"
            style={{ y: headerY, opacity: headerOpacity }}
          >
            <p
              className="mb-3 inline-flex items-center gap-2"
              style={{ ...MONO, color: squad.accent, textTransform: 'uppercase' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: squad.accent, boxShadow: `0 0 8px ${squad.accent}` }} />
              <span>{squad.label} Squad</span>
            </p>
            <h2 className="text-5xl xl:text-7xl text-white mb-3" style={{ ...KV_DISPLAY, lineHeight: 0.92 }}>
              {squad.title}
            </h2>
            <div className="w-12 h-px mb-4" style={{ background: squad.accent }} />
            <p className="text-base xl:text-lg text-white/70 leading-relaxed max-w-md">{squad.description}</p>
            <p className="mt-6 text-white/40 text-sm" style={MONO}>
              {squad.count} agentes
            </p>

            {squad.race && (
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <p className="text-sm font-medium mb-2" style={{ color: squad.accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  ◈ {squad.race}
                </p>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                  {squad.raceDescription}
                </p>
              </div>
            )}
          </motion.div>

          {/* RIGHT — cards. Animate X (slide in from right, exit to left) + opacity */}
          <motion.div
            style={{ x: cardsX, opacity: cardsOpacity }}
            className="will-change-transform"
          >
            {/* Mobile-only header (centered) */}
            <div className="lg:hidden mb-8">
              <p className="mb-3 inline-flex items-center gap-2" style={{ ...MONO, color: squad.accent, textTransform: 'uppercase' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: squad.accent }} />
                {squad.label} Squad · {squad.count}
              </p>
              <h2 className="text-4xl text-white mb-3" style={{ ...KV_DISPLAY, lineHeight: 0.92 }}>
                {squad.title}
              </h2>
              <p className="text-sm text-white/70 mb-4">{squad.description}</p>

              {squad.race && (
                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="text-xs font-medium mb-2" style={{ color: squad.accent, fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                    ◈ {squad.race}
                  </p>
                  <p className="text-white/50 text-xs leading-relaxed">{squad.raceDescription}</p>
                </div>
              )}
            </div>

            {/* Cards grid — wider gaps, no bg, transparent background lets planet show through */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agentes.map((a) => (
                <AgentCard key={a.id} agente={a} squad={squad} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
