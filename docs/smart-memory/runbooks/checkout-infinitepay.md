---
title: "Runbook: Checkout InfinitePay"
type: runbook
created: 2026-05-10
updated: 2026-05-10
tags: [runbook, infinitepay, payment, webhook]
---

# Checkout InfinitePay — Runbook

## Env vars necessárias

| Variável | Descrição |
|---|---|
| `INFINITEPAY_HANDLE` | InfiniteTag da conta sem `@` (ex: `growthsales`) — usado no corpo das requests, sem Bearer token |

> **Não existe `INFINITEPAY_BEARER_TOKEN`** — a autenticação é via o campo `handle` no body, não via header.

## API Reference

### POST /links — Criar link de pagamento

```
POST https://api.checkout.infinitepay.io/links
Content-Type: application/json
```

**Body:**
```json
{
  "handle": "<InfiniteTag sem @>",
  "order_nsu": "<uuid opcional — identificador do pedido>",
  "itens": [
    { "quantity": 1, "price": 79700, "description": "Nome do produto" }
  ],
  "redirect_url": "https://seusite.com/sucesso?order_nsu={order_nsu}",
  "webhook_url": "https://seusite.com/api/webhooks/infinitepay",
  "customer": {
    "name": "Nome do cliente",
    "email": "cliente@email.com",
    "phone_number": "+5511999999999"
  }
}
```

> **Atenção:** o campo é `itens` (pt-BR), NÃO `items`.
> `price` é em centavos (R$ 797,00 = `79700`).

**Response:**
```json
{ "url": "https://checkout.infinitepay.io/pay/..." }
```

O usuário é redirecionado para `url`. Após pagar, InfinitePay redireciona para `redirect_url` com query params:
- `receipt_url` — link do comprovante
- `order_nsu` — o mesmo enviado no body
- `slug` — invoice slug
- `capture_method` — ex: `credit_card`
- `transaction_nsu` — identificador da transação

### POST /payment_check — Verificar pagamento

```
POST https://api.checkout.infinitepay.io/payment_check
Content-Type: application/json
```

**Body:**
```json
{
  "handle": "<InfiniteTag sem @>",
  "order_nsu": "<uuid>",
  "transaction_nsu": "<da query param>",
  "slug": "<invoice_slug do webhook>"
}
```

**Response:**
```json
{ "paid": true, "paid_amount": 79700 }
```

## Fluxo completo

1. Checkout cria linha `payments` com `status=PENDING` e `infinitepay_order_nsu=<uuid>` via `checkoutPublic.ts`
2. `InfinitePayAdapter.createCheckoutLink()` faz `POST /links` com `handle` (sem Bearer) e retorna `url`
3. Usuário paga no link InfinitePay
4. InfinitePay envia webhook `POST /api/webhooks/infinitepay` com `order_nsu`, `transaction_nsu`, `invoice_slug`
5. Webhook verifica idempotência: se `payments.status=APPROVED` para aquele `order_nsu`, responde `{ received: true, idempotent: true }` sem reprocessar
6. Webhook chama `POST /payment_check` com `handle`, `transaction_nsu` e `invoice_slug` para confirmar
7. Se `paid: true`, cria/atualiza `cohort_member` com `status=ACTIVE` e aprova o `payment`
8. Envia email de boas-vindas com magic link via `sendWelcomeInviteEmail`

## Como reprocessar um webhook manualmente

```bash
curl -X POST https://joaoguirunas.com/api/webhooks/infinitepay \
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

O handler é idempotente — se `payments.status` já está `APPROVED`, retorna `{ received: true, idempotent: true }`.

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

**"INFINITEPAY_HANDLE must be configured"**
- `INFINITEPAY_HANDLE` não está definido na Vercel → Settings → Environment Variables
- Valor deve ser o InfiniteTag sem `@` (ex: `joaoguirunas`, não `@joaoguirunas`)
- Após adicionar, fazer redeploy

**"InfinitePay createLink failed (4xx)"**
- `handle` inválido ou conta não habilitada para links
- Verificar no dashboard InfinitePay se a conta tem a feature de link de pagamento ativa

**payment_check retornou `paid: false`**
- Pagamento não concluído ou `transaction_nsu` errado
- Verificar no dashboard InfinitePay se o pagamento está aprovado
- `payments.status` fica como `DECLINED` — não reprocessar automaticamente

**Sem `customer_email` e `user_id` é null após pagamento**
- Buscar cliente no dashboard InfinitePay e criar `cohort_member` manualmente no Supabase
- Mudar `payments.status` para `APPROVED` após provisionar acesso
