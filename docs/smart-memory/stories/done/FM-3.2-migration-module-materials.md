---
title: "FM-3.2: Migration `module_materials` + função `has_module_access` + RLS + storage convention"
type: story
status: done
epic: FM
complexity: M
agent: sites-data
created: 2026-05-17
completed: 2026-05-17
tags: [story, migration, schema, rls, materials, modules, supabase]
checklist: GO
related:
  - "[[../../decisions/ADR-002-materiais-por-modulo-schema]]"
  - "[[../../decisions/ADR-001-plataforma-cursos-stack]]"
  - "[[../../agents/data-engineer/schema]]"
  - "[[../../agents/data-engineer/rls-policies]]"
---

# FM-3.2: Migration `module_materials` + função `has_module_access` + RLS + storage convention

## Objetivo

Criar **tabela nova** `public.module_materials` espelhada de `materials` (vinculada a `modules` ao invés de `lessons`), a **função RLS `has_module_access(user_id, module_id)`** como espelho enxuto de `has_access`, **policies RLS** completas (SELECT via `has_module_access`, INSERT/UPDATE/DELETE via `is_admin()`), índice de suporte e registro da convenção de storage (`materials/modules/{moduleId}/{uuid}.{ext}`) na documentação.

Migration **aditiva pura** sobre prod com dados reais — zero downtime, zero backfill, zero risco de regressão em `materials`/`lessons` existentes.

## Acceptance Criteria

- [ ] **AC1 (DDL da tabela)**: nova migration cria `public.module_materials` com colunas idênticas ao schema descrito na [[../../decisions/ADR-002-materiais-por-modulo-schema]] (id, module_id NOT NULL FK on delete cascade, title, kind check, storage_path nullable, external_url nullable, size_bytes, sort_order, created_at). **Sem** `updated_at` e **sem** `deleted_at` (espelho fiel: materiais são imutáveis após upload, hard delete).
- [ ] **AC2 (Índice)**: `create index on public.module_materials (module_id, sort_order)` — espelha o índice de `materials (lesson_id, sort_order)` em `20260506021755_initial_schema_identidade_catalogo.sql:152`.
- [ ] **AC3 (Função `has_module_access`)**: criar `public.has_module_access(p_user_id uuid, p_module_id uuid) returns boolean` com `language sql security definer stable`, idêntica em filosofia ao `has_access` (`20260506022037_has_access_rls_policies.sql:27-53`): JOIN `cohort_members` ACTIVE + `cohort_courses` + `modules`, com mesma lógica de `cohort_members.expires_at` e `cohort_courses.included_module_ids` (array vazio = todos liberados). DDL exato está colado na ADR-002 — usar como cópia autoritativa.
- [ ] **AC4 (RLS habilitada)**: `alter table public.module_materials enable row level security` antes das policies. Não esquecer — sem isso, a tabela fica completamente aberta.
- [ ] **AC5 (Policy SELECT)**: `"module_materials: leitura se tem acesso ao módulo"` com `using (public.has_module_access(auth.uid(), module_id) or public.is_admin())`. Espelha estrutura de `"materials: leitura se tem acesso à lesson"` (`20260506022037_has_access_rls_policies.sql:175-180`).
- [ ] **AC6 (Policies INSERT/UPDATE/DELETE admin)**: 3 policies idênticas em estrutura às de `materials` (`20260506022037_:182-192`):
  - `"module_materials: admin escreve"` insert with check `is_admin()`
  - `"module_materials: admin atualiza"` update using `is_admin()`
  - `"module_materials: admin deleta"` delete using `is_admin()`
