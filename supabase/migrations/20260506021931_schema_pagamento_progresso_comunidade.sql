-- Migration: schema_pagamento_progresso_comunidade
-- Tabelas: coupons, payments, webhook_events, lesson_progress, certificates,
--          comments, forum_categories, forum_threads, forum_replies, votes, notifications

-- ============================================================
-- PAGAMENTO
-- ============================================================

-- coupons: criados antes de payments por causa da FK
create table public.coupons (
  id              uuid primary key default gen_random_uuid(),
  cohort_id       uuid not null references public.cohorts(id) on delete cascade,
  code            text not null,
  discount_kind   text not null check (discount_kind in ('PERCENT', 'FIXED')),
  discount_value  int not null,   -- 0-100 se PERCENT, centavos se FIXED
  applies_to      text not null check (applies_to in ('ENTRY', 'EXTENSION', 'BOTH')),
  valid_from      timestamptz,
  valid_until     timestamptz,
  max_uses        int,            -- null = ilimitado
  current_uses    int not null default 0,
  is_active       boolean not null default true,
  stripe_coupon_id text,
  created_at      timestamptz not null default now(),

  unique (cohort_id, code)
);

create index on public.coupons (cohort_id, is_active);

-- payments: registro de cada transação
create table public.payments (
  id                          uuid primary key default gen_random_uuid(),
  user_id                     uuid not null references public.profiles(id),
  cohort_id                   uuid not null references public.cohorts(id),
  purchase_kind               text not null
                                check (purchase_kind in ('ENTRY', 'EXTENSION', 'AUTO_RENEWAL')),
  membership_id               uuid references public.cohort_members(id),  -- preenchido após sucesso

  stripe_checkout_session_id  text unique,
  stripe_payment_intent_id    text,
  stripe_subscription_id      text,  -- apenas renovação automática

  amount_cents                int not null,
  coupon_id                   uuid references public.coupons(id),
  status                      text not null default 'PENDING'
                                check (status in ('PENDING', 'APPROVED', 'DECLINED', 'REFUNDED')),
  payment_method              text,  -- 'card', 'boleto', 'pix'

  created_at                  timestamptz not null default now(),
  paid_at                     timestamptz
);

create index on public.payments (user_id, status);
create index on public.payments (cohort_id, status);
create index on public.payments (stripe_checkout_session_id) where stripe_checkout_session_id is not null;

-- webhook_events: idempotência Stripe — UNIQUE em stripe_event_id é load-bearing
create table public.webhook_events (
  id               uuid primary key default gen_random_uuid(),
  stripe_event_id  text unique not null,
  event_type       text not null,
  processed_at     timestamptz not null default now(),
  payload          jsonb,
  success          boolean not null default true,
  error_message    text
);

create index on public.webhook_events (stripe_event_id);
create index on public.webhook_events (processed_at desc);

-- ============================================================
-- PROGRESSO E CERTIFICADOS
-- ============================================================

-- lesson_progress: rastreia progresso do aluno por aula
create table public.lesson_progress (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.profiles(id) on delete cascade,
  lesson_id     uuid not null references public.lessons(id) on delete cascade,
  seconds_watched int not null default 0,
  completed     boolean not null default false,
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),

  unique (user_id, lesson_id)
);

create trigger set_updated_at
  before update on public.lesson_progress
  for each row execute function public.set_updated_at();

create index on public.lesson_progress (user_id, completed);
create index on public.lesson_progress (lesson_id, completed);

-- certificates: emitidos após 100% de conclusão do course
create table public.certificates (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles(id),
  course_id           uuid not null references public.courses(id),
  cohort_id           uuid not null references public.cohorts(id),
  membership_id       uuid references public.cohort_members(id),
  verification_code   text unique not null,   -- ex: "AIOX-2026-X7K9P2"
  issued_at           timestamptz not null default now(),
  pdf_storage_path    text
);

create index on public.certificates (user_id);
create index on public.certificates (verification_code);

-- ============================================================
-- COMUNIDADE — COMMENTS
-- ============================================================

-- comments: threads de 1 nível em aulas (sem soft delete em nível de tabela, usa deleted_at)
create table public.comments (
  id                uuid primary key default gen_random_uuid(),
  lesson_id         uuid not null references public.lessons(id) on delete cascade,
  author_id         uuid not null references public.profiles(id),
  parent_comment_id uuid references public.comments(id) on delete cascade,  -- 1 nível de profundidade
  content           text not null,
  is_pinned         boolean not null default false,
  deleted_at        timestamptz,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger set_updated_at
  before update on public.comments
  for each row execute function public.set_updated_at();

create index on public.comments (lesson_id, created_at desc) where deleted_at is null;
create index on public.comments (parent_comment_id) where parent_comment_id is not null;

-- ============================================================
-- FÓRUM
-- ============================================================

-- forum_categories: categorias do fórum geral
create table public.forum_categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  sort_order  int not null default 0,
  color       text,
  is_active   boolean not null default true
);

-- forum_threads: tópicos do fórum
create table public.forum_threads (
  id               uuid primary key default gen_random_uuid(),
  category_id      uuid not null references public.forum_categories(id),
  author_id        uuid not null references public.profiles(id),
  title            text not null,
  slug             text unique not null,
  content          text not null,
  is_pinned        boolean not null default false,
  is_resolved      boolean not null default false,
  view_count       int not null default 0,
  deleted_at       timestamptz,
  created_at       timestamptz not null default now(),
  last_activity_at timestamptz not null default now()
);

create index on public.forum_threads (category_id, last_activity_at desc) where deleted_at is null;
create index on public.forum_threads (author_id);

-- forum_replies: respostas em threads (1 nível de aninhamento)
create table public.forum_replies (
  id                  uuid primary key default gen_random_uuid(),
  thread_id           uuid not null references public.forum_threads(id) on delete cascade,
  author_id           uuid not null references public.profiles(id),
  parent_reply_id     uuid references public.forum_replies(id) on delete cascade,
  content             text not null,
  is_accepted_answer  boolean not null default false,
  deleted_at          timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create trigger set_updated_at
  before update on public.forum_replies
  for each row execute function public.set_updated_at();

create index on public.forum_replies (thread_id, created_at asc) where deleted_at is null;

-- votes: upvotes em threads ou replies (nunca nos dois ao mesmo tempo)
create table public.votes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id),
  thread_id  uuid references public.forum_threads(id) on delete cascade,
  reply_id   uuid references public.forum_replies(id) on delete cascade,
  created_at timestamptz not null default now(),

  -- Exatamente um dos dois deve ser não-nulo
  constraint votes_target_check check (
    (thread_id is not null and reply_id is null) or
    (thread_id is null and reply_id is not null)
  ),
  unique (user_id, thread_id),
  unique (user_id, reply_id)
);

create index on public.votes (thread_id) where thread_id is not null;
create index on public.votes (reply_id) where reply_id is not null;

-- ============================================================
-- AUXILIARES
-- ============================================================

-- notifications: notificações in-app por usuário
create table public.notifications (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references public.profiles(id) on delete cascade,
  notification_type   text not null,
  title               text not null,
  message             text,
  action_url          text,
  read_at             timestamptz,
  created_at          timestamptz not null default now()
);

create index on public.notifications (user_id, read_at) where read_at is null;
create index on public.notifications (user_id, created_at desc);
