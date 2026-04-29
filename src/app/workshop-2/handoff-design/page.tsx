import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 06 — Claude Design | Workshop 2',
  description: 'Abrir a pasta do projeto no Claude Design, criar o KV visual e refinar os componentes.',
  alternates: { canonical: '/workshop-2/handoff-design' },
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

export default function HandoffDesignPage() {
  return (
    <WorkshopPhaseLayout slug="handoff-design">
      <FacilitatorNote duration="10 min">
        Este é o Handoff 1 — os arquivos que os agentes criaram no terminal agora alimentam o Claude Design. Abra o Claude Design no projetor ao lado do Obsidian para mostrar o contraste: no Obsidian, a memória estruturada; no Claude Design, o sistema visual. A mesma pasta, duas perspectivas.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O Claude Design vai abrir a mesma pasta do projeto, ler o brand-brief e os tokens que o Arquiteto criou, e gerar um KV visual completo — paleta, tipografia e componentes. Nenhum dado precisa ser reexplicado: ele lê a pasta.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 06 de 10
      </div>

      <div className="mb-8 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Handoff 1</span>
        <strong className="text-base text-white" style={{ fontFamily: DISPLAY }}>Claude Code → Claude Design</strong>
        <span className="ml-2 text-sm text-white/50">— os arquivos do terminal alimentam a interface visual</span>
      </div>

      <Step n={1} label="Abrir o Claude Design">
        Vá para <InlineCode>claude.ai/design</InlineCode> no browser.
      </Step>

      <Step n={2} label="Abrir a pasta do projeto">
        Clique em <strong className="text-white">Open Folder</strong> e selecione <InlineCode>~/Desktop/meu-design-workshop</InlineCode>.
        <p className="mt-2 text-white/50">O Claude Design lê brand-brief.md, tokens.md e design-system.css — toda a identidade construída pelo Analista e Arquiteto.</p>
      </Step>

      <Step n={3} label="Criar o KV visual">
        <CodeBlock label="prompt — claude design">{PROMPT_KV}</CodeBlock>
      </Step>

      <Step n={4} label="Refinar os componentes">
        Ajuste botão, card e tipografia conforme os adjetivos da marca:
        <CodeBlock label="refinamento">{PROMPT_REFINE}</CodeBlock>
        <p className="mt-2 text-white/50">Iterate até os componentes capturarem bem a personalidade descrita no brief. Esses componentes vão alimentar a Versão 2 da LP.</p>
      </Step>

      <Callout label="O que o Claude Design faz diferente">
        Um designer humano receberia o brief e interpretaria. O Claude Design lê os tokens estruturados e gera componentes que respeitam as variáveis — o botão vai usar <InlineCode>{'var(--color-primary)'}</InlineCode>, o card vai usar <InlineCode>{'var(--radius-md)'}</InlineCode>. O resultado é um sistema visual derivado matematicamente da identidade de marca.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
