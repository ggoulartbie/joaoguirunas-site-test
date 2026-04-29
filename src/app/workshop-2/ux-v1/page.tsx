import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 04 — Designer UX | Workshop 2',
  description: 'O Designer UX cria a Versão 1 da landing page — antes do Claude Design, só com brand identity e tokens.',
  alternates: { canonical: '/workshop-2/ux-v1' },
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

const PROMPT = `Assuma o papel de especialista sênior em UX Design e desenvolvimento frontend. Você pensa em jornada do usuário, hierarquia de informação e conversão — e você implementa com qualidade de produção.

TAREFA: Criar a Versão 1 da landing page de apresentação pessoal.
Você ainda não viu o output visual do Claude Design. Trabalhe apenas com o que existe na pasta.

═══════════════════════════════
LEIA ANTES DE COMEÇAR:
═══════════════════════════════
- docs/brand-brief.md
  → USE o copy de base já escrito: headline, subtítulo, tagline, CTA
  → USE os adjetivos de personalidade como títulos de cada bloco
  → USE o público-alvo para calibrar o tom dos textos
- docs/design-system/tokens.md  → paleta completa, escala tipográfica, espaçamentos
- docs/design-system/design-system.css → USE APENAS essas CSS vars, zero hardcode

═══════════════════════════════
ESTRUTURA COMPLETA DA PÁGINA:
═══════════════════════════════

NAV (fixo no topo, 64px de altura)
- Logo: [nome do brief] em --text-lg, peso 700
- Links: "Sobre" "Trabalho" "Contato" — alinhados à direita
- Background: var(--color-bg) com blur sutil ao rolar (backdrop-filter: blur(12px))
- Border-bottom: 1px solid var(--color-border)

HERO (min-height: 100vh, centralizado vertical e horizontal)
- Eyebrow: tagline curta do brief em --text-xs, tracking largo, cor var(--color-primary)
- H1: headline do brief — --text-4xl (desktop) / --text-3xl (mobile), peso 700, line-height: 1.1
- Subtítulo: subtítulo do brief — --text-lg, var(--color-text-muted), max-width: 520px
- Botão CTA: texto do CTA do brief
  · padding: 14px 32px, background: var(--color-primary), cor: #fff ou #000 (o que tiver mais contraste)
  · border-radius: var(--radius-md), font-weight: 600
  · hover: background var(--color-primary-hover), transform: translateY(-1px)
  · transition: all 0.2s ease
- Detalhe visual: linha ou shape decorativo usando var(--color-primary) com baixa opacidade

PROPOSTA DE VALOR (padding: var(--space-16) 0)
- Heading da seção: "Por que [nome]?" em --text-2xl
- Grid de 3 cards (desktop: 3 colunas / mobile: 1 coluna)
- Cada card:
  · background: var(--color-surface)
  · border: 1px solid var(--color-border)
  · border-radius: var(--radius-lg)
  · padding: var(--space-8)
  · hover: border-color var(--color-primary), box-shadow: var(--shadow-md), transform: translateY(-2px)
  · transition: all 0.25s ease
  · Número de ordem (01, 02, 03) em --text-xs, var(--color-primary), font-weight: 700
  · Título: adjetivo da marca em --text-xl, peso 700
  · Corpo: o que esse adjetivo significa para quem contrata — 2-3 frases diretas, no tom de voz do brief

SOBRE (padding: var(--space-12) 0, layout de 2 colunas no desktop)
- Coluna esquerda: diferencial em destaque — --text-2xl, peso 300 (light italic)
- Coluna direita: 2-3 parágrafos de posicionamento do brief + lista de entregas concretas
  · Cada item da lista com → var(--color-primary) como bullet

CTA FINAL (padding: var(--space-16) 0, texto centralizado)
- Background: var(--color-surface), border-top e border-bottom: 1px solid var(--color-border)
- Headline diferente do hero — ênfase na ação do visitante
- Botão idêntico ao do hero + link de texto secundário abaixo ("Ver meu trabalho →")

FOOTER (padding: var(--space-8) 0)
- [Nome] · [Área] · © 2026
- Border-top: 1px solid var(--color-border)

═══════════════════════════════
REGRAS TÉCNICAS OBRIGATÓRIAS:
═══════════════════════════════
- Zero valores hardcoded — APENAS CSS vars do design-system.css
- HTML semântico: <nav>, <header>, <main>, <section aria-labelledby="…">, <footer>
- Google Font do tokens.md: importe via <link> no <head>
- Responsivo: breakpoints em 768px e 1024px com media queries
- Scroll suave: scroll-behavior: smooth no <html>
- Sem frameworks, sem CDN externo (só a Google Font)
- Todo o CSS no <style> dentro do <head>
- Em cada seção principal, adicione <!-- UX: [decisão tomada] --> explicando o porquê

═══════════════════════════════
SALVE EM: docs/pages/page-ux-v1.html
═══════════════════════════════

═══════════════════════════════
AO FINAL — REGISTRE NA SMART-MEMORY:
═══════════════════════════════

1. Atualize docs/smart-memory/shared-context.md:
   - Fase atual: UX V1 concluída — LP completa com nav, hero, proposta, sobre, CTA, footer
   - Próxima ação: ver no browser → localhost:4321/page-ux-v1.html → ir ao Claude Design

2. Crie docs/smart-memory/project/lp-v1.md:

---
title: Landing Page V1
tipo: entregável
status: concluído
fase: ux-v1
---

# Landing Page V1 — Pré Claude Design

## Decisões de UX
[3-5 bullets: por que essa hierarquia, por que esse copy, por que essa ordem]

## Copy usado
- **Headline:** [headline real usada]
- **Subtítulo:** [subtítulo real]
- **CTA:** [texto do botão]

## Limitações desta versão
Sem sistema de componentes definido — botão, card e hover foram criados
livremente com as CSS vars disponíveis. A V2 vai usar os componentes reais do Claude Design.

→ Brand tokens: [[brand-tokens]] · Design system: [[../design-system]] · V2: [[lp-v2]]`;

