import type React from 'react';
import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '02 — A pergunta errada | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO  = "'Geist Mono', 'JetBrains Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const SANS  = "var(--font-display), 'Inter Tight', system-ui, sans-serif";
const EMBER = '#FF3A0E';

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `fadeUp 600ms cubic-bezier(0.25, 1, 0.3, 1) ${delay}ms both`,
});

export default function PerguntaPage() {
  return (
    <Workshop3DeckLayout slug="pergunta">
      {/* Dot-grid sutil — tipográfico puro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 slide-content flex flex-col" style={{ gap: 'clamp(40px, 6vh, 80px)' }}>

        {/* Kicker */}
        <div style={fadeUp(0)}>
          <span
            className="block text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Reframe · 02
          </span>
        </div>

        {/* Headline — pergunta */}
        <div style={fadeUp(80)}>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.92,
              letterSpacing: '-0.035em',
              color: '#f1f1f3',
              margin: 0,
              maxWidth: '16ch',
            }}
          >
            Por onde começa
            <br />
            um negócio com IA?
          </h1>
        </div>

        {/* Sub — reframe da pergunta */}
        <div style={fadeUp(160)}>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 400,
              fontSize: 'clamp(16px, 2vw, 22px)',
              lineHeight: 1.5,
              color: '#c5c5ca',
              maxWidth: '42ch',
              margin: 0,
            }}
          >
            Quase todo empresário me pergunta isso.{' '}
            <span style={{ color: '#f1f1f3', fontWeight: 500 }}>
              A pergunta certa não é essa.
            </span>
          </p>
        </div>

        {/* Separador hairline ember — 60px */}
        <div
          style={{
            ...fadeUp(240),
            width: 60,
            height: 1,
            background: EMBER,
            opacity: 0.7,
          }}
        />

        {/* Resposta — "Começa pela dor." */}
        <div style={fadeUp(320)}>
          <p
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(40px, 6vw, 80px)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: EMBER,
              margin: 0,
            }}
          >
            Começa pela dor.
          </p>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 300,
              fontSize: 'clamp(16px, 2vw, 22px)',
              lineHeight: 1.5,
              color: '#84848c',
              marginTop: 'clamp(8px, 1.5vh, 16px)',
            }}
          >
            Não pela ferramenta.
          </p>
        </div>

      </div>
    </Workshop3DeckLayout>
  );
}
