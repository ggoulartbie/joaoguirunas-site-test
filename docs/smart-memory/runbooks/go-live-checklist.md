---
title: Go-Live Checklist — Smoke test pré-lançamento
type: runbook
updated: 2026-05-06
tags: [runbook, go-live, smoke-test, launch, fase-8, plataforma-cursos]
related: [[stories/backlog/F8.7-smoke-test-pre-lancamento]], [[ops/launch-readiness]], [[ops/smoke-test-script]]
---

# Go-Live Checklist — Plataforma de Cursos joaoguirunas.com

**Propósito:** gating final antes de anunciar publicamente o primeiro aluno real. Executado em **produção** (com dados reais, exceto pagamentos via cupom 100% ou valor simbólico). Qualquer item NO-GO bloqueia anúncio público.

**Responsável da execução:** João + sites-qa (Axilun) acompanhando.
**Critério de PASS:** todos os ACs de F8.7 ✅ + nenhum CRITICAL aberto.
**Critério de CONCERNS:** ACs principais ✅, mas com observações documentadas.
**Critério de FAIL:** qualquer fluxo crítico de receita (compra → acesso) ou segurança (RLS, video_id leakage) quebrado.

---

## Pré-requisitos (validar ANTES de iniciar)

- [ ] Domínio prod ativo e HTTPS válido (ver [[ops/launch-readiness]] tabela de env vars)
- [ ] Todas as 16 env vars obrigatórias configuradas no Vercel (ver [[ops/launch-readiness]] §"Variáveis de ambiente")
- [ ] Migrations aplicadas em prod: `supabase db push --linked` retorna sucesso
- [ ] `seed.sql` **NÃO** executado em prod
- [ ] Stripe webhook endpoint registrado para `https://DOMÍNIO/api/webhooks/stripe` com eventos `payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`, `charge.refunded`
- [ ] Resend: domínio verificado, SPF/DKIM OK, `RESEND_FROM_EMAIL` com domínio verificado
- [ ] Vimeo: domínio prod adicionado à whitelist do player
- [ ] Sentry: projeto criado, DSN nas env vars, source maps habilitados
- [ ] Backup Supabase configurado e ativo (verificar painel)
- [ ] Vercel cron habilitado (`vercel.json` linha 11; plano Pro+)
- [ ] **Cohort `curso-online-padrao` existe em prod (data fixture obrigatório):**
  ```sql
  SELECT slug, status, entry_price_cents, extension_price_cents, stripe_entry_price_id, stripe_extension_price_id
  FROM cohorts
  WHERE slug = 'curso-online-padrao';
  ```
  Esperado: 1 linha, `status='OPEN'` (ou equivalente que permita matrícula), `stripe_entry_price_id` populado.
  **Se não existir, AC4 falha imediatamente** (checkout de `/curso-online` quebra). Criar via `/admin/turmas/nova` ou seed dedicado antes de prosseguir.

---

## AC1 — Checklist documentado

✅ Este arquivo. Cobre todos os ACs de F8.7.

---

## AC2 — Auth (cadastro, login, reset, OAuth)

### Cadastro
- [ ] Acessar `/cadastro` com browser anônimo
- [ ] Preencher nome, email real (`teste+golive@DOMÍNIO`), senha
- [ ] Submit cria conta sem erro
- [ ] WelcomeEmail chega na caixa de entrada em < 2 min (Resend dashboard mostra entrega bem-sucedida)
- [ ] Tentar cadastrar mesmo email novamente → mensagem "Email já cadastrado" (não 500)

### Login
- [ ] `/login` com a conta criada → redirect `/dashboard`
- [ ] Login com senha errada → mensagem "Email ou senha incorretos." (sem 500)
- [ ] Login com email inexistente → mesma mensagem (não vaza existência)

### Reset de senha
- [ ] `/recuperar-senha` → submeter email
- [ ] Email PasswordResetEmail chega (verificar header/template e link)
- [ ] Clicar no link → `/redefinir-senha?token=...` abre formulário
- [ ] Definir nova senha → redirect `/login`
- [ ] Login com nova senha funciona

### Google OAuth (se ativo)
- [ ] `/login` → botão Google → fluxo OAuth → redirect `/dashboard`
- [ ] Verificar que `profiles.role = STUDENT` foi criado (query SQL ou admin/usuarios)

---

## AC3 — Conteúdo bloqueado (usuário sem matrícula)

