---
title: "Story DISC-1.1: Desconto proporcional no curso-bundle para quem já comprou cursos individuais"
type: story
status: backlog
epic: DISC
complexity: L
agent: sites-dev-beta + sites-data
created: 2026-05-26
updated: 2026-05-26
tags: [story, payments, discount, bundle, stripe, infinitepay, cross-sell]
related:
  - "[[../../decisions/ADR-001-plataforma-cursos-stack]]"
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-2.5-curso-bundle]]"
---

# Story DISC-1.1: Desconto proporcional no curso-bundle para quem já comprou cursos individuais

## Objetivo
Quando um aluno autenticado já comprou 1+ dos 4 cursos individuais (`curso-ia-agentes`, `curso-design`, `curso-dev`, `curso-social-media`) e inicia checkout do `curso-bundle`, aplicar desconto igual à soma do que já pagou em compras `APPROVED` + `purchase_kind = 'ENTRY'` desses cohorts. Implementado via Stripe Coupon dinâmico (`amount_off`) acoplado à Checkout Session. Para InfinitePay, decidir paridade via análise prévia (provider não suporta cupom programático na API atual — ver AC11).

## Acceptance Criteria

### Backend — cálculo do desconto

- [ ] **AC1** — Constante `BUNDLE_COMPONENT_SLUGS` definida em `src/lib/payment/bundleDiscount.ts` como `readonly ['curso-ia-agentes', 'curso-design', 'curso-dev', 'curso-social-media']`. Slug do bundle como `BUNDLE_SLUG = 'curso-bundle'`. Easy to extend.
- [ ] **AC2** — Função `computeBundleDiscount(userId: string): Promise<{ amountCents: number; payments: { cohortId: string; cohortSlug: string; amountCents: number }[] }>` em `src/lib/payment/bundleDiscount.ts`. Server-only.
- [ ] **AC3** — Query consolidada (1 round-trip ao Supabase):
  ```sql
  SELECT p.id, p.cohort_id, p.amount_cents, c.slug
  FROM payments p
  INNER JOIN cohorts c ON c.id = p.cohort_id
  WHERE p.user_id = $1
    AND c.slug = ANY($2)  -- BUNDLE_COMPONENT_SLUGS
    AND p.status = 'APPROVED'
    AND p.purchase_kind = 'ENTRY'
  ```
  Implementação via `supabaseAdmin.from('payments').select('id, cohort_id, amount_cents, cohorts!inner(slug)').eq(...).in('cohorts.slug', BUNDLE_COMPONENT_SLUGS).eq('status', 'APPROVED').eq('purchase_kind', 'ENTRY')`.
- [ ] **AC4** — Soma agregada em memória após a query. `amountCents = sum(p.amount_cents)`. Sem N+1.
- [ ] **AC5** — **Idempotência por cohort:** se o aluno comprou 2× o mesmo cohort individual (cenário improvável mas possível — ex.: extensão futura registrada como ENTRY por erro), somar **apenas o primeiro** por `cohort_id` (use `Map<cohortId, payment>` para dedupe). Garante que cada compra individual contribui no máximo uma vez ao desconto.

### Backend — proteção de teto

- [ ] **AC6** — **Cap mínimo R$ 1:** função `applyBundleDiscountCap(rawDiscountCents: number, bundlePriceCents: number): number` em `src/lib/payment/bundleDiscount.ts`. Regra: `Math.min(rawDiscountCents, bundlePriceCents - 100)`. Garante que o aluno paga no mínimo R$ 1,00 (100 centavos) — exigência de gateways e proteção contra cohort mal configurado com `entry_price_cents < sum`. Se resultado for ≤ 0, retornar `0` (sem desconto).
- [ ] **AC7** — Edge case: se `bundlePriceCents <= 100`, retornar `0` (cohort mal configurado, log de warning). Função nunca retorna valor negativo nem maior que `bundlePriceCents - 100`.

### Integração — Stripe

