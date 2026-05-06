---
title: "Email Templates — Resend + React Email"
type: reference
agent: sites-dev-beta
updated: 2026-05-06
tags: [email, resend, react-email, templates, transacional]
---

# Email Templates da Plataforma

Todos os templates estão em `emails/templates/` e são React Email components.
O helper de envio está em `src/lib/email/send.ts`.

**Provedor:** Resend  
**Variáveis de ambiente:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`  
**From padrão:** `RESEND_FROM_EMAIL` env var (fallback `noreply@example.com`)

---

## Templates activos

| Arquivo | Função de envio | Subject | Disparado por |
|---|---|---|---|
| `WelcomeEmail.tsx` | `sendWelcomeEmail(to, name)` | "Bem-vindo à plataforma" | `auth/callback/route.ts` — primeiro login após confirmação de email |
| `PasswordResetEmail.tsx` | `sendPasswordResetEmail(to, name, resetUrl)` | "Redefinir sua senha" | Disponível; Supabase dispara email nativo por padrão (substituir quando SMTP custom activo) |
| `PaymentApprovedEmail.tsx` | `sendPaymentApprovedEmail(to, name, cohortName)` | "Acesso liberado — {cohort}" | Webhook Stripe — payment_intent.succeeded (Fase 7) |
| `PaymentFailedEmail.tsx` | `sendPaymentFailedEmail(to, name, cohortName)` | "Problema no pagamento da sua renovação" | Webhook Stripe — invoice.payment_failed (Fase 7) |
| `AutoRenewalEmail.tsx` | `sendAutoRenewalEmail(to, name, cohortName, newExpiresAt)` | "Matrícula renovada — {cohort}" | Webhook Stripe — subscription renovada (Fase 7) |
| `MembershipExtendedEmail.tsx` | `sendMembershipExtendedEmail(to, name, cohortName, newExpiresAt)` | "Acesso estendido — {cohort}" | Webhook Stripe — cross-extension aplicada (Fase 7) |
| `ExpirationReminderEmail.tsx` | `sendExpirationReminderEmail(to, name, cohortName, daysLeft, expiresAt, renewUrl)` | "Seu acesso a {cohort} expira em {N} dias" | Vercel Cron (Fase 7) — 30, 7, 1 dias antes |
| `WelcomeToCohortEmail.tsx` | `sendWelcomeToCohortEmail(to, name, cohortName, startDate)` | "Bem-vindo à turma {cohort}!" | Admin ao adicionar membro à turma (Fase 6) |
| `NewMaterialEmail.tsx` | `sendNewMaterialEmail(to, name, cohortName, materialTitle, lessonTitle)` | "Novo material disponível — {cohort}" | Admin ao publicar material (Fase 6) |
| `LiveSessionReminderEmail.tsx` | `sendLiveSessionReminderEmail(to, name, cohortName, sessionTitle, scheduledAt, durationMinutes, meetingUrl)` | "Lembrete: {session} — amanhã" | Vercel Cron — 24h antes da sessão (Fase 7) |
| `CertificateReadyEmail.tsx` | `sendCertificateReadyEmail(to, name, courseName, cohortName, verificationCode)` | "Seu certificado de {curso} está pronto" | Geração de certificado (Fase 9) |

---

## Design dos templates

- **Paleta:** `#050507` (background), `#0e0e11` (card), `#ff3a0e` (ember/accent), `#f1f1f3` (bone)
- **Tipografia:** Georgia/serif italic para headings (simula Fraunces), Courier New para labels mono
- **Logo:** Texto "JG" em ember + "ACADEMY" em mono
- **Sem imagens externas** — compatibilidade máxima com clientes de email

---

## Configuração Resend

1. Verificar domínio `mail.joaoguirunas.com` (ou subdomínio) no painel Resend
2. Adicionar registos SPF/DKIM ao DNS
3. Definir `RESEND_FROM_EMAIL=noreply@mail.joaoguirunas.com`

Em desenvolvimento, usar Resend em modo sandbox (key `re_...` de test) — emails não são entregues mas ficam no log do painel.

---

## Templates pendentes (fases futuras)

| Template | Fase | Descrição |
|---|---|---|
| Expiração próxima (cron) | Fase 7 | Já existe `ExpirationReminderEmail` — falta ligar ao cron |
| Lembrete de sessão (cron) | Fase 7 | Já existe `LiveSessionReminderEmail` — falta ligar ao cron |
