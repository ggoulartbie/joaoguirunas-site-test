import type { Metadata } from 'next';
import Link from 'next/link';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';
import { ExternalLink, InternalLink } from '../_components/ExternalLink';

export const metadata: Metadata = {
  title: 'Fase 07 — Encerramento | Workshop 2',
  description: 'Showcase individual, próximos passos e como continuar aprendendo com o programa de mentoria.',
  alternates: { canonical: '/workshop-2/encerramento' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

const OUTPUT_FILES = [
  { file: 'docs/brand-brief.md', desc: 'Identidade de marca: nome, área, personalidade, cor, referência' },
  { file: 'docs/smart-memory/INDEX.md', desc: 'Índice do vault com links para todos os documentos' },
  { file: 'docs/smart-memory/project/overview.md', desc: 'Visão geral do projeto com wikilinks no Obsidian' },
  { file: 'docs/smart-memory/project/brand-tokens.md', desc: 'Tokens de marca em linguagem natural' },
  { file: 'docs/smart-memory/stories/BACKLOG.md', desc: 'Backlog de stories com próximas ações' },
  { file: 'docs/design-system/tokens.md', desc: 'Design tokens completos: cores, tipografia, espaços, radius, sombras' },
  { file: 'docs/design-system/design-system.css', desc: 'CSS custom properties semânticas prontas para uso' },
  { file: 'docs/design-system/tailwind.tokens.js', desc: 'Extensão do Tailwind com a marca pessoal' },
  { file: 'KV no Claude Design', desc: 'Componentes visuais: botão, card, input, badge — consistentes com a marca' },
];

const SHOWCASE_ITEMS = [
  'O brand-brief.md — sua identidade de marca em texto estruturado',
  'O grafo do Obsidian com as conexões criadas pelo Arquiteto',
  'O tokens.md — paleta, tipografia e espaçamentos da marca',
  'O componente ou KV gerado no Claude Design',
];

export default function EncerramentoPage() {
  return (
    <WorkshopPhaseLayout slug="encerramento">
      <FacilitatorNote duration="15 min">
        Showcase individual: peça para cada participante compartilhar a tela por 2 minutos. Foco no grafo do Obsidian e no KV do Claude Design — são os outputs mais visuais. Não leia os arquivos .md — mostre o grafo e os componentes. Reserve os últimos 5 minutos para falar do programa de mentoria.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        Showcase individual e próximos passos. Cada participante compartilha a tela por 2 minutos e mostra o que construiu — do brand-brief ao componente no Claude Design.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        15 min · Fase 07 de 07
      </div>

      <div className="my-8 p-6 text-center" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <p className="text-2xl font-light italic leading-snug text-white" style={{ fontFamily: SERIF }}>
          Você criou um design system pessoal completo
          <br />
          <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: ACCENT }}>em menos de 1 hora.</span>
        </p>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que foi produzido</h2>
      <div className="space-y-2">
        {OUTPUT_FILES.map((item) => (
          <div key={item.file} className="flex gap-3 p-3" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <span className="flex-shrink-0 mt-0.5 text-xs font-bold" style={{ color: ACCENT, fontFamily: MONO }}>✓</span>
            <div>
              <InlineCode>{item.file}</InlineCode>
              <p className="mt-0.5 text-xs text-white/50">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Showcase — 2 min cada</h2>
      <p className="mb-4 text-sm text-white/60">Abra o Obsidian e o Claude Design lado a lado. Mostre:</p>
      <ol className="ml-0 list-none space-y-3 text-sm text-white/70 mb-8">
        {SHOWCASE_ITEMS.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}>{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      {/* ─── MENTORIA BLOCK ─── */}
      <div
        className="my-12 p-8"
        style={{ border: '1px solid rgba(255,58,14,0.5)', background: 'linear-gradient(135deg, rgba(255,58,14,0.08) 0%, rgba(0,0,0,0) 100%)' }}
      >
        <span
          className="block font-mono text-[10px] tracking-[0.22em] uppercase mb-4"
          style={{ fontFamily: MONO, color: ACCENT }}
        >
          Quer ir mais fundo?
        </span>
        <h2
          className="text-3xl font-light italic leading-tight text-white mb-3"
          style={{ fontFamily: SERIF }}
        >
          Programa de{' '}
          <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: ACCENT }}>
            Mentoria
          </span>
        </h2>
        <p className="text-base leading-relaxed text-white/70 mb-6 max-w-lg">
          Este workshop é só o começo. No programa de mentoria você aprende a orquestrar squads completos de agentes, construir produtos reais com AIOX, e desenvolver uma forma de trabalhar que multiplica o que você consegue entregar — semana a semana, com acompanhamento direto.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 mb-6">
          {[
            'Squads de agentes especializados por domínio',
            'Smart-memory e Obsidian como segundo cérebro',
            'Pipelines CLI → Design → Deploy com AIOX',
            'Acompanhamento semanal e acesso ao grupo',
          ].map((item) => (
            <div key={item} className="flex gap-2 text-sm text-white/70">
              <span style={{ color: ACCENT }}>→</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
        <Link
          href="/mentoria"
          className="inline-flex items-center gap-2 px-6 py-3 font-bold text-sm text-black transition-opacity hover:opacity-90"
          style={{ background: ACCENT, fontFamily: DISPLAY }}
        >
          Ver programa de mentoria
          <span>→</span>
        </Link>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Links úteis</h2>
      <div className="space-y-2">
        <ExternalLink
          href="https://github.com/SynkraAI/aiox-core"
          label="AIOX Core"
          display="github.com/SynkraAI/aiox-core"
          note="Framework open source — agents, skills e smart-memory"
        />
        <ExternalLink
          href="https://skills.sh"
          label="Skills.sh"
          display="skills.sh"
          note="Catálogo de skills para agentes Claude Code"
        />
        <ExternalLink
          href="https://claude.ai/design"
          label="Claude Design"
          display="claude.ai/design"
          note="Design system e componentes visuais com IA"
        />
        <InternalLink
          href="/workshop-1"
          label="Workshop 1"
          display="/workshop-1"
          note="Claude Code na prática — fundamentos em 1h"
        />
      </div>
    </WorkshopPhaseLayout>
  );
}
