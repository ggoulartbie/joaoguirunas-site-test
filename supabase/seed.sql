-- seed.sql — Mentoria Claude Code + AIOX (Turma 1)
-- Roda como service_role (bypassa RLS)
-- IDs fixos para facilitar reset/replay
-- Idempotente via ON CONFLICT / DELETE+INSERT

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
where course_id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002'
);

delete from public.courses
where id in (
  '10000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002'
);

-- ============================================================
-- AUTH USERS
-- Inserção direta em auth.users (service_role apenas)
-- handle_new_user trigger cria profiles automaticamente
-- Senhas em bcrypt — placeholder para dev (senha: Test1234!)
-- ============================================================

insert into auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_user_meta_data,
  role,
  aud,
  created_at,
  updated_at
)
values
  (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'joaoguirunasramos@gmail.com',
    crypt('Test1234!', gen_salt('bf')),
    now(),
    '{"name": "João Guirunas"}'::jsonb,
    'authenticated',
    'authenticated',
    now(),
    now()
  )
on conflict (id) do nothing;

-- ============================================================
-- PROFILES
-- handle_new_user cria com role='STUDENT' por padrão.
-- Atualizar role do admin após insert.
-- ============================================================

insert into public.profiles (id, name, role)
values
  ('00000000-0000-0000-0000-000000000001', 'João Guirunas', 'ADMIN')
on conflict (id) do update set
  name = excluded.name,
  role = excluded.role;

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

-- Módulo 1: Dia Presencial
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'dia-presencial',
  'Dia Presencial — 12 de Maio',
  1
)
on conflict (id) do nothing;

-- Módulo 2: Semana 1
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'semana-1',
  'Semana 1 — Claude Design',
  2
)
on conflict (id) do nothing;

-- Módulo 3: Semana 2
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'semana-2',
  'Semana 2 — Squad de Sites',
  3
)
on conflict (id) do nothing;

-- Módulo 4: Semana 3
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000001',
  'semana-3',
  'Semana 3 — Squad de Social Media',
  4
)
on conflict (id) do nothing;

-- Módulo 5: Semana 4
insert into public.modules (id, course_id, slug, title, sort_order)
values (
  '20000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000001',
  'semana-4',
  'Semana 4 — Squad de Dev',
  5
)
on conflict (id) do nothing;

-- Módulo 6: Bônus Online
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
-- Módulo 1: 5 aulas (sort_order 0..4)
-- ============================================================

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

-- Módulo 2: Semana 1 — 1 aula
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

-- Módulo 3: Semana 2 — 1 aula
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

-- Módulo 4: Semana 3 — 1 aula
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

-- Módulo 5: Semana 4 — 1 aula
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

-- Módulo 6: Bônus Online — 2 aulas
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

-- Lesson extra: Apresentação de Projetos + Encerramento (num 14, no módulo Bônus Online)
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
-- COHORT_COURSES: Turma 1 libera todos os módulos do curso
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
-- LIVE SESSIONS (7 encontros — horário UTC, 22:00 = 19h Brasília)
-- ============================================================

-- 1. Semana 1 — único encontro
insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas — Semana 1',
  '2026-05-14 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- 2. Semana 2 — encontro 1
insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000002',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 1 — Semana 2',
  '2026-05-19 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- 3. Semana 2 — encontro 2
insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000003',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 2 — Semana 2',
  '2026-05-21 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- 4. Semana 3 — único encontro
insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000004',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas — Semana 3',
  '2026-05-26 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- 5. Semana 4 — encontro 1
insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000005',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 1 — Semana 4',
  '2026-06-02 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- 6. Semana 4 — encontro 2
insert into public.live_sessions (id, cohort_id, title, scheduled_at, duration_minutes)
values (
  '50000000-0000-0000-0000-000000000006',
  '40000000-0000-0000-0000-000000000001',
  'Encontro de Dúvidas 2 — Semana 4',
  '2026-06-04 22:00:00+00',
  90
)
on conflict (id) do nothing;

