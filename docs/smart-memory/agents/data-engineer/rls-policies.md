---
title: RLS Policies — Plataforma de Cursos
type: reference
agent: sites-data
updated: 2026-05-06
tags: [rls, security, supabase, plataforma-cursos]
---

# RLS Policies — Plataforma de Cursos

Documentação das Row Level Security policies. Migrations aplicadas:
- `20260506022037_has_access_rls_policies.sql` — implementação inicial
- `20260506023754_fix_rls_privilege_escalation_and_missing_checks.sql` — correções QA (3 críticos + 5 altos)

## Funções auxiliares

| Função | Tipo | Descrição |
|---|---|---|
| `public.is_admin()` | `boolean` | Verifica se `auth.uid()` tem `role = 'ADMIN'` em `profiles` |
| `public.has_access(user_id, lesson_id)` | `boolean` | Verifica se o usuário tem matrícula ACTIVE em cohort que libera a lesson |
| `public.has_module_access(user_id, module_id)` | `boolean` | Espelho de `has_access`, filtra por `module_id` diretamente via `modules.course_id` (FM-3.2) |

Todas são `security definer` e `stable` — podem ser cacheadas pelo planner.

## Regra geral

- `auth.uid() IS NULL` (anon) → **bloqueado** em todas as tabelas, **exceto** `cohorts` com `has_public_page = true AND status != 'ARCHIVED'` (LP pública)
- `service_role` → **bypassa RLS** completamente (usado em webhooks e seed)
- ADMIN → **acesso total** em todas as políticas de leitura e escrita

---

## Tabela por tabela

### `profiles`
| Operação | Condição |
|---|---|
| SELECT | `id = auth.uid()` OR `is_admin()` |
| UPDATE (USING) | `id = auth.uid()` OR `is_admin()` |
| UPDATE (WITH CHECK) | `role` imutável pelo próprio usuário (`role = role atual`) — apenas ADMIN pode alterar role |
| INSERT | `is_admin()` (handle_new_user roda como security definer) |
| DELETE | — (sem policy; apenas service_role) |

### `courses`
| Operação | Condição |
|---|---|
| SELECT | `published = true AND deleted_at IS NULL` OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `modules`
| Operação | Condição |
|---|---|
| SELECT | Course pai `published AND deleted_at IS NULL` AND `deleted_at IS NULL` OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `lessons`
| Operação | Condição |
|---|---|
| SELECT | `deleted_at IS NULL AND has_access(auth.uid(), id)` OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `materials`
| Operação | Condição |
|---|---|
| SELECT | `has_access(auth.uid(), lesson_id)` OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `module_materials` (FM-3.2 — 2026-05-17)
| Operação | Policy | Condição |
|---|---|---|
| SELECT | `"module_materials: leitura se tem acesso ao módulo"` | `has_module_access(auth.uid(), module_id)` OR `is_admin()` |
| INSERT | `"module_materials: admin escreve"` | `is_admin()` (WITH CHECK) |
| UPDATE | `"module_materials: admin atualiza"` | `is_admin()` (USING) |
| DELETE | `"module_materials: admin deleta"` | `is_admin()` (USING) |

RLS habilitada via `alter table public.module_materials enable row level security` **antes** das policies.

**Smoke RLS esperado:**
- (a) Aluno ACTIVE com matrícula no curso do módulo → SELECT retorna rows
- (b) Aluno sem matrícula → SELECT retorna 0 rows (sem erro)
- (c) Admin → SELECT retorna sempre (via branch `is_admin()`)

### `cohorts`
| Operação | Condição |
|---|---|
| SELECT | `has_public_page = true AND status != 'ARCHIVED'` OR membro ativo OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `cohort_courses`
| Operação | Condição |
|---|---|
| SELECT | Membro ativo em `cohort_courses.cohort_id` OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `cohort_cross_extensions`
| Operação | Condição |
|---|---|
| SELECT / INSERT / UPDATE / DELETE | `is_admin()` |

### `cohort_members`
| Operação | Condição |
|---|---|
| SELECT | `user_id = auth.uid()` OR `is_admin()` |
| INSERT / UPDATE | **service_role apenas** (sem policy para authenticated) |

### `live_sessions`
| Operação | Condição |
|---|---|
| SELECT | Membro ativo em `live_sessions.cohort_id` OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `coupons`
| Operação | Condição |
|---|---|
| SELECT / INSERT / UPDATE / DELETE | `is_admin()` |

### `payments`
| Operação | Condição |
|---|---|
| SELECT | `user_id = auth.uid()` OR `is_admin()` |
| INSERT / UPDATE | **service_role apenas** (webhook Stripe) |

