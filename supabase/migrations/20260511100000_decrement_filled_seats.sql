-- Função atômica para decrementar filled_seats sem race condition
-- Espelho de increment_filled_seats; floor em 0 para evitar negativo
create or replace function public.decrement_filled_seats(p_cohort_id uuid)
returns void
language sql
security definer
as $$
  update cohorts
  set filled_seats = greatest(filled_seats - 1, 0)
  where id = p_cohort_id;
$$;
