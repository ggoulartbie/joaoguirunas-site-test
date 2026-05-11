---
title: InfinitePay — Guia de Configuração e Turma de Teste R$1
type: ops
updated: 2026-05-11
tags: [ops, infinitepay, payments, checkout, webhook]
related:
  - "[[../stories/done/F12.1-infinitepay-adapter-webhook]]"
  - "[[../stories/done/F12.2-infinitepay-migration-admin-ui-dual-provider]]"
  - "[[../stories/done/F12.3-checkout-router-por-provider]]"
  - "[[../stories/active/F13.3-infinitepay-bearer-token]]"
  - "[[../stories/active/F13.4-infinitepay-static-url-warning-setup-guide]]"
---

# InfinitePay — Guia de Configuração e Turma de Teste R$1

## Pré-requisitos

- Conta InfinitePay ativa com InfiniteTag configurada (ex.: `growthsales`).
- Variáveis de ambiente em produção (Vercel) configuradas:
  - `INFINITEPAY_HANDLE` — sua InfiniteTag sem o `$` (ex.: `growthsales`)
  - `INFINITEPAY_BEARER_TOKEN` — token Bearer gerado no painel InfinitePay (ver [[../stories/active/F13.3-infinitepay-bearer-token]])
- Para configurar as env vars **via CLI** (nunca pelo painel Vercel para evitar exposição de secrets):

```bash
vercel env add INFINITEPAY_HANDLE production
vercel env add INFINITEPAY_BEARER_TOKEN production
```

Confirme que as variáveis estão ativas:

```bash
vercel env ls
```

---

## Passo 1 — Criar turma de teste

No admin `/academy/admin/turmas/nova`, criar um cohort com os seguintes campos:

| Campo | Valor |
|---|---|
| Nome | `Turma Teste R$1` |
| Slug | `turma-teste-r1` |
| Status | `OPEN` |
| Preco de entrada | `1.00` (R$1,00 — `price_cents: 100`) |
| Provider de pagamento | `INFINITEPAY` |
| Handle InfinitePay | `<sua InfiniteTag, ex.: growthsales>` |
| URL de Checkout | **deixar VAZIO** (fluxo dinamico) |
| Tem pagina publica | ativado |
| Turma vendavel | ativado |

> Usar R$1,00 (`price_cents: 100`) — InfinitePay tem minimo pratico de R$1,00 para captura em cartao; valores menores podem ser rejeitados.

> Deixar `infinitepay_checkout_url` **vazio** ativa o fluxo dinamico: o sistema cria um `payment` com status `PENDING`, gera o link de checkout via API e aguarda o webhook para resolver o pagamento. Se preenchido, o fluxo vira estatico (redirecionamento direto) e o webhook nao conseguira associar o pagamento.

---

## Passo 2 — Configurar webhook no painel InfinitePay

No painel InfinitePay, acesse a secao de webhooks e cadastre a seguinte URL:

```
https://joaoguirunas.com/api/webhooks/infinitepay
```

- **Metodo:** POST
- **Autenticacao:** nenhuma (InfinitePay nao suporta HMAC) — a seguranca e garantida pelo `payment_check` server-to-server ja implementado no handler.
- **Eventos:** selecionar todos os eventos de pagamento disponíveis (paid, cancelled, failed).

---

## Passo 3 — Fluxo de teste end-to-end

1. Logar na plataforma como aluno (usar conta de teste — **nao usar conta admin**).
2. Navegar para `/turmas/turma-teste-r1`.
3. Clicar em "Comprar" — o sistema cria um `payment` com status `PENDING` e redireciona ao checkout InfinitePay.
4. No checkout InfinitePay, pagar com cartao de teste (consultar documentacao InfinitePay em `https://developers.infinitepay.io` na secao "Sandbox / Cartoes de teste").
5. Apos pagamento, confirmar que o redirect de sucesso retorna para `/academy/checkout/sucesso`.
6. Verificar em `/academy/admin/pagamentos` que o payment aparece como `APPROVED`.
7. Verificar em `/academy/admin/usuarios` que o aluno aparece com `cohort_members.status = ACTIVE` na turma `turma-teste-r1`.
8. Logar como aluno e verificar que a turma aparece em `/academy/meus-cursos`.

---

## Passo 4 — Checklist de validacao

- [ ] Turma `turma-teste-r1` criada com `payment_provider = INFINITEPAY` e `infinitepay_checkout_url` vazio.
- [ ] Webhook cadastrado no painel InfinitePay com URL `https://joaoguirunas.com/api/webhooks/infinitepay`.
- [ ] Variáveis `INFINITEPAY_HANDLE` e `INFINITEPAY_BEARER_TOKEN` ativas em producao (verificar via `vercel env ls`).
- [ ] Pagamento de R$1,00 realizado no checkout InfinitePay.
- [ ] Redirect de sucesso retornou para `/academy/checkout/sucesso`.
- [ ] Payment em `/academy/admin/pagamentos` com status `APPROVED`.
- [ ] `order_nsu` do InfinitePay bate com o `id` do payment no Supabase.
- [ ] Webhook recebido — confirmar nos logs da Vercel (Functions > `/api/webhooks/infinitepay`).
- [ ] `cohort_members.status = ACTIVE` para o aluno na turma `turma-teste-r1`.
- [ ] Aluno ve a turma em `/academy/meus-cursos` apos login.
- [ ] Email transacional de confirmacao de pagamento enviado (verificar inbox ou logs Resend).

---

## Troubleshooting comum

### 401 da API InfinitePay ao criar checkout link

O `INFINITEPAY_BEARER_TOKEN` esta ausente, expirado ou incorreto. Verificar o guia [[../stories/active/F13.3-infinitepay-bearer-token]] e reconfigurar via CLI:

```bash
vercel env rm INFINITEPAY_BEARER_TOKEN production
vercel env add INFINITEPAY_BEARER_TOKEN production
vercel --prod deploy
```

### Pagamento ficou `PENDING` e nao avancou para `APPROVED`

O webhook nao chegou ou falhou. Verificar:

1. URL do webhook no painel InfinitePay esta correta: `https://joaoguirunas.com/api/webhooks/infinitepay`.
2. Logs da Vercel (Functions > `/api/webhooks/infinitepay`) para ver se o request chegou e qual erro retornou.
3. Tabela `webhook_events` no Supabase — verificar coluna `success` e `error_message` para o evento correspondente.
4. Se o evento falhou, usar o botao "Reprocessar" em `/academy/admin/pagamentos` na secao de webhooks com falha.

### Warning Sentry: `order_nsu sem payment`

O webhook chegou mas nao encontrou um `payment` com o `order_nsu` correspondente. Causa provavel: o campo `infinitepay_checkout_url` estava preenchido no cohort (fluxo estatico), entao nenhum `payment PENDING` foi criado antes do redirect. Solucao: limpar o campo e usar o fluxo dinamico, ou registrar o pagamento manualmente via admin.

### Aluno nao ve a turma em `/academy/meus-cursos`

Verificar se `cohort_members.status = ACTIVE` e `cohort_members.expires_at` nao esta no passado. Tambem confirmar que o curso esta associado a turma em `cohort_courses`.
