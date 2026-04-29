import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 04 — Designer | Workshop 2',
  description: 'O agente Design System cria os tokens completos: paleta, tipografia, espaçamentos.',
  alternates: { canonical: '/workshop-2/designer' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const PROMPT = `/design-system

Você vai criar um design system pessoal do zero, baseado no briefing de marca desta pessoa.

Leia os dois arquivos abaixo antes de começar:
- docs/brand-brief.md (identidade: cor, personalidade, referência visual)
- docs/smart-memory/project/brand-tokens.md (tokens em linguagem natural)

Crie o arquivo docs/design-system/tokens.md com as seguintes seções. Cada decisão deve ser justificada em 1 linha com base na personalidade da marca.

═══════════════════════════════
SEÇÃO 1 — Paleta de Cores
═══════════════════════════════
## Paleta de Cores

### Primária
- **Principal:** #[hex derivado da cor do brief]
- **Hover:** #[10% mais escuro]
- **Light:** #[10% mais claro, para backgrounds]
- **Por quê:** [justificativa baseada na personalidade]

### Secundária
- **Principal:** #[cor complementar ou análoga]
- **Por quê:** [justificativa]

### Neutros (escala de 5 tons)
- **50:** #f9f9f9  **100:** #f0f0f0  **400:** #9a9a9a  **700:** #3a3a3a  **900:** #111111

### Semânticas
- **Success:** #22c55e  **Warning:** #f59e0b  **Error:** #ef4444

═══════════════════════════════
SEÇÃO 2 — Tipografia
═══════════════════════════════
## Tipografia

### Fonte primária
- **Nome:** [baseado na personalidade — ex: Inter, Fraunces, DM Sans, Plus Jakarta Sans]
- **Google Fonts import:** [link]
- **Por quê:** [como reflete os 3 adjetivos da marca]
- **Pesos:** 400 / 600 / 700

### Escala tipográfica
xs(12px) · sm(14px) · base(16px) · lg(18px) · xl(20px) · 2xl(24px) · 3xl(30px) · 4xl(36px)

═══════════════════════════════
SEÇÃO 3 — Espaçamento
═══════════════════════════════
## Espaçamento (base 4px)
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96px

═══════════════════════════════
SEÇÃO 4 — Border Radius
═══════════════════════════════
## Border Radius
none(0) · sm(4px) · md(8px) · lg(16px) · xl(24px) · full(9999px)
Escolha o padrão: mais arredondado = mais acolhedor / mais quadrado = mais técnico.

═══════════════════════════════
SEÇÃO 5 — Sombras
═══════════════════════════════
## Sombras
sm / md / lg (com valores CSS reais) + colored (cor primária a 30% opacidade)

═══════════════════════════════
SEÇÃO 6 — Resumo de Decisões
═══════════════════════════════
## Por que estas escolhas?
[Parágrafo conectando as decisões com os 3 adjetivos e a referência visual do brief]`;

const TOKEN_SECTIONS = [
  { label: 'Paleta de cores', desc: 'Primária (hover + light), secundária, neutros (5 tons), semânticas. Cada escolha justificada.' },
  { label: 'Tipografia', desc: 'Fonte + link Google Fonts, escala xs → 4xl, pesos, line-height.' },
  { label: 'Espaçamento', desc: 'Base 4px, 9 tokens com usos documentados.' },
  { label: 'Border-radius', desc: '6 valores — escolhido com base na personalidade da marca.' },
  { label: 'Sombras', desc: 'sm / md / lg + colored — depth consistente em todo o sistema.' },
  { label: 'Resumo de decisões', desc: 'Por que cada escolha reflete a marca — não é aleatório.' },
];

export default function DesignerPage() {
  return (
    <WorkshopPhaseLayout slug="designer">
      <FacilitatorNote duration="10 min">
        Explique antes de rodar: o agente <InlineCode>@design-system</InlineCode> vai ler o <InlineCode>brand-brief.md</InlineCode> e o <InlineCode>brand-tokens.md</InlineCode> — por isso o prompt não precisa repetir os dados da marca. A cadeia de contexto já foi construída nas fases anteriores.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Design System — inspirado em Brad Frost e Atomic Design — lê o brief e os brand-tokens, depois cria <InlineCode>docs/design-system/tokens.md</InlineCode> com paleta, tipografia, espaçamentos, border-radius e sombras. Cada decisão é justificada pela personalidade da marca.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 04 de 07
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">@design-system</strong>
        <span className="ml-2 text-sm text-white/50">— Brad Frost / Atomic Design · tokens do zero</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock label="cole no claude code">{PROMPT}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que o tokens.md vai conter</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {TOKEN_SECTIONS.map((item) => (
          <div key={item.label} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <strong className="block text-sm text-white">{item.label}</strong>
            <p className="mt-1 text-xs text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <Callout label="Sobre o @design-system">
        Este agente pensa em sistemas, não em peças isoladas — por isso o prompt é estruturado com seções explícitas. O resultado não é uma lista aleatória de valores: é um sistema onde cada escolha sustenta as outras, e todas remetem aos adjetivos da marca.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
