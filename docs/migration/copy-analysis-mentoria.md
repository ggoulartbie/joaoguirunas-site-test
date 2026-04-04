# Copy Analysis — Pagina /mentoria (Next.js)

> **Revisor:** Yudhishthira (Copywriter)
> **Data:** 2026-04-04
> **Arquivos analisados:**
> - `next-app/src/app/mentoria/page.tsx` (pagina principal)
> - `next-app/src/app/mentoria/mentorship-features.tsx` (diferenciais)
> - `next-app/src/app/mentoria/course-modules-timeline.tsx` (modulos/timeline)
> - `next-app/src/app/mentoria/faq-accordion.tsx` (FAQ)
> - `next-app/src/app/mentoria/pricing-calculator.tsx` (calculadora/investimento)
> - `next-app/src/app/mentoria/revos-form.tsx` (formulario)

---

## Nota Geral: 7/10

A pagina migrada para Next.js e uma evolucao significativa da versao Astro. A calculadora interativa e uma adicao forte. Porem, persistem problemas criticos de inconsistencia de dados (vagas, duracao), excesso de CTAs, e a copy de algumas secoes pode ser mais afiada.

---

## 1. HERO

**Headline:** "Tenha uma Equipe de Agentes de IA Trabalhando Para Voce 24/7"
**Subheadline:** "Aprenda a criar, configurar e orquestrar agentes autonomos que executam tarefas complexas para voce — da escrita de codigo a criacao de conteudo. Mentoria intensiva e pratica."

### Analise

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Clareza | 8/10 | Headline comunica a promessa principal com clareza |
| Urgencia | 7/10 | Badge "Restam somente 4 vagas" funciona, mas e estatico/hardcoded |
| Diferenciacao | 6/10 | "Trabalhando Para Voce 24/7" e forte, mas "agentes de IA" ja esta saturado no mercado |
| Subheadline | 7/10 | Funcional, mas tenta cobrir muita coisa (codigo + conteudo) |

### Problemas Encontrados

1. **Badge de urgencia hardcoded:** "Restam somente 4 vagas" esta fixo no codigo. Na versao Astro, havia conflito (4 vs 8 vagas). O problema persiste — o numero nao e dinamico.
2. **Microcopy inferior inconsistente:** "Max. 12 pessoas" no hero vs dados de encontros que implicam 8 semanas (mas a timeline diz 4 semanas). Confuso.
3. **"Garantia 7 dias"** aparece no hero sem explicacao. Gera mais duvidas do que confianca nesta posicao.
4. **Dual CTA:** "Fale com um Especialista" + "Como Funciona" e uma boa combinacao. O secundario redireciona para `#como-funciona`, o que faz sentido.

### Veredicto: **MELHORAR**

**Sugestoes:**
- Tornar o numero de vagas dinamico (via config ou API)
- Remover "Garantia 7 dias" do hero — mover para secao de investimento onde tem contexto
- Reescrever subheadline para ser mais especifica e menos generica:
  - **Atual:** "Aprenda a criar, configurar e orquestrar agentes autonomos que executam tarefas complexas para voce — da escrita de codigo a criacao de conteudo."
  - **Sugestao:** "Em 4 semanas, voce monta uma equipe de agentes IA que escreve codigo, cria conteudo, automatiza tarefas — e opera 24/7 sem supervisao."

---

## 2. PROBLEMA

**Headline:** "Voce sabe que IA e o futuro. Mas ainda nao conseguiu aproveitar o potencial dela."

### Analise

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Articulacao da dor | 9/10 | Excelente. Framework PAS bem executado |
| Relevancia | 9/10 | Os 3 pain points sao universais para o publico-alvo |
| Emocao | 8/10 | "Enquanto voce espera, seus concorrentes ja estao usando" e forte |
| Estrutura | 7/10 | XItem list funciona bem, mas o paragrafo introdutorio pode ser mais curto |

### Problemas Encontrados

