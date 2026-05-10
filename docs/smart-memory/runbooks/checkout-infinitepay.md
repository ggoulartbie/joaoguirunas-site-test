---
title: "Runbook: Checkout InfinitePay"
type: runbook
created: 2026-05-10
tags: [runbook, infinitepay, payment, webhook]
---

# Checkout InfinitePay — Runbook

## Env vars necessárias

| Variável | Descrição |
|---|---|
| `INFINITEPAY_HANDLE` | Slug da conta InfinitePay (ex: `growthsales`) |
| `INFINITEPAY_BEARER_TOKEN` | Token de autorização para `/links` e `/payment_check` |

## Fluxo completo

1. Checkout cria linha `payments` com `status=PENDING` e `infinitepay_order_nsu=<uuid>` via `checkoutPublic.ts`
2. Adapter `InfinitePayAdapter.createCheckoutLink()` faz `POST /links` com `order_nsu=<uuid>` e retorna URL
3. Usuário paga no link InfinitePay
4. InfinitePay envia webhook `POST /api/webhooks/infinitepay` com `order_nsu`, `transaction_nsu`, `invoice_slug`
5. Webhook verifica idempotência: se `payments.status=APPROVED` para aquele `order_nsu`, responde `{ received: true, idempotent: true }` sem reprocessar
6. Webhook chama `POST /payment_check` com `transaction_nsu` e `invoice_slug` para confirmar o pagamento (nunca confia só no payload)
7. Se `paid: true`, cria/atualiza `cohort_member` com `status=ACTIVE` e aprova o `payment`
8. Envia email de boas-vindas com magic link via `sendWelcomeInviteEmail`

## Como reprocessar um webhook manualmente

Se um webhook falhou (ex: timeout, erro de DB), reprocesse via:

```bash
curl -X POST https://seu-dominio.com/api/webhooks/infinitepay \
  -H "Content-Type: application/json" \
  -d '{
    "invoice_slug": "<invoice_slug>",
    "amount": 79700,
    "paid_amount": 79700,
    "installments": 1,
    "capture_method": "credit_card",
    "transaction_nsu": "<transaction_nsu>",
    "order_nsu": "<order_nsu>",
    "receipt_url": "https://..."
  }'
```

O handler é idempotente: se `payments.status` já está `APPROVED`, retorna `{ received: true, idempotent: true }` sem criar duplicatas.

## Verificar status de um pagamento

```sql
-- Buscar por order_nsu
SELECT id, status, user_id, cohort_id, amount_cents, paid_at, infinitepay_invoice_slug
FROM payments
WHERE infinitepay_order_nsu = '<order_nsu>';

-- Buscar eventos de webhook
SELECT * FROM webhook_events
WHERE stripe_event_id = 'ip_<order_nsu>'
ORDER BY created_at DESC;
```

## Troubleshooting

**payment_check retornou `paid: false`**
- O pagamento pode não ter sido concluído ou o `transaction_nsu` está errado
- Verificar no dashboard InfinitePay se o pagamento consta como aprovado
- O `payments.status` fica como `DECLINED` — não reprocessar automaticamente

**Sem `customer_email` e `user_id` é null**
- Pagamento aprovado mas acesso não provisionado automaticamente
- Buscar cliente no dashboard InfinitePay e criar `cohort_member` manualmente no Supabase
- Mudar `payments.status` para `APPROVED` após provisionar acesso

**`INFINITEPAY_BEARER_TOKEN` não configurado**
- Webhook recebe 500 com `{ error: 'Processing failed' }` 
- Configurar no Vercel: Settings → Environment Variables
