'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { AgentCardCompact } from '@/app/agentes/_components/AgentCard';
import type { Agente, Squad } from '@/data/agentes';

interface Props {
  squads: Squad[];
  agentes: Agente[];
}

const SQUAD_SCROLL_VH = 120;
// Fraction of a squad's scroll window used for enter/exit easing
const EASE_FRAC = 0.26;

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
  lineHeight: 0.92,
};
const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.14em',
};

function SquadSlide({
  squad,
  squadAgentes,
  scrollYProgress,
  index,
  total,
  containerW,
}: {
  squad: Squad;
  squadAgentes: Agente[];
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  containerW: number;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const inEnd = start + step * EASE_FRAC;
  const outStart = end - step * EASE_FRAC;

  // Squad 0 is already visible at scroll=0; others enter from right.
  const isFirst = index === 0;
  const agentEnterX = `${containerW * 0.75}px`;
  const agentExitX = `${-containerW * 0.75}px`;

  const agentX = useTransform(
    scrollYProgress,
    isFirst
      ? [0,        0.001,   outStart,   end      ]
      : [start,    inEnd,   outStart,   end      ],
    isFirst
      ? ['0px',    '0px',   '0px',      agentExitX]
      : [agentEnterX, '0px', '0px',    agentExitX],
  );

  const agentOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0,       0.001,  outStart, end  ]
      : [start,   inEnd,  outStart, end  ],
    isFirst
      ? [1,       1,      1,        0    ]
      : [0,       1,      1,        0    ],
  );

  const headerOpacity = useTransform(
    scrollYProgress,
    isFirst
      ? [0,       0.001,  outStart, end  ]
      : [start,   inEnd,  outStart, end  ],
    isFirst
      ? [1,       1,      1,        0    ]
      : [0,       1,      1,        0    ],
  );

  const headerY = useTransform(
    scrollYProgress,
    isFirst ? [0, 0.001] : [start, inEnd],
    ['0px', '0px'],
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center mx-auto max-w-7xl w-full px-5 sm:px-6 lg:px-12"
      style={{ opacity: headerOpacity }}
    >
      {/* Header — fades with section opacity */}
      <motion.div
        className="flex items-end justify-between gap-6 mb-8"
        style={{ y: headerY }}
      >
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
          <h2 className="text-5xl xl:text-6xl text-white" style={KV_DISPLAY}>
            {squad.title}
          </h2>
        </div>
        <div className="max-w-sm text-right">
          <p className="text-sm text-white/65 leading-relaxed">{squad.description}</p>
          <p className="mt-2 text-white/35" style={MONO}>{squad.count} agentes</p>
        </div>
      </motion.div>

      {/* Agents — 6 per row, slide laterally independent from header */}
      <motion.div
        style={{
          x: agentX,
          opacity: agentOpacity,
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: '12px',
        }}
      >
        {squadAgentes.map((a) => (
          <AgentCardCompact key={a.id} agente={a} squad={squad} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function CursoSquadsSticky({ squads, agentes }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [containerW, setContainerW] = useState(1280);
  const n = squads.length;

  useEffect(() => {
    const update = () => {
      if (stickyRef.current) setContainerW(stickyRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActiveIdx(Math.min(n - 1, Math.floor(v * n)));
  });

  const activeSquad = squads[activeIdx] ?? squads[0]!;

  return (
    <div ref={wrapperRef} style={{ height: `${n * SQUAD_SCROLL_VH}vh` }}>

      {/* ── MOBILE: stacked static ── */}
      <div className="lg:hidden">
        {squads.map((squad) => {
          const sq = agentes.filter((a) => a.squad === squad.id);
          return (
            <div key={squad.id} className="py-14 border-b border-white/[0.06]">
              <div className="mx-auto max-w-7xl px-5 sm:px-6">
                <p className="mb-2 inline-flex items-center gap-2" style={{ ...MONO, color: squad.accent, textTransform: 'uppercase' }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: squad.accent }} />
                  {squad.label} Squad · {squad.count}
                </p>
                <h2 className="text-3xl text-white mb-2" style={KV_DISPLAY}>{squad.title}</h2>
                <p className="text-xs text-white/60 leading-relaxed mb-6">{squad.description}</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {sq.map((a) => <AgentCardCompact key={a.id} agente={a} squad={squad} />)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── DESKTOP: sticky ── */}
      <div ref={stickyRef} className="hidden lg:block sticky top-0 h-screen overflow-hidden">

        {/* Background glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ background: `radial-gradient(ellipse at 65% 50%, ${activeSquad.accent}16 0%, transparent 65%)` }}
          transition={{ duration: 0.6 }}
        />

        {/* Accent line */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-[2px] pointer-events-none"
          animate={{ background: `linear-gradient(to bottom, transparent, ${activeSquad.accent}55, transparent)` }}
          transition={{ duration: 0.4 }}
        />

        {/* All squads — each self-drives from scrollYProgress */}
        <div className="relative z-10 h-full">
          {squads.map((squad, i) => (
            <SquadSlide
              key={squad.id}
              squad={squad}
              squadAgentes={agentes.filter((a) => a.squad === squad.id)}
              scrollYProgress={scrollYProgress}
              index={i}
              total={n}
              containerW={containerW}
            />
          ))}
        </div>

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5 z-20">
          {squads.map((s, i) => (
            <div
              key={s.id}
              className="rounded-full transition-all duration-300"
              style={{
                width: 6,
                height: i === activeIdx ? 28 : 6,
                background: i === activeIdx ? s.accent : 'rgba(255,255,255,0.18)',
                boxShadow: i === activeIdx ? `0 0 8px ${s.accent}` : 'none',
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ ...MONO, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}
        >
          {String(activeIdx + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
}