- [ ] **AC8** — Em `src/app/actions/checkoutPublic.ts`, ANTES da chamada `adapter.createCheckoutSession`, se `cohort.slug === BUNDLE_SLUG` E `authUser` existe:
  1. Chamar `computeBundleDiscount(authUser.id)` → `{ amountCents: rawDiscount, payments }`.
  2. `cap = applyBundleDiscountCap(rawDiscount, cohort.entry_price_cents)`.
  3. Se `cap > 0`: criar Stripe Coupon via `stripe.coupons.create({ amount_off: cap, currency: 'brl', name: 'Bundle Discount — Prévia compra', duration: 'once', metadata: { user_id, cohort_id, source: 'bundle_proportional' } })`. Recuperar `coupon.id`.
  4. Passar `couponId` ao `adapter.createCheckoutSession` (já suportado na interface `CreateCheckoutParams.couponId` — `src/lib/payment/interface.ts:9`).
- [ ] **AC9** — `StripeAdapter.createCheckoutSession` em `src/lib/payment/stripe.ts:34-59` é estendido: quando `params.couponId` está presente, adicionar `discounts: [{ coupon: params.couponId }]` na `Stripe.Checkout.SessionCreateParams`. **Conflito com `allow_promotion_codes`:** se `couponId` presente, definir `allow_promotion_codes: false` (Stripe não permite os dois juntos). Sem `couponId`, mantém `allow_promotion_codes: true` (comportamento atual).
- [ ] **AC10** — Persistir o `coupon.id` Stripe em `payments.metadata` (campo JSON existente?) ou nova coluna `payments.bundle_discount_coupon_id TEXT NULL` — **decisão da story:** preferir registrar via metadata da Stripe Session (já contido em `metadata.coupon_id` linha 42 do adapter). Sem migration nova. Webhook pode auditar o `coupon_id` ao processar evento `checkout.session.completed`.

### Integração — InfinitePay

- [ ] **AC11** — **Análise documental obrigatória antes do go-live** (entrega em `docs/smart-memory/runbooks/infinitepay-discount-analysis.md`):
  - Consultar API atual em `src/lib/payment/infinitepay.ts:36-64` — payload `POST /links` aceita apenas `items[].price`. Não há campo `discount`.
  - Hipóteses de implementação caso InfinitePay não suporte cupom nativo:
    - **(a)** Reduzir `items[0].price` no payload pelo valor do desconto antes de enviar (desconto invisível, mas funcional). Verificar com PO se aceitável — risco de o aluno não ver linha "desconto" no checkout do InfinitePay.
    - **(b)** Bloquear bundle no InfinitePay para usuários com compras prévias — `createPublicCheckoutSession` retorna `{ error: 'Para receber o desconto, finalize a compra via cartão internacional.' }` e força Stripe.
    - **(c)** Aplicar desconto post-checkout via crédito manual no CRM (fora de escopo desta story).
  - Recomendação documentada da story (provisória): **opção (a)** — `amountCents = entry_price_cents - cap` enviado no payload, com `metadata.bundle_discount_cents` registrado em `payments.metadata` (ou nova coluna se necessário) para reconciliação. Confirmar com PO antes de implementar.
- [ ] **AC12** — Implementação InfinitePay segue a recomendação aprovada na análise AC11. Caminho feliz: cohort.payment_provider = 'INFINITEPAY' + bundle + user autenticado com compras prévias + opção (a) → `amountCents` reduzido no `InfinitePayAdapter.createCheckoutLink`, registro do desconto em payment metadata para auditoria.

### Proteções de autorização

