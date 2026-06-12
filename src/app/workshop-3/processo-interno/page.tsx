import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '08 — A gente come o que cozinha | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

const AREAS = [
  { label: 'PMO',        text: 'Gestão de projetos internos operada por agentes. Zero caos de status update.' },
  { label: 'Comercial',  text: 'Funil monitorado e executado em parte por automação. Time foca em fechar.' },
  { label: 'Entrega',    text: 'Processos de entrega padronizados. Menos recurso humano no operacional, mais no estratégico.' },
];

export default function ProcessoInternoPage() {
  return (
    <Workshop3DeckLayout slug="processo-interno">
      <div className="flex flex-col gap-14">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 08 · Prática interna
          </span>
          <h1
            className="text-4xl font-bold leading-tight md:text-6xl max-w-3xl"
            style={{ fontFamily: DISPLAY }}
          >
            A gente come o que cozinha.
          </h1>
        </header>

        <div
          className="p-8 max-w-2xl"
          style={{
            border: `1px solid rgba(255,58,14,0.3)`,
            background: 'rgba(255,58,14,0.05)',
            borderLeft: `4px solid ${EMBER}`,
          }}
        >
          <p
            className="text-xl leading-relaxed"
            style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.75)' }}
          >
            IA em todo processo interno — PMO, comercial, entrega.{' '}
            <strong className="text-white">Menos recurso, mais entrega.</strong>
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 max-w-3xl">
          {AREAS.map((area) => (
            <div
              key={area.label}
              className="flex flex-col gap-3 p-6"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
            >
              <span
                className="font-mono text-[10px] tracking-[0.2em] uppercase"
                style={{ fontFamily: MONO, color: EMBER }}
              >
                {area.label}
              </span>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.6)' }}
              >
                {area.text}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-xl font-light italic leading-relaxed max-w-2xl"
          style={{ fontFamily: SERIF, color: 'rgba(255,255,255,0.65)' }}
        >
          Não vendemos o que não aplicamos. Cada produto que entregamos ao cliente, rodou primeiro em nós.
        </p>
      </div>
    </Workshop3DeckLayout>
  );
}