- [ ] Conta recém-cadastrada (sem nenhum cohort_member ativo) acessa `/dashboard` → vê mensagem "Você ainda não tem matrículas ativas" (ou empty state equivalente). **Não** vê módulos de cursos.
- [ ] Acessa `/curso/qualquer-slug/aula/qualquer-slug` → recebe `<LockedContent />` ou redirect (NÃO retorna `video_id` no DOM)
  - **Verificação crítica:** abrir DevTools → Elements → Ctrl+F por `vimeo.com/video/` → **zero matches**
- [ ] `/turmas/[slug]` LP pública renderiza com preço correto (validar contra Stripe Dashboard) e CTA "Quero entrar"
- [ ] Clicar "Quero entrar" sem login → redirect `/login?next=/checkout/[slug]`

### AC3.1 — `noindex` em páginas de aula (proteção SEO)

Páginas de aula (`/academy/.../aula/...`) **não podem** ser indexadas — conteúdo pago, indexação vaza ou pior, induz crawler a clicar em CTA pago.

- [ ] Verificar via curl (sem auth, página retorna LockedContent ou redirect, mas o `<head>` ainda deve marcar noindex se for renderizado):
  ```bash
  curl -s https://joaoguirunas.com/academy/curso-online/aula/introducao | grep -i 'name="robots"'
  ```
  Esperado: linha contendo `<meta name="robots" content="noindex` (ou `noindex,nofollow`).
- [ ] Repetir para pelo menos uma aula de cada cohort em prod (online + mentoria).
- [ ] **Caso autenticado:** logar como aluno com acesso e abrir DevTools → Elements → confirmar mesma `<meta name="robots" content="noindex">` no `<head>`.
- [ ] **NEGATIVO:** confirmar que páginas públicas (`/turmas`, `/turmas/[slug]`, `/`) **não** têm `noindex` (devem ser indexáveis):
  ```bash
  curl -s https://joaoguirunas.com/turmas | grep -i 'name="robots"' || echo 'OK: sem noindex'
  ```
  Esperado: ausente OU `content="index,follow"`.
- [ ] (Opcional, pós-launch) Search Console: confirmar em "Cobertura" que `/academy/.../aula/...` aparece em "Excluídas — bloqueadas por noindex" e não em "Indexadas".

---

## AC4 — Compra real (smoke fluxo end-to-end)

> **Estratégia:** admin compra usando cupom 100% OU valor simbólico baixo (R$ 1-5) em modo produção. Stripe está em LIVE mode, sem cartão de teste.

### Pré-compra
- [ ] Admin tem cupom 100% criado em Stripe Dashboard (ou cohort com price R$ 1)
- [ ] Login com conta de admin/teste em browser limpo

### Fluxo
- [ ] Acessar `/turmas` → identificar cohort → clicar "Quero entrar"
- [ ] Stripe Checkout abre com Price correto (validar valor exibido vs cohort.price_cents/100)
- [ ] Aplicar cupom 100% (se for o caso) ou completar pagamento real
- [ ] Stripe confirma pagamento aprovado
- [ ] Redirect para `/checkout/sucesso` (ou rota equivalente)

### Pós-compra (verificações)
- [ ] **Webhook em produção processa em < 2 min:**
  - Verificar log do webhook em Stripe Dashboard → último evento `checkout.session.completed` retornou `200`
  - Query Supabase: `SELECT * FROM payments WHERE stripe_session_id='<id>'` → registro com `status='SUCCEEDED'`
  - Query Supabase: `SELECT * FROM cohort_members WHERE user_id='<uid>' AND cohort_id='<cid>'` → registro com `status='ACTIVE'`, `expires_at` correto
- [ ] Aluno faz refresh de `/dashboard` → cohort ativa visível **em < 2 min** (métrica de Seção 2.3 do PRD)
- [ ] Acessar `/curso/[slug]` → módulos e aulas listados
- [ ] Acessar `/curso/[slug]/aula/[lesson-slug]` → VideoPlayer carrega (iframe Vimeo no DOM)
- [ ] Avançar 5s no vídeo, recarregar → progresso retomado (verificar `lesson_progress` table tem registro)

---

## AC5 — Cross-extension (`days_granted` aplicado em cohort target)

> Pré: existe `cohort_cross_extensions` registro válido (source = cohort online, target = cohort mentoria, days_granted = N).

