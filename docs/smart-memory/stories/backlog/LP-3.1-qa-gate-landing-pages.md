---
title: "Story LP-3.1: QA gate adversarial — 5 LPs, LeadForm, CRM webhook"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-qa
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, qa, adversarial, gate]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-1.2-shared-components-cursos]]"
  - "[[LP-2.1-curso-ia-agentes]]"
  - "[[LP-2.2-curso-design]]"
  - "[[LP-2.3-curso-dev]]"
  - "[[LP-2.4-curso-social-media]]"
  - "[[LP-2.5-curso-bundle]]"
---

# Story LP-3.1: QA gate adversarial — 5 LPs, LeadForm, CRM webhook

## Objetivo
Validar adversarialmente as 5 landing pages, o `LeadForm` integrado, a server action `createLeadOnly`, o webhook CRM e o sitemap. Veredicto formal GO/NO-GO. Bloqueia merge na main.

## Acceptance Criteria

- [ ] **AC1** — **Smoke das 5 rotas:** `/curso-ia-agentes`, `/curso-design`, `/curso-dev`, `/curso-social-media`, `/curso-bundle` retornam 200, renderizam hero + curriculum + facilitadores + inscrição + FAQ + final CTA. Headline, badges e `priceLabel` específicos de cada LP confirmados visualmente.
- [ ] **AC2** — **"Em Breve" não-clicável:** botão `ComingSoonCTA` tem `aria-disabled="true"`, `tabIndex={-1}` e não é `<button type="submit">`. Tab key não aterrissa no botão. Clique no botão NÃO faz submit do form abaixo (verificar via interceptar `form.onsubmit` ou test E2E).
- [ ] **AC3** — **LeadForm happy path:** preencher nome="Teste QA", email="qa+lp@joaoguirunas.com", telefone BR válido → submit → UI mostra confirmação "Recebemos seu contato!". Sem redirect. Console sem erros.
- [ ] **AC4** — **LeadForm validação:** (a) submit sem nome → erro inline; (b) submit com email malformado → erro inline; (c) submit com phone vazio → erro inline; (d) submit com `source` ausente (forçar via devtools removendo o input hidden) → action rejeita com `error: 'Dados inválidos.'`.
- [ ] **AC5** — **CRM webhook recebe payload correto por LP:** monitorar webhook destination (ou logs do Supabase Edge Function); cada uma das 5 LPs deve enviar `source` igual ao slug da rota (`'curso-ia-agentes'`, `'curso-design'`, `'curso-dev'`, `'curso-social-media'`, `'curso-bundle'`). Confirma attribution.
- [ ] **AC6** — **Webhook fire-and-forget:** se webhook CRM falhar (simular bloqueando o host via `/etc/hosts` ou mockando endpoint inválido), submit do form ainda retorna `{ ok: true }` e UI mostra confirmação. Defesa em profundidade contra CRM offline.
- [ ] **AC7** — **Defesa em profundidade `createLeadOnly`:** validar via leitura do arquivo `src/app/actions/leadCapture.ts` que NÃO há `supabaseAdmin.from('payments')`, `.from('users')`, `.from('cohorts')` ou `findOrCreateUser`. Ação não cria conta, não persiste pagamento.
- [ ] **AC8** — **SEO sanitário:** cada LP tem `<title>` ≤ 70 caracteres, `<meta description>` ≤ 160, `<link rel=canonical>` apontando para a própria rota, JSON-LD válido (validar via [Schema.org validator](https://validator.schema.org/)). `offers.availability` é `PreOrder` em todas as 5.
- [ ] **AC9** — **Sitemap:** `https://localhost:3000/sitemap.xml` contém as 5 rotas com `lastModified` recente.
- [ ] **AC10** — **A11y:** Lighthouse Accessibility ≥ 90 nas 5 LPs. Skip-to-content funciona, headings hierárquicos (1 `h1` por página, sem skipping h2→h4), FAQ tem `aria-expanded` e `aria-controls` corretamente vinculados. Form labels via `aria-label` ou `<label>` visível.
- [ ] **AC11** — **Performance:** Lighthouse Performance ≥ 80 mobile nas 5 LPs. LCP < 2.5s, CLS < 0.1, INP < 200ms. Imagens lazy onde apropriado.
- [ ] **AC12** — **Regressão curso-online:** abrir `/curso-online`, fazer submit do checkout (sem completar pagamento). Verificar que `checkout-form` continua funcionando (redireciona para Stripe/InfinitePay), `PhoneField` foi movido para `cursos/_shared/` sem quebrar imports, `fireCrmWebhook` e `fireLeadWebhook` ainda disparam (refactor de LP-1.1 AC7 não quebrou nada).
- [ ] **AC13** — **Navegação cross-LP no bundle:** clicar nos 4 cards de `BundleCoursesGrid` da `/curso-bundle` navega corretamente para as 4 LPs individuais.
- [ ] **AC14** — **Mobile responsive:** as 5 LPs testadas em viewport 375px (iPhone SE). Hero, formulário, timeline e CTA final renderizam sem overflow horizontal. Carousel de `<CursoBenefits>` funciona.
- [ ] **AC15** — **QA Results obrigatório:** seção QA Results desta story preenchida com (a) checklist por AC com PASS/FAIL/N/A, (b) screenshots ou logs como evidência (mínimo 1 por LP no happy path), (c) veredicto formal `GO`, `CONDITIONAL_GO` ou `NO-GO`, (d) lista de concerns abertos se aplicável. **Não promover para `done/` sem QA Results preenchido (anti-recorrência Story 1.1 histórica).**

## Escopo

**IN:**
- Smoke E2E (manual ou Playwright) das 5 LPs
- Validação de SEO/A11y/Performance via Lighthouse
- Verificação do webhook CRM (logs ou destino de teste)
- Veredicto formal escrito

**OUT:**
- Testes unitários novos
- Testes de carga / stress
- Validação visual cross-browser (apenas Chromium nesta gate; Safari/Firefox se PO pedir)
- Testes de conversion rate (precisaria tráfego real)
- Re-design / pixel-perfect matching com layouts externos

## Contexto Técnico

- **Bloqueada por LP-1.1, LP-1.2, LP-2.1, LP-2.2, LP-2.3, LP-2.4, LP-2.5.** Só rodar quando todas done.
- Padrão de QA adversarial seguido em ciclos anteriores (FM-3.6, F9.12, TGA-1.4, RK-1.x).
- Veredicto formal escrito em `QA Results` desta própria story + atualização em `docs/smart-memory/agents/qa/results.md` (se aplicável ao processo atual).
- Anti-recorrência embutida: AC15 obriga `QA Results` preenchido — padrão consolidado das Epics anteriores (Story 1.1 ficou em done sem QA por meses).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-qa |
| Iniciado   | — |
| Concluído  | — |
| Branch     | `feat/landing-pages-cursos` |

## File List
<!-- QA preenche (artefatos: screenshots, logs, reports) -->

## QA Results
<!-- QA preenche com veredicto formal (GO/CONDITIONAL_GO/NO-GO) -->
