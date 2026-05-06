# joao-guirunas-site

Site pessoal + Plataforma de Cursos (Next.js 15 + Supabase).

---

## Setup local

```bash
pnpm install
cp .env.example .env.local
# Preencha .env.local com as chaves reais (ver seção abaixo)
pnpm dev
```

---

## Setup Supabase

### Pré-requisitos

- Supabase CLI instalada (`brew install supabase/tap/supabase`)
- Acesso ao projeto `mksmmpfyqowuzjcchhkl`

### Vincular projeto remoto

```bash
supabase link --project-ref mksmmpfyqowuzjcchhkl
```

### Aplicar migrations

```bash
# Aplicar todas as migrations no remoto
supabase db push

# Ver diff entre local e remoto (deve retornar vazio após push)
supabase db diff
```

### Popular dados demo

```bash
# Resetar banco e rodar seed.sql
supabase db reset --linked
```

### Gerar tipos TypeScript

Rode após **cada migration aplicada**:

```bash
pnpm db:types
# equivalente a:
# supabase gen types typescript --project-id mksmmpfyqowuzjcchhkl > types/database.ts
```

### Chaves necessárias (`.env.local`)

| Variável | Onde obter |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Settings → API → anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Settings → API → service_role (**nunca client-side**) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks |
| `VIMEO_ACCESS_TOKEN` | Vimeo → Settings → Apps |
| `RESEND_API_KEY` | Resend Dashboard → API Keys |

---

## Estrutura de migrations

```
supabase/
  migrations/          # SQL versionado — nunca editar arquivos existentes
  seed.sql             # Dados demo para desenvolvimento
  config.toml          # Configuração local do Supabase CLI
```

---

## Scripts

| Comando | Ação |
|---|---|
| `pnpm dev` | Dev server (Next.js Turbopack) |
| `pnpm build` | Build de produção |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript sem emitir |
| `pnpm db:types` | Regenerar tipos do schema Supabase |
