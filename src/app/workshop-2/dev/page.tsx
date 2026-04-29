import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 05 — Dev | Workshop 2',
  description: 'Converter os tokens de design em CSS custom properties e configuração Tailwind.',
  alternates: { canonical: '/workshop-2/dev' },
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

const PROMPT = `/aiox-dev

Leia docs/design-system/tokens.md e gere dois arquivos:

═══════════════════════════════
ARQUIVO 1: docs/design-system/design-system.css
═══════════════════════════════
:root {
  /* Cores */
  --color-primary: #[hex];
  --color-primary-hover: #[10% mais escuro];
  --color-primary-light: #[10% mais claro];
  --color-secondary: #[hex];
  --color-neutral-50: #f9f9f9;
  --color-neutral-100: #f0f0f0;
  --color-neutral-400: #9a9a9a;
  --color-neutral-700: #3a3a3a;
  --color-neutral-900: #111111;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  /* Tipografia */
  --font-primary: '[nome]', sans-serif;
  --text-xs: 0.75rem;   --text-sm: 0.875rem;  --text-base: 1rem;
  --text-lg: 1.125rem;  --text-xl: 1.25rem;   --text-2xl: 1.5rem;
  --text-3xl: 1.875rem; --text-4xl: 2.25rem;

  /* Espaçamento */
  --space-1: 0.25rem;  --space-2: 0.5rem;   --space-3: 0.75rem;
  --space-4: 1rem;     --space-6: 1.5rem;   --space-8: 2rem;
  --space-12: 3rem;    --space-16: 4rem;    --space-24: 6rem;

  /* Border Radius */
  --radius-sm: 4px;  --radius-md: 8px;   --radius-lg: 16px;
  --radius-xl: 24px; --radius-full: 9999px;

  /* Sombras */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-colored: 0 4px 14px [cor primária 30% opacidade];
}

═══════════════════════════════
ARQUIVO 2: docs/design-system/tailwind.tokens.js
═══════════════════════════════
Referencie as CSS vars acima — não duplique os valores.

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: 'var(--color-primary)', hover: 'var(--color-primary-hover)', light: 'var(--color-primary-light)' },
        secondary: { DEFAULT: 'var(--color-secondary)' },
        neutral: { 50: 'var(--color-neutral-50)', 100: 'var(--color-neutral-100)', 400: 'var(--color-neutral-400)', 700: 'var(--color-neutral-700)', 900: 'var(--color-neutral-900)' },
        success: 'var(--color-success)', warning: 'var(--color-warning)', error: 'var(--color-error)',
      },
      fontFamily: { primary: 'var(--font-primary)' },
      fontSize: { xs: 'var(--text-xs)', sm: 'var(--text-sm)', base: 'var(--text-base)', lg: 'var(--text-lg)', xl: 'var(--text-xl)', '2xl': 'var(--text-2xl)', '3xl': 'var(--text-3xl)', '4xl': 'var(--text-4xl)' },
      borderRadius: { sm: 'var(--radius-sm)', md: 'var(--radius-md)', lg: 'var(--radius-lg)', xl: 'var(--radius-xl)', full: 'var(--radius-full)' },
      boxShadow: { sm: 'var(--shadow-sm)', md: 'var(--shadow-md)', lg: 'var(--shadow-lg)', colored: 'var(--shadow-colored)' },
    },
  },
};`;

export default function DevPage() {
  return (
    <WorkshopPhaseLayout slug="dev">
      <FacilitatorNote duration="5 min">
        Esta é a fase mais rápida — o agente só converte o que o Designer criou. Enquanto roda, explique o conceito de tokens semânticos vs. literais. É um excelente momento para mostrar que o código gerado referencia as CSS vars, não os valores brutos.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Dev lê <InlineCode>tokens.md</InlineCode> e gera dois arquivos de código: CSS custom properties para qualquer projeto web, e um objeto Tailwind pronto para importar. Em 5 minutos, sua marca vira código reutilizável.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        5 min · Fase 05 de 07
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">@aiox-dev</strong>
        <span className="ml-2 text-sm text-white/50">— tokens para CSS vars e Tailwind config</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock label="cole no claude code">{PROMPT}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Arquivos gerados</h2>
      <div className="space-y-3">
        <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <InlineCode>docs/design-system/design-system.css</InlineCode>
          <p className="mt-2 text-sm text-white/55">CSS custom properties semânticas. Cole no <InlineCode>:root</InlineCode> do seu projeto para ativar o sistema inteiro.</p>
        </div>
        <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <InlineCode>docs/design-system/tailwind.tokens.js</InlineCode>
          <p className="mt-2 text-sm text-white/55">Extensão do <InlineCode>tailwind.config.js</InlineCode>. Referencia as CSS vars — não duplica valores.</p>
        </div>
      </div>

      <Callout label="Por que semântico?">
        <InlineCode>--color-primary</InlineCode> em vez de <InlineCode>--color-orange-500</InlineCode>. Se você mudar a cor amanhã, só troca um valor e tudo propaga. Tokens semânticos descrevem o papel, não o valor literal.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