1. **"Apenas 8 vagas disponiveis"** aparece no final desta secao (linha 177), contradizendo as "4 vagas" do hero. **Este e o problema #1 da pagina inteira.**
2. **Paragrafo introdutorio longo demais:** "Voce ja usa ChatGPT, Claude, talvez ate outros modelos. Mas no fundo, sabe que esta subutilizando." poderia ser condensado.

### Veredicto: **MELHORAR** (copy excelente, mas consertar inconsistencia de vagas)

**Sugestoes:**
- Unificar numero de vagas em variavel unica (`VAGAS_DISPONIVEIS`)
- Condensar intro: remover "Voce ja usa ChatGPT, Claude, talvez ate outros modelos" (premissa que nem todo publico da mentoria confirma)
- O fechamento "enquanto voce espera, seus concorrentes ja estao usando" e **excelente** — MANTER

---

## 3. SOLUCAO

**Headline:** "Imagine ter uma equipe de especialistas trabalhando para voce 24/7"

### Analise

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Transicao PAS→BAB | 8/10 | Boa transicao do problema para a visao do "depois" |
| Tangibilidade | 8/10 | "dev senior, QA, designer, copywriter" torna concreto |
| Aspiracao | 7/10 | "Isso nao e ficcao cientifica" e eficaz mas um pouco cliche |
| Escalabilidade da promessa | 9/10 | "10 posts de LinkedIn, 5 apresentacoes, 20 PRs em uma tarde" e especifico e forte |

### Problemas Encontrados

1. **Headline repete conceito do Hero:** "Trabalhando Para Voce 24/7" (hero) vs "trabalhando para voce 24/7" (solucao). Repeticao quase identica.
2. **Sem CTA proprio** — correto. A secao de solucao deve fluir para a proxima secao, nao ter CTA independente.

### Veredicto: **MELHORAR** (headline)

**Sugestoes:**
- Diferenciar headline da solucao do hero. Opcoes:
  - "E se voce pudesse multiplicar sua equipe sem contratar ninguem?"
  - "De onde voce esta para onde voce quer chegar — com agentes IA"
- MANTER os 3 bullet points — sao fortes e tangíveis
- MANTER o fechamento "Isso nao e ficcao cientifica..."

---

## 4. COMO FUNCIONA — 8 Encontros

**Headline:** "Do Zero ao Time Completo em 4 Semanas"

### Analise

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Clareza | 8/10 | Cards individuais sao claros com numero, tipo, titulo, data, subtitulo |
| Expectativa | 7/10 | Subtitulos geram expectativa ("Dominando o Claude Code", "Skills") |
| Progressao | 8/10 | Sequencia logica: setup → dominio → skills → MCP → AIOX → squads → integracoes → apresentacao |

### Problemas Encontrados

1. **"4 Semanas" no titulo mas 8 encontros espalhados por ~4 semanas (2 a 30 de Maio = ~4 semanas).** A FAQ diz "6-8 semanas (aproximadamente 2 meses)". **INCONSISTENCIA CRITICA.**
2. **Datas hardcoded de Maio 2025:** Todas as datas dos 8 encontros estao fixas no codigo. Quando mudar de turma, sera necessario alterar manualmente.
3. **Apenas o encontro 01 tem "deliverables" (Voce sai com:).** Os outros 7 nao. Oportunidade perdida.
4. **Subtitulos curtos demais em alguns encontros:** "Expanda os Poderes dos Seus Agentes (2h)" — o que significa "skills" para quem nao conhece o framework?

### Veredicto: **MELHORAR**

**Sugestoes:**
- Corrigir inconsistencia: se sao 4 semanas, FAQ deve dizer 4 semanas. Se sao 6-8, titulo deve refletir isso. **Recomendacao:** titulo "4 Semanas" esta correto (2-30 Mai = ~4 semanas), FAQ precisa ser atualizada.
- Mover datas para variavel/config (`turmaAtual.encontros[]`)
- Adicionar "Voce sai com:" para TODOS os 8 encontros (mesmo que 1-2 itens por card)
- Melhorar subtitulos vagos:
  - "Expanda os Poderes dos Seus Agentes" → "Instale skills de imagem, video, design e automacao"
  - "Integre Seus Agentes com o Mundo" → "Conecte agentes ao Gmail, Slack, GitHub e mais"

