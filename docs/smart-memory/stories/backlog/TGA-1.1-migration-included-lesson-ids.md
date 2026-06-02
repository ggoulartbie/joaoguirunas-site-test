---
title: "Story TGA-1.1: Migration `included_lesson_ids` em `cohort_courses` + atualização `has_access`"
type: story
status: backlog
epic: TGA
complexity: M
agent: sites-data
created: 2026-05-25
updated: 2026-05-25
tags: [story, supabase, migration, rls, cohorts, access-control]
related:
  - "[[../../decisions/ADR-turma-granular-access]]"
  - "[[TGA-1.2-admin-ui-lesson-selector]]"
  - "[[TGA-1.3-student-enforcement-included-lesson-ids]]"
  - "[[TGA-1.4-qa-gate-granular-access]]"
---

# Story TGA-1.1: Migration `included_lesson_ids` em `cohort_courses` + atualização `has_access`

## Objetivo

Adicionar a coluna `included_lesson_ids uuid[] NOT NULL DEFAULT '{}'` a `cohort_courses` e atualizar a função RPC `has_access(user_id, lesson_id)` para respeitar essa terceira camada de restrição, mantendo a função `has_module_access` intacta e regenerando os tipos TypeScript do projeto.

## Acceptance Criteria

- [ ] **AC1 — Migration aditiva pura:** novo arquivo em `supabase/migrations/{timestamp}_cohort_courses_included_lesson_ids.sql` executa `alter table public.cohort_courses add column included_lesson_ids uuid[] not null default '{}'` e nada mais destrutivo. Não dropa coluna, não altera `included_module_ids`, não toca em outras tabelas.
- [ ] **AC2 — Backwards compatibility:** após apply, todas as linhas existentes em `cohort_courses` têm `included_lesson_ids = '{}'`. Verificável com `select count(*) from cohort_courses where included_lesson_ids is null` → `0`, e `select count(*) from cohort_courses where cardinality(included_lesson_ids) = 0` → `(total de rows existentes)`.
- [ ] **AC3 — Função `has_access` atualizada na MESMA migration (gate primário — concern Axilun):** mesma migration faz `create or replace function public.has_access(p_user_id uuid, p_lesson_id uuid)` adicionando a cláusula de aula descrita na ADR-003 (`and (cardinality(cc.included_lesson_ids) = 0 or li.lesson_id = any(cc.included_lesson_ids))`). A branch de role override (ADMIN/MENTOR) é preservada exatamente como em `20260510030000_has_access_admin_override.sql`. O CTE `lesson_info` ganha `l.id as lesson_id`. **Sem essa atualização da função, acesso direto por URL (`/curso/[slug]/aula/[lesson-slug]`) bypassa a restrição** — o RPC é o único gate que protege esse caminho (`page.tsx:99-102`).
- [ ] **AC4 — `has_module_access` NÃO é alterada:** a função `has_module_access(user_id, module_id)` (criada em `20260516210000_module_materials.sql`) permanece exatamente como está. Material de módulo continua autorizado pelo módulo inteiro, independente de `included_lesson_ids` — ADR-003 documenta isso como decisão deliberada.
- [ ] **AC5 — Smoke SQL de regressão pré-apply:** documentar em comentário no topo da migration as 4 queries de validação que devem retornar resultados esperados em prod (legacy cohort com `included_module_ids = []`, cohort com módulos específicos, cohort com módulos + aulas específicas, admin sem matrícula).
- [ ] **AC6 — Regerar `src/types/database.ts` e `src/lib/supabase/database.types.ts`** rodando `supabase gen types typescript --local > src/types/database.ts` (e mesmo arquivo em `lib/supabase/`). O type `Tables['cohort_courses']['Row']` deve passar a ter `included_lesson_ids: string[]`. Build do projeto (`pnpm typecheck` ou equivalente) passa sem erros.
- [ ] **AC7 — Comentário SQL de auditoria:** topo do arquivo da migration cita ADR-003 e o número desta story (TGA-1.1) — anti-recorrência (qualquer revisor encontra o link da decisão).
- [ ] **AC8 — Idempotência verificável:** rodar a migration duas vezes em ambiente local NÃO deve falhar nem duplicar a coluna. (`alter table … add column` lança erro se já existe — aceita; o ponto é que `create or replace function` é idempotente nativamente. Documentar comportamento esperado de re-apply no comentário.)
- [ ] **AC9 — Atomicidade DDL — bloqueia split de migrations (anti-recorrência Axilun):** os dois statements (ADD COLUMN + CREATE OR REPLACE FUNCTION) ficam **no mesmo arquivo de migration**. Splittar em dois arquivos é proibido — criaria janela de inconsistência entre apply 1 e apply 2 onde a coluna existe mas a função ainda autoriza só por módulo (alunos com URL direta da aula bypassam a restrição até o segundo apply). Documentar no comentário de cabeçalho: "Ordem dos statements importa: ALTER TABLE antes do CREATE OR REPLACE FUNCTION para que o catálogo do Postgres reconheça a coluna nova no body da função."
- [ ] **AC10 — Tabela verdade semântica documentada no comentário da função:** o `comment on function public.has_access(...)` (ou comentário de bloco no topo) cita a tabela verdade da ADR-003: `[],[]` = legacy total; `[],[uuid…]` = `included_lesson_ids` ignorado (legacy total); `[mod…],[]` = só módulos; `[mod…],[lesson…]` = restrição combinada; `[modA],[lessonNoModBloqueado]` = nenhuma aula acessível (módulo bloqueia primeiro). Anti-recorrência para revisores futuros entenderem o `OR cardinality=0` em ambos os níveis.

