import type { Metadata } from 'next';
import { WorkshopClaudeDesignLayout } from '../_components/WorkshopClaudeDesignLayout';

export const metadata: Metadata = {
  title: '01 — Abertura | Workshop 4',
  robots: { index: false },
};

const MONO      = "'JetBrains Mono', 'Roboto Mono', ui-monospace, monospace";
const DISPLAY   = "'Fraunces', 'Instrument Serif', Georgia, serif";
const EMBER     = '#FF3A0E';
const EMBER_GLOW = '#FF5A1F';
const INK       = '#0e0e11';
const BONE      = '#f1f1f3';
const BONE_DIM  = '#c5c5ca';
const BONE_MUTE = '#84848c';
const HAIRLINE  = 'rgba(255,255,255,0.07)';

const CARDS = [
  {
    accent: BONE_MUTE,
    highlight: false,
    text: 'Uma boa solução mal apresentada pode parecer fraca.',
  },
  {
    accent: EMBER_GLOW,
    highlight: true,
    text: 'Uma solução simples, bem posicionada, pode parecer muito mais valiosa.',
  },
  {
    accent: BONE,
    highlight: false,
    text: 'O mercado não compra o que você faz. Compra o que consegue entender, confiar e lembrar.',
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
      poster="/photos/editorial/editorial-ai-workflow-woman.png"
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
      <source src="/video/joao/cinematic-02.mp4" type="video/mp4" />
    </video>
    {/* escurece esquerda onde o conteúdo está */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, rgba(5,5,7,0.97) 0%, rgba(5,5,7,0.85) 40%, rgba(5,5,7,0.55) 68%, rgba(5,5,7,0.20) 100%)',
    }} />
    {/* ember glow sutil à esquerda */}
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse 55% 60% at 6% 50%, rgba(255,58,14,0.12) 0%, transparent 65%)',
      mixBlendMode: 'screen',
    }} />
  </div>
);

export default function AberturaPage() {
  return (
    <WorkshopClaudeDesignLayout slug="abertura" background={VideoBg}>
      <div className="slide-content flex flex-col gap-8" style={{ position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
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
            Workshop 4 · Claude Design
          </span>
        </div>

        {/* Título */}
        <h2 style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontSize: 'clamp(44px, 7vw, 88px)',
          letterSpacing: '-0.035em',
          lineHeight: 0.92,
          color: BONE,
          whiteSpace: 'pre-line',
        }}>
          {'Antes da técnica,\nexiste a percepção.'}
        </h2>
        <p style={{
          fontFamily: DISPLAY,
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(15px, 1.8vw, 20px)',
          color: BONE_DIM,
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
          maxWidth: '480px',
          marginTop: '-16px',
        }}>
          O mercado lê sinais o tempo todo.
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: HAIRLINE, width: '100%' }} />

        {/* 3 Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: HAIRLINE,
          border: `1px solid ${HAIRLINE}`,
        }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                background: card.highlight ? 'rgba(255,58,14,0.06)' : INK,
                padding: '28px 26px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                borderTop: card.highlight ? `2px solid ${EMBER}` : '2px solid transparent',
              }}
            >
              <p style={{
                fontFamily: DISPLAY,
                fontWeight: card.highlight ? 400 : 300,
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                lineHeight: 1.4,
                color: card.highlight ? BONE : BONE_DIM,
                letterSpacing: '-0.01em',
              }}>
                {card.text}
              </p>
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
          Pitch é traduzir posicionamento em percepção.
        </p>

      </div>
    </WorkshopClaudeDesignLayout>
  );
}
