import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: '06 — Mentoria | Workshop 4',
  robots: { index: false },
};

const MONO       = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY    = "'Fraunces', 'Instrument Serif', Georgia, serif";
const EMBER      = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';
const INK        = '#0e0e11';
const BONE       = '#f1f1f3';
const BONE_DIM   = '#c5c5ca';
const BONE_MUTE  = '#84848c';
const HAIRLINE   = 'rgba(255,255,255,0.07)';

const MODULOS = [
  { label: 'M0',  title: 'Abertura',         sub: 'Desbloqueio mental · Presencial',      current: false },
  { label: 'M1',  title: 'O que é possível', sub: 'Demos ao vivo · Casos reais',           current: false },
  { label: 'M2',  title: 'Setup',            sub: 'Claude Code · APIs · MCPs',             current: false },
  { label: 'M3',  title: 'Fundamentos',      sub: 'Agentes · Contexto · Comandos',         current: false },
  { label: 'M4',  title: 'Agentes',          sub: 'Primeiro agente · Arquitetura mental',  current: false },
  { label: 'M5',  title: 'Claude Design',    sub: 'Design System · KV · Handoff',          current: true  },
  { label: 'M6',  title: 'Squad Sites',      sub: 'Next.js · Deploy · Publicação auto',    current: false },
  { label: 'M7',  title: 'Squad Social',     sub: 'Freepik · Heygen · Meta API',           current: false },
  { label: 'M8',  title: 'Squad Dev',        sub: 'Supabase · Auth · APIs',                current: false },
];

const STATS = [
  { value: '9',    label: 'módulos' },
  { value: '7',    label: 'semanas' },
  { value: '46+',  label: 'aulas' },
  { value: '12',   label: 'vagas' },
];

const VideoBg = (
  <div
    aria-hidden="true"
    style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}
  >
    <video
      autoPlay
      muted
      loop
      playsInline
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center 25%',
        display: 'block',
      }}
    >
      <source src="/video/joao/movimento-04.mp4" type="video/mp4" />
    </video>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(5,5,7,0.94) 0%, rgba(5,5,7,0.80) 40%, rgba(5,5,7,0.96) 100%)',
    }} />
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 60% 40% at 50% 110%, rgba(255,58,14,0.12) 0%, transparent 60%)',
      mixBlendMode: 'screen',
    }} />
  </div>
);

export default function MentoriaPage() {
  return (
    <WorkshopClaudeDesignLayout slug="mentoria" background={VideoBg}>
      <div className="slide-content flex flex-col gap-6" style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: EMBER, boxShadow: `0 0 10px ${EMBER}`,
            flexShrink: 0, display: 'inline-block',
          }} />
          <span style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: BONE_MUTE }}>
            Mentoria · João Guirunas · Claude Code + AIOX
          </span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontSize: 'clamp(28px, 4.5vw, 56px)',
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: BONE,
          maxWidth: '720px',
        }}>
          Tenha uma equipe de agentes de IA{' '}
          <em style={{ fontStyle: 'italic', color: EMBER }}>trabalhando para você, 24/7.</em>
        </h2>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          gap: '1px',
          background: HAIRLINE,
          border: `1px solid ${HAIRLINE}`,
          maxWidth: '480px',
        }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{
              background: INK,
              padding: '14px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              flex: 1,
            }}>
              <span style={{ fontFamily: DISPLAY, fontWeight: 400, fontSize: 'clamp(20px, 2.5vw, 28px)', letterSpacing: '-0.03em', color: EMBER, lineHeight: 1 }}>
                {stat.value}
              </span>
              <span style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: BONE_MUTE }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: HAIRLINE }} />

        {/* Módulos grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(9, 1fr)',
          gap: '1px',
          background: HAIRLINE,
          border: `1px solid ${HAIRLINE}`,
        }}>
          {MODULOS.map((m) => (
            <div key={m.label} style={{
              background: m.current ? 'rgba(255,58,14,0.08)' : INK,
              padding: '12px 10px 10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              borderTop: m.current ? `2px solid ${EMBER}` : '2px solid transparent',
            }}>
              <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.18em', textTransform: 'uppercase', color: m.current ? EMBER : BONE_MUTE }}>
                {m.label}
              </span>
              <p style={{ fontFamily: DISPLAY, fontWeight: m.current ? 400 : 300, fontSize: 'clamp(11px, 0.9vw, 13px)', letterSpacing: '-0.01em', lineHeight: 1.2, color: m.current ? BONE : BONE_DIM }}>
                {m.title}
              </p>
              <p style={{ fontFamily: MONO, fontSize: '9px', letterSpacing: '0.01em', color: BONE_MUTE, lineHeight: 1.4 }}>
                {m.sub}
              </p>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
          <p style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: BONE_MUTE }}>
            Início{' '}
            <span style={{ color: BONE_DIM }}>05/08/2026</span>
            {' '}· Florianópolis + online · máx 12 pessoas
          </p>

          <a
            href="https://joaoguirunas.com/mentoria"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-all hover:bg-[#FF3A0E]"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: MONO,
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: BONE,
              padding: '13px 26px',
              border: `1px solid ${EMBER}`,
              background: `rgba(255,58,14,0.10)`,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: EMBER_GLOW, flexShrink: 0, display: 'inline-block',
            }} />
            joaoguirunas.com/mentoria
            <span style={{ opacity: 0.7 }}>→</span>
          </a>
        </div>

      </div>
    </WorkshopClaudeDesignLayout>
  );
}
