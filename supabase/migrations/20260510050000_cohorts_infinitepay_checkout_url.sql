-- Armazena a URL de checkout estático InfinitePay por turma
-- Quando preenchida, o fluxo de checkout redireciona diretamente para este link
-- em vez de usar a API de criação de pagamento InfinitePay
alter table public.cohorts
  add column if not exists infinitepay_checkout_url text;
