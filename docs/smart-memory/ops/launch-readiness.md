---
title: Launch Readiness
type: ops
updated: 2026-05-06
tags: [ops, launch, prontidão]
---

# Launch Readiness — 2026-05-06

## Completo

### Epic F1 — Fundação
- F1.1 Supabase link + env setup
- F1.2 Schema identidade + catálogo (courses, modules, lessons, profiles)
- F1.3 Schema cohorts (cohorts, cohort_members, cohort_courses, cross_extensions)
- F1.4 Schema pagamento + progresso + comunidade (payments, lesson_progress, certificates, forum, comments)
- F1.5 has_access() + RLS policies (função PL/pgSQL + 21 tabelas com RLS)
- F1.6 Storage buckets + policies (avatars, materials, certificates)
- F1.7 Seed dados demo
- F1.8 Tipos TS + clients Supabase (types/database.ts gerado, lib/supabase/{client,server,admin}.ts)

### Epic F2 — Auth
- F2.1 Auth Supabase providers + clientes (email/senha + OAuth Google/GitHub)
- F2.2 Páginas de auth (/login, /cadastro, /recuperar-senha, /redefinir-senha)
- F2.3 Middleware RBAC + helpers (requireUser, requireAdmin, requireRole)
- F2.4 Emails Resend — WelcomeEmail + PasswordResetEmail

### Epic F3 — Conteúdo
- F3.1 Video adapter + Vimeo (interface VimeoAdapter, domain whitelist)
- F3.2 VideoPlayer + saveProgress (componente com tracking de progresso)
- F3.3 Página da aula com has_access + LockedContent (guard server-side)
- F3.4 Renderização triplo formato MDX/HTML/Markdown
- F3.5 Shell das páginas do aluno (/dashboard, /meus-cursos, /curso/[slug])

### Epic F4 — Engajamento
- F4.1 Comments nas aulas (CommentsSection com threads + respostas + editar/excluir)
- F4.2 Materials + signed URL (downloads seguros via Supabase storage)

### Epic F5 — Comunidade
- F5.1 Forum UI shell + Server Actions + integração real
- F5.2 Agenda UI shell (/agenda com live sessions)
- F5.3 Certificados PDF + página pública de verificação (/certificado/v/[code])

### Epic F6 — Admin
- F6.1 Admin Dashboard com métricas (receita, alunos ativos, comentários, pagamentos recusados)
- F6.2 CRUD courses/modules/lessons com editor TipTap
- F6.3 CRUD de cohorts — criação/edição com 9 seções, checklist hierárquico de cursos, cross-extensions
- F6.4 Usuários + Pagamentos + Moderação admin (tabelas com filtros, reembolso com dupla confirmação, CSV export, moderação de comentários e fórum)

### Epic F7 — Pagamentos
- F7.1 Payment adapter Stripe (interface abstrata)
- F7.2 Sync Cohort ↔ Stripe Product/Price
- F7.3 Checkout session entry/extension (criação de sessão Stripe)
- F7.4 Webhook Stripe + cross-extensions (payment_intent events, auto-grant cross-ext)
- F7.5 Auto-renewal + cron (/api/cron/daily com CRON_SECRET)
- F7.6 Emails de pagamento (PaymentApproved, PaymentFailed, AutoRenewal, MembershipExtended, ExpirationReminder)
- F7.7 /perfil — histórico de pagamentos, matrículas ativas/expiradas, toggle renovação automática
- F7.8 LP /turmas com cohorts públicas (grid + CTA sem login → /login?next=)

### Epic F8 — Qualidade
- F8.1 NotificationBell + onboarding wizard
- F8.2 Emails restantes (LiveSessionReminder, NewMaterial, CertificateReady)
- F8.3 Mobile responsiveness + acessibilidade WCAG AA
- F8.4 Observabilidade: Sentry + Vercel Analytics
- F8.5 E2E Playwright: 21 testes passando (auth, lesson-access, checkout, admin)

---

## Concerns documentados (não bloqueantes)

