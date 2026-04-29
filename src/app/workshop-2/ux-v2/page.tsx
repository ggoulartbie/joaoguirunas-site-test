import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 08 — UX Redesign | Workshop 2',
  description: 'O Designer UX recebe o código do handoff e reconstrói a LP com os componentes do Claude Design — Versão 2.',
  alternates: { canonical: '/workshop-2/ux-v2' },
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

const PROMPT = `Você é o mesmo especialista sênior em UX da sessão anterior. Criou a Versão 1 usando apenas os tokens de design. Agora chegou o handoff do Claude Design com os componentes visuais.

TAREFA: Criar a Versão 2 da landing page — pós Claude Design.

═══════════════════════════════
COLE O CÓDIGO DO HANDOFF AQUI:
(CSS + HTML dos componentes gerados pelo Claude Design)
═══════════════════════════════



═══════════════════════════════

TAMBÉM LEIA:
- docs/brand-brief.md
- docs/pages/page-ux-v1.html (sua Versão 1 — use como referência de estrutura)

═══════════════════════════════
INSTRUÇÕES:
═══════════════════════════════
1. Mantenha EXATAMENTE a mesma estrutura de UX da V1
   - Mesmas 3 seções (Hero / Proposta de Valor / CTA Final)
   - Mesma lógica de jornada e hierarquia
   - Mesmo copy (ou variação mínima)

2. Substitua os elementos visuais pelos componentes do handoff
   - Use o botão do handoff — não crie um novo
   - Use os cards para a proposta de valor
   - Aplique tipografia e espaçamento do KV

3. Não invente novos estilos — apenas handoff + CSS vars existentes

SALVE EM: docs/pages/page-ux-v2.html

═══════════════════════════════
AO FINAL — REGISTRE NA SMART-MEMORY E EXIBA COMPARAÇÃO:
═══════════════════════════════

1. Atualize docs/smart-memory/shared-context.md:
   - Fase atual: UX V2 concluída — LP recriada com componentes do Claude Design
   - Próxima ação: publicar ambas as versões em URLs públicas → devops-url

2. Crie docs/smart-memory/project/lp-comparison.md:

---
title: Comparação V1 → V2
tipo: análise
status: concluído
---

# Comparação Landing Page V1 → V2

## O que permaneceu (UX)
- Mesma estrutura de 3 seções: Hero / Proposta de Valor / CTA Final
- Mesmo copy (ou variação mínima)
- Mesma ordem de convencimento e hierarquia

## O que mudou (vocabulário visual)
[2-3 bullets: botão, card, tipografia — o que ficou diferente com o sistema]

## Avaliação
**V1:** [1 linha — ponto forte e limitação]
**V2:** [1 linha — ponto forte e limitação]
**Conclusão:** [1 linha — o que o sistema de design adicionou]

→ V1: [[lp-v1]] · Componentes: [[components]] · Deploy: [[../stories/BACKLOG]]

3. Exiba no terminal:
## Comparação V1 → V2

**O que mudou visualmente:** [máx 2 linhas]
**O que permaneceu igual (UX):** [máx 2 linhas]
**Recomendação:** [1 linha — qual versão e por quê]`;

export default function UxV2Page() {
  return (
    <WorkshopPhaseLayout slug="ux-v2">
      <FacilitatorNote duration="10 min">
        O UX agent vai receber o código que o Claude Code implementou do handoff e recriar a LP. A instrução central: mesma estrutura de jornada, mesmo copy — só os elementos visuais mudam. Esse contraste explícito (estrutura permanece, vocabulário visual muda) é o argumento mais forte do workshop.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Designer UX recebe o código implementado pelo Claude Code a partir do handoff do Claude Design. Com os componentes reais em mãos, ele reconstrói a landing page mantendo exatamente a mesma estrutura de jornada da Versão 1 — mas agora com o vocabulário visual do KV.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 08 de 10
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">Designer UX — Versão 2</strong>
        <span className="ml-2 text-sm text-white/50">— mesma jornada, componentes do Claude Design</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <p className="mb-3 text-sm text-white/60">
        Cole o prompt abaixo. No placeholder indicado, cole o CSS + HTML que o Claude Code implementou do handoff (o código que foi gerado na fase anterior ao executar o comando com a URL do Claude Design).
      </p>
      <CodeBlock label="claude code — ux v2">{PROMPT}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que vai mudar vs. o que vai ficar</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2 text-white/35" style={{ fontFamily: MONO }}>Permanece igual</p>
          <ul className="space-y-1.5 text-sm text-white/60">
            {['Estrutura de 3 seções', 'Ordem de convencimento', 'Copy do hero e CTA', 'Decisões de hierarquia'].map(i => (
              <li key={i} className="flex gap-2"><span style={{ color: ACCENT }}>✓</span>{i}</li>
            ))}
          </ul>
        </div>
        <div className="p-4" style={{ border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.03)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: MONO, color: ACCENT }}>Muda</p>
          <ul className="space-y-1.5 text-sm text-white/60">
            {['Botão — componente do handoff', 'Cards — componente do handoff', 'Tipografia — escala do KV', 'Consistência visual — sistema real'].map(i => (
              <li key={i} className="flex gap-2"><span style={{ color: ACCENT }}>→</span>{i}</li>
            ))}
          </ul>
        </div>
      </div>

      <Callout label="A camada que o Claude Design adiciona">
        A V1 era uma boa LP. A V2 é a mesma LP com um sistema visual por trás. O botão não é mais um elemento criado ad-hoc — é um componente com regras de hover, estado disabled, espaçamento definido. O card tem raio de borda derivado do <InlineCode>{'var(--radius-md)'}</InlineCode>. A consistência não é resultado de revisão manual — é resultado de usar o sistema.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
