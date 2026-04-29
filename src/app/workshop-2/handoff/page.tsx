import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 06 — Handoff | Workshop 2',
  description: 'Dois handoffs: Claude Code → Claude Design (KV visual) → Claude Code. O UX agent cria a LP antes e depois — compare as duas versões.',
  alternates: { canonical: '/workshop-2/handoff' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
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

function HandoffArrow({ label, direction }: { label: string; direction: '→' | '←' }) {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1" style={{ background: 'rgba(255,58,14,0.3)' }} />
      <div className="flex items-center gap-2 px-4 py-2 font-mono text-[11px] tracking-[0.15em] uppercase font-bold" style={{ fontFamily: MONO, color: ACCENT, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)' }}>
        {direction === '←' && <span className="text-base">{direction}</span>}
        {label}
        {direction === '→' && <span className="text-base">{direction}</span>}
      </div>
      <div className="h-px flex-1" style={{ background: 'rgba(255,58,14,0.3)' }} />
    </div>
  );
}

const PROMPT_UX_V1 = `Assuma o papel de especialista sênior em UX Design. Você pensa em jornada do usuário, hierarquia de informação e objetivos de conversão — antes de pensar em estética.

TAREFA: Criar a Versão 1 da landing page de apresentação pessoal.
Você ainda não viu o output visual do Claude Design. Trabalhe apenas com o que existe na pasta.

═══════════════════════════════
LEIA ANTES DE COMEÇAR:
═══════════════════════════════
- docs/brand-brief.md          → identidade: nome, área, personalidade, cor, referência visual
- docs/design-system/tokens.md → tokens de design completos
- docs/design-system/design-system.css → CSS custom properties (use APENAS essas vars)

═══════════════════════════════
ESTRUTURA DA LP (decisão de jornada):
═══════════════════════════════
1. HERO
   - Nome em destaque
   - Área de atuação (subtítulo)
   - Tagline: 1 frase derivada dos adjetivos do brief
   - Botão CTA

2. PROPOSTA DE VALOR
   - 3 blocos, um por adjetivo da marca
   - Título: o adjetivo  |  Corpo: o que significa na prática

3. CTA FINAL
   - Frase diferente do hero (não repetir)
   - Botão ou link de ação

═══════════════════════════════
REGRAS TÉCNICAS:
═══════════════════════════════
- Use EXCLUSIVAMENTE as CSS vars do design-system.css (zero valores hardcoded)
- HTML semântico: <header>, <main>, <section>, <footer>
- CSS no <style> do <head> — sem frameworks, sem CDN
- Responsivo com media query simples (breakpoint: 768px)
- Em cada seção, comentário <!-- UX: decisão --> explicando a escolha

SALVE EM: docs/pages/page-ux-v1.html

Esta é a Versão 1 — pré Claude Design.
Depois do handoff você receberá os componentes visuais para criar a Versão 2.`;

const PROMPT_KV = `Tenho os arquivos do meu design system pessoal nesta pasta. Leia:
- docs/design-system/tokens.md (tokens de design completos)
- docs/design-system/design-system.css (CSS custom properties)
- docs/brand-brief.md (personalidade da marca)

Com base nesses arquivos, crie um KV (key-value design system) visual com:
- Paleta de cores como swatches com hex e nomes semânticos
- Escala tipográfica com preview de texto real em cada tamanho
- Botão primário (default + hover + disabled)
- Card com título, descrição e CTA
- Input de texto com label e placeholder
- Badge / pill em variações (default, success, warning, error)

Mantenha consistência com a personalidade da marca descrita no brief.`;

const PROMPT_REFINE = `Ajuste o botão para parecer mais [adjetivo da marca].
Tente: menos arredondado / mais ousado / mais minimalista`;

const PROMPT_IMPLEMENT = `Fetch this design file, read its readme, and implement the relevant aspects of the design.
https://api.anthropic.com/v1/design/h/[COLE-A-URL-DO-CLAUDE-DESIGN-AQUI]

Implement: the designs in this project`;

const PROMPT_UX_V2 = `Você é o mesmo especialista sênior em UX da sessão anterior. Criou a Versão 1 usando apenas os tokens. Agora chegou o handoff do Claude Design com os componentes visuais.

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
   - Use os cards do handoff para a proposta de valor
   - Aplique tipografia e espaçamento do KV

3. Não invente novos estilos — apenas handoff + CSS vars existentes

SALVE EM: docs/pages/page-ux-v2.html

═══════════════════════════════
AO FINAL, ESCREVA NO TERMINAL:
═══════════════════════════════
## Comparação V1 → V2

**O que mudou visualmente:** [máx 2 linhas]
**O que permaneceu igual (UX):** [máx 2 linhas]
**Recomendação:** [1 linha — qual versão e por quê]`;

export default function HandoffPage() {
  return (
    <WorkshopPhaseLayout slug="handoff">
      <FacilitatorNote duration="25 min">
        Este é o clímax — dois handoffs e duas versões da mesma LP. Abra o Claude Design e o Claude Code lado a lado antes de começar. O momento de comparação V1 vs V2 no final é o maior impacto do workshop inteiro.
      </FacilitatorNote>

      <p className="mb-6 text-base leading-relaxed text-white/70">
        Dois handoffs, duas versões da mesma landing page. O UX agent cria a LP antes de ver o Claude Design. O Claude Design cria o KV e faz handoff de volta para o Claude Code. O UX agent reconstrói com os componentes reais. A comparação final mostra o antes e depois.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        25 min · Fase 06 de 07
      </div>

      {/* ── VISÃO GERAL DO FLUXO ── */}
      <div className="mb-10 p-5" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="mb-3 font-mono text-[10px] tracking-[0.18em] uppercase text-white/35" style={{ fontFamily: MONO }}>Fluxo completo</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {[
            { label: 'UX Agent → LP V1', accent: false },
            { label: 'Handoff 1 →', accent: true },
            { label: 'Claude Design KV', accent: false },
            { label: '← Handoff 2', accent: true },
            { label: 'UX Agent → LP V2', accent: false },
            { label: 'Comparar', accent: false },
          ].map(({ label, accent }) => (
            <span key={label} className="px-2 py-1 font-bold" style={{ fontFamily: DISPLAY, background: accent ? 'rgba(255,58,14,0.12)' : 'rgba(255,255,255,0.04)', border: `1px solid ${accent ? 'rgba(255,58,14,0.4)' : 'rgba(255,255,255,0.1)'}`, color: accent ? ACCENT : 'rgba(255,255,255,0.7)' }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════
          PASSO 1 — UX Agent LP V1
      ════════════════════════════════ */}
      <div className="mb-1 flex items-center gap-3">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.12)' }}>Antes</span>
        <h2 className="text-xl font-bold text-white">UX Agent — Versão 1 <span className="text-sm font-normal text-white/40">pré Claude Design</span></h2>
      </div>
      <p className="mb-4 text-xs text-white/35 font-mono" style={{ fontFamily: MONO }}>Plataforma: Claude Code — terminal</p>

      <FacilitatorNote>
        Rode isso primeiro — antes de abrir o Claude Design. O agente UX vai criar a landing page só com o que os agentes geraram até agora: brief, tokens e CSS vars. Nenhum componente visual ainda.
      </FacilitatorNote>

      <Step n={1} label="Criar a LP V1 — só com brand identity">
        Cole no Claude Code:
        <CodeBlock label="claude code — ux v1">{PROMPT_UX_V1}</CodeBlock>
        <p className="mt-2 text-white/50">Salva em <InlineCode>docs/pages/page-ux-v1.html</InlineCode>. Abra no browser para ver — esta é a baseline.</p>
      </Step>

      <HandoffArrow label="Handoff 1 — Claude Code → Claude Design" direction="→" />

      {/* ════════════════════════════════
          HANDOFF 1 — Claude Design KV
      ════════════════════════════════ */}
      <div className="mb-1 flex items-center gap-3">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: 'rgba(255,58,14,0.12)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)' }}>Handoff 1</span>
        <h2 className="text-xl font-bold text-white">Claude Design — criar o KV visual</h2>
      </div>
      <p className="mb-4 text-xs text-white/35 font-mono" style={{ fontFamily: MONO }}>Plataforma: claude.ai/design — browser</p>

      <Step n={2} label="Abrir a pasta do projeto no Claude Design">
        Vá para <InlineCode>claude.ai/design</InlineCode>, clique em <strong className="text-white">Open Folder</strong> e selecione <InlineCode>~/Desktop/meu-design-workshop</InlineCode>.
        <p className="mt-2 text-white/50">O Claude Design lê todos os arquivos que os agentes criaram — brief, tokens, CSS. Este é o primeiro handoff: o output do Claude Code alimenta o Claude Design.</p>
      </Step>

      <Step n={3} label="Criar o KV visual">
        <CodeBlock label="prompt — claude design">{PROMPT_KV}</CodeBlock>
      </Step>

      <Step n={4} label="Refinar os componentes">
        <CodeBlock label="refinamento">{PROMPT_REFINE}</CodeBlock>
      </Step>

      <HandoffArrow label="Handoff 2 — Claude Design → Claude Code" direction="←" />

      {/* ════════════════════════════════
          HANDOFF 2 — URL → Claude Code
      ════════════════════════════════ */}
      <div className="mb-1 flex items-center gap-3">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: 'rgba(255,58,14,0.12)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)' }}>Handoff 2</span>
        <h2 className="text-xl font-bold text-white">
          Claude Design → Claude Code
          <span className="ml-2 text-sm font-normal" style={{ color: ACCENT }}>← WOW</span>
        </h2>
      </div>
      <p className="mb-4 text-xs text-white/35 font-mono" style={{ fontFamily: MONO }}>Plataforma: Claude Code — volte ao terminal</p>

      <FacilitatorNote>
        <em>&ldquo;O Claude Design tem um botão nativo de handoff — ele empacota tudo, gera uma URL, e o Claude Code sabe exatamente o que fazer com ela.&rdquo;</em> Mostre ao vivo: clique no botão, copie a URL, cole no terminal. Depois o UX agent usa esse código para a Versão 2.
      </FacilitatorNote>

      <Step n={5} label="Gerar a URL de handoff no Claude Design">
        Clique no botão{' '}
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold" style={{ background: 'rgba(255,58,14,0.15)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)', fontFamily: DISPLAY }}>
          Share / Handoff to Claude Code
        </span>{' '}
        no Claude Design.
        <p className="mt-2 text-white/50">Gera uma URL no formato <InlineCode>api.anthropic.com/v1/design/h/[ID]</InlineCode>. Copie.</p>
      </Step>

      <Step n={6} label="Implementar no Claude Code">
        <CodeBlock label="claude code">{PROMPT_IMPLEMENT}</CodeBlock>
        <p className="mt-2 text-white/50">O Claude Code busca o arquivo de design e implementa os componentes no projeto usando as CSS vars existentes.</p>
      </Step>

      {/* ════════════════════════════════
          UX Agent LP V2
      ════════════════════════════════ */}
      <div className="mt-10 mb-1 flex items-center gap-3">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: 'rgba(255,58,14,0.12)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)' }}>Depois</span>
        <h2 className="text-xl font-bold text-white">UX Agent — Versão 2 <span className="text-sm font-normal text-white/40">pós Claude Design</span></h2>
      </div>
      <p className="mb-4 text-xs text-white/35 font-mono" style={{ fontFamily: MONO }}>Plataforma: Claude Code — mesmo terminal</p>

      <Step n={7} label="Criar a LP V2 — com os componentes do handoff">
        Cole o prompt abaixo. Onde indicado, cole o código que o Claude Code implementou do handoff:
        <CodeBlock label="claude code — ux v2">{PROMPT_UX_V2}</CodeBlock>
        <p className="mt-2 text-white/50">Salva em <InlineCode>docs/pages/page-ux-v2.html</InlineCode>.</p>
      </Step>

      <Step n={8} label="Comparar as duas versões">
        <CodeBlock label="terminal">open docs/pages/page-ux-v1.html docs/pages/page-ux-v2.html</CodeBlock>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="p-3" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <strong className="block text-xs text-white mb-1">V1 — pré Claude Design</strong>
            <p className="text-xs text-white/50">UX agent interpreta livremente com só tokens. Sem componentes definidos — ele inventa a linguagem visual.</p>
          </div>
          <div className="p-3" style={{ border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.03)' }}>
            <strong className="block text-xs mb-1" style={{ color: ACCENT }}>V2 — pós Claude Design</strong>
            <p className="text-xs text-white/50">Mesma jornada, mesmo copy — mas com os componentes visuais do KV. O sistema de design torna a V2 mais consistente.</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-white/40">Para a turma: o que mudou? A lógica de UX ficou igual? Qual versão você escolheria?</p>
      </Step>

      <Callout label="O que os dois handoffs demonstram">
        O primeiro handoff (Code → Design) mostrou que o Claude Design não precisa de briefing — ele leu a pasta. O segundo handoff (Design → Code) mostrou que o Claude Code não precisa de instruções manuais — ele leu a URL. Entre os dois, o UX agent mostrou que estrutura de jornada e vocabulário visual são camadas independentes: a V1 e a V2 têm a mesma lógica, com sistemas visuais diferentes.
      </Callout>

      {/* ── FECHAMENTO ── */}
      <div className="mt-12 p-6" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="mb-4 text-sm text-white/40 font-mono tracking-[0.12em] uppercase" style={{ fontFamily: MONO }}>Pipeline completo</p>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
          {[
            { label: 'Analista', hl: false },
            { label: '→', hl: false, arrow: true },
            { label: 'Arquiteto', hl: false },
            { label: '→', hl: false, arrow: true },
            { label: 'Designer', hl: false },
            { label: '→', hl: false, arrow: true },
            { label: 'Dev', hl: false },
            { label: '→ Handoff 1 →', hl: true, arrow: true },
            { label: 'Claude Design', hl: true },
            { label: '← Handoff 2 ←', hl: true, arrow: true },
            { label: 'UX Agent V2', hl: true },
          ].map(({ label, hl, arrow }, i) => (
            arrow
              ? <span key={i} className="font-bold text-[11px]" style={{ color: ACCENT, fontFamily: MONO }}>{label}</span>
              : <span key={i} className="px-2 py-1 font-bold" style={{ fontFamily: DISPLAY, background: hl ? 'rgba(255,58,14,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hl ? 'rgba(255,58,14,0.3)' : 'rgba(255,255,255,0.1)'}`, color: hl ? ACCENT : 'rgba(255,255,255,0.7)' }}>{label}</span>
          ))}
        </div>
        <p className="mt-6 text-2xl font-light italic leading-snug text-white" style={{ fontFamily: SERIF }}>
          Dois handoffs.{' '}
          <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: ACCENT }}>
            Uma marca. Você escolhe a versão.
          </span>
        </p>
      </div>
    </WorkshopPhaseLayout>
  );
}
