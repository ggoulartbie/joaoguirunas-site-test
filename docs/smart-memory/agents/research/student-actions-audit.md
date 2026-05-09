---
name: student-actions-audit
description: Auditoria das Server Actions do aluno — auth guards, Zod, anti-IDOR, RLS
type: research
updated: 2026-05-08
tags: [security, server-actions, rls, audit, F9.8]
related:
  - "[[stories/backlog/F9.8-auditar-server-actions-aluno-rls]]"
---

# Student Server Actions Audit

## Inventário completo

| Ficheiro | Actions | Auth guard |
|---|---|---|
| `src/app/(academy)/academy/(student)/forum/actions.ts` | `createThread`, `createReply`, `voteThread`, `markAsAccepted` | `requireActiveMember()` ou `requireUser()` |
| `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/material-actions.ts` | `downloadMaterialAction` | Via `getMaterialSignedUrl` → `createClient().auth.getUser()` |
| `src/app/actions/progress.ts` | `saveProgress`, `markLessonComplete`, `toggleLessonComplete`, `getLessonProgress` | `requireUser()` |
| `src/app/actions/profile.ts` | `updateProfile`, `changePassword` | `requireUser()` |
| `src/app/actions/notifications.ts` | `markNotificationRead`, `markAllNotificationsRead`, `completeOnboarding` | `requireUser()` |
| `src/app/actions/autoRenewal.ts` | `enableAutoRenewal`, `disableAutoRenewal` | `requireUser()` + ownership via `.eq('user_id', user.id)` |
| `src/app/actions/checkout.ts` | `createCheckoutSession` | `supabase.auth.getUser()` + `user.id !== userId` check |
| `src/app/actions/checkoutPublic.ts` | `createPublicCheckoutSession` | Público por design — sem auth |
| `src/app/actions/certificate.ts` | `issueCertificate`, `checkAndIssueCertificate` | `requireAdmin()` / chamada interna |

---

## AC2 — Verificação por action

### forum/actions.ts

**`createThread` / `createReply` / `voteThread`**
- Guard: `requireActiveMember()` — checa `requireUser()` + `cohort_members.status='ACTIVE'`. ✅
- Payload validado com Zod antes de qualquer DB write. ✅
- `author_id` inserido como `userId` retornado por `requireActiveMember()`, nunca do payload. ✅
- Erros: retorna `{ error: string }` genérico. ✅

**`markAsAccepted`**
- Guard: `requireUser()` + verifica `forum_threads.author_id === user.id`. ✅
- Ownership check explícito — impossível aceitar resposta de thread de outro usuário. ✅

### material-actions.ts

**`downloadMaterialAction`**
- Delega para `getMaterialSignedUrl(materialId)` em `src/lib/storage/materials.ts`.
- Dentro: `createClient().auth.getUser()` → lança erro se não autenticado. ✅
- Valida acesso via `supabase.rpc('has_access', ...)` + bypass para ADMIN. ✅
- Signed URL com expiração de 5 minutos. ✅
- `materialId` não validado com Zod — P3: aceita qualquer string. RLS + `has_access` protegem, mas seria melhor validar UUID.

### progress.ts

**`saveProgress` / `markLessonComplete` / `toggleLessonComplete`**
- Guard: `requireUser()` na primeira linha. ✅
- `user_id` no upsert vem de `user.id` (requireUser), nunca do payload. ✅
- `lessonId` não validado com Zod — P3. RLS protege cross-user, mas UUID validation seria melhor.
- `supabaseAdmin` em `triggerCertificateCheck` — apenas lê dados do sistema (lessons, cohort_members), não escreve em nome de user sem ownership. ✅

**`getLessonProgress`**
- Usa `createClient()` (anon key + RLS), não `supabaseAdmin`. ✅ — RLS garante que só retorna dados do próprio user.

### profile.ts

**`updateProfile`**
- Guard: `requireUser()`. ✅
- UPDATE com `.eq('id', user.id)` — impossível editar perfil de outro. ✅
- Erros Supabase → mensagem genérica. ✅

**`changePassword`**
- Usa `supabase.auth.updateUser()` — atualiza sessão atual. ✅
- Validação de mínimo 8 chars no código. ✅ (consistency com policy do cadastro)

### notifications.ts

**`markNotificationRead`**
- `.eq('user_id', user.id)` na query de update — não permite marcar notificação de outro. ✅

**`completeOnboarding`**
- UPDATE com `.eq('id', user.id)`. ✅
- Campos `name` e `bio` sem validação de comprimento — P3. Pode inserir strings muito longas.

### autoRenewal.ts

**`enableAutoRenewal`**
- Guard: `requireUser()`. ✅
- Membership buscada com `.eq('user_id', user.id)` — ownership garantido. ✅
- Usa `supabaseAdmin` apenas para writes finais (`cohort_members.update`, `payments.update`) — em contexto onde ownership já validado. ✅

**`disableAutoRenewal`**
- Guard: `requireUser()`. ✅
- Membership verificada com `.eq('user_id', user.id)`. ✅

### checkout.ts / checkoutPublic.ts

**`createCheckoutSession` (autenticado)**
- Verifica `user.id !== userId` — impede criar sessão para outro user. ✅
- `userId` vem do argumento mas validado contra sessão real.

**`createPublicCheckoutSession`**
- Público por design — sem auth. Correto para compra sem conta. ✅

---

## AC4 — Ownership checks analógicos

| Cenário | Verificação | Status |
|---|---|---|
| Editar perfil próprio | `.eq('id', user.id)` em `updateProfile` | ✅ |
| Marcar lesson concluída só do próprio | `user_id` de `requireUser()` no upsert | ✅ |
| Marcar notificação lida | `.eq('user_id', user.id)` | ✅ |
| Aceitar resposta no fórum | Verifica `thread.author_id === user.id` | ✅ |
| Download de material | `has_access` RPC + auth check | ✅ |
| Votar em thread | `requireActiveMember()` + toggle via userId | ✅ |

---

## AC5 — Duplicação de `requireActiveMember()`

`requireActiveMember()` está definida APENAS em `forum/actions.ts:9-25` — não foi extraída para `src/lib/auth/helpers.ts`.

**Avaliação:** função usada somente pelo fórum, que é o único contexto onde "active membership" é exigida além de estar autenticado. Demais actions usam `requireUser()` (autenticação simples). Duplicação não existe — uso é único. AC5 PASS, sem centralização necessária.

---

## Issues encontrados

| ID | Prioridade | Status | Descrição |
|---|---|---|---|
| S-01 | P3 | WONTFIX | `downloadMaterialAction` e `saveProgress`/`markLessonComplete` não validam `lessonId`/`materialId` como UUID. RLS e `has_access` protegem contra cross-user, mas UUID validation seria defense-in-depth. |
| S-02 | P3 | WONTFIX | `completeOnboarding` aceita `name`/`bio` sem limite de comprimento. DB tem tipo `text` ilimitado. Baixo risco. |

---

## Nota sobre RLS (AC3)

O smoke test de RLS com `auth.uid()` simulado em SQL Editor requer acesso ao Supabase Dashboard e não pode ser executado automaticamente. O código mostra consistência em usar `createClient()` (que aplica RLS) para reads do próprio user e `supabaseAdmin` apenas para writes que o sistema controla. Verificação manual de RLS policies recomendada via Supabase Dashboard > Authentication > Policies para tabelas `lesson_progress`, `comments`, `forum_threads`, `forum_replies`, `votes`, `notifications`.
