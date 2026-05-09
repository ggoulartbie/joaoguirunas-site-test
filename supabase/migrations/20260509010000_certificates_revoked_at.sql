-- Adiciona coluna revoked_at para revogação de certificados
alter table public.certificates
  add column if not exists revoked_at timestamptz;