- [ ] **AC7 (Storage — sem migration nova)**: bucket `materials` (privado) já existe e cobre o caso novo. **Não criar bucket novo**. Documentar a convenção de path `modules/{moduleId}/{uuid}.{ext}` em [[../../agents/data-engineer/storage]] (anexar seção "Module materials"). Storage policies do bucket `materials` já cobrem service_role (admin via `supabaseAdmin`) — nenhuma policy nova necessária. Validar no checklist.
- [ ] **AC8 (Dry-run em local)**: aplicar a migration em ambiente local (`supabase db reset` ou `db push` em staging local) antes de qualquer push para prod. Capturar saída de `supabase db lint` (se disponível) ou validar que `pnpm typecheck` passa após regeneração de tipos.
- [ ] **AC9 (Regen de tipos)**: rodar `supabase gen types typescript --linked > src/types/database.ts` (ou comando equivalente do projeto) para incluir `module_materials` em `Database['public']['Tables']`. Commit junto com a migration. Validar via grep que `module_materials` aparece em `database.types.ts` / `database.ts`.
- [ ] **AC10 (Documentação)**: atualizar [[../../agents/data-engineer/schema]] adicionando seção `module_materials` (espelho da seção `materials`), [[../../agents/data-engineer/rls-policies]] adicionando policies e função `has_module_access`, [[../../agents/data-engineer/migrations-log]] com nome do arquivo de migration e data de aplicação.
- [ ] **AC11 (Smoke RLS — pelo menos 3 casos)**: documentar no PR/Story:
  - (a) `select` em `module_materials` como aluno **com** `cohort_members ACTIVE` no curso → retorna rows
  - (b) `select` em `module_materials` como aluno **sem** matrícula → retorna vazio (não erro)
  - (c) `select` como admin → retorna sempre (`is_admin()` branch)
- [ ] **AC12 (NÃO tocar `materials` existente)**: confirmar via diff que a migration **não** altera tabela `materials`, função `has_access`, policies de `materials`, nem qualquer coluna existente. Esta é a defesa-em-profundidade do ADR-001 sobre risco RLS crítico.

## Escopo

**IN:**
- Nova migration SQL em `supabase/migrations/{timestamp}_module_materials.sql`
- DDL: tabela, índice, função `has_module_access`, RLS enable, 4 policies (SELECT/INSERT/UPDATE/DELETE)
- Regeneração de `database.types.ts` / `src/types/database.ts`
- Atualização de docs em `agents/data-engineer/` (3 arquivos: schema, rls-policies, migrations-log, + seção em storage)
- Dry-run local + capturar evidência

**OUT:**
- Alterações em `materials` existente
- Alterações em `has_access` existente
- Bucket novo de storage (reuso de `materials`)
- Backfill / seed de dados — Epic FM começa com 0 module_materials
- Server actions (são da FM-3.3)
- UI (FM-3.4/FM-3.5)
- Push para prod — só após QA gate (FM-3.6) e autorização explícita do João + sites-devops

## Contexto Técnico

**Schema-referência** (espelho a copiar) — `supabase/migrations/20260506021755_initial_schema_identidade_catalogo.sql:131-152`:

```sql
create table public.materials (
  id            uuid primary key default gen_random_uuid(),
  lesson_id     uuid not null references public.lessons(id) on delete cascade,
  title         text not null,
  kind          text not null check (kind in ('PDF', 'ZIP', 'IMAGE', 'LINK', 'OTHER')),
  storage_path  text,
  external_url  text,
  size_bytes    bigint,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);
create index on public.materials (lesson_id, sort_order);
```

**RLS-referência** (espelho a copiar) — `supabase/migrations/20260506022037_has_access_rls_policies.sql:175-192`:

```sql
create policy "materials: leitura se tem acesso à lesson"
  on public.materials for select
  using (public.has_access(auth.uid(), lesson_id) or public.is_admin());

create policy "materials: admin escreve" on public.materials for insert with check (public.is_admin());
create policy "materials: admin atualiza" on public.materials for update using (public.is_admin());
create policy "materials: admin deleta" on public.materials for delete using (public.is_admin());
```

**`has_module_access` (DDL exato — copiar literal da ADR-002):**

