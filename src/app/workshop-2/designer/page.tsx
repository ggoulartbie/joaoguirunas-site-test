import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 04 — Designer | Workshop 2',
  description: 'O agente Design System (Brad Frost) cria os tokens de design da sua marca.',
  alternates: { canonical: '/workshop-2/designer' },
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
        Dica
      </span>
      {children}
    </div>
  );
}

const PROMPT = `/design-system

## Mission: setup

Leia docs/brand-brief.md e docs/smart-memory/project/brand-tokens.md.

Crie docs/design-system/tokens.md com:
- Paleta de cores (primária, secundária, neutros, semânticas: success/warning/error)
- Escala tipográfica (font-family, sizes: xs/sm/base/lg/xl/2xl/3xl)
- Espaçamentos (4px base, escala 4/8/12/16/24/32/48/64)
- Border-radius (sm/md/lg/full)
- Sombras (sm/md/lg)

Baseie tudo na cor principal e personalidade da marca do brief.`;

export default function DesignerPage() {
  return (
    <WorkshopPhaseLayout slug="designer">
      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Design System — inspirado em Brad Frost e Atomic Design — lê o brief e os
        brand-tokens, depois gera um{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs" style={{ fontFamily: MONO }}>
          tokens.md
        </code>{' '}
        completo: paleta, tipografia, espaçamentos, border-radius e sombras derivados da sua marca
        pessoal.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        10 min · Fase 04 de 07
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
        <strong className="text-base text-white">@design-system</strong>
        <span className="ml-2 text-sm text-white/50">— missão: setup + tokenize</span>
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock>{PROMPT}</CodeBlock>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">O que o arquivo tokens.md contém</h2>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          { label: 'Paleta de cores', desc: 'Primária, secundária, neutros, semânticas (success/warning/error)' },
          { label: 'Escala tipográfica', desc: 'Família, pesos e sizes de xs a 3xl — baseados na personalidade da marca' },
          { label: 'Espaçamentos', desc: 'Base 4px, escala: 4/8/12/16/24/32/48/64' },
          { label: 'Border-radius e sombras', desc: 'sm/md/lg/full — e sombras consistentes para depth' },
        ].map((item) => (
          <div
            key={item.label}
            className="p-4"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
          >
            <strong className="block text-sm text-white">{item.label}</strong>
            <p className="mt-1 text-xs text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <Callout>
        Brad Frost (Atomic Design) é o mentor deste agente — ele pensa em sistemas, não em peças
        isoladas. Cada token gerado aqui vai ser convertido em código real na próxima fase.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
