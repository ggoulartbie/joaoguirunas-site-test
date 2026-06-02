-- ============================================================
-- FM-3.2: module_materials — migration aditiva pura
-- NÃO toca: materials, has_access, policies de materials
-- ============================================================

-- Tabela espelho de materials, vinculada a modules ao invés de lessons
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
-- module_materials não tem updated_at: imutável após upload (espelho de materials)

-- Índice de suporte (espelho de materials (lesson_id, sort_order))
create index on public.module_materials (module_id, sort_order);

-- ============================================================
-- FUNÇÃO: has_module_access(user_id, module_id)
-- Espelho enxuto de has_access, filtrando por module_id diretamente
-- ============================================================
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

-- ============================================================
-- RLS: habilitar ANTES das policies (sem isso tabela fica aberta)
-- ============================================================
alter table public.module_materials enable row level security;

-- ============================================================
-- POLICIES: module_materials
-- ============================================================
create policy "module_materials: leitura se tem acesso ao módulo"
  on public.module_materials for select
  using (
    public.has_module_access(auth.uid(), module_id)
    or public.is_admin()
  );

create policy "module_materials: admin escreve"
  on public.module_materials for insert
  with check (public.is_admin());

create policy "module_materials: admin atualiza"
  on public.module_materials for update
  using (public.is_admin());

create policy "module_materials: admin deleta"
  on public.module_materials for delete
  using (public.is_admin());
