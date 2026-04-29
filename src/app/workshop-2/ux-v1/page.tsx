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

const PROMPT = `Assuma o papel de especialista sênior em UX Design. Você pensa em jornada do usuário, hierarquia de informação e objetivos de conversão — antes de pensar em estética.

TAREFA: Criar a Versão 1 da landing page de apresentação pessoal.
Você ainda não viu o output visual do Claude Design. Trabalhe apenas com o que existe na pasta.

═══════════════════════════════
LEIA ANTES DE COMEÇAR:
═══════════════════════════════
- docs/brand-brief.md           → identidade: nome, área, personalidade, cor, referência visual
- docs/design-system/tokens.md  → tokens de design completos
- docs/design-system/design-system.css → CSS custom properties (use APENAS essas vars)

═══════════════════════════════
ESTRUTURA DA LP (decisão de jornada, não de estética):
═══════════════════════════════
1. HERO
   - Nome em destaque (heading principal)
   - Área de atuação (subtítulo)
   - Tagline: 1 frase derivada dos adjetivos do brief
   - Botão CTA principal

2. PROPOSTA DE VALOR
   - 3 blocos, um por adjetivo da marca
   - Título: o adjetivo | Corpo: o que significa na prática para quem contrata

3. CTA FINAL
   - Frase de reforço diferente do hero (não repetir)
   - Botão ou link de ação

═══════════════════════════════
REGRAS TÉCNICAS:
═══════════════════════════════
- Use EXCLUSIVAMENTE as CSS vars do design-system.css (zero valores hardcoded)
- HTML semântico: <header>, <main>, <section aria-label="…">, <footer>
- CSS no <style> dentro do <head> — sem frameworks, sem CDN externo
- Responsivo com media query simples (breakpoint: 768px)
- Em cada seção, adicione <!-- UX: [decisão] --> explicando a escolha estrutural

SALVE EM: docs/pages/page-ux-v1.html

Esta é a Versão 1 — pré Claude Design.
Depois do handoff você vai receber os componentes visuais para criar a Versão 2.`;

export default function UxV1Page() {
  return (
    <WorkshopPhaseLayout slug="ux-v1">
      <FacilitatorNote duration="10 min">
        Este agente cria a LP sem ver o Claude Design. É a interpretação pura do UX agent com base em tokens e brand-brief — sem componentes visuais definidos, sem KV, sem guia de estilo. Guarde a impressão visual desta versão: o contraste com a V2 no final é o argumento mais forte do workshop.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Designer UX cria a primeira versão da landing page antes de qualquer intervenção visual do Claude Design. Ele lê o brand-brief e os tokens que o Arquiteto gerou, toma decisões de jornada e entrega um HTML completo. Sem componentes definidos — ele inventa a linguagem visual com o que tem.
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
      <div className="space-y-2">
        {[
          { file: 'docs/pages/page-ux-v1.html', desc: 'Landing page completa — HTML + CSS inline, responsiva, sem dependências externas.' },
        ].map((item) => (
          <div key={item.file} className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <InlineCode>{item.file}</InlineCode>
            <p className="mt-2 text-sm text-white/55">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4" style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="mb-2 font-mono text-[10px] tracking-[0.15em] uppercase text-white/35" style={{ fontFamily: MONO }}>Estrutura da landing page</p>
        <ol className="space-y-2 text-sm text-white/60">
          {[
            'Hero — nome, área, tagline derivada do brief, botão CTA',
            'Proposta de valor — 3 blocos, um por adjetivo da marca',
            'CTA final — frase de reforço + ação',
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