### `webhook_events`
| Operação | Condição |
|---|---|
| Todas | **service_role apenas** (sem policy para authenticated/anon) |

### `lesson_progress`
| Operação | Condição |
|---|---|
| SELECT | `user_id = auth.uid()` OR `is_admin()` |
| INSERT | `user_id = auth.uid()` |
| UPDATE (USING + WITH CHECK) | `user_id = auth.uid()` |

### `certificates`
| Operação | Condição |
|---|---|
| SELECT | `user_id = auth.uid()` OR `is_admin()` |
| INSERT | **service_role apenas** (Server Action privilegiada) |

### `comments`
| Operação | Condição |
|---|---|
| SELECT | `deleted_at IS NULL AND has_access(auth.uid(), lesson_id)` OR `is_admin()` |
| INSERT | `author_id = auth.uid() AND has_access(auth.uid(), lesson_id)` |
| UPDATE (USING + WITH CHECK) | `author_id = auth.uid()` OR `is_admin()` |
| DELETE | `is_admin()` (soft delete via `deleted_at`) |

### `forum_categories`
| Operação | Condição |
|---|---|
| SELECT | `is_active = true` AND membro ativo em qualquer cohort OR `is_admin()` |
| INSERT / UPDATE / DELETE | `is_admin()` |

### `forum_threads`
| Operação | Condição |
|---|---|
| SELECT | `deleted_at IS NULL` AND membro ativo em qualquer cohort OR `is_admin()` |
| INSERT | `author_id = auth.uid()` AND membro ativo em qualquer cohort |
| UPDATE (USING + WITH CHECK) | `author_id = auth.uid()` OR `is_admin()` |
| DELETE | `is_admin()` (soft delete via `deleted_at`) |

### `forum_replies`
| Operação | Condição |
|---|---|
| SELECT | `deleted_at IS NULL` AND membro ativo em qualquer cohort OR `is_admin()` |
| INSERT | `author_id = auth.uid()` AND membro ativo em qualquer cohort |
| UPDATE (USING + WITH CHECK) | `author_id = auth.uid()` OR `is_admin()` |
| DELETE | `is_admin()` |

### `votes`
| Operação | Condição |
|---|---|
| SELECT | Membro ativo em qualquer cohort OR `is_admin()` |
| INSERT | `user_id = auth.uid()` AND membro ativo em qualquer cohort |
| DELETE | `user_id = auth.uid()` OR `is_admin()` |

### `notifications`
| Operação | Condição |
|---|---|
| SELECT | `user_id = auth.uid()` OR `is_admin()` |
| UPDATE (USING + WITH CHECK) | `user_id = auth.uid()` (marcar como lida) |
| INSERT | **service_role apenas** |

---

## Casos de teste manuais (para QA)

```sql
-- Caso 1: aluno-online tenta ver lesson da cohort online (deve retornar true)
select public.has_access(
  '00000000-0000-0000-0000-000000000002',  -- aluno-online UUID
  '<lesson_id_do_course_demo>'
);

-- Caso 2: usuário sem matrícula tenta ver lesson (deve retornar false)
select public.has_access(
  gen_random_uuid(),
  '<lesson_id_do_course_demo>'
);

-- Caso 3: aluno com matrícula EXPIRED (deve retornar false)
-- Atualizar status temporariamente e testar:
-- update cohort_members set status='EXPIRED' where user_id='...'
-- select has_access(...)
-- update cohort_members set status='ACTIVE' where user_id='...'

-- Caso 4: aluno-mentoria não vê payments de outro aluno (deve retornar 0 rows)
-- set role authenticated; set request.jwt.claims = '{"sub":"<aluno-mentoria-id>"}';
-- select * from payments where user_id = '<aluno-online-id>';

-- Caso 5: STUDENT não pode elevar role para ADMIN via UPDATE (deve falhar com error 42501)
-- set role authenticated; set request.jwt.claims = '{"sub":"<aluno-online-id>"}';
-- update profiles set role = 'ADMIN' where id = '<aluno-online-id>';
-- Esperado: ERROR 42501 - new row violates row-level security policy
```

---

## Notas de segurança

- `webhook_events` não tem nenhuma policy — apenas `service_role` acessa. **Nunca adicionar policy para `authenticated`.**
- `SUPABASE_SERVICE_ROLE_KEY` bypassa RLS — usar apenas em Route Handlers/Server Actions/webhooks com `import 'server-only'`
- `has_access()` é `security definer` para poder consultar `cohort_members` mesmo quando o usuário não tem SELECT direto
- Policies de fórum verificam membros em **qualquer** cohort ativa — fórum é geral, não por cohort