## Escopo

**IN:**
- Nova migration adicionando `included_lesson_ids` em `cohort_courses`.
- Update da função `has_access` na mesma migration (CREATE OR REPLACE).
- Regerar arquivos de tipos TS (`src/types/database.ts` + `src/lib/supabase/database.types.ts`).
- Comentário SQL explicando ADR-003 e queries de validação.
- Smoke SQL local antes de delegar apply a João.

**OUT:**
- UI do admin (TGA-1.2).
- Mudanças nas páginas do aluno (TGA-1.3).
- QA gate end-to-end (TGA-1.4).
- Alterar `has_module_access` (decisão arquitetural ADR-003: materiais de módulo permanecem por módulo).
- Backfill de dados (todas as cohorts existentes ficam com lista vazia = comportamento atual preservado).
- Audit log / triggers de auditoria de mudanças em `included_lesson_ids`.
- Drop de coluna ou alteração de tipo de `included_module_ids`.
- Push para `main` (sites-data prepara; João aplica e dá merge).

## Contexto Técnico

**ADR autoritativa:** [[../../decisions/ADR-turma-granular-access|ADR-003]] (Opção A — coluna array espelhada).

**Estado atual relevante:**

- `cohort_courses` definido em `supabase/migrations/20260506021851_schema_cohorts.sql:56-67`. PK composta `(cohort_id, course_id)`. `included_module_ids uuid[] not null default '{}'` é o precedente do padrão.
- Função `has_access` ativa: `supabase/migrations/20260510030000_has_access_admin_override.sql:11-50`. Contém role override + branch principal com `cardinality=0 or any(included_module_ids)`.
- Função `has_module_access`: `supabase/migrations/20260516210000_module_materials.sql:26+`. Espelho enxuto — **não muda**.
- RLS policies de `cohort_courses` em `supabase/migrations/20260506022037_has_access_rls_policies.sql:223-247` e `20260506023754_fix_rls_privilege_escalation_and_missing_checks.sql`. **Não precisam mudar** — as policies operam sobre a tupla `(cohort_id, course_id)` e o admin write/membro read continuam válidos para a coluna nova (pertence à mesma row).
- Tipos TS gerados em `src/types/database.ts:82-117` (a row de `cohort_courses`). Após regerar, `included_lesson_ids: string[]` aparece automaticamente em `Row`, `Insert` (com `?`) e `Update` (com `?`).

**SQL alvo (referência):**

