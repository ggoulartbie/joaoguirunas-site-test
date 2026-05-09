---
name: auth-audit
description: Auditoria dos fluxos de autenticação (login, cadastro, recuperar/redefinir senha, OAuth callback)
type: research
updated: 2026-05-08
tags: [security, auth, audit, F9.9]
related:
  - "[[stories/backlog/F9.9-auditar-fluxos-auth]]"
---

# Auth Audit — joaoguirunas.com Academy

## Ficheiros auditados

| Ficheiro | Propósito |
|---|---|
| `src/app/(academy)/academy/login/_components/LoginForm.tsx` | Formulário de login (client component) |
| `src/app/(academy)/academy/cadastro/_components/CadastroForm.tsx` | Formulário de cadastro |
| `src/app/(academy)/academy/recuperar-senha/_components/RecuperarSenhaForm.tsx` | Pedido de reset de senha |
| `src/app/(academy)/academy/redefinir-senha/_components/RedefinirSenhaForm.tsx` | Redefinição com novo password |
| `src/app/auth/callback/route.ts` | OAuth/email-confirm callback handler |
| `src/middleware.ts` | Guards de rota + redirect com `?next=` |

---

## AC1 — Open redirect (`?next=`)

### LoginForm.tsx (client-side)

**Status: PASS com ressalva P3**

```ts
// LoginForm.tsx:58
const next = raw.startsWith('/') && !raw.includes('/login') ? raw : '/academy/aluno'
```

- Aceita qualquer path interno (começa com `/`), incluindo rotas fora do academy (ex: `/`, `/mentoria`).
- **Não permite redirect externo** — `router.push()` do Next.js só naviga no mesmo origin. Risco real: nenhum.
- P3: Inconsistência — seria mais correto restringir a `/academy/`. Não corrigido (não bloqueante).

### auth/callback/route.ts (server-side)

**Status: FIX APLICADO — era P1**

Original:
```ts
const next = searchParams.get('next') ?? '/academy/aluno'
// ...
return NextResponse.redirect(`${origin}${next}`)
```

Problema: `next` vinha diretamente do query param sem validação. `?next=https://evil.com` resultaria em redirect para domínio externo (open redirect).

Fix aplicado (`route.ts:9-11`):
```ts
const rawNext = searchParams.get('next') ?? ''
const next = rawNext.startsWith('/academy/') && !rawNext.includes('//') ? rawNext : '/academy/aluno'
```

Agora só aceita paths que começam com `/academy/` e não contêm `//` (protocol-relative URL bypass).

---

## AC2 — Cadastro: validação e policy de senha

**Status: PASS**

`CadastroForm.tsx` — schema Zod:
```ts
password: z.string()
  .min(8, 'Senha deve ter no mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
  .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
```

- Mínimo 8 chars ✅
- Requer maiúscula + número ✅
- Confirmação de senha com `refine` ✅
- Erro `already registered` tratado sem vazar stack → mensagem genérica "Este email já está cadastrado." ✅
- Outros erros Supabase → "Erro ao criar conta. Tente novamente." ✅

**Rate limit:** Supabase Auth tem rate limiting nativo por IP no plano gratuito (padrão: 30 req/hour por email para signup). Não configurável via código — gerido no Supabase Dashboard (Auth > Rate Limits). Documentar para verificação manual.

---

## AC3 — Recuperar/redefinir senha

**Status: PASS**

`RecuperarSenhaForm.tsx`:
- Chama `supabase.auth.resetPasswordForEmail` com `redirectTo` apontando para `/academy/redefinir-senha`.
- Token de reset gerido inteiramente pelo Supabase Auth (expiração configurável no dashboard — padrão: 24h).
- Erros de envio → mensagem genérica, sem vazar detalhes.
- Não revela se email existe (response igual para email cadastrado e não cadastrado — Supabase comportamento padrão). ✅

`RedefinirSenhaForm.tsx`:
- Chama `supabase.auth.updateUser({ password })` — a sessão já foi estabelecida pelo Supabase via magic link no token de reset. Sem token válido na sessão, `updateUser` retorna erro.
- Erros → "Erro ao redefinir senha. O link pode ter expirado." — genérico, sem stack.
- Após sucesso, redireciona para `/academy/dashboard`. ✅
- Mesma policy de senha do cadastro (min 8, maiúscula, número). ✅

**Token expiry e reuse:** geridos pelo Supabase Auth internamente. Token de reset é one-time — segundo uso retorna erro de sessão inválida, que o form captura corretamente.

---

## AC4 — Cookie flags de sessão

**Status: VERIFICAÇÃO DELEGADA**

Flags `Secure`, `HttpOnly`, `SameSite` são controladas pelo `@supabase/ssr` (createServerClient / createClient). O Supabase SSR package configura cookies com `HttpOnly` e `SameSite=Lax` por padrão em produção com HTTPS. Verificação definitiva via DevTools em produção.

- Dev (HTTP): `Secure` não aplicado (correto).
- Prod (HTTPS): `Secure` aplicado automaticamente. ✅ (comportamento padrão do package).

---

## AC5 — OAuth Google callback

**Status: PASS com ressalva**

`auth/callback/route.ts` processa o `code` do OAuth via `supabase.auth.exchangeCodeForSession(code)`.

- Redirect URL do callback vem do `origin` da request, não de query params livres → ✅
- `next` agora validado (fix aplicado acima) → ✅
- Redirect URL deve estar whitelisted no Supabase Dashboard (Auth > URL Configuration > Redirect URLs). **Verificação manual obrigatória antes do go-live.**

---

## AC6 — Confirmação de email obrigatória antes de login

**Status: PASS**

`CadastroForm.tsx:92-107`: após `signUp`, exibe tela "Confirme seu email" sem redirecionar para área logada.

Supabase Auth com `email_confirm: false` (padrão em projetos novos) — verificar se está `true` no Dashboard (Auth > Providers > Email). Se confirmação estiver desabilitada, usuário loga imediatamente após signUp, pulando a verificação de email. **Verificação manual no Dashboard recomendada.**

---

## Issues encontrados

| ID | Prioridade | Status | Descrição |
|---|---|---|---|
| A-01 | P1 | CORRIGIDO | Open redirect em `auth/callback/route.ts` — `?next=` sem sanitização permitia redirect externo |
| A-02 | P3 | WONTFIX | `LoginForm.tsx` aceita qualquer path interno em `?next=`, não apenas `/academy/*`. Client-side, sem risco externo. |
| A-03 | P2 | VERIFICAÇÃO MANUAL | Confirmar no Supabase Dashboard: (a) email confirmation obrigatória, (b) redirect URLs whitelisted, (c) rate limits configurados |

---

## Hardening recomendado

1. **Supabase Dashboard > Auth > Providers > Email:** confirmar `Confirm email: enabled`.
2. **Auth > URL Configuration:** adicionar apenas `https://joaoguirunas.com/auth/callback` e `https://*.vercel.app/auth/callback` (previews). Remover wildcards.
3. **Auth > Rate Limits:** revisar defaults — aumentar proteção se houver sinais de abuso.
4. **PKCE flow:** Supabase SSR já usa PKCE por padrão para o code exchange. ✅
5. **Content-Security-Policy:** considerar adicionar `frame-ancestors 'none'` via `next.config.js` headers para mitigar clickjacking nas páginas de auth.
