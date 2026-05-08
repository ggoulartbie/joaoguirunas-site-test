-- Fix: garantir que curso-online-padrao está is_purchasable=true
-- A migration anterior (20260508000000) conflitava em ID; esta conflita em SLUG.

INSERT INTO public.cohorts (
  slug, name, description,
  status, total_seats, access_duration_days,
  has_live_sessions, has_support,
  is_purchasable, has_public_page,
  entry_price_cents, max_installments_entry,
  stripe_price_entry_id
)
VALUES (
  'curso-online-padrao',
  'Curso Online — Claude Agents Team',
  'Acesso por 6 meses ao conteúdo em vídeo, materiais, fórum e certificado.',
  'OPEN', null, 180,
  false, false,
  true, true,
  79700, 6,
  null
)
ON CONFLICT (slug) DO UPDATE SET
  is_purchasable         = true,
  status                 = 'OPEN',
  access_duration_days   = 180,
  entry_price_cents      = 79700,
  max_installments_entry = 6;
