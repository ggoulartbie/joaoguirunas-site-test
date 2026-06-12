import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '03 — A tese | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

export default function TesePage() {
  return (
    <Workshop3DeckLayout slug="tese">
      <div className="flex flex-col gap-16">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 03 · Nossa tese
          </span>
        </header>

        <div
          className="py-12 px-8 md:py-16 md:px-12"
          style={{
            border: '1px solid rgba(255,58,14,0.3)',
            background: 'linear-gradient(135deg, rgba(255,58,14,0.06) 0%, rgba(0,0,0,0) 100%)',
          }}
        >
          <p
            className="text-3xl font-light italic leading-snug md:text-5xl lg:text-6xl max-w-4xl"
            style={{ fontFamily: SERIF, letterSpacing: '-0.02em' }}
          >
            Negócio se desenvolve em cima de uma{' '}
            <span style={{ color: EMBER }}>necessidade</span>{' '}
            — não o contrário.
          </p>
          <p
            className="mt-8 text-2xl font-light italic leading-snug md:text-3xl max-w-3xl"
            style={{ fontFamily: SERIF, color: 'rgba(255,255,255,0.7)' }}
          >
            IA acelera a entrega disso.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3 max-w-3xl">
          {[
            { label: 'Primeiro', text: 'Identificar a dor real no negócio.' },
            { label: 'Depois',   text: 'Desenhar a operação que resolve essa dor.' },
            { label: 'Então',    text: 'IA acelera e amplia essa operação.' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-5"
              style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: MONO, color: EMBER }}
              >
                {item.label}
              </span>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: DISPLAY }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