---

## 5. DIFERENCIAIS (mentorship-features.tsx)

**Headline:** "Nao E Mais Um Curso Online. E Uma Transformacao Guiada."
**Sub:** "Descubra por que nossa mentoria e diferente de tudo que voce ja viu"

### Analise dos 3 Cards

| Diferencial | Nota | Observacao |
|-------------|------|------------|
| Desbloqueio Mental com Claudia | 8/10 | Unico e diferenciador. "Voce nao vai ouvir isso em nenhum curso tecnico" e forte |
| Turmas de No Maximo 12 Pessoas | 6/10 | Generico. Todo curso premium promete turmas pequenas |
| Squad Personalizada Para Seu Contexto | 9/10 | **O mais forte.** "Voce sai com algo funcionando para SEU trabalho" e a killer line |

### Problemas Encontrados

1. **"Psicanalista e Socia da GrowthSales"** no card da Claudia vs **"Co-Fundadora GrowthSales.ai"** na secao facilitadores. Inconsistencia de role (ja flagada no copy-review.md da versao Astro e persiste no Next.js).
2. **Headline "Nao E Mais Um Curso Online"** e eficaz mas generico. Todo info-produto usa variacao disso.
3. **Sub-headline fraco:** "Descubra por que nossa mentoria e diferente de tudo que voce ja viu" — promessa vaga. Diferente como?

### Veredicto: **MELHORAR**

**Sugestoes:**
- **Card "Turmas de No Maximo 12 Pessoas":** Reescrever para focar no RESULTADO, nao na feature:
  - **Titulo:** "Ninguem Fica Para Tras"
  - **Highlights:** "Turmas de no maximo 12 pessoas", "Troubleshooting ao vivo no SEU projeto", "Voce nao vira espectador — vira protagonista"
- **Sub-headline:** Reescrever com especificidade:
  - **Atual:** "Descubra por que nossa mentoria e diferente de tudo que voce ja viu"
  - **Sugestao:** "3 coisas que nenhum curso online de IA oferece"
- **Claudia:** Padronizar role. Sugestao: "Psicanalista e Co-Fundadora GrowthSales.ai"
- MANTER card "Squad Personalizada" exatamente como esta — e o melhor dos 3

---

## 6. MODULOS / TIMELINE (course-modules-timeline.tsx)

**Headline:** "Do Zero ao Time Completo em 4 Semanas"

### Analise

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Clareza | 7/10 | Descricoes sao boas mas poderiam ser mais especificas |
| Progressao | 8/10 | Fundamentos → Squad → Automacao → Deploy = arco logico |
| Visual | 8/10 | Timeline vertical com animacao e tags funciona bem |

### Problemas Encontrados

1. **DUPLICACAO:** Esta secao repete o headline "Do Zero ao Time Completo em 4 Semanas" e o conceito da secao "Como Funciona". **Sao DUAS secoes cobrindo o mesmo tema** (8 encontros detalhados + 4 semanas resumidos).
2. **Semana 3 — "Automacao e Integracao":** Descricao generica. "Integracao com ferramentas do dia a dia" — quais ferramentas?
3. **Semana 4 — "Deploy e Autonomia":** "Voce sai pronto para operar com IA sem depender de ninguem" e a melhor frase da secao.
4. **Tags repetitivas:** "Projetos Reais" (Semana 2) poderia estar em todas as semanas.

### Veredicto: **SUPRIMIR ou FUNDIR**

**Justificativa:** A pagina tem duas secoes que cobrem a mesma informacao:
- **"Como Funciona" (8 encontros):** Detalhado, com datas, subtitulos, entregaveis
- **"Modulos Timeline" (4 semanas):** Resumido, com tags