- [ ] **AC13** — **Desconto exige aluno autenticado.** Branch `if (authUser)` envolve toda a lógica de bundle discount em `checkoutPublic.ts`. Se não autenticado tentar comprar bundle, fluxo segue normal sem desconto (não é erro). Justificativa: lookup de pagamentos prévios exige `user_id`.
- [ ] **AC14** — **Só conta `purchase_kind = 'ENTRY'`.** Extensões (`EXTENSION`) e qualquer outro `purchase_kind` futuro não geram desconto. Cláusula `.eq('purchase_kind', 'ENTRY')` obrigatória no `computeBundleDiscount`.
- [ ] **AC15** — **Só conta `status = 'APPROVED'`.** PENDING, REFUNDED, FAILED ficam fora. Cláusula `.eq('status', 'APPROVED')` obrigatória.
- [ ] **AC16** — **Cohort do bundle não pode ser componente.** Validar via test/assertion que `BUNDLE_SLUG` não está em `BUNDLE_COMPONENT_SLUGS` — guard contra rebrand acidental que poderia gerar loop (comprar bundle desconta o próprio bundle).
- [ ] **AC17** — **Defesa em profundidade no webhook Stripe:** ao processar `checkout.session.completed`, se `session.discounts` presente, registrar em log estruturado `[bundle-discount] user_id={...}, coupon_id={...}, amount_off={...}` para auditoria. Sem mudança de comportamento — só observabilidade.

### Operacional

- [ ] **AC18** — Logs: `[bundleDiscount] computed user_id={...}, components={count}, raw_cents={...}, capped_cents={...}, bundle_price_cents={...}`. Não vazar email.
- [ ] **AC19** — Sentry breadcrumb (se Sentry estiver instrumentado no projeto, ver project memory) com tag `feature: bundle_discount`. Não-bloqueante: omitir se Sentry ainda não está disponível na rota.
- [ ] **AC20** — **Documentação:** atualizar `docs/smart-memory/runbooks/` com runbook `bundle-discount.md` descrevendo: como funciona, query, slugs configuráveis, edge cases, como debugar uma cobrança incorreta.

### Pré-requisitos para ativação (NÃO bloqueiam a story; são gates de produção)

- [ ] **PRE-1** — Existirem 4 cohorts em `cohorts` table com `slug ∈ BUNDLE_COMPONENT_SLUGS`, `is_purchasable=true`, `entry_price_cents` configurados.
- [ ] **PRE-2** — Existir cohort com `slug = 'curso-bundle'`, `is_purchasable=true`.
- [ ] **PRE-3** — Stories LP-2.1–LP-2.5 (LPs) tiverem evoluído para fase de pagamento real (não mais "Em Breve") — depende de decisão do PO sobre quando abrir.

### Build e qualidade

- [ ] **AC21** — `npm run build` passa. TypeScript estrito (sem `any`). Sem warnings novos.
- [ ] **AC22** — Tests unitários para `computeBundleDiscount` e `applyBundleDiscountCap` (se houver suite de tests no projeto; senão, smoke test manual documentado em PR description). Cobrir: zero compras prévias → retorna 0; 1 compra → retorna valor; 2 compras → soma; valor > bundle price → cap aplicado; valor exato igual a bundle → cap → cobra R$ 1; cohort_id duplicado → dedupe.
- [ ] **AC23** — Smoke E2E manual (documentado): (a) usuário sem histórico → preço cheio; (b) usuário com 1 compra → desconto = preço da compra; (c) usuário com 4 compras (todos individuais) → desconto = soma dos 4, capped em `bundle - R$ 1`; (d) usuário não-autenticado → preço cheio; (e) cohort de bundle inexistente → erro tratado normalmente.

## Escopo

**IN:**
- `src/lib/payment/bundleDiscount.ts` (novo — `computeBundleDiscount`, `applyBundleDiscountCap`, `BUNDLE_COMPONENT_SLUGS`, `BUNDLE_SLUG`)
- Refactor de `src/app/actions/checkoutPublic.ts` para chamar bundle discount antes de Stripe/InfinitePay
- Extensão de `src/lib/payment/stripe.ts` para suportar `discounts` no SessionCreateParams (toggle com `couponId`)
- Análise InfinitePay em `docs/smart-memory/runbooks/infinitepay-discount-analysis.md` (entrega prévia ao código)
- Runbook `docs/smart-memory/runbooks/bundle-discount.md`
- Logs estruturados no webhook handler Stripe (auditoria)