```sql
-- {timestamp}_cohort_courses_included_lesson_ids.sql
-- ADR-003: granularidade aula por turma (Epic TGA — Story TGA-1.1)
-- Aditivo puro: adiciona coluna + atualiza função has_access. Não toca has_module_access.

alter table public.cohort_courses
  add column included_lesson_ids uuid[] not null default '{}';

comment on column public.cohort_courses.included_lesson_ids is
  'Aulas liberadas. Lista vazia = todas as aulas dos módulos liberados. ADR-003.';

create or replace function public.has_access(p_user_id uuid, p_lesson_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select
    exists (
      select 1 from public.profiles
      where id = p_user_id and role in ('ADMIN', 'MENTOR')
    )
    or
    exists (
      with lesson_info as (
        select l.id as lesson_id, l.module_id, m.course_id
        from public.lessons l
        join public.modules m on m.id = l.module_id
        where l.id = p_lesson_id and l.deleted_at is null
      )
      select 1
      from public.cohort_members cm
      join public.cohort_courses cc on cc.cohort_id = cm.cohort_id
      join lesson_info li on li.course_id = cc.course_id
      where cm.user_id = p_user_id
        and cm.status = 'ACTIVE'
        and (cm.expires_at is null or cm.expires_at > now())
        and (
          cardinality(cc.included_module_ids) = 0
          or li.module_id = any(cc.included_module_ids)
        )
        and (
          cardinality(cc.included_lesson_ids) = 0
          or li.lesson_id = any(cc.included_lesson_ids)
        );
    );
$$;
```

**Queries de validação (AC5):**

1. **Legacy cohort (acesso total):** `select public.has_access('{userId}'::uuid, '{lessonId}'::uuid)` para cohort com `included_module_ids = '{}' and included_lesson_ids = '{}'` → `true`.
2. **Cohort com módulo específico, aula no módulo liberado, sem restrição de aula:** `included_module_ids = '{modId}' and included_lesson_ids = '{}'` → `true` para qualquer aula daquele módulo.
3. **Cohort com aula específica liberada:** `included_module_ids = '{modId}' and included_lesson_ids = '{lessonId}'` → `true` para a aula listada, `false` para outra aula do mesmo módulo.
4. **Aula em módulo bloqueado mas listada em `included_lesson_ids`:** `included_module_ids = '{outroModId}' and included_lesson_ids = '{lessonNoModBloqueado}'` → `false` (módulo bloqueia primeiro — invariante explícita na ADR-003).
5. **Admin sem matrícula:** `has_access('{adminId}', qualquer aula)` → `true` (role override preservado).

**Anti-recorrência:**
- Migration crítica em prod com dados reais. Apply só após smoke local + autorização explícita do João (lead). Sites-data prepara, sites-data testa local, lead aprova e aplica.
- A função `has_access` é o coração da autorização (ADR-001 lista RLS como risco crítico). Diff funcional é literalmente 1 linha de `as lesson_id` no CTE + 4 linhas de cláusula nova — qualquer divergência do diff prescrito é red flag de revisão.
- **Concern formal Axilun (sites-qa):** RPC `has_access` é o único gate de acesso direto por URL — splitar a migration em "add column" e "update function" cria janela de inconsistência. AC9 trava isso explicitamente.
- **Concern Axilun #3 (semântica):** `[]` em `included_lesson_ids` significa "sem restrição neste nível" mesmo quando `included_module_ids = []` — a função `has_access` honra isso naturalmente por causa do `OR cardinality=0` nas duas cláusulas. AC10 documenta a tabela verdade no comentário da função para revisores futuros.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-data |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-turma-granular-access (a criar pelo dev) |

## File List
<!-- Dev preenche ao concluir -->
- `supabase/migrations/{timestamp}_cohort_courses_included_lesson_ids.sql` (NEW)
- `src/types/database.ts` (REGEN)
- `src/lib/supabase/database.types.ts` (REGEN)

## QA Results
<!-- QA preenche ao revisar; validação final adversarial em TGA-1.4 -->
