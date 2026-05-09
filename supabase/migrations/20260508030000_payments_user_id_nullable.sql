-- F12.3 — Allow anonymous InfinitePay purchases: user_id nullable in payments
-- For public checkouts where the buyer has no Supabase account yet.
-- The webhook resolves/creates the user and backfills user_id on APPROVED.
alter table public.payments
  alter column user_id drop not null;
