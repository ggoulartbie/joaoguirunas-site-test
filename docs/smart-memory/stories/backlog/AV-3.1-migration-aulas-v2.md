---
title: "Story AV-3.1: Migration Aulas v2 — summary + transcript + lesson_reactions + template inicial"
type: story
status: backlog
epic: AV
complexity: M
agent: sites-data
created: 2026-05-16
updated: 2026-05-16
tags: [story, migration, schema, aulas-v2, lessons, reactions]
related:
  - "[[../../project/architecture]]"
  - "[[AV-3.2-template-md-elegante]]"
  - "[[AV-3.3-admin-3-campos-toggle]]"
  - "[[AV-3.4-aluno-5-abas]]"
  - "[[AV-3.5-aluno-like-dislike]]"
---

# Story AV-3.1: Migration Aulas v2 — summary + transcript + lesson_reactions + template inicial

## Objetivo
Migration única que prepara o schema para a experiência Aulas v2: adiciona colunas `summary` e `transcript` (markdown) na tabela `lessons`, cria a tabela `lesson_reactions` (LIKE/DISLIKE por aluno) com RLS, e popula com template MD inicial as ~13 aulas que estão hoje com `description` vazia.

## Acceptance Criteria

- [ ] **AC1 (Colunas em lessons)**: `ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS summary TEXT`, `ADD COLUMN IF NOT EXISTS summary_format TEXT`, `ADD COLUMN IF NOT EXISTS transcript TEXT`, `ADD COLUMN IF NOT EXISTS transcript_format TEXT`. Sem default e sem NOT NULL — campos opcionais. `summary_format` e `transcript_format` aceitam apenas `'MARKDOWN' | 'HTML' | 'MDX'` via CHECK constraint (espelha o constraint de `content_format`, se existir; caso contrário, criar).

- [ ] **AC2 (Tabela lesson_reactions)**: `CREATE TABLE IF NOT EXISTS public.lesson_reactions ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE, user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, reaction TEXT NOT NULL CHECK (reaction IN ('LIKE','DISLIKE')), created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE (lesson_id, user_id) )`. Index em `lesson_id` para o agregado de count. Trigger `set_updated_at` reusando o padrão existente em outras tabelas.

- [ ] **AC3 (RLS lesson_reactions)**: `ENABLE ROW LEVEL SECURITY`. Policies:
  - `SELECT`: qualquer usuário autenticado pode ler (count agregado precisa ser visível para todos).
  - `INSERT/UPDATE/DELETE`: somente `user_id = auth.uid()` (cada aluno só mexe na própria reação).
  - Admin bypass via `supabaseAdmin` (service role) já é automático.

- [ ] **AC4 (Template inicial nas aulas vazias)**: `UPDATE public.lessons SET description = $TEMPLATE, content_format = COALESCE(content_format, 'MARKDOWN') WHERE (description IS NULL OR trim(description) = '') AND deleted_at IS NULL`. Conteúdo do `$TEMPLATE` definido em [[AV-3.2-template-md-elegante]] (texto minimalista, sem emojis). Migração popula apenas onde `description` está vazia — não sobrescreve aulas com texto existente.

- [ ] **AC5 (Dry-run obrigatório)**: Antes de aplicar em PROD, sites-data faz dry-run em ambiente local (Supabase local stack ou branch de banco) e produz contagem em [[../../agents/data-engineer/]]: quantas linhas de `lessons` seriam afetadas pelo UPDATE de `description`. Resultado esperado: ~13 (conforme lead). Se contagem for >50, pausar e revalidar com lead.

- [ ] **AC6 (Tipos TS regenerados)**: Após migration aplicada, rodar `pnpm db:types` (ou comando equivalente do projeto) para regenerar `src/types/database.ts` com os 4 campos novos em `lessons` e a tabela `lesson_reactions`. Commit separado.

