import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 05 — Dev | Workshop 2',
  description: 'Converter os tokens de design em código utilizável — CSS vars e Tailwind.',
  alternates: { canonical: '/workshop-2/dev' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="my-4 overflow-x-auto p-4 text-sm leading-relaxed"
      style={{
        fontFamily: MONO,
        background: '#1a1a1a',
        borderLeft: `3px solid ${ACCENT}`,
        color: 'rgba(255,255,255,0.85)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-8 p-5 text-sm leading-relaxed text-white/80"
      style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}
    >
      <span
        className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, color: ACCENT }}
      >
        Resultado
      </span>
      {children}
    </div>
  );
}

const PROMPT = `/aiox-dev

Leia docs/design-system/tokens.md e gere dois arquivos:

1. docs/design-system/design-system.css
   CSS custom properties (:root { --color-primary: ...; --font-base: ...; })

2. docs/design-system/tailwind.tokens.js
   Objeto JS para estender o tailwind.config.js com as cores e fontes da marca

Mantenha os nomes semânticos (--color-primary, não --color-blue-500).`;

export default function DevPage() {
  return (
    <WorkshopPhaseLayout slug="dev">
      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Dev lê o{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs" style={{ fontFamily: MONO }}>
          tokens.md
        </code>{' '}
        e converte tudo em código utilizável — um arquivo CSS com custom properties e um objeto
        JavaScript para estender o Tailwind. Em 5 minutos, sua marca pessoal vira código pronto
        para qualquer projeto.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        5 min · Fase 05 de 07
      </div>

      <div
        className="my-6 p-4"
        style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}
      >
        <span
          className="block font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: ACCENT }}
        >
          Agente
        </span>
        <strong className="text-base text-white">@aiox-dev</strong>
        <span className="ml-2 text-sm text-white/50">— tokens para CSS e Tailwind</span>
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock>{PROMPT}</CodeBlock>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Arquivos gerados</h2>
      <div className="space-y-3">
        <div
          className="p-4"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <code className="block text-xs" style={{ fontFamily: MONO, color: ACCENT }}>
            docs/design-system/design-system.css
          </code>
          <p className="mt-1 text-sm text-white/55">
            CSS com custom properties semânticas. Cole no{' '}
            <code className="text-xs" style={{ fontFamily: MONO }}>:root</code> do seu projeto para
            ativar imediatamente.
          </p>
          <pre
            className="mt-3 p-3 text-xs"
            style={{ fontFamily: MONO, background: '#111', color: 'rgba(255,255,255,0.6)', borderLeft: '2px solid rgba(255,58,14,0.3)' }}
          >{`:root {
  --color-primary: #...;
  --color-secondary: #...;
  --font-base: 'Inter', sans-serif;
  --space-4: 1rem;
}`}</pre>
        </div>

        <div
          className="p-4"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
        >
          <code className="block text-xs" style={{ fontFamily: MONO, color: ACCENT }}>
            docs/design-system/tailwind.tokens.js
          </code>
          <p className="mt-1 text-sm text-white/55">
            Objeto JavaScript para o{' '}
            <code className="text-xs" style={{ fontFamily: MONO }}>tailwind.config.js</code> —
            suas cores e fontes viram classes Tailwind.
          </p>
          <pre
            className="mt-3 p-3 text-xs"
            style={{ fontFamily: MONO, background: '#111', color: 'rgba(255,255,255,0.6)', borderLeft: '2px solid rgba(255,58,14,0.3)' }}
          >{`module.exports = {
  theme: {
    extend: {
      colors: { primary: 'var(--color-primary)' },
      fontFamily: { base: 'var(--font-base)' },
    }
  }
}`}</pre>
        </div>
      </div>

      <Callout>
        Em 5 minutos, sua marca pessoal virou código pronto para usar em qualquer projeto. Os tokens
        são semânticos — se você mudar a cor primária, tudo atualiza de uma vez.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