-- 7. Encerramento
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
-- COURSE: curso-online-claude-agents
-- Produto distinto da mentoria presencial
-- ============================================================

insert into public.courses (id, slug, title, description, published, sort_order)
values (
  '10000000-0000-0000-0000-000000000002',
  'curso-online-claude-agents',
  'Curso Online — Claude Agents Team',
  'Acesso por 6 meses ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
  true,
  2
)
on conflict (id) do nothing;

-- ============================================================
-- COHORT: curso-online-padrao
--
-- ATENÇÃO: stripe_price_entry_id deve ser preenchido com o
-- Price ID real do Stripe Dashboard antes de ir para produção.
-- ============================================================

insert into public.cohorts (
  id, slug, name, description,
  status,
  total_seats, access_duration_days,
  has_live_sessions, has_support,
  is_purchasable, has_public_page,
  entry_price_cents, max_installments_entry,
  stripe_price_entry_id
)
values (
  '40000000-0000-0000-0000-000000000002',
  'curso-online-padrao',
  'Curso Online — Claude Agents Team',
  'Acesso por 6 meses ao conteúdo em vídeo, materiais, fórum e certificado. Aprenda a criar e orquestrar agentes de IA com Claude Code no seu próprio ritmo.',
  'OPEN',
  null,
  180,
  false,
  false,
  true,
  true,
  79900,
  6,
  null
)
on conflict (id) do update set
  slug                   = excluded.slug,
  name                   = excluded.name,
  description            = excluded.description,
  status                 = excluded.status,
  access_duration_days   = excluded.access_duration_days,
  is_purchasable         = excluded.is_purchasable,
  has_public_page        = excluded.has_public_page,
  entry_price_cents      = excluded.entry_price_cents,
  max_installments_entry = excluded.max_installments_entry;

insert into public.cohort_courses (cohort_id, course_id, included_module_ids, sort_order)
values (
  '40000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000002',
  '{}',
  1
)
on conflict (cohort_id, course_id) do nothing;

-- ============================================================
-- FORUM CATEGORIES
-- ============================================================

insert into public.forum_categories (id, slug, name, description, sort_order, color, is_active)
values
  ('70000000-0000-0000-0000-000000000001', 'duvidas-tecnicas', 'Dúvidas Técnicas', 'Perguntas sobre código, ferramentas e implementação.', 1, '#3B82F6', true),
  ('70000000-0000-0000-0000-000000000002', 'geral',            'Geral',             'Discussões gerais, apresentações e off-topic.',         2, '#10B981', true),
  ('70000000-0000-0000-0000-000000000003', 'networking',       'Networking',        'Conecte-se com outros alunos e mentores.',              3, '#8B5CF6', true)
on conflict (id) do nothing;

-- ============================================================
-- SMOKE TESTS (rodar no Studio após seed)
-- ============================================================
-- Verificar course criado:
-- select id, slug, title from public.courses where id = '10000000-0000-0000-0000-000000000001';
--
-- Verificar 6 módulos:
-- select count(*) from public.modules where course_id = '10000000-0000-0000-0000-000000000001'; -- esperado: 6
--
-- Verificar 13 lessons (5+1+1+1+1+2+1+1 = 13 total no seed, 12 lições + 1 encerramento):
-- select count(*) from public.lessons l join public.modules m on m.id = l.module_id
--   where m.course_id = '10000000-0000-0000-0000-000000000001'; -- esperado: 13
--
-- Verificar cohort Turma 1:
-- select slug, status, total_seats, entry_price_cents from public.cohorts
--   where id = '40000000-0000-0000-0000-000000000001';
--
-- Verificar 7 live_sessions:
-- select count(*) from public.live_sessions
--   where cohort_id = '40000000-0000-0000-0000-000000000001'; -- esperado: 7
--
-- Verificar admin:
-- select id, name, role from public.profiles
--   where id = '00000000-0000-0000-0000-000000000001'; -- esperado: ADMIN
