---
title: Migrations Log — Plataforma de Cursos
type: reference
agent: sites-data
updated: 2026-05-05
tags: [migrations, supabase, plataforma-cursos]
---

# Migrations Log

Histórico de migrations aplicadas no projeto `mksmmpfyqowuzjcchhkl`.

| # | Arquivo | Data | Conteúdo | Status |
|---|---|---|---|---|
| 1 | `20260506021755_initial_schema_identidade_catalogo.sql` | 2026-05-05 | `profiles`, `courses`, `modules`, `lessons`, `materials` + `set_updated_at()` + `handle_new_user()` | APPLIED |
| 2 | `20260506021851_schema_cohorts.sql` | 2026-05-05 | `cohorts`, `cohort_courses`, `cohort_cross_extensions`, `cohort_members`, `live_sessions` | APPLIED |
| 3 | `20260506021931_schema_pagamento_progresso_comunidade.sql` | 2026-05-05 | `coupons`, `payments`, `webhook_events`, `lesson_progress`, `certificates`, `comments`, `forum_categories`, `forum_threads`, `forum_replies`, `votes`, `notifications` | APPLIED |
| 4 | `20260506022037_has_access_rls_policies.sql` | 2026-05-05 | `is_admin()`, `has_access()`, RLS em todas as 21 tabelas | APPLIED |
| 5 | `20260506022229_storage_buckets_policies.sql` | 2026-05-06 | Buckets `avatars`, `covers`, `materials`, `certificates` | APPLIED |
| 6 | `20260506023754_fix_rls_privilege_escalation_and_missing_checks.sql` | 2026-05-06 | Fix: 3 críticos (escalada de privilégio em profiles, tautologias em cohort_courses/live_sessions) + 5 altos (UPDATE sem with check em 5 tabelas) | APPLIED |
| ~~7~~ | ~~`20260506032056_seed_dados_demo.sql`~~ | 2026-05-06 | REMOVIDO — seed não pode estar em migrations (roda em produção). Conteúdo movido para `supabase/seed.sql`. | REVERTED + DELETED |
| 7 | `20260506032901_revert_seed_from_migration.sql` | 2026-05-06 | Rollback do seed indevido: DELETE em auth.users, profiles, courses, modules, lessons, cohorts, cohort_cross_extensions, cohort_members, forum_categories com IDs fixos do seed | APPLIED |

## Regra crítica sobre seed

**`supabase/seed.sql` NÃO é uma migration.** Só roda via `supabase db reset` (dev local).
**Nunca inserir dados de teste em migrations** — eles rodam em produção via `supabase db push`.

## Regras de migrations

- **Nunca editar** arquivo de migration já aplicado — criar nova migration para correções
- **Sempre criar rollback** para migrations que alteram dados ou removem colunas
- **Dry-run** antes de aplicar em produção: `supabase db push --dry-run`
- **Smoke test** após cada migration: verificar contagem de rows e queries críticas

## Comandos

```bash
# Criar nova migration
supabase migration new <nome_descritivo>

# Aplicar no remoto
supabase db push

# Ver diff entre local e remoto
supabase db diff

# Resetar banco local (dev) e rodar seed
supabase db reset --linked

# Gerar tipos após migration
pnpm db:types
```
