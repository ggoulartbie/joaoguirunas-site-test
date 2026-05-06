---
title: Smoke Test Script — pós-deploy
type: ops
updated: 2026-05-06
tags: [ops, smoke-test, launch, stripe, f7]
---

# Smoke Test Script — pós-deploy

Executar manualmente por João após cada deploy em produção.
Usar dois navegadores: um anônimo (não autenticado) e um com conta de teste.

> **Cobertura:** este script cobre os flows de F1–F8 entregues. Para gate formal de go-live (primeiro aluno real), usar `runbooks/go-live-checklist.md` (F8.7) que tem ACs com evidências auditáveis. Este aqui é o roteiro operacional pós-deploy diário.

---

## 1. Site institucional (não deve ser afetado)

- [ ] `/` carrega normalmente (sem redirect para /login)
- [ ] `/mentoria` carrega — hero, facilitadores, CTA visíveis
- [ ] `/agentes` carrega — página de agentes renderiza
- [ ] `/open-source` carrega — grid de skills visível
- [ ] `/turmas` carrega sem login — grid de cohorts ou empty state

---

## 2. Fluxo de cadastro + login

- [ ] `/cadastro` — formulário renderiza (campos nome, email, senha)
- [ ] Criar conta com e-mail real de teste (ex: `teste+smoke@seudominio.com`)
- [ ] E-mail de boas-vindas recebido na caixa de entrada (WelcomeEmail)
- [ ] `/login` — entrar com a conta criada
- [ ] Redirect para `/dashboard` após login bem-sucedido
- [ ] Login com senha errada → mensagem "Email ou senha incorretos." aparece (sem 500)
- [ ] `/recuperar-senha` — formulário de e-mail renderiza sem erros

---

## 3. LP de turmas (pública)

- [ ] `/turmas` carrega sem login — heading "Turmas disponíveis" visível
- [ ] Grid de turmas **ou** empty state "Nenhuma turma aberta no momento." visível
- [ ] Se houver turmas: clicar "Matricular-se" (sem estar logado) → redirect `/login?next=/checkout/[slug]`
- [ ] Parâmetro `next` presente na URL de login após redirect

---

## 4. Área do aluno (requer conta com matrícula de teste)

> Usar conta de admin para criar matrícula de teste via `/admin/turmas/[id]` antes de executar estes checks.

- [ ] `/dashboard` carrega — progresso geral e próximas sessões visíveis
- [ ] `/meus-cursos` carrega — lista de turmas com progresso
- [ ] `/curso/[slug]` carrega — módulos e aulas listados
- [ ] `/curso/[slug]/aula/[lesson-slug]` — lição acessível abre **com** player de vídeo (VideoPlayer presente no DOM)
- [ ] Lição bloqueada (sem acesso) → LockedContent visível, **sem** iframe de vídeo no DOM
- [ ] Marcar aula como concluída → progresso na barra atualiza (sem recarregar)
- [ ] `/forum` — carrega, categorias visíveis
- [ ] `/agenda` — sessões ao vivo listadas (ou empty state se nenhuma agendada)
- [ ] `/certificados` — página carrega (lista vazia ou com certificado se 100% concluído)
- [ ] `/perfil` — dados do usuário carregam (nome, email, data de cadastro)
- [ ] `/perfil` tab Matrículas — turma de teste aparece com status "Ativa"
- [ ] `/perfil` tab Pagamentos — histórico de pagamento visível

### 4.1 /perfil — edição de dados (F7.7)

- [ ] Editar nome → salvar → reload mantém valor
- [ ] Editar bio → salvar → reload mantém
- [ ] Upload de foto (avatar) → arquivo vai pro bucket `avatars` (validar URL no DOM começa com `https://*.supabase.co/storage/v1/object/public/avatars/...` ou signed URL)
- [ ] Trocar senha → email/redirect → nova senha funciona no /login

### 4.2 /perfil — renovação automática (F7.5)

- [ ] Em uma matrícula ACTIVE: toggle "Renovação automática" → toggle ON
- [ ] Server confirma persistência (`cohort_members.auto_renew=true` ou similar)
- [ ] Toggle OFF reverte
- [ ] Stripe Subscription Schedule criado/atualizado (validar via Stripe Dashboard ou logs)

### 4.3 /perfil — estender matrícula (F7.7)

- [ ] Em matrícula ACTIVE com `extension_price` definido: botão "Estender por R$ X" visível
- [ ] Clicar → fluxo Stripe Checkout extension (mesma lógica de §5.2)
- [ ] Após pagamento, `expires_at` é estendido

