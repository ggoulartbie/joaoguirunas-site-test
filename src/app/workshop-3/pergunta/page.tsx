import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '02 — A pergunta errada | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SERIF   = "var(--font-display-serif), 'Fraunces', serif";
const EMBER   = '#FF3A0E';

export default function PerguntaPage() {
  return (
    <Workshop3DeckLayout slug="pergunta">
      <div className="flex flex-col gap-14">
        <header>
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-5"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            Slide 02 · O ponto de partida
          </span>
          <h1
            className="text-5xl font-light italic leading-[1.05] md:text-7xl max-w-3xl"
            style={{ fontFamily: SERIF }}
          >
            Por onde começa um negócio com IA?
          </h1>
        </header>

        <div
          className="p-8 max-w-2xl"
          style={{
            border: '1px solid rgba(255,58,14,0.35)',
            background: 'rgba(255,58,14,0.05)',
            borderLeft: `4px solid ${EMBER}`,
          }}
        >
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{ fontFamily: MONO, color: EMBER }}
          >
            A resposta que todo mundo espera
          </span>
          <p
            className="text-2xl font-light leading-snug line-through"
            style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.4)', textDecorationColor: EMBER }}
          >
            "Escolha uma ferramenta de IA."
          </p>
        </div>

        <div className="max-w-2xl">
          <span
            className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
            style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.4)' }}
          >
            A pergunta certa
          </span>
          <p
            className="text-3xl font-semibold leading-snug md:text-4xl"
            style={{ fontFamily: DISPLAY }}
          >
            Quase todo empresário me pergunta isso.{' '}
            <span style={{ color: EMBER }}>A pergunta certa não é essa.</span>
          </p>
          <p
            className="mt-6 text-xl leading-relaxed"
            style={{ fontFamily: DISPLAY, color: 'rgba(255,255,255,0.6)' }}
          >
            A pergunta certa é: <strong className="text-white">qual dor no seu negócio ainda não tem resolução?</strong> IA é o caminho — não o destino.
          </p>
        </div>
      </div>
    </Workshop3DeckLayout>
  );
}