### Setup
- [ ] Aluno (mesmo da AC4 ou novo) tem `cohort_member` ACTIVE em cohort target (mentoria) com `expires_at` conhecido — anotar valor original
- [ ] `cohort_cross_extensions`: registrar `source_cohort_id`, `target_cohort_id`, `days_granted` (anotar valor)

### Execução
- [ ] Mesmo aluno completa fluxo de compra na cohort source (online) — repetir AC4 com cupom 100% ou valor simbólico
- [ ] Aguardar processamento webhook (< 2 min)

### Verificação
- [ ] Query SQL: `SELECT expires_at FROM cohort_members WHERE user_id='<uid>' AND cohort_id='<target_cid>'`
- [ ] Comparar com valor original: nova `expires_at` = original + `days_granted` dias
- [ ] UI: `/perfil` → tab Matrículas → mentoria mostra nova data de expiração

---

## AC6 — Refund

- [ ] Admin acessa `/admin/pagamentos`
- [ ] Localizar pagamento criado em AC4
- [ ] Clicar "Reembolsar" → dupla confirmação aparece
- [ ] Confirmar refund
- [ ] Stripe Dashboard mostra refund processado
- [ ] Webhook `charge.refunded` processado em < 2 min
- [ ] Query SQL: `SELECT status FROM payments WHERE id='<pid>'` → `status = 'REFUNDED'`
- [ ] Query SQL: `SELECT status FROM cohort_members WHERE user_id='<uid>' AND cohort_id='<cid>'` → `status = 'REFUNDED'` ou `EXPIRED` (conforme spec)
- [ ] Aluno: `/dashboard` não mostra mais a cohort ativa
- [ ] Aluno: tentar acessar lesson da cohort reembolsada → LockedContent (sem `video_id` no DOM)

---

## AC7 — Emails reais chegam

Validar entrega real para email de teste (não bounce/spam):

- [ ] **WelcomeEmail** — após cadastro novo (AC2)
- [ ] **PasswordResetEmail** — após `/recuperar-senha` (AC2)
- [ ] **PaymentApprovedEmail / access-granted** — após webhook de checkout (AC4)
- [ ] **PaymentReceiptEmail** — em ≤ 5 min após compra
- [ ] (Opcional) **MembershipExtended** — após cross-extension (AC5)
- [ ] (Opcional) **RefundProcessedEmail** — após refund (AC6) se template existir

**Verificações por email:**
- Header `From` = `RESEND_FROM_EMAIL` (domínio verificado)
- Link clicável funciona em prod (não localhost)
- Template renderiza sem `[object Object]` ou `undefined`
- Imagens carregam (logo, etc.)
- Resend dashboard: `delivered` (não `bounced` nem `complained`)

---

## AC8 — Performance (Lighthouse mobile)

Rodar em modo Incognito + dispositivo Mobile (Moto G Power preset):

- [ ] `/turmas/[slug]` (LP pública)
  - Performance > 80 ✅/❌
  - Best Practices > 90 ✅/❌
  - Accessibility > 90 (não exigido pelo AC mas recomendado)
- [ ] `/dashboard` (autenticado)
  - Performance > 80 ✅/❌
  - Best Practices > 90 ✅/❌

**Métricas-alvo Seção 2.3 PRD:**
- response time < 800ms (verificar em Vercel Analytics ou Sentry)
- TTFB < 600ms (CWV)

Salvar prints em `docs/smart-memory/runbooks/launch-{YYYY-MM-DD}.md`.

---

## AC9 — RLS auditoria

Rodar query de auditoria via Supabase SQL Editor (modo postgres role):

```sql
SELECT
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Esperado:** todas as 21 tabelas listadas em [[agents/data-engineer/schema]] retornam `rowsecurity = true`.

- [ ] Rodar query, copiar saída para `launch-{YYYY-MM-DD}.md`
- [ ] Conferir que tabelas críticas têm RLS: `profiles`, `cohort_members`, `payments`, `lesson_progress`, `comments`, `forum_threads`, `forum_replies`, `certificates`, `materials`, `notifications`, `cohort_cross_extensions`, `live_sessions`, `coupons`
- [ ] Spot-check de policy: `\dp public.cohort_members` → policies SELECT/INSERT/UPDATE/DELETE estão presentes

---

## AC10 — Sentry capturando

- [ ] Login como admin
- [ ] Forçar erro controlado em rota admin-only (sugestão: criar endpoint temporário `/admin/_test-sentry` que faz `throw new Error('Sentry test — go-live')`, OU usar `/admin` e disparar erro client-side via console)
- [ ] Aguardar < 1 min
- [ ] Sentry dashboard mostra evento com:
  - `tags.environment = production`
  - `user.id` = admin uid
  - URL/route correta
  - Stack trace com source maps resolvidos (linhas do código fonte, não bundled)
- [ ] **Não esquecer de remover endpoint de teste antes do anúncio público**

---

## AC11 — Cron diário

Forçar execução manual:

```bash
curl -i -H "Authorization: Bearer $CRON_SECRET" \
  https://DOMÍNIO/api/cron/daily
