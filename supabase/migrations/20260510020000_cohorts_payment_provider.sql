-- F12.2 — cohorts.payment_provider + cohorts.infinitepay_handle
--
-- As colunas já foram adicionadas em migrations anteriores:
--   20260508020000: payment_provider (NOT NULL DEFAULT 'STRIPE' CHECK IN ('STRIPE','INFINITEPAY'))
--   20260509000000: infinitepay_handle (TEXT NULL)
--
-- Esta migration é idempotente e serve como checkpoint formal da F12.2:
-- valida que o schema está correto, aplica backfill explícito e registra
-- a decisão de produto (provider por cohort, default Stripe, InfinitePay opt-in).

-- Idempotente: ADD COLUMN IF NOT EXISTS é no-op se coluna já existe.
alter table public.cohorts
  add column if not exists payment_provider text not null default 'STRIPE'
    check (payment_provider in ('STRIPE', 'INFINITEPAY'));

alter table public.cohorts
  add column if not exists infinitepay_handle text null;

-- Backfill explícito: garante que cohorts criadas antes da migration
-- 20260508020000 tenham payment_provider='STRIPE'.
-- O DEFAULT já cobre novas rows; este UPDATE cobre rows históricas com NULL.
update public.cohorts
set payment_provider = 'STRIPE'
where payment_provider is null;

-- Smoke test inline: nenhuma cohort deve ter payment_provider NULL após backfill.
do $$
declare
  v_nulls int;
begin
  select count(*) into v_nulls
  from public.cohorts
  where payment_provider is null;

  if v_nulls > 0 then
    raise exception 'F12.2 smoke-test failed: % cohorts com payment_provider NULL', v_nulls;
  end if;

  raise notice 'F12.2 smoke-test passed: todas as cohorts têm payment_provider definido';
end $$;
