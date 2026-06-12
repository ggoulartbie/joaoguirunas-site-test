'use client';

import { useEffect, useRef, useState } from 'react';

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";

const X_DOMAIN: [Date, Date] = [new Date('2025-04-01'), new Date('2026-12-01')];
const Y_DOMAIN: [number, number] = [0, 600_000];
const X_RANGE: [number, number]  = [60, 660];
const Y_RANGE: [number, number]  = [280, 40];

function mx(date: Date) {
  const t = (date.getTime() - X_DOMAIN[0].getTime()) / (X_DOMAIN[1].getTime() - X_DOMAIN[0].getTime());
  return X_RANGE[0] + t * (X_RANGE[1] - X_RANGE[0]);
}
function my(value: number) {
  const t = (value - Y_DOMAIN[0]) / (Y_DOMAIN[1] - Y_DOMAIN[0]);
  return Y_RANGE[0] + t * (Y_RANGE[1] - Y_RANGE[0]);
}

// 15 meses reais: Abr/2025 → Jun/2026
const PAST = [
  { date: new Date('2025-04-01'), value: 0 },
  { date: new Date('2025-05-01'), value: 0 },
  { date: new Date('2025-06-01'), value: 0 },
  { date: new Date('2025-07-01'), value: 0 },
  { date: new Date('2025-08-01'), value: 10_000 },
  { date: new Date('2025-09-01'), value: 20_000 },
  { date: new Date('2025-10-01'), value: 25_000 },
  { date: new Date('2025-11-01'), value: 30_000 },
  { date: new Date('2025-12-01'), value: 40_000 },
  { date: new Date('2026-01-01'), value: 50_000 },
  { date: new Date('2026-02-01'), value: 70_000 },
  { date: new Date('2026-03-01'), value: 80_000 },
  { date: new Date('2026-04-01'), value: 100_000 },
  { date: new Date('2026-05-01'), value: 140_000 },
  { date: new Date('2026-06-01'), value: 180_000 },
];

// 6 meses projeção: Jul/2026 → Dez/2026 (+60k/mês)
const PROJ = [
  { date: new Date('2026-06-01'), value: 180_000 },
  { date: new Date('2026-07-01'), value: 240_000 },
  { date: new Date('2026-08-01'), value: 300_000 },
  { date: new Date('2026-09-01'), value: 360_000 },
  { date: new Date('2026-10-01'), value: 420_000 },
  { date: new Date('2026-11-01'), value: 480_000 },
  { date: new Date('2026-12-01'), value: 540_000 },
];

const MILESTONES = [
  { date: new Date('2025-04-01'), value: 0,       label: 'Início',  ctx: 'abr/2025 · 0',         anchor: 'start'  as const, opacity: 0.65 },
  { date: new Date('2026-06-01'), value: 180_000,  label: '180k',   ctx: 'jun/2026 · hoje',       anchor: 'middle' as const, opacity: 1    },
  { date: new Date('2026-12-01'), value: 540_000,  label: '540k',   ctx: 'dez/2026 · projeção',   anchor: 'end'    as const, opacity: 0.55 },
];

// Ticks a cada 3 meses
const X_LABELS = [
  { date: new Date('2025-04-01'), label: 'abr/25' },
  { date: new Date('2025-07-01'), label: 'jul/25' },
  { date: new Date('2025-10-01'), label: 'out/25' },
  { date: new Date('2026-01-01'), label: 'jan/26' },
  { date: new Date('2026-04-01'), label: 'abr/26' },
  { date: new Date('2026-07-01'), label: 'jul/26' },
  { date: new Date('2026-10-01'), label: 'out/26' },
  { date: new Date('2026-12-01'), label: 'dez/26' },
];

const Y_LABELS = [
  { value: 0,        label: '0' },
  { value: 100_000,  label: '100k' },
  { value: 200_000,  label: '200k' },
  { value: 300_000,  label: '300k' },
  { value: 400_000,  label: '400k' },
  { value: 500_000,  label: '500k' },
];

