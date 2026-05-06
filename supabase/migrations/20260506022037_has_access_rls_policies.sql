-- Migration: has_access_rls_policies
-- Função has_access() + RLS habilitado + policies em todas as 21 tabelas

-- ============================================================
-- FUNÇÃO AUXILIAR: is_admin
-- Usada dentro das policies para evitar subquery repetida
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
  );
$$;

-- ============================================================
-- FUNÇÃO PRINCIPAL: has_access(user_id, lesson_id)
-- Coração da autorização. Usada em policies RLS e Server Components.
-- Retorna true se o usuário tem matrícula ACTIVE em uma cohort
-- que libera o módulo ao qual a lesson pertence.
-- ============================================================
create or replace function public.has_access(p_user_id uuid, p_lesson_id uuid)
returns boolean
language sql
security definer
stable
as $$
  with lesson_info as (
    select l.module_id, m.course_id
    from public.lessons l
    join public.modules m on m.id = l.module_id
    where l.id = p_lesson_id
      and l.deleted_at is null
  )
  select exists (
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
  );
$$;

-- ============================================================
-- HABILITAR RLS EM TODAS AS TABELAS
-- ============================================================
alter table public.profiles              enable row level security;
alter table public.courses               enable row level security;
alter table public.modules               enable row level security;
alter table public.lessons               enable row level security;
alter table public.materials             enable row level security;
alter table public.cohorts               enable row level security;
alter table public.cohort_courses        enable row level security;
alter table public.cohort_cross_extensions enable row level security;
alter table public.cohort_members        enable row level security;
alter table public.live_sessions         enable row level security;
alter table public.coupons               enable row level security;
alter table public.payments              enable row level security;
alter table public.webhook_events        enable row level security;
alter table public.lesson_progress       enable row level security;
alter table public.certificates          enable row level security;
alter table public.comments              enable row level security;
alter table public.forum_categories      enable row level security;
alter table public.forum_threads         enable row level security;
alter table public.forum_replies         enable row level security;
alter table public.votes                 enable row level security;
alter table public.notifications         enable row level security;

-- ============================================================
-- POLICIES: profiles
-- ============================================================
create policy "profiles: usuário lê o próprio"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles: usuário edita o próprio"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin());

create policy "profiles: admin insere"
  on public.profiles for insert
  with check (public.is_admin());

-- handle_new_user roda como security definer, não precisa de policy de insert para authenticated

-- ============================================================
-- POLICIES: courses
-- ============================================================
create policy "courses: leitura pública se published"
  on public.courses for select
  using (
    (published = true and deleted_at is null)
    or public.is_admin()
  );

create policy "courses: admin escreve"
  on public.courses for insert
  with check (public.is_admin());

create policy "courses: admin atualiza"
  on public.courses for update
  using (public.is_admin());

create policy "courses: admin deleta (soft delete via deleted_at)"
  on public.courses for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: modules
-- ============================================================
create policy "modules: leitura se course published"
  on public.modules for select
  using (
    exists (
      select 1 from public.courses c
      where c.id = course_id
        and c.published = true
        and c.deleted_at is null
    )
    and deleted_at is null
    or public.is_admin()
  );

create policy "modules: admin escreve"
  on public.modules for insert
  with check (public.is_admin());

create policy "modules: admin atualiza"
  on public.modules for update
  using (public.is_admin());

create policy "modules: admin deleta"
  on public.modules for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: lessons
-- ============================================================
create policy "lessons: leitura se tem acesso"
  on public.lessons for select
  using (
    (
      deleted_at is null
      and public.has_access(auth.uid(), id)
    )
    or public.is_admin()
  );

create policy "lessons: admin escreve"
  on public.lessons for insert
  with check (public.is_admin());

create policy "lessons: admin atualiza"
  on public.lessons for update
  using (public.is_admin());

create policy "lessons: admin deleta"
  on public.lessons for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: materials
-- ============================================================
create policy "materials: leitura se tem acesso à lesson"
  on public.materials for select
  using (
    public.has_access(auth.uid(), lesson_id)
    or public.is_admin()
  );

