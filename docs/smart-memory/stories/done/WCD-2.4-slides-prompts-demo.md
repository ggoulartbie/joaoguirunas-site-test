---
title: "Story WCD-2.4: Slides 08-10 — Prompt DS + Prompt Apresentação + Demo Final"
type: story
status: done
epic: WCD-2
complexity: M
mode: yolo
agent: sites-dev-alpha
created: 2026-06-19
updated: 2026-06-19
tags: [story, workshop-claude-design, slides]
related: ["WCD-2.3", "WCD-3.1"]
---

# Story WCD-2.4: Slides 08-10 — Prompt DS + Prompt Apresentação + Demo Final

## Objetivo
Implementar os slides finais com os prompts reutilizáveis e a demo ao vivo de criação de slides com base no pitch da palestrante.

## Acceptance Criteria

### Slide 08 — `prompt-design-system`
- [ ] AC1: `src/app/workshop-claude-design/prompt-design-system/page.tsx` criado
- [ ] AC2: Usa `WorkshopClaudeDesignLayout` com `slug="prompt-design-system"`
- [ ] AC3: Título: "Prompt: Design System"
- [ ] AC4: Seção "O template" com o prompt abaixo em bloco de código (`font-mono`, `bg-surface`, borda `ACCENT`, copiável):
```
Crie um design system completo para a empresa [NOME DA EMPRESA].

Contexto:
- Setor: [ex: consultoria de gestão, tecnologia, saúde]
- Valores da marca: [ex: clareza, autoridade, proximidade]
- Público-alvo: [ex: donos de PMEs, CFOs de empresas médias]
- Tom de voz: [ex: direto, sem jargão, confiante mas acessível]
- Estética desejada: [ex: minimalista, sofisticada, contemporânea]

Entregue:
1. Paleta de cores (primária, secundária, neutros, acento) com HEX e uso de cada
2. Escala tipográfica (display, heading, body, mono) com fontes e tamanhos
3. Regras de espaçamento e grid
4. Tom de voz: 3 DOs e 3 DON'Ts com exemplos de frase
5. Guia de aplicação: como usar em slides, redes sociais e site
```
- [ ] AC5: Seção "Exemplo real" com o mesmo template preenchido para uma empresa fictícia (ex: Consultoria Vox)
- [ ] AC6: Nota: "Preencha os colchetes com seus dados. Quanto mais específico, melhor o resultado."
- [ ] AC7: Metadata: `title: 'Prompt: Design System | Workshop Claude Design'`, canonical `/workshop-claude-design/prompt-design-system`

### Slide 09 — `prompt-apresentacao`
- [ ] AC8: `src/app/workshop-claude-design/prompt-apresentacao/page.tsx` criado
- [ ] AC9: Usa `WorkshopClaudeDesignLayout` com `slug="prompt-apresentacao"`
- [ ] AC10: Título: "Prompt: Apresentação / Slides"
- [ ] AC11: Seção "O template" com o prompt abaixo em bloco de código copiável:
```
Com base no texto abaixo, crie uma apresentação de slides para pitch comercial.

Contexto:
- Público: [ex: potencial cliente, investidor, parceiro estratégico]
- Objetivo da conversa: [ex: fechar diagnóstico, apresentar proposta, fazer networking]
- Tom: [ex: direto e consultivo, inspirador e estratégico]

Estrutura sugerida:
1. Abertura — o problema que o cliente tem (não o que você faz)
2. Posicionamento — quem você é e o que você entrega (1 frase clara)
3. Prova — experiência ou resultado que comprova o ponto
4. Oferta — o próximo passo concreto
5. Fechamento — a frase que gera curiosidade ou ação

Texto de referência (seu pitch atual):
[COLE SEU PITCH AQUI]
```
- [ ] AC12: Nota em destaque: "O melhor sinal de que seu pitch funcionou é quando a pessoa diz: 'interessante, me explica melhor'."
- [ ] AC13: Metadata: `title: 'Prompt: Apresentação | Workshop Claude Design'`, canonical `/workshop-claude-design/prompt-apresentacao`

