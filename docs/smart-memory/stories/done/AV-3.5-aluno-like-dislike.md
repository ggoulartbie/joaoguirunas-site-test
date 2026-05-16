---
title: "Story AV-3.5: Aluno — Like/Dislike na aula (lesson_reactions)"
type: story
status: done
epic: AV
complexity: M
agent: sites-dev-alpha + sites-dev-beta
created: 2026-05-16
updated: 2026-05-16
tags: [story, student, lesson, reactions, server-action, aulas-v2]
related:
  - "[[AV-3.1-migration-aulas-v2]]"
  - "[[AV-3.4-aluno-5-abas]]"
  - "[[AV-3.6-nav-prev-next-topo]]"
---

# Story AV-3.5: Aluno — Like/Dislike na aula (lesson_reactions)

## Objetivo
Permitir que o aluno reaja à aula com Like ou Dislike, usando a tabela `lesson_reactions` criada em [[AV-3.1-migration-aulas-v2]]. UI minimalista posicionada perto do "Marcar como concluída" no header da aula. Toggle: clicar de novo no mesmo botão remove o voto; clicar no oposto troca. Counts agregados visíveis para todos.

## Acceptance Criteria

- [ ] **AC1 (Server action setReaction)**: Em `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/reaction-actions.ts` (novo arquivo), criar:
  ```ts
  'use server'
  export async function setReaction(lessonId: string, reaction: 'LIKE' | 'DISLIKE' | null): Promise<{ likes: number; dislikes: number; mine: 'LIKE' | 'DISLIKE' | null }>
  ```
  - Se `reaction === null` → DELETE da row do user atual (toggle off).
  - Se `reaction !== null` → UPSERT (`onConflict: 'lesson_id,user_id'`) setando o novo valor.
  - Após mutação, `SELECT reaction, count(*) FROM lesson_reactions WHERE lesson_id = $id GROUP BY reaction` para devolver os totais novos.
  - `await requireUser()` no início. Falha auth → throw.
  - Validar `reaction` IN ('LIKE','DISLIKE',null). Outros valores → throw 400.
  - **Sem revalidatePath** — count vem direto na resposta da action; client atualiza state local. Evita re-fetch da página inteira.

- [ ] **AC2 (Componente LessonReactions)**: Em `src/components/student/LessonReactions.tsx` (novo), client component:
  ```tsx
  'use client'
  type Props = {
    lessonId: string
    initialLikes: number
    initialDislikes: number
    initialMine: 'LIKE' | 'DISLIKE' | null
  }
  ```
  - 2 botões `<button type="button">` lado a lado: thumbs-up + count, thumbs-down + count.
  - Ícones: `<ThumbsUp />` e `<ThumbsDown />` de lucide-react, `h-4 w-4`.
  - Active state (mine === 'LIKE' ou 'DISLIKE'): `color: var(--ember)`, fill no ícone (`fill="currentColor"`). Inactive: `var(--bone-mute)` outline.
  - Disabled durante `useTransition` pending.
  - aria-label: "Curtir aula" / "Não curtir aula", `aria-pressed={mine === 'LIKE'}`.

- [ ] **AC3 (Optimistic update via useOptimistic)**: Ao clicar, atualizar imediatamente o estado visual antes da action voltar — usar `useOptimistic` (React 19) ou `useReducer` manual com rollback em caso de erro:
  - Click LIKE quando `mine === null`: optimistic likes++, mine='LIKE'.
  - Click LIKE quando `mine === 'LIKE'`: optimistic likes--, mine=null (toggle off).
  - Click LIKE quando `mine === 'DISLIKE'`: optimistic likes++, dislikes--, mine='LIKE' (troca de voto).
  - Erro da action → reverter ao estado anterior + toast/inline error discreto ("Não foi possível registrar"). Manter botões funcionais (não trava em loading).

- [ ] **AC4 (Query agregada no page.tsx)**: Em `aula/[lesson-slug]/page.tsx`, dentro do block `if (hasAccess)`, adicionar:
  ```ts
  const { data: reactionRows } = await supabase
    .from('lesson_reactions')
    .select('reaction, user_id')
    .eq('lesson_id', lesson.id)
  const initialLikes = reactionRows?.filter(r => r.reaction === 'LIKE').length ?? 0
  const initialDislikes = reactionRows?.filter(r => r.reaction === 'DISLIKE').length ?? 0
  const initialMine = (reactionRows?.find(r => r.user_id === user.id)?.reaction ?? null) as 'LIKE' | 'DISLIKE' | null
  ```
  Otimização: se virar gargalo (1k+ rows por aula), trocar pra duas queries: `count(*) GROUP BY reaction` + uma row específica do user via RPC. **Não otimizar prematuramente.** No MVP, ler tudo é simples e seguro com RLS (qualquer auth lê tudo via AC3 da AV-3.1).

