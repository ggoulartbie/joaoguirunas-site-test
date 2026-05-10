-- F9.9 — Auditar has_access RPC + gates de acesso a aulas e módulos
--
-- Fixes aplicados:
--   1. Override de role: ADMIN e MENTOR recebem has_access=true para qualquer aula.
--      Razão: admins e mentores precisam revisar conteúdo sem estarem matriculados.
--   2. A checagem expires_at > now() já existia — confirmada correta (AC3).
--   3. included_module_ids vazio (cardinality=0) já libera acesso total à cohort — correto.
--
-- O bug de hasGlobalAccess na UI (AC5) é corrigido no código TypeScript, não aqui.

create or replace function public.has_access(p_user_id uuid, p_lesson_id uuid)
returns boolean
language sql
security definer
stable
as $$
  -- Admins e mentores têm acesso a qualquer aula independente de matrícula.
  -- Isso permite revisão de conteúdo sem enrollment manual.
  select
    -- AC4: role override
    exists (
      select 1 from public.profiles
      where id = p_user_id
        and role in ('ADMIN', 'MENTOR')
    )
    or
    -- Matrícula ativa com módulo acessível
    exists (
      with lesson_info as (
        select l.module_id, m.course_id
        from public.lessons l
        join public.modules m on m.id = l.module_id
        where l.id = p_lesson_id
          and l.deleted_at is null
      )
      select 1
      from public.cohort_members cm
      join public.cohort_courses cc on cc.cohort_id = cm.cohort_id
      join lesson_info li on li.course_id = cc.course_id
      where cm.user_id = p_user_id
        and cm.status = 'ACTIVE'
        -- AC3: matrícula não expirada (cron pode atrasar; expires_at é o gate real)
        and (cm.expires_at is null or cm.expires_at > now())
        and (
          -- cardinality=0 significa cohort sem restrições de módulo → acesso total
          cardinality(cc.included_module_ids) = 0
          or li.module_id = any(cc.included_module_ids)
        )
    );
$$;
