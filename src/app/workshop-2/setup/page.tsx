import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 01 — Setup | Workshop 2',
  description: 'Configure o ambiente local com AIOX e abra o vault no Obsidian.',
  alternates: { canonical: '/workshop-2/setup' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 py-4 border-b border-white/[0.06] last:border-0">
      <span
        className="flex-shrink-0 mt-0.5 w-6 h-6 flex items-center justify-center text-[11px] font-bold border"
        style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.06)' }}
      >
        {n}
      </span>
      <div className="text-sm leading-relaxed text-white/75">{children}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="my-3 overflow-x-auto p-4 text-sm leading-relaxed"
      style={{
        fontFamily: MONO,
        background: '#1a1a1a',
        borderLeft: `3px solid ${ACCENT}`,
        color: 'rgba(255,255,255,0.85)',
      }}
    >
      <code>{children}</code>
    </pre>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-8 p-5 text-sm leading-relaxed text-white/80"
      style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}
    >
      <span
        className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, color: ACCENT }}
      >
        Dica
      </span>
      {children}
    </div>
  );
}

export default function SetupPage() {
  return (
    <WorkshopPhaseLayout slug="setup">
      <p className="mb-8 text-base leading-relaxed text-white/70">
        Nesta fase você vai criar a pasta do projeto, inicializar o AIOX, abrir o Claude Code e
        conectar o Obsidian ao vault. Tudo em 10 minutos — e o ambiente ficará pronto para o
        restante do workshop.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        10 min · Fase 01 de 07
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Passo a passo</h2>

      <Step n={1}>
        Crie a pasta do projeto e entre nela:
        <CodeBlock>mkdir meu-design-workshop && cd meu-design-workshop</CodeBlock>
      </Step>

      <Step n={2}>
        Inicialize o AIOX — ele vai instalar a constituição, os agentes base e o scaffolding:
        <CodeBlock>npx aiox-core init meu-design-workshop</CodeBlock>
      </Step>

      <Step n={3}>
        Abra o Claude Code dentro da pasta:
        <CodeBlock>claude</CodeBlock>
      </Step>

      <Step n={4}>
        Verifique que os agentes estão disponíveis digitando no Claude Code:
        <CodeBlock>/aiox-analyst</CodeBlock>
        <p className="mt-2 text-white/55">Se uma resposta aparecer com a persona do Analista, está tudo certo.</p>
      </Step>

      <Step n={5}>
        Abra o Obsidian{' '}
        <span className="text-white font-semibold">File &gt; Open Vault</span>{' '}
        e selecione a pasta{' '}
        <code
          className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs"
          style={{ fontFamily: MONO }}
        >
          meu-design-workshop
        </code>{' '}
        que você acabou de criar.
      </Step>

      <Callout>
        Mantenha o Obsidian aberto ao lado do terminal — você vai ver o grafo crescer em tempo real
        conforme os agentes criam arquivos nas próximas fases.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
