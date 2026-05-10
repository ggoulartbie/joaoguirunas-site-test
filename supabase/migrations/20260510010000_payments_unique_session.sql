-- F9.17 — UNIQUE constraint em payments(stripe_checkout_session_id)
--
-- Decisão: Idempotência ao nível DB. Stripe pode reenviar webhooks; constraint na
-- aplicação não é suficiente porque cross-tab e race conditions tornam o check
-- existingMember insuficiente para payments. O partial index (WHERE IS NOT NULL)
-- permite múltiplas rows com session_id NULL (renovações automáticas sem checkout).
--
-- Nota: o schema original (20260506021931) já declara stripe_checkout_session_id
-- com UNIQUE, mas esse constraint global é substituído por um partial index explícito
-- aqui para garantir compatibilidade com ON CONFLICT e documentar a intenção.

do $$
declare
  v_deleted int;
begin
  -- Deduplica rows existentes: mantém o mais antigo (menor created_at) por session_id.
  -- Stripe nunca reutiliza session IDs, portanto duplicatas são sempre artefactos de
  -- reenvio de webhook, não transacções legítimas distintas.
  with ranked as (
    select id,
           row_number() over (
             partition by stripe_checkout_session_id
             order by created_at asc
           ) as rn
    from public.payments
    where stripe_checkout_session_id is not null
  ),
  to_delete as (
    delete from public.payments
    where id in (
      select id from ranked where rn > 1
    )
    returning id
  )
  select count(*) into v_deleted from to_delete;

  raise notice 'F9.17 dedupe: % duplicate payment rows removed', v_deleted;
end $$;

-- Cria partial unique index: permite múltiplos NULL (renovações automáticas),
-- bloqueia duplicatas em checkout sessions.
-- IF NOT EXISTS garante idempotência.
create unique index if not exists payments_stripe_checkout_session_id_key
  on public.payments (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;
