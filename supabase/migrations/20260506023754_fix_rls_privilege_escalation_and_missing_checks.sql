-- Migration: fix_rls_privilege_escalation_and_missing_checks
-- Corrige 3 críticos + 5 altos identificados pelo QA na F1.5
--
-- CRÍTICO-1: profiles UPDATE sem with check → STUDENT podia elevar role para ADMIN
-- CRÍTICO-2: cohort_courses SELECT vazava estrutura de todas as cohorts (tautologia em cm.cohort_id = cohort_id)
-- CRÍTICO-3: live_sessions SELECT vazava meeting_url cross-cohort (mesma tautologia)
-- ALTO-4: comments UPDATE sem with check
-- ALTO-5: forum_threads UPDATE sem with check
-- ALTO-6: forum_replies UPDATE sem with check
-- ALTO-7: notifications UPDATE sem with check
-- ALTO-8: lesson_progress UPDATE sem with check

-- ============================================================
-- CRÍTICO-1: profiles — bloquear escalada de role via UPDATE
-- ============================================================
drop policy if exists "profiles: usuário edita o próprio" on public.profiles;

create policy "profiles: usuário edita o próprio"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin())
  with check (
    (
      id = auth.uid()
      and role = (select role from public.profiles where id = auth.uid())
    )
    or public.is_admin()
  );

-- ============================================================
-- CRÍTICO-2: cohort_courses — corrigir tautologia na policy SELECT
-- "cm.cohort_id = cohort_id" resolvia para cm.cohort_id = cm.cohort_id
-- ============================================================
drop policy if exists "cohort_courses: leitura se membro ativo da cohort" on public.cohort_courses;

create policy "cohort_courses: leitura se membro ativo da cohort"
  on public.cohort_courses for select
  using (
    exists (
      select 1 from public.cohort_members cm
      where cm.cohort_id = cohort_courses.cohort_id
        and cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

-- ============================================================
-- CRÍTICO-3: live_sessions — corrigir tautologia na policy SELECT
-- ============================================================
drop policy if exists "live_sessions: leitura para membros ativos da cohort" on public.live_sessions;

create policy "live_sessions: leitura para membros ativos da cohort"
  on public.live_sessions for select
  using (
    exists (
      select 1 from public.cohort_members cm
      where cm.cohort_id = live_sessions.cohort_id
        and cm.user_id = auth.uid()
        and cm.status = 'ACTIVE'
    )
    or public.is_admin()
  );

-- ============================================================
-- ALTO-4: comments UPDATE — adicionar with check
-- ============================================================
drop policy if exists "comments: autor edita o próprio" on public.comments;

create policy "comments: autor edita o próprio"
  on public.comments for update
  using (author_id = auth.uid() or public.is_admin())
  with check (author_id = auth.uid() or public.is_admin());

-- ============================================================
-- ALTO-5: forum_threads UPDATE — adicionar with check
-- ============================================================
drop policy if exists "forum_threads: autor edita o próprio" on public.forum_threads;

create policy "forum_threads: autor edita o próprio"
  on public.forum_threads for update
  using (author_id = auth.uid() or public.is_admin())
  with check (author_id = auth.uid() or public.is_admin());

-- ============================================================
-- ALTO-6: forum_replies UPDATE — adicionar with check
-- ============================================================
drop policy if exists "forum_replies: autor edita o próprio" on public.forum_replies;

create policy "forum_replies: autor edita o próprio"
  on public.forum_replies for update
  using (author_id = auth.uid() or public.is_admin())
  with check (author_id = auth.uid() or public.is_admin());

-- ============================================================
-- ALTO-7: notifications UPDATE — adicionar with check
-- ============================================================
drop policy if exists "notifications: usuário marca como lida" on public.notifications;

create policy "notifications: usuário marca como lida"
  on public.notifications for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ============================================================
-- ALTO-8: lesson_progress UPDATE — adicionar with check
-- ============================================================
drop policy if exists "lesson_progress: usuário atualiza o próprio" on public.lesson_progress;

create policy "lesson_progress: usuário atualiza o próprio"
  on public.lesson_progress for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
