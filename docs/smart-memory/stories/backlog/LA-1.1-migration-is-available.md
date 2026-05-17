---
title: "Story LA-1.1: Migration is_available + types"
type: story
status: backlog
epic: LA
complexity: S
agent: sites-data
created: 2026-05-17
updated: 2026-05-17
tags: [story, schema, supabase, lessons]
related: ["[[LA-1.2-admin-toggle-is-available]]", "[[LA-1.3-student-badge-em-breve]]"]
---

# Story LA-1.1: Migration is_available + types

## Objetivo
Adicionar a coluna `is_available BOOLEAN DEFAULT TRUE NOT NULL` na tabela `lessons` (Supabase) e regenerar os tipos TypeScript em `src/types/database.ts` para destravar LA-1.2 e LA-1.3.

## Acceptance Criteria
- [ ] AC1: Migration SQL criada em `supabase/migrations/{ts}_lessons_is_available.sql` executa `ALTER TABLE public.lessons ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE` com comentário descritivo na coluna (`COMMENT ON COLUMN`).
- [ ] AC2: Dry-run em transação (`BEGIN; ALTER ...; ROLLBACK;`) executa sem erro e snapshot pré-migration documenta o número exato de rows em `lessons` (esperado ≈13 + outras).
- [ ] AC3: Migration aplicada com sucesso (autorização explícita do PO antes do `db push` — regra anti-recorrência herdada de AV-3.1). Smoke pós-apply: `SELECT id, title, is_available FROM lessons LIMIT 5` retorna `is_available=true` para 100% das rows existentes.
- [ ] AC4: `src/types/database.ts` regenerado (`supabase gen types typescript`) contém `is_available: boolean` em `lessons.Row`, opcional em `Insert` (default no DB) e opcional em `Update`. Diff commitado junto com a migration.
- [ ] AC5: `pnpm build` passa sem erro de tipos. Nenhum consumer existente de `LessonRow` quebra (campo é adicionado, não removido nem renomeado).

## Escopo

**IN:**
- Migration SQL em `supabase/migrations/` (additiva, default TRUE).
- Regeração de `src/types/database.ts` via CLI Supabase.
- Validação local: dry-run em transação + `pnpm build` + smoke do admin de cursos (lê `lessons.Row`).
- Documentar SQL de rollback no PR.

**OUT:**
- Toggle UI no admin (LA-1.2).
- Badge "Em breve" e bloqueio de acesso no student (LA-1.3).
- Mudança em policies RLS — leitura permanece pelas policies atuais; o gate é semântico (renderização condicional), não autoritativo de RLS.
- Mudança em `has_access` ou `has_module_access` — RPCs não filtram por disponibilidade da aula. A decisão de bloquear o player é da camada de aplicação.
- Backfill — todas as aulas existentes ficam disponíveis (TRUE) por padrão.

## Contexto Técnico

**Arquivos afetados:**
- `supabase/migrations/{ts}_lessons_is_available.sql` (novo)
- `src/types/database.ts` (linha 698-771, bloco `lessons:`)

**Schema atual (`src/types/database.ts:698-771`):** Tabela `lessons` tem `id, module_id, slug, title, kind, sort_order, content, content_format, summary, summary_format, description, video_id, video_provider, duration_seconds, transcript, transcript_format, created_at, updated_at, deleted_at`. **Não tem `is_available`**.

**SQL canônico:**
```sql
-- {timestamp}_lessons_is_available.sql
-- Migration LA-1.1: controle de disponibilidade por aula.
-- Quando FALSE: aula aparece listada mas sem acesso ao player (badge "Em breve").
-- DEFAULT TRUE garante zero breaking change em aulas existentes.

ALTER TABLE public.lessons
  ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE;

COMMENT ON COLUMN public.lessons.is_available IS
  'Quando false, a aula aparece listada no curso mas com badge "Em breve" e sem acesso ao player. Default true mantém compatibilidade.';
```

**Rollback (documentar no PR; não auto-executar):**
```sql
ALTER TABLE public.lessons DROP COLUMN IF EXISTS is_available;
```

**Por que `DEFAULT TRUE NOT NULL`:** garante que todas as rows de PROD recebam `true` automaticamente; o admin opt-in para `false` ("aula em breve"). Evita branch `is_available IS NULL` em todos os consumers (LessonRow é largamente difundido — `page.tsx`, `CourseSidebar`, `CourseEditorClient`, etc.).

**RLS:** sem alteração nesta story. `lessons` já é gated por `has_access()` / `has_module_access()`. A coluna `is_available` é lida pela aplicação para decidir UI; não é segredo nem altera autorização de matrícula. Mudar RLS aqui seria over-engineering e poderia mascarar bugs do gate de aplicação.

**Views:** nenhuma view em `public` precisa de update (confirmado em `database.ts`: `Views: { [_ in never]: never }`).

**Constraint de orquestração:** Bloqueia LA-1.2 e LA-1.3 (ambas leem/escrevem a coluna). Aplicar primeiro, regenerar types, comunicar ao lead antes de liberar as outras stories.

**Safety Protocol (sites-data executa nesta ordem):**

```bash
# 1. SNAPSHOT (estado pré-migration)
supabase db query --linked "SELECT column_name FROM information_schema.columns WHERE table_name = 'lessons' AND table_schema = 'public' ORDER BY ordinal_position;"
supabase db query --linked "SELECT count(*) AS total FROM public.lessons;"

# 2. DRY-RUN (transação que faz rollback automático)
supabase db query --linked "BEGIN; ALTER TABLE public.lessons ADD COLUMN is_available BOOLEAN NOT NULL DEFAULT TRUE; ROLLBACK;"

# 3. APPLY (somente após autorização explícita do PO)
supabase db push

# 4. SMOKE-TEST
supabase db query --linked "SELECT id, title, is_available FROM public.lessons LIMIT 5;"
supabase db query --linked "SELECT count(*) FROM public.lessons WHERE is_available IS NULL;"  # esperado: 0

# 5. ROLLBACK manual (apenas se smoke falhar)
supabase db query --linked "ALTER TABLE public.lessons DROP COLUMN IF EXISTS is_available;"
```

**Atenção PROD:** DB de PROD tem cursos reais (Mentoria Claude Code + outros) com rows publicadas. Migration é additiva, portanto reversível com `DROP COLUMN`. Mesmo assim, sem `db push` para PROD sem autorização explícita do PO (regra anti-recorrência herdada de AV-3.1).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
