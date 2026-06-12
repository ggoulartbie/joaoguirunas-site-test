'use client';

import { useEffect, useState } from 'react';

const W = 800;
const H = 300;
const PAD = { top: 40, right: 60, bottom: 40, left: 16 };
const MONTHS_TOTAL = 36;
const MONO  = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const EMBER = '#FF5A1F';
const VOID  = '#050507';
const BONE  = '#f1f1f3';

function mx(mo: number) {
  return PAD.left + (mo / MONTHS_TOTAL) * (W - PAD.left - PAD.right);
}
function my(value: number, maxVal = 1000000) {
  return PAD.top + (1 - value / maxVal) * (H - PAD.top - PAD.bottom);
}

const PAST_POINTS = [
  { mo: 0,  v: 0 },
  { mo: 2,  v: 8000 },
  { mo: 5,  v: 28000 },
  { mo: 8,  v: 62000 },
  { mo: 11, v: 98000 },
  { mo: 14, v: 130000 },
  { mo: 17, v: 150000 },
];

const PROJ_POINTS = [
  { mo: 17, v: 150000 },
  { mo: 20, v: 280000 },
  { mo: 23, v: 500000 },
  { mo: 29, v: 700000 },
  { mo: 35, v: 900000 },
];

const MILESTONES: { mo: number; v: number; num: string; ctx: string; anchor: 'start' | 'middle' | 'end'; opacity: number }[] = [
  { mo: 17, v: 150000, num: '150k',    ctx: '· hoje',      anchor: 'start',  opacity: 1 },
  { mo: 23, v: 500000, num: '500k',    ctx: '· dez/2026',  anchor: 'middle', opacity: 0.65 },
  { mo: 35, v: 900000, num: 'R$ 6M',  ctx: '· meta 2027', anchor: 'end',    opacity: 0.42 },
];

const X_LABELS = [
  { mo: 0,  label: 'Jan/25' },
  { mo: 11, label: 'Dez/25' },
  { mo: 17, label: 'Jun/26' },
  { mo: 23, label: 'Dez/26' },
  { mo: 35, label: '2027' },
];

function toPath(pts: { mo: number; v: number }[]) {
  return pts.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${mx(p.mo).toFixed(1)} ${my(p.v).toFixed(1)}`
  ).join(' ');
}

export function GrowthLineChart() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const pastD = toPath(PAST_POINTS);
  const projD = toPath(PROJ_POINTS);

  return (
    <div>
      {/* Legenda */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginBottom: 16 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={28} height={4} aria-hidden="true">
            <line x1={0} y1={2} x2={28} y2={2} stroke={EMBER} strokeWidth={3} />
          </svg>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            Real
          </span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width={28} height={4} aria-hidden="true">
            <line x1={0} y1={2} x2={28} y2={2} stroke={EMBER} strokeWidth={2} strokeDasharray="5 3" strokeOpacity={0.55} />
          </svg>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
            Projeção · Meta 2027
          </span>
        </span>
      </div>

      {/* Gráfico SVG */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <style>{`
          .line-past-wk3 {
            stroke-dasharray: 2000;
            stroke-dashoffset: ${ready ? '0' : '2000'};
            transition: stroke-dashoffset 1.4s cubic-bezier(0.25, 1, 0.3, 1);
          }
          .line-proj-wk3 {
            stroke-dasharray: 2000;
            stroke-dashoffset: ${ready ? '0' : '2000'};
            transition: stroke-dashoffset 1.6s cubic-bezier(0.25, 1, 0.3, 1) 1.1s;
          }
        `}</style>

        {/* Grid horizontal */}
        {[0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PAD.left} x2={W - PAD.right}
            y1={my(t * 1000000)} y2={my(t * 1000000)}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
            strokeDasharray="2 8"
          />
        ))}

        {/* Divisória real/projeção (jun/2026) */}
        <line
          x1={mx(17)} x2={mx(17)}
          y1={PAD.top} y2={H - PAD.bottom}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="3 5"
        />

        {/* Linha passado — sólida, ember-glow */}
        <path
          d={pastD}
          fill="none"
          stroke={EMBER}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="line-past-wk3"
        />

        {/* Linha projeção — tracejada, ember 55% */}
        <path
          d={projD}
          fill="none"
          stroke={EMBER}
          strokeWidth={2.5}
          strokeOpacity={0.55}
          strokeDasharray="8 5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="line-proj-wk3"
        />

        {/* Marcos — número em Fraunces, contexto em Geist Mono */}
        {MILESTONES.map((m) => {
          const x = mx(m.mo);
          const y = my(m.v);
          return (
            <g key={m.num} opacity={m.opacity}>
              <circle cx={x} cy={y} r={5} fill={EMBER} stroke={VOID} strokeWidth={2} />
              <text
                x={x}
                y={y - 22}
                textAnchor={m.anchor}
                fill={BONE}
                fontSize={13}
                fontFamily={SERIF}
                fontWeight={600}
                letterSpacing="-0.01em"
              >
                {m.num}
              </text>
              <text
                x={x}
                y={y - 10}
                textAnchor={m.anchor}
                fill={BONE}
                fontSize={10}
                fontFamily={MONO}
                letterSpacing="0.08em"
              >
                {m.ctx}
              </text>
            </g>
          );
        })}

        {/* Labels eixo X */}
        {X_LABELS.map(({ mo, label }) => (
          <text
            key={label}
            x={mx(mo)}
            y={H - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.28)"
            fontSize={10}
            fontFamily={MONO}
            letterSpacing="0.06em"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}
