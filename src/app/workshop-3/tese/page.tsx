import type React from 'react';
import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '03 — A tese | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO  = "'Geist Mono', 'JetBrains Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const SANS  = "var(--font-display), 'Inter Tight', system-ui, sans-serif";
const EMBER = '#FF3A0E';

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `fadeUp 600ms cubic-bezier(0.25, 1, 0.3, 1) ${delay}ms both`,
});

export default function TesePage() {
  return (
    <Workshop3DeckLayout slug="tese">
      {/* Dot-grid sutil — slide tipográfico puro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 slide-content flex flex-col" style={{ gap: 'clamp(40px, 6vh, 72px)' }}>

        {/* Kicker */}
        <div style={fadeUp(0)}>
          <span
            className="block text-[10px] tracking-[0.22em] uppercase"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Tese Central · 03
          </span>
        </div>

        {/* Frase-âncora — 3 linhas, gigante */}
        <div style={fadeUp(80)}>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(52px, 7.5vw, 88px)',
              lineHeight: 0.96,
              letterSpacing: '-0.035em',
              color: '#f1f1f3',
              margin: 0,
              maxWidth: '18ch',
            }}
          >
            Negócio se desenvolve
            <br />
            em cima de uma{' '}
            <span style={{ color: EMBER }}>necessidade</span>.
            <br />
            Não o contrário.
          </h1>
        </div>

        {/* Hairline full — separador visual */}
        <div
          style={{
            ...fadeUp(200),
            width: '100%',
            maxWidth: 560,
            height: 1,
            background: 'rgba(255,255,255,0.07)',
          }}
        />

        {/* Conclusão — abaixo da hairline */}
        <div style={fadeUp(280)}>
          <p
            style={{
              fontFamily: SANS,
              fontWeight: 500,
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              lineHeight: 1.4,
              color: '#f1f1f3',
              margin: 0,
            }}
          >
            IA acelera a entrega disso.
          </p>
        </div>

      </div>
    </Workshop3DeckLayout>
  );
}
