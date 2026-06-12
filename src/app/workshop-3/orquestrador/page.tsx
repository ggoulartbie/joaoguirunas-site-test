import type { Metadata } from 'next';
import { Workshop3DeckLayout } from '../_components/Workshop3DeckLayout';

export const metadata: Metadata = {
  title: '05 — Orquestrador Comercial | Workshop 3',
  robots: { index: false, follow: false },
};

const MONO    = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const EMBER   = '#FF3A0E';

const BLOCKS = [
  {
    label: 'Dor',
    color: 'rgba(255,255,255,0.4)',
    borderColor: 'rgba(255,255,255,0.12)',
    text: 'Time de vendas sem ritmo. CRM virou arquivo morto. Lead entra, some. Ninguém sabe onde trava o funil.',
  },
  {
    label: 'Solução',
    color: EMBER,
    borderColor: 'rgba(255,58,14,0.4)',
    text: 'Orquestrador com IA que monitora o funil, sugere próxima ação e executa follow-up de forma autônoma — no CRM que o time já usa.',
  },
  {
    label: 'Resultado',
    color: 'rgba(255,255,255,0.85)',
    borderColor: 'rgba(255,255,255,0.2)',
    text: 'Taxa de conversão sobe. Time foca em fechar, não em atualizar planilha. Operação comercial que roda com menos gente, mais resultado.',
  },
];

export default function OrquestradorPage() {
  return (
    <Workshop3DeckLayout slug="orquestrador">
      <div className="flex flex-col gap-10">
        <header>
          <div className="flex items-center gap-4 mb-3">
            <span
              className="font-mono text-[10px] tracking-[0.22em] uppercase"
              style={{ fontFamily: MONO, color: EMBER }}
            >
              Slide 05 · Produto 02
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
              Service as a System
            </span>
          </div>
          <h1
            className="text-4xl font-bold leading-none md:text-6xl"
            style={{ fontFamily: DISPLAY }}
          >
            Orquestrador Comercial
          </h1>
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
