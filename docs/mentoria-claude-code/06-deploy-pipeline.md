---
title: Pipeline de Deploy — joaoguirunas.com
type: ops-doc
updated: 2026-05-17
tags: [devops, deploy, vercel, supabase]
---

# Pipeline de Deploy

## Stack de deploy

| Camada | Tecnologia | Observação |
|---|---|---|
| Frontend | Next.js 16 (app router) | `next dev --turbopack` em dev |
| Runtime | React 19 | Server Components + Client Components |
| Package manager | pnpm | `pnpm-workspace.yaml` define packages permitidos |
| Deploy | Vercel (auto via GitHub) | Push para `main` dispara deploy automático |
| Banco | Supabase (PostgreSQL 15) | Migrations via Supabase CLI |
| Monitoramento | Sentry | Source maps uploadados apenas em CI/prod |
| Analytics | Vercel Analytics + Speed Insights | Injetados via pacotes `@vercel/analytics` |

Deploy automático: qualquer push para `main` → Vercel detecta, executa `pnpm build`, publica.
Não há GitHub Actions configurados — o CI é inteiramente gerenciado pelo Vercel.

---

## Scripts disponíveis e quando usar cada um

```bash
pnpm dev              # Dev local com Turbopack — porta 3000
pnpm dev:restart      # Mata porta 3000 antes de subir (resolver conflito de processo)
pnpm build            # Build de produção (Next.js) — obrigatório antes de push
pnpm start            # Sobe build de prod localmente — útil para smoke test pós-build
pnpm lint             # ESLint via next lint
pnpm typecheck        # tsc --noEmit — sem emitir arquivos
pnpm db:types         # Regenera types/database.ts via supabase gen types
pnpm email:preview    # Preview de emails Resend — porta 3002
pnpm test:e2e         # Playwright headless
pnpm test:e2e:ui      # Playwright com UI interativa
```

**Regra de ouro:** nunca push sem `pnpm lint && pnpm typecheck && pnpm build` passando na máquina local.

---

## Variáveis de ambiente necessárias para academy funcionar

Todas as vars abaixo devem estar configuradas no Vercel (Settings → Environment Variables) para que as rotas da academy funcionem em produção.

### Obrigatórias (sem estas, build ou runtime quebra)

| Variável | Onde obter | Observação |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API | Público — aparece no bundle cliente |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API | Público — respeita RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API | CRÍTICO: apenas server-side. Bypassa RLS |
| `STRIPE_SECRET_KEY` | Stripe → Developers → API Keys | `sk_live_` em prod, `sk_test_` em dev |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks | `whsec_` — valida assinatura dos eventos |
| `RESEND_API_KEY` | resend.com → API Keys | Para envio de emails transacionais |
| `RESEND_FROM_EMAIL` | resend.com | Domínio de envio deve estar verificado |
| `NEXT_PUBLIC_APP_URL` | — | URL pública do site (ex: `https://joaoguirunas.com`) |
| `CRON_SECRET` | `openssl rand -hex 32` | Autentica endpoint `/api/cron/daily` |

### Opcionais (funcionalidades degradam sem elas)

| Variável | Para que serve |
|---|---|
| `VIMEO_ACCESS_TOKEN` | Player de vídeo nas aulas |
| `VIMEO_DOMAIN_WHITELIST` | Domínios autorizados a embedar vídeos Vimeo |
| `NEXT_PUBLIC_SENTRY_DSN` | Captura de erros no cliente |
| `SENTRY_DSN` | Captura de erros no servidor |
| `SENTRY_AUTH_TOKEN` | Upload de source maps em CI |

**Nota sobre dev local:** `VIMEO_DOMAIN_WHITELIST` deve incluir `localhost` para que o player funcione em dev. Essa config é feita no painel do Vimeo, não via env var.

---

## Supabase migrations — como aplicar em prod

O projeto usa Supabase CLI com migrations versionadas em `supabase/migrations/`.

