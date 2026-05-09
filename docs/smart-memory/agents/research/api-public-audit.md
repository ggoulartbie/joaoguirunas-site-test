---
name: api-public-audit
description: Auditoria das APIs públicas — webhook Stripe, crons, certificado
type: research
updated: 2026-05-08
tags: [security, api, webhook, cron, audit, F9.10]
related:
  - "[[stories/backlog/F9.10-auditar-apis-publicas-jobs]]"
---

# API Public Audit

## Rotas auditadas

| Rota | Método | Auth | Ficheiro |
|---|---|---|---|
| `/api/webhooks/stripe` | POST | STRIPE_WEBHOOK_SECRET (assinatura) | `src/app/api/webhooks/stripe/route.ts` |
| `/api/cron/daily` | GET | CRON_SECRET (Bearer) | `src/app/api/cron/daily/route.ts` |
| `/api/cron/hourly` | GET | CRON_SECRET (Bearer) | `src/app/api/cron/hourly/route.ts` |
| `/api/certificado/[code]` | GET | Público | `src/app/api/certificado/[code]/route.ts` |

---

## AC1 — `/api/webhooks/stripe`

**Status: PASS**

### Verificação de assinatura
```ts
event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
```
- Usa raw body (lido via `getRawBody`) com `stripe.webhooks.constructEvent` — assinatura HMAC-SHA256 verificada. ✅
- Sem `sig` ou sem `webhookSecret` → 400 imediato. ✅
- Falha na verificação → 400 "Invalid signature". ✅

### Idempotência
- `webhook_events` table com `stripe_event_id` único (UNIQUE constraint em migration).
- Check na entrada: se `existing` → retorna `{ received: true, idempotent: true }` sem processar. ✅
- Registo do evento inserido **após** o processamento (não antes) — se o processamento falhar e o processo morrer, o evento não fica marcado como processado, permitindo retry pelo Stripe. ✅

### Falhas internas
- Erros capturados com `try/catch`, logados via `console.error` + `Sentry.captureException`. ✅
- Response em caso de falha: `{ error: 'Processing failed' }` com status 500 — sem stack trace. ✅

### Eventos cobertos
- `checkout.session.completed` ✅
- `invoice.paid` ✅
- `invoice.payment_failed` ✅
- `charge.refunded` ✅
- Eventos não mapeados: processados sem efeito (switch sem default) — nenhum erro. ✅

### Fix aplicado anteriormente
`findOrCreateUser` — substituído scan O(N) por `createUser` first + paginate on conflict. Ver `route.ts:113-148`.

---

## AC2 — `/api/cron/daily` e `/api/cron/hourly`

**Status: PASS (em modo de fallback desabilitado)**

### Autenticação
```ts
if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```
- Bearer token exigido. ✅
- Sem CRON_SECRET configurada, `process.env.CRON_SECRET` é `undefined` — `authHeader !== 'Bearer undefined'` é sempre true, portanto **qualquer request seria rejeitada**. Comportamento seguro por acidente, mas a variável deve estar configurada para uso real.

### Estado atual dos crons
`vercel.json` tem `"crons": []` — nenhum cron Vercel configurado. Ambas as rotas retornam `{ disabled: true }` a menos que `CRON_FALLBACK_ENABLED=true`. Os crons foram migrados para Supabase pg_cron + Edge Functions (F11.1).

**Conclusão:** rotas existem apenas como fallback de emergência, desabilitadas por padrão. Risco mínimo.

### Inventário de jobs — `/api/cron/daily`

1. **Expirar memberships** — `cohort_members`: ACTIVE → EXPIRED onde `expires_at < now()`. Idempotente ✅
2. **Reminders de expiração** — envia email 15, 7 e 3 dias antes. Idempotente na janela diária (mesmo membro não recebe dois emails no mesmo dia pelas condições de `gte`/`lte`). ✅
3. **Auto-renewals pendentes** — verifica memberships `auto_renew_enabled=true` sem evento Stripe. Apenas loga — não processa pagamentos. ✅
4. **Live session reminders (24h)** — envia reminder para membros ativos da cohort. ✅

