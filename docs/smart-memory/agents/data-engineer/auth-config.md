---
title: "Auth Config — Supabase Manual Setup"
type: runbook
agent: sites-dev-beta
updated: 2026-05-06
tags: [auth, supabase, google-oauth, configuracao-manual]
---

# Configuração Manual do Supabase Auth

Estas configurações residem no painel Supabase e não em código. Devem ser aplicadas uma vez por ambiente (local via `supabase/config.toml`, staging e produção via painel web).

## Projeto

- **Project ID:** `mksmmpfyqowuzjcchhkl`
- **Painel:** https://supabase.com/dashboard/project/mksmmpfyqowuzjcchhkl/auth/providers

---

## 1. Provider Email/Senha

| Setting | Valor |
|---|---|
| Enable Email provider | ✅ |
| Confirm email | ✅ (obrigatório — aluno não acede sem confirmar) |
| Secure email change | ✅ |
| Double confirm email changes | ✅ |

**Templates de email do Supabase** (painel → Auth → Email Templates):
- Confirmation email: usa `{{ .ConfirmationURL }}` — redireciona para `/auth/callback?code=...`
- Reset password: usa `{{ .ConfirmationURL }}` — redireciona para `/academy/redefinir-senha`
- Templates custom via Resend estão em F2.4; enquanto não activos, usar templates default do Supabase.

---

## 2. Provider Google OAuth

### Passos no Google Cloud Console

1. Aceder https://console.cloud.google.com — projecto João Guirunas
2. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
3. Application type: **Web application**
4. Authorized redirect URIs:
   - `https://mksmmpfyqowuzjcchhkl.supabase.co/auth/v1/callback`
5. Copiar **Client ID** e **Client Secret**

### Passos no Supabase

Painel → Auth → Providers → Google:

| Setting | Valor |
|---|---|
| Enable Google provider | ✅ |
| Client ID | (do Google Cloud Console) |
| Client Secret | (do Google Cloud Console) |

---

## 3. Site URL e Redirect URLs

Painel → Auth → URL Configuration:

| Setting | Valor |
|---|---|
| Site URL | `https://joaoguirunas.com` (prod) / `http://localhost:3000` (local) |
| Redirect URLs | Ver lista abaixo |

**Redirect URLs permitidas:**
```
http://localhost:3000/**
https://*.vercel.app/**
https://joaoguirunas.com/**
```

A rota de callback no código é `/auth/callback` (em `src/app/auth/callback/route.ts`).

---

## 4. SMTP (Resend)

Painel → Auth → SMTP Settings:

| Setting | Valor |
|---|---|
| Enable custom SMTP | ✅ (após verificar domínio no Resend) |
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | RESEND_API_KEY |
| Sender email | `noreply@mail.joaoguirunas.com` |

Enquanto o domínio não estiver verificado no Resend, usar SMTP nativo do Supabase (funciona para MVP).

---

## 5. Trigger handle_new_user (AC5 F2.1)

O trigger `handle_new_user` foi criado em F1.2 e está activo. Verifica:

```sql
SELECT tgname, tgenabled FROM pg_trigger
WHERE tgname = 'on_auth_user_created';
```

Comportamento esperado: ao criar user em `auth.users`, o trigger insere automaticamente em `public.profiles` com `role = 'STUDENT'` e `name` do `raw_user_meta_data`.

---

## 6. Variáveis de ambiente necessárias

```env
NEXT_PUBLIC_SUPABASE_URL=https://mksmmpfyqowuzjcchhkl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000  # ou URL de produção
```