create policy "materials: admin escreve"
  on public.materials for insert
  with check (public.is_admin());

create policy "materials: admin atualiza"
  on public.materials for update
  using (public.is_admin());

create policy "materials: admin deleta"
  on public.materials for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: cohorts
-- ============================================================
create policy "cohorts: leitura pública se has_public_page"
  on public.cohorts for select
  using (
    (has_public_page = true and status != 'ARCHIVED')
    or exists (
      select 1 from public.cohort_members cm
      where cm.cohort_id = id
        and cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

create policy "cohorts: admin escreve"
  on public.cohorts for insert
  with check (public.is_admin());

create policy "cohorts: admin atualiza"
  on public.cohorts for update
  using (public.is_admin());

create policy "cohorts: admin deleta"
  on public.cohorts for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: cohort_courses
-- ============================================================
create policy "cohort_courses: leitura se membro ativo da cohort"
  on public.cohort_courses for select
  using (
    exists (
      select 1 from public.cohort_members cm
      where cm.cohort_id = cohort_id
        and cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

create policy "cohort_courses: admin escreve"
  on public.cohort_courses for insert
  with check (public.is_admin());

create policy "cohort_courses: admin atualiza"
  on public.cohort_courses for update
  using (public.is_admin());

create policy "cohort_courses: admin deleta"
  on public.cohort_courses for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: cohort_cross_extensions
-- ============================================================
create policy "cohort_cross_extensions: leitura para admin"
  on public.cohort_cross_extensions for select
  using (public.is_admin());

create policy "cohort_cross_extensions: admin escreve"
  on public.cohort_cross_extensions for insert
  with check (public.is_admin());

create policy "cohort_cross_extensions: admin atualiza"
  on public.cohort_cross_extensions for update
  using (public.is_admin());

create policy "cohort_cross_extensions: admin deleta"
  on public.cohort_cross_extensions for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: cohort_members
-- ============================================================
create policy "cohort_members: usuário vê as próprias matrículas"
  on public.cohort_members for select
  using (user_id = auth.uid() or public.is_admin());

-- INSERT/UPDATE via service_role apenas (webhooks e admin manual)
-- Não criamos policy de insert/update para authenticated — service_role bypassa RLS

-- ============================================================
-- POLICIES: live_sessions
-- ============================================================
create policy "live_sessions: leitura para membros ativos da cohort"
  on public.live_sessions for select
  using (
    exists (
      select 1 from public.cohort_members cm
      where cm.cohort_id = cohort_id
        and cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

create policy "live_sessions: admin escreve"
  on public.live_sessions for insert
  with check (public.is_admin());

create policy "live_sessions: admin atualiza"
  on public.live_sessions for update
  using (public.is_admin());

create policy "live_sessions: admin deleta"
  on public.live_sessions for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: coupons
-- ============================================================
create policy "coupons: somente admin lê"
  on public.coupons for select
  using (public.is_admin());

create policy "coupons: admin escreve"
  on public.coupons for insert
  with check (public.is_admin());

create policy "coupons: admin atualiza"
  on public.coupons for update
  using (public.is_admin());

create policy "coupons: admin deleta"
  on public.coupons for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: payments
-- ============================================================
create policy "payments: usuário vê os próprios"
  on public.payments for select
  using (user_id = auth.uid() or public.is_admin());

-- INSERT/UPDATE via service_role apenas (webhooks Stripe)

-- ============================================================
-- POLICIES: webhook_events
-- ============================================================
-- Sem policies para authenticated/anon: apenas service_role acessa
-- service_role bypassa RLS completamente

-- ============================================================
-- POLICIES: lesson_progress
-- ============================================================
create policy "lesson_progress: usuário lê o próprio"
  on public.lesson_progress for select
  using (user_id = auth.uid() or public.is_admin());

create policy "lesson_progress: usuário insere o próprio"
  on public.lesson_progress for insert
  with check (user_id = auth.uid());

create policy "lesson_progress: usuário atualiza o próprio"
  on public.lesson_progress for update
  using (user_id = auth.uid());

-- ============================================================
-- POLICIES: certificates
-- ============================================================
create policy "certificates: usuário vê os próprios"
  on public.certificates for select
  using (user_id = auth.uid() or public.is_admin());

-- INSERT via service_role (gerado por Server Action privilegiada)

-- ============================================================
-- POLICIES: comments
-- ============================================================
create policy "comments: leitura se tem acesso à lesson"
  on public.comments for select
  using (
    (
      deleted_at is null
      and public.has_access(auth.uid(), lesson_id)
    )
    or public.is_admin()
  );

create policy "comments: autenticado com acesso pode comentar"
  on public.comments for insert
  with check (
    author_id = auth.uid()
    and public.has_access(auth.uid(), lesson_id)
  );

create policy "comments: autor edita o próprio"
  on public.comments for update
  using (author_id = auth.uid() or public.is_admin());

create policy "comments: admin deleta (soft delete via deleted_at)"
  on public.comments for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: forum_categories
-- ============================================================
create policy "forum_categories: leitura para membros ativos em qualquer cohort"
  on public.forum_categories for select
  using (
    is_active = true
    and exists (
      select 1 from public.cohort_members cm
      where cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

create policy "forum_categories: admin escreve"
  on public.forum_categories for insert
  with check (public.is_admin());

create policy "forum_categories: admin atualiza"
  on public.forum_categories for update
  using (public.is_admin());

create policy "forum_categories: admin deleta"
  on public.forum_categories for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: forum_threads
-- ============================================================
create policy "forum_threads: leitura para membros ativos em qualquer cohort"
  on public.forum_threads for select
  using (
    (
      deleted_at is null
      and exists (
        select 1 from public.cohort_members cm
        where cm.user_id = auth.uid()
          and cm.status = 'ACTIVE'
      )
    )
    or public.is_admin()
  );

create policy "forum_threads: membro ativo cria thread"
  on public.forum_threads for insert
  with check (
    author_id = auth.uid()
    and exists (
      select 1 from public.cohort_members cm
      where cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
  );

create policy "forum_threads: autor edita o próprio"
  on public.forum_threads for update
  using (author_id = auth.uid() or public.is_admin());

create policy "forum_threads: admin deleta (soft via deleted_at)"
  on public.forum_threads for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: forum_replies
-- ============================================================
create policy "forum_replies: leitura para membros ativos em qualquer cohort"
  on public.forum_replies for select
  using (
    (
      deleted_at is null
      and exists (
        select 1 from public.cohort_members cm
        where cm.user_id = auth.uid()
          and cm.status = 'ACTIVE'
      )
    )
    or public.is_admin()
  );

create policy "forum_replies: membro ativo responde"
  on public.forum_replies for insert
  with check (
    author_id = auth.uid()
    and exists (
      select 1 from public.cohort_members cm
      where cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
  );

create policy "forum_replies: autor edita o próprio"
  on public.forum_replies for update
  using (author_id = auth.uid() or public.is_admin());

create policy "forum_replies: admin deleta"
  on public.forum_replies for delete
  using (public.is_admin());

-- ============================================================
-- POLICIES: votes
-- ============================================================
create policy "votes: leitura para membros ativos"
  on public.votes for select
  using (
    exists (
      select 1 from public.cohort_members cm
      where cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

create policy "votes: membro ativo vota"
  on public.votes for insert
  with check (
    user_id = auth.uid()
    and exists (
      select 1 from public.cohort_members cm
      where cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
  );

create policy "votes: usuário remove o próprio voto"
  on public.votes for delete
  using (user_id = auth.uid() or public.is_admin());

-- ============================================================
-- POLICIES: notifications
-- ============================================================
create policy "notifications: usuário vê as próprias"
  on public.notifications for select
  using (user_id = auth.uid() or public.is_admin());

create policy "notifications: usuário marca como lida"
  on public.notifications for update
  using (user_id = auth.uid());

-- INSERT via service_role apenas