### Fluxo padrão (nova migration)

```bash
# 1. Criar arquivo de migration (timestamp + slug)
supabase migration new minha-migration

# 2. Editar o arquivo SQL gerado em supabase/migrations/

# 3. Testar localmente (opcional — requer Docker)
supabase db reset

# 4. Aplicar em produção
supabase db push

# 5. Regenerar tipos TypeScript após mudança de schema
pnpm db:types
# Obs: o script aponta para project-id mksmmpfyqowuzjcchhkl
# Se falhar (sem SUPABASE_ACCESS_TOKEN), use o painel:
# Supabase → Settings → API → Download types
```

### Migrations já aplicadas em prod (últimas 10)

```
20260510050000_cohorts_infinitepay_checkout_url.sql
20260511000000_user_delete_fk_cascade.sql
20260511100000_decrement_filled_seats.sql
20260511110000_user_has_password.sql
20260511120000_profiles_has_set_password.sql
20260515100000_password_reset_temp.sql
20260515100100_password_reset_temp_hardening.sql
20260516100000_aulas_v2_summary_transcript_reactions.sql
20260516200000_soft_delete_aware_slug_uniqueness.sql
20260516210000_module_materials.sql
```

### Regras críticas

- Nunca editar migrations já aplicadas em prod — criar nova migration para corrigir.
- Schema decisions que afetam RLS passam por aprovação via ADR antes de `supabase db push`.
- Após migration com novos campos/tabelas: sempre regenerar `types/database.ts` e fazer `pnpm typecheck`.

---

## Fluxo de commit → push → deploy automático

```
Código local
    ↓
pnpm lint && pnpm typecheck && pnpm build   ← checklist local obrigatório
    ↓
git add <arquivos específicos>
git commit -m "type(scope): descrição"
    ↓
git push -u origin <branch>
    ↓ (se branch = main)
Vercel detecta push → executa pnpm build → deploy automático
    ↓
joaoguirunas.com atualizado (~60–120s)
```

**Branches e PRs:**
- `main` — produção. Push direto apenas para hotfix crítico ou após merge de PR.
- `feat-*` — feature branches. Requerem PR e autorização explícita de João para merge.
- Merge via `gh pr merge --squash` ou `--merge` conforme padrão da story.

**Fluxo com PR (padrão para features):**
```
feat-branch → PR criado via gh → João aprova → merge para main → deploy automático
```

---

## Checklist pré-commit

Execute na ordem — não pular etapas:

```bash
# 1. Lint
pnpm lint

# 2. Typecheck
pnpm typecheck

# 3. Build de produção
pnpm build

# 4. Verificar status do git (sem arquivos sensíveis)
git status
git diff --stat

# 5. Staging seletivo (nunca git add -A)
git add src/... docs/...   # arquivos específicos

# 6. Commit com mensagem convencional
git commit -m "type(scope): descrição"
```

**Tipos de commit:**
- `feat` — nova funcionalidade
- `fix` — bug fix
- `chore` — manutenção, docs, cleanup
- `refactor` — refatoração sem mudança de comportamento
- `test` — testes

**Arquivos que nunca entram no commit:**
- `.env`, `.env.local`, `.env.*.local`
- `node_modules/`
- `.vercel/`
- `types/database.ts` regenerado em dev (pode entrar se regenerado em contexto de story)

---

## Observações operacionais

- **Vercel Hobby plan:** sem suporte a Cron Jobs na plataforma. Toda lógica agendada usa `pg_cron` no Supabase + Edge Functions.
- **Redirect de domínio:** `vercel.json` redireciona `opensource.growthsales.ai/*` para `joaoguirunas.com/*` permanentemente.
- **Sentry:** source maps são uploadados apenas quando `process.env.CI` está definido (build no Vercel), não em dev local.
- **pnpm-workspace.yaml:** define `allowBuilds` para pacotes com native bindings (`sharp`, `esbuild`, `@sentry/cli`, `@tsparticles/engine`).