### Inventário de jobs — `/api/cron/hourly`

1. **Live session reminders (1h)** — janela de 50-70 min antes da sessão. Marca `reminder_1h_sent_at` para evitar duplicatas. Idempotente ✅

### Issues nos crons

- **`cron/daily/route.ts:58`** — `profiles(name, email: id)` no select de memberships parece typo (seleciona `id` como alias `email`). Email obtido separadamente via `getUserProfile()`. Não causa bug (getUserProfile usa auth.admin) mas é código morto.
- **`cron/daily` — queries em loop:** para cada membro da janela de expiry, chama `getUserProfile(userId)` que faz dois roundtrips ao Supabase (auth.admin.getUserById + profiles select). Com base grande, pode ser lento. P3 — risco aceitável na operação de fallback.

---

## AC3 — `/api/certificado/[code]`

**Status: CONCERN — dados mock**

### Sanitização do `code`
```ts
const safeCode = code.replace(/[^a-zA-Z0-9_-]/g, '')
if (!safeCode || safeCode.length > 100) {
  return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
}
```
- SQL injection: impossível — código sanitizado com allowlist antes de qualquer uso. ✅
- Path traversal: `[^a-zA-Z0-9_-]` remove `..`, `/`, etc. ✅
- Length limit de 100 chars. ✅

### PII leak
- Retorna PDF com: nome, curso, turma, data, código de verificação. ✅
- **NÃO retorna:** email, telefone, CPF, pagamento. ✅
- Headers: `Content-Disposition: attachment`, `Cache-Control: private, max-age=3600`. ✅

### Dados mock (TODO F5.3)
```ts
// TODO F5.3: buscar certificado real via supabaseAdmin
const cert = { name: 'João Guirunas', ... } // mock hardcoded
```
- Rota retorna PDF com dados hardcoded — não consulta `certificates` na DB.
- **Qualquer `code` válido retorna o mesmo PDF mock.**
- Risco em produção: P1 — verificador de certificado não funciona, e qualquer pessoa pode baixar um PDF com nome "João Guirunas" usando qualquer código.
- **Esta é pendência de F5.3**, fora do escopo de F9.10. Documentado para priorização.

### Rate limit
- Nenhum rate limiting implementado a nível de aplicação.
- Depende de Vercel/Cloudflare para proteção de abuso.
- P2: considerando que a rota faz `renderToBuffer` (CPU-intensivo para PDF), pode ser explorada para DoS. Recomendado: rate limit por IP via Vercel Edge Config ou `@upstash/ratelimit`.

---

## AC4 — Nenhuma rota vaza secrets/env

**Status: PASS**

- Webhook: erros → `{ error: 'Processing failed' }` — sem detalhes internos. ✅
- Crons: erros individuais em `results.errors[]` — apenas mensagens de erros de aplicação, não env vars. ✅
- Certificado: erros → `{ error: 'Invalid code' }` ou PDF. Sem env exposure. ✅
- `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `CRON_SECRET` nunca aparecem em responses. ✅

---

## Issues encontrados

| ID | Prioridade | Status | Descrição |
|---|---|---|---|
| P-01 | P1 | PENDÊNCIA F5.3 | `/api/certificado/[code]` usa dados mock — qualquer código retorna PDF com nome hardcoded. Não funciona em produção. |
| P-02 | P2 | WONTFIX (documentado) | `/api/certificado/[code]` sem rate limit — `renderToBuffer` CPU-intensivo. Recomendado Upstash ratelimit. |
| P-03 | P3 | WONTFIX | `cron/daily` — `getUserProfile` em loop por membro (N+1). Aceitável para fallback de emergência. |
| P-04 | P3 | WONTFIX | `cron/daily` — select `profiles(name, email: id)` parece alias incorreto. Não causa bug pois email é obtido via `getUserProfile`. |

---

## Nota sobre `vercel.json`

```json
{ "crons": [] }
```

Nenhum cron Vercel ativo. Os jobs estão em Supabase Edge Functions (F11.1). As rotas `/api/cron/*` existem apenas como fallback manual (`CRON_FALLBACK_ENABLED=true`).
