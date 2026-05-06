-- Índices de performance para queries críticas do webhook e área do aluno

create index if not exists payments_stripe_subscription_id_idx
  on payments (stripe_subscription_id)
  where stripe_subscription_id is not null;

create index if not exists payments_user_id_created_at_idx
  on payments (user_id, created_at desc);

create index if not exists cohort_members_user_id_status_idx
  on cohort_members (user_id, status);

-- Função atômica para incrementar filled_seats sem race condition
create or replace function public.increment_filled_seats(p_cohort_id uuid)
returns void
language sql
security definer
as $$
  update cohorts set filled_seats = filled_seats + 1 where id = p_cohort_id;
$$;
