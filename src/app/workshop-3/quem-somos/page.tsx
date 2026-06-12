import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '01 — Olá, Growth Sales | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

export default function QuemSomosPage() {
  return (
    <Workshop3DeckLayout slug="quem-somos">
      <div className="flex flex-col gap-12">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 01 · Apresentação
          </span>
          <h1
            className="text-5xl font-light italic leading-[1.05] md:text-7xl"
            style={{ fontFamily: SERIF }}
          >
            Olá,{' '}
            <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: EMBER }}>
              Growth Sales.
            </span>
          </h1>
        </header>

        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          {[
            { num: '18', label: 'meses de operação', sub: 'Do zero ao que você vai ver hoje.' },
            { num: '2',  label: 'produtos no mercado', sub: 'WorkOS e Orquestrador Comercial.' },
            { num: '1',  label: 'tese que guia tudo',  sub: 'Negócio se resolve em cima de dor real.' },
          ].map((item) => (
            <div
              key={item.num}
              className="flex flex-col gap-3 p-6"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span
                className="text-5xl font-bold leading-none"
                style={{ fontFamily: DISPLAY, color: EMBER }}
              >
                {item.num}
              </span>
              <div>
                <span
                  className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1"
                  style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.5)' }}
                >
                  {item.label}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-xl leading-relaxed max-w-2xl"
          style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.7)' }}
        >
          Não viemos vender software. Viemos conversar sobre como IA vira tração real — dentro do negócio, não em cima dele.
        </p>
      </div>
    </Workshop3DeckLayout>
  );
}
