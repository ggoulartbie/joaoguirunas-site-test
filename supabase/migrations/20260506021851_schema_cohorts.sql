-- Migration: schema_cohorts
-- Tabelas: cohorts, cohort_courses, cohort_cross_extensions, cohort_members, live_sessions

-- ============================================================
-- cohorts: unidade central comercial + de acesso
-- ============================================================
create table public.cohorts (
  id                            uuid primary key default gen_random_uuid(),
  slug                          text unique not null,
  name                          text not null,
  description                   text,
  cover_image_url               text,

  -- Status e datas
  status                        text not null default 'DRAFT'
                                  check (status in ('DRAFT', 'OPEN', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED')),
  start_date                    date,
  end_date                      date,

  -- Vagas (null = ilimitado)
  total_seats                   int,
  filled_seats                  int not null default 0,

  -- Acesso
  access_duration_days          int,           -- null = vitalício
  group_url                     text,
  has_live_sessions             boolean not null default false,
  has_support                   boolean not null default false,

  -- Comercial
  is_purchasable                boolean not null default false,
  has_public_page               boolean not null default false,
  entry_price_cents             int,
  extension_price_cents         int,
  max_installments_entry        int not null default 1,
  max_installments_extension    int not null default 1,
  extension_duration_days       int,
  allows_auto_renewal           boolean not null default false,

  -- Stripe (preenchidos quando is_purchasable = true)
  stripe_price_entry_id         text,
  stripe_price_extension_id     text,

  created_at                    timestamptz not null default now(),
  updated_at                    timestamptz not null default now()
);

create trigger set_updated_at
  before update on public.cohorts
  for each row execute function public.set_updated_at();

create index on public.cohorts (status, is_purchasable);
create index on public.cohorts (has_public_page) where has_public_page = true;

-- ============================================================
-- cohort_courses: quais cursos (e módulos) cada cohort libera
-- ============================================================
create table public.cohort_courses (
  cohort_id           uuid not null references public.cohorts(id) on delete cascade,
  course_id           uuid not null references public.courses(id) on delete cascade,
  included_module_ids uuid[] not null default '{}',  -- vazio = todos os módulos
  sort_order          int not null default 0,

  primary key (cohort_id, course_id)
);

create index on public.cohort_courses (course_id);

-- ============================================================
-- cohort_cross_extensions: comprar cohort A estende cohort B
-- ============================================================
create table public.cohort_cross_extensions (
  id                uuid primary key default gen_random_uuid(),
  source_cohort_id  uuid not null references public.cohorts(id) on delete cascade,
  target_cohort_id  uuid not null references public.cohorts(id) on delete cascade,
  days_granted      int not null,
  is_active         boolean not null default true,
  description       text,
  created_at        timestamptz not null default now(),

  unique (source_cohort_id, target_cohort_id)
);

-- ============================================================
-- cohort_members: matrículas (aluno em uma turma)
-- ============================================================
create table public.cohort_members (
  id                uuid primary key default gen_random_uuid(),
  cohort_id         uuid not null references public.cohorts(id) on delete cascade,
  user_id           uuid not null references public.profiles(id) on delete cascade,
  member_role       text not null default 'STUDENT'
                      check (member_role in ('STUDENT', 'MONITOR', 'MENTOR')),
  joined_at         timestamptz not null default now(),
  expires_at        timestamptz,              -- null = vitalício
  status            text not null default 'ACTIVE'
                      check (status in ('ACTIVE', 'EXPIRED', 'REMOVED', 'PAST_DUE')),
  auto_renew_enabled  boolean not null default false,
  next_renewal_at   timestamptz,

  unique (cohort_id, user_id)
);

-- Índices críticos para has_access() — consultados a cada render de lesson
create index on public.cohort_members (user_id);
create index on public.cohort_members (user_id, status);
create index on public.cohort_members (status, expires_at);
create index on public.cohort_members (cohort_id, status);

-- ============================================================
-- live_sessions: encontros ao vivo vinculados a uma cohort
-- ============================================================
create table public.live_sessions (
  id               uuid primary key default gen_random_uuid(),
  cohort_id        uuid not null references public.cohorts(id) on delete cascade,
  title            text not null,
  description      text,
  scheduled_at     timestamptz not null,
  duration_minutes int not null default 90,
  meeting_url      text,        -- liberado server-side só 30min antes
  recording_url    text,        -- preenchido após o encontro
  lesson_id        uuid references public.lessons(id) on delete set null, -- quando virar aula gravada
  created_at       timestamptz not null default now()
);

create index on public.live_sessions (cohort_id, scheduled_at);
create index on public.live_sessions (scheduled_at) where recording_url is null;
