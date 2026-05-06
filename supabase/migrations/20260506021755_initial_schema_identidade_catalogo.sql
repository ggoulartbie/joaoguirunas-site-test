-- Migration: initial_schema_identidade_catalogo
-- Tabelas: profiles, courses, modules, lessons, materials
-- Triggers: set_updated_at, handle_new_user

-- ============================================================
-- Trigger function: set_updated_at
-- Aplicada em todas as tabelas com coluna updated_at
-- ============================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================
-- IDENTIDADE
-- ============================================================

-- profiles: espelho de auth.users
create table public.profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  name            text not null,
  avatar_url      text,
  bio             text,
  role            text not null default 'STUDENT'
                    check (role in ('STUDENT', 'MENTOR', 'SUPPORT', 'ADMIN')),
  stripe_customer_id text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Cria profile automaticamente quando usuário é criado em auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    'STUDENT'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- CATÁLOGO
-- ============================================================

-- courses: catálogo puro de conteúdo
create table public.courses (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  description     text,
  cover_image_url text,
  sort_order      int not null default 0,
  published       boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  deleted_at      timestamptz
);

create trigger set_updated_at
  before update on public.courses
  for each row execute function public.set_updated_at();

-- modules: agrupadores dentro de um course
create table public.modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references public.courses(id) on delete cascade,
  slug        text not null,
  title       text not null,
  description text,
  sort_order  int not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  deleted_at  timestamptz,

  unique (course_id, slug)
);

create trigger set_updated_at
  before update on public.modules
  for each row execute function public.set_updated_at();

-- lessons: unidade de conteúdo dentro de um module
create table public.lessons (
  id               uuid primary key default gen_random_uuid(),
  module_id        uuid not null references public.modules(id) on delete cascade,
  slug             text not null,
  title            text not null,
  description      text,
  sort_order       int not null,
  kind             text not null
                     check (kind in ('VIDEO', 'LIVE', 'IN_PERSON', 'CODE', 'READING')),
  video_provider   text
                     check (video_provider in ('VIMEO', 'YOUTUBE', 'CLOUDFLARE_STREAM')),
  video_id         text,
  duration_seconds int,
  content_format   text
                     check (content_format in ('MDX', 'HTML', 'MARKDOWN')),
  content          text,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  deleted_at       timestamptz,

  unique (module_id, slug)
);

create trigger set_updated_at
  before update on public.lessons
  for each row execute function public.set_updated_at();

-- materials: arquivos e links vinculados a uma lesson
create table public.materials (
  id            uuid primary key default gen_random_uuid(),
  lesson_id     uuid not null references public.lessons(id) on delete cascade,
  title         text not null,
  kind          text not null
                  check (kind in ('PDF', 'ZIP', 'IMAGE', 'LINK', 'OTHER')),
  storage_path  text,
  external_url  text,
  size_bytes    bigint,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);
-- materials não tem updated_at: imutável após upload

-- ============================================================
-- ÍNDICES de suporte
-- ============================================================
create index on public.courses (published, deleted_at);
create index on public.modules (course_id, sort_order);
create index on public.lessons (module_id, sort_order);
create index on public.materials (lesson_id, sort_order);
