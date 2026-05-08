-- Migration: seed_curso_online_padrao
-- Cria course e cohort para o produto Curso Online (/curso-online)
-- Idempotente: usa ON CONFLICT DO NOTHING / DO UPDATE

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
-- Passos:
--   1. Crie o produto no Stripe: "Curso Online — Claude Agents Team"
--   2. Crie o Price: R$799,00 / one-time / BRL
--   3. Copie o Price ID (price_...) e execute:
--      UPDATE public.cohorts
--        SET stripe_price_entry_id = 'price_XXXXXXXXXXXXXXXXXXXXXXXX'
--        WHERE slug = 'curso-online-padrao';
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
  79700,
  6,
  null
)
on conflict (id) do update set
  slug                  = excluded.slug,
  name                  = excluded.name,
  description           = excluded.description,
  status                = excluded.status,
  access_duration_days  = excluded.access_duration_days,
  has_live_sessions     = excluded.has_live_sessions,
  has_support           = excluded.has_support,
  is_purchasable        = excluded.is_purchasable,
  has_public_page       = excluded.has_public_page,
  entry_price_cents     = excluded.entry_price_cents,
  max_installments_entry = excluded.max_installments_entry;

-- ============================================================
-- COHORT_COURSES: curso-online-padrao libera todos os módulos
-- ============================================================

insert into public.cohort_courses (cohort_id, course_id, included_module_ids, sort_order)
values (
  '40000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000002',
  '{}',
  1
)
on conflict (cohort_id, course_id) do nothing;
