---
title: "MC-1.2: Popular títulos e descrições das aulas (módulos 3 e 5)"
type: story
status: done
epic: MC
complexity: M
agent: sites-data
created: 2026-05-17
updated: 2026-05-17
tags: [story, mentoria-claude-code, migration, lessons, content]
checklist: GO
related:
  - "[[MC-1.1-mapear-campos-treinamento-supabase]]"
  - "[[MC-1.3-integrar-links-vimeo-aulas-mentoria]]"
---

# MC-1.2: Popular títulos e descrições das aulas (módulos 3 e 5)

## Objetivo

Aplicar UPDATEs SQL por `lesson_id` nas aulas ativas dos módulos 3 e 5 do curso `mentoria-claude-code-aiox`, preenchendo `title`, `description` (e `transcript` quando óbvio) a partir do conteúdo dos arquivos `.txt` em `Curso On-line/`. Migration **idempotente** e **cirúrgica** — uma migration única com UPDATEs explícitos por ID, lendo o mapeamento canônico produzido em MC-1.1.

## Acceptance Criteria

- [ ] **AC1 (Migration única):** arquivo `supabase/migrations/YYYYMMDDHHMMSS_update_mentoria_lessons_m3_m5.sql` com:
  - Header comentado: objetivo, escopo (M3+M5), data, anti-recorrência soft-delete
  - 1 bloco `UPDATE` por aula, filtrando por `id = '<uuid>'` (chave primária — segurança máxima)
  - Cada UPDATE atualiza: `title`, `description` (e opcional `transcript` se decidido em MC-1.1)
  - Comentário antes de cada UPDATE indicando: módulo, sort_order, arquivo-fonte

- [ ] **AC2 (Idempotência):** rodar a migration 2x **não causa erro nem zera campos preenchidos depois**. UPDATEs por `id` são naturalmente idempotentes (sobrescrevem com o mesmo valor). **Não usar `INSERT`** nesta story — todas as aulas já existem.

- [ ] **AC3 (Anti-recorrência soft-delete):** todo UPDATE inclui guard `AND deleted_at IS NULL` (evita reativar aula deletada por engano). Migration não muda `deleted_at`.

- [ ] **AC4 (Não toca `video_id`):** migration **não altera** `video_id` nem `video_provider`. Esses campos ficam para MC-1.3. Comentário explícito no header.

- [ ] **AC5 (Não toca `summary`):** decisão de MC-1.1: `description` recebe o campo "DESCRIÇÃO" do .txt. `summary` (campo curto) pode ser preenchido depois, ou na mesma migration se MC-1.1 produzir summaries. Se não produzir, fica null.

- [ ] **AC6 (Conteúdo escapado):** todas as strings das aulas estão devidamente escapadas para SQL (aspas simples → `''`). Migration validada com `sqlfluff` ou parse manual antes do apply.

- [ ] **AC7 (Dry-run obrigatório):** antes de aplicar em prod:
  - Capturar snapshot pré: `select id, title, length(description) from lessons where id in (...)` 
  - Aplicar migration via `supabase db query --linked` ou `supabase db push` (a definir)
  - Capturar snapshot pós com a mesma query
  - Documentar diff: `N rows updated` e que apenas `title`/`description`/`updated_at` mudaram
  - Documentar contagem total de aulas afetadas (deve bater com lista MC-1.1)

- [ ] **AC8 (Push autorizado):** nenhum apply em prod sem aprovação explícita do João. Migration fica em branch (`feat-mentoria-content` ou similar) até autorização.

- [ ] **AC9 (Rollback documentado):** comentário no fim da migration com query SQL de rollback (`UPDATE lessons SET title = NULL, description = NULL WHERE id IN (...)`) — **não executar**, só documentar.

## Escopo

**IN:**
- Migration SQL com UPDATEs por `id` em todas as aulas mapeadas em MC-1.1 (M3 + M5).
- `title` + `description` preenchidos a partir dos `.txt`.
- Apply em prod via Supabase CLI após autorização do João.
- Snapshot pré/pós + diff documentado.

**OUT:**
- Popular `video_id` (é MC-1.3).
- Popular `transcript` longo (a menos que MC-1.1 explicite, normalmente fica em sprint futuro).
- INSERT de aulas novas (caso surja necessidade real, abrir MC-2.x).
- DELETE/soft-delete de aulas (idem).
- Publicar curso — já está publicado em prod.
- Mexer em módulos 0, 1, 2, 4, 6, 7, 8, 9.
- Alteração de schema.

## Contexto Técnico

**Tabela:** `public.lessons`. Campos relevantes: `id`, `module_id`, `title`, `description`, `slug`, `sort_order`, `video_id`, `video_provider`, `summary`, `transcript`, `deleted_at`.

**Padrão por UPDATE:**
```sql
-- Módulo 3 | sort_order=0 | arquivo: "Módulo 3 | Abertura.txt"
UPDATE public.lessons
SET title = 'Módulo 3 | Abertura',
    description = E'Bem-vindo ao Módulo 3 da mentoria de Claude Code.\n\nNessa abertura, posicionamos este módulo como o chão de tudo que vem pela frente...',
    updated_at = now()
WHERE id = '9828e194-...'
  AND deleted_at IS NULL;
```

**Apply via CLI:**
```bash
supabase db push  # se migration está em supabase/migrations/
# OU
supabase db query --linked "$(cat supabase/migrations/YYYY..._update.sql)"
```

**Anti-recorrência mass delete:** **nunca** rodar `UPDATE ... WHERE module_id = X` sem `AND id IN (...)` ou `AND deleted_at IS NULL`. Migration trabalha exclusivamente com lista explícita de IDs vinda de MC-1.1.

## Definition of Done

- Migration commitada em `supabase/migrations/`.
- Snapshot pré/pós capturado e linkado no `QA Results`.
- João autorizou apply em prod.
- N aulas com `title`/`description` preenchidos confirmado via query.
- Smoke local: aluno autenticado vê os títulos novos em `/academy/curso/mentoria-claude-code-aiox` (visual).

## QA Results

<!-- preenchido pelo agente que executar — antes de mover para done -->
