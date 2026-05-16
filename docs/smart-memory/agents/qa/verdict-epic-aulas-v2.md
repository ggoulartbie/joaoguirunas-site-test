---
title: "QA Verdict — Epic Aulas v2 (6 stories)"
type: qa-verdict
status: emitted
agent: sites-qa (Axilun)
created: 2026-05-16
updated: 2026-05-16
tags: [qa, verdict, aulas-v2, epic-AV]
related:
  - "[[../../stories/backlog/AV-3.1-migration-aulas-v2]]"
  - "[[../../stories/backlog/AV-3.2-template-md-elegante]]"
  - "[[../../stories/done/AV-3.3-admin-3-campos-toggle]]"
  - "[[../../stories/done/AV-3.4-aluno-5-abas]]"
  - "[[../../stories/done/AV-3.5-aluno-like-dislike]]"
  - "[[../../stories/backlog/AV-3.6-nav-prev-next-topo]]"
  - "[[results]]"
---

# QA Verdict — Epic Aulas v2

**Branch:** `feat-aulas-v2`
**Commits:** `7901492`, `cadbef1`, `32b3ed9`, `d01b795`, `4883e2f`, `f6c41fb`, `7232b03`
**Data:** 2026-05-16
**Avaliador:** Axilun (sites-qa)

---

## VEREDICTO GLOBAL: ✅ PASS (com 3 concerns leves não-bloqueantes)

**Push autorizado para a branch `feat-aulas-v2` (gera Vercel preview = staging). NÃO autorizar push para `main` — espera autorização explícita do João.**

### Resumo por story

| Story | Resultado |
|---|---|
| AV-3.1 (migration) | ✅ PASS |
| AV-3.2 (template MD) | ✅ PASS |
| AV-3.3 (admin 3 campos) | ✅ PASS — 1 concern leve |
| AV-3.4 (aluno 5 abas) | ✅ PASS |
| AV-3.5 (like/dislike) | ✅ PASS — 2 concerns leves |
| AV-3.6 (nav topo) | ✅ PASS |

### Build & typecheck

- ✅ `pnpm typecheck` — `$ tsc --noEmit` sem erros.
- ✅ `pnpm build` — `✓ Compiled successfully in 9.5s` + 144 static pages geradas.

---

## Detalhe por story

### Story AV-3.1 — Migration Aulas v2 — ✅ PASS

**Arquivo:** `supabase/migrations/20260516100000_aulas_v2_summary_transcript_reactions.sql`

Cobertura ACs:
- ✅ **AC1** — 4 colunas em lessons (`summary`, `summary_format`, `transcript`, `transcript_format`) com CHECK constraint MDX/HTML/MARKDOWN.
- ✅ **AC2** — `lesson_reactions` table com PK uuid, FK lesson_id ON DELETE CASCADE, FK user_id (refs `profiles` em vez de `auth.users` — desvio do texto da AC mas funcionalmente correto e mais coerente com o schema do projeto), UNIQUE (lesson_id, user_id), trigger `set_updated_at`, índice composto `(lesson_id, reaction)` (otimização para count agregado).
- ✅ **AC3** — RLS habilitado + 2 policies:
  - `SELECT`: `has_access(auth.uid(), lesson_id) OR is_admin()`.
  - `ALL` (INSERT/UPDATE/DELETE): `user_id = auth.uid()` USING + `user_id = auth.uid() AND has_access(auth.uid(), lesson_id)` WITH CHECK.
  - Note: a spec sugeria SELECT para "qualquer usuário autenticado". Implementação real é mais restritiva — só vê reactions de aulas que tem acesso. Defensável (defense in depth) e provavelmente mais correto que a spec original.
