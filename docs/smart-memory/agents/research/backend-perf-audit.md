---
name: backend-perf-audit
description: Auditoria de performance server-side — API routes, Supabase queries, middleware, cache e Sentry (maio 2026)
metadata:
  type: project
  date: 2026-05-16
  agent: sites-dev-beta (Rexali)
---

# Auditoria de Performance Server-Side

## Tabela de Problemas

| Arquivo | Tipo de Problema | Severidade | Fix Proposto |
|---|---|---|---|
| `src/app/api/cron/hourly/route.ts` | N+1 severo: `getUserProfile()` chamado dentro de loop por membro — 2 queries de DB + 1 auth.admin por iteração | ALTA | Batch: buscar todos os profiles em uma query `.in('id', memberIds)`, depois map por id |
| `src/app/api/cron/daily/route.ts` | N+1 severo: mesmo padrão `getUserProfile()` em 2 loops aninhados (reminder por day + live sessions). Para cada membro: `auth.admin.getUserById` + `profiles.select` sequenciais | ALTA | Batch profiles + emails de uma vez antes dos loops |
| `src/app/api/cron/daily/route.ts` | Loop sequencial: `for (const days of reminderDays)` executa 3 queries de DB sequencialmente, cada uma com seu próprio loop de membros | MÉDIA | `Promise.all` para as 3 janelas de reminder |
| `src/app/(academy)/academy/(admin)/admin/turmas/[id]/page.tsx` | `auth.admin.listUsers({ perPage: 1000 })` — busca até 1000 usuários do auth sem paginação, bloqueia renderização da página de turma | ALTA | Carregar emails lazily no cliente via endpoint dedicado, ou limitar ao conjunto de members da turma |
| `src/app/(academy)/academy/(admin)/admin/usuarios/page.tsx` | `auth.admin.listUsers({ perPage: 1000 })` na Server Component — mesma issue | ALTA | Idem acima |
| `src/app/(academy)/academy/(admin)/admin/turmas/actions.ts` (2 lugares) | `auth.admin.listUsers({ perPage: 1000 })` dentro de Server Actions | MÉDIA | Extrair emails via RPC ou endpoint dedicado |
| `src/app/actions/lesson-reactions.ts:40` | `revalidatePath('/', 'layout')` — invalida **todo o layout root** a cada like/dislike de aula | ALTA | Usar `revalidatePath('/academy/curso/[slug]/aula/[slug]')` ou revalidação client-side (optimistic já existe) |
| `src/lib/actions/comments.ts` (linhas 72, 109, 147) | `revalidatePath('/', 'layout')` em add/edit/delete comment — invalida layout root inteiro em cada comentário | ALTA | Revalidar apenas a rota específica da aula |
| `src/app/actions/notifications.ts` (linhas 17, 30, 42) | `revalidatePath('/', 'layout')` em 3 ações de notificação | MÉDIA | Revalidar apenas `/academy/aluno` ou similar |
| `src/middleware.ts` | Query de profiles a cada request autenticado: `supabase.from('profiles').select('role, has_set_password')` no middleware — executa em **toda** rota matched | ALTA | Cachear role+has_set_password em cookie assinado ou JWT claim; só rebuscar na mudança |
| `src/app/(academy)/academy/(student)/forum/actions.ts:115-116` | `revalidatePath('/academy/forum')` duplicado na mesma função `createReply` | BAIXA | Remover chamada duplicada |
| `src/lib/auth/helpers.ts:18` | `profiles.select('*')` — busca todas as colunas do profile quando só precisa de `id, role, name, has_set_password` | BAIXA | Especificar colunas |
| `src/app/(academy)/academy/(admin)/admin/turmas/[id]/page.tsx` | `cohorts.select('*')`, `cohort_courses.select('*')`, `cohort_cross_extensions.select('*')`, `live_sessions.select('*')`, `coupons.select('*')` — todas com `*` | BAIXA | Selecionar só colunas usadas no componente |
| `src/app/api/cron/hourly/route.ts` | Query `live_sessions` sem `.is('reminder_1h_sent_at', null)` — filtra correctamente, mas `cohort_members` buscado separado por sessão (N queries) em vez de busca em batch | MÉDIA | Batch: buscar todos os members das sessões de uma vez |
| Sentry edge config | `tracesSampleRate: 0.2` em produção para edge (middleware) — mais alto que server (0.1), middleware roda em toda request | BAIXA | Reduzir para 0.05 ou menos em edge |

## Top 3 Quick Wins de Server Performance

### 1. `revalidatePath('/', 'layout')` em actions de aula (impacto imediato, altíssimo)

**Arquivos:** `lesson-reactions.ts`, `comments.ts`, `notifications.ts`

Cada like, comentário ou notificação invalida **todo o cache do layout root** — Next.js refaz o cache de todas as páginas da aplicação. Com múltiplos alunos simultâneos isso cria pressão de reconstrução contínua.

Fix: trocar por `revalidatePath('/academy/curso/[courseSlug]/aula/[lessonSlug]')` para reactions/comments, e `/academy/aluno` para notifications. Para reactions, o optimistic update client-side já existe — pode-se até remover a revalidação completamente.

### 2. Middleware executando query de profiles em toda request autenticada (maior gargalo de latência por request)

**Arquivo:** `src/middleware.ts:93-95`

O middleware faz `supabase.from('profiles').select('role, has_set_password')` para cada request, incluindo assets e API calls. Isso soma ~30-80ms de latência de DB a cada requisição autenticada.

Fix: armazenar `role` e `has_set_password` em claims do JWT (via Supabase hook `auth.on_jwt_claim`) ou em cookie assinado (HttpOnly, atualizado só na mudança de role). O middleware lê o cookie sem query.

### 3. `auth.admin.listUsers({ perPage: 1000 })` em páginas admin (bloqueia SSR, escala mal)

**Arquivos:** `admin/turmas/[id]/page.tsx`, `admin/usuarios/page.tsx`, `admin/turmas/actions.ts`

Busca até 1000 usuários do auth service na renderização da página. Com crescimento de usuários essa chamada fica mais lenta e pode timeout. Bloqueia toda a SSR.

Fix: remover do SSR. Carregar emails via fetch no cliente após render inicial (skeleton), ou criar endpoint `/api/admin/user-emails?ids=...` que busca apenas os IDs necessários.

## Observações sobre o que está bem

- Sentry `tracesSampleRate` em produção: 0.1 (server) — adequado
- Forum page: queries com `(count)` embutido — sem N+1 de counts
- Dashboard page: bem estruturado com queries sequenciais lógicas, uso de `Promise.all` onde faz sentido
- Cron routes: desabilitadas por padrão (`CRON_FALLBACK_ENABLED`) — mitigação correta
- Middleware: matcher explícito excluindo `_next` e `favicon` — correto
- `cache()` do React em `getCurrentUser` — bem usado para deduplicar dentro do request
- Zod em todas as boundaries externas — correto
