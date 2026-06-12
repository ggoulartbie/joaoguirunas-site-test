import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '06 — Os números | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

const NUMBERS = [
  { value: '150k',   unit: '/mês',    label: 'hoje',              color: EMBER },
  { value: '500k',   unit: '/mês',    label: 'projeção dez/2026', color: 'rgba(255,255,255,0.75)' },
  { value: 'R$ 6M',  unit: '',        label: 'meta 2027',         color: 'rgba(255,255,255,0.5)' },
];

export default function NumerosPage() {
  return (
    <Workshop3DeckLayout slug="numeros">
      <div className="flex flex-col gap-14">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 06 · Tração
          </span>
          <h1
            className="text-5xl font-bold leading-none md:text-7xl"
            style={{ fontFamily: DISPLAY }}
          >
            Os números
          </h1>
        </header>

        <div className="grid gap-3 sm:grid-cols-3">
          {NUMBERS.map((n) => (
            <div
              key={n.value}
              className="flex flex-col gap-4 p-7"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-baseline gap-1">
                <span
                  className="text-5xl font-bold leading-none md:text-6xl"
                  style={{ fontFamily: DISPLAY, color: n.color }}
                >
                  {n.value}
                </span>
                {n.unit && (
                  <span
                    className="text-xl font-light"
                    style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.4)' }}
                  >
                    {n.unit}
                  </span>
                )}
              </div>
              <span
                className="font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.35)' }}
              >
                {n.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="p-7 max-w-2xl"
          style={{
            border: '1px solid rgba(255,58,14,0.25)',
            background: 'rgba(255,58,14,0.04)',
          }}
        >
          <p
            className="text-2xl font-light italic leading-snug"
            style={{ fontFamily: SERIF, color: 'rgba(255,255,255,0.85)' }}
          >
            0 → 150k em 18 meses.{' '}
            <span style={{ color: EMBER }}>Não foi sorte — foi dor real.</span>
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
