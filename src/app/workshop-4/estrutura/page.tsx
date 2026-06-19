import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: '02 — Claude Design | Workshop 4',
  robots: { index: false },
};

const MONO      = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY   = "'Fraunces', 'Instrument Serif', Georgia, serif";
const EMBER     = '#FF3A0E';
const INK       = '#0e0e11';
const BONE      = '#f1f1f3';
const BONE_DIM  = '#c5c5ca';
const BONE_MUTE = '#84848c';
const HAIRLINE  = 'rgba(255,255,255,0.07)';

const OUTPUTS = [
  {
    label: 'Base · Design System',
    title: 'Design System',
    sub: 'Paleta · Tipografia · Componentes · Tom de voz',
    value: 'R$20–50k',
    base: true,
  },
  {
    label: 'Adaptação · Social',
    title: 'KV Social',
    sub: 'Posts Instagram · LinkedIn · Stories · Carrossel',
    value: 'R$8–20k/ciclo',
    base: false,
  },
  {
    label: 'Adaptação · Web',
    title: 'KV Site',
    sub: 'Hero · OG Image · Banners · Seções',
    value: 'R$30–80k',
    base: false,
  },
  {
    label: 'Adaptação · Pitch',
    title: 'Apresentação',
    sub: 'Slides · Copy comercial · Pitch visual',
    value: 'incluso',
    base: false,
  },
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
        objectPosition: 'center 40%',
        display: 'block',
      }}
    >
      <source src="/video/joao/cinematic-01.mp4" type="video/mp4" />
    </video>
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(5,5,7,0.96) 0%, rgba(5,5,7,0.88) 50%, rgba(5,5,7,0.96) 100%)',
    }} />
  </div>
);

export default function EstruturaPage() {
  return (
    <WorkshopClaudeDesignLayout slug="estrutura" background={VideoBg}>
      <div className="slide-content flex flex-col gap-8" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: BONE_MUTE,
          }}>
            Módulo 5 · Claude Design
          </span>
          <h2 style={{
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: 'clamp(32px, 5vw, 64px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            color: BONE,
          }}>
            Seu novo diretor de arte.
          </h2>
          <p style={{
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(14px, 1.6vw, 19px)',
            color: BONE_DIM,
            letterSpacing: '-0.01em',
            maxWidth: '520px',
          }}>
            Sênior, 24/7,{' '}
            <span style={{ color: EMBER }}>R$0/mês.</span>{' '}
            Uma base + quatro adaptações.
          </p>
        </header>

        {/* Divider */}
        <div style={{ height: '1px', background: HAIRLINE, width: '100%' }} />

        {/* 2×2 Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1px',
          background: HAIRLINE,
          border: `1px solid ${HAIRLINE}`,
        }}>
          {OUTPUTS.map((output) => (
            <div
              key={output.title}
              style={{
                background: output.base ? 'rgba(255,58,14,0.06)' : INK,
                padding: '22px 22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderTop: output.base ? `2px solid ${EMBER}` : '2px solid transparent',
              }}
            >
              <span style={{
                fontFamily: MONO,
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: output.base ? EMBER : BONE_MUTE,
              }}>
                {output.label}
              </span>
              <h3 style={{
                fontFamily: DISPLAY,
                fontWeight: output.base ? 400 : 300,
                fontSize: 'clamp(18px, 2vw, 26px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                color: output.base ? BONE : BONE_DIM,
              }}>
                {output.title}
              </h3>
              <p style={{
                fontFamily: MONO,
                fontSize: '11px',
                letterSpacing: '0.03em',
                color: BONE_MUTE,
                lineHeight: 1.5,
                marginTop: 'auto',
              }}>
                {output.sub}
              </p>
              <span style={{
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: output.base ? EMBER : 'rgba(255,255,255,0.20)',
                marginTop: '4px',
              }}>
                {output.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{
          fontFamily: DISPLAY,
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(13px, 1.3vw, 16px)',
          color: BONE_MUTE,
          letterSpacing: '-0.005em',
        }}>
          Design System é o tronco. Os KVs são os galhos — mesmo DNA, contextos diferentes.
        </p>

      </div>
    </WorkshopClaudeDesignLayout>
  );
}
