export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 09 — Publicar URL',
  description: 'Publicar as duas versões em URLs públicas e comparar ao vivo — a diferença antes e depois do Claude Design.',
  alternates: { canonical: '/workshop-2/devops-url' },
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

const CMD_V1 = `npx surge docs/pages [nome-da-marca]-v1.surge.sh`;
const CMD_V2 = `npx surge docs/pages [nome-da-marca]-v2.surge.sh`;
const CMD_COMPARE = `# abrir as duas versões no browser local para referência
open docs/pages/page-ux-v1.html docs/pages/page-ux-v2.html`;

const PROMPT_DEVOPS = `Você é um especialista em DevOps. Sua tarefa é publicar as duas versões da landing page deste projeto em URLs públicas para comparação.

LEIA ANTES DE COMEÇAR:
- docs/brand-brief.md (para o nome do domínio)
- docs/pages/page-ux-v1.html (Versão 1 — pré Claude Design)
- docs/pages/page-ux-v2.html (Versão 2 — pós Claude Design)

PUBLIQUE AS DUAS VERSÕES COM SURGE.SH:

Versão 1:
npx surge docs/pages [nome-da-marca]-v1.surge.sh

Versão 2:
npx surge docs/pages [nome-da-marca]-v2.surge.sh

Substitua [nome-da-marca] por um slug baseado no brand-brief (ex: joao-silva, maria-dev).

APÓS PUBLICAR:
1. Confirme que ambas as URLs estão acessíveis
2. Teste no celular (responsividade)
3. Registre as duas URLs em docs/smart-memory/shared-context.md

RESULTADO ESPERADO:
- [nome]-v1.surge.sh → Versão 1 (pré Claude Design)
- [nome]-v2.surge.sh → Versão 2 (pós Claude Design)
- URLs registradas na smart-memory`;

export default function DevopsUrlPage() {
  return (
    <WorkshopPhaseLayout slug="devops-url">
      <FacilitatorNote duration="10 min">
        Esta é a fase final de conteúdo técnico. Publique as duas versões em URLs separadas — assim cada participante pode compartilhar os dois links e qualquer pessoa pode comparar. O momento de abrir as duas URLs no celular lado a lado é o encerramento visual do workshop.
      </FacilitatorNote>

      <p className="mb-6 text-base leading-relaxed text-white/70">
        Vamos publicar as duas versões da landing page em URLs públicas separadas para comparação direta. A V1 é a interpretação livre do UX agent. A V2 é a mesma LP depois do sistema de design do Claude Design. Dois links, uma decisão de design.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 09 de 10
      </div>

      <Step n={1} label="Comparar localmente antes de publicar">
        Confirme que as duas versões estão como esperado:
        <CodeBlock label="terminal">{CMD_COMPARE}</CodeBlock>
        <p className="mt-2 text-white/50">Se o servidor ainda está rodando na porta 4321: <InlineCode>localhost:4321/page-ux-v1.html</InlineCode> e <InlineCode>localhost:4321/page-ux-v2.html</InlineCode>.</p>
      </Step>

      <Step n={2} label="Publicar com o agente DevOps">
        Cole o prompt no Claude Code para publicar automaticamente:
        <CodeBlock label="claude code — devops">{PROMPT_DEVOPS}</CodeBlock>
      </Step>

      <Step n={3} label="Ou publicar manualmente com Surge.sh">
        <div className="space-y-3 mt-2">
          <div>
            <p className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-white/35" style={{ fontFamily: MONO }}>Versão 1 — pré Claude Design</p>
            <CodeBlock label="terminal">{CMD_V1}</CodeBlock>
          </div>
          <div>
            <p className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>Versão 2 — pós Claude Design</p>
            <CodeBlock label="terminal">{CMD_V2}</CodeBlock>
          </div>
        </div>
        <p className="mt-3 text-white/50 text-xs">Substitua <InlineCode>[nome-da-marca]</InlineCode> por um slug baseado no brief. Ex: <InlineCode>joao-silva-v1.surge.sh</InlineCode></p>
      </Step>

      <Step n={4} label="Comparar e compartilhar">
        Com as duas URLs no ar:
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="p-3" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1 text-white/35" style={{ fontFamily: MONO }}>V1 — pré Claude Design</p>
            <p className="text-xs text-white/50">[nome]-v1.surge.sh<br />UX livre com só tokens</p>
          </div>
          <div className="p-3" style={{ border: '1px solid rgba(255,58,14,0.2)', background: 'rgba(255,58,14,0.03)' }}>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] mb-1" style={{ fontFamily: MONO, color: ACCENT }}>V2 — pós Claude Design</p>
            <p className="text-xs text-white/50">[nome]-v2.surge.sh<br />Mesma jornada, sistema visual real</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-white/50">Abra as duas no celular. Compartilhe os dois links no chat do workshop — todos podem comparar as versões de cada participante.</p>
      </Step>

      <Callout label="O argumento final">
        A V1 e a V2 têm o mesmo copy, a mesma estrutura de jornada, as mesmas decisões de UX. A diferença é o vocabulário visual — e a V2 é mais consistente porque o botão, o card e a tipografia vêm de um sistema com regras, não de decisões ad-hoc. É isso que um design system faz: não muda o que você diz, muda como parece quando diz.
      </Callout>

      <div className="mt-12 p-6" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="text-2xl font-light italic leading-snug text-white" style={{ fontFamily: SERIF }}>
          Do briefing ao deploy.{' '}
          <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: ACCENT }}>
            Dois links. Você decide.
          </span>
        </p>
      </div>
    </WorkshopPhaseLayout>
  );
}
