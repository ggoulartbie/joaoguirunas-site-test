---
title: Module Materials — Schema, RLS e Storage (FM-3.2)
type: reference
agent: sites-data
updated: 2026-05-17
tags: [schema, rls, materials, modules, fm-3.2]
related:
  - "[[../../decisions/ADR-002-materiais-por-modulo-schema]]"
  - "[[schema]]"
  - "[[rls-policies]]"
  - "[[storage]]"
  - "[[migrations-log]]"
---

# Module Materials — FM-3.2

## Status da migration

**PENDING APPLY** — arquivo criado, aguardando apply no remoto via MCP ou CLI.

Migration: `supabase/migrations/20260516210000_module_materials.sql`

## Schema final

```sql
create table public.module_materials (
  id            uuid primary key default gen_random_uuid(),
  module_id     uuid not null references public.modules(id) on delete cascade,
  title         text not null,
  kind          text not null
                  check (kind in ('PDF', 'ZIP', 'IMAGE', 'LINK', 'OTHER')),
  storage_path  text,
  external_url  text,
  size_bytes    bigint,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index on public.module_materials (module_id, sort_order);
```

Sem `updated_at` e sem `deleted_at` — espelho fiel de `materials` (hard delete, imutável após upload).

## Função RLS

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

## RLS Policies

```sql
alter table public.module_materials enable row level security;

create policy "module_materials: leitura se tem acesso ao módulo"
  on public.module_materials for select
  using (public.has_module_access(auth.uid(), module_id) or public.is_admin());

create policy "module_materials: admin escreve"
  on public.module_materials for insert
  with check (public.is_admin());

create policy "module_materials: admin atualiza"
  on public.module_materials for update
  using (public.is_admin());

create policy "module_materials: admin deleta"
  on public.module_materials for delete
  using (public.is_admin());
```

## Storage path convention

| Tipo | Bucket | Path |
|---|---|---|
| Material de aula (existente) | `materials` (privado) | `lessons/{lessonId}/{uuid}.{ext}` |
| Material de módulo (novo) | `materials` (privado) | `modules/{moduleId}/{uuid}.{ext}` |

Mesmo bucket, prefixos disjuntos. Sem bucket novo. Sem policy de storage nova (acesso via `supabaseAdmin` / service_role).

## Smoke RLS — 3 casos AC11

```sql
-- (a) Aluno COM matrícula ACTIVE no curso do módulo → deve retornar rows
select count(*)
from public.module_materials
where module_id = '<module_id_do_curso>';
-- Executar com JWT do aluno matriculado; espera: count >= 0 (sem erro, retorna o que existir)

-- (b) Aluno SEM matrícula → deve retornar 0 rows (não erro)
select count(*)
from public.module_materials
where module_id = '<module_id_do_curso>';
-- Executar com JWT de usuário não matriculado; espera: count = 0

-- (c) Admin → deve retornar sempre (branch is_admin())
select count(*)
from public.module_materials;
-- Executar com JWT de admin; espera: count = total de rows
```

## Rollback

```sql
drop policy if exists "module_materials: admin deleta" on public.module_materials;
drop policy if exists "module_materials: admin atualiza" on public.module_materials;
drop policy if exists "module_materials: admin escreve" on public.module_materials;
drop policy if exists "module_materials: leitura se tem acesso ao módulo" on public.module_materials;
drop function if exists public.has_module_access(uuid, uuid);
drop table if exists public.module_materials;
```

## AC12 — Confirmação de não-toque em existentes

A migration **não altera** nenhuma das seguintes:
- Tabela `materials`
- Função `has_access`
- Policies de `materials`
- Qualquer coluna ou constraint existente

Verificado via leitura direta do arquivo SQL.
