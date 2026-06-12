import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '07 — Quem confiou | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

const CLIENTS = ['Sisprime', 'Blue3', 'Viva América', 'Argoplan'];

export default function ClientesPage() {
  return (
    <Workshop3DeckLayout slug="clientes">
      <div className="flex flex-col gap-14">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 07 · Clientes
          </span>
          <h1
            className="text-5xl font-bold leading-none md:text-7xl"
            style={{ fontFamily: DISPLAY }}
          >
            Quem confiou
          </h1>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 max-w-2xl">
          {CLIENTS.map((client) => (
            <div
              key={client}
              className="flex items-center px-8 py-7"
              style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}
            >
              <span
                className="text-2xl font-bold md:text-3xl"
                style={{ fontFamily: DISPLAY, letterSpacing: '-0.02em' }}
              >
                {client}
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
            Empresa grande não compra software.{' '}
            <span style={{ color: EMBER }}>Compra resolução de dor.</span>
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