**OUT:**
- Migration nova (decisão: zero migration; metadata da Stripe Session basta para auditoria)
- UI de "Seu desconto: R$ X" antes do checkout (futuro — `BundleDiscountPreview` componente)
- Cupons compostos (combinar desconto bundle + cupom promocional) — desabilitado via AC9 (`allow_promotion_codes: false` quando coupon dinâmico presente)
- Estorno automático se aluno cancelar bundle e reembolsar — manual via admin (fora de escopo)
- A/B testing do desconto
- Aplicar desconto retroativo em compras já feitas (impossível — sessões Stripe são imutáveis após criação)

## Contexto Técnico

### Schema já existente — não precisa migration

```
payments {
  id uuid pk
  user_id uuid → auth.users
  cohort_id uuid → cohorts
  amount_cents int
  status: 'PENDING' | 'APPROVED' | 'FAILED' | 'REFUNDED'
  purchase_kind: 'ENTRY' | 'EXTENSION'
  payment_provider: 'STRIPE' | 'INFINITEPAY'
  metadata jsonb -- usado para auditoria do coupon_id (Stripe) ou bundle_discount_cents (InfinitePay)
}

cohorts {
  id uuid pk
  slug text unique
  is_purchasable bool
  entry_price_cents int
  payment_provider: 'STRIPE' | 'INFINITEPAY'
  stripe_price_entry_id text (Stripe only)
  infinitepay_handle text (InfinitePay only)
  infinitepay_checkout_url text (InfinitePay link estático opcional)
}
```

### Infra de cupons já existe

- `src/lib/payment/interface.ts:40-48`: `CreateCouponParams` (percentOff/amountOff/currency/redeemBy/maxRedemptions)
- `src/lib/payment/stripe.ts:95-106`: `StripeAdapter.createCoupon` funcional, testado em `sync.ts`
- `src/lib/payment/interface.ts:9`: `CreateCheckoutParams.couponId?: string` — já suporta passar coupon ID
- `src/lib/payment/stripe.ts:42`: `metadata.coupon_id = params.couponId` — já registrado na Session metadata

**MAS** `StripeAdapter.createCheckoutSession` atual (linhas 35-59) **ainda não injeta `discounts: [{ coupon }]` na SessionCreateParams** — apenas grava o id em metadata. AC9 cobre essa extensão.

### Decisão de ID dos cohorts

O lead estabeleceu que os slugs dos cohorts no Supabase serão idênticos aos slugs das LPs (`curso-ia-agentes`, `curso-design`, `curso-dev`, `curso-social-media`, `curso-bundle`). Convenção mantida — também alinha com o campo `source` da action `createLeadOnly` (ADR-landing-pages-cursos D8).

### Webhook Stripe — discounts auditing

`src/app/api/webhooks/stripe/route.ts` (existente) processa `checkout.session.completed`. AC17 adiciona log estruturado quando `session.discounts` está presente. Não bloqueia processamento; é observabilidade.

### Por que `payments.metadata` em vez de coluna nova?

- Coluna nova exige migration → ADR-001 documenta RLS como risco crítico; minimizar diff.
- Stripe já registra `coupon_id` na metadata da própria Session — reconciliação via API se necessário no futuro.
- InfinitePay precisará registrar `bundle_discount_cents` em algum lugar — `payments.metadata` (jsonb) é flexível e zero-migration.

### Dependências de execução

- **Bloqueada por:** LP-2.x done E cohorts criados em Supabase (PRE-1, PRE-2) E pagamentos abertos (PRE-3).
- **Não bloqueia outras stories** — é uma feature transversal post-LP.

## 5-point checklist

| # | Critério | Status |
|---|---|---|
| 1 | Título claro e objetivo | GO |
| 2 | Acceptance criteria testáveis (23 ACs) | GO |
| 3 | Escopo IN/OUT explícito | GO |
| 4 | Complexidade estimada (L) | GO |
| 5 | Alinhamento com stack e estrutura do site | GO |

**Resultado:** GO 5/5.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-beta (lead) + sites-data (revisão SQL/RLS) |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — (futura — não iniciar antes de PRE-1/2/3) |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
