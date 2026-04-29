import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';

export const metadata: Metadata = {
  title: 'Fase 02 — Analista | Workshop 2',
  description: 'O agente Analista faz uma entrevista de marca pessoal e gera um brief.',
  alternates: { canonical: '/workshop-2/analista' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="my-4 overflow-x-auto p-4 text-sm leading-relaxed"
      style={{
        fontFamily: MONO,
        background: '#1a1a1a',
        borderLeft: `3px solid ${ACCENT}`,
        color: 'rgba(255,255,255,0.85)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
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

const PROMPT = `/aiox-analyst

Você é um especialista em branding pessoal. Faça exatamente 5 perguntas, uma de cada vez, esperando minha resposta antes de prosseguir:

1. Qual é o seu nome completo e como prefere ser chamado?
2. Qual é sua área de atuação principal? (ex: design, dev, marketing, produto)
3. Escolha 3 palavras que descrevem a sensação que sua marca deve passar
4. Qual é a sua cor favorita? (pode ser um hex, nome ou referência)
5. Cite uma marca ou pessoa pública cujo visual te inspira

Após as 5 respostas, crie o arquivo docs/brand-brief.md com: nome, área, personalidade (as 3 palavras), cor principal (convertida para hex), referência visual e um parágrafo de posicionamento de marca.`;

export default function AnalistaPage() {
  return (
    <WorkshopPhaseLayout slug="analista">
      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Analista (persona Atlas) conduz uma entrevista de marca pessoal — cinco perguntas,
        uma de cada vez — e ao final gera o arquivo{' '}
        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 text-xs" style={{ fontFamily: MONO }}>
          docs/brand-brief.md
        </code>{' '}
        que vai alimentar todas as fases seguintes.
      </p>

      <div
        className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase"
        style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}
      >
        10 min · Fase 02 de 07
      </div>

      <div
        className="my-6 p-4"
        style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}
      >
        <span
          className="block font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: ACCENT }}
        >
          Agente
        </span>
        <strong className="text-base text-white">@aiox-analyst</strong>
        <span className="ml-2 text-sm text-white/50">— Atlas: pesquisa, análise, brief</span>
      </div>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <p className="mb-2 text-sm text-white/55">
        Copie o bloco abaixo e cole diretamente na sessão do Claude Code:
      </p>

      <CodeBlock>{PROMPT}</CodeBlock>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">O que acontece</h2>
      <ol className="ml-0 list-none space-y-3 text-sm text-white/70">
        {[
          'O agente Atlas assume o contexto e faz a primeira pergunta.',
          'Responda com calma — use suas palavras reais, não respostas de teste.',
          'Após a quinta resposta, o analista cria automaticamente docs/brand-brief.md.',
          'Abra o arquivo no Obsidian e confirme que todas as informações estão corretas.',
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border"
              style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}
            >
              {i + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <Callout>
        Responda com calma — o analista vai usar tudo que você disser para construir sua identidade.
        Quanto mais específico e honesto for, mais preciso será o design system final.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