- **F4.1.b — Comments sem persistência real**: CommentsSection usa Server Actions (addComment/editComment/deleteComment) mas os comentários podem não estar retornando do banco após submit sem revalidatePath. Workaround: page reload atualiza. Task #58 registrada.
- **/agentes mobile — FAIL QA (2026-05-05)**: Belt scroll-driven sem fallback mobile, vw não atualiza em resize, SquadSideNav cobre conteúdo. Não impacta a plataforma de cursos (rota separada do site institucional). Task de fix registrada pelo QA.
- **F5.3.b — Certificate forgery**: /certificado/v/[code] pode retornar "válido" mesmo com código adulterado se a query não fizer verificação server-side adequada. Task #57 in progress.
- **Token CSS órfão `--color-cat-squads`**: Definido em globals.css mas sem consumo. Housekeeping futuro.

---

## Pendente de ação

- **F5.3.b — Certificate forgery fix**: query real no /certificado/v/[code] — task #57 in progress
- **F4.1.b — Comments com persistência real no Supabase** — task #58 pendente
- **Domínio de produção** — aguardando João configurar DNS no Vercel
- **Variáveis de ambiente prod** — checklist na seção abaixo (F8.6 pendente)
- **F8.6 — Deploy Vercel + domínio** — task #47 pendente

---

## Variáveis de ambiente obrigatórias para prod

Todas abaixo são **obrigatórias**. As marcadas com `*` são expostas ao browser via `NEXT_PUBLIC_`.

| Variável | Serviço | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` * | Supabase | Sim |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` * | Supabase | Sim |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | Sim |
| `NEXT_PUBLIC_APP_URL` * | App | Sim (usado em webhooks + emails) |
| `STRIPE_SECRET_KEY` | Stripe | Sim |
| `STRIPE_PUBLISHABLE_KEY` | Stripe | Sim |
| `STRIPE_WEBHOOK_SECRET` | Stripe | Sim (validação de assinatura) |
| `RESEND_API_KEY` | Resend | Sim |
| `RESEND_FROM_EMAIL` | Resend | Sim (ex: noreply@domínio.com) |
| `VIMEO_ACCESS_TOKEN` | Vimeo | Sim (player + domain whitelist) |
| `VIMEO_DOMAIN_WHITELIST` | Vimeo | Sim (domínio prod sem https://) |
| `CRON_SECRET` | App | Sim (protege /api/cron/daily) |
| `NEXT_PUBLIC_SENTRY_DSN` * | Sentry | Recomendado |
| `SENTRY_DSN` | Sentry | Recomendado |
| `SENTRY_AUTH_TOKEN` | Sentry | Recomendado (source maps) |
| `NODE_ENV` | App | Sim (production) |

---

## Checks de infra pré-deploy

- [ ] Supabase: migrations aplicadas (`supabase db push --linked`)
- [ ] Supabase: `seed.sql` NÃO executado em prod (dados de demo apenas em staging)
- [ ] Supabase: RLS habilitado em todas as 21 tabelas (verificar no dashboard)
- [ ] Supabase: storage buckets criados (`avatars`, `materials`, `certificates`)
- [ ] Stripe: webhook endpoint cadastrado para `https://DOMÍNIO/api/webhooks/stripe`
- [ ] Stripe: eventos habilitados no webhook (`payment_intent.succeeded`, `payment_intent.payment_failed`, `checkout.session.completed`)
- [ ] Stripe: produtos/preços sincronizados via `/admin/turmas` (botão sync)
- [ ] Resend: domínio verificado para envio (SPF + DKIM configurados)
- [ ] Resend: endereço `RESEND_FROM_EMAIL` com domínio verificado
- [ ] Vercel: todas as env vars configuradas (ver tabela acima)
- [ ] Vercel: cron job ativado em `vercel.json` (`/api/cron/daily` — plano Pro ou superior)
- [ ] Vimeo: domínio de produção adicionado à whitelist do player
- [ ] Sentry: projeto criado, DSN configurado, source maps habilitados
- [ ] DNS: domínio prod apontando para Vercel (A record ou CNAME)
- [ ] HTTPS: certificado TLS ativo no Vercel (automático via Let's Encrypt)
