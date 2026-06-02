---
title: "Story LP-1.1: Server action createLeadOnly + helper webhook CRM"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-beta
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, server-action, crm, lead-capture]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.2-shared-components-cursos]]"
  - "[[LP-2.1-curso-ia-agentes]]"
  - "[[LP-2.2-curso-design]]"
  - "[[LP-2.3-curso-dev]]"
  - "[[LP-2.4-curso-social-media]]"
  - "[[LP-2.5-curso-bundle]]"
---

# Story LP-1.1: Server action createLeadOnly + helper webhook CRM

## Objetivo
Criar server action `createLeadOnly` que recebe `{ source, name, email, phone }` e dispara webhook do CRM externo + webhook secundário de lead, sem tocar em `payments`, `users`, `cohorts`. Extrair helper `fireCrmWebhook` de `checkoutPublic.ts` para `src/lib/crm/webhook.ts` para reuso.

## Acceptance Criteria

- [ ] **AC1** — Arquivo `src/app/actions/leadCapture.ts` exporta `async function createLeadOnly(input: { source: string; name: string; email: string; phone: string }): Promise<{ ok: true } | { error: string }>`. `'use server'` no topo.
- [ ] **AC2** — Validação via `zod` schema: `source` min(1), `name` min(1).max(120), `email` `.email()`, `phone` min(8).max(40). Erro de schema retorna `{ error: 'Dados inválidos.' }`.
- [ ] **AC3** — Action chama `fireCrmWebhook` com payload `{ name, email, phone, source, cohort_slug: source, cohort_name: source, source: 'landing-page', timestamp }` (preserva contrato atual do CRM, usando `source` da LP no campo `cohort_slug` p/ attribution).
- [ ] **AC4** — Action também chama `fireLeadWebhook` (mesmo endpoint hardcoded existente em `checkoutPublic.ts:17-30`) com payload `{ Nome, "E-mail", Whatsapp }` — paridade com fluxo do curso-online.
- [ ] **AC5** — Ambas as chamadas de webhook são **fire-and-forget** (sem `await`, com `.catch(() => {})`). Action não bloqueia UX se CRM cair.
- [ ] **AC6** — Helper `getCrmWebhookUrl` e `fireCrmWebhook` extraídos para `src/lib/crm/webhook.ts`. Exports nomeados: `getCrmWebhookUrl()`, `fireCrmWebhook(payload)`, `fireLeadWebhook(payload)`. URL de `fireLeadWebhook` permanece hardcoded como constante exportada `LEAD_WEBHOOK_URL`.
- [ ] **AC7** — `src/app/actions/checkoutPublic.ts` é refatorado para importar de `@/lib/crm/webhook` em vez de declarar inline. Comportamento idêntico — diff mínimo (substituir 47 linhas de helpers locais por 3 imports).
- [ ] **AC8** — `createLeadOnly` retorna `{ ok: true }` em caminho feliz. Não usa `redirect()` — UI cuida do feedback visual após sucesso.
- [ ] **AC9** — `createLeadOnly` NÃO toca em `payments`, `auth.users`, `users`, `cohorts` ou qualquer tabela. Defesa em profundidade — verificável via leitura do arquivo (zero `supabaseAdmin.from(...)`).
- [ ] **AC10** — Logging: em caso de webhook retornar `!response.ok`, `console.error('[leadCapture] webhook failed', { source, status })`. Sem Sentry nesta story (fora do escopo).
- [ ] **AC11** — `npm run build` passa sem warnings novos. TypeScript estrito (sem `any`).
- [ ] **AC12** — Smoke manual local: simular submit com `curl` chamando rota Next via teste do dev (passou a action em uma `<form action={...}>` temporária). Recebe `{ ok: true }`. CRM webhook recebe payload (mock via webhook.site se possível).

## Escopo

**IN:**
- `src/app/actions/leadCapture.ts` (novo)
- `src/lib/crm/webhook.ts` (novo — extração)
- `src/app/actions/checkoutPublic.ts` (refactor: usar helper externo)

**OUT:**
- Persistir lead em tabela Supabase (`leads`). Fonte é o CRM externo.
- Rate limit / captcha (futuro, se PO pedir).
- Sentry alert (futuro, se PO pedir).
- Modificações nos webhooks consumers (são externos ao projeto).
- Adaptar `createPublicCheckoutSession` para "lead mode" — explicitamente fora do escopo (ADR D4).

## Contexto Técnico

- Padrão de webhook fire-and-forget já existe em `src/app/actions/checkoutPublic.ts:20-29` (`fireLeadWebhook`) e `:41-63` (`fireCrmWebhook`). Mantém o mesmo pattern.
- `getCrmWebhookUrl()` faz lookup em `settings.crm_webhook_url` (Supabase) com fallback em `process.env.CRM_WEBHOOK_URL`. Mantém comportamento.
- Esta action é chamada via `<form action={...}>` (server action invocada do `LeadForm` da LP-1.2).
- Esta story **bloqueia LP-2.1 a LP-2.5** (LPs precisam da action).
- Não bloqueia LP-1.2 (componentes shared podem ser construídos em paralelo, integração final na LP-2.x).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-beta |
| Iniciado   | — |
| Concluído  | — |
| Branch     | `feat/landing-pages-cursos` |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar — bloqueado por LP-3.1 -->
