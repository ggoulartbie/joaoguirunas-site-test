import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 01 — Setup | Workshop 2',
  description: 'Configure o ambiente local com AIOX e conecte o Obsidian ao vault do projeto.',
  alternates: { canonical: '/workshop-2/setup' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-5 border-b border-white/[0.06] last:border-0">
      <span className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center text-[11px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.06)' }}>{n}</span>
      <div className="text-sm leading-relaxed text-white/75 flex-1">{children}</div>
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

const PREREQS = [
  { label: 'Node.js 18+', cmd: 'node --version', note: 'v20+ recomendado' },
  { label: 'Claude Code CLI', cmd: 'claude --version', note: 'npm install -g @anthropic-ai/claude-code' },
  { label: 'Obsidian', cmd: null, note: 'obsidian.md · gratuito · sem plugin necessário' },
];

export default function SetupPage() {
  return (
    <WorkshopPhaseLayout slug="setup">
      <FacilitatorNote duration="10 min">
        Peça a todos que abram o terminal antes de começar. Verifique em voz alta se Node.js e Claude Code estão instalados — quem não tiver, pode assistir e instalar depois. O Obsidian pode ficar aberto para todo o workshop.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        Crie a pasta do projeto, inicialize o AIOX e conecte o Obsidian ao vault. O Obsidian não precisa de plugin — ele abre qualquer pasta de arquivos <InlineCode>.md</InlineCode> como vault automaticamente.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 01 de 07
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Pré-requisitos</h2>
      <div className="mb-8 space-y-2">
        {PREREQS.map((p) => (
          <div key={p.label} className="flex items-center justify-between gap-4 p-3" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
            <div>
              <strong className="text-sm text-white">{p.label}</strong>
              <span className="ml-2 text-xs text-white/40">{p.note}</span>
            </div>
            {p.cmd && <InlineCode>{p.cmd}</InlineCode>}
          </div>
        ))}
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Passo a passo</h2>

      <Step n={1}>
        Abra o terminal e vá para o Desktop:
        <CodeBlock label="terminal">cd ~/Desktop</CodeBlock>
      </Step>

      <Step n={2}>
        Crie a pasta do projeto:
        <CodeBlock label="terminal">mkdir meu-design-workshop</CodeBlock>
      </Step>

      <Step n={3}>
        Entre na pasta:
        <CodeBlock label="terminal">cd meu-design-workshop</CodeBlock>
      </Step>

      <Step n={4}>
        Instale o AIOX:
        <CodeBlock label="terminal">npx aiox-core install</CodeBlock>
        <p className="mt-2 text-white/50">O instalador vai fazer perguntas interativas. Escolha <strong className="text-white">Claude Code</strong> quando perguntar sobre o IDE.</p>
      </Step>

      <Step n={5}>
        Abra o Claude Code:
        <CodeBlock label="terminal">claude</CodeBlock>
        <p className="mt-2 text-white/50">Deixe o terminal com o Claude Code aberto durante todo o workshop.</p>
      </Step>

      <Step n={6}>
        Verifique que os agentes estão disponíveis — digite no Claude Code:
        <CodeBlock label="claude code">/aiox-analyst</CodeBlock>
        <p className="mt-2 text-white/50">Uma mensagem de saudação do Analista confirma que o AIOX está ativo.</p>
      </Step>

      <Step n={7}>
        Abra o Obsidian → <strong className="text-white">File › Open Vault</strong> → selecione a pasta <InlineCode>~/Desktop/meu-design-workshop</InlineCode>.
        <p className="mt-2 text-white/50">Deixe o Obsidian aberto ao lado do Claude Code durante todo o workshop.</p>
      </Step>

      <FacilitatorNote>
        Bom momento para pausar e confirmar que todos estão no mesmo ponto. Mostre ao vivo: o vault aberto no Obsidian com a pasta recém-criada, ainda vazia — o grafo não tem nós ainda. A próxima fase vai mudar isso.
      </FacilitatorNote>

      <Callout label="Por que o Obsidian?">
        O Obsidian lê a pasta como um vault e exibe um <strong className="text-white">grafo visual</strong> das conexões entre arquivos. Conforme os agentes criam arquivos interligados com wikilinks <InlineCode>[[assim]]</InlineCode>, o grafo cresce em tempo real — você literalmente vê a memória do projeto sendo construída.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