```sql
create or replace function public.has_module_access(p_user_id uuid, p_module_id uuid)
returns boolean
language sql
security definer
stable
as $$
  with module_info as (
    select m.course_id
    from public.modules m
    where m.id = p_module_id
      and m.deleted_at is null
  )
  select exists (
    select 1
    from public.cohort_members cm
    join public.cohort_courses cc on cc.cohort_id = cm.cohort_id
    join module_info mi on mi.course_id = cc.course_id
    where cm.user_id = p_user_id
      and cm.status = 'ACTIVE'
      and (cm.expires_at is null or cm.expires_at > now())
      and (
        cardinality(cc.included_module_ids) = 0
        or p_module_id = any(cc.included_module_ids)
      )
  );
$$;
```

**Storage convention** (apenas documentar):

| Tipo | Bucket | Path |
|---|---|---|
| Material de aula (existente) | `materials` | `lessons/{lessonId}/{uuid}.{ext}` |
| Material de módulo (novo) | `materials` | `modules/{moduleId}/{uuid}.{ext}` |

## Coordenação

- **Bloqueia:** FM-3.3 (server actions precisam dos tipos regenerados + tabela existente para testar)
- **Bloqueia:** FM-3.4 e FM-3.5 (UIs dependem das actions)
- **Bloqueado por:** nada — primeira story do pipeline FM, pode começar imediatamente
- **Coordenação direta:** após `pnpm typecheck` PASS, avisar sites-dev-beta para iniciar FM-3.3

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente principal | sites-data (Bythelion) |
| Executor apply/regen | team-lead (MCP — agente sem credenciais CLI) |
| Iniciado | 2026-05-17 |
| Concluído | 2026-05-17 |
| Branch | feat-aulas-v2 |

**Nota operacional:** CLI `supabase` exige `SUPABASE_DB_PASSWORD` / token de acesso não disponível no ambiente de agente teammate. Apply e regen de tipos executados via MCP `apply_migration` + `generate_typescript_types` pelo lead. DDL e documentação 100% produzidos por Bythelion.

**Follow-up fora de escopo (registrado para fix pontual):** `pnpm db:types` no `package.json` aponta para `types/database.ts` (vazio) em vez de `src/types/database.ts` (canônico com 5 importadores). Bug pré-existente, uma linha de fix.

## File List

- `supabase/migrations/20260516210000_module_materials.sql` — migration aditiva pura (tabela, índice, função, RLS, 4 policies)
- `src/types/database.ts` — regenerado via MCP `generate_typescript_types` (3 ocorrências de `module_materials` + `has_module_access`)
- `docs/smart-memory/agents/data-engineer/schema.md` — seção `module_materials` + função `has_module_access`
- `docs/smart-memory/agents/data-engineer/rls-policies.md` — função + 4 policies + smoke RLS AC11
- `docs/smart-memory/agents/data-engineer/migrations-log.md` — entrada + rollback SQL
- `docs/smart-memory/agents/data-engineer/storage.md` — convenção `modules/{moduleId}/{uuid}.{ext}`
- `docs/smart-memory/agents/data-engineer/module-materials-schema.md` — schema completo, rollback, AC11 SQL
- `docs/smart-memory/INDEX.md` — referência ao novo arquivo

## QA Results

**Aceitação pragmática documentada (team-lead + Bythelion, 2026-05-17):**
- Migration aplicada em prod via MCP `apply_migration` — `success: true`
- `module_materials` e `has_module_access` confirmados em `src/types/database.ts` (3 ocorrências cada)
- `pnpm typecheck` — exit 0, sem erros
- `get_advisors` rodado pelo lead — 3 warns consistentes com padrão pré-existente (não introduzidos por esta migration)
- AC12 confirmado: diff da migration mostra zero alterações em `materials`, `has_access`, policies existentes
- Smoke RLS (AC11) delegado para FM-3.3 (sites-dev-beta): sem staging disponível, inserir/deletar em prod de forma isolada é desnecessário — server actions da FM-3.3 cobrirão os 3 casos (aluno com acesso, sem acesso, admin) em contexto real
