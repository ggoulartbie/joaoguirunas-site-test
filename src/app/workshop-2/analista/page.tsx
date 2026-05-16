export const dynamic = 'force-dynamic'

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

Você é um especialista em branding pessoal e estratégia de posicionamento. Seu objetivo é entrevistar esta pessoa com profundidade e criar um brand brief completo que vai guiar todo o design system e a landing page dela.

Faça exatamente 8 perguntas, uma de cada vez, aguardando minha resposta antes de prosseguir. Não pule nenhuma.

1. Qual é o seu nome completo e como prefere ser chamado profissionalmente?

2. Qual é sua área de atuação principal e o que exatamente você entrega para seus clientes ou empregadores? Seja específico — não "designer", mas "designer de produto que transforma fluxos complexos em interfaces simples para startups B2B".

3. Quem é o seu público-alvo ideal? Descreva a pessoa ou empresa que você quer atrair — setor, tamanho, momento, dores principais.

4. Qual é o seu principal diferencial? O que te faz diferente de outras pessoas na mesma área? Pode ser um método, uma combinação de habilidades, uma perspectiva ou uma forma de trabalhar.

5. Escolha 3 adjetivos que descrevem a sensação que sua marca pessoal deve transmitir. Pense em como quer ser percebido por quem nunca te viu antes.

6. Como você quer soar? Escolha um ponto no espectro e explique: muito formal ←→ muito informal / muito técnico ←→ muito acessível.

7. Qual é a sua cor favorita ou a cor que mais te representa? Pode ser um nome, hex, ou uma referência visual ("azul petróleo", "laranja como pôr do sol", "verde musgo").

8. Cite uma marca, designer, site ou pessoa pública cujo estilo visual te inspira — e diga o que especificamente te atrai: tipografia, cores, densidade, sensação geral.

═══════════════════════════════
APÓS AS 8 RESPOSTAS, CRIE: docs/brand-brief.md
═══════════════════════════════

---
title: Brand Brief
pessoa: [nome]
area: [área]
publico: [público-alvo]
criado: [data de hoje]
---

# Brand Brief — [nome]

## Identidade
- **Nome:** [nome completo]
- **Como chamar:** [apelido profissional]
- **Área:** [área de atuação detalhada]
- **Entrega:** [o que concretamente entrega — da resposta 2]

## Público-alvo
[2-3 frases descrevendo quem é o cliente/empregador ideal — setor, momento, dores]

## Diferencial
[1-2 frases: o que torna esta pessoa única no mercado — da resposta 4]

## Personalidade da marca
**[Adjetivo 1]:** [1 frase expandindo o que isso significa na prática visual e de comunicação]
**[Adjetivo 2]:** [1 frase expandindo]
**[Adjetivo 3]:** [1 frase expandindo]

## Tom de voz
- **Posição no espectro:** [formal/informal] · [técnico/acessível]
- **Na prática:** [como isso se manifesta nos textos — ex: "sem jargão, frases curtas, tuteia"]
- **Taglines que funcionam:** [2 exemplos de frases no tom certo]
- **Evitar:** [1-2 exemplos de linguagem que não combina]

## Cor principal
- **Hex:** [converter para hex]
- **Nome evocativo:** [como a pessoa descreveu]
- **Sensação:** [o que essa cor transmite para esta marca específica]
- **Combinações sugeridas:** [1 cor de suporte + 1 neutra que funcionam juntas]

## Referência visual
- **Inspiração:** [nome/site citado]
- **O que atrai:** [síntese específica — tipografia? espaço? cor? densidade?]
- **Aplicar em:** [como traduzir isso para o design system desta pessoa]

## Posicionamento
[parágrafo de 4-5 linhas sintetizando a marca pessoal completa — quem é, para quem, com que sensação, com que diferencial]

## Copy de base
Com base nas respostas, escreva já:
- **Headline do hero:** [1 frase de até 8 palavras — impacto imediato]
- **Subtítulo:** [1 frase de até 15 palavras expandindo o headline]
- **Tagline curta:** [3-5 palavras que cabem num badge ou bio de rede social]
- **CTA principal:** [texto do botão — 2-4 palavras, ação clara]`;

const SAMPLE = `---
title: Brand Brief
pessoa: Maria Silva
area: Design de Produto
publico: Startups B2B em fase de product-market fit
criado: 2026-04-29
---

# Brand Brief — Maria Silva

## Identidade
- **Nome:** Maria Silva
- **Como chamar:** Mari
- **Área:** Design de produto — transforma fluxos complexos em interfaces que retêm
- **Entrega:** Pesquisa, wireframes, protótipos e handoff — do problema ao componente

## Público-alvo
Startups B2B com produto técnico e time pequeno. Founders e CPOs que sabem que
o produto tem potencial mas a experiência afasta usuários na primeira semana.

## Diferencial
Une raciocínio de engenharia com sensibilidade visual — entende o código
e o negócio antes de abrir o Figma.

## Personalidade da marca
**Precisa:** clareza antes de estética — cada elemento tem função documentada.
**Humana:** tecnologia com calor, nunca fria ou intimidadora.
**Assertiva:** comunica sem ruído, sem decoração que não entrega significado.

## Tom de voz
- **Posição no espectro:** levemente informal · acessível sem perder autoridade
- **Na prática:** frases curtas, tuteia, zero jargão de consultoria
- **Taglines que funcionam:** "Produto que as pessoas entendem." / "Clareza é design."
- **Evitar:** palavras como "sinergias", "ecossistema", "holístico"

## Cor principal
- **Hex:** #E85D2F
- **Nome evocativo:** laranja terracota — como barro cozido ao sol
- **Sensação:** energia sem agressividade, movimento com propósito
- **Combinações:** #E85D2F + off-white #F5F0EB + carvão #1A1A1A

## Copy de base
- **Headline:** Design que os seus usuários entendem.
- **Subtítulo:** Produto claro desde o primeiro clique — sem tutorial, sem suporte.
- **Tagline:** Clareza é design.
- **CTA:** Falar sobre o projeto`;

export default function AnalistaPage() {
  return (
    <WorkshopPhaseLayout slug="analista">
      <FacilitatorNote duration="10 min">
        Antes de colar o prompt, pergunte: <em>&ldquo;Quem já sabe qual cor usaria na sua marca?&rdquo;</em> — quebra o gelo. Deixe os participantes responderem em silêncio, em paralelo. Não leia as respostas em voz alta — é pessoal. Após todos terminarem, compartilhe o brief de alguém voluntário — especialmente a seção &ldquo;Copy de base&rdquo;, que já traz o headline da LP.
      </FacilitatorNote>

      <p className="mb-8 text-base leading-relaxed text-white/70">
        O agente Analista conduz uma entrevista de marca pessoal — oito perguntas, uma de cada vez. Vai fundo em público-alvo, diferencial e tom de voz. Ao final, gera <InlineCode>docs/brand-brief.md</InlineCode> com identidade completa e já escreve o copy de base da landing page — headline, subtítulo, tagline e CTA.
      </p>

      <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase" style={{ fontFamily: MONO, border: '1px solid rgba(255,58,14,0.4)', background: 'rgba(255,58,14,0.08)', color: ACCENT }}>
        10 min · Fase 02 de 10
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
          'O agente assume o contexto e faz a primeira pergunta.',
          'Responda com suas palavras reais — quanto mais específico, mais preciso o resultado.',
          'Após a oitava resposta, o Analista gera docs/brand-brief.md automaticamente.',
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