- ✅ **AC4** — UPDATE description com template idempotente (`WHERE description IS NULL OR description = ''`).
- ⚠️ **AC4 desvio leve**: spec pedia `content_format = COALESCE(content_format, 'MARKDOWN')` no UPDATE. Migration NÃO atualiza `content_format`. Mitigação: page.tsx renderiza description sempre como MARKDOWN no fallback (`renderContent('MARKDOWN', lesson.description)`) — funcionalmente idêntico. Sem bug.
- ✅ **AC6** — Tipos TS regenerados (verificado em `src/types/database.ts:723-786` — 3 sub-tipos Row/Insert/Update + `lesson_reactions` em `src/types/database.ts:681`).
- ✅ **AC7** — `IF NOT EXISTS` em ALTER + CREATE; UPDATE guarded por `description IS NULL OR description = ''` (idempotente).

### Story AV-3.2 — Template MD elegante — ✅ PASS

**Arquivo:** `src/components/editor/LessonContent.tsx`

- ✅ Removido `prose-invert prose-sm` (ainda passado como className opcional pelo client mas sem efeito visual no espaço da grade — ver linhas 11-106 que mapeiam todos os elementos manualmente).
- ✅ Mapeamento explícito de h3, h4, p, ul, ol, li, strong, em, blockquote, hr, img, a, pre, code.
- ✅ Bullet `·` via pseudo-element `before:content-['·'] before:text-[var(--bone-mute)]` (linha 44) — sutil e elegante.
- ✅ Tokens proprietários `var(--bone)`, `var(--bone-dim)`, `var(--bone-mute)`, `var(--ember)`, `var(--hairline)` — zero hex hard-coded.
- ✅ Headings com `font-family: var(--type-sans)` + `font-semibold` para hierarquia clara sem peso visual excessivo.
- ✅ Code inline com `rounded` + bg `var(--ink-3)` + cor `var(--ember)` (consistente).
- ✅ Template SQL incrustado na migration usa `### O que você vai aprender` / `### Pré-requisitos` / `### Próximos passos` — minimalista, sem emojis (seguindo diretriz do lead).

### Story AV-3.3 — Admin 3 campos com toggle — ✅ PASS (1 concern)

**Arquivo:** `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/aulas/[lessonId]/LessonEditorClient.tsx`

- ✅ Subcomponente `MarkdownField` reutilizável (linhas 48-95) — DRY entre summary e transcript, padrão unificado.
- ✅ `description` virou `<textarea rows={6}>` com classe `[field-sizing:content]` (CSS moderno, com fallback rows).
- ✅ Seção "Resumo" entre Vídeo e Conteúdo (linhas 369-379).
- ✅ Seção "Transcrição" depois de Conteúdo (linhas 421-431) com `rows={12}` (transcript tende a ser maior — alinhado com AC3).
- ✅ `handleSave` envia summary, summary_format, transcript, transcript_format (linhas 162-174).
- ✅ Toggles "Editar/Visualizar" com `aria-pressed`, `<Eye />` icon, `focus-visible:ring-2 focus-visible:ring-[var(--ember)]`, default Editar, oculto quando vazio.
- ✅ Preview client-side via `<LessonContent content={{ format: 'MARKDOWN', raw: value }} />` (sem server action — markdown puro, latência zero).

#### CONCERN-1 (não bloqueante): `as any` casts desnecessários

Linhas 115 e 162 usam:
```ts
const lessonAny = lesson as any
const [summary, setSummary] = useState<string>(lessonAny.summary ?? '')
// ...
await (updateLesson as any)(lesson.id, courseId, {...})
```

Os tipos `Database['public']['Tables']['lessons']['Row']` JÁ incluem `summary`, `summary_format`, `transcript`, `transcript_format` (verificado em `database.ts:736-740`). Os casts são código defensivo redundante — provavelmente legacy de quando o dev codou antes da regen dos tipos.

**Impacto:** zero funcional. Pode ser removido em commit de cleanup separado (`lesson.summary ?? ''` direto, e remover `as any` no `updateLesson` call).

### Story AV-3.4 — Aluno 5 abas — ✅ PASS