**Recomendacao:** Manter APENAS uma. A secao "Como Funciona" (8 encontros) e mais detalhada e util. A timeline de 4 semanas pode ser um RESUMO no topo da secao "Como Funciona", nao uma secao separada. Alternativamente, suprimir a secao de 8 encontros e usar apenas a timeline, expandindo as descricoes.

---

## 7. FACILITADORES

### Analise

| Facilitador | Nota | Observacao |
|-------------|------|------------|
| Joao Guirunas | 6/10 | Bio generica. "Pioneiro em orquestracao de agentes autonomos" e uma claim forte mas sem proof |
| Claudia Guirunas | 5/10 | Bio nao menciona "Psicanalista" — que e seu diferencial na mentoria |

### Problemas Encontrados

1. **Bio do Joao:** "Especialista em IA aplicada a vendas e marketing" e generico. Nao menciona AIOX pelo nome, nao menciona experiencia concreta (anos, clientes, resultados).
2. **Bio da Claudia:** "Especialista em transformacao digital e implementacao de IA em processos de vendas. Focada em resultados mensuraveis e ROI." — Isso e um LinkedIn summary, nao uma bio de LP. **Nao menciona que ela e psicanalista**, que e exatamente o que torna a mentoria unica (secao de desbloqueio mental).
3. **Role inconsistente (novamente):**
   - Features card: "Psicanalista e Socia da GrowthSales"
   - Facilitadores: "Co-Fundadora GrowthSales.ai"
4. **Sem social proof:** Nenhum numero, resultado, depoimento, case study. Dois nomes com bios genericas.

### Veredicto: **REESCREVER**

**Propostas:**

**Joao Guirunas:**
- **Role:** "Fundador GrowthSales.ai · Criador do AIOX"
- **Bio:** "Engenheiro de software com mais de X anos de experiencia. Criou o framework AIOX para orquestrar agentes autonomos e ja ajudou Y profissionais a montar seus times de IA. Vive e trabalha com Claude Code diariamente."

**Claudia Guirunas:**
- **Role:** "Co-Fundadora GrowthSales.ai · Psicanalista"
- **Bio:** "Psicanalista que descobriu que o maior bloqueio para adotar IA nao e tecnico — e mental. Conduz as sessoes de desbloqueio que eliminam a ansiedade da tela preta e destravam o uso real das ferramentas."

---

## 8. CALCULADORA / INVESTIMENTO (pricing-calculator.tsx)

**Headline:** "Compare o Custo Anual de uma Equipe Tradicional vs Claude Code Agents"

### Analise

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Conceito | 9/10 | **Excelente adicao.** Calculadora interativa e um upgrade massivo vs versao Astro |
| Framing | 8/10 | Comparar custo anual de equipe vs investimento unico e persuasivo |
| Interatividade | 9/10 | Selecao de squads + toggle de profissionais + animacao de economia |
| Valores | 6/10 | Salarios em R$ mas rotulos em ingles ("Senior Developer", "DevOps Engineer"). Inconsistente |

### Problemas Encontrados

1. **Salarios parecem em USD convertidos:** R$ 144.000/ano para Senior Developer, R$ 156.000/ano para DevOps. Sao valores de mercado americano, nao brasileiro. Se o publico e BR, deveria usar valores BR (~R$ 180k para Senior, ~R$ 200k para DevOps em grandes empresas, ou ~R$ 96k-120k em media). Se o publico e global, usar USD.
2. **Labels em ingles:** "Senior Developer", "DevOps Engineer", "Growth Marketer" — mas todo o resto da pagina esta em portugues.
3. **"Investimento Unico"** e ambiguo. R$ 8.700 e o preco da mentoria, nao do "Claude Code Agents". A calculadora compara custo de EQUIPE vs custo de SETUP DE AGENTES (mentoria), mas isso nao fica claro. Alguem pode pensar que R$ 8.700 e o custo de rodar agentes.
4. **Checklist mistura entregaveis da mentoria com beneficios de agentes:** "8 encontros" e da mentoria; "Disponibilidade 24/7" e de agentes. Mixing concerns.
5. **"Satisfacao garantida"** no trust indicator vs FAQ que diz "Entre em contato conosco para saber mais sobre as condicoes e garantias" — a FAQ nao confirma a garantia, tornando-a vaga.
6. **Squad "Branding" tem "Web Designer" duplicado** com a squad "Social Media" — mesmos profissionais com roles identicos.

