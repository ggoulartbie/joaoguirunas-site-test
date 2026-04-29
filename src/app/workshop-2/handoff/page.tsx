import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 06 — Handoff | Workshop 2',
  description: 'Levar os tokens para o Claude Design e ver o sistema visual ganhar vida.',
  alternates: { canonical: '/workshop-2/handoff' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";

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
        Handoff
      </span>
      {children}
    </div>
  );
}

export default function HandoffPage() {
  return (
    <WorkshopPhaseLayout slug="handoff">
      <p className="mb-4 text-base leading-relaxed text-white/70">
        Este é o momento de handoff — do código para o design. O Claude Design recebe os tokens que
        você criou e gera componentes visuais consistentes com a sua marca. Sem retrabalho, sem
        inconsistência.
      </p>

      <div
        className="mb-8 p-4 text-sm text-white/70 italic"
        style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
      >
        O que o terminal construiu, o Claude Design torna visual. Esta é a integração entre
        plataformas.
      </div>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        15 min · Fase 06 de 07
      </div>

      <div
        className="my-6 p-4"
        style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}
      >
        <span
          className="block font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: ACCENT }}
        >
          Plataforma
        </span>
        <strong className="text-base text-white" style={{ fontFamily: DISPLAY }}>
          Claude Design
        </strong>
        <span className="ml-2 text-sm text-white/50">— sem agente CLI, é handoff direto</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Passo a passo</h2>

      <Step n={1}>
        Abra <strong className="text-white">claude.ai/design</strong> no seu navegador.
      </Step>

      <Step n={2}>
        Abra o arquivo{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs" style={{ fontFamily: MONO }}>
          docs/design-system/tokens.md
        </code>{' '}
        no editor de texto (VS Code, Obsidian ou qualquer editor).
      </Step>

      <Step n={3}>
        Copie o conteúdo completo do{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs" style={{ fontFamily: MONO }}>
          tokens.md
        </code>{' '}
        e cole no Claude Design.
      </Step>

      <Step n={4}>
        Peça ao Claude Design:
        <pre
          className="mt-3 p-4 text-xs"
          style={{ fontFamily: MONO, background: '#1a1a1a', borderLeft: `3px solid ${ACCENT}`, color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap' }}
        >{`Crie um KV (key-value design system) visual com base nesses tokens. Gere componentes: botão primário, card, input, badge`}</pre>
      </Step>

      <Step n={5}>
        Itere pedindo ajustes. Exemplo:
        <pre
          className="mt-3 p-4 text-xs"
          style={{ fontFamily: MONO, background: '#1a1a1a', borderLeft: `3px solid ${ACCENT}`, color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap' }}
        >{`Ajuste a escala tipográfica para parecer mais [adjetivo da sua marca]`}</pre>
      </Step>

      <Step n={6}>
        Exporte o resultado final do Claude Design.
      </Step>

      <Callout>
        O que o terminal construiu, o Claude Design torna visual. Esta é a integração entre
        plataformas — do código para o design, sem retrabalho e sem inconsistência. Os tokens
        garantem que o que você vê no design é exatamente o que vai para o código.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
