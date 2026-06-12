import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';
import { GrowthLineChart } from '../_components/GrowthLineChart';

export const metadata: Metadata = {
  title: '06 — Os números | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO  = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const EMBER = '#FF3A0E';

export default function NumerosPage() {
  return (
    <Workshop3DeckLayout slug="numeros">
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 30% 40% at 15% 50%, rgba(255,58,14,0.06), transparent)',
        }}
      />

      <div className="slide-content flex flex-col gap-6" style={{ position: 'relative', zIndex: 1 }}>
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Tração · Abr/2025 — Dez/2026
          </span>
          <h1
            className="font-light italic leading-tight"
            style={{ fontFamily: SERIF, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            0 → 180k/mês em 15 meses.{' '}
            <span className="not-italic font-semibold" style={{ color: EMBER }}>Não foi sorte.</span>
          </h1>
          <p
            className="mt-1 font-light"
            style={{ fontSize: 14, color: 'rgba(241,241,243,0.5)', letterSpacing: '0.02em', fontFamily: MONO }}
          >
            Real até Jun/26 · Projeção +60k/mês a partir de Jul/26
          </p>
        </header>

        <div style={{ width: '100%', height: 'clamp(220px, 32vw, 320px)' }}>
          <GrowthLineChart />
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1rem' }}>
          <p
            className="text-xl font-light italic"
            style={{ fontFamily: SERIF, color: 'rgba(241,241,243,0.55)', letterSpacing: '-0.01em' }}
          >
            Não foi sorte — foi dor real.
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