---

## 5. Checkout — entry, extension, cupom (F7.3)

> Em staging usar cartão de teste Stripe: `4242 4242 4242 4242` | exp: qualquer futura | CVC: qualquer.
> Em produção usar cupom 100% ou valor simbólico baixo.

### 5.1 Entry pricing (novo aluno)

- [ ] Logado com conta **sem histórico em cohort_members**: clicar "Matricular-se" em `/turmas` → redirect para Stripe Checkout (não para /login)
- [ ] URL começa com `https://checkout.stripe.com/...`
- [ ] Stripe Checkout exibe **price entry** (validar valor exibido vs `cohort.entry_price_cents/100`)
- [ ] Preencher dados com cartão `4242 4242 4242 4242` (ou cupom 100% em prod)
- [ ] Checkout completa sem erro
- [ ] Redirect para `/checkout/sucesso` após pagamento
- [ ] Webhook recebido → registro em `payments` com `status='SUCCEEDED'`
- [ ] Registro em `cohort_members` com `status='ACTIVE'` e `expires_at` correto
- [ ] E-mail recebido: **AccessGrantedEmail** (lista cursos liberados, prazo, link `/dashboard`)
- [ ] `/perfil` → Matrículas → nova matrícula aparece com status "Ativa"

### 5.2 Extension pricing (aluno com histórico)

- [ ] Logado com conta **com histórico em cohort_members** (mesma cohort, status EXPIRED): clicar "Matricular-se" → Stripe Checkout
- [ ] Checkout exibe **price extension** (validar valor exibido vs `cohort.extension_price_cents/100`, normalmente menor que entry)
- [ ] Completar pagamento
- [ ] Webhook processa → mesma `cohort_members.id` é UPDATE (não INSERT duplicado): `status='ACTIVE'`, novo `expires_at`
- [ ] E-mail recebido: **MembershipExtendedEmail** (não AccessGranted)

### 5.3 Cupom (opcional)

- [ ] `createCheckoutSession(cohortSlug, couponCode)` com cupom válido aplica desconto na sessão Stripe
- [ ] Cupom 100% em prod → completa fluxo sem cobrança real
- [ ] Cupom inválido → mensagem de erro clara, sem 500

---

## 6. Área admin

- [ ] `/admin` com conta **aluno** (STUDENT) → redirect para `/403`
- [ ] `/403` renderiza "Acesso negado" e link "Voltar ao dashboard" (não 500)
- [ ] `/admin` com conta **admin** (ADMIN/MENTOR) → dashboard carrega com métricas
- [ ] `/admin/cursos` → lista de cursos carrega
- [ ] `/admin/turmas` → lista de turmas carrega com filtros de status
- [ ] `/admin/turmas/nova` → formulário de criação abre sem erros
- [ ] `/admin/usuarios` → tabela de usuários carrega
- [ ] `/admin/pagamentos` → tabela de pagamentos carrega
- [ ] `/admin/moderacao` → fila de comentários carrega

### 6.1 Refund admin (F7.4 + admin)

- [ ] `/admin/pagamentos` → localizar pagamento → clicar "Reembolsar"
- [ ] Dupla confirmação aparece (não basta um clique)
- [ ] Confirmar → Stripe Dashboard mostra refund
- [ ] Webhook `charge.refunded` processa em < 2 min
- [ ] `payments.status='REFUNDED'` (validar via SQL ou recarregar tabela)
- [ ] `cohort_members.status` muda para `REFUNDED` ou `EXPIRED` (conforme spec)
- [ ] Aluno: `/dashboard` não mostra mais a cohort; tentativa de acessar lesson → LockedContent (sem `video_id` no DOM)

---

## 7. Infraestrutura e edge cases

### 7.1 Webhook Stripe (F7.4)

- [ ] `POST /api/webhooks/stripe` sem header `Stripe-Signature` → responde `400` (não `500`)
- [ ] `POST /api/webhooks/stripe` com signature inválida → responde `400`
- [ ] **Idempotência:** disparar mesmo evento 2x via Stripe CLI (`stripe trigger checkout.session.completed`) ou re-send no Dashboard:
  - Webhook responde `200` nas duas chamadas
  - Tabela `webhook_events` tem 1 registro com `event_id` (dedupe)
  - `payments` tem **apenas 1** registro para o session_id
  - `cohort_members` tem **apenas 1** registro (sem duplicação)
