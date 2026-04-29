import type { Metadata } from 'next';
import { WorkshopPhaseLayout } from '../_components/WorkshopPhaseLayout';
import { CodeBlock } from '../_components/CodeBlock';
import { InlineCode } from '../_components/InlineCode';
import { FacilitatorNote } from '../_components/FacilitatorNote';

export const metadata: Metadata = {
  title: 'Fase 02 — Analista | Workshop 2',
  description: 'O agente Analista conduz uma entrevista de marca pessoal e gera o brand-brief.md.',
  alternates: { canonical: '/workshop-2/analista' },
};

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

function Callout({ label = 'Dica', children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="my-8 p-5 text-sm leading-relaxed text-white/80" style={{ borderLeft: `3px solid ${ACCENT}`, background: 'rgba(255,58,14,0.05)' }}>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, color: ACCENT }}>{label}</span>
      {children}
    </div>
  );
}

const PROMPT = `/aiox-analyst

Você é um especialista em branding pessoal. Seu objetivo é entrevistar esta pessoa e criar um brief de marca completo.

Faça exatamente 5 perguntas, uma de cada vez, aguardando minha resposta antes de prosseguir:

1. Qual é o seu nome completo e como prefere ser chamado profissionalmente?
2. Qual é sua área de atuação principal? (ex: design, desenvolvimento, marketing, produto, consultoria)
3. Escolha 3 palavras que descrevem a sensação que sua marca pessoal deve transmitir. Pense em como quer ser percebido.
4. Qual é a sua cor favorita ou a cor que mais te representa? Pode ser um nome, hex ou uma referência ("laranja como pôr do sol").
5. Cite uma marca, designer ou pessoa pública cujo estilo visual te inspira — e diga o que especificamente te atrai nele(a).

Após receber as 5 respostas, crie o arquivo docs/brand-brief.md com o seguinte formato:

---
title: Brand Brief
pessoa: [nome]
area: [área]
criado: [data de hoje]
---

# Brand Brief — [nome]

## Identidade
- **Nome:** [nome completo]
- **Como chamar:** [apelido profissional]
- **Área:** [área de atuação]

## Personalidade da marca
[os 3 adjetivos escolhidos, com 1 frase expandindo cada um]

## Cor principal
- **Hex:** [converter para hex se necessário]
- **Sensação:** [o que essa cor transmite na marca desta pessoa]

## Referência visual
- **Inspiração:** [nome citado]
- **O que atrai:** [síntese do que foi dito]
- **Aplicar em:** [sugestão de como isso se traduz no design system]

## Posicionamento
[parágrafo de 3-4 linhas sintetizando a marca pessoal]`;

const SAMPLE = `---
title: Brand Brief
pessoa: Maria Silva
area: Design de Produto
criado: 2026-04-29
---

# Brand Brief — Maria Silva

## Personalidade da marca
**Precisa:** clareza antes de estética — cada elemento tem função.
**Humana:** tecnologia com calor, nunca fria ou distante.
**Assertiva:** comunica sem ruído, sem decoração desnecessária.

## Cor principal
- Hex: #E85D2F
- Sensação: energia sem agressividade — movimento com propósito.`;

export default function AnalistaPage() {
  return (
    <WorkshopPhaseLayout slug="analista">
      <FacilitatorNote duration="10 min">
        Antes de colar o prompt, pergunte: <em>&ldquo;Quem já sabe qual cor usaria na sua marca?&rdquo;</em> — quebra o gelo. Deixe os participantes responderem as 5 perguntas em silêncio, em paralelo. Não leia as respostas em voz alta — é pessoal. Após todos terminarem, compartilhe o brief de alguém voluntário.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Analista (persona Atlas) conduz uma entrevista de marca pessoal — cinco perguntas, uma de cada vez. Ao final, gera <InlineCode>docs/brand-brief.md</InlineCode> que alimenta todas as fases seguintes.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 02 de 07
      </div>

      <div className="my-6 p-4" style={{ border: '1px solid rgba(255,58,14,0.3)', background: 'rgba(255,58,14,0.04)' }}>
        <span className="block font-mono text-[10px] tracking-[0.18em] uppercase mb-1" style={{ fontFamily: MONO, color: ACCENT }}>Agente</span>
        <strong className="text-base text-white">@aiox-analyst</strong>
        <span className="ml-2 text-sm text-white/50">— Atlas: pesquisa, análise, brand brief</span>
      </div>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Prompt — cole no Claude Code</h2>
      <CodeBlock label="cole no claude code">{PROMPT}</CodeBlock>

      <h2 className="mb-3 mt-10 text-xl font-bold text-white">O que acontece</h2>
      <ol className="ml-0 list-none space-y-3 text-sm text-white/70">
        {[
          'O agente Atlas assume o contexto e faz a primeira pergunta.',
          'Responda com suas palavras reais — quanto mais honesto, mais preciso o resultado.',
          `Após a quinta resposta, o Analista gera docs/brand-brief.md automaticamente.`,
          'O arquivo aparece no Obsidian — abra e confirme que o brief reflete sua identidade.',
          'Se algo estiver errado, edite diretamente no arquivo antes de avançar.',
        ].map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold border" style={{ fontFamily: MONO, color: ACCENT, borderColor: 'rgba(255,58,14,0.35)', background: 'rgba(255,58,14,0.06)' }}>{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>

      <h2 className="mb-2 mt-10 text-xl font-bold text-white">Exemplo de output</h2>
      <CodeBlock label="docs/brand-brief.md">{SAMPLE}</CodeBlock>

      <FacilitatorNote>
        Mostre o <InlineCode>brand-brief.md</InlineCode> aberto no Obsidian — é o primeiro arquivo do vault. O grafo já deve mostrar 1 nó. Na próxima fase, o arquiteto vai criar a estrutura completa e o grafo vai explodir de conexões.
      </FacilitatorNote>

      <Callout label="Sobre as respostas">
        Não tente dar respostas &ldquo;corretas&rdquo; — não há resposta errada. Uma resposta autêntica como <em>&ldquo;quero parecer confiável, mas não formal demais&rdquo;</em> produz um brief muito mais útil do que uma resposta genérica.
      </Callout>
    </WorkshopPhaseLayout>
  );
}
