-- Migration: seed_mentoria_curso
-- Remove dados demo e insere estrutura real do curso
-- "Mentoria Claude Code + AIOX — Agentes IA na Prática"
-- Idempotente: pode ser reaplicada sem efeito colateral

-- ============================================================
-- CLEANUP — remover dados demo antigos
-- Ordem: do mais dependente para o menos dependente
-- ============================================================

delete from public.cohort_members
where cohort_id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.live_sessions
where cohort_id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.cohort_cross_extensions
where source_cohort_id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
)
or target_cohort_id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.cohort_courses
where cohort_id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.cohorts
where id in (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000002'
);

delete from public.lessons
where module_id in (
  '20000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000006'
);

delete from public.modules
where course_id = '10000000-0000-0000-0000-000000000001';

delete from public.courses
where id = '10000000-0000-0000-0000-000000000001';

-- ============================================================
-- COURSE: mentoria-claude-code-aiox
-- ============================================================

insert into public.courses (id, slug, title, description, published, sort_order)
values (
  '10000000-0000-0000-0000-000000000001',
  'mentoria-claude-code-aiox',
  'Mentoria Claude Code + AIOX — Agentes IA na Prática',
  'Mentoria intensiva e prática para criar, configurar e orquestrar agentes de IA autônomos com Claude Code e o framework AIOX. Turmas de no máximo 12 pessoas.',
  true,
  1
)
on conflict (id) do nothing;

-- ============================================================
-- MODULES (6 módulos)
-- ============================================================

insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'dia-presencial',
  'Dia Presencial — 12 de Maio',
  1
)
on conflict (id) do nothing;

insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'semana-1',
  'Semana 1 — Claude Design',
  2
)
on conflict (id) do nothing;

insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'semana-2',
  'Semana 2 — Squad de Sites',
  3
)
on conflict (id) do nothing;

insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000001',
  'semana-3',
  'Semana 3 — Squad de Social Media',
  4
)
on conflict (id) do nothing;

insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000001',
  'semana-4',
  'Semana 4 — Squad de Dev',
  5
)
on conflict (id) do nothing;

insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000001',
  'bonus-online',
  'Bônus Online',
  6
)
on conflict (id) do nothing;

-- ============================================================
-- LESSONS
-- ============================================================

-- Módulo 1: Dia Presencial (5 aulas)
insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'abertura-desbloqueio',
  'Abertura — Desbloqueio e Crenças Limitantes',
  0,
  'IN_PERSON'
)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  'o-que-e-possivel',
  'O que é possível',
  1,
  'IN_PERSON'
)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000001',
  'fundamentos-claude-code',
  'Fundamentos do Claude Code',
  2,
  'IN_PERSON'
)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000001',
  'setup-instalacao',
  'Setup e Instalação',
  3,
  'IN_PERSON'
)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000001',
  'centro-treinamento-agentes',
  'Centro de Treinamento de Agentes',
  4,
  'IN_PERSON'
)
on conflict (id) do nothing;

-- Módulo 2: Semana 1 (1 aula)
insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000002',
  'claude-design-system',
  'Claude Design — Design System',
  5,
  'VIDEO'
)
on conflict (id) do nothing;

-- Módulo 3: Semana 2 (1 aula)
insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000003',
  'squad-sites-github-vercel',
  'Squad de Sites — Github e Vercel',
  6,
  'VIDEO'
)
on conflict (id) do nothing;

-- Módulo 4: Semana 3 (1 aula)
insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000004',
  'squad-social-media',
  'Squad de Social Media',
  7,
  'VIDEO'
)
on conflict (id) do nothing;

-- Módulo 5: Semana 4 (1 aula)
insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000009',
  '20000000-0000-0000-0000-000000000005',
  'squad-dev-supabase',
  'Squad de Dev — Supabase',
  10,
  'VIDEO'
)
on conflict (id) do nothing;

-- Módulo 6: Bônus Online (2 aulas + encerramento)
insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000010',
  '20000000-0000-0000-0000-000000000006',
  'orquestrador-comercial',
  'Orquestrador Comercial — Aula + Código Pronto',
  12,
  'VIDEO'
)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000011',
  '20000000-0000-0000-0000-000000000006',
  'gestao-projetos',
  'Gestão de Projetos — Aula + Código Pronto',
  13,
  'VIDEO'
)
on conflict (id) do nothing;

insert into public.lessons (id, module_id, slug, title, sort_order, kind)
values (
  '30000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000006',
  'apresentacao-projetos-encerramento',
  'Apresentação de Projetos + Encerramento',
  14,
  'LIVE'
)
on conflict (id) do nothing;

-- ============================================================
-- COHORT: Turma 1
-- ============================================================

insert into public.cohorts (
  id, slug, name, description,
  status, start_date, end_date,
  total_seats, access_duration_days,
  has_live_sessions, has_support,
  is_purchasable, has_public_page,
  entry_price_cents, max_installments_entry
)
values (
  '40000000-0000-0000-0000-000000000001',
  'turma-1',
  'Turma 1 — Mentoria Claude Code + AIOX',
  'Primeira turma da mentoria intensiva. 1 dia presencial em Florianópolis (12 de maio) + 4 semanas de aulas em vídeo + encontros ao vivo.',
  'OPEN',
  '2026-05-12',
  '2026-06-09',
  12,
  180,
  true,
  true,
  true,
  true,
  870000,
  12
)
on conflict (id) do nothing;

-- ============================================================
-- COHORT_COURSES
-- ============================================================

insert into public.cohort_courses (cohort_id, course_id, included_module_ids, sort_order)
values (
  '40000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '{}',
  1
)
on conflict (cohort_id, course_id) do nothing;

-- ============================================================
-- LIVE SESSIONS (7 encontros — 22:00 UTC = 19h Brasília)
-- ============================================================

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas — Semana 1',
  '2026-05-14 22:00:00+00',
  90
)
on conflict (id) do nothing;

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000002',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 1 — Semana 2',
  '2026-05-19 22:00:00+00',
  90
)
on conflict (id) do nothing;

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000003',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 2 — Semana 2',
  '2026-05-21 22:00:00+00',
  90
)
on conflict (id) do nothing;

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000004',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas — Semana 3',
  '2026-05-26 22:00:00+00',
  90
)
on conflict (id) do nothing;

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000005',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 1 — Semana 4',
  '2026-06-02 22:00:00+00',
  90
)
on conflict (id) do nothing;

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000006',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 2 — Semana 4',
  '2026-06-04 22:00:00+00',
  90
)
on conflict (id) do nothing;

insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000007',
  '40000000-0000-0000-0000-000000000001',
  'Apresentação de Projetos + Encerramento',
  '2026-06-09 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- ============================================================
-- PROFILE ADMIN — garantir role correto
-- ============================================================

update public.profiles
set role = 'ADMIN'
where id = '00000000-0000-0000-0000-000000000001';