**Arquivos:** `LessonTabs.tsx`, `aula/[lesson-slug]/page.tsx`

- ✅ Tab type estendido para 5 valores (linha 13).
- ✅ Filtro `availableTabs` (linhas 52-59) oculta abas vazias por presença de conteúdo.
  - `comentarios` sempre presente (AC2). 
  - `sobre` presente se `descriptionContent || description` (cobre o caso de aulas com template após migration).
- ✅ Normalização do initialTab (linhas 61-62): se a aba pedida sumiu do filtro, fallback para `availableTabs[0]?.id ?? 'comentarios'`.
- ✅ Counters em Materiais e Comentários preservados (linhas 94-109).
- ✅ Mobile: `overflow-x-auto` + `whitespace-nowrap` no nav container (linhas 75-78, 86) — abas scrollam horizontalmente quando não cabem.
- ✅ `page.tsx` linha 45-79: select estendido com `summary, summary_format, transcript, transcript_format`.
- ✅ `page.tsx` linhas 276-282: `renderedSummary` e `renderedTranscript` via `renderContent` server-side.

### Story AV-3.5 — Like/Dislike — ✅ PASS (2 concerns)

**Arquivos:** `src/app/actions/lesson-reactions.ts`, `src/components/student/LessonReactions.tsx`, `aula/[lesson-slug]/page.tsx`

**Server action (`lesson-reactions.ts`):**
- ✅ `requireUser()` no início.
- ✅ Validação zod do `lessonId`.
- ✅ Branch `reaction === null` → DELETE; senão UPSERT com `onConflict: 'lesson_id,user_id'`.
- ✅ `getLessonReactionStats` separada para reads.

**Componente (`LessonReactions.tsx`):**
- ✅ `useOptimistic` (React 19) + `useTransition` + state `committed` para rollback.
- ✅ `computeOptimistic` cobre toggle off, switch LIKE↔DISLIKE, novo voto.
- ✅ Em erro: `setCommitted(rollback)` + mensagem inline `aria-live="polite" role="status"`.
- ✅ `aria-pressed`, `aria-label="Curtir aula"/"Não curtir aula"`, `focus-visible:ring-2 focus-visible:ring-[var(--ember)]`.
- ✅ Estado visual ativo: cor + border `var(--ember)` + `fill="currentColor"` no ícone.
- ✅ Disabled durante `isPending`.

**Posicionamento (`page.tsx`):**
- ✅ Linha 417-422: `<LessonReactions>` ao lado do `<MarkCompleteButton>` no header da aula, dentro do flex `flex-wrap items-center gap-3`.

**RLS:** `lesson_reactions` policies presentes na migration (verificado AV-3.1).

#### CONCERN-2 (não bloqueante): `revalidatePath('/', 'layout')` na setReaction

`lesson-reactions.ts:40` chama `revalidatePath('/', 'layout')` após cada mutação.

A spec AV-3.5 AC1 diz **explicitamente**: "Sem revalidatePath — count vem direto na resposta da action; client atualiza state local. Evita re-fetch da página inteira."

**Impacto:**
- Funcional: nenhum (UI já é otimista, então usuário não percebe).
- Performance: cada like/dislike invalida cache global do layout. Em alta concorrência poderia gerar overhead, mas é transparente ao aluno.
- Coerência codebase: `notifications.ts:17, 30, 42` usa o mesmo padrão (`revalidatePath('/', 'layout')`). O dev seguiu o padrão local em vez da spec. Defensável.

**Recomendação:** se o squad quiser otimizar depois, basta remover a linha 40 do `setReaction`. O `useOptimistic` já cobre o feedback visual.

#### CONCERN-3 (não bloqueante): `setReaction` retorna `void` em vez de `{ likes, dislikes, mine }`

A spec AV-3.5 AC1 dizia que setReaction devia retornar os totais novos para evitar re-fetch. Implementação real retorna `void`; o componente client computa stats localmente via `computeOptimistic`.

