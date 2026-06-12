import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '09 — Reflexão final | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

export default function ReflexaoPage() {
  return (
    <Workshop3DeckLayout slug="reflexao">
      <div className="flex flex-col gap-12">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 09 · Encerramento
          </span>
          <h1
            className="text-5xl font-bold leading-none md:text-7xl"
            style={{ fontFamily: DISPLAY }}
          >
            Reflexão final
          </h1>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Coluna esquerda — para a pessoa */}
          <div
            className="flex flex-col gap-5 p-7"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.45)' }}
            >
              Pra pessoa
            </span>
            <p
              className="text-lg leading-relaxed font-light"
              style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.8)' }}
            >
              Médico. Advogado. Vendedor. Designer.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.6)' }}
            >
              IA é eficiência operacional. Muito mais com muito menos. Independe da sua profissão.
            </p>
          </div>

          {/* Coluna direita — para o empresário */}
          <div
            className="flex flex-col gap-5 p-7"
            style={{
              border: '1px solid rgba(255,58,14,0.3)',
              background: 'rgba(255,58,14,0.05)',
            }}
          >
            <span
              className="font-mono text-[10px] tracking-[0.2em] uppercase"
              style={{ fontFamily: MONO, color: EMBER }}
            >
              Pra empresário
            </span>
            <p
              className="text-lg leading-relaxed font-light"
              style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.8)' }}
            >
              Eficiência também.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.7)' }}
            >
              Mas desenvolver negócio exige{' '}
              <strong className="text-white">REPERTÓRIO</strong>. É o repertório que enxerga qual dor vale atacar.{' '}
              <span style={{ color: EMBER }}>A IA acelera; o repertório direciona.</span>
            </p>
          </div>
        </div>

        {/* Footer full-width */}
        <div
          className="w-full p-8 mt-2"
          style={{
            border: '1px solid rgba(255,58,14,0.4)',
            background: 'linear-gradient(135deg, rgba(255,58,14,0.08) 0%, rgba(0,0,0,0) 100%)',
          }}
        >
          <p
            className="text-2xl font-light italic leading-snug text-center md:text-3xl"
            style={{ fontFamily: SERIF, letterSpacing: '-0.01em' }}
          >
            IA não cria o caminho.{' '}
            <span style={{ color: EMBER }}>
              Ela encurta o caminho que você já sabia andar.
            </span>
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
