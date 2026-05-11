-- Rastreia se o usuário definiu uma senha explicitamente.
-- false = criado por convite via admin, nunca definiu senha.
-- default true preserva comportamento de usuários existentes.
alter table public.profiles
  add column if not exists has_set_password boolean not null default true;
