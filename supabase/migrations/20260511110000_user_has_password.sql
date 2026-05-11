-- Verifica diretamente se o usuário tem senha definida em auth.users.
-- Mais confiável que app_metadata, que pode não ser aplicado em todas as versões do SDK.
create or replace function public.user_has_password(p_user_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select encrypted_password is not null and encrypted_password != ''
  from auth.users
  where id = p_user_id;
$$;