- [ ] **AC5 (Posicionamento no header da aula)**: O componente `<LessonReactions>` é renderizado no bloco do header em `page.tsx:388-405` (onde está o `<MarkCompleteButton>`), à direita do MarkComplete e antes do MobileLessonDrawer. Layout flex, gap respira (gap-3). Em mobile (<640px) fica abaixo do título junto do MarkComplete e antes do drawer toggle.

- [ ] **AC6 (RLS bem testada)**: Smoke obrigatório:
  1. Aluno A loga, like na aula 1 → likes=1.
  2. Aluno B loga, like na aula 1 → likes=2.
  3. Aluno A clica like de novo → likes=1 (toggle off).
  4. Aluno A click dislike → likes=1, dislikes=1.
  5. Aluno B abre aula 1 → vê likes=1, dislikes=1, mine=LIKE.
  6. Tentativa de `INSERT lesson_reactions (user_id=B's id)` como Aluno A — RLS bloqueia.

- [ ] **AC7 (Sem like/dislike em LIVE/IN_PERSON sem video)**: Decisão simples: o componente aparece em **todas** as `kind` (VIDEO, LIVE, IN_PERSON, CODE, READING). Reagir a uma aula presencial faz sentido também (qualidade percebida). Se algum kind não fizer sentido depois, é fácil ocultar via prop.

- [ ] **AC8 (Acessibilidade)**:
  - Botões com `aria-label` e `aria-pressed`.
  - Counts visíveis text-side (não só ícone): `<span>2</span>` após o ícone.
  - Foco visível: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]`.
  - Toast de erro tem `role="status"` ou inline text com `aria-live="polite"`.

- [ ] **AC9 (Smoke E2E)**: Dois browsers (ou anônima + login), votos aparecem corretamente em ambos após reload. Multi-tab: votar numa tab e recarregar a outra mostra count atualizado (sem realtime — é por refresh manual; futuro pode usar Supabase Realtime).

## Escopo

**IN:**
- `supabase/migrations/...` — JÁ na [[AV-3.1-migration-aulas-v2]]. Esta story consome.
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/reaction-actions.ts` (sites-dev-beta).
- `src/components/student/LessonReactions.tsx` (sites-dev-alpha).
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` — query inicial de counts + render do componente no header (sites-dev-alpha).

**OUT:**
- Comentário obrigatório ao dislike ("por que não curtiu?") — por enquanto só thumbs.
- Rating estrelas (1-5) — escopo separado se virar requisito.
- Realtime updates (Supabase Realtime channel em `lesson_reactions`).
- Histórico de reações por aluno em /perfil.
- Notificar instrutor de dislikes.
- Agregado por curso/módulo (média de likes).
- A/B test posicionamento.

## Contexto Técnico

**Padrão de optimistic update no projeto:** o codebase já tem `useOptimistic` em `CommentsSection.tsx` (introduzido pela Story FAA-1.2 recente). Reusar o padrão — leitura recomendada antes de codar.

**`useTransition` vs `useOptimistic`:** ambos podem ser usados juntos. `useOptimistic` cuida do estado visual otimista; `useTransition` evita o "jank" enquanto a action server roda. Padrão React 19.

**Ícones:** `lucide-react` já está no projeto. `ThumbsUp` e `ThumbsDown` existem.

**Edge case — concorrência de votos:** se dois clicks rápidos disparam duas actions, o UPSERT é idempotente (tabela tem UNIQUE), e o segundo clobbera o primeiro. UI aceita isso (mostra o último). Sem fila de actions necessária.

**Não precisamos atualizar `lessons.like_count`/`dislike_count`** — count via query agregada é suficiente no MVP. Se a tabela `lesson_reactions` ficar muito grande (>100k rows), criar índice composto e considerar denormalização — story futura.

**Coordenação:**
- sites-dev-beta: server action `setReaction` + RLS smoke.
- sites-dev-alpha: componente `LessonReactions` + integração no `page.tsx`.
- Pode rodar em paralelo após [[AV-3.1-migration-aulas-v2]] aplicada.

## Dev Agent Record

| Campo               | Valor |
|---                  |---|
| Agente Action (RLS) | sites-dev-beta |
| Agente UI           | sites-dev-alpha |
| Iniciado            | 2026-05-16 |
| Concluído           | 2026-05-16 |
| Branch              | feat-aulas-v2 |
| Commit UI           | 4883e2f |

## File List

- `src/app/actions/lesson-reactions.ts` (sites-dev-beta: setReaction + getLessonReactionStats)
- `src/components/student/LessonReactions.tsx` (sites-dev-alpha: UI com useOptimistic)
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` (query + render)

## QA Results
<!-- QA preenche ao revisar -->
