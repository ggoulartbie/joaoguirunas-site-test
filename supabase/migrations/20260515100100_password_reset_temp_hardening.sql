-- Hardening do fluxo de senha temporária:
-- 1) RPCs SECURITY DEFINER pra buscar user por email (substitui listUsers paginado — O(1) ao invés de O(N))
-- 2) REVOKE SELECT nas colunas temp para roles não-privilegiadas (evita leakage do hash via client)

-- Busca user_id por email (case insensitive). Retorna NULL se não existir.
create or replace function public.auth_get_user_id_by_email(p_email text)
returns uuid
language sql
security definer
set search_path = public
as $$
  select u.id
  from auth.users u
  where lower(u.email) = lower(p_email)
  limit 1;
$$;

revoke all on function public.auth_get_user_id_by_email(text) from public, anon, authenticated;
grant execute on function public.auth_get_user_id_by_email(text) to service_role;

comment on function public.auth_get_user_id_by_email is
  'Resolve email → user_id via auth.users (indexed). Service role apenas. Substitui listUsers paginado.';

-- Busca user + temp_password info por email para fluxo de redeem.
-- Retorna apenas se há senha temp pendente (não expirada).
create or replace function public.auth_get_user_with_temp_password_by_email(p_email text)
returns table (
  user_id uuid,
  temp_hash text,
  temp_expires_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select u.id, p.temp_password_hash, p.temp_password_expires_at
  from auth.users u
  join public.profiles p on p.id = u.id
  where lower(u.email) = lower(p_email)
    and p.temp_password_hash is not null;
$$;

revoke all on function public.auth_get_user_with_temp_password_by_email(text) from public, anon, authenticated;
grant execute on function public.auth_get_user_with_temp_password_by_email(text) to service_role;

comment on function public.auth_get_user_with_temp_password_by_email is
  'Resolve email → user_id + temp hash em uma query. Service role apenas.';

-- Bloqueia leitura das colunas temp por roles não-privilegiadas via supabase client.
-- service_role (server admin) continua tendo acesso total.
revoke select (temp_password_hash, temp_password_expires_at, temp_password_requested_at)
  on public.profiles
  from anon, authenticated;