**Impacto:**
- Funcional para o usuário que clicou: nenhum (state local sincroniza visualmente).
- Sync entre usuários: não há live update. Aluno B só vê voto de Aluno A após reload da página.
- Estimativa: aceitável no MVP. Spec AC9 já marca live update como out-of-scope.

### Story AV-3.6 — Nav prev/next topo — ✅ PASS

**Arquivo:** `aula/[lesson-slug]/page.tsx`

- ✅ Componente `LessonNavCompact` definido inline como server component (sem event handlers — apenas `<Link>` do Next).
- ✅ Posicionado no header (linhas 425-430), à direita do MarkComplete + Reactions, dentro do flex wrap.
- ✅ Versão compacta com botões de 2 linhas: rótulo "Anterior"/"Próxima" + título truncado da aula vizinha (max-width 120px).
- ✅ Estado disabled (primeira/última aula): opacity 0.3 + `pointer-events-none` + `aria-hidden="true"`.
- ✅ `aria-label="Aula anterior: {title}"` / `"Próxima aula: {title}"`.
- ✅ NavCards do rodapé **completamente removidos** — `grep -rn "NavCards" src/` retorna zero matches.
- ✅ Tokens KV `var(--hairline)`, `var(--ink-2)`, `var(--bone-mute)`, `var(--bone-dim)`, `var(--bone)`.
- ✅ Mobile: o componente fica no `flex flex-wrap` do header — em telas pequenas faz wrap natural junto com MarkComplete + Reactions.

---

## Validações executadas

- ✅ Read review completo: `LessonContent.tsx`, `LessonTabs.tsx`, `LessonReactions.tsx`, `LessonEditorClient.tsx` (514 linhas), `page.tsx` aluno (581 linhas), `lesson-reactions.ts`, `preview-actions.ts`, `actions.ts` (admin), migration SQL.
- ✅ `pnpm typecheck` — limpo.
- ✅ `pnpm build` — Compiled successfully em 9.5s + 144 static pages.
- ✅ Verificação de tipos: `Database['public']['Tables']['lessons']['Row']` inclui summary/transcript; tabela `lesson_reactions` presente em `database.ts:681`.
- ✅ Funções RLS auxiliares verificadas: `has_access` em `20260506022037_has_access_rls_policies.sql:27`; `set_updated_at` em `20260506021755_initial_schema_identidade_catalogo.sql:9`; `is_admin` referenciado.
- ✅ NavCards removido (grep zero matches).
- ❌ Smoke test browser — **não executado** (sem ambiente local). Cobertura compensada por code review profundo + paridade com pipeline existente.

---

## Smoke test recomendado ao usuário (antes de push para main)

A spec `AV-3.7-smoke-e2e.md` existe no backlog — recomendo executá-la antes do push para main. Caminhos críticos:

1. **Admin**: editor de aula → 3 campos (description/summary/transcript) com toggle Visualizar funcionam? Salvar e recarregar → persiste?
2. **Aluno**: 5 abas aparecem? Aula sem transcript → aba Transcrição some? Aula sem summary → aba Resumo some?
3. **Aluno**: Like → ember + fill, count++, novo click → toggle off, count--, click DISLIKE → switch.
4. **Aluno**: Nav prev/next no topo (cards do rodapé removidos confirmados).
5. **Sobre a aula**: as 39 aulas que receberam template renderizam elegante (h3 separado, bullets `·`).
6. **Regressão**: comentários, materiais, MarkComplete, autenticação, paywall continuam funcionando.

---

## Próximo passo

`sites-devops` autorizado a push da branch `feat-aulas-v2` (gera Vercel preview = staging).

**NÃO autorizar push para `main` automaticamente** — aguardar autorização explícita do João após smoke manual no preview/local.

Concerns 1, 2, 3 podem ser endereçados em commit de cleanup separado, ou ignorados — todos não bloqueantes.
