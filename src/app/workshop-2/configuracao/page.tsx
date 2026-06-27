export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';
import { ExternalLink } from '../_components/ExternalLink';

export const metadata: Metadata = {
  title: 'Fase 01 — Configuração',
  description: 'Criar a pasta, instalar AIOX, abrir o Claude Code, instalar o skill do Obsidian e abrir o vault.',
  alternates: { canonical: '/workshop-2/configuracao' },
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

const PREREQS = [
  { label: 'Node.js 18+', cmd: 'node --version', note: 'v20+ recomendado' },
  { label: 'Claude Code CLI', cmd: 'claude --version', note: 'npm install -g @anthropic-ai/claude-code' },
  { label: 'Obsidian', cmd: null, note: 'obsidian.md · gratuito · sem plugin necessário' },
];

const INSTALL_SKILL_NPX = `npx skills add git@github.com:kepano/obsidian-skills.git`;
const INSTALL_SKILL_1 = `/plugin marketplace add kepano/obsidian-skills`;
const INSTALL_SKILL_2 = `/plugin install obsidian@obsidian-skills`;

export default function ConfiguracaoPage() {
  return (
    <WorkshopPhaseLayout slug="configuracao">
      <FacilitatorNote duration="10 min">
        Peça a todos que abram o terminal antes de começar. Verifique em voz alta se Node.js e Claude Code estão instalados — quem não tiver pode assistir e instalar depois. O skill do Obsidian é instalado no final desta fase, enquanto você explica o que são skills para a turma.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        Criamos a pasta do projeto no Desktop, instalamos o AIOX, abrimos o Claude Code e instalamos o skill oficial do Obsidian — criado por Steph Ango, fundador da ferramenta. Com o skill instalado, o Claude vai conhecer toda a sintaxe de wikilinks, frontmatter, canvas e bases antes de criar a smart-memory.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 01 de 10
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

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Configurar o ambiente</h2>

      <Step n={1} label="Ir para o Desktop">
        <CodeBlock label="terminal">cd ~/Desktop</CodeBlock>
      </Step>

      <Step n={2} label="Criar a pasta do projeto">
        <CodeBlock label="terminal">mkdir meu-design-workshop</CodeBlock>
      </Step>

      <Step n={3} label="Entrar na pasta">
        <CodeBlock label="terminal">cd meu-design-workshop</CodeBlock>
      </Step>

      <Step n={4} label="Instalar o AIOX">
        <CodeBlock label="terminal">npx aiox-core install</CodeBlock>
        <p className="mt-2 text-white/50">O instalador faz perguntas interativas. Escolha <strong className="text-white">Claude Code</strong> quando perguntar sobre o IDE.</p>
      </Step>

      <Step n={5} label="Abrir o Claude Code">
        <CodeBlock label="terminal">claude</CodeBlock>
      </Step>

      <Step n={6} label="Instalar o skill do Obsidian">
        <p className="mb-3 text-white/50">Escolha uma das duas formas:</p>
        <div className="space-y-3">
          <div>
            <p className="mb-1 font-mono text-[10px] tracking-[0.12em] uppercase text-white/35" style={{ fontFamily: MONO }}>Via npx (terminal, antes de abrir o Claude Code)</p>
            <CodeBlock label="terminal">{INSTALL_SKILL_NPX}</CodeBlock>
          </div>
          <div>
            <p className="mb-1 font-mono text-[10px] tracking-[0.12em] uppercase text-white/35" style={{ fontFamily: MONO }}>Via plugin marketplace (dentro do Claude Code)</p>
            <CodeBlock label="claude code — passo 1">{INSTALL_SKILL_1}</CodeBlock>
            <CodeBlock label="claude code — passo 2">{INSTALL_SKILL_2}</CodeBlock>
          </div>
        </div>
        <p className="mt-3 text-white/50">O skill ensina ao Claude toda a sintaxe do Obsidian: wikilinks <InlineCode>{'[[assim]]'}</InlineCode>, frontmatter YAML, callouts, canvas e bases. Sem o skill, o Arquiteto pode gerar markdown inválido.</p>
      </Step>

      <Step n={7} label="Abrir o Obsidian">
        Obsidian → <strong className="text-white">File › Open Vault</strong> → selecione <InlineCode>~/Desktop/meu-design-workshop</InlineCode>.
        <p className="mt-2 text-white/50">Deixe o Obsidian aberto ao lado do Claude Code durante todo o workshop. O grafo vai crescer a cada fase.</p>
      </Step>

      <FacilitatorNote>
        Bom momento para pausar e confirmar que todos estão no mesmo ponto. Mostre ao vivo: vault aberto no Obsidian — ainda vazio, grafo sem nós. A próxima fase vai mudar isso.
      </FacilitatorNote>

      <Callout label="Por que o skill do Obsidian?">
        Skills são documentos de contexto que o Claude lê antes de executar tarefas específicas. O skill do Obsidian contém a especificação técnica completa da ferramenta — sintaxe de wikilinks, regras de frontmatter, tipos de callout, formato canvas. Em vez de você explicar no prompt, o Claude já sabe tudo. O Arquiteto vai usar esse conhecimento na próxima fase para criar a smart-memory com estrutura perfeita.
      </Callout>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Referência do skill</h2>
      <ExternalLink
        href="https://github.com/kepano/obsidian-skills"
        label="kepano/obsidian-skills"
        display="github.com/kepano/obsidian-skills"
        note="Por Steph Ango (fundador do Obsidian) · MIT · 5 skills"
      />
    </WorkshopPhaseLayout>
  );
}