### Veredicto: **MELHORAR**

**Sugestoes:**
- Validar salarios para mercado BR ou explicitar que sao valores internacionais
- Traduzir labels ou manter bilingual com intencao (ex: "Desenvolvedor Senior (Senior Dev)")
- Esclarecer que R$ 8.700 e o investimento na mentoria, que ENSINA a montar a equipe de agentes
- Separar checklist em 2 blocos: "O que voce recebe" (mentoria) e "O que voce ganha" (capacidade)
- Resolver ambiguidade da garantia na FAQ

---

## 9. FAQ (faq-accordion.tsx)

### Analise de Cobertura

| # | Pergunta | Objecao que cobre | Veredicto |
|---|----------|-------------------|-----------|
| 1 | Preciso saber programar? | Barreira tecnica | **MANTER** — essencial |
| 2 | Qual computador eu preciso? | Requisitos | **MANTER** |
| 3 | Preciso de software pago? | Custo oculto | **MANTER** — honesto sobre Claude Pro |
| 4 | As aulas online sao ao vivo? | Formato | **MANTER** |
| 5 | E se eu nao puder ir a Florianopolis? | Logistica | **MANTER** — mas agressivo ("esperar turma futura") |
| 6 | Quanto tempo dura o programa? | Compromisso de tempo | **MELHORAR** — diz "6-8 semanas" mas pagina diz "4 semanas" |
| 7 | Vou conseguir criar minha propria squad? | Resultado | **MANTER** |
| 8 | Posso usar os agentes comercialmente? | Licenciamento | **MANTER** |
| 9 | Terei suporte depois do programa? | Pos-venda | **MANTER** |
| 10 | O que acontece se eu nao gostar? | Risco/garantia | **REESCREVER** — resposta evasiva |

### Problemas Encontrados

1. **Pergunta 6 — INCONSISTENCIA CRITICA:** "Sao 8 encontros distribuidos ao longo de 6-8 semanas (aproximadamente 2 meses)" contradiz o headline "Do Zero ao Time Completo em 4 Semanas" e a timeline de 4 semanas. As datas dos encontros (2 Mai - 30 Mai) sao ~4 semanas. A FAQ esta ERRADA.

2. **Pergunta 10 — Resposta evasiva:** "Entre em contato conosco para saber mais sobre as condicoes e garantias da mentoria." Isso e um non-answer. O hero diz "Garantia 7 dias" e a calculadora diz "Satisfacao garantida". Se tem garantia, diga claramente. Se nao tem, remova os badges.

3. **Perguntas que FALTAM:**
   - "Quanto custa?" — a objecao #1 de qualquer LP. Mesmo com a calculadora, a FAQ deve ter a resposta direta.
   - "Tem certificado?" — mencionado nos entregaveis mas nao no FAQ.
   - "Posso parcelar?" — mencionado na calculadora (12x) mas nao no FAQ.

### Veredicto: **MELHORAR**

**Sugestoes:**
- **Pergunta 6:** Corrigir para "4 semanas" (conforme datas reais dos encontros)
- **Pergunta 10:** Reescrever com clareza:
  - Se tem garantia: "Voce tem 7 dias apos o primeiro encontro para pedir reembolso integral, sem perguntas."
  - Se nao tem: remover "Garantia 7 dias" do hero e "Satisfacao garantida" da calculadora
- **Adicionar:**
  - "Quanto custa a mentoria?" — R$ 8.700 a vista ou 12x de R$ 725
  - "Tem certificado?" — Sim, certificado de conclusao emitido pela GrowthSales.ai
  - "Posso parcelar?" — Sim, em ate 12x no cartao

---

## 10. CTAs — MAPEAMENTO COMPLETO

