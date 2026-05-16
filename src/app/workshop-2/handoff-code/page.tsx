export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 07 — Handoff → Code | Workshop 2',
  description: 'Usar o botão Handoff to Claude Code do Claude Design para implementar os componentes automaticamente.',
  alternates: { canonical: '/workshop-2/handoff-code' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

function Step({ n, label, children }: { n: number; label?: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-5 border-b border-white/[0.06] last:border-0">
      <span className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center text-[11px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.06)' }}>{n}</span>
      <div className="text-sm leading-relaxed text-white/75 flex-1">
        {label && <strong className="block text-white mb-1">{label}</strong>}
        {children}
      </div>
    </div>
  );
}

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const PROMPT_IMPLEMENT = `Fetch this design file, read its readme, and implement the relevant aspects of the design.
https://api.anthropic.com/v1/design/h/[COLE-A-URL-DO-CLAUDE-DESIGN-AQUI]

Implement: the designs in this project

═══════════════════════════════
AO FINAL — REGISTRE NA SMART-MEMORY:
═══════════════════════════════

1. Atualize docs/smart-memory/shared-context.md:
   - Handoff Code concluído — componentes implementados a partir do Claude Design
   - Próxima ação: UX agent recria LP com componentes reais → [[project/lp-v2]]

2. Crie docs/smart-memory/project/components.md:

---
title: Componentes do Design System
tipo: referência
status: implementado
origem: Claude Design handoff
---

# Componentes — [nome]

## Implementados via handoff

### Botão primário
- Estados: default · hover · disabled
- Variável base: var(--color-primary)

### Card
- Estrutura: título + descrição + CTA
- Raio: var(--radius-md)

### Input de texto
- Com label e placeholder
- Estado: default · focus · error

### Badge / Pill
- Variações: default · success · warning · error

## Como usar
Esses componentes usam exclusivamente as CSS vars do design-system.css.
Não duplique valores — altere só as vars.

→ Tokens: [[brand-tokens]] · CSS: [[design-system]] · LP V2: [[lp-v2]]`;

export default function HandoffCodePage() {
  return (
    <WorkshopPhaseLayout slug="handoff-code">
      <FacilitatorNote duration="5 min">
        Este é o Handoff 2 — o WOW do workshop. Mostre ao vivo: clique no botão no Claude Design, copie a URL, cole no terminal. O Claude Code vai buscar o arquivo de design e implementar tudo automaticamente. A frase que funciona: <em>&ldquo;O Claude Design não precisa explicar para o Claude Code — ele lê a URL.&rdquo;</em>
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Claude Design tem um botão nativo de handoff: ele empacota o KV visual, as especificações dos componentes e um README de implementação, e gera uma URL. O Claude Code recebe essa URL e implementa os componentes direto no projeto — sem copiar CSS manualmente, sem reexplicar nada.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        5 min · Fase 07 de 10
      </div>

      <div className="mb-8 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Handoff 2 ← WOW</span>
        <strong className="text-base text-white" style={{ fontFamily: DISPLAY }}>Claude Design → Claude Code</strong>
        <span className="ml-2 text-sm text-white/50">— URL gerada pelo botão nativo de handoff</span>
      </div>

      <Step n={1} label="Gerar a URL de handoff no Claude Design">
        No Claude Design, clique no botão{' '}
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold" style={{ background: 'rgba(255,58,14,0.15)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)', fontFamily: DISPLAY }}>
          Share / Handoff to Claude Code
        </span>
        <p className="mt-2 text-white/50">
          Gera uma URL no formato <InlineCode>api.anthropic.com/v1/design/h/[ID]</InlineCode> e copia para a área de transferência.
        </p>
      </Step>

      <Step n={2} label="Implementar no Claude Code">
        Volte ao terminal com Claude Code aberto e cole:
        <CodeBlock label="claude code">{PROMPT_IMPLEMENT}</CodeBlock>
        <p className="mt-2 text-white/50">
          O Claude Code busca o arquivo de design, lê o README do handoff e implementa os componentes no projeto — usando as CSS vars que o Arquiteto criou.
        </p>
      </Step>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que é implementado</h2>
      <div className="space-y-2">
        {[
          { item: 'CSS dos componentes', desc: 'Botão, card, input, badge — usando var(--color-*), var(--radius-*), var(--shadow-*)' },
          { item: 'HTML semântico de exemplo', desc: 'Markup de referência para cada componente' },
          { item: 'COMPONENT-GUIDE.md', desc: 'Regras de uso: quando usar cada componente, variações, combinações permitidas' },
        ].map(({ item, desc }) => (
          <div key={item} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <strong className="block text-sm text-white">{item}</strong>
            <p className="mt-1 text-xs text-white/50">{desc}</p>
          </div>
        ))}
      </div>

      <Callout label="Por que funciona sem instruções manuais">
        A URL gerada pelo Claude Design não é só um link — ela aponta para um arquivo estruturado com o KV completo, as especificações dos componentes e um README com instruções de implementação. O Claude Code lê esse arquivo como lê qualquer outro contexto — e sabe exatamente o que criar, onde salvar e quais CSS vars usar.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
