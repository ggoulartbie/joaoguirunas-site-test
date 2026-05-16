-- Senha temporária paralela para fluxo "Esqueci minha senha".
-- A senha real do usuário (auth.users.encrypted_password) continua válida durante a janela —
-- a senha temp coexiste com expiry curto, evitando DoS (atacante não consegue forçar troca da senha real).
-- Quando o usuário loga com a senha temp, ela é promovida a senha real, marca has_set_password=false
-- (middleware força redefinir senha) e os campos abaixo são limpos.

alter table public.profiles
  add column if not exists temp_password_hash text,
  add column if not exists temp_password_expires_at timestamptz,
  add column if not exists temp_password_requested_at timestamptz;

comment on column public.profiles.temp_password_hash is
  'bcrypt hash da senha temporária — preenchido durante recovery, limpo após uso ou expiry';
comment on column public.profiles.temp_password_expires_at is
  'Quando a senha temporária expira (recomendado: now + 1h)';
comment on column public.profiles.temp_password_requested_at is
  'Quando o último reset foi solicitado — usado para rate limit (1 req/min por email)';

-- Index para limpeza oportunística (opcional, mas barato)
create index if not exists profiles_temp_password_expires_at_idx
  on public.profiles (temp_password_expires_at)
  where temp_password_hash is not null;