| # | Secao | Label do CTA | Destino | Veredicto |
|---|-------|-------------|---------|-----------|
| 1 | Hero | "Fale com um Especialista" | #inscricao | MANTER |
| 2 | Hero | "Como Funciona" | #como-funciona | MANTER |
| 3 | Problema | "Quero Sair na Frente" | #inscricao | MELHORAR label |
| 4 | Apos Como Funciona | "Quero Participar" | #inscricao | MANTER |
| 5 | Apos Diferenciais | "Quero Comecar" | #inscricao | SUPRIMIR (secao desnecessaria) |
| 6 | Features (interno) | "Fale com um Especialista" | #inscricao | MANTER |
| 7 | Apos Para Quem | "Fale com um Especialista" | #inscricao | SUPRIMIR ou fundir |
| 8 | Apos Entregaveis | "Fale com um Especialista" | #inscricao | SUPRIMIR ou fundir |
| 9 | Timeline (interno) | "Fale com um Especialista" | #inscricao | MANTER (dentro do componente) |
| 10 | Calculadora (interno) | "Fale com um Especialista" | #inscricao | MANTER |
| 11 | Pre-Inscricao | "Falar com Especialista" | #inscricao | MELHORAR (label inconsistente) |
| 12 | CTA Final | "Fale com um Especialista" | #inscricao | MANTER |
| 13 | Inscricao | (formulario Revos) | embed | MANTER |

### Total: 13 CTAs (12 botoes + 1 formulario)

**Veredicto: EXCESSO.** Foram 9 na versao Astro, agora sao 12 botoes. Piorou.

### Recomendacao: Reduzir para 6 CTAs estrategicos

| Posicao | Label | Motivo |
|---------|-------|--------|
| Hero | "Fale com um Especialista" | Primeiro contato |
| Hero (secondary) | "Como Funciona" | Exploracao |
| Problema | "Quero Sair na Frente" | Urgencia pos-dor |
| Apos Diferenciais+ParaQuem (1 CTA, nao 2) | "Quero Participar" | Meio de pagina |
| Calculadora | "Fale com um Especialista" | Pos-investimento |
| CTA Final | "Fale com um Especialista" | Fechamento |

**Suprimir:** CTAs #5, #7, #8 (secoes intermediarias com CTAs que nao adicionam valor, so poluem).

