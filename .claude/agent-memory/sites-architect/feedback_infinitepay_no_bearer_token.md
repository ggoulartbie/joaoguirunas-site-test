---
name: InfinitePay não usa Bearer Token — fonte de verdade é o runbook
description: Nunca criar story sugerindo adicionar Authorization Bearer ao InfinitePayAdapter. Auth é via campo handle no body. QA results de F12.1 anotaram erroneamente "Bearer" — ignorar essa nota.
type: feedback
---

InfinitePay autentica via campo `handle` no body das requests para `/links` e `/payment_check`. NÃO usa `Authorization: Bearer` header. O adapter em `src/lib/payment/infinitepay.ts` já está correto.

**Why:** João (lead) confirmou em 2026-05-11 após eu (architect-2) criar story para "adicionar Bearer Token" baseado em research do analyst-2. O analyst-2 leu uma nota incorreta em `docs/smart-memory/agents/qa/results.md` (F12.1 QA). A nota está errada. O runbook `docs/smart-memory/runbooks/checkout-infinitepay.md` documenta isso corretamente: "Não existe INFINITEPAY_BEARER_TOKEN — autenticação é via campo handle no body, não via header".

**How to apply:**
- Ao receber research mencionando "Bearer Token InfinitePay" ou "INFINITEPAY_BEARER_TOKEN não implementado", **não criar story** sem antes confirmar com o runbook `checkout-infinitepay.md` e o código real do adapter.
- Hierarquia de fontes de verdade para InfinitePay: (1) código `src/lib/payment/infinitepay.ts`, (2) runbook `checkout-infinitepay.md`, (3) `.env.example`. QA results passados são registros frozen-in-time e podem conter inferências incorretas.
- Mesmo quando o `.env.example` documenta `INFINITEPAY_BEARER_TOKEN`, isso é uma dívida documental — não evidência de que o adapter deva usar Bearer.
- Sob instrução explícita do lead, **ignorar** o GAP 1 de Bearer Token mesmo que pareça atraente "consertar a inconsistência" do `.env.example`. O lead decide se vale criar story de cleanup separada.
