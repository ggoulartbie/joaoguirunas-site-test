---
title: Runbook — Checkout Stripe / Curso Online
type: runbook
updated: 2026-05-08
tags: [runbook, stripe, checkout, webhook, curso-online, payments]
related:
  - "[[stories/backlog/F9.2-auditar-checkout-stripe-curso-online]]"
  - "[[runbooks/go-live-checklist]]"
---

# Runbook — Checkout Stripe / Curso Online

## Variáveis de ambiente obrigatórias

| Variável | Onde usar | Observação |
|---|---|---|
| `STRIPE_SECRET_KEY` | Webhook, sync, checkout | `sk_live_...` em prod; `sk_test_...` em dev |
| `STRIPE_WEBHOOK_SECRET` | `/api/webhooks/stripe` | `whsec_...` — obtido no Stripe Dashboard ao registrar o endpoint |
| `NEXT_PUBLIC_APP_URL` | URLs de redirect (checkout, magic link) | Sem trailing slash. Ex: `https://joaoguirunas.com` |
| `SUPABASE_SERVICE_ROLE_KEY` | supabaseAdmin — todas operações de servidor | Nunca expor no client |
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente Supabase | URL do projeto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente Supabase | Chave pública anon |
| `RESEND_API_KEY` | Envio de emails (welcome, magic link) | Domínio deve estar verificado no Resend |
| `RESEND_FROM_EMAIL` | Remetente dos emails | Ex: `noreply@joaoguirunas.com` |

## Pendência obrigatória pós-deploy (cohort curso-online-padrao)

Antes de anunciar o curso online, executar no Supabase SQL Editor (produção):

```sql
-- 1. Criar Price no Stripe Dashboard: produto "Curso Online — Claude Agents Team", R$ 797,00 one-time, BRL
-- 2. Copiar o Price ID (price_...) e executar:
UPDATE public.cohorts
  SET stripe_price_entry_id = 'price_XXXXXXXXXXXXXXXXXXXXXXXX'
  WHERE slug = 'curso-online-padrao';

-- Confirmar:
SELECT slug, is_purchasable, stripe_price_entry_id FROM public.cohorts WHERE slug = 'curso-online-padrao';
```

## Smoke test — happy path (executar em produção com cartão de teste)

1. Acesse `/curso-online` e clique em "Comprar agora"
2. Confirme redirect para `checkout.stripe.com/...` sem erros
3. Use cartão de teste Stripe: `4242 4242 4242 4242`, data futura, CVC qualquer
4. Após pagamento, confirme redirect para `/academy/checkout/sucesso?session_id=cs_...`
5. Verifique no Supabase que foi criado:
   - `payments` com `status='APPROVED'` e `cohort_id` correto
   - `cohort_members` com `status='ACTIVE'` e `expires_at` = hoje + 180 dias
   - `auth.users` com o email do comprador (se era novo usuário)
   - `profiles` com `role='STUDENT'`
6. Confirme que o comprador recebeu email de boas-vindas com magic link
7. Use o magic link para acessar `/academy/aluno` e confirme que o curso aparece

## Reprocessar webhook em caso de falha

### Via Admin UI (preferido)

1. Acesse `/academy/admin/pagamentos`
2. Encontre o evento com `success=false`
3. Clique em "Reprocessar"

### Via Stripe Dashboard

1. Acesse Stripe Dashboard > Webhooks > seu endpoint
2. Encontre o evento `checkout.session.completed` com falha
3. Clique em "Resend" — o webhook receberá novamente
4. A idempotência garante que o evento não será duplicado (`webhook_events` table)

### Via SQL (último recurso)

```sql
-- Ver eventos com falha
SELECT id, stripe_event_id, event_type, error_message, created_at
FROM webhook_events
WHERE success = false
ORDER BY created_at DESC
LIMIT 20;

-- Se o usuário tem pagamento mas não tem cohort_member:
INSERT INTO cohort_members (cohort_id, user_id, member_role, status, expires_at)
VALUES (
  '40000000-0000-0000-0000-000000000002',  -- curso-online-padrao
  '<user_uuid>',
  'STUDENT',
  'ACTIVE',
  NOW() + INTERVAL '180 days'
);
```

## Edge cases e comportamento esperado

| Cenário | Comportamento |
|---|---|
| cohort sem `stripe_price_entry_id` | `checkoutPublic` retorna `{ error: 'Preço não configurado para esta turma.' }` — sem redirect |
| cohort `is_purchasable=false` | `checkoutPublic` retorna `{ error: 'Esta turma não está disponível para compra.' }` |
| Webhook duplicado (mesmo `stripe_event_id`) | Tabela `webhook_events` detecta e retorna `{ received: true, idempotent: true }` sem reprocessar |
| Comprador já tem conta | `findOrCreateUser` retorna o `userId` existente — não cria duplicata |
| Pagamento recusado | Stripe não dispara `checkout.session.completed` — nenhum acesso é liberado |
| Email falha no envio | Webhook continua — email failure não reverte criação de conta/acesso |

## Inconsistência de preço — pendente decisão de João

As seguintes fontes divergem entre si. **Nenhum valor foi alterado** — aguardando definição do preço oficial.

| Fonte | Valor em centavos | Equivalente BRL |
|---|---|---|
| `supabase/migrations/20260508000000_seed_curso_online_padrao.sql` | `79700` | R$ 797,00 |
| `supabase/seed.sql` (linha 511) | `79900` | R$ 799,00 |
| `docs/smart-memory/shared-context.md` (linha 64) | `49900` | R$ 499,00 |
| `src/app/curso-online/page.tsx` (metadata, JSON-LD, CTAs) | `499` / `R$ 499` | R$ 499,00 |

Após João definir o preço correto, os passos são:
1. Atualizar `entry_price_cents` na migration e/ou executar UPDATE em prod
2. Atualizar `seed.sql`
3. Atualizar `shared-context.md`
4. Atualizar `src/app/curso-online/page.tsx` (metadata, JSON-LD, CheckoutForm labels)
5. Criar o Price no Stripe com o valor correto e executar o UPDATE do `stripe_price_entry_id`

## Arquitetura do fluxo

```
/curso-online (clicar Comprar)
  → createPublicCheckoutSession (checkoutPublic.ts)
    → supabaseAdmin: valida cohort (is_purchasable, stripe_price_entry_id)
    → StripeAdapter.createCheckoutSession (priceId, cohortId, cohortSlug no metadata)
    → redirect(session.url)

Stripe processa pagamento
  → POST /api/webhooks/stripe
    → verifica assinatura STRIPE_WEBHOOK_SECRET
    → idempotência via webhook_events
    → handleCheckoutCompleted → handlePublicCheckoutCompleted
      → findOrCreateUser (email do comprador)
      → INSERT cohort_members (ACTIVE, expires_at = hoje + 180d)
      → INSERT payments (APPROVED)
      → applyCrossExtensions
      → generateMagicLink → sendWelcomeInviteEmail

Comprador clica no magic link
  → /academy/meus-cursos (autenticado)
```
