import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '04 — WorkOS | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

const BLOCKS = [
  {
    label: 'Dor',
    color: 'rgba(255,255,255,0.4)',
    borderColor: 'rgba(255,255,255,0.12)',
    text: 'Gestão de projetos virou pesadelo de planilha. Ninguém sabe o que está acontecendo. O founder é gargalo de tudo.',
  },
  {
    label: 'Solução',
    color: EMBER,
    borderColor: 'rgba(255,58,14,0.4)',
    text: 'PMO operado por agentes de IA. O sistema lê, prioriza, distribui e reporta — sem depender de uma pessoa acordada às 23h.',
  },
  {
    label: 'Resultado',
    color: 'rgba(255,255,255,0.85)',
    borderColor: 'rgba(255,255,255,0.2)',
    text: 'Operação que roda sem o dono no meio. Visibilidade real. Decisão sobre dado, não sobre suposição.',
  },
];

export default function WorkOSPage() {
  return (
    <Workshop3DeckLayout slug="workos">
      <div className="flex flex-col gap-10">
        <header className="flex flex-wrap items-start gap-4">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ fontFamily: MONO, color: EMBER }}
              >
                Slide 04 · Produto 01
              </span>
              <span
                className="font-mono text-[9px] tracking-[0.18em] uppercase px-2.5 py-1"
                style={{
                  fontFamily: MONO,
                  background: 'rgba(255,58,14,0.12)',
                  border: '1px solid rgba(255,58,14,0.4)',
                  color: EMBER,
                }}
              >
                System as a Service
              </span>
            </div>
            <h1
              className="text-5xl font-bold leading-none md:text-7xl"
              style={{ fontFamily: DISPLAY }}
            >
              WorkOS
            </h1>
            <p
              className="mt-3 text-xl font-light"
              style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.55)' }}
            >
              PMO operado por agentes
            </p>
          </div>
        </header>

        <div className="grid gap-3 sm:grid-cols-3 mt-2">
          {BLOCKS.map((block) => (
            <div
              key={block.label}
              className="flex flex-col gap-4 p-6"
              style={{ border: `1px solid ${block.borderColor}`, background: 'rgba(255,255,255,0.02)' }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.22em] uppercase"
                style={{ fontFamily: MONO, color: block.color }}
              >
                {block.label}
              </span>
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.7)' }}
              >
                {block.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
