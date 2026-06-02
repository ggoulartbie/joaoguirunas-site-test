---
title: "Story AV-3.4: Aluno — 5 abas em linha (Sobre | Resumo | Transcrição | Materiais | Comentários)"
type: story
status: done
epic: AV
complexity: M
agent: sites-dev-alpha
created: 2026-05-16
updated: 2026-05-16
tags: [story, student, lesson, tabs, aulas-v2]
related:
  - "[[AV-3.1-migration-aulas-v2]]"
  - "[[AV-3.3-admin-3-campos-toggle]]"
  - "[[AV-3.5-aluno-like-dislike]]"
---

# Story AV-3.4: Aluno — 5 abas em linha (Sobre | Resumo | Transcrição | Materiais | Comentários)

## Objetivo
Estender `LessonTabs.tsx` (área do aluno) de 3 abas para 5 abas, incluindo Resumo e Transcrição. **Abas com conteúdo vazio simplesmente somem da nav** — não aparecem cinzas/desabilitadas, não confundem o aluno. A página `aula/[lesson-slug]/page.tsx` passa o conteúdo já renderizado (server-side via `renderContent`) para cada aba.

## Acceptance Criteria

- [ ] **AC1 (5 abas no array TAB_LABELS)**: Em `LessonTabs.tsx:17-21` substituir o array por:
  ```ts
  type Tab = 'sobre' | 'resumo' | 'transcricao' | 'materiais' | 'comentarios'
  const TAB_LABELS: { id: Tab; label: string }[] = [
    { id: 'sobre', label: 'Sobre a aula' },
    { id: 'resumo', label: 'Resumo' },
    { id: 'transcricao', label: 'Transcrição' },
    { id: 'materiais', label: 'Materiais' },
    { id: 'comentarios', label: 'Comentários' },
  ]
  ```

- [ ] **AC2 (Abas vazias somem)**: Filtrar o `TAB_LABELS` antes de renderizar, removendo abas sem conteúdo:
  - `sobre`: presente se `descriptionContent` truthy OU `description` não vazio (lógica atual da aba — depois do template AV-3.2 + UPDATE da migration, basicamente sempre presente).
  - `resumo`: presente apenas se `summaryContent` truthy.
  - `transcricao`: presente apenas se `transcriptContent` truthy.
  - `materiais`: presente apenas se `materials.length > 0`.
  - `comentarios`: **sempre presente** (aluno pode iniciar discussão mesmo sem comentários prévios).

- [ ] **AC3 (page.tsx renderiza summary e transcript server-side)**: Em `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` (linhas 261-269 hoje renderizam apenas content+description), adicionar:
  ```ts
  const renderedSummary = lesson.summary && lesson.summary_format
    ? await renderContent(lesson.summary_format, lesson.summary)
    : null
  const renderedTranscript = lesson.transcript && lesson.transcript_format
    ? await renderContent(lesson.transcript_format, lesson.transcript)
    : null
  ```
  Passar `summaryContent={renderedSummary}` e `transcriptContent={renderedTranscript}` para `<LessonTabs>`.

- [ ] **AC4 (Select da query inclui novos campos)**: Em `page.tsx:42-78`, o `.select(...)` da query de `lessons` deve incluir `summary, summary_format, transcript, transcript_format`. Sem isso a aula vem sem o conteúdo novo.

- [ ] **AC5 (Aba inicial — fallback se ativa não existe)**: Hoje `activeTab="sobre"` é hard-coded no `<LessonTabs>` em page.tsx:412. Se por algum motivo `sobre` for filtrada (não deveria depois do template), usar a primeira aba disponível como ativa. Implementação: dentro do `LessonTabs`, normalizar o `initialTab` no `useState` checando se está na lista filtrada; senão, fallback para `tabsAvailable[0].id`.

- [ ] **AC6 (Counter em Materiais e Comentários preservado)**: As bolinhas de contagem em "Materiais (N)" e "Comentários (N)" continuam funcionando (linhas 78-93 do LessonTabs hoje). Não adicionar counter em Sobre/Resumo/Transcrição (são single-content, não fazem sentido).