### Slide 10 — `demo-slides`
- [ ] AC14: `src/app/workshop-claude-design/demo-slides/page.tsx` criado
- [ ] AC15: Usa `WorkshopClaudeDesignLayout` com `slug="demo-slides"`
- [ ] AC16: Título: "Demo Final — Criando slides do pitch ao vivo"
- [ ] AC17: Seção "O pitch que vamos usar" — exibe o pitch completo da palestrante em bloco estilizado com borda left `WARM #FF6B35`, fundo `SURFACE`, `font-mono text-sm`, scroll se necessário. Texto completo ver Contexto Técnico.
- [ ] AC18: Seção "O que fazer agora" — 3 passos:
  1. Abra `claude.ai` · clique em **New conversation** · selecione **Slides**
  2. Cole o prompt da página anterior com o pitch acima preenchido
  3. Personalize com os seus dados e exporte
- [ ] AC19: Box de encerramento com fundo `ACCENT #9B6DFF`, texto branco: "Você saiu hoje com um sistema. Não com um slide."
- [ ] AC20: Metadata: `title: 'Demo Final | Workshop Claude Design'`, canonical `/workshop-claude-design/demo-slides`

## Escopo
**IN:** `prompt-design-system/page.tsx`, `prompt-apresentacao/page.tsx`, `demo-slides/page.tsx`
**OUT:** QA Gate (WCD-3.1)

## Contexto Técnico

### Pitch completo da palestrante (usar no AC17 exatamente):
"Antes de alguém entender tecnicamente o que você entrega, essa pessoa já está formando uma percepção sobre você. O mercado lê sinais o tempo todo.

Uma boa solução mal apresentada pode parecer fraca. Uma solução simples, bem posicionada, pode parecer muito mais valiosa.

Pitch não é decorar uma fala bonita. Pitch é traduzir posicionamento em uma mensagem clara.

Eu ajudo empresas a transformarem comunicação confusa em posicionamento claro, visualmente forte e comercialmente mais estratégico.

O melhor sinal de que seu pitch funcionou é quando a pessoa diz: 'interessante, me explica melhor'.

Desconecte-se de termos corporativos vagos, traga palpabilidade e foco imediato no benefício que o cliente recebe no final da jornada.

Não fale tudo o que você sabe. Fale o que aquela pessoa precisa entender para avançar.

Se você só apresenta dados, pode ser muito frio e racional. Se você só conta história, pode parecer frágil. O jogo está em unir os dois com maestria.

A sua experiência deve provar o ponto que você está defendendo, não ocupar espaço por mera vaidade pessoal.

Se a sua fala promete estratégia, mas seus slides parecem improvisados, a percepção de valor quebra instantaneamente na mente do cliente.

Um pitch confuso não gera profundidade. Gera dúvida imediata, e cliente com dúvida simplesmente diz 'não'.

O mercado não compra apenas o que você faz. Ele compra o que consegue entender, confiar e lembrar sobre você."

### Tokens inline
`BG='#0D0B12'`, `SURFACE='#161322'`, `TEXT='#EDE9FF'`, `MUTED='#8B84A7'`, `ACCENT='#9B6DFF'`, `WARM='#FF6B35'`

### Blocos de código copiáveis
Usar padrão do site ou estilo simples: `<pre>` com `bg-[#161322]`, `border border-[#9B6DFF]/30`, `p-4 rounded-none`, `font-mono text-sm text-[#EDE9FF]`, `overflow-x-auto`

## Dev Agent Record
| Campo | Valor |
|---|---|
| Agente | Nova-S (sites-dev-alpha) |
| Iniciado | 2026-06-19 |
| Concluído | 2026-06-19 |
| Branch | worktree-wcd-workshop-claude-design |

## File List
- `src/app/workshop-claude-design/prompt-design-system/page.tsx`
- `src/app/workshop-claude-design/prompt-apresentacao/page.tsx`
- `src/app/workshop-claude-design/demo-slides/page.tsx`

## QA Results
