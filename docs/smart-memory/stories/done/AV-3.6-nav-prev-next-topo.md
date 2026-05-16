---
title: "Story AV-3.6: Mover navegação prev/next pra topo da página da aula"
type: story
status: done
epic: AV
complexity: S
agent: sites-dev-alpha
created: 2026-05-16
updated: 2026-05-16
tags: [story, student, lesson, navigation, ux, aulas-v2]
related:
  - "[[AV-3.4-aluno-5-abas]]"
  - "[[AV-3.5-aluno-like-dislike]]"
---

# Story AV-3.6: Mover navegação prev/next pra topo da página da aula

## Objetivo
Mover o componente `<NavCards>` (atualmente no rodapé da página da aula, em `aula/[lesson-slug]/page.tsx:451-580`) para o **topo da área de conteúdo**, perto do bloco de "Marcar como concluída" e dos counters de Like/Dislike. O aluno encontra a navegação imediatamente ao chegar, sem precisar scrollar até o final. Versão visual mais compacta — não os cards grandes atuais.

## Acceptance Criteria

- [ ] **AC1 (Localização nova)**: O componente de nav prev/next (chamado de `LessonHeaderNav` na nova versão) é renderizado dentro do bloco de header em `page.tsx:351-405` (a `<div>` com `border-b p-4 lg:p-6` que contém breadcrumb, título, MarkComplete). Posicionado logo abaixo do MarkComplete + Reactions (depois do AV-3.5), antes do `<LessonTabs>`. Ordem visual:
  1. Breadcrumb
  2. Título
  3. MarkComplete + LessonReactions (linha)
  4. **LessonHeaderNav (nova) — prev/next compacta**
  5. Tabs
  6. Conteúdo da tab ativa

- [ ] **AC2 (Versão compacta — não cards grandes)**: A nav no topo é uma **barra horizontal compacta** com 2 botões pequenos: "← Aula anterior" (esq) e "Próxima aula →" (dir). Sem o título completo da aula vizinha (essa info já está nos NavCards no rodapé, se mantidos — ver AC4). Tipografia `font-mono text-[11px] uppercase tracking-wide`, padding leve `px-3 py-2`, border `var(--hairline)`.

  - Se previousLesson existe: link clicável.
  - Se não existe (primeira aula): texto cinza "Primeira aula" não clicável.
  - Mesma lógica para next.

- [ ] **AC3 (Mostra título da aula vizinha em hover/tooltip)**: Para não perder informação, o botão exibe o título da aula vizinha em um `<span title="...">` (browser-native tooltip). Acessibilidade: `aria-label="Aula anterior: {globalPrev.title}"`. Sem precisar de tooltip JS custom.

- [ ] **AC4 (NavCards do rodapé — decisão: REMOVER)**: O bloco `<NavCards>` em `page.tsx:421-426` no rodapé é **removido**. Razão: duplicaria a navegação se mantermos os dois. Se aluno quiser navegar após terminar a aula, scrolla até o fim das tabs e clica no botão "Próxima aula" do header (que continua visível por sticky? Ver AC5).

  - **Alternativa rejeitada**: manter os dois. Vetado pelo lead implicitamente ("mover" — não "duplicar").

- [ ] **AC5 (Sticky opcional — fora do MVP)**: Não tornar a nav sticky/fixa no topo do viewport ao scrollar. Prioridade no MVP é entrega simples. Se UX pedir depois, é story separada.

- [ ] **AC6 (Mobile responsive)**: Em telas <640px, os 2 botões continuam lado a lado (não stack vertical), apenas com texto encurtado: "← Anterior" / "Próxima →". Tipo `text-[10px]` para caber. Botões com largura igual via `flex-1`.

- [ ] **AC7 (Estilização KV consistente)**: Cores e tokens iguais ao resto do header: bg `var(--ink)`, border `var(--hairline)`, hover `text-[var(--bone)]`. Estado disabled (primeira/última aula): opacity 0.4 + sem cursor pointer. Sem ícones extras além de `<ArrowLeft />` e `<ArrowRight />` (lucide-react, já importados).

- [ ] **AC8 (Smoke manual)**:
  1. Aula do meio do curso → ver header com prev e next clicáveis no topo. Rodapé sem NavCards grandes.
  2. Primeira aula do primeiro módulo → "Primeira aula" cinza à esquerda, próxima ativa.
  3. Última aula do último módulo → "Última aula" cinza à direita, anterior ativa.
  4. Hover na nav → tooltip mostra título da aula vizinha.
  5. Mobile 375px → botões cabem lado a lado, texto curto.
  6. Click na nav → navega corretamente para a aula correspondente.

## Escopo

**IN:**
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx`:
  - Adicionar componente `LessonHeaderNav` (inline, server component, sem event handlers — igual `NavCards` atual).
  - Renderizar `LessonHeaderNav` dentro do bloco header (após MarkComplete row).
  - **Remover** o `<NavCards>` em `page.tsx:421-426`.
  - **Remover** a função `NavCards` em `page.tsx:460-580` (não tem mais uso).
  - Manter o type `NavLesson` (LessonHeaderNav usa o mesmo).

**OUT:**
- Sticky nav no topo ao scrollar.
- Auto-advance ao completar (já tem MarkComplete; o aluno decide quando avançar).
- Atalho de teclado (←/→) — backlog futuro se aluno pedir.
- Card grande no rodapé com title + módulo da próxima aula.
- Progresso visual ("Aula 3 de 12").

## Contexto Técnico

**Estrutura atual relevante** (`page.tsx`):
- Linhas 144-161: `globalPrev`/`globalNext` calculados (já existem, reusar).
- Linhas 388-405: bloco MarkComplete + MobileLessonDrawer — onde a nova nav vai entrar.
- Linhas 421-426: render do `<NavCards>` no rodapé — remover.
- Linhas 460-580: definição da função `NavCards` — remover.
- Variável `slug` disponível no escopo.

**Razão do "remove rodapé":** duplicar nav top+bottom polui visualmente e introduz inconsistência (cards grandes embaixo vs. compactos em cima). Padrão de UX na maioria dos LMS modernos (Skool, Teachable, Hotmart) é nav só no topo ou só no rodapé — não ambos.

**Risco de regressão:** se aluno está acostumado a scrollar até o fim e clicar no card grande, vai estranhar. Mitigação: a nav no topo é descoberta imediata; o behavior real fica mais rápido (não precisa scrollar).

**Coordenação:**
- sites-dev-alpha sozinho.
- Pode rodar em paralelo com [[AV-3.4-aluno-5-abas]] e [[AV-3.5-aluno-like-dislike]] (mesmo arquivo `page.tsx`, mas blocos diferentes — sites-dev-alpha coordena os 3 ou faz um por commit).
  - **Sugestão de ordem dos commits**: AV-3.4 (tabs) → AV-3.5 (reactions) → AV-3.6 (nav). Reduz conflitos no `page.tsx`.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-aulas-v2 |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