```

- [ ] Resposta `200 OK`
- [ ] Body JSON contém `{ expired, reminders, renewalsProcessed, liveReminders, errors }` com erros vazios `[]`
- [ ] **Auth negada sem header:** `curl -i https://DOMÍNIO/api/cron/daily` → `401 Unauthorized`
- [ ] **Auth negada com bearer errado:** `curl -i -H "Authorization: Bearer wrong" https://DOMÍNIO/api/cron/daily` → `401`
- [ ] Vercel logs: cron job aparece com sucesso
- [ ] Vercel: cron schedule visível em Settings → Crons (`0 6 * * *`)

---

## AC12 — Backup

- [ ] Acessar painel Supabase → Database → Backups
- [ ] Confirmar que existe backup do dia (ou último 24h)
- [ ] Verificar política de retenção (mínimo 7 dias)
- [ ] Anotar timestamp do último backup em `launch-{YYYY-MM-DD}.md`

---

## AC13 — Documentar resultado

Após executar todos os ACs acima, criar `docs/smart-memory/runbooks/launch-{YYYY-MM-DD}.md` com:

```markdown
---
title: Launch Smoke Test — YYYY-MM-DD
type: runbook
updated: YYYY-MM-DD
tags: [runbook, launch, smoke-test, executado]
---

# Launch Smoke Test — YYYY-MM-DD

**Executado por:** João + Axilun (sites-qa)
**Ambiente:** produção (DOMÍNIO)
**Início:** HH:MM
**Término:** HH:MM
**Resultado:** ✅ PASS / ⚠️ CONCERNS / ❌ FAIL

## ACs (replicar tabela com status)

| AC | Status | Evidência |
|---|---|---|
| Pré-flight cohort `curso-online-padrao` | ✅ | query `select slug from cohorts where slug='curso-online-padrao'` retorna 1 |
| AC1 Checklist | ✅ | go-live-checklist.md |
| AC2 Auth | ✅ | print/log |
| AC3 Conteúdo bloqueado | ✅ | DOM check ok |
| AC3.1 noindex aulas | ✅ | curl grep robots → noindex em /academy/.../aula |
| AC4 Compra | ✅ | payment X, cohort_member Y |
| AC5 Cross-ext | ✅ | expires_at ant=X new=Y |
| AC6 Refund | ✅ | payment status REFUNDED |
| AC7 Emails | ✅ | resend log ids |
| AC8 Performance | ✅ | LH mobile X% |
| AC9 RLS | ✅ | query output |
| AC10 Sentry | ✅ | event id |
| AC11 Cron | ✅ | cron log |
| AC12 Backup | ✅ | timestamp último backup |

## Issues abertas (se CONCERNS/FAIL)

(listar aqui)

## Observações

(prints, logs, contexto adicional)
```

---

## Veredicto formal — execução pendente

```
VEREDICTO: PENDENTE DE EXECUÇÃO
Story: F8.7 | Data: 2026-05-06
Status: Checklist documentado e aprovado.
Execução depende de:
  - Deploy em produção (F8.6 — task #47 ainda pendente)
  - Configuração final de env vars no Vercel
  - DNS apontando para domínio prod
  - Stripe webhook prod registrado
Próximo passo: após F8.6 PASS, executar este runbook em produção e
documentar resultado em launch-{YYYY-MM-DD}.md. sites-qa emite
veredicto final PASS/CONCERNS/FAIL com base na execução.
```

**Bloqueio explícito:** este runbook é o gate final de F8.7. Sites-qa (Axilun) não pode emitir PASS sem evidência de execução completa em produção. Pressão de prazo não altera esse critério.
