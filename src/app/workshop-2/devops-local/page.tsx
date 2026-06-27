export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 05 — Ver local',
  description: 'Subir um servidor local e ver a Versão 1 no browser antes de ir para o Claude Design.',
  alternates: { canonical: '/workshop-2/devops-local' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const SERIF = "var(--font-display-serif), 'Fraunces', serif";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const CMD_SERVE = `npx serve docs/pages -p 4321`;

export default function DevopsLocalPage() {
  return (
    <WorkshopPhaseLayout slug="devops-local">
      <FacilitatorNote duration="5 min">
        Fase curta mas importante. Mostre a V1 no projetor antes de abrir o Claude Design — o contraste visual é o ponto alto do workshop. Peça para a turma abrir no próprio celular também. Esta é a baseline: uma LP feita com tokens e brand identity, sem nenhuma intervenção visual de um sistema de design.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        Antes de abrir o Claude Design, veja a Versão 1 no browser. Este é o ponto de partida — a landing page criada pelo UX agent com apenas os tokens e o brand-brief. Guarde essa impressão visual. Em algumas fases, o Claude Design vai transformar o vocabulário visual e a comparação vai ser imediata.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        5 min · Fase 05 de 10
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Subir o servidor local</h2>
      <p className="mb-3 text-sm text-white/60">Em um novo tab do terminal (mantenha o Claude Code aberto no tab anterior):</p>
      <CodeBlock label="terminal — novo tab">{CMD_SERVE}</CodeBlock>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">Abrir no browser</h2>
      <div className="space-y-2">
        <div className="p-4" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/35 mb-2" style={{ fontFamily: MONO }}>Versão 1 — pré Claude Design</p>
          <InlineCode>localhost:4321/page-ux-v1.html</InlineCode>
          <p className="mt-2 text-sm text-white/50">Esta é a interpretação livre do UX agent. Sem componentes definidos — criado apenas com CSS vars e brand-brief.</p>
        </div>
      </div>

      <h2 className="mb-4 mt-10 text-xl font-bold text-white">O que observar</h2>
      <ul className="space-y-2 text-sm text-white/60">
        {[
          'A hierarquia de informação — o que está em destaque e por quê',
          'O botão CTA — como o UX agent interpretou a cor e o estilo com só as vars',
          'A tipografia — usou as vars? Ficou legível?',
          'A estrutura de convencimento — hero, proposta, CTA final',
        ].map((item) => (
          <li key={item} className="flex gap-2">
            <span style={{ color: ACCENT }}>→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Callout label="Guarde essa impressão">
        Esta é a baseline. Nas próximas fases, o Claude Design vai criar um sistema visual com componentes, escalas e regras. O UX agent vai usar esses componentes para recriar a mesma LP. A diferença entre o que você está vendo agora e a Versão 2 vai mostrar o que um sistema de design faz por uma página.
      </Callout>

      <div className="mt-10 p-5" style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="text-sm text-white/40 italic" style={{ fontFamily: SERIF }}>
          O servidor continua rodando na porta 4321. Após o handoff e a Versão 2, você vai acessar <InlineCode>localhost:4321/page-ux-v2.html</InlineCode> para a comparação final.
        </p>
      </div>
    </WorkshopPhaseLayout>
  );
}