export default function UxV1Page() {
  return (
    <WorkshopPhaseLayout slug="ux-v1">
      <FacilitatorNote duration="10 min">
        Este agente cria a LP sem ver o Claude Design. É a interpretação pura do UX agent com base em tokens e brand-brief — sem componentes visuais definidos, sem KV, sem guia de estilo. Guarde a impressão visual desta versão: o contraste com a V2 no final é o argumento mais forte do workshop.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Designer UX cria a primeira versão da landing page antes de qualquer intervenção visual do Claude Design. Lê o brand-brief — incluindo o copy de base já escrito pelo Analista — e os tokens que o Arquiteto gerou. Entrega uma página completa: nav, hero, proposta de valor, sobre, CTA e footer. Sem componentes definidos — ele constrói a linguagem visual com as CSS vars e as decisões que julgar melhores.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 04 de 10
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">Designer UX</strong>
        <span className="ml-2 text-sm text-white/50">— jornada do usuário, hierarquia, conversão</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock label="claude code">{PROMPT}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que o agente vai produzir</h2>
      <div className="space-y-2 mb-6">
        {[
          { file: 'docs/pages/page-ux-v1.html', desc: 'Página completa com nav, hero, proposta de valor, sobre, CTA final e footer — responsiva, HTML + CSS, sem frameworks.' },
          { file: 'docs/smart-memory/project/lp-v1.md', desc: 'Registro das decisões de UX com wikilinks para os tokens e para a futura V2.' },
        ].map((item) => (
          <div key={item.file} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <InlineCode>{item.file}</InlineCode>
            <p className="mt-2 text-sm text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="mb-3 font-mono text-[10px] tracking-[0.15em] uppercase text-white/35" style={{ fontFamily: MONO }}>Estrutura da landing page</p>
        <ol className="space-y-2 text-sm text-white/60">
          {[
            'Nav fixo — logo, links, blur ao rolar',
            'Hero (100vh) — eyebrow, headline, subtítulo, CTA com hover state',
            'Proposta de valor — grid de 3 cards com hover elevation',
            'Sobre — 2 colunas: destaque do diferencial + posicionamento',
            'CTA final — headline diferente do hero + botão',
            'Footer — nome, área, ano',
          ].map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="font-bold text-[10px] mt-0.5" style={{ color: ACCENT, fontFamily: MONO }}>{String(i + 1).padStart(2, '0')}</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </div>

      <Callout label="Versão 1 — a baseline">
        Esta é a interpretação livre do UX agent. Ele não tem um guia de componentes — vai criar botões, cards e layouts com as CSS vars disponíveis, da forma que julgar mais adequada. Na Fase 08, depois do handoff do Claude Design, ele vai refazer a mesma LP com os componentes reais. A comparação vai ser o argumento mais forte do workshop.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