- [ ] **Cross-extension (`charge.refunded` / `checkout.session.completed`):** quando aluno tem cohort_member ACTIVE em cohort target e compra cohort source com `cohort_cross_extensions` registro:
  - `cohort_members.expires_at` da target é estendido em `days_granted` dias
  - Email **MembershipExtendedEmail** enviado
- [ ] **`invoice.paid`** (auto-renovação): processa renovação, atualiza `expires_at`, envia AutoRenewalEmail
- [ ] **`invoice.payment_failed`**: envia PaymentFailedEmail, não estende prazo

### 7.2 Cron diário (F7.5)

- [ ] `/api/cron/daily` sem header `Authorization: Bearer CRON_SECRET` → responde `401`
- [ ] `/api/cron/daily` com bearer correto:
  ```bash
  curl -H "Authorization: Bearer $CRON_SECRET" https://DOMÍNIO/api/cron/daily
  ```
  - Responde `200` com JSON `{ expired, reminders: { d15, d7, d3 }, renewalsProcessed, liveReminders, errors: [] }`
  - `errors` vazio
- [ ] Vercel: cron schedule visível em Settings → Crons (`0 6 * * *`)
- [ ] Lembretes: aluno com `expires_at` em 15/7/3 dias recebe **ExpirationReminderEmail** (validar pelo menos 1 caso real próximo do prazo)

### 7.3 Outros

- [ ] `/certificado/v/CODIGO_INVALIDO` → exibe "Certificado inválido ou não encontrado" (não exibe certificado "válido")
- [ ] `/certificado/v/CODIGO_REAL` (de certificado gerado no teste) → exibe dados corretos do aluno
- [ ] `/403` — página carrega corretamente
- [ ] Qualquer rota protegida sem sessão → redirect para `/login` (não 500)

---

## 8. Emails transacionais (F7.6 + F8.2)

Validar entrega real (não bounce/spam) e renderização. Verificar via Resend dashboard `delivered` e abrir email cliente:

| Email | Trigger | Verificações |
|---|---|---|
| **WelcomeEmail** | cadastro novo | header From correto, link `/login` funciona |
| **PasswordResetEmail** | `/recuperar-senha` | link `/redefinir-senha?token=...` funciona |
| **AccessGrantedEmail** | webhook `checkout.session.completed` (entry) | lista cursos liberados, prazo, link `/dashboard`, `group_url` se houver |
| **MembershipExtendedEmail** | webhook (extension OU cross-extension) | menciona dias estendidos, novo `expires_at` |
| **AutoRenewalEmail** | webhook `invoice.paid` | confirma renovação automática, valor, próximo ciclo |
| **PaymentFailedEmail** | webhook `invoice.payment_failed` | CTA para atualizar cartão, sem culpar usuário |
| **ExpirationReminderEmail** | cron diário (D-15, D-7, D-3) | data exata de expiração, CTA estender |
| **PaymentReceiptEmail** | pós-checkout | recibo com NF/dados fiscais (se aplicável) |
| **LiveSessionReminderEmail** | cron horário antes da sessão | meeting_url só nesse email (não no DOM antes da janela) |
| **NewMaterialEmail** | upload de material em cohort ativa | link de download |
| **CertificateReadyEmail** | 100% conclusão de curso | link `/certificados` |

Verificações por email:
- Header `From` = `RESEND_FROM_EMAIL` (domínio verificado)
- Sem `[object Object]`, `undefined` ou variáveis não interpoladas
- Imagens carregam (logo, etc.)
- Links HTTPS válidos (não localhost)

---

## 9. /turmas LP públicas (F7.8)

- [ ] `/turmas` (listagem) — heading "Turmas disponíveis" + grid ou empty state
- [ ] `/turmas/[slug]` (detalhe) — preço entry e extension visíveis (validar contra Stripe Dashboard)
- [ ] CTA "Quero entrar" / "Matricular-se":
  - Sem login → redirect `/login?next=/checkout/[slug]`
  - Com login + sem histórico → checkout entry
  - Com login + histórico EXPIRED → checkout extension
- [ ] JSON-LD `Course` schema presente no `<head>` (verificar via DevTools)
- [ ] Página `/checkout/cancelado` renderiza quando aluno volta do Stripe sem completar

---

## Notas pós-teste

**Data de execução:** ___________
**Executado por:** ___________
**Ambiente:** produção / staging

**Itens com falha:**
(listar aqui qualquer check que não passou)

**Observações:**
