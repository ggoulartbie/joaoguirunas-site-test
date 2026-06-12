import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '04 — WorkOS | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY = "'Fraunces', 'Instrument Serif', Georgia, serif";
const EMBER   = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';
const INK     = '#0e0e11';
const BONE    = '#f1f1f3';
const BONE_DIM = '#c5c5ca';
const BONE_MUTE = '#84848c';
const HAIRLINE = 'rgba(255,255,255,0.07)';
const HAIRLINE_STRONG = 'rgba(255,255,255,0.16)';

const BLOCKS = [
  {
    label: 'Dor',
    accent: BONE_MUTE,
    text: 'Gestão de projetos virou pesadelo de planilha. Ninguém sabe o que está acontecendo. O founder é gargalo de tudo.',
    caption: 'PMO custa caro, escala mal e depende de uma pessoa acordada às 23h.',
  },
  {
    label: 'Solução',
    accent: EMBER_GLOW,
    text: 'Time de agentes IA operando como PMO. O sistema lê, prioriza, distribui e reporta — sem depender de uma pessoa no centro.',
    caption: 'Produto interno da Growth Sales. Operado por agentes, não por headcount.',
  },
  {
    label: 'Resultado',
    accent: BONE,
    text: 'Operação que roda sem o dono no meio. Visibilidade real. Decisão sobre dado, não sobre suposição.',
    caption: 'Roda dentro de casa e em clientes. Sem código de terceiro. Sem lock-in.',
  },
];

export default function WorkOSPage() {
  return (
    <Workshop3DeckLayout slug="workos">
      {/* Background — vídeo cinematográfico com fallback foto */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/photos/editorial/editorial-ai-workflow-man.png"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 30%',
            display: 'block',
          }}
        >
          <source src="/video/joao/cinematic-01.mp4" type="video/mp4" />
        </video>
        {/* gradiente direita → escuro */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(270deg, rgba(5,5,7,0.32) 0%, rgba(5,5,7,0.65) 45%, rgba(5,5,7,0.92) 72%, #050507 100%)',
        }} />
        {/* ember screen sutil */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 55% 60% at 8% 50%, rgba(255,58,14,0.10) 0%, transparent 65%)',
          mixBlendMode: 'screen',
        }} />
      </div>

      <div className="slide-content flex flex-col gap-8" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header — eyebrow + produto */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Eyebrow row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: EMBER, boxShadow: `0 0 10px ${EMBER}`,
              flexShrink: 0,
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: MONO,
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: BONE_MUTE,
            }}>
              Slide 04 · Produto interno
            </span>
            <span style={{
              width: '40px', height: '1px',
              background: 'rgba(255,58,14,0.5)',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: MONO,
              fontSize: '9px',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: EMBER,
              padding: '5px 11px',
              border: `1px solid rgba(255,58,14,0.5)`,
              background: 'rgba(255,58,14,0.08)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <span style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: EMBER, boxShadow: `0 0 6px ${EMBER}`,
                display: 'inline-block', flexShrink: 0,
              }} />
              Growth Sales A.I.
            </span>
          </div>

          {/* Nome do produto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 style={{
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: 'clamp(52px, 8vw, 96px)',
              letterSpacing: '-0.035em',
              lineHeight: 0.92,
              color: BONE,
            }}>
              WorkOS
            </h1>
            <p style={{
              fontFamily: DISPLAY,
              fontStyle: 'italic',
              fontWeight: 300,
              fontSize: 'clamp(16px, 2vw, 22px)',
              color: BONE_DIM,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
              maxWidth: '520px',
            }}>
              Produto interno desenvolvido pela{' '}
              <em style={{ color: EMBER, fontStyle: 'italic' }}>Growth Sales.</em>
            </p>
          </div>
        </header>

        {/* Divider */}
        <div style={{ height: '1px', background: HAIRLINE, width: '100%' }} />

        {/* 3 Blocos Dor / Solução / Resultado */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: HAIRLINE,
          border: `1px solid ${HAIRLINE}`,
        }}>
          {BLOCKS.map((block, i) => (
            <div
              key={block.label}
              style={{
                background: i === 1 ? 'rgba(255,58,14,0.06)' : INK,
                padding: '28px 26px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
                borderTop: i === 1 ? `2px solid ${EMBER}` : `2px solid transparent`,
              }}
            >
              <span style={{
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: block.accent,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '5px', height: '5px', borderRadius: '50%',
                  background: i === 1 ? EMBER : BONE_MUTE,
                  display: 'inline-block', flexShrink: 0,
                }} />
                {block.label}
              </span>

              <p style={{
                fontFamily: DISPLAY,
                fontWeight: i === 1 ? 400 : 300,
                fontSize: 'clamp(15px, 1.6vw, 19px)',
                lineHeight: 1.35,
                color: i === 1 ? BONE : BONE_DIM,
                letterSpacing: '-0.01em',
              }}>
                {block.text}
              </p>

              <p style={{
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.03em',
                color: BONE_MUTE,
                lineHeight: 1.55,
                marginTop: 'auto',
              }}>
                {block.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          paddingTop: '2px',
        }}>
          <p style={{
            fontFamily: DISPLAY,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.4vw, 17px)',
            color: BONE_MUTE,
            letterSpacing: '-0.005em',
          }}>
            PMO operado por agentes —{' '}
            <span style={{ color: EMBER_GLOW }}>construído e operado pela Growth Sales.</span>
          </p>
          <span style={{
            fontFamily: MONO,
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: BONE_MUTE,
            whiteSpace: 'nowrap',
            opacity: 0.6,
          }}>
            growthsales.ai · WorkOS
          </span>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
