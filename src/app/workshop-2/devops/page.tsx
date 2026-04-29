import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 08 — DevOps | Workshop 2',
  description: 'Publicar a landing page localmente e em uma URL pública — compartilhe o design system ao vivo com quem quiser.',
  alternates: { canonical: '/workshop-2/devops' },
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

const PROMPT_DEVOPS = `Você é um especialista em DevOps. Sua tarefa é publicar a landing page deste projeto em uma URL pública para que possa ser compartilhada.

LEIA ANTES DE COMEÇAR:
- docs/brand-brief.md (para sugerir um nome de domínio)
- docs/pages/ (verifique quais arquivos HTML existem — use page-ux-v2.html se existir, senão page-ux-v1.html)

PUBLIQUE COM SURGE.SH:

1. Execute o comando abaixo — substitua [nome-da-marca] por algo baseado no brand-brief:
   npx surge docs/pages [nome-da-marca].surge.sh

2. Se solicitado email e senha, crie uma conta gratuita em surge.sh

3. Após publicar:
   - Confirme que a URL está acessível
   - Abra no celular para verificar responsividade
   - Registre a URL publicada em docs/smart-memory/shared-context.md

RESULTADO ESPERADO:
- URL pública no formato [nome].surge.sh
- Landing page acessível em qualquer dispositivo
- URL registrada na smart-memory do projeto`;

const CMD_SERVE = `npx serve docs/pages -p 4321`;
const CMD_SURGE = `npx surge docs/pages [nome-da-marca].surge.sh`;
const CMD_VERCEL = `npx vercel docs/pages --prod --yes`;
const CMD_OPEN = `open docs/pages/page-ux-v2.html`;
const CMD_RECORD = `# cole no final do shared-context.md
## Deploy
- **URL pública:** https://[nome].surge.sh
- **Publicado em:** $(date +%Y-%m-%d)
- **Versão:** page-ux-v2.html (pós Claude Design)`;

export default function DevOpsPage() {
  return (
    <WorkshopPhaseLayout slug="devops">
      <FacilitatorNote duration="10 min">
        A landing page já existe localmente. Aqui a gente publica para uma URL real e compartilhável. Use o Surge.sh — não precisa de conta configurada, roda direto com npx. Peça para a turma abrir no celular depois de publicar: ver a própria marca no celular é um momento marcante.
      </FacilitatorNote>

      <p className="mb-6 text-base leading-relaxed text-white/70">
        A LP está pronta em <InlineCode>docs/pages/</InlineCode>. Agora vamos subir um servidor local para confirmar, e depois publicar em uma URL pública com Surge.sh — em menos de 2 minutos, a landing page está no ar e pode ser compartilhada.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 08 de 09
      </div>

      {/* PARTE 1 — LOCAL */}
      <div className="mt-10 mb-1 flex items-center gap-3">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)' }}>Local</span>
        <h2 className="text-xl font-bold text-white">Confirmar local antes de publicar</h2>
      </div>

      <Step n={1} label="Abrir a LP final no browser">
        Se preferir abrir sem servidor:
        <CodeBlock label="terminal">{CMD_OPEN}</CodeBlock>
        Ou subir um servidor na porta 4321:
        <CodeBlock label="terminal — novo tab">{CMD_SERVE}</CodeBlock>
        <p className="mt-2 text-white/50">Acesse <InlineCode>localhost:4321/page-ux-v2.html</InlineCode>. Confirme que a V2 está como esperado antes de publicar.</p>
      </Step>

      {/* PARTE 2 — PUBLICAR */}
      <div className="mt-12 mb-1 flex items-center gap-3">
        <span className="px-2 py-0.5 font-mono text-[10px] tracking-[0.15em] uppercase" style={{ fontFamily: MONO, background: 'rgba(255,58,14,0.12)', color: ACCENT, border: '1px solid rgba(255,58,14,0.3)' }}>Publicar</span>
        <h2 className="text-xl font-bold text-white">Publicar em URL pública</h2>
      </div>

      <FacilitatorNote>
        Surge.sh é a opção mais simples para um workshop — sem configuração, sem conta prévia, sem arquivo de config. Um comando e a URL está no ar. Se preferir Vercel, a Opção B gera uma URL profissional com HTTPS e CDN global.
      </FacilitatorNote>

      <Step n={2} label="Pedir ao Claude Code para publicar" sub="com o agente DevOps">
        Cole este prompt no Claude Code — ele vai escolher um nome de domínio baseado no brand-brief e publicar:
        <CodeBlock label="claude code — devops">{PROMPT_DEVOPS}</CodeBlock>
      </Step>

      <Step n={3} label="Ou publicar manualmente" sub="escolha uma opção">
        <div className="space-y-3 mt-2">
          <div className="p-3" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-white/40" style={{ fontFamily: MONO }}>Opção A — Surge.sh (mais simples)</p>
            <CodeBlock label="terminal">{CMD_SURGE}</CodeBlock>
            <p className="mt-1 text-xs text-white/40">Cria conta gratuita se necessário. URL no formato <InlineCode>[nome].surge.sh</InlineCode>.</p>
          </div>
          <div className="p-3" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <p className="mb-1.5 font-mono text-[10px] tracking-[0.12em] uppercase text-white/40" style={{ fontFamily: MONO }}>Opção B — Vercel (URL mais profissional)</p>
            <CodeBlock label="terminal">{CMD_VERCEL}</CodeBlock>
            <p className="mt-1 text-xs text-white/40">Gera URL <InlineCode>[nome].vercel.app</InlineCode> com HTTPS e CDN global.</p>
          </div>
        </div>
      </Step>

      <Step n={4} label="Registrar a URL na smart-memory">
        Abra <InlineCode>docs/smart-memory/shared-context.md</InlineCode> e adicione:
        <CodeBlock label="docs/smart-memory/shared-context.md">{CMD_RECORD}</CodeBlock>
        <p className="mt-2 text-white/50">A URL fica registrada na memória persistente do projeto — qualquer sessão futura do Claude sabe que a página está publicada.</p>
      </Step>

      <Step n={5} label="Abrir no celular e compartilhar">
        Copie a URL e abra no celular. Verifique:
        <ul className="mt-2 space-y-1 text-white/50 list-none ml-0">
          {[
            'Layout responsivo no mobile',
            'Botão CTA clicável com dedo',
            'Tipografia legível sem zoom',
            'Cores consistentes com o brand-brief',
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <span style={{ color: ACCENT }}>→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-white/50">Compartilhe a URL no chat do workshop para que todos vejam a landing page de cada participante.</p>
      </Step>

      <Callout label="O pipeline chegou ao fim">
        Você partiu de uma entrevista de 5 perguntas e chegou a uma landing page publicada, com URL pública, componentes derivados de tokens, e uma smart-memory que documenta cada decisão. Tudo isso em menos de 2 horas — com agentes especializados que leram a mesma pasta e colaboraram sem conflito.
      </Callout>

      <div className="mt-12 p-6" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <p className="text-2xl font-light italic leading-snug text-white" style={{ fontFamily: SERIF }}>
          Do briefing ao deploy.{' '}
          <span className="not-italic font-bold" style={{ fontFamily: DISPLAY, color: ACCENT }}>
            Sem sair do terminal.
          </span>
        </p>
      </div>
    </WorkshopPhaseLayout>
  );
}
