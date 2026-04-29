import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 06 — Handoff | Workshop 2',
  description: 'UX Agent cria a LP V1, você vê no browser, refina no Claude Design, handoff de volta — e compara as duas versões.',
  alternates: { canonical: '/workshop-2/handoff' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

function Step({ n, label, sub, children }: { n: number; label?: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-5 border-b border-white/[0.06] last:border-0">
      <span className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center text-[11px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.06)' }}>{n}</span>
      <div className="text-sm leading-relaxed text-white/75 flex-1">
        {label && (
          <div className="flex items-baseline gap-2 mb-1">
            <strong className="text-white">{label}</strong>
            {sub && <span className="text-xs text-white/35">{sub}</span>}
          </div>
        )}
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

function SectionHeader({ badge, badgeAccent = false, title, platform }: { badge: string; badgeAccent?: boolean; title: React.ReactNode; platform: string }) {
  return (
    <div className="mt-12 mb-1">
      <div className="flex items-center gap-3 mb-1">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: badgeAccent ? 'rgba(255,58,14,0.12)' : 'rgba(255,255,255,0.06)', color: badgeAccent ? ACCENT : 'rgba(255,255,255,0.45)', border: `1px solid ${badgeAccent ? 'rgba(255,58,14,0.3)' : 'rgba(255,255,255,0.12)'}` }}>{badge}</span>
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-xs text-white/30 font-mono" style={{ fontFamily: MONO }}>{platform}</p>
    </div>
  );
}

function Divider({ label, direction }: { label: string; direction: '→' | '←' }) {
  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1" style={{ background: 'rgba(255,58,14,0.25)' }} />
      <div className="flex items-center gap-2 px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase font-bold" style={{ fontFamily: MONO, color: ACCENT, border: '1px solid rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.07)' }}>
        {direction === '←' && <span>{direction}</span>}
        {label}
        {direction === '→' && <span>{direction}</span>}
      </div>
      <div className="h-px flex-1" style={{ background: 'rgba(255,58,14,0.25)' }} />
    </div>
  );
}

/* ─── PROMPTS ─── */

const PROMPT_UX_V1 = `Assuma o papel de especialista sênior em UX Design. Você pensa em jornada do usuário, hierarquia de informação e objetivos de conversão — antes de pensar em estética.

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
- Em cada seção, adicione <!-- UX: [decisão] --> explicando a escolha

SALVE EM: docs/pages/page-ux-v1.html

Esta é a Versão 1 — pré Claude Design.
Depois do handoff você vai receber os componentes visuais para criar a Versão 2.`;

const PROMPT_SERVE = `npx serve docs/pages -p 4321`;

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
- docs/pages/page-ux-v1.html (sua Versão 1 — referência de estrutura)

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
   - Aplique a tipografia e espaçamento do KV

3. Não invente novos estilos — apenas handoff + CSS vars existentes

SALVE EM: docs/pages/page-ux-v2.html

═══════════════════════════════
AO FINAL, ESCREVA NO TERMINAL:
═══════════════════════════════
## Comparação V1 → V2

