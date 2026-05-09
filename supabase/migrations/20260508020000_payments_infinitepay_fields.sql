-- F10.1 / F12.2 — InfinitePay integration: provider fields in cohorts + payments
-- Idempotent via IF NOT EXISTS / column existence checks

-- cohorts: which payment provider handles checkout for this cohort
alter table public.cohorts
  add column if not exists payment_provider text not null default 'STRIPE'
                                             check (payment_provider in ('STRIPE', 'INFINITEPAY'));

-- payments: record which provider was used + InfinitePay correlation IDs
alter table public.payments
  add column if not exists payment_provider       text not null default 'STRIPE'
                                                    check (payment_provider in ('STRIPE', 'INFINITEPAY')),
  add column if not exists infinitepay_order_nsu  text unique,
  add column if not exists infinitepay_invoice_slug text;

create index if not exists payments_infinitepay_order_nsu_idx
  on public.payments (infinitepay_order_nsu)
  where infinitepay_order_nsu is not null;