**Consertar label:** "Falar com Especialista" (#11) vs "Fale com um Especialista" (#1, #6, #7, #8, #12). Padronizar para uma unica forma.

---

## 11. CTA FINAL + INSCRICAO

### CTA Final

**Badge:** "Ultima Chance"
**Headline:** "A Transformacao Comeca no Primeiro Encontro"
**Bullets:** "Tudo instalado e configurado" / "Sua primeira squad funcionando"

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Urgencia | 7/10 | "Ultima Chance" e forte, mas generico |
| Promessa | 8/10 | "Tudo instalado e configurado" no primeiro encontro e tangivel e forte |
| Especificidade | 6/10 | Apenas 2 bullets. Poderia ter 3-4 para fechar com mais peso |

### Inscricao

**Headline:** "Fale com um Especialista"
**Sub:** "Preencha o formulario abaixo para falar com nosso time."
**Formulario:** Embed Revos (script externo)

| Aspecto | Nota | Observacao |
|---------|------|------------|
| Headline | 5/10 | "Fale com um Especialista" pela 6a vez na pagina. Neste ponto, ja perdeu impacto |
| Subtext | 4/10 | "Preencha o formulario abaixo para falar com nosso time" — burocratico, sem emocao |
| Formulario | N/A | Depende do Revos. Nao ha copy a analisar aqui |

### Veredicto: **MELHORAR**

**Sugestoes para CTA Final:**
- Adicionar 1-2 bullets mais:
  - "Acesso ao grupo exclusivo desde o primeiro dia"
  - "Suporte da equipe para qualquer duvida"
- Trocar badge de "Ultima Chance" para algo mais especifico: "Proxima turma: Maio 2025" (ou data dinamica)

**Sugestoes para Inscricao:**
- **Headline:** Trocar para algo que reforce o valor, nao o processo:
  - "Sua equipe de IA esta a um formulario de distancia"
  - "Garanta sua vaga — turmas de no maximo 12 pessoas"
- **Subtext:** Adicionar urgencia e seguranca:
  - "Resposta em ate 24h. Sem compromisso. Seus dados estao seguros."

---

## 12. INCONSISTENCIAS CRITICAS (Resumo)

| # | Inconsistencia | Locais | Severidade |
|---|---------------|--------|------------|
| 1 | **Vagas: 4 vs 8** | Hero ("4 vagas") vs Problema ("8 vagas") | **CRITICA** |
| 2 | **Duracao: 4 semanas vs 6-8 semanas** | Timeline/Como Funciona ("4 Semanas") vs FAQ ("6-8 semanas, ~2 meses") | **CRITICA** |
| 3 | **Role da Claudia** | Features ("Psicanalista e Socia") vs Facilitadores ("Co-Fundadora") | **ALTA** |
| 4 | **Label de CTA** | "Fale com um Especialista" vs "Falar com Especialista" vs "Quero Participar" etc | **MEDIA** |
| 5 | **Salarios da calculadora** | Parecem USD convertidos, labels em ingles, pagina em portugues | **MEDIA** |
| 6 | **Garantia ambigua** | Hero ("Garantia 7 dias") vs FAQ ("Entre em contato para saber...") | **ALTA** |
| 7 | **Duas secoes sobre a mesma coisa** | "Como Funciona" (8 encontros) + "Modulos Timeline" (4 semanas) | **MEDIA** |

---

## 13. TEXTOS HARDCODED QUE DEVEM SER DINAMICOS

| Texto | Arquivo | Linha(s) | Prioridade |
|-------|---------|----------|------------|
| "Restam somente 4 vagas" | page.tsx | ~133 | **CRITICA** |
| "Apenas 8 vagas disponiveis" | page.tsx | ~177 | **CRITICA** |
| "R$ 8.700" / `AGENT_COST = 8_700` | pricing-calculator.tsx | 84 | **ALTA** |
| `INSTALLMENTS = 12` | pricing-calculator.tsx | 85 | **ALTA** |
| Datas dos 8 encontros (Maio 2025) | page.tsx | ~84-92 | **CRITICA** |
| "US$ 20/mes" (Claude Pro) | faq-accordion.tsx | ~13 | **MEDIA** |
| "Max. 12 pessoas" | page.tsx | ~152 | **ALTA** |
| Salarios dos profissionais | pricing-calculator.tsx | 49-80 | **MEDIA** |
| URL do formulario Revos | revos-form.tsx | 12-13 | **ALTA** |

---

## 14. RECOMENDACOES PRIORITARIAS

### P0 — Corrigir AGORA (inconsistencias que prejudicam conversao)

1. **Unificar vagas:** Escolher 1 numero (ou "Vagas limitadas") e usar em TODOS os locais
2. **Unificar duracao:** FAQ deve dizer "4 semanas" (conforme datas reais)
3. **Garantia:** Ou explicitar "7 dias, reembolso integral" na FAQ, ou remover de todo o site

### P1 — Melhorar em breve (impacto direto em conversao)

4. **Reduzir CTAs de 12 para 6**
5. **Reescrever bios dos facilitadores** com proof e especificidade
6. **Resolver duplicacao** entre secoes "Como Funciona" e "Timeline Modulos"
7. **Adicionar 3 perguntas faltantes no FAQ** (preco, certificado, parcelamento)

### P2 — Otimizar (melhorias incrementais)

8. **Criar `siteConfig.ts`** com dados dinamicos (vagas, preco, datas, URL Revos)
9. **Melhorar copy da inscricao** (headline + subtext)
10. **Padronizar role da Claudia** em todos os locais
11. **Revisar salarios da calculadora** para mercado BR

---

*A verdade converte. A mentira converte uma vez e depois queima. — Yudhishthira*