function toPath(pts: { date: Date; value: number }[]) {
  return pts.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${mx(p.date).toFixed(1)} ${my(p.value).toFixed(1)}`
  ).join(' ');
}

const pastD = toPath(PAST);
const projD = toPath(PROJ);
const dividerX = mx(new Date('2026-06-01'));

export function GrowthLineChart() {
  const pastRef = useRef<SVGPathElement>(null);
  const projRef = useRef<SVGPathElement>(null);
  const [ready, setReady] = useState(false);
  const [milestoneIn, setMilestoneIn] = useState([false, false, false]);

  useEffect(() => {
    const past = pastRef.current;
    const proj = projRef.current;
    if (!past || !proj) return;

    const pastLen = past.getTotalLength();
    const projLen = proj.getTotalLength();

    past.style.strokeDasharray = String(pastLen);
    past.style.strokeDashoffset = String(pastLen);
    proj.style.strokeDasharray = String(projLen);
    proj.style.strokeDashoffset = String(projLen);

    const raf = requestAnimationFrame(() => {
      setReady(true);
      setTimeout(() => setMilestoneIn([true, false, false]), 200);
      setTimeout(() => setMilestoneIn([true, true, false]), 900);
      setTimeout(() => setMilestoneIn([true, true, true]), 1900);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 720 320"
      width="100%"
      style={{ display: 'block', overflow: 'visible' }}
      aria-hidden="true"
    >
      {/* Y grid + labels */}
      {Y_LABELS.map(({ value, label }) => (
        <g key={value}>
          <line
            x1={X_RANGE[0]} x2={X_RANGE[1]}
            y1={my(value)} y2={my(value)}
            stroke="rgba(241,241,243,0.06)"
            strokeWidth={1}
            strokeDasharray="2 8"
          />
          <text
            x={X_RANGE[0] - 8} y={my(value) + 4}
            textAnchor="end"
            fill="rgba(241,241,243,0.35)"
            fontSize={9}
            fontFamily={MONO}
            letterSpacing="0.06em"
          >{label}</text>
        </g>
      ))}

      {/* Divider jun/26 — separa real/projeção */}
      <line
        x1={dividerX} x2={dividerX}
        y1={Y_RANGE[1] - 10} y2={Y_RANGE[0]}
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={1}
        strokeDasharray="3 5"
      />

      {/* Past line — sólido */}
      <path
        ref={pastRef}
        d={pastD}
        fill="none"
        stroke="#FF5A1F"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: ready ? 'stroke-dashoffset 1.4s cubic-bezier(0.25,1,0.3,1) 0.2s' : 'none',
          strokeDashoffset: ready ? 0 : undefined,
        }}
      />

      {/* Proj line — tracejado */}
      <path
        ref={projRef}
        d={projD}
        fill="none"
        stroke="#FF5A1F"
        strokeWidth={3}
        strokeOpacity={0.55}
        strokeDasharray="8 5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: ready ? 'stroke-dashoffset 1.0s cubic-bezier(0.25,1,0.3,1) 1.7s' : 'none',
          strokeDashoffset: ready ? 0 : undefined,
        }}
      />

      {/* Milestones */}
      {MILESTONES.map((m, i) => (
        <g
          key={m.label}
          style={{
            opacity: milestoneIn[i] ? m.opacity : 0,
            transform: milestoneIn[i] ? 'scale(1)' : 'scale(0.7)',
            transformOrigin: `${mx(m.date).toFixed(1)}px ${my(m.value).toFixed(1)}px`,
            transition: 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <circle
            cx={mx(m.date)} cy={my(m.value)}
            r={5}
            fill="#FF5A1F"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1.5}
          />
          <text
            x={mx(m.date)} y={my(m.value) - 18}
            textAnchor={m.anchor}
            fill="#f1f1f3"
            fontSize={14}
            fontFamily={SERIF}
            fontStyle="italic"
            fontWeight={300}
          >{m.label}</text>
          <text
            x={mx(m.date)} y={my(m.value) - 6}
            textAnchor={m.anchor}
            fill="rgba(241,241,243,0.45)"
            fontSize={9}
            fontFamily={MONO}
            letterSpacing="0.14em"
          >{m.ctx.toUpperCase()}</text>
        </g>
      ))}

      {/* X labels */}
      {X_LABELS.map(({ date, label }) => (
        <text
          key={label}
          x={mx(date)} y={Y_RANGE[0] + 18}
          textAnchor="middle"
          fill="rgba(241,241,243,0.35)"
          fontSize={9}
          fontFamily={MONO}
          letterSpacing="0.06em"
        >{label}</text>
      ))}

      {/* Legend — bottom right */}
      <g transform={`translate(${X_RANGE[1] - 8}, ${Y_RANGE[0] + 16})`}>
        <line x1={-126} y1={0} x2={-102} y2={0} stroke="#FF5A1F" strokeWidth={2.5} />
        <text x={-98} y={4} fill="rgba(241,241,243,0.4)" fontSize={9} fontFamily={MONO} letterSpacing="0.1em">REAL</text>
        <line x1={-66} y1={0} x2={-42} y2={0} stroke="#FF5A1F" strokeWidth={2} strokeOpacity={0.55} strokeDasharray="5 3" />
        <text x={-38} y={4} fill="rgba(241,241,243,0.4)" fontSize={9} fontFamily={MONO} letterSpacing="0.1em">PROJEÇÃO</text>
      </g>
    </svg>
  );
}