- [ ] **AC7 (Idempotência)**: Migration usa `IF NOT EXISTS` e `ON CONFLICT DO NOTHING` onde aplicável. Re-rodar a migration não quebra. UPDATE do template é guarded por `WHERE description IS NULL OR trim(description) = ''` — não duplica template em aula já populada.

- [ ] **AC8 (Smoke pós-migration)**:
  1. `SELECT count(*) FROM lessons WHERE summary IS NULL` → todas as linhas (esperado, campo opcional novo).
  2. `SELECT count(*) FROM lesson_reactions` → 0.
  3. `INSERT INTO lesson_reactions (lesson_id, user_id, reaction) VALUES (...,'LIKE')` como aluno → ok.
  4. Mesmo `INSERT` repetido → erro de UNIQUE, esperado.
  5. `UPDATE` mudando para `DISLIKE` → ok (é o caminho de "trocar voto").
  6. `SELECT description FROM lessons WHERE id = $aula_que_estava_vazia` → retorna o template.

## Escopo

**IN:**
- Arquivo único `supabase/migrations/{timestamp}_aulas_v2_summary_transcript_reactions.sql` com:
  - `ALTER TABLE lessons` adicionando 4 colunas
  - `CHECK constraint` em `summary_format` e `transcript_format`
  - `CREATE TABLE lesson_reactions` + index + UNIQUE + trigger updated_at
  - `ENABLE RLS` + 4 policies (SELECT all auth, INSERT/UPDATE/DELETE self)
  - `UPDATE lessons SET description = $template WHERE empty`
- Dry-run em local, contagem documentada em smart-memory.
- Regeneração de `database.types.ts` (commit separado pra facilitar review).

**OUT:**
- Mudanças em `LessonEditorClient.tsx` (escopo de [[AV-3.3-admin-3-campos-toggle]]).
- Mudanças em `LessonTabs.tsx` ou `page.tsx` do aluno (escopo de [[AV-3.4-aluno-5-abas]]).
- UI de like/dislike (escopo de [[AV-3.5-aluno-like-dislike]]).
- Aggregação cached de reaction counts (`lessons.like_count` desnormalizado) — count via `SELECT reaction, count(*) GROUP BY` é suficiente no MVP. Se virar gargalo, criar story de denormalização depois.
- Soft-delete (`deleted_at`) em `lesson_reactions` — toggle off é DELETE puro.
- Histórico de reações (auditoria) — `updated_at` é suficiente.

## Contexto Técnico

**Branch:** `feat-aulas-v2` (NÃO main).

**Migrations recentes pra herdar padrões (verificar):**
- `supabase/migrations/20260511110000_user_has_password.sql` — exemplo de função SQL recente.
- Buscar última migration que crie tabela com RLS para herdar o padrão de policy naming e trigger `set_updated_at`.

**Trade-off de count agregado:**
- Hoje: `SELECT reaction, count(*) FROM lesson_reactions WHERE lesson_id = $id GROUP BY reaction` em cada page load do aluno. ~2 rows por lesson, índice em lesson_id resolve.
- Se escalar (10k+ alunos por aula com voto), considerar materialized view ou trigger que mantém `lessons.like_count`/`dislike_count`. **Fora de escopo no MVP.**

**Risco da operação UPDATE em produção:**
- 13 rows é trivial, mas migration roda durante deploy — se algo der errado no UPDATE, transação inteira faz rollback (PostgreSQL é ACID por padrão em migrations Supabase).
- Backup automático do Supabase já cobre. Sem necessidade de snapshot manual.

**Coordenação:**
- sites-data (Bythelion) executa.
- Após aplicar, notificar lead → sites-dev-alpha pode começar [[AV-3.3-admin-3-campos-toggle]] e [[AV-3.4-aluno-5-abas]] (depende dos tipos regenerados).
- [[AV-3.2-template-md-elegante]] precisa ter o `$TEMPLATE` definido **antes** desta migration ser aplicada (Bythelion lê o conteúdo do md da Story 3.2).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-data (Bythelion) |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-aulas-v2 |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
