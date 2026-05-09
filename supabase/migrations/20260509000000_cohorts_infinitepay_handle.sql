-- Armazena o handle InfinitePay (InfiniteTag) por turma, eliminando a env var INFINITEPAY_HANDLE
alter table public.cohorts
  add column if not exists infinitepay_handle text;