**O que mudou visualmente:** [máx 2 linhas]
**O que permaneceu igual (UX):** [máx 2 linhas]
**Recomendação:** [1 linha — qual versão e por quê]`;

/* ─── PAGE ─── */

export default function HandoffPage() {
  return (
    <WorkshopPhaseLayout slug="handoff">
      <FacilitatorNote duration="30 min">
        Este é o clímax — seis etapas entre terminal e browser. Prepare: Claude Code aberto no terminal, Claude Design no browser, e um segundo browser para mostrar a LP ao vivo. O momento de comparação V1 vs V2 no final é o maior impacto do workshop.
      </FacilitatorNote>

      <p className="mb-6 text-base leading-relaxed text-white/70">
        O UX agent cria a LP com a identidade de marca — você vê no browser. Depois abre o Claude Design com a mesma pasta (Handoff 1), cria e refina o KV visual, e faz o handoff de volta para o Claude Code (Handoff 2). O UX agent reconstrói com os componentes reais. Compare as duas versões ao vivo.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        30 min · Fase 06 de 07
      </div>

      {/* FLUXO VISUAL */}
      <div className="mb-10 overflow-x-auto">
        <div className="flex items-center gap-2 text-[11px] whitespace-nowrap pb-2" style={{ fontFamily: MONO }}>
          {[
            { t: 'UX V1', dim: false },
            { t: '→ serve :4321', dim: true },
            { t: 'ver no browser', dim: false },
            { t: '→ Handoff 1 →', dim: true, accent: true },
            { t: 'Claude Design', dim: false, accent: true },
            { t: 'refinar', dim: false, accent: true },
            { t: '← Handoff 2 ←', dim: true, accent: true },
            { t: 'UX V2', dim: false },
            { t: 'comparar', dim: false },
          ].map(({ t, dim, accent }, i) => (
            dim
              ? <span key={i} className="tracking-[0.12em]" style={{ color: accent ? ACCENT : 'rgba(255,255,255,0.25)' }}>{t}</span>
              : <span key={i} className="px-2 py-1 font-bold text-[10px]" style={{ fontFamily: DISPLAY, background: accent ? 'rgba(255,58,14,0.1)' : 'rgba(255,255,255,0.05)', border: `1px solid ${accent ? 'rgba(255,58,14,0.3)' : 'rgba(255,255,255,0.1)'}`, color: accent ? ACCENT : 'rgba(255,255,255,0.75)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* ════ ETAPA 1 — UX V1 ════ */}
      <SectionHeader
        badge="Etapa 1"
        title={<>UX Agent — <span className="font-normal text-white/50">Versão 1 pré Claude Design</span></>}
        platform="Plataforma: Claude Code — terminal"
      />

      <FacilitatorNote>
        Rode isso primeiro — antes de abrir o Claude Design. O agente vai criar a landing page só com brief, tokens e CSS vars. Sem componentes visuais ainda. Esse é o ponto de partida que vamos comparar no final.
      </FacilitatorNote>

      <Step n={1} label="Criar a LP V1" sub="só brand identity, sem Claude Design">
        <CodeBlock label="claude code — ux v1">{PROMPT_UX_V1}</CodeBlock>
        <p className="mt-2 text-white/50">Salva em <InlineCode>docs/pages/page-ux-v1.html</InlineCode>.</p>
      </Step>

      <Step n={2} label="Servir local para ver no browser">
        Suba um servidor local na porta 4321 para visualizar a LP:
        <CodeBlock label="terminal — novo tab">{PROMPT_SERVE}</CodeBlock>
        <p className="mt-2 text-white/50">Abra <InlineCode>localhost:4321/page-ux-v1.html</InlineCode> no browser. Esta é a Versão 1 — antes de qualquer componente do Claude Design.</p>
      </Step>

      <Callout label="Pause aqui">
        Peça para a turma olhar a LP no browser e guardar a impressão visual. Em alguns minutos o Claude Design vai transformar o vocabulário visual — e a comparação vai ser imediata.
      </Callout>

      <Divider label="Handoff 1 — Claude Code → Claude Design" direction="→" />

      {/* ════ ETAPA 2 — CLAUDE DESIGN ════ */}
      <SectionHeader
        badge="Etapa 2"
        badgeAccent
        title="Claude Design — criar o KV visual"
        platform="Plataforma: claude.ai/design — browser"
      />

      <FacilitatorNote>
        Abra o Claude Design agora. Os arquivos que os agentes criaram nas fases anteriores estão na pasta — o Claude Design vai lê-los automaticamente ao abrir. Este é o primeiro handoff: o output do Claude Code alimenta o Claude Design sem reexplicar nada.
      </FacilitatorNote>

      <Step n={3} label="Abrir a pasta do projeto no Claude Design">
        Vá para <InlineCode>claude.ai/design</InlineCode>, clique em <strong className="text-white">Open Folder</strong> e selecione <InlineCode>~/Desktop/meu-design-workshop</InlineCode>.
        <p className="mt-2 text-white/50">O Claude Design lê brief, tokens e CSS vars — toda a identidade de marca que os agentes construíram.</p>
      </Step>

      <Step n={4} label="Criar o KV visual">
        <CodeBlock label="prompt — claude design">{PROMPT_KV}</CodeBlock>
      </Step>

      <Step n={5} label="Refinar os componentes">
        Ajuste botão, card e tipografia conforme a personalidade da marca:
        <CodeBlock label="refinamento">{PROMPT_REFINE}</CodeBlock>
        <p className="mt-2 text-white/50">Iterate até os componentes refletirem bem os adjetivos do brief. Estes componentes vão alimentar a Versão 2 da LP.</p>
      </Step>

      <Divider label="Handoff 2 — Claude Design → Claude Code" direction="←" />

      {/* ════ ETAPA 3 — HANDOFF URL ════ */}
      <SectionHeader
        badge="Etapa 3"
        badgeAccent
        title={<>Handoff to Claude Code <span className="text-sm font-normal" style={{ color: ACCENT }}>← WOW</span></>}
        platform="Plataforma: Claude Code — volte ao terminal"
      />

      <FacilitatorNote>
        <em>&ldquo;O Claude Design tem um botão nativo de handoff — ele empacota tudo, gera uma URL, e o Claude Code sabe exatamente o que fazer com ela. Não precisa copiar CSS manualmente.&rdquo;</em> Mostre ao vivo: clique, copie a URL, cole no terminal.
      </FacilitatorNote>

      <Step n={6} label="Gerar a URL de handoff no Claude Design">
        Clique no botão{' '}
        <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold" style={{ background: 'rgba(255,58,14,0.15)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)', fontFamily: DISPLAY }}>
          Share / Handoff to Claude Code
        </span>{' '}
        no Claude Design.
        <p className="mt-2 text-white/50">Gera uma URL no formato <InlineCode>api.anthropic.com/v1/design/h/[ID]</InlineCode>. Copie para a área de transferência.</p>
      </Step>

      <Step n={7} label="Implementar os componentes no projeto">
        <CodeBlock label="claude code">{PROMPT_IMPLEMENT}</CodeBlock>
        <p className="mt-2 text-white/50">O Claude Code busca o arquivo de design, lê o README do handoff e implementa os componentes no projeto — usando as CSS vars que o agente Dev criou nas fases anteriores.</p>
      </Step>

      {/* ════ ETAPA 4 — UX V2 ════ */}
      <SectionHeader
        badge="Etapa 4"
        title={<>UX Agent — <span className="font-normal text-white/50">Versão 2 pós Claude Design</span></>}
        platform="Plataforma: Claude Code — mesmo terminal"
      />

      <FacilitatorNote>
        Explique o experimento antes de rodar: <em>&ldquo;O agente UX vai receber os componentes do Claude Design e recriar a mesma LP — mesma estrutura de jornada, mesmo copy, mas agora com o vocabulário visual que acabamos de refinar.&rdquo;</em>
      </FacilitatorNote>

      <Step n={8} label="Criar a LP V2" sub="com os componentes do handoff">
        Cole o prompt. Onde indicado, cole o código que o Claude Code implementou do handoff:
        <CodeBlock label="claude code — ux v2">{PROMPT_UX_V2}</CodeBlock>
        <p className="mt-2 text-white/50">Salva em <InlineCode>docs/pages/page-ux-v2.html</InlineCode>.</p>
      </Step>

      {/* ════ ETAPA 5 — COMPARAR ════ */}
      <SectionHeader
        badge="Etapa 5"
        title="Comparar V1 vs V2"
        platform="Plataforma: browser — abra os dois arquivos"
      />

      <Step n={9} label="Ver as duas versões lado a lado">
        Se o servidor ainda está rodando em <InlineCode>localhost:4321</InlineCode>:
        <CodeBlock label="browser">localhost:4321/page-ux-v1.html
localhost:4321/page-ux-v2.html</CodeBlock>
        Ou abrir direto do terminal:
        <CodeBlock label="terminal">open docs/pages/page-ux-v1.html docs/pages/page-ux-v2.html</CodeBlock>
      </Step>

      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2 text-white/35" style={{ fontFamily: MONO }}>V1 — pré Claude Design</p>
          <p className="text-sm text-white/60">UX agent interpreta livremente com só tokens e CSS vars. Sem componentes definidos — ele inventa a linguagem visual com o que tem.</p>
        </div>
        <div className="p-4" style={{ border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.03)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-2" style={{ fontFamily: MONO, color: ACCENT }}>V2 — pós Claude Design</p>
          <p className="text-sm text-white/60">Mesma jornada, mesmo copy — mas com os componentes visuais refinados no KV. O sistema de design torna a V2 mais consistente e acabada.</p>
        </div>
      </div>

      <p className="text-sm text-white/45 mb-4">Para a turma: o que mudou visualmente? A lógica de UX ficou igual? Qual versão você escolheria — e por quê?</p>

      <Callout label="O que os dois handoffs demonstram">
        O primeiro handoff (Code → Design) mostrou que o Claude Design não precisa de briefing — leu a pasta. O segundo (Design → Code) mostrou que o Claude Code não precisa de instruções manuais — leu a URL. Entre os dois, o UX agent mostrou que estrutura de jornada e vocabulário visual são camadas independentes: V1 e V2 têm a mesma lógica — o que muda é o sistema visual por trás.
      </Callout>

      {/* FECHAMENTO */}
      <div className="mt-12 p-6" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="mb-4 text-xs text-white/35 font-mono tracking-[0.12em] uppercase" style={{ fontFamily: MONO }}>Pipeline completo</p>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-2 text-[11px]">
          {[
            { t: 'Analista', a: false }, { t: '→', arrow: true },
            { t: 'Arquiteto', a: false }, { t: '→', arrow: true },
            { t: 'Designer', a: false }, { t: '→', arrow: true },
            { t: 'Dev', a: false }, { t: '→', arrow: true },
            { t: 'UX V1', a: false }, { t: '→ Handoff 1 →', arrow: true, accent: true },
            { t: 'Claude Design', a: true }, { t: '← Handoff 2 ←', arrow: true, accent: true },
            { t: 'UX V2', a: true },
          ].map(({ t, a, arrow, accent }, i) =>
            arrow
              ? <span key={i} className="font-mono font-bold" style={{ color: accent ? ACCENT : 'rgba(255,255,255,0.3)' }}>{t}</span>
              : <span key={i} className="px-2 py-1 font-bold" style={{ fontFamily: DISPLAY, background: a ? 'rgba(255,58,14,0.08)' : 'rgba(255,255,255,0.04)', border: `1px solid ${a ? 'rgba(255,58,14,0.3)' : 'rgba(255,255,255,0.1)'}`, color: a ? ACCENT : 'rgba(255,255,255,0.7)' }}>{t}</span>
          )}
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