- [ ] **AC7 (Layout horizontal preservado, scroll em mobile se preciso)**: As 5 abas ficam em linha horizontal (`inline-flex border-b`). Em telas ≥640px todas cabem. Em telas <640px, se houver overflow, adicionar `overflow-x-auto` no container das abas + `whitespace-nowrap` nos botões. Não usar dropdown.

- [ ] **AC8 (Smoke manual)**:
  1. Abrir aula que tem só `description` (template) → ver 2 abas: "Sobre a aula" e "Comentários" (Materiais oculta se zero materials).
  2. Admin adiciona `summary` na aula → reload aluno → ver 3 abas: Sobre, Resumo, Comentários.
  3. Admin adiciona `transcript` → reload → 4 abas.
  4. Admin adiciona um material → reload → 5 abas.
  5. Click em cada aba — conteúdo renderiza com `LessonContent` (markdown estilizado em prose-invert).
  6. Mobile (DevTools 375px) — abas horizontalmente scrolláveis se não couberem; nenhum overflow vertical.

## Escopo

**IN:**
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx`:
  - Estender `Tab` type, `TAB_LABELS`.
  - Aceitar `summaryContent?: RenderedContent | null` e `transcriptContent?: RenderedContent | null` nas props.
  - Filtrar `TAB_LABELS` por presença de conteúdo.
  - Renderizar `LessonContent` para summary e transcript no `{active === '...'}` block.
  - Normalizar `initialTab` (fallback se aba pedida sumir).
  - Adicionar `overflow-x-auto` + `whitespace-nowrap` no container de abas para mobile.
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx`:
  - Estender `.select()` com `summary, summary_format, transcript, transcript_format`.
  - Calcular `renderedSummary` e `renderedTranscript` via `renderContent`.
  - Passar pras props do `<LessonTabs>`.

**OUT:**
- URL deeplink por aba (`?tab=resumo`) — fora de escopo, manter state local. Se o lead pedir depois, é feature separada.
- Sticky tab nav ao scrollar.
- Counter em Sobre/Resumo/Transcrição.
- Reordenar abas via drag-drop pelo admin.
- Per-cohort visibility (resumo só para X cohort, etc.).
- Cache de renderedContent (renderContent já é server-side puro, Next cacheia automaticamente via dynamic).

## Contexto Técnico

**Estrutura atual** (`LessonTabs.tsx` lido na criação desta story):
- `useState<Tab>(initialTab)` controla aba ativa.
- Map `TAB_LABELS.map(...)` renderiza botões.
- Switch `{active === 'sobre' && ...}` renderiza conteúdo.
- Bone-mute / ember tokens para active/inactive.

**Nomeação:** uso `transcricao` (sem cedilha no enum, mas label "Transcrição") pra evitar problemas de URL/key. Comentários já é assim no codebase atual ("Comentarios" sem cedilha — vou trocar pra "Comentários" no label, mantendo `comentarios` como id).

**`renderContent` no server:** já existe em `src/lib/content/index.ts` e é usado pra `lesson.content`/`lesson.description`. Aceita `'MARKDOWN' | 'HTML' | 'MDX'` e devolve `RenderedContent` tagged. Reuso direto.

**Risco de SSR/hydration:** `LessonContent` aceita `RenderedContent` que pode incluir HTML sanitizado server-side ou MDX já serializado. Funciona em RSC + boundary client. Já está em produção pra description.

**Coordenação:**
- sites-dev-alpha sozinho.
- Depende de [[AV-3.1-migration-aulas-v2]] (tipos + colunas) e [[AV-3.3-admin-3-campos-toggle]] (admin precisa popular pra testar). Pode começar a codar em paralelo, smoke depende dos 3.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha |
| Iniciado   | 2026-05-16 |
| Concluído  | 2026-05-16 |
| Branch     | feat-aulas-v2 |
| Commit     | d01b795 |

## File List

- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx`
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx`
- `src/types/database.ts` (summary/transcript fields adicionados em Row/Insert/Update)

## QA Results
<!-- QA preenche ao revisar -->
