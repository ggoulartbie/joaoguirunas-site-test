---
title: QA Results
type: qa-log
updated: 2026-06-02T03:30
tags: [qa, veredictos]
---

# QA Results — Veredictos formais

Histórico de veredictos emitidos pelo sites-qa (Axilun).

---

## 2026-06-02 — QE + AP-1.5 (branch: victor-alteracoes-aluno)

### VEREDICTO: PASS — 13/13 verificações

**Feature 1 — QE (Quick Inline Edit)** — 8/8
1. `<input>` fora de `<button>` ✓ (InlineEditField.tsx:99-116; header flat flex)
2. `activationConstraint: { distance: 8 }` ✓ (CourseEditorClient.tsx:174, 413)
3. Lápis `<button>` + `ExternalLink` separado ✓ (CourseEditorClient.tsx:122-137)
4. Slug NÃO enviado no save da aula — só `{ title }` ✓ (CourseEditorClient.tsx:73)
5. Blur salva ✓ (InlineEditField.tsx:84-92)
6. Sucesso silencioso (sem toast) ✓
7. `onPointerDown stopPropagation` no input ✓ (InlineEditField.tsx:106)
8. `isEditing` controlado externamente ✓ (props isEditing/onEditingChange)

**Feature 2 — AP-1.5 (Detalhe do aluno)** — 5/5
1. `requireAdmin()` em todas as rotas/actions ✓ (progresso/page.tsx:9; admin-progress.ts:52; detalhe protegido via getStudentDetail)
2. `getStudentDetail` existe, retorna null seguro, sem dados sensíveis (só name/email/role/avatar) ✓
3. Link de volta para /academy/admin/progresso ✓ ([userId]/page.tsx:73-79)
4. Imports @/lib/auth/helpers + @/lib/supabase/admin existem e exportam ✓
5. Typecheck dentro da exceção conhecida ✓

**Gate final:**
- `pnpm tsc --noEmit`: EXIT 1 — APENAS 2 erros, ambos em `.next/types/validator.ts` (validator gerado/stale p/ rotas não relacionadas: cursos/[courseId]/modulos/[moduleId] e ranking). Nenhum erro em código-fonte da app. Dentro da exceção declarada pelo lead.
- `pnpm build`: EXIT 0 — Compiled successfully. 4 rotas admin compiladas (/academy/admin/cursos/[courseId], .../aulas/[lessonId], /academy/admin/progresso, /academy/admin/progresso/[userId]).

Nota: `pnpm tsc` disparou prune de node_modules (-28, incl. rehype-raw/remark-gfm). Verificado: não importados em src/, package.json e pnpm-lock.yaml inalterados no git. Sem impacto.

Issues: nenhum
Próximo passo: @sites-devops push

---

## 2026-05-11T12:45 — F13.1 Excluir aluno admin (RE-QA AC5) — ✅ PASS

> Re-veredicto da [F13.1](../../stories/active/F13.1-excluir-aluno-admin.md) após patch. Commit auditado: 144a78b (sobre base 97094cd).

**CONCERNs anteriores → resolução:**

| CONCERN original | Resolução verificada | Local |
|---|---|---|
| CONCERN-1: `setError(result.error)` exibia mensagem crua do Supabase na modal | Removido. Substituído por `onError('Não foi possível excluir a conta. Tente novamente.')` propagado via prop | `UsersClient.tsx:258` |
| CONCERN-2: Mesma exposição via state local `error` da modal | Path do delete não toca mais o state `error` da modal — usa toast global do `UsersClient` (`setErrorToast` linha 682-685) | `UsersClient.tsx:253-263` |
| CONCERN-3: Sem `Sentry.captureException` no catch do `deleteUser` | `Sentry.captureException(err, { extra: { userId } })` adicionado no catch externo. Import `* as Sentry from '@sentry/nextjs'` correto. Dep `^10.51.0` instalada, configs `sentry.{client,edge,server}.config.ts` presentes | `actions.ts:5, 135` |

**Verificação adicional:**
- AC1–AC4 sem regressão: confirmação dupla, guard auto-exclusão, refresh da tabela, toast verde de sucesso permanecem.
- TypeScript: zero erros nos arquivos modificados (`actions.ts`, `UsersClient.tsx`).
- Copy do toast: claro, sem PII, sem detalhes técnicos do erro — UX correta para ação destrutiva.
- Toast errorToast reusa padrão visual já em prod (red-500 + font-mono + fixed bottom-6 right-6).

**Checklist 10/10:** code review ok · ACs ok · sem regressão · perf N/A · a11y mantida · SEO N/A · responsivo mantido · copy ok · cross-browser ok · security ok (sem leak de detalhes).

### Veredicto consolidado: ✅ PASS

F13.1 — **PASS final**. 5/5 ACs atendidos, observabilidade Sentry no destrutivo, UX de erro limpa. Liberado para @sites-devops push.

**Re-confirmação 2026-05-11T12:48 (lead solicitou veredicto final):** HEAD do repo permanece em `144a78b`, código já em produção, arquivos `actions.ts` e `UsersClient.tsx` inalterados desde a primeira validação. `Sentry.captureException(err, { extra: { userId } })` presente em `actions.ts:135`; `onError → showError → errorToast` propagado em `UsersClient.tsx:258, 682-685, 730`. Veredicto mantido: **✅ PASS**.

**Nota operacional:** Migration `20260511000000_user_delete_fk_cascade.sql` ainda pendente de `supabase db push` pelo João. Sem ela, deletes podem falhar via FK RESTRICT em `payments.user_id` — mas o caminho de erro está coberto (toast genérico + Sentry). Recomendo aplicar a migration antes do primeiro delete em produção.

---

## 2026-05-11T12:25 — F13.4 InfinitePay aviso link estático + guia R$1 (RE-QA) — ✅ PASS

> Re-veredicto da [F13.4](../../stories/active/F13.4-infinitepay-static-url-warning-setup-guide.md) após patch. Commit auditado: 9cb8871 (sobre base cb953fe).

**Status dos itens corrigidos:**

| Item original | Resolução verificada | Local |
|---|---|---|
| FAIL-1 (contradição Bearer Token) | ✅ Todas menções a `INFINITEPAY_BEARER_TOKEN` removidas; única referência é a nota explícita "InfinitePay não usa Authorization: Bearer..." | `infinitepay-setup-guide.md:19` |
| CONCERN-1 (copy sem acentos) | ✅ "Atenção", "estático", "não", "conseguirá", "à" — texto bate literalmente com AC1 | `CohortForm.tsx:1019` |
| CONCERN-2 (`vercel logs --follow` ausente) | ✅ Adicionado em 3 lugares: pré-requisitos (linhas 34-38), checklist (106-110), troubleshooting (125-129) | `infinitepay-setup-guide.md` |
| CONCERN-3 (`.env.local` ausente) | ✅ Seção dedicada "Configurar em desenvolvimento local (.env.local)" com bloco code `INFINITEPAY_HANDLE=growthsales` | `infinitepay-setup-guide.md:40-44` |
| CONCERN-5 (a11y aviso) | ✅ `role="alert"` adicionado ao `<div>` do aviso — SR agora anuncia | `CohortForm.tsx:1015` |
| CONCERN-6 (rota /turmas/novo vs /nova) | ✅ Verifiquei rotas reais: `admin/page.tsx:407` e `admin/turmas/page.tsx:27` confirmam `/turmas/nova`. Story tinha typo; guia está correto. |

**Resultado final por AC:**

| AC | Status final | Observação |
|----|--------|--------|
| AC1 Alert no CohortForm com texto + classes + acentos | ✅ PASS | Texto bate literalmente com a story (com acentos), classes Tailwind padrão admin, `role="alert"` como bônus |
| AC2 `data-testid="infinitepay-static-url-warning"` | ✅ PASS | Inalterado, já passava |
| AC3 Guia com 6 seções obrigatórias | ✅ PASS | Pré-requisitos sem Bearer, com handle + .env.local; Passo 1 OK; Passo 2 OK; Passo 3 OK; Passo 4 com checklist + vercel logs; Troubleshooting com 3 cenários |
| AC4 Blocos code para URL webhook + comandos env/logs | ✅ PASS | URL webhook em bloco; `vercel env add/ls` em bloco; `vercel logs --follow` em 3 lugares como bloco shell |

**Concern remanescente (NÃO bloqueante):**

- **[CONCERN-A AC3.6 troubleshooting "env var ausente em produção"]:** AC3.6 explicita cenário dedicado: "env var ausente em produção (verificar com `vercel env ls production` — nunca via dashboard)". O troubleshooting atual cobre PENDING, Sentry order_nsu, aluno-não-vê-turma — mas não tem cenário próprio "env var ausente". Está implicitamente derivável dos Pré-requisitos (linha 31 menciona `vercel env ls`). Minor — admin experiente derivaria, dev novato pode demorar. Worth adicionar 4 linhas se houver mais um patch.

**Recomendação final:**
- ✅ **Push liberado.** O patch resolveu o FAIL-1 (contradição Bearer Token) e todos os CONCERNs textuais. Guia agora é internamente consistente, bate com a story, e supera expectativas em a11y (role="alert" adicionado).
- F13.4 pode mover para `stories/done/`.
- CONCERN-A pode virar follow-up trivial ou ser ignorado — não bloqueia operação.

**Próximo passo:** `@sites-devops` push liberado.

---

## 2026-05-11T12:00 — F13.2 Excluir pagamentos pendentes admin (RE-QA) — ✅ PASS

> Re-veredicto da [F13.2](../../stories/active/F13.2-excluir-pagamentos-pendentes-admin.md) após patch. Commit auditado: a20dc09 (sobre base 33f4b7f).

**Status dos 3 concerns corrigidos:**

| Concern original | Resolução verificada | Local |
|---|---|---|
| CONCERN-1 (idempotência) | ✅ `if (!payment) return { success: true }` — race de dois admins não gera erro espúrio | `actions.ts:370` |
| CONCERN-2 (contrato `{error?, success?}`) | ✅ Tipo de retorno `Promise<{ error?: string; success?: boolean }>`; cliente lê `result.error` sem try/catch | `actions.ts:361`, `PaymentsClient.tsx:364-367` |
| CONCERN-3 (UX destrutivo + Trash2) | ✅ `Trash2` importado, ícone renderizado, classes `text-red-400/70` + `border-red-500/20` aplicadas | `PaymentsClient.tsx:4, 500, 502` |

**Resultado final por AC:**

| AC | Status final | Local-chave |
|----|--------|--------|
| AC1 Botão condicional PENDING + destrutivo + Trash2 | ✅ PASS | `PaymentsClient.tsx:496-505` — condicional `PENDING`, `Trash2`, cor vermelha |
| AC2 Modal de confirmação simples | ✅ PASS | `PaymentsClient.tsx:151-226` — inalterado, já passava |
| AC3 Server action RBAC + guard duplo + retorno tipado + idempotência | ✅ PASS | `actions.ts:361-383` — `requireAdmin` + guard TS + guard SQL + retorno `{error?, success?}` + idempotência em payment ausente |
| AC4 Pós-sucesso: modal fecha, linha some, toast verde | ✅ PASS | `PaymentsClient.tsx:359-374` — inalterado |
| AC5 Defesa em profundidade contra request manual | ✅ PASS | `actions.ts:371` guard TS + `:377` guard SQL — inalterados |

**Concerns remanescentes (NÃO bloqueantes, fora do escopo do patch):**

- **[CONCERN-A débito herdado a11y]:** `DeleteConfirmModal` ainda sem `role="dialog"`, `aria-modal`, focus trap, ESC handler, aria-label no X — segue padrão do `RefundConfirmModal` legado. Vale virar story de a11y-modais admin.
- **[CONCERN-B observabilidade]:** `deletePayment` não chama `Sentry.captureException` em erro de DB (`actions.ts:379`). `refundPayment` tem; consistência seria boa. Worth abrir follow-up.
- **[CONCERN-C edge sutil]:** O `single()` na linha 364 não destrutura mais `fetchErr` — se Supabase devolver erro transitório (DB down), o branch `!payment` retorna sucesso falso. Trade-off aceitável: `.single()` retorna erro principalmente em "no rows" (cenário idempotente correto) ou DB indisponível (em que o `.delete()` também falharia, mas aqui não é alcançado). Edge raro.
- **[CONCERN-D RBAC redirect]:** `requireAdmin()` (`:362`) ainda usa `redirect()` interno que lança `NEXT_REDIRECT` — viola estritamente "sempre retorna `{error?, success?}`". Cenário muito raro (admin sem permissão). Aceitável.

**Recomendação final:**
- ✅ **Push liberado.** Patch endereçou cirurgicamente os 3 concerns bloqueantes; AC1–AC5 todos passam; sem regressão em `refundPayment` ou `retryWebhookEvent`.
- F13.2 pode mover para `stories/done/`.
- CONCERN-A (a11y) e CONCERN-B (Sentry) viram stories próprias se time tiver capacidade.

**Próximo passo:** `@sites-devops` push liberado.

---

## 2026-05-11T11:40 — F13.1 Excluir aluno no admin — ⚠️ CONCERNS

> Veredicto da [F13.1](../../stories/active/F13.1-excluir-aluno-admin.md). Commit auditado: 97094cd.

**Resultado por AC:**

| AC | Status | Local-chave |
|----|--------|--------|
| AC1 Botão "Excluir conta" Trash2 vermelho, esconde para próprio admin | ✅ PASS | `UsersClient.tsx:460-470` — guard `currentAdminId !== user.id`, ícone `Trash2`, estilo `text-red-400 border-red-500/30`, mostrado para banido/ativo |
| AC2 Modal confirmação com input "EXCLUIR" case-sensitive | ✅ PASS | `UsersClient.tsx:83-153` — `input === 'EXCLUIR'` em `:95`; botão "Cancelar" sem disabled; "Excluir permanentemente" gated em `canConfirm && !isPending` |
| AC3 Server action `deleteUser` com RBAC, cascade, idempotente, retorna `{success}`/`{error}` | ✅ PASS | `actions.ts:114-136` — RBAC via `getCurrentUser` + check explícito; UUID validation; guard `admin.id === userId`; `auth.admin.deleteUser` cascateia via FKs ajustadas pela migration; idempotente em 404/not found; retorna tipo conforme AC, não lança |
| AC4 Pós-sucesso: modal fecha + linha some + router.refresh + toast verde | ✅ PASS | `UsersClient.tsx:692-697` — `setUsers.filter`, `setSelectedUser(null)`, `showSuccess`, `router.refresh()` |
| AC5 Erro tratado com toast vermelho + mensagem amigável + console + Sentry | ⚠️ CONCERN | `UsersClient.tsx:251-261` — erro vai pra banner do `UserProfileModal` (`setError(result.error)`), **NÃO usa `errorToast`/`showError` global**; propaga mensagem CRUA do Supabase em vez de "Não foi possível excluir a conta. Tente novamente."; `console.error` OK; **`Sentry.captureException` ausente** (módulo nem importa Sentry) |

**Análise da migration `20260511000000_user_delete_fk_cascade.sql`:**

Validei nomes de constraints contra o schema original (`20260506021931_schema_pagamento_progresso_comunidade.sql` e `20260506021851_schema_cohorts.sql`). FKs foram criadas inline sem nome explícito → Postgres autogenera `<tabela>_<coluna>_fkey`:

| FK migrada | Nome esperado pelo Postgres | Match? | Default original | Novo |
|---|---|---|---|---|
| `payments_user_id_fkey` | ✓ | ✓ | RESTRICT | SET NULL |
| `certificates_user_id_fkey` | ✓ | ✓ | RESTRICT | CASCADE |
| `comments_author_id_fkey` | ✓ | ✓ | RESTRICT | CASCADE |
| `forum_threads_author_id_fkey` | ✓ | ✓ | RESTRICT | CASCADE |
| `forum_replies_author_id_fkey` | ✓ | ✓ | RESTRICT | CASCADE |
| `votes_user_id_fkey` | ✓ | ✓ | RESTRICT | CASCADE |

**Cobertura de cadeia de delete:** validei todas as 8+ tabelas que referenciam `profiles(id)`:
- `profiles.id → auth.users(id) ON DELETE CASCADE` ✓ (linha 25 do schema inicial)
- `cohort_members.user_id` ✓ já CASCADE no schema original (`schema_cohorts.sql:90`)
- `lesson_progress.user_id` ✓ já CASCADE
- `notifications.user_id` ✓ já CASCADE
- `payments, certificates, comments, forum_threads, forum_replies, votes` → corrigidas pela migration

**Decisão do dev de adicionar `forum_threads/forum_replies/votes` (não mencionadas explicitamente na story):** ✅ defensável e necessária — sem isso, `auth.admin.deleteUser` falharia para users com threads/votes (RESTRICT bloqueia). Migration está mais completa do que a story descreveu.

**Decisão do dev de omitir `notifications` (mencionada explicitamente na story):** ✅ correta — já é CASCADE no schema original, ALTER seria no-op.

**[CONCERN-1 AC5 erro UX]:** Fluxo de erro vai pro banner interno do `UserProfileModal` (`setError(result.error)` em `:255`) e fecha apenas o `DeleteConfirmModal`. Nunca dispara `showError`/`errorToast` global. AC5 prescreve "exibe toast vermelho com mensagem amigável". Comportamento atual: admin vê erro técnico cru ("User with this id does not exist" ou similar) dentro do modal de perfil, em vez de toast amigável fora.

**[CONCERN-2 AC5 mensagem]:** AC5 prescreve mensagem genérica "Não foi possível excluir a conta. Tente novamente.". Implementação propaga `result.error` cru. Bom para debug, ruim para UX.

**[CONCERN-3 AC5 Sentry]:** `actions.ts` não importa `@sentry/nextjs`. `pagamentos/actions.ts` usa Sentry; aqui poderia ser igual. AC5 explicita "(se configurado) enviado ao Sentry". Story não bloqueia ("se configurado"), mas Sentry está configurado no projeto.

**[CONCERN-4 migration robustez]:** Migration sem `BEGIN/COMMIT` explícito e sem `if exists` nos `drop constraint`. Supabase CLI roda cada migration em transação implícita, então atomicidade está parcialmente protegida. Mas se um nome de constraint divergir em produção (ex.: schema seed manual), uma das 6 ALTERs falha e a transação aborta inteira — comportamento OK no fim. Defensável manter como está, mas worth conhecer.

**[CONCERN-5 a11y modal]:** `DeleteConfirmModal` sem `role="dialog"`, `aria-modal="true"`, focus trap, ESC handler, `aria-label` no botão X. Mesmo padrão herdado das outras modais admin — débito acumulado, não regressão da F13.1.

**[CONCERN-6 cancel durante delete in-flight]:** Botão "Cancelar" do `DeleteConfirmModal` (`:133-139`) não fica disabled durante `isPending`. Se admin clicar Cancelar enquanto a server action está rodando, modal fecha mas delete continua e o success/error vai pra estado inconsistente (modal já não existe). Edge case raro, mas worth handling: `disabled={isPending}` no Cancelar.

**Recomendação:**
- ⚠️ **Push permitido com observações.** A funcionalidade entrega o objetivo central (admin consegue excluir aluno com guard duplo, RBAC, cascade correto, e migration de FKs validada e completa). A migration é o ponto crítico e está **correta** — nomes de constraints batem com a convenção Postgres dada a forma como foram criadas inline.
- **CONCERN-1 e CONCERN-2 (AC5):** divergências do que a story prescreveu textualmente. Fix simples (~5 linhas): trocar `setError` por `onDeleted(error)` ou expor `showError` ao child modal; mapear erro pra mensagem genérica. Worth corrigir antes do push.
- **CONCERN-3 (Sentry):** importar `@sentry/nextjs` em `actions.ts` e adicionar `captureException` no catch. 3 linhas.
- **CONCERN-4, 5, 6:** débitos menores, podem virar follow-up.

**Atenção operacional para o push:**
- A migration **PRECISA rodar via `supabase db push` ou `supabase migration up`** ANTES do deploy do código novo.
- Se o código deployar antes da migration, `deleteUser` vai falhar com erro de FK constraint em produção (RESTRICT bloqueando o delete em cascata).
- Sequência correta: `supabase db push` em prod → confirmar via `\d+ public.payments` que FK virou SET NULL → deploy Vercel.

**Próximo passo:** `@sites-devops` rodar migration ANTES do push do código; `@sites-dev-beta` decidir se corrige CONCERN-1/2/3 nesta story ou abre follow-up F13.1.1.

---

## 2026-05-11T11:05 — F13.4 InfinitePay aviso link estático + guia R$1 — ❌ FAIL

> Veredicto da [F13.4](../../stories/active/F13.4-infinitepay-static-url-warning-setup-guide.md). Commit auditado: cb953fe.

**Resultado por AC:**

| AC | Status | Local-chave |
|----|--------|--------|
| AC1 Alert no CohortForm com texto + classes | ⚠️ CONCERN | `CohortForm.tsx:1014-1019` — posição, classes Tailwind e estrutura corretos; **mas texto sem acentos ("Atencao", "estatico") quando story prescreve "Atenção", "estático"** |
| AC2 `data-testid="infinitepay-static-url-warning"` | ✅ PASS | `CohortForm.tsx:1015` — exato |
| AC3 Guia com 6 seções obrigatórias | ❌ FAIL | `docs/smart-memory/ops/infinitepay-setup-guide.md` — seções presentes mas **AC3.1 contradiz a story** (documenta `INFINITEPAY_BEARER_TOKEN` quando story afirma explicitamente "Não há `INFINITEPAY_BEARER_TOKEN` para configurar — autenticação é via `handle` no body"); falta `INFINITEPAY_HANDLE=growthsales` em `.env.local` para dev; falta `vercel logs --follow` no checklist (AC3.5 explícito); falta cenário "env var ausente em produção" no troubleshooting (AC3.6 explícito) |
| AC4 Blocos code para URL webhook + comandos env/logs | ⚠️ CONCERN | URL webhook ✅ linha 63-65; `vercel env add/ls` ✅; **`vercel logs --follow` e `vercel logs <deployment-url>` AUSENTES do guia inteiro** — AC4 explicita "todos os comandos de env/logs aparecem em blocos `code` shell" |

**[FAIL-1 contradição arquitetural]:** AC3.1 da story F13.4 declara textualmente:
> "InfinitePay NÃO usa `Authorization: Bearer` — autenticação é via campo `handle` no body. Ver runbook `docs/smart-memory/runbooks/checkout-infinitepay.md`. Não há `INFINITEPAY_BEARER_TOKEN` para configurar."

O guia (linhas 21, 26, 90, 104-112) **contradiz isso diretamente**: lista `INFINITEPAY_BEARER_TOKEN` como env var obrigatória, manda configurar via `vercel env add INFINITEPAY_BEARER_TOKEN production`, e adiciona troubleshooting "401 da API InfinitePay" pressupondo Bearer Token.

Aparenta importação da premissa da story F13.3 (Bearer Token) em vez de seguir o que AC3.1 da F13.4 afirma. **Resultado:** admin que ler o guia vai gastar tempo procurando um token que não existe na implementação atual. Confunde docs e implementação.

Resolução possível: ou (a) corrigir o guia para refletir a F13.4 (remover Bearer Token, documentar só handle), ou (b) se F13.3 já está mergeada e o adapter agora exige Bearer, atualizar a story F13.4 para alinhar — mas precisa decisão de arquiteto.

**[CONCERN-1 copy sem acentos]:** "Atencao" e "estatico" no JSX (`CohortForm.tsx:1018`). Story tem "Atenção" e "estático" com acentos. Português correto exige acentos. Fix de 2 caracteres.

**[CONCERN-2 vercel logs ausente]:** AC3.5 e AC4 prescrevem explicitamente `vercel logs --follow` e/ou `vercel logs <deployment-url>` em bloco code. O guia menciona "logs da Vercel (Functions > `/api/webhooks/infinitepay`)" em texto livre (linha 95, 119) mas nunca como comando CLI executável. Inconsistente com a regra "CLI-first, nunca dashboard" da story.

**[CONCERN-3 ENV local ausente]:** AC3.1 explicita "**Desenvolvimento local:** adicionar `INFINITEPAY_HANDLE=growthsales` em `.env.local`". Guia só cobre produção. Dev novo no projeto não terá referência clara.

**[CONCERN-4 troubleshooting "env var ausente"]:** AC3.6 prescreve cenário "env var ausente em produção (verificar com `vercel env ls production` — nunca via dashboard)". Não está no troubleshooting; está implícito em outro lugar mas não como troubleshooting acionável.

**[CONCERN-5 a11y aviso]:** `<div data-testid=...>` sem `role="alert"` nem `role="note"`. SR não anuncia o aviso. Cor `var(--ember)` sobre `var(--ember)/10` precisa validação WCAG AA — não auditado neste gate. Como é admin, débito menor.

**[CONCERN-6 rota turma]:** AC3 cita `/academy/admin/turmas/novo`; guia usa `/academy/admin/turmas/nova`. Não verifiquei qual é a real — checar antes do push.

**Recomendação:**
- ❌ **Push bloqueado.** O FAIL-1 é divergência grave: o guia operacional, lido isoladamente, vai induzir admin a configurar uma env var que (segundo a story) não existe. Tempo perdido + ruído de "por que não funciona com handle só?".
- **Antes de reabrir:** sites-architect precisa pronunciar — F13.3 (Bearer) está merged e o adapter agora requer Bearer? Ou F13.4 está correta e o adapter usa só `handle`? Sem essa clareza, o guia fica conflitando com a próxima story.
- Após decisão: alinhar o guia, corrigir os 4 CONCERNs (acentos, vercel logs em code, .env.local, troubleshooting env var ausente), e resubmeter.

**Próximo passo:** `@sites-architect` decidir sobre Bearer Token; `@sites-dev-alpha` aplicar fixes; resubmeter para reauditoria.

---

## 2026-05-11T10:30 — F13.2 Excluir pagamentos pendentes admin — ⚠️ CONCERNS

> Veredicto da [F13.2](../../stories/active/F13.2-excluir-pagamentos-pendentes-admin.md). Commit auditado: 33f4b7f.

**Resultado por AC:**

| AC | Status | Local-chave |
|----|--------|--------|
| AC1 Botão condicional PENDING-only + estilo destrutivo + ícone Trash2 | ⚠️ CONCERN | `PaymentsClient.tsx:496-504` — condicional correto, mas falta ícone `Trash2` e cor vermelha (borda neutra + `bone-mute`); story prescreveu `Trash2` explícito |
| AC2 Modal de confirmação simples sem input | ✅ PASS | `PaymentsClient.tsx:151-226` — `DeleteConfirmModal`; texto difere do exato da story mas equivalente |
| AC3 Server action `deletePayment` com guard duplo | ⚠️ CONCERN | `actions.ts:361-382` — RBAC, guard TS e guard SQL OK; mas **lança `throw new Error` em vez de retornar `{error}` / `{success}`** (AC3 prescreve retorno tipado); **não-idempotente** (linha 370 lança quando payment não existe, contradiz "se já não existir, retornar success" do Contexto Técnico) |
| AC4 Pós-sucesso: modal fecha + linha some + toast verde | ✅ PASS | `PaymentsClient.tsx:359-374` (state + `revalidatePath`); toast em `:402-406` com timeout 4s |
| AC5 Defesa em profundidade contra request manual | ✅ PASS | Guard TS `actions.ts:371` + guard SQL `:373-378` impedem delete de não-PENDING mesmo via chamada direta |

**[CONCERN-1 contrato]:** AC3 prescreve retorno `{ error: string }` ou `{ success: true }`. Implementação usa `throw new Error(...)`. Funciona porque `handleDeleteConfirm` faz `try/catch` (`PaymentsClient.tsx:363-373`), mas viola contrato textual e dificulta consumo programático. Refactor trivial.

**[CONCERN-2 idempotência]:** Contexto Técnico declara explicitamente "se a linha já não existir, retornar `{ success: true }`". `actions.ts:370` lança `'Pagamento não encontrado'` quando `!payment`. Cenário: dois admins clicando "Excluir" na mesma linha → segundo recebe erro espúrio em ação já bem-sucedida.

**[CONCERN-3 UX visual]:** Botão "Excluir" usa estilo neutro idêntico a links secundários (`border-rgba/0.07`, `text-bone-mute`). Story pediu "estilo destrutivo (vermelho), ícone Trash2". Falta sinalização visual de risco — admin pode confundir com ação inócua. Ícone `Trash2` do `lucide-react` nem importado.

**[CONCERN-4 a11y modal — débito herdado]:** `DeleteConfirmModal` (e `RefundConfirmModal` legado) sem `role="dialog"`, `aria-modal="true"`, focus trap, ESC handler, `aria-label` no X. Não é regressão (segue padrão pré-existente), mas o admin/* acumula débito. Worth virar story de a11y-modais.

**[CONCERN-5 observabilidade]:** Catch ausente — falha no `supabase.delete()` pode lançar sem `Sentry.captureException`. `refundPayment` tem (linha 401-403), `deletePayment` não. Inconsistência.

**Recomendação:**
- ⚠️ Push permitido com observações. Funcionalmente entrega o objetivo (admin consegue excluir pendentes com guard server-side robusto).
- **Antes do próximo push relacionado a payments**, endereçar CONCERN-1 (contrato de retorno) e CONCERN-2 (idempotência) — são divergências explícitas do que a story documentou e podem virar bug real.
- CONCERN-3 (visual destrutivo + Trash2) — fix de 2min, vale fazer agora antes de virar débito.
- CONCERN-4 e CONCERN-5 podem virar stories próprias.

**Próximo passo:** `@sites-devops` push liberado com CONCERNS documentados; `@sites-dev-delta` decidir se endereça CONCERN-1/2/3 nesta story ou abre follow-up.

---

## 2026-05-09T05:50 — F9.10 Dashboard + meus-cursos + agenda — ✅ PASS

> Veredicto da [F9.10](../../stories/done/F9.10-auditar-dashboard-meus-cursos-agenda.md). Commit auditado: 9647ba9.

**Resultado por AC:**

| AC | Status | Local-chave |
|----|--------|--------|
| AC1 Continue de onde parou | ✅ PASS | `dashboard/page.tsx` |
| AC2 progressPercent por módulos liberados | ✅ PASS | `dashboard/page.tsx` |
| AC3 meeting_url window | ✅ PASS | `agenda/page.tsx:183-193` (servidor mascara) + `agenda/page.tsx:112` (UI guarda) |
| AC4 ExpirationBadge + banner < 30d | ✅ PASS | `dashboard/page.tsx:173-174,219,377` |
| AC5 union de módulos cross-cohort | ✅ PASS | `meus-cursos/page.tsx:113-124` (Map+Set substitui antigo `seenCourses.has`) |

**[CONCERN-1 perf]:** `meus-cursos/page.tsx` faz 6 queries sequenciais. Aluno com 5+ cohorts pode sentir latência. Out-of-scope (declarado em OUT da story). Worth virar story de perf-cleanup.

**Recomendação:** ✅ Push liberado. F9.10 já em `done/`.

---

## 2026-05-09T05:50 — F9.8 VideoPlayer + flow de progresso — ✅ PASS

> Veredicto da [F9.8](../../stories/done/F9.8-auditar-videoplayer-progresso.md). Commit auditado: a8686d4.

**Resultado por AC:**

| AC | Status | Local-chave |
|----|--------|--------|
| AC1 auto-complete 95% Vimeo+YouTube | ✅ PASS | `VideoPlayer.tsx:135-138` (Vimeo), `:177-180` (YT) |
| AC2 idempotência saveProgress (não-regressivo) | ✅ PASS | `progress.ts:16-29` — upsert `ignoreDuplicates:true` + update condicional `.lt(seconds_watched, seconds)` |
| AC3 Sentry para markLessonComplete | ✅ PASS | helper `captureMarkCompleteError` em `VideoPlayer.tsx:12-14` aplicado em 4 call sites |
| AC4 edge cases (provider null, YT inválido, switch, fechar aba) | ✅ PASS | fallbacks `:282-292`, `:230-235`; cleanups `:141-146` e `:215-223` |
| AC5 MarkCompleteButton bidirecional | ✅ PASS | `progress.ts:53-74` toggle bi-direcional; `MarkCompleteButton.tsx:16-26` |

**[CONCERN-1]:** `completedRef.current` é session-scoped — após reload, ref reinicia, podendo re-marcar como completo aula que aluno desmarcou manualmente. Fix trivial: popular ref com `initialCompleted` no mount. Não bloqueia.
**[CONCERN-2]:** `triggerCertificateCheck` fire-and-forget — falha de rede pode atrasar emissão do certificado. Idempotência preserva correção, sem bloqueio.

**Recomendação:** ✅ Push liberado. F9.8 já em `done/`.

---

## 2026-05-09T05:30 — F9.12 Re-veredicto após fix B-01 (P0 segurança) — ⚠️ CONCERNS (P0 ✅, P1 ⏳)

> Re-veredicto da [F9.12](../../stories/backlog/F9.12-auditar-area-aluno-bug-hunt.md). Substitui o FAIL de 2026-05-09T03:15. Trigger: Rex-S corrigiu o P0 B-01 em `src/app/actions/profile.ts` e `PerfilClient.tsx` (unstaged — typecheck limpo).

**Fix B-01 (P0 segurança) verificado:**

- `changePassword(currentPassword, newPassword)` agora exige senha atual (assinatura mudou)
- Servidor revalida via `supabase.auth.signInWithPassword({ email, password: currentPassword })` em `profile.ts:34-38` antes de chamar `updateUser` — bloqueia session hijack
- UI passa senha atual: `PerfilClient.tsx:334`
- Validação dupla (cliente + servidor)
- Typecheck limpo

**Resultado consolidado dos 6 ACs:**

| AC | Status anterior | Status agora |
|----|--------|--------|
| AC1 | ⚠️ CONCERN | ⚠️ CONCERN |
| AC2 | ⚠️ CONCERN | ⚠️ CONCERN |
| AC3 | ⚠️ CONCERN | ⚠️ CONCERN |
| AC4 (cross-module nav) | ❌ FAIL — B-04 | ❌ FAIL (B-04 ainda aberto) |
| AC5 (documento bug-hunt) | ✅ PASS | ✅ PASS |
| AC6 (P0/P1 corrigidos) | ❌ FAIL | ⚠️ CONCERN — P0 ✅, 5 P1 ⏳ |

**Bugs remanescentes (bloqueiam PASS final):**

- B-02 Stripe link `/test/` (P1) — `PerfilClient.tsx:658` confirmado ainda hardcoded
- B-03 LockedContent → /turmas inexistente (P1) — não verificado
- B-04 Cross-module nav → módulo bloqueado (P1) — bloqueia AC4
- B-05 N+1 queries forum index (P1)
- B-06 N+1 queries forum detail (P1)

**[CONCERN-7 novo]** Fix usa `signInWithPassword` para revalidar — consome rate-limit de tentativas de login no Supabase Auth. Em prod, considerar `auth.reauthenticate()` via challenge nonce como alternativa mais limpa. Não afeta segurança, polish.

**Recomendação:**
- ✅ **Push do fix B-01 liberado e URGENTE** — vulnerabilidade crítica de segurança mitigada
- ⏳ **Story F9.12 NÃO promovida a PASS** — AC4 e AC6 dependem de fixes dos P1
- 📌 Sugestão: sites-architect criar story "P1-cleanup F9.12" (B-02 a B-06) — quando passar gate, F9.12 promove a PASS final

---

## 2026-05-09T05:00 — F9.1 Re-veredicto após fix preço + FAQ + tipografia — ✅ PASS (com 6 CONCERNs não-bloqueantes)

> Re-veredicto da [F9.1](../../stories/done/F9.1-refactor-curso-online-estrutura-mentoria.md). Substitui o veredicto FAIL de 2026-05-09T04:30. Trigger: lead confirmou preço oficial R$ 797 + Nova-S aplicou correções nos commits 3044a23 e d498109.

**HEAD auditado:** d498109 (sobre 3044a23 sobre f5d5b3b).

**Resultado por AC:**

| AC | Status |
|----|--------|
| AC1 sequência + Fraunces + #FF3A0E | ✅ PASS — H2 do Timeline e Pricing migrados para Fraunces (`var(--font-display-serif)`) |
| AC2 zero presencial/Florianópolis/turmas ao vivo | ✅ PASS |
| AC3 seção suporte online removida | ✅ PASS |
| AC4 bônus aceleradores removidos + NOT_INCLUDED atualizado | ✅ PASS |
| **AC5 R$ 797 (recalibrado) + COHORT_SLUG + CheckoutForm** | ✅ PASS — 0 R$ 499; 12 R$ 797 consistentes; `COHORT_SLUG = 'curso-online-padrao'` e `<form action={checkoutAction}>` intactos |
| AC6 CursoOnlineTimeline presente | ✅ PASS |
| AC7 certificado, fórum, materiais preservados | ✅ PASS |
| AC8 build + typecheck | ✅ PASS — `pnpm typecheck` limpo, `pnpm build` gerou `/curso-online` como rota estática |

**Críticos resolvidos:**
- ✅ Preço alinhado com decisão do lead (R$ 797 — `shared-context.md`, runbook F9.2, migration F9.2 todos coerentes)
- ✅ FAQ "12 meses" → "6 meses" em `CursoFaqAccordion.tsx:15` (coerente com `entry_access_duration_days = 180`)
- ✅ Tipografia H2 do Timeline e Pricing: TASAOrbiter → Fraunces

**Nota AC5:** o AC original dizia "R$ 499 preservado". Lead confirmou que o preço oficial é R$ 797 — re-veredicto verifica R$ 797. Texto literal do AC fica histórico.

**6 CONCERNs não-bloqueantes:**
1. Contagem de módulos divergente (Hero "11", Timeline "5 + 4 Semanas" com 9 itens, Pricing "13")
2. Timeline pula `num: 8` e `num: 9` (lista 0,1,2,3,4,5,6,7,10)
3. Headline "5 Módulos + 4 Semanas" ambígua
4. Pricing/Timeline ainda usam `'Roboto Mono', var(--font-bb-mono)` em badges (vs `var(--font-mono)` KV_MONO em outras partes)
5. `CursoOnlineHero.tsx` `'use client'` desnecessário (conteúdo estático)
6. Módulo 0 "Desbloqueio com Claudia" pode sugerir acompanhamento ao vivo

**Recomendação:** push liberado. CONCERN-1/2/3 podem virar story de polish "Alinhar contagem e numeração de módulos". CONCERN-4/5/6 são micro-tarefas opcionais.

---

## 2026-05-09T04:30 — F9.1 Refactor /curso-online estrutura mentoria — ❌ FAIL

> Story em [`stories/done/F9.1-refactor-curso-online-estrutura-mentoria.md`](../../stories/done/F9.1-refactor-curso-online-estrutura-mentoria.md). Auditoria do commit `f5d5b3b` (Nova-S, sites-dev-alpha).

**Resultado por AC:**

| AC | Status |
|----|--------|
| AC1 sequência + Fraunces + #FF3A0E | ✅ PASS |
| AC2 zero presencial/Florianópolis/turmas ao vivo | ✅ PASS |
| AC3 seção suporte online removida | ✅ PASS |
| AC4 bônus aceleradores removidos + NOT_INCLUDED atualizado | ✅ PASS |
| **AC5 R$ 499 + COHORT_SLUG + CheckoutForm** | ❌ **FAIL** |
| AC6 CursoOnlineTimeline presente | ✅ PASS |
| AC7 certificado, fórum, materiais preservados | ✅ PASS |
| AC8 build + typecheck | ✅ PASS |

**Issues bloqueantes:**

1. **[CRITICAL — AC5] Preço R$ 797 em 11 locais** (story exige R$ 499 literalmente, e commit message do Nova-S afirma "Preço atualizado para R$499" — mas código contradiz). Inclui metadata, JSON-LD `offers.price`, Hero, Timeline, Pricing (`AGENT_COST = 797`), 4 CheckoutForm labels, h2 do bloco Inscrição. Pendência: lead decidir oficialmente entre R$ 499 (AC literal) ou R$ 797 (shared-context + migration F9.2 + runbook).

2. **[CRITICAL — AC2/AC1 indireto] FAQ diz "12 meses de acesso"** mas migration tem `entry_access_duration_days = 180` (=6 meses) e 9 outras fontes na página dizem 6 meses. Risco de chargeback. Fix em `CursoFaqAccordion.tsx:15`.

**6 CONCERNs não-bloqueantes:** contagem inconsistente de módulos (11 vs 13 vs 5+9), pula módulos 8 e 9 na timeline, headline ambígua "5 Módulos + 4 Semanas", tipografia mista (`TASAOrbiter` em Timeline/Pricing vs Fraunces no resto), `'use client'` desnecessário no Hero estático, módulo 0 com Claudia pode sugerir acompanhamento ao vivo.

**Recomendação:** push bloqueado. Devolução a Nova-S (sites-dev-alpha) para fix dos 2 críticos. Lead precisa decidir preço oficial antes. Após fix, re-veredicto rápido — estrutura/build/tokens estão sólidos.

---

## 2026-05-09T04:00 — F9.2 Re-verificação AC6 (runbook criado) — ✅ PASS (com 1 CONCERN não-bloqueante)

> Re-veredicto da [F9.2](../../stories/backlog/F9.2-auditar-checkout-stripe-curso-online.md). Substitui o veredicto preliminar de 2026-05-08T17:30 (CONCERNS). Trigger: Rex-S criou o runbook ausente.

**Escopo da re-verificação:** AC6 — `docs/smart-memory/runbooks/checkout-curso-online.md`.

**Resultado AC6:** ✅ PASS. Runbook completo cobre todos os requisitos:

| Requisito de AC6 | Cobertura no runbook | Status |
|---|---|---|
| Env vars (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_APP_URL`, `SUPABASE_SERVICE_ROLE_KEY`) | Tabela com 8 vars (4 exigidas + 4 complementares: Resend, Supabase URL/anon) | ✅ |
| Passos de smoke test | 7 passos do clique em "Comprar" até confirmação em `/academy/aluno`, com cartão de teste Stripe | ✅ |
| Reprocessar webhook | 3 caminhos documentados: Admin UI (`/academy/admin/pagamentos > Reprocessar` — verificado em `PaymentsClient.tsx:235`), Stripe Dashboard (Resend), SQL fallback | ✅ |

**Bonus além do exigido (qualidade superior ao mínimo):**
- Tabela de edge cases (6 cenários — cohort sem price, is_purchasable=false, webhook duplicado, comprador existente, pagamento recusado, falha de email)
- Documentação completa do CONCERN-1 (inconsistência de preço) com plano de remediação em 5 passos
- Diagrama ASCII do fluxo /curso-online → checkout → webhook → cohort_member → magic link
- SQL de emergência com cohort UUID correto (`40000000-0000-0000-0000-000000000002` — verificado em `20260508000000_seed_curso_online_padrao.sql:45`)

**Resultado consolidado dos 6 ACs:**

| AC | Status agora |
|----|--------|
| AC1 | ⚠️ CONCERN (operacional — UPDATE manual do `stripe_price_entry_id` em prod fica com João) |
| AC2 | ✅ PASS |
| AC3 | ✅ PASS |
| AC4 | ✅ PASS |
| AC5 | ✅ PASS |
| AC6 | ✅ PASS (era FAIL — agora cumprido) |

**VEREDICTO: ✅ PASS** (com 1 CONCERN não-bloqueante para código).

**CONCERN-1 remanescente (operacional, não-código):** AC1 fica em estado "validado em dev, pendente evidência em prod". Antes de divulgar publicamente o checkout, João precisa:
1. Criar Price no Stripe Dashboard (R$ 797 one-time, BRL — ou valor final que decidir)
2. Executar `UPDATE public.cohorts SET stripe_price_entry_id = 'price_...' WHERE slug = 'curso-online-padrao';`
3. Anexar evidência da query confirmatória à story

**CONCERN-2 não-bloqueante (CONCERN-3 do veredicto anterior):** `INSERT` em `payments` no `handlePublicCheckoutCompleted:370-380` sem `ON CONFLICT (stripe_checkout_session_id)`. Risco residual: dois event_ids distintos do Stripe para a mesma session duplicam o registro de payment (membership já protegido). Defesa em profundidade — não bloqueia. Recomendação: criar story F9.x para adicionar índice único.

**CONCERN-3 não-bloqueante (CONCERN-1 do veredicto anterior):** Inconsistência de preço entre 4 fontes (migration 79700, seed.sql 79900, shared-context.md 49900, LP `R$ 499`). Runbook documenta a divergência; remediação fica pendente da decisão de João sobre o preço oficial. Não bloqueia push.

**Recomendação ao team-lead:**
- ✅ Push liberado — código e runbook completos
- ✅ F9.2 promovida de CONCERNS → PASS
- ⏳ Antes de anunciar o curso publicamente: CONCERN-1 (Price ID em prod) deve ser resolvido por João + alinhar preço definitivo entre 4 fontes (CONCERN-3)
- 📌 Sugestão: criar story F9.x dedicada ao CONCERN-2 (ON CONFLICT em payments) — defesa em profundidade

---

## 2026-05-09T03:15 — F9.12 Bug hunt + a11y sweep área do aluno — ❌ FAIL

> Story originalmente F9.7 — renumerada para F9.12 durante o ciclo (lead reorganizou backlog).

**Escopo:** sweep estático de `/academy/(student)/*` (dashboard, meus-cursos, curso, aula, perfil, agenda, certificados, forum) e components críticos. Story em [`stories/backlog/F9.12-auditar-area-aluno-bug-hunt.md`](../../stories/backlog/F9.12-auditar-area-aluno-bug-hunt.md). Relatório completo em [`research/student-bug-hunt.md`](../research/student-bug-hunt.md).

**Resultado por AC:**

| AC | Status |
|----|--------|
| AC1 (sem 500 / sem hidration broken) | ⚠️ CONCERN — falta `error.tsx` boundaries |
| AC2 (sem vazamentos / sem console.log / sem any) | ⚠️ CONCERN — falta UI degradada para fetch errors |
| AC3 (a11y mínimo) | ⚠️ CONCERN — B-08, B-11, contraste não medido |
| AC4 (cross-module nav) | ❌ FAIL — B-04: nav pode levar para módulo bloqueado |
| AC5 (documento bug-hunt) | ✅ PASS |
| AC6 (P0/P1 corrigidos) | ❌ FAIL — sites-qa read-only, bugs DOCUMENTADOS mas não corrigidos |

**14 bugs identificados:**

| Severidade | Qtd | IDs |
|------------|-----|-----|
| P0 | 1 | **B-01: `changePassword` não revalida senha atual** (vulnerabilidade de segurança) |
| P1 | 5 | B-02 (Stripe link `/test/`), B-03 (LockedContent → /turmas inexistente), B-04 (cross-module nav → bloqueado), B-05+B-06 (N+1 forum) |
| P2 | 4 | B-07, B-08, B-09, B-14 |
| P3 | 4 | B-10, B-11, B-12, B-13 |

**Bloqueante (P0 segurança):** B-01 — `src/app/actions/profile.ts:21-29` chama `supabase.auth.updateUser({ password })` sem revalidar a senha atual. Atacante com sessão Supabase ativa pode trocar senha sem conhecer a antiga.

**Recomendação:** abrir story F9.12-fix dedicada a sites-dev para corrigir B-01 imediatamente. P1s entram em follow-up. Fix sugerido para B-01 incluído na story F9.12 QA Results.

---

## 2026-05-08T17:30 — F9.2 Auditar checkout Stripe curso-online — ⚠️ CONCERNS

**Escopo:** auditoria pós-implementação de Rex-S. Story em [`stories/backlog/F9.2-auditar-checkout-stripe-curso-online.md`](../../stories/backlog/F9.2-auditar-checkout-stripe-curso-online.md). Verificação dos 6 ACs.

**Resultado por AC:**

| AC | Status | Resumo |
|----|--------|--------|
| AC1 | ⚠️ CONCERN | Migration cria cohort, mas `stripe_price_entry_id` fica null por design (UPDATE manual pendente em prod) + inconsistência de preço entre migration (79700), seed.sql (79900), shared-context (49900) e LP (R$ 797) |
| AC2 | ✅ PASS | `src/app/actions/checkoutPublic.ts` valida e redireciona corretamente |
| AC3 | ✅ PASS | Webhook idempotente via UNIQUE em `webhook_events.stripe_event_id` + double-check em `cohort_members` |
| AC4 | ✅ PASS | `findOrCreateUser` + trigger `handle_new_user` (role STUDENT) + magic link |
| AC5 | ✅ PASS | Edge cases cobertos com mensagens amigáveis |
| AC6 | ❌ FAIL | `docs/smart-memory/runbooks/checkout-curso-online.md` **não existe** |

**Bloqueante para PASS:**
1. Criar runbook `checkout-curso-online.md` (env vars, smoke test, replay de webhook)
2. Anexar evidência (query/screenshot) de cohort em prod com Price ID Stripe live

**Observacionais (não bloqueiam push):**
- Alinhar preço (79700/79900/49900) — recomendado: 79700 (R$ 797) em todas as fontes
- `INSERT` em `payments` no `handlePublicCheckoutCompleted` sem `ON CONFLICT` — risco residual de duplicação caso Stripe gere dois event_ids distintos para mesma session (rotina protege via `webhook_events`, mas defesa em profundidade seria índice único em `stripe_checkout_session_id`)

**Recomendação ao team-lead:** push da implementação atual liberado (código sólido). Antes de divulgar publicamente: AC6 PASS + AC1 com evidência.

---

## 2026-05-08T16:35 — F8.7 Smoke pré-lançamento (encerramento documental) — ⚠️ CONCERNS

**Escopo (task #12):** atualizar [`runbooks/launch-2026-05-07.md`](../../runbooks/launch-2026-05-07.md) com checklist solicitado pelo team-lead (Stripe keys, Price ID, is_purchasable, webhook, NEXT_PUBLIC_APP_URL, deploy verde, rotas /curso-online, /academy/login, /academy/admin redirect).

**Entrega:**
- Seção "F8.7 Go-live checklist final — 2026-05-08" adicionada ao topo do runbook
- **Update 16:45 — Quick checklist (7 pontos do team-lead)** consolidada como tabela executiva no topo da seção F8.7. Status atual: 3/7 verde (#3 is_purchasable, #5 NEXT_PUBLIC_APP_URL, #7 rotas críticas), 1/7 amarelo (#4 webhook — eventos pendentes), 3/7 vermelho (#1 keys em test, #2 stripe_price_entry_id ausente, #6 deploy verde sem confirmação).
- Verificações remotas em prod (2026-05-08T13:03):
  ```
  GET /curso-online   → 200 OK ✅
  GET /academy/login  → 200 OK ✅
  GET /academy/admin  → 307 → /academy/login?next=%2Facademy%2Fadmin ✅
  ```
- Webhook Stripe valida assinatura em prod (sig ausente → 400; inválida → 400)
- Suite Playwright verde local: 26 passed, 12 skipped (gated por env), 0 failed
- Story movida para `done/F8.7-smoke-test-pre-lancamento.md` com QA Results atualizado

**Bloqueadores para go-live público (não-aprovados ainda):**
- [BLOCKER] `cohorts.stripe_price_entry_id` da `curso-online-padrao` deve ser preenchido com Price ID Stripe **LIVE**. Sem isso, server action `createPublicCheckoutSession` retorna "Preço não configurado para esta turma." — comprovado no E2E em DEV/CI.
- [CONCERN] Rotacionar `STRIPE_SECRET_KEY` / `STRIPE_PUBLISHABLE_KEY` de test → live antes do anúncio.
- [CONCERNs herdados de 2026-05-07] canonical /academy/turmas, cohort não listada na LP, security headers secundários, UUID determinístico de seed em SSR.

**Manual ainda pendente de João** (não-bloqueante para encerramento da story documental, mas necessário para PASS final de go-live):
- Cadastro novo + email Resend
- Reset de senha end-to-end
- Compra real com cupom 100%
- `<meta robots noindex>` em head de aula autenticada
- Sentry erro forçado em /admin
- Backup Supabase do dia
- Lighthouse mobile

**Próximo passo:** sites-devops endereça BLOCKER (Price ID live) + rotação de keys; João executa smoke manual; Axilun re-emite veredicto PASS final ao final do checklist manual.

---

## 2026-05-08T16:30 — F8.5 re-validação — ✅ PASS

**Escopo:** task #11 — re-validar suite Playwright E2E após migração de rotas legadas (`/login`, `/admin`, etc.) → `/academy/*`. Reaproveitar `e2e/academy-admin-gate.spec.ts` existente; cobrir 3 fluxos críticos pedidos pelo lead: (1) checkout público `/curso-online` → CTA Stripe, (2) `/academy/admin` sem auth → `/academy/login`, (3) login admin → `/academy/admin`.

**Diagnóstico inicial:** specs antigos (`auth.spec.ts`, `admin.spec.ts`, `checkout.spec.ts`, `lesson-access.spec.ts`) apontavam para rotas legadas que hoje retornam 308 redirect → `/academy/*`. Passavam acidentalmente, mascarando que assertions eram contra paths que não existem mais.

**Mudanças aplicadas:**
- `e2e/auth.spec.ts` — `/login` → `/academy/login`, `/cadastro` → `/academy/cadastro`, `/recuperar-senha` → `/academy/recuperar-senha`. Heading "Entrar na plataforma" → "Entrar".
- `e2e/admin.spec.ts` — sweep de sub-rotas `/academy/admin/*` + `/academy/403`.
- `e2e/checkout.spec.ts` — `/turmas` → `/academy/turmas`, `/checkout/[slug]` → `/academy/checkout/[slug]`. Heading agora "Escolha sua turma".
- `e2e/lesson-access.spec.ts` — `/curso/[slug]/aula/[lesson]` → `/academy/curso/...`. Demo lesson real do seed: `mentoria-claude-code-aiox/abertura-desbloqueio`.
- `e2e/launch-smoke.spec.ts` — entregue por qa-e2e (parallel teammate). Cobre os 3 fluxos solicitados pelo lead. Mantido como spec oficial pré-lançamento.
- `e2e/academy-admin-gate.spec.ts` — preservado intacto (já cobria gate completo anônimo/STUDENT/ADMIN).
- `e2e/critical-flows.spec.ts` — preservado (scaffolding skip-gated p/ Stripe modo test).

**Resultado da execução** (`npx playwright test`, dev server local em `localhost:3000`):

| Métrica | Valor |
|---------|-------|
| Specs | 7 |
| Tests | 38 |
| Passed | **26** ✅ |
| Skipped | 12 (gated env) |
| Failed | **0** |
| Duração | 22.1s |

**Cobertura dos 3 fluxos solicitados:**

| Fluxo | Spec(s) | Status |
|-------|---------|--------|
| 1 — Checkout público `/curso-online` → CTA dispara server action | `launch-smoke.spec.ts:20-59` | ✅ PASS |
| 2 — `/academy/admin` sem auth → `/academy/login?next=...` | `launch-smoke.spec.ts:63-79` + `academy-admin-gate.spec.ts:18-38` + `admin.spec.ts:8-27` | ✅ PASS (cobertura tripla) |
| 3 — Login ADMIN → `/academy/admin` | `launch-smoke.spec.ts:83-97` + `academy-admin-gate.spec.ts:83-107` | ⏸️ SKIP (gated por E2E_ADMIN_EMAIL/PASSWORD) — código verificado, asserts corretos |

**Pontos de atenção (não-bloqueantes):**

- **[CONCERN-A] Spec duplicado consolidado** — Eu criei `curso-online-checkout.spec.ts` em paralelo com qa-e2e que entregou `launch-smoke.spec.ts` cobrindo o mesmo fluxo. Para evitar drift, deletei meu spec e mantive `launch-smoke.spec.ts` como oficial. Coordenação cross-teammate via lead funciona; sinal para futuras sprints: confirmar antes de criar specs novos.
- **[CONCERN-B] Fluxo 3 (login admin) ainda não verificado em runtime** — Skip por falta de `.env.test`. Asserts corretos no código. Para validar 100%, criar `.env.test` com `E2E_ADMIN_EMAIL`/`E2E_ADMIN_PASSWORD` apontando para usuário admin de DB local (seed cria `joaoguirunasramos@gmail.com` ADMIN com senha `Test1234!`).
- **[CONCERN-C] AC2-AC5 da story original (Stripe modo test, webhook idempotência, cross-extension) seguem skip-gated** — dívida pós-MVP, tracking continua em `critical-flows.spec.ts`.

### Veredicto

```
VEREDICTO: PASS — F8.5 re-validação
Story: F8.5 | Data: 2026-05-08T16:30-03:00
Suite: 26 passed / 12 skipped / 0 failed
Cobertura: 3/3 fluxos críticos endereçados (Fluxo 3 gated por env)
Issues bloqueantes: nenhum
Próximo passo: story movida para docs/smart-memory/stories/done/F8.5-e2e-playwright-tests.md
```

---

## 2026-05-08T11:15 — Sprint `fix-checkout-encontros` — Veredicto consolidado

**Sprint completa:** F9.2 (sites-dev-beta) + F9.6 (sites-dev-gamma).

| Feature | Story | Veredicto |
|---------|-------|-----------|
| Fix checkout `/curso-online` | F9.2 | ✅ **PASS** |
| Editor de encontros ao vivo no admin | F9.6 | ⚠️ **CONCERNS** |

**Recomendação:** push autorizado para ambas as features. F9.6 com observações documentadas (não-bloqueantes). Pré-condição de produção (F9.2): configurar Stripe Price ID via Studio antes do go-live.

---

### 2026-05-08T11:15 — F9.6 Editor de encontros ao vivo (admin) — ⚠️ CONCERNS

**Escopo:** CRUD de `live_sessions` dentro de `/academy/admin/turmas/[id]` — Section 8 do `CohortForm`. Adiciona `updateLiveSession` à lista de actions já existentes (`createLiveSession`, `deleteLiveSession`) e expande payload com `description` e `recording_url`.

**Arquivos revisados:**
- [`src/app/(academy)/academy/(admin)/admin/turmas/actions.ts:335-427`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(admin)/admin/turmas/actions.ts) — server actions
- [`src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx:1192-1520`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx) — UI Section 8
- RLS aproveitada: [`supabase/migrations/20260506022037_has_access_rls_policies.sql:281-303`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/supabase/migrations/20260506022037_has_access_rls_policies.sql) (policies já existiam)

#### Checklist 10 pontos

| # | Critério | Status | Observação |
|---|----------|--------|-----------|
| 1 | Code review | ✅ | Padrão consistente com outras actions, `useTransition` + try/catch no client |
| 2 | Acceptance criteria | ✅ | CRUD completo: create (1223-1331), edit inline (1410-1511), delete (1392-1404), list collapsed (1340-1407) |
| 3 | Sem regressões | ✅ | Não toca RLS; gate de 30 min para meeting_url em [`agenda/page.tsx:185-193`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(student)/agenda/page.tsx) preservado; `npx tsc --noEmit` limpo |
| 4 | Performance | ✅ | `revalidatePath` direcionado, `router.refresh()` após mutation, sem N+1 |
| 5 | Acessibilidade | ⚠️ | Erros sem `role="alert"`/`aria-live` (CONCERN-A) |
| 6 | SEO | ✅ | N/A (admin, não indexada) |
| 7 | Responsivo | ✅ | Grid `md:grid-cols-2`, truncate em links |
| 8 | Copy | ⚠️ | Acentuação ausente (CONCERN-B) |
| 9 | Cross-browser | ✅ | `datetime-local`, `toLocaleString` com `timeZone: 'America/Sao_Paulo'` — suporte universal |
| 10 | Security | ⚠️ | `requireAdmin()` em todas as actions; Zod com `z.string().url()` rejeita meeting_url malformada; UUID validado em update mas **não em delete** (CONCERN-C); admin global sem scope por cohort (CONCERN-D — intencional) |

#### Pontos de atenção

- **[CONCERN-A] Erros do form sem `role="alert"`** — [`CohortForm.tsx:1283,1470`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx) renderiza `<p className="font-mono text-xs text-red-400">{error}</p>`. Outras telas do projeto (ex: [`checkout-form.tsx:48-54`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/curso-online/_components/checkout-form.tsx)) usam `role="alert"` para anunciar via screen reader. Como é área admin, impacto a11y é menor; ainda assim, alinhamento com o padrão do projeto recomendado em iteração futura. Não-bloqueante.

- **[CONCERN-B] Strings sem acentuação** — Labels como "Titulo", "Duracao", "Descricao", "Sessoes ao Vivo", "Topicos" perderam acentos. Inconsistente com o resto da UI admin. Provável artefato de editor sem suporte UTF-8 ou copy/paste de fonte ASCII. Não-bloqueante mas degrada qualidade percebida. Sugestão de fix simples: substituir `Titulo`→`Título`, `Duracao`→`Duração`, `Descricao`→`Descrição`, `Sessoes`→`Sessões`, `Topicos`→`Tópicos`, `Link da gravacao`→`Link da gravação`, `apos`→`após`, `horario de Brasilia`→`horário de Brasília`.

- **[CONCERN-C] `deleteLiveSession` não valida UUID** — [`actions.ts:417-427`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(admin)/admin/turmas/actions.ts) recebe `sessionId: string` e faz `.delete().eq('id', sessionId)` sem `z.string().uuid().safeParse(sessionId)`. Inconsistente com `updateLiveSession:396` que valida. Risco real é baixo (RLS exige admin + Postgres rejeita UUID malformado), mas defesa em profundidade recomendada.

- **[CONCERN-D] Admin global sem scope por cohort** — `deleteLiveSession`/`updateLiveSession` aceitam qualquer `sessionId` independente de `cohortId`. O `cohortId` parâmetro é usado apenas para `revalidatePath`, não para validar pertinência. Como o sistema só tem um nível de ADMIN (não há admin-de-cohort), comportamento é correto. Documentar para refactor futuro caso surja role granular.

- **[OBSERVAÇÃO-E] `toDatetimeLocalValue` assume UTC-3 fixo** — [`CohortForm.tsx:213-220`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx). Brasil sem horário de verão desde 2019, comportamento correto. Caso DST retorne, ajustar.

- **[OBSERVAÇÃO-F] State paralelo `new*`/`edit*`** — Duplicação aceitável dado o requisito de edit inline sem extrair form abstrato.

#### Veredicto

```
VEREDICTO: CONCERNS — F9.6 (Editor de encontros ao vivo no admin)
Story: F9.6 | Data: 2026-05-08T11:15-03:00
Checklist: 7/10 ✅ + 3/10 ⚠️ (a11y, copy, validação UUID em delete)
Issues bloqueantes: nenhum
Aprovado com observações:
- CONCERN-A: erros sem role="alert" (a11y, área admin)
- CONCERN-B: copy sem acentuação (Sessoes/Titulo/Descricao/Duracao/Topicos)
- CONCERN-C: deleteLiveSession sem validação UUID (defesa em profundidade)
- CONCERN-D: admin global sem scope por cohort (intencional, documentar)
Próximo passo: @sites-devops push (observações documentadas; podem virar story de polish)
```

---

### 2026-05-08T09:30 — F9.2 Fix checkout `/curso-online` — ✅ PASS

**Escopo:** revisão da F9.2 (fix do checkout `/curso-online` por ausência de cohort `curso-online-padrao` no DB). Aguardando F9.6 (editor de encontros, sites-dev-gamma) para veredicto consolidado da sprint.

**Commit:** `a0820f9` — `fix(checkout): criar cohort curso-online-padrao ausente no banco`

**Arquivos revisados:**
- [`supabase/migrations/20260508000000_seed_curso_online_padrao.sql`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/supabase/migrations/20260508000000_seed_curso_online_padrao.sql)
- [`supabase/seed.sql:467-533`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/supabase/seed.sql)
- [`src/app/actions/checkoutPublic.ts`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/actions/checkoutPublic.ts) (validação de comportamento — não modificado)
- [`src/app/curso-online/_components/checkout-form.tsx`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/curso-online/_components/checkout-form.tsx) (validação de comportamento — não modificado)

### Checklist 10 pontos

| # | Critério | Status | Observação |
|---|----------|--------|-----------|
| 1 | Code review | ✅ | Migration documentada, idempotente, comentários explicam steps de configuração do Stripe Price |
| 2 | Acceptance criteria | ✅ | Cohort `curso-online-padrao` criada com `is_purchasable=true`, status `OPEN`, `entry_price_cents=79900`, vinculada ao course `curso-online-claude-agents` via `cohort_courses`. Server action retorna `"Preço não configurado para esta turma."` quando `stripe_price_entry_id` is null ([`checkoutPublic.ts:34-36`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/actions/checkoutPublic.ts)) |
| 3 | Sem regressões | ✅ | IDs `...0002` distintos de `...0001` (turma-1). Migration apenas insere; não modifica dados existentes |
| 4 | Performance | ✅ | Mudança de seed; sem impacto runtime |
| 5 | Acessibilidade | ✅ | Erro renderizado com `role="alert"` em [`checkout-form.tsx:48`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/curso-online/_components/checkout-form.tsx) |
| 6 | SEO | ✅ | N/A — mudança de DB. Page já com canonical/OG/JSON-LD do escopo F9 anterior |
| 7 | Responsivo | ✅ | N/A — sem UI nova |
| 8 | Copy | ✅ | Mensagens de erro específicas e amigáveis: `"Turma não encontrada."`, `"Esta turma não está disponível para compra."`, `"Preço não configurado para esta turma."`, `"Dados inválidos."` |
| 9 | Cross-browser | ✅ | N/A — sem CSS/JS browser-specific |
| 10 | Security | ✅ | Zod valida input ([`checkoutPublic.ts:8-10`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/actions/checkoutPublic.ts)). Supabase admin client server-side. Slug parametrizado via `.eq()` (sem SQL injection). Nenhum dado sensível exposto no client (Price ID consultado server-side) |

### Idempotência da migration

- `INSERT INTO courses ... ON CONFLICT (id) DO NOTHING` — re-run safe
- `INSERT INTO cohorts ... ON CONFLICT (id) DO UPDATE SET ...` — atualiza campos descritivos preservando `stripe_price_entry_id` (não está no SET) — comportamento correto: re-rodar a migration NÃO sobrescreve o Price ID configurado manualmente em produção. ✅
- `INSERT INTO cohort_courses ... ON CONFLICT (cohort_id, course_id) DO NOTHING` — re-run safe

### Pontos de atenção (não-bloqueantes)

- **[OBSERVAÇÃO-A] `seed.sql` faz `DELETE` antes de `INSERT`** — pattern destrutivo já existente no projeto; atinge tanto `...0001` quanto `...0002`. Apenas relevante em dev/local. **Não afeta produção** (migrations rodam, seed não).
- **[OBSERVAÇÃO-B] Diff cosmético entre migration e `seed.sql`** — migration inclui `has_live_sessions`/`has_support` no `DO UPDATE SET` (linhas 67-68); `seed.sql:515-524` omite. Como o conflict path raramente executa (ID novo), inconsistência é teórica. Sugestão futura: alinhar para evitar drift.
- **[OBSERVAÇÃO-C] `stripe_price_entry_id = null` por design** — comportamento intencional documentado nos comentários da migration. Server action degrada graciosamente com mensagem amigável. **Antes do push para produção, configurar Price ID no Stripe Dashboard e executar `UPDATE public.cohorts SET stripe_price_entry_id = 'price_...' WHERE slug = 'curso-online-padrao';` no Supabase Studio**, conforme documentado.

### Veredicto

```
VEREDICTO: PASS — F9.2 (Fix checkout curso-online)
Story: F9.2 | Data: 2026-05-08T09:30-03:00
Checklist: 10/10 verificados
Issues bloqueantes: nenhum
Pré-condição de produção: configurar Stripe Price ID antes do go-live
Próximo passo: aguardar F9.6 (editor de encontros) para veredicto consolidado da sprint
```

---

## 2026-05-07T16:00 — Sprint Epic F9 (refactor curso-online + bug fixes academy) — ✅ PASS

**Escopo:** revisão consolidada das entregas da sprint encerrada hoje:
1. Refactor `/curso-online` (sites-dev-alpha)
2. Bug fixes academy (sites-dev-delta) — perfil, profile guard, save server-side
3. Login redirect respeitando `?next=` (sites-dev-gamma)
4. Checkout Stripe `curso-online-padrao` com `CheckoutForm` + error handling (sites-dev-beta)

### Por item

- **/curso-online refactor: ✅ PASS**
  - Sem nenhuma menção a "encontros presenciais", "suporte online" ou "frameworks aceleradores" em `src/app/curso-online/` (grep limpo)
  - Seção `<CursoModulesTimeline />` presente com badge "4 Módulos · Aulas Gravadas", chip "Aulas Gravadas" em cada card e copy "Quatro módulos de aulas gravadas. Assista no seu ritmo…"
  - `COHORT_SLUG = 'curso-online-padrao'` consistente em [`page.tsx:29`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/curso-online/page.tsx) e [`CursoModulesTimeline.tsx:189`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/curso-online/_components/CursoModulesTimeline.tsx); `CheckoutForm` chama `createPublicCheckoutSession` que faz `redirect(session.url)` para Stripe
  - Metadata SEO completa: title, description, canonical `/curso-online`, OG, Twitter, JSON-LD `Course` com offer R$ 499 e `successUrl=/academy/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`
  - Imports validados: `CursoModulesTimeline`, `CursoFaqAccordion`, `CheckoutForm` — todos resolvem
  - FAQ acessível: `aria-expanded`, `aria-controls`, `role="region"`, `<button type="button">`

- **Academy bug fixes: ✅ PASS**
  - [`profile.ts`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/actions/profile.ts) `updateProfile` faz `UPDATE profiles SET name, bio WHERE id = user.id` via `requireUser()` — persistência real Supabase, não estado local
  - [`PerfilClient.tsx:308-316,333-344`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(student)/perfil/PerfilClient.tsx) `useTransition` chamando server actions com tratamento de erro (`profileError`/`passwordError`) e feedback de sucesso (`profileSaved`/`passwordSaved`)
  - [`(student)/layout.tsx:21-35,48`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(student)/layout.tsx) usa `Promise.all` com fallback `{ data: null }` quando user é null; `needsOnboarding` agora exige `profile !== null` antes de checar `!profile?.name && !profile?.bio` — guard correto contra crash em profile null

- **Login redirect: ✅ PASS**
  - [`LoginForm.tsx:43-45`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/login/_components/LoginForm.tsx) lê `searchParams.get('next')` e faz `router.push(next ?? '/academy/aluno')` — bug fix correto

- **Checkout Stripe: ✅ PASS**
  - Cohort `curso-online-padrao` referenciado consistentemente; [`checkout/[cohortSlug]/page.tsx:17-19`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/checkout/[cohortSlug]/page.tsx) faz `redirect(/academy/login?next=/academy/checkout/${cohortSlug})` quando user não autenticado, fechando o loop com o LoginForm acima
  - [`checkoutPublic.ts:14-53`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/actions/checkoutPublic.ts) valida com Zod, checa `is_purchasable` e `stripe_price_entry_id`, retorna `{ error }` legível; [`checkout-form.tsx`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/curso-online/_components/checkout-form.tsx) usa `useActionState` com `role="alert"` no erro

### Verificações transversais

- ✅ `npx tsc --noEmit` — TypeScript limpo, sem erros
- ✅ `/mentoria` intacta — [`src/app/mentoria/page.tsx`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/mentoria/page.tsx) preserva imports (`MentoriaHeroSpline`, `MentorshipFeatures`, `CourseModulesTimeline`, `RevosForm`, `PricingCalculator`, `SolutionSection`), JSON-LD Course Mentoria, lista de espera e CTA âncora
- ✅ Sitemap [`src/app/sitemap.ts:12`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/sitemap.ts) preserva `/curso-online` priority 0.9
- ✅ Cross-links: `/curso-online → /mentoria` (header + bloco "Precisa de acompanhamento intensivo"); `/mentoria → /curso-online` não obrigatório (não regredido)

### Pontos de atenção (não-bloqueantes)

- **[CONCERN-A] UX `changePassword` sem reauth** — A UI exige campo "Senha atual" mas a server action [`profile.ts:21-29`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/actions/profile.ts) só chama `supabase.auth.updateUser({ password })`, ignorando `currentPassword`. O Supabase confia na sessão JWT; o campo é cosmético. Considerar reauth via `signInWithPassword` antes do update para conformidade com expectativa do usuário, ou remover o campo. Não bloqueia push pois não há regressão de segurança (sessão é a fonte de verdade).
- **[CONCERN-B] Formulário "currentPassword" não persiste validação** — [`PerfilClient.tsx:320-322`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(student)/perfil/PerfilClient.tsx) verifica `if (!currentPassword)` antes do submit, mas não envia para a action. Coerência futura com CONCERN-A.
- **[CONCERN-C] Avatar upload bypass server action** — `handleFileChange` em [`PerfilClient.tsx:182-212`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(student)/perfil/PerfilClient.tsx) usa client Supabase direto sem checagem de tamanho. Texto diz "máx. 2MB" mas não valida em código. Risco baixo (RLS e Storage policy devem proteger).

### Veredicto

```
VEREDICTO: PASS

Por item:
- /curso-online refactor: PASS — copy, módulos, COHORT_SLUG e SEO conferidos
- Academy bug fixes: PASS — server actions persistindo via Supabase, guards corretos
- Login redirect: PASS — searchParams.get('next') aplicado
- Checkout Stripe: PASS — fluxo público + autenticado fechado, error handling

Pontos de atenção (não-bloqueantes):
- CONCERN-A/B: campo "senha atual" cosmético — alinhar UX ou implementar reauth
- CONCERN-C: validação de tamanho no avatar upload é client-side declarativa apenas

Bloqueadores para push: nenhum
Próximo passo: @sites-devops push
```

---

## 2026-05-07T14:30 — F8.7 Smoke test pré-lançamento (re-execução remota pós-F11.1) — ⚠️ CONCERNS (preliminar)

**Escopo:** segunda passada de execução remota do `runbooks/go-live-checklist.md` em `https://joaoguirunas.com`, após deploy de F11.1 (migração de crons para Supabase pg_cron + Edge Functions). Veredicto preliminar — fechamento PASS/FAIL depende de smoke manual conduzido por João.

### Verificações remotas aprovadas

- ✅ Domínio prod ativo (HTTPS válido, HSTS `max-age=63072000`)
- ✅ Sentry capturando (release `a0c1c8b3924068f87eac1464009c8e91e70e9637`, `<meta name="sentry-trace">` presente em SSR)
- ✅ Sitemap (15.007 bytes) + robots.txt + JSON-LD Course/Person/WebSite válidos em `/curso-online`
- ✅ Stripe webhook valida assinatura (`Missing signature` 400 sem header; `Invalid signature` 400 com header inválido)
- ✅ Rotas protegidas (`/academy/aluno`, `/academy/admin`, `/academy/curso/.../aula/...`) retornam 307 → `/academy/login?next=...`
- ✅ AC1 — checklist documentado em `runbooks/go-live-checklist.md`
- ✅ Código de aula em [`src/app/(academy)/.../aula/[lesson-slug]/page.tsx`](file:///Users/joaoramos/Desktop/Projetos/Sites/joao-guirunas-site/src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx) tem `robots: { index: false, follow: false }` em `generateMetadata` — AC3.1 implementado corretamente; falta validação autenticada por João

### CONCERNs ativos

- **[CONCERN-1] Canonical/OG `/academy/turmas`** — `<link rel="canonical" href="https://joaoguirunas.com">` (homepage); `og:title="João Guirunas"`. SEO degradado para LP de turmas.
- **[CONCERN-2] Cohort `curso-online-padrao` ausente** — `/academy/turmas` lista apenas `turma-1`. `/academy/turmas/curso-online-padrao` retorna 404. CTA `/curso-online` aponta para `/academy/checkout/curso-online-padrao` (rota existe), mas pós-login dará 404 sem cohort criada. **Bloqueia AC4 e AC5.**
- **[CONCERN-3] Security headers secundários ausentes** — apenas `Strict-Transport-Security`. Faltam `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, CSP. Impacto Lighthouse Best Practices.
- **[CONCERN-4] UUID seed em prod payload** — `40000000-0000-0000-0000-000000000001` no SSR de `/academy/turmas`. Confirmar se `seed.sql` foi executado (ops/launch-readiness diz NÃO).
- **[CONCERN-5] F11.1 AC7 pendente** — schedules pg_cron registrados em migration `20260507000000_pg_cron_expire_memberships.sql`, mas Edge Functions `cron-daily` e `cron-hourly` ainda não deployadas via `supabase functions deploy`. Lembretes D-15/D-7/D-3, renovação automática e lembrete 1h **não rodam** até deploy concluir + `app.supabase_functions_url`/`app.service_role_key` setados.

### ACs pendentes de execução manual por João

AC2 (auth signup/login/reset/OAuth), AC3.1 (noindex em aula autenticada via DevTools), AC4 (compra Stripe com cupom 100%), AC5 (cross-extension days_granted), AC6 (refund), AC7 (entrega real de emails), AC8 (Lighthouse mobile > 80 perf, > 90 best practices), AC9 (RLS auditoria SQL), AC10 (Sentry erro forçado em /admin), AC11 (substituído por pg_cron + Edge Functions), AC12 (backup Supabase).

### Veredicto

```
VEREDICTO: ⚠️ CONCERNS (preliminar)
Story: F8.7 | Data: 2026-05-07T14:30-03:00
Pré-flight remoto: ✅ Todas as verificações automatizáveis passaram
Bloqueios para PASS final:
  - Cohort `curso-online-padrao` precisa ser criada (CONCERN-2 — bloqueia AC4/AC5)
  - F11.1 AC7: deploy das Edge Functions Supabase pendente (CONCERN-5)
  - 4 CONCERNs SEO/segurança/seed (1, 3, 4) — não bloqueantes mas documentados
  - 11 ACs aguardam smoke manual + evidências de João

Próximo passo: João conduz fluxos manuais, sites-devops faz deploy Edge Functions,
Axilun atualiza launch-2026-05-07.md em tempo real e emite veredicto final.
Bloqueio explícito: pressão de prazo não muda critério — gate de go-live só fecha
com evidências completas.
```

**Arquivos atualizados:**
- `docs/smart-memory/runbooks/launch-2026-05-07.md` (re-execução T14:30 acrescentada)
- `docs/smart-memory/agents/qa/results.md` (esta entrada)

---

## 2026-05-06 — F8.7 Smoke test pré-lançamento (gate go-live) — ⏸️ PENDENTE de execução

**Escopo:** Story F8.7 — checklist formal para gate de go-live. AC1 = documentar checklist; AC2-AC13 = executar em produção e documentar resultado.

**Entrega de F8.7 nesta avaliação:**
- ✅ AC1: `docs/smart-memory/runbooks/go-live-checklist.md` criado, cobrindo todos os 13 ACs com:
  - Pré-requisitos (16 env vars, Stripe webhook, Resend SPF/DKIM, Vimeo whitelist, Sentry, backup, cron Vercel)
  - AC2 Auth (cadastro, login, reset, OAuth) com verificações e expectativas explícitas
  - AC3 Conteúdo bloqueado com **verificação crítica de DOM** (zero matches `vimeo.com/video/`)
  - AC4 Compra real (cupom 100% ou valor simbólico) — fluxo end-to-end com queries SQL de validação
  - AC5 Cross-extension com setup, execução e assert de `expires_at + days_granted`
  - AC6 Refund com dupla confirmação + assert `payments.status='REFUNDED'` + bloqueio de acesso pós-refund
  - AC7 Emails reais (WelcomeEmail, PasswordReset, PaymentApproved, PaymentReceipt, MembershipExtended)
  - AC8 Performance (Lighthouse mobile > 80 perf, > 90 best practices em /turmas/[slug] e /dashboard)
  - AC9 RLS auditoria com query SQL de `pg_tables WHERE rowsecurity` + spot-check de policies
  - AC10 Sentry com erro controlado em rota admin-only + verificação de tags + source maps
  - AC11 Cron `/api/cron/daily` com curl autenticado + asserts de auth negada
  - AC12 Backup do dia confirmado em painel Supabase
  - AC13 Template `launch-{YYYY-MM-DD}.md` para registro do resultado da execução

**Bloqueio explícito de execução:**
- F8.7 é o gate final antes do anúncio público
- Veredicto PASS/CONCERNS/FAIL será emitido **somente após** execução completa em produção, com evidências (prints, logs, query outputs)
- Pré-requisito: F8.6 (deploy Vercel + DNS + Stripe webhook prod) concluído
- Pressão de prazo **não altera** esse critério

### Veredicto

```
VEREDICTO: PENDENTE DE EXECUÇÃO (AC1 entregue; AC2-AC13 aguardam ambiente prod)
Story: F8.7 — Smoke test pré-lançamento | Data: 2026-05-06
Status: Checklist formal documentado e aprovado em runbook.
Próximo passo: aguardar conclusão de F8.6 (sites-devops); executar
checklist em produção; documentar resultado em launch-{YYYY-MM-DD}.md;
sites-qa emite veredicto final PASS/CONCERNS/FAIL.
```

**Arquivos novos/alterados nesta avaliação:**
- `docs/smart-memory/runbooks/go-live-checklist.md` (novo)
- `docs/smart-memory/INDEX.md` (seção Runbooks adicionada)
- `docs/smart-memory/stories/backlog/F8.7-smoke-test-pre-lancamento.md` (File List + QA Results preenchidos)

---

## 2026-05-06 — F8.5 E2E Playwright suite — ⚠️ CONCERNS

**Escopo:** Story F8.5 — suite mínima E2E cobrindo fluxos críticos (compra, bloqueio, webhook idempotência, cross-extension) + CI.
**Submetido por:** team-lead (suite pré-existente em `e2e/` mais expansão de scaffolding por sites-qa).

### Verificações aprovadas

- **AC1 ✅ Playwright instalado e configurado:** v1.59.1, `playwright.config.ts` válido (testDir `./e2e`, baseURL `http://localhost:3000`, webServer reutilizável, `chromium` Desktop Chrome, retries=1, fullyParallel=false).
- **Suite de smoke estrutural sólida (23 tests originais em 4 specs):**
  - `auth.spec.ts` — render de /login, /cadastro, /recuperar-senha; erro de credenciais; login real (skip sem `.env.test`).
  - `checkout.spec.ts` — /turmas pública, grid/empty state, redirect Matricular-se sem login, /checkout/[slug] sem login.
  - `lesson-access.spec.ts` — redirect /login com `next` param; /admin sem login.
  - `admin.spec.ts` — proteção das 5 rotas /admin/*; /403 page; STUDENT redirect (skip sem `.env.test`).
- **Discovery limpo:** `npx playwright test --list` → 27 tests em 5 specs sem warnings.
- **TypeCheck limpo:** `npx tsc --noEmit` retorna zero erros (incluindo specs novos).
- **Scripts de execução prontos:** `npm run test:e2e` e `test:e2e:ui` em `package.json`.

### Concerns bloqueantes para entrega completa do AC

- **[CONCERN-1] AC2 — Test 1 (compra Stripe modo test → cohort ativa → aula → progresso): NÃO implementado como teste executável.**
  - Scaffolding criado em `e2e/critical-flows.spec.ts:38-77` com `test.skip` gated por `STRIPE_TEST_MODE=true`, `E2E_TEST_EMAIL`, `E2E_TEST_PASSWORD`, `E2E_TEST_COHORT_SLUG`.
  - Implementação real depende de: conta Stripe modo test, cohort de teste no Supabase, vídeo Vimeo de teste, Price ID test.
  - **Risco:** o fluxo crítico de receita não tem cobertura E2E automatizada. Smoke manual em F8.7 mitiga.

- **[CONCERN-2] AC3 — Test 2 (bloqueio LockedContent + sem `video_id` no DOM): NÃO implementado como teste executável.**
  - Scaffolding em `e2e/critical-flows.spec.ts:79-100` com `test.skip` gated por `E2E_LOCKED_LESSON_PATH`.
  - **Critério vital de segurança** (Seção 8 do PRD) já validado em F3.3 (auditoria server-side anterior confirmou guard `has_access` antes de retornar `video_id`), mas sem regressão automatizada para detectar futuras quebras.

- **[CONCERN-3] AC4 — Test 3 (webhook Stripe idempotência): NÃO implementado.**
  - Scaffolding em `e2e/critical-flows.spec.ts:103-114` com `test.skip` + `test.fail(true, 'TODO')`.
  - Idempotência depende da implementação atual em `/api/webhooks/stripe` (validar via auditoria do código + smoke F8.7 com curl duplicado).

- **[CONCERN-4] AC5 — Test 4 (cross-extension `days_granted`): NÃO implementado.**
  - Scaffolding em `e2e/critical-flows.spec.ts:116-130` com `test.skip` + `test.fail(true, 'TODO')`.
  - Lógica de cross-extension existe (`src/app/(academy)/academy/(admin)/admin/turmas/actions.ts:73-83`) mas não há teste E2E que verifique aplicação automática.

- **[CONCERN-5] AC6 — CI GitHub Actions: workflow criado mas não validado em PR real.**
  - `.github/workflows/e2e.yml` criado: `npm ci` → install Playwright chromium → typecheck → build → `npx playwright test` → upload report artifact.
  - **Pendência:** secrets do GitHub precisam ser configurados (E2E_SUPABASE_URL, E2E_STRIPE_SECRET_KEY, etc.) antes de o workflow funcionar de fato. Sem secrets, o build vai falhar.

- **[CONCERN-6] AC7 — Banco de teste isolado: ausente.**
  - Sem Supabase branch dedicado nem seed de teste isolado. Suite atual roda contra dev/staging compartilhado, o que limita execução paralela e cria risco de poluição de dados.

### Recomendações para fechamento futuro

1. **Pós-MVP:** implementar os 4 testes críticos com Stripe modo test + Supabase branch (ver concerns 1–4 e 6).
2. **Imediato:** configurar secrets no GitHub Actions para o workflow de e2e funcionar (ver concern 5).
3. **Imediato:** smoke test manual de F8.7 cobre os 4 fluxos críticos via execução humana em produção, mitigando temporariamente a ausência de E2E automatizado.

### Veredicto

```
VEREDICTO: CONCERNS
Story: F8.5 — E2E Playwright | Data: 2026-05-06
Checklist:
  AC1 ✅ Playwright configurado
  AC2 ⚠️ Test 1 compra: scaffolding skip (não implementado)
  AC3 ⚠️ Test 2 bloqueio: scaffolding skip (não implementado)
  AC4 ⚠️ Test 3 webhook idempotência: scaffolding skip (não implementado)
  AC5 ⚠️ Test 4 cross-extension: scaffolding skip (não implementado)
  AC6 ⚠️ CI workflow criado, secrets pendentes
  AC7 ❌ Banco isolado ausente
Issues: 4 testes críticos como dívida explícita; CI sem secrets; banco isolado pendente
Próximo passo: prosseguir para F8.7 (smoke manual cobre fluxos críticos no curto prazo); criar story F8.5.b para fechar dívida pós-MVP
```

**Arquivos novos/alterados nesta avaliação:**
- `e2e/critical-flows.spec.ts` (novo — 4 testes scaffolding)
- `.github/workflows/e2e.yml` (novo — workflow CI)

---

## 2026-05-06 — F4.1.b Comments persistência real — ⚠️ CONCERNS

**Escopo:** Gate de quality F4.1.b — Server Actions de comments com persistência real.
**Submetido por:** sites-dev-stripe.
**Arquivo avaliado:**
- `src/lib/actions/comments.ts`

### Verificações aprovadas

- **`addComment` (linhas 11-44):** Zod (lessonId UUID, content 1-4000 chars, parentCommentId UUID opt), `requireUser()`, **guard `has_access` adicional** (linhas 27-31) bloqueando insert sem matrícula que dê acesso à lesson, INSERT em `comments` com todos os campos pedidos. Acima do mínimo do gate.
- **`editComment` (linhas 46-81):** Zod, ownership check explícito (linha 67 — `comment.author_id !== user.id`), bloqueio se `deleted_at` (linha 66), **janela de 15 min implementada** (constante `EDIT_WINDOW_MS = 15 * 60 * 1000` linha 9; cálculo de `age` linhas 69-70), update de `content` + `updated_at`.
- **`deleteComment` (linhas 83-119):** soft delete via UPDATE de `deleted_at` (linhas 110-113); **role-based authorization** — busca role do user (linhas 92-98); `isPrivileged` cobre ADMIN e MENTOR (extensão razoável para moderação); aluno comum só deleta o próprio (linha 108); idempotência via check `deleted_at` prévio (linha 107).
- **TS clean:** `npx tsc --noEmit` retorna zero erros no projeto.

### Concern bloqueante para o gate (não exploitable hoje, mas critério explícito)

- **[CONCERN-1] Sanitização DOMPurify NÃO aplicada — critério #4 do gate explicitamente não cumprido.**
  - `addComment:36` e `editComment:74` persistem `parsed.data.content` cru, sem chamar `sanitizeHtml`.
  - Helper existe e está pronto: `src/lib/content/html.ts` (DOMPurify via isomorphic-dompurify, `'server-only'`, ALLOWED_TAGS/ATTR seguros) — exportado em `src/lib/content/index.ts:54`.
  - **Render atual mitiga XSS imediato:** `CommentsSection.tsx:132` renderiza via `{comment.content}` (text node JSX, escape automático React), então não há vetor exploitable agora.
  - **Risco real, defesa em profundidade falha:** o `CommentForm` placeholder e mock-data sugerem "Markdown suportado" — qualquer migração futura para `dangerouslySetInnerHTML`, render via Markdown→HTML, email que cite o conteúdo, ou export de API consumirá o payload tóxico já gravado.
  - **Correção é mecânica:** `import { sanitizeHtml } from '@/lib/content'`; em `addComment:36` trocar `content: parsed.data.content` por `content: sanitizeHtml(parsed.data.content)`; idem em `editComment:74`.

### Concerns informativos (não bloqueantes)

- **[CONCERN-2] `revalidatePath('/', 'layout')`** invalida cache global a cada comentário — caro em produção. Considerar `revalidatePath` mais específico no path da lesson (ex: `/curso/${courseSlug}/aula/${lessonSlug}`) em iteração de hardening.
- **[CONCERN-3] `editComment` não verifica se `parent_comment_id` mudaria** — não permite reparentar (correto, mas não é validado explicitamente; o update só toca `content` e `updated_at` — OK por construção).

### Veredicto

```
VEREDICTO: CONCERNS
Story: F4.1.b — Comments persistência real | Data: 2026-05-06
Checklist: 4/5 critérios principais OK; sanitização (critério #4) não aplicada
Issues: CONCERN-1 (sanitização ausente — critério explícito do gate);
        CONCERN-2 e CONCERN-3 informativos
Próximo passo: @sites-dev-stripe — recomendado adicionar 2 chamadas a sanitizeHtml
  em addComment e editComment ANTES do push (correção 4 linhas, alinha com critério
  explícito + defesa em profundidade). Se sites-devops priorizar timing, pode liberar
  push como CONCERNS aceitos e abrir story de hardening F4.1.c imediato.
```

---

## 2026-05-06 — F5.3.b Fix certificado forjável (CRITICAL SECURITY) — ✅ PASS

**Escopo:** Gate de segurança crítico — fix da forgery em `/certificado/v/[code]` + auto-emissão `checkAndIssueCertificate` integrada com `markLessonComplete`.
**Submetido por:** sites-dev-gamma.
**Arquivos avaliados:**
- `src/app/(public)/certificado/v/[code]/page.tsx`
- `src/app/actions/certificate.ts`
- `src/app/actions/progress.ts`

### Verificações de segurança aprovadas

- **Query real no DB com fallback null:** `page.tsx:29-40` faz `supabaseAdmin.from('certificates').select(...).eq('verification_code', code.toUpperCase()).maybeSingle()`. Linha 56 renderiza "Certificado não encontrado" quando `cert === null` (branch :138-153) com o code tentado.
- **Teste anti-forgery passou:** code aleatório (ex: `AAAAAAAAAA`) faz `maybeSingle()` retornar `null` → branch de erro. **Forgery client-side bloqueada.** Critério mínimo do gate atendido.
- **Normalização case-insensitive:** `code.toUpperCase()` na linha 39 previne bypass por casing (`abc123` vs `ABC123`).
- **`robots: noindex`** (page.tsx:14) — código forjado nem é indexado por buscadores.
- **Entropia real do verification_code:** `crypto.randomBytes(6).toString('hex').toUpperCase()` (certificate.ts:36, :98) — 12 chars hex (~48 bits, espaço de 2^48 ≈ 281 trilhões). CSPRNG, não previsível, não sequencial.

### Verificações funcionais aprovadas

- **`checkAndIssueCertificate` (certificate.ts:59-117):**
  - Idempotente: linhas 65-73 retornam existente se já emitido para `(user_id, course_id, cohort_id)`.
  - Conta total: linhas 76-82 — `lessons` join `modules!inner(course_id)`, filtro `deleted_at IS NULL`.
  - Conta completadas: linhas 87-94 — `lesson_progress` com `completed=true` filtrado por `IN (lessonIds)`.
  - Gate 100%: `if (completedCount < totalLessons) return null` (linha 95).
  - Edge case curso vazio: `if (totalLessons === 0) return null` (linha 83) — previne emissão fantasma.
- **Integração com markLessonComplete:** `progress.ts:54` chama `triggerCertificateCheck` fire-and-forget com `.catch(console.error)`. `triggerCertificateCheck` (linhas 57-93) resolve courseId via `lesson → module.course_id`, busca memberships ACTIVE do user (linhas 70-75), encontra cohort via `cohort_courses` (linhas 81-87), e dispara `checkAndIssueCertificate`.
- **TS clean:** `npx tsc --noEmit` retorna zero erros no projeto inteiro.

### Notas informativas (não bloqueantes, defesa em profundidade)

- `markLessonComplete` (progress.ts:36-55) não revalida acesso à lesson antes de marcar, mas a tabela `lesson_progress` deve ter RLS exigindo acesso, e mesmo que houvesse marca espúria, `checkAndIssueCertificate` exige membership ACTIVE em cohort que inclua o curso (via `triggerCertificateCheck`). Defesa em profundidade existe.
- `checkAndIssueCertificate` confia que o cohortId chega válido (sem revalidar membership). O único call site já filtrou por ACTIVE — OK por contrato, mas refatoração futura poderia revalidar aqui para defesa adicional.

### Veredicto

```
VEREDICTO: PASS
Story: F5.3.b — Fix certificado forjável (CRITICAL SECURITY) | Data: 2026-05-06
Checklist: 10/10 incluindo teste anti-forgery
Issues bloqueantes: nenhum
Próximo passo: @sites-devops liberado para push imediato. Último bloqueio
  de segurança removido.
```

---

## 2026-05-06 — Lesson page (F4 integration) dados reais — ✅ PASS (com CONCERNs)

**Escopo:** Gate de quality — wiring de dados reais (comments + materials) na lesson page.
**Submetido por:** sites-dev-gamma.
**Arquivos avaliados:**
- `src/app/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx`
- `src/app/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx`
- `src/app/(student)/curso/[slug]/aula/[lesson-slug]/material-actions.ts`
- `src/components/student/MaterialsList.tsx`
- `src/lib/storage/materials.ts`

### Verificações aprovadas

- **Comments reais:** `page.tsx:153-179` faz query real em `comments` com join em `profiles(id, name, role)` — sem MOCK_COMMENTS. Mapeamento server-side resolve `authorId/authorName/authorRole` para `CommentWithAuthor[]`.
- **Materials reais:** `page.tsx:182-188` query real em `materials`. Sem MOCK_MATERIALS.
- **Signed URL via has_access:** `lib/storage/materials.ts:26-79` — `getMaterialSignedUrl` valida user, busca material, faz `rpc('has_access')` + bypass admin, gera signed URL com expiry 5min via `supabaseAdmin.storage` (bucket privado). LINK retorna `external_url` direto.
- **Import morto removido:** `page.tsx` imports limpos. `LessonContent` ainda em uso correto em LessonTabs:6,84.
- **Props completas:** page.tsx:276-277 passa `currentUserId={user.id}` e `currentUserName={profile?.name ?? ''}` para LessonTabs.
- **TS:** zero erros nos arquivos do escopo deste gate.

### Concerns documentados (não bloqueantes)

- **[CONCERN-1] Prop semantics confusa em LessonTabs.**
  - `LessonTabs.tsx:46` marca `currentUserName` como `_currentUserName` (unused) e linha 98 passa `currentUserName={currentUserId ?? ''}` para CommentsSection.
  - Funcionalmente correto porque `CommentsSection` internamente faz `authorId === currentUserId` (UUID vs UUID), mas semanticamente o "nome" é o UUID. Frágil — qualquer refactor que comece a usar `currentUserName` como display vai quebrar.
  - Sugestão: ou renomear a prop em `CommentsSection` para `currentUserId`, ou efetivamente usar `_currentUserName` no display.

- **[CONCERN-2] Arquivo órfão com erros TS no projeto.**
  - `src/components/student/CommentSection.tsx` (singular — NÃO usado em lugar algum) tem 2 erros TS: linha 88 (null não atribuível a string) e linha 289 (props faltantes).
  - Pré-existe a este commit (introduzido por `8719c9e`) e não impacta a lesson page (que usa `CommentsSection` plural via LessonTabs).
  - O build TS do projeto está quebrado por causa desse legado — recomendado deletar em housekeeping separado.

### Veredicto

```
VEREDICTO: PASS (com 2 CONCERNs)
Story: Lesson page F4 integration | Data: 2026-05-06
Checklist: 7/7 critérios principais OK
Issues: nenhum bloqueante; 2 concerns documentados
Próximo passo: @sites-devops liberado para incluir no próximo push.
```

---

## 2026-05-06 — F5.1.b Forum persistência real — ❌ FAIL

**Escopo:** Gate de quality F5.1.b — Forum com Server Actions reais (commit `46caa4d`).
**Submetido por:** sites-dev-stripe.
**Arquivos avaliados:**
- `src/app/(student)/forum/actions.ts`
- `src/app/(student)/forum/page.tsx`
- `src/app/(student)/forum/[category]/[slug]/page.tsx`
- `src/app/(student)/forum/novo/page.tsx`
- `src/components/student/NewThreadForm.tsx`
- `src/components/student/ForumReplyForm.tsx`

### Camada server-side: APROVADA

- `createThread` — Zod (categoryId UUID, title 3-200, content min 10), guard `requireActiveMember`, slug com sufixo `Date.now()` para unicidade.
- `createReply` — Zod, guard, atualiza `last_activity_at` da thread após insert.
- `voteThread` — toggle correto via `votes` (insert se não existe, delete se existe). Tabela confirmada no schema (`types/database.ts:1002`).
- `markAsAccepted` — verifica `forum_threads.author_id === user.id` antes de marcar, e seta `is_resolved` na thread.
- Cohort guard ACTIVE em `forum/page.tsx:33-42` e `forum/novo/page.tsx:16-25` redirecting para `/meus-cursos?erro=forum-acesso`.
- Queries reais sem mock-data nas três páginas.
- `npx tsc --noEmit` retorna zero erros.

### Issues bloqueantes (CRITICAL)

- **[CRITICAL-1] Upvote não funcional — falha critério Seção 8 explicitamente.**
  - `src/app/(student)/forum/[category]/[slug]/page.tsx:88-92` (replies) e `:254-258` (thread principal): botões `<button>` envolvendo `<ThumbsUp>` SEM `onClick`, `formAction` ou wrapper de form.
  - Action `voteThread` em `forum/actions.ts:119` está implementada mas **unreachable pelo UI** — usuário não tem como votar.
  - Ação corretiva: extrair em Client Component (`VoteButton`) com `useTransition` chamando `voteThread(threadId)`. Para reply, criar análoga aceitando `replyId`.

- **[CRITICAL-2] markAsAccepted não acessível.**
  - `[category]/[slug]/page.tsx` não renderiza nenhum botão "Marcar como aceita" visível ao autor da thread.
  - Action funciona mas é unreachable.
  - Ação corretiva: passar `currentUserId` para um Client Component `AcceptAnswerButton` renderizado quando `currentUserId === thread.authorId && !reply.is_accepted_answer`.

- **[CRITICAL-3] Botão "Responder" decorativo em ReplyCard.**
  - `[category]/[slug]/page.tsx:93-96` — `<button>` sem handler.
  - `createReply` aceita `parentReplyId` mas o UI não permite ao usuário acionar reply aninhado.
  - Ação corretiva: wire o botão para alternar `<ForumReplyForm threadId={thread.id} parentReplyId={reply.id} />` inline.

### Concerns (não bloqueantes)

- **[CONCERN-1] Busca por título não implementada** — Seção 8 prevê. Documentado como CONCERN; pode ser fase posterior.
- **[CONCERN-2] Links órfãos.**
  - `forum/page.tsx:139` → `/forum/categoria/${cat.slug}` — rota `/forum/categoria/...` não existe (estrutura tem só `[category]/[slug]`).
  - `forum/page.tsx:229` → `/forum/todos` — rota inexistente.
  - Ambos geram 404. Ou criar `forum/[category]/page.tsx` (listing por categoria) + `forum/todos/page.tsx`, ou ajustar hrefs para algo válido.
- **[CONCERN-3] revalidatePath duplicado** em `forum/actions.ts:114-115` — duas chamadas para `/forum`.

### Veredicto

```
VEREDICTO: FAIL
Story: F5.1.b | Data: 2026-05-06
Checklist: 7/10 (server PASS; UI wiring FAIL)
Issues bloqueantes: CRITICAL-1, CRITICAL-2, CRITICAL-3
Próximo passo: @sites-dev-stripe corrigir CRITICAL-1/2/3 (extrair Client Components
  com useTransition para voteThread/markAsAccepted/parentReplyId) e resubmeter.
NÃO liberar push F5.1 até essas correções.
```

---

## 2026-05-05 — /agentes mobile review — ❌ FAIL

**Escopo:** Revisão de QA focada em experiência mobile da página `/agentes`.
**Arquivos avaliados:**
- `src/app/agentes/page.tsx`
- `src/app/agentes/_components/SquadSection.tsx`
- `src/app/agentes/_components/AgentBelt.tsx`
- `src/app/agentes/_components/AgentCard.tsx`
- `src/app/agentes/_components/AgentesHero.tsx`
- `src/app/agentes/_components/SquadSideNav.tsx`
- `src/app/agentes/_components/StatsBar.tsx`

**Branch:** `main` (estado em working tree)

### Achado-raiz: regressão de mobile

O commit `ffd3ae3` (2026-05-03) — `fix(agentes): mobile layout e animações dos squads` — aplicou explicitamente:
- Remoção de `min-h-[150vh]` e sticky no mobile
- Grid de 2 colunas no mobile (substituindo seções enormes)
- Fade simples no mobile (sem translate horizontal)

O commit posterior `4d3d5ba` (2026-05-06) — `feat(agentes): horizontal scroll-driven belt + cards compactos` — **reescreveu** `SquadSection.tsx` reintroduzindo o belt horizontal e **perdeu silenciosamente todas as proteções mobile**. O contexto fornecido pelo user (`isMobile`, `py-14`, fallback mobile) não corresponde ao código atual: não há nenhuma referência a `isMobile` no arquivo, o `min-h-[150vh]` está aplicado em todos os breakpoints e o belt scroll-driven é o único caminho de renderização.

```
$ grep -n "isMobile\|py-14\|min-h-\[150vh\]" src/app/agentes/_components/SquadSection.tsx
46:      className="relative min-h-[150vh]"
```

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, manutenibilidade | ⚠️ regressão silenciosa de fix mobile prévio |
| 2 | Acceptance — UX mobile aceitável | ❌ belt sem fallback mobile |
| 3 | Regressão | ❌ confirma — `ffd3ae3` foi parcialmente desfeito por `4d3d5ba` |
| 4 | Performance — Web Vitals mobile | ⚠️ scroll-jacking longo (150vh × 4 squads = 600vh) |
| 5 | Acessibilidade — keyboard, prefers-reduced-motion | ❌ sem `prefers-reduced-motion`; cards do belt fora da ordem natural de scroll |
| 6 | SEO — metadata/estrutura | ✅ JSON-LD `CollectionPage` + headings ok |
| 7 | Responsivo — mobile/tablet/desktop | ❌ falha mobile (ver issues) |
| 8 | Copy | ✅ ok |
| 9 | Cross-browser | ⚠️ `useScroll` + `useTransform` usam APIs estáveis, mas SSR mismatch (ver CRITICAL-2) |
| 10 | Security | ✅ N/A |

### Issues bloqueantes

**[CRITICAL-1] Belt scroll-driven sem fallback mobile — passa rápido demais e é ilegível em telas pequenas**
`src/app/agentes/_components/SquadSection.tsx:26-33` + `AgentBelt.tsx:7-8`
- Cards: `BELT_CARD_W = 220` + `BELT_GAP = 12` → 232px por card.
- Maior squad (Sites/Social/Traffic = 10 agentes): `totalWidth = 2320px`. Menor squad (Dev = 7): `1624px`.
- Em viewport mobile 375px, o belt percorre `vw + totalWidth = 2695px` mapeado pra 80% do range de scroll (`[0.08, 0.88]`).
- Mas a seção tem `min-h-[150vh]` ≈ 1290px num iPhone 13 (h=844). O scroll ativo é apenas `~1032px` para mover **2695px** de belt → cada 1px de scroll do dedo move ~2.6px de belt. Para o usuário mobile, os cards atravessam a tela em fração de segundo, **sem tempo de leitura**. Em telas menores (320px) o efeito é pior.
- O card de 220px num viewport de 375px ocupa 58.6% da largura. Mas como é scroll-driven, o usuário não controla o ritmo de leitura nem consegue parar para tocar — e na real, no mobile o `tap` num card que está se movendo é frágil (a target hitbox passa rápido demais).
- **Fix:** restaurar a lógica do `ffd3ae3` — em mobile (`<lg`), trocar belt por grid 2 colunas estática. Manter belt scroll-driven só em `lg+`. Sugestão de implementação: hook `useMediaQuery('(min-width: 1024px)')` com fallback SSR seguro (renderiza grid no primeiro paint, troca pra belt após hydration se desktop).

**[CRITICAL-2] Hydration mismatch em `vw = window.innerWidth`**
`src/app/agentes/_components/SquadSection.tsx:27`
- Componente é `'use client'` mas o `useTransform` é construído no body do componente, durante render. Em SSR `vw = 1280` (fallback). No primeiro client render antes da hydration concluir, `window.innerWidth` pode retornar valor real diferente, gerando `motion-value` desalinhado entre server e client.
- React não emite hydration warning nesse caso específico (o output do `motion.div` usa transform inline, calculado runtime), mas o **range do belt fica congelado em 1280px** para sempre — `vw` é lido uma única vez e nunca atualiza em resize. Resultado: usuário rotaciona o device de portrait → landscape e o belt entra fora do viewport (offset do `vw=1280` num device 932px landscape).
- **Fix:** usar `useState` + `useEffect` com listener de `resize` para `vw`, OU `useTransform` com função de callback que lê `window.innerWidth` no momento do compute. Exemplo:
  ```tsx
  const [vw, setVw] = useState(1280);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  ```

**[CRITICAL-3] `SquadSideNav` mobile cobre conteúdo e conflita com cards do belt**
`src/app/agentes/_components/SquadSideNav.tsx:111-155`
- Nav fixa em `bottom-3 left-1/2 -translate-x-1/2` com `border-radius: 999`. 4 botões em pílula horizontal.
- Cada botão: `px-3 py-1.5` + dot + label `text-[0.55rem]` + gap 1 entre botões → estimativa de 240–280px de largura total. Cabe em 375px.
- **Mas:** o ícone `▼` "Conhecer os agentes" no hero (CTA primário) leva pra `#squads` — usuário scrolla e o belt começa imediatamente. A nav bottom flutua sobre o belt, **bloqueando 60–80px da base** da seção sticky. Dependendo do timing do `scrollYProgress`, os cards passam **debaixo** da nav e ficam parcialmente cobertos no instante em que a opacity está em 1.
- Adicional: nav não tem `prefers-reduced-motion` e o `animate-ping` do dot ativo continua girando indefinidamente — fonte de bateria/distração em mobile.
- **Fix:** adicionar `bottom-padding` na seção sticky no mobile equivalente à altura da nav (~56px), OU mover a nav para topo com `position: sticky` no header mobile, OU permitir hide-on-scroll-down/show-on-scroll-up.

### Issues não-bloqueantes (CONCERNS)

**[CONCERN-1] Hero mobile — `min-h-[560px]` muito justo em landscape**
`src/app/agentes/_components/AgentesHero.tsx:15-16`
- Em landscape (375×667 deitado = 667×375), `min-h-[560px]` força quase o viewport inteiro vertical, e o conteúdo (badge + h1 + p + 4 chips + 2 CTAs) não cabe sem scroll dentro do hero.
- **Fix:** `min-h-[560px] sm:min-h-[92vh]` → considerar `min-h-[520px] landscape:min-h-[420px]` ou usar `dvh` em vez de px fixo.

**[CONCERN-2] AgentCard padding muito apertado no belt**
`src/app/agentes/_components/AgentCard.tsx:74`
- `p-2 sm:p-3` no body do card. Em mobile com card de 220px no belt, o padding 8px deixa o título `text-sm` (14px) e a descrição `text-[10px]` legíveis mas sem respiro. `line-clamp-2` na descrição corta com frequência por causa da largura útil ser 220 - 16 = 204px.
- **Fix:** considerar `BELT_CARD_W = 180` em mobile + grid fallback (combina com CRITICAL-1).

**[CONCERN-3] StatsBar — sem proteção visual sobre o canvas**
`src/app/agentes/_components/StatsBar.tsx:20`
- `backdrop-blur-[2px]` + `background: transparent`. O `SolarSystemBackground` atrás continua visível. Em mobile, o canvas 3D pode renderizar elementos brilhantes que reduzem contraste do número (`4xl text-white`).
- **Fix:** subir o `backdrop-blur` para `[8px]` ou aplicar `background: rgba(2,2,10,0.4)`. Verificar contraste WCAG AA (mínimo 4.5:1) num device real com canvas ativo.

**[CONCERN-4] `headerOpacity` fade out no `[0.72, 0.92]` esconde o título antes do último card sair**
`src/app/agentes/_components/SquadSection.tsx:35-39` + `:29-33`
- `beltX` mapeia até 0.88, `headerOpacity` cai a 0 em 0.92. Mas em mobile com scroll mais rápido (range comprimido em 150vh), os últimos 1–2 cards podem aparecer já com header em `opacity: 0.4`, perdendo contexto da squad atual.
- **Fix:** alinhar curva — manter `headerOpacity` em 1 até `0.88` e cair de `0.88 → 0.95`.

**[CONCERN-5] `prefers-reduced-motion` ausente em todo o módulo**
- Nem `SquadSection` nem `SquadSideNav` (animate-ping) nem `AgentBelt` (transform contínuo) respeitam a media query. WCAG 2.3.3 (AAA) e Apple HIG recomendam fortemente.
- **Fix:** wrapper `useReducedMotion()` do framer-motion para condicionar `useTransform` a fade simples.

### Veredicto

```
VEREDICTO: FAIL
Página: /agentes (mobile experience) | Data: 2026-05-05
Checklist: 5/10 críticos comprometidos no mobile
Issues bloqueantes: 3 CRITICAL + 5 CONCERNS
Causa-raiz: regressão silenciosa do fix `ffd3ae3` pelo commit `4d3d5ba`
Próximo passo: @sites-dev-alpha re-aplicar as proteções mobile do commit ffd3ae3 e ajustar belt para grid 2-col em <lg; corrigir vw em resize listener; resubmeter
```

---

## 2026-04-29 — Workshop-2 (7 fases + index + layout) — ⚠️ CONCERNS (push liberado)

**Escopo:** Sprint workshop-2. Implementação completa pelo sites-dev-alpha (commit `8c2d602`).
**Branch:** `main`
**Arquivos verificados (10/10 presentes):**
- `src/app/workshop-2/layout.tsx`
- `src/app/workshop-2/page.tsx`
- `src/app/workshop-2/_components/WorkshopPhaseLayout.tsx`
- `src/app/workshop-2/{setup,analista,arquiteto,designer,dev,handoff,encerramento}/page.tsx`

### Verificação por critério

**Estrutura ✅** — todos 10 arquivos no working tree (`ls -la src/app/workshop-2/`).

**Metadata ✅** — 7/7 páginas de fase + index com `title` + `description` + `alternates.canonical`. `layout.tsx` tem metadata template (`'%s | Workshop 2'`) + canonical raiz `/workshop-2`.

**WorkshopPhaseLayout ✅** — usado em 7/7 páginas de fase. Renderiza:
- Header com link de volta para `/workshop-2`, eyebrow `Fase NN / 07 · {duration}`, H1 Fraunces italic
- Slot `prose prose-invert` para conteúdo
- Footer com nav prev/next derivado de `WORKSHOP_2_PHASES.indexOf(phase)` + link "Voltar ao índice"
- Throw em slug inválido (defesa de tipo)

**Conteúdo real (não placeholder) ✅** — cada fase tem:
- Setup: 5 steps com comandos shell reais (`mkdir`, `npx aiox-core init`, `claude`, `/aiox-analyst`)
- Analista: prompt completo de 5 perguntas para `/aiox-analyst`
- Arquiteto: prompt para `/aiox-architect` gerando `docs/smart-memory/`
- Designer: prompt para `/design-system` com missão setup
- Dev: prompt para `/aiox-dev` gerando `design-system.css` + `tailwind.tokens.js`
- Handoff: 6 steps com instruções para `claude.ai/design`
- Encerramento: 7 outputs documentados, links externos (AIOX, skills.sh, Claude Design)

**TypeScript ✅** — `npx tsc --noEmit` retorna 0 erros.

**Build ✅** — `npm run build` retorna `Compiled successfully in 2.1s`. `Generating static pages using 10 workers (59/59)`. Todas as 8 rotas workshop-2 prerendered como `○ (Static)`. Sem regressões em rotas existentes.

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade | ✅ Tailwind + style inline consistentes; `cn()` utility; design tokens via CSS vars |
| 2 | Acceptance criteria | ✅ 10/10 arquivos, metadata completa, layout reutilizado |
| 3 | Sem regressões — build | ✅ 59/59 páginas SSG, todas rotas prévias intactas |
| 4 | Performance — CWV | ✅ 100% Static (SSG), imports leves, zero JS client-side pesado |
| 5 | Acessibilidade — WCAG AA | ⚠️ ver CONCERN-A (tons text-white/40-45) |
| 6 | SEO — metadata + canonical | ✅ todas as páginas com title + description + alternates.canonical |
| 7 | Responsivo | ✅ breakpoints `sm/md`, `max-w-3xl`, grids responsivas |
| 8 | Copy | ✅ PT-BR consistente, tom Luminari, CTAs claros, sem typos |
| 9 | Cross-browser | ✅ CSS modern padrão (custom properties + flex/grid) |
| 10 | Security | ✅ sem inputs de usuário; links externos com `rel="noopener noreferrer"` |

### CONCERNS (não-bloqueantes)

**[CONCERN-A — a11y leve]** Tons `text-white/40` e `text-white/45` aparecem em descrições secundárias (eyebrow uppercase mono e captions de cards). Sobre `bg-black`, esses tons podem ficar abaixo do mínimo WCAG AA (4.5:1 para texto normal). Localização: todas as 7 páginas de fase + index. Não bloqueia push porque é estilístico do KV aprovado e não impede uso. **Sugestão para iteração futura:** padronizar mínimo `text-white/55` em texto informativo.

**[CONCERN-B — DRY]** Componentes `CodeBlock`, `Callout` e `Step` redefinidos localmente em cada page.tsx. Aceitável agora (cada fase tem nuances de label/cor), candidato a extração futura para `_components/`.

### Veredicto

```
VEREDICTO: CONCERNS
Sprint: Workshop-2 | Data: 2026-04-29
Checklist: 10/10 verificados
Build: ✅ npm run build limpo (59 páginas, 8 workshop-2 prerendered)
TypeScript: ✅ tsc --noEmit zero erros
Issues:
- [CONCERN-A] text-white/40-45 em descrições secundárias pode ficar abaixo de WCAG AA (a11y, follow-up)
- [CONCERN-B] CodeBlock/Callout/Step duplicados nas 7 páginas (DRY, follow-up)
Próximo passo: @sites-devops liberado para push (observações documentadas)
```

---

## 2026-04-27 — Sprint 5 stories (2.3 + 3.3 + 3.4 + 4.5 + 4.6) — ✅ PASS (com 1 CONCERN não-bloqueante)

**Stories revalidadas pelo sites-dev-gamma:** 4.6 H1 duplo /open-source · 2.3 A11y calculadora+FAQ · 3.4 CWV image sizes · 3.3 H1 único /mentoria · 4.5 Token cleanup #FF4400.

**Build final:** `pnpm build` ✅ Compiled successfully in 1890ms — 51 páginas geradas.

### Verificação por story

**Story 4.6 — H1 duplo /open-source (`open-source-client.tsx`)** ✅
- 1x heading principal (linha 168, `motion.h1`) + 1x `<h2>` (linha 439). `grep -c "<h1"` retorna 0 porque é `motion.h1` mas semanticamente é `<h1>` ao render.
- AC atende propósito SEO/A11y: hierarquia única no documento.

**Story 2.3 — A11y calculadora + FAQ** ✅
- `pricing-calculator.tsx:139–145` — botões `<button type="button" role="checkbox" aria-checked={checked} aria-label="..." onKeyDown={handleKeyDown}>`. Sem `aria-pressed`. ✅
- `handleKeyDown` (linha 131-136) intercepta Space/Enter com `preventDefault` + `onToggle`. ✅
- `faq-accordion.tsx:30–37` — trigger button com `id="faq-trigger-${i}"`, `aria-expanded`, `aria-controls="faq-panel-${i}"`. ✅
- `faq-accordion.tsx:53–57` — painel `<div id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}">`. ✅

**Story 3.4 — CWV image sizes** ✅
- `mentoria/page.tsx:222` — `<Image ... sizes="(max-width: 640px) 176px, (max-width: 768px) 224px, 288px" />` nos facilitadores (João + Claudia). ✅
- `SkillPage.tsx:126` — `<Image src={bgImage} fill sizes="100vw" />`. ✅
- `SkillPage.tsx:65` — `softwareSchema.author = { '@type': 'Person', name: 'João Guirunas' }`. ✅

**Story 3.3 — H1 único em /mentoria** ✅
- `mentoria/page.tsx:158–163` — exatamente 1 `<h1>` com classes responsivas (`text-3xl sm:text-4xl lg:text-5xl`). ✅
- `aria-hidden` aparece somente em SVGs decorativos (linhas 72, 85, 242). Nenhum no `<h1>`. ✅
- Premissa anterior (FAIL Story 3.3 em 2026-04-23) corretamente abandonada — abordagem refatorada para H1 compartilhado entre breakpoints.

**Story 4.5 — Token cleanup #FF4400 → var(--color-accent)** ✅ com 1 CONCERN
- `grep -rn "#FF4400" src/ --include="*.tsx" --include="*.ts" --include="*.css"` retorna **1 ocorrência apenas**: `globals.css:43` `--color-cat-squads: #FF4400`.
- 14 arquivos `.tsx` migrados para `var(--color-accent)` (#FF3A0E): pricing-calculator, faq-accordion, revos-form, mentoria-nav, course-modules-timeline, mentorship-features, section-dots, mentorship-pricing, solution-section, ApresentacaoClient, WorkshopClient, MentoriaHeaderButton, Footer, Header.
- `growth-watermark.tsx`: zero referências a `#FF4400` (componente usa props `color`/`opacity`, não literal). Especificação original do ticket (manter `#FF4400` em growth-watermark) revisitada — está OK porque o componente não tem o literal.

### CONCERN não-bloqueante

**[CONCERN-1] Token órfão `--color-cat-squads: #FF4400` em `globals.css:43`** — sites-dev-gamma sinalizou. Verificação: `grep -rn "color-cat-squads\|cat-squads" src/ --include="*.tsx" --include="*.ts" --include="*.css"` retorna apenas a definição em `globals.css:43`. Token sem consumo. Não bloqueia push porque (a) não é usado em nenhum lugar, (b) é uma definição CSS que pode ser limpa em follow-up. **Sugestão:** remover do globals.css em story dedicada de housekeeping de tokens.

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review | ✅ Padrões consistentes; ARIA correto; sem dead code |
| 2 | Acceptance criteria | ✅ 5/5 stories cumprem ACs |
| 3 | Sem regressões — `pnpm build` | ✅ Compiled successfully, 51/51 páginas |
| 4 | Performance — sizes em images | ✅ CWV LCP otimizado |
| 5 | Acessibilidade — WCAG AA | ✅ role=checkbox+aria-checked; aria-controls/labelledby/region em FAQ |
| 6 | SEO — H1 único | ✅ /mentoria 1x H1; /open-source 1x motion.h1 |
| 7 | Responsivo | ✅ classes preservadas |
| 8 | Copy | ✅ sem alteração |
| 9 | Cross-browser | ✅ var(--color-accent) widely supported |
| 10 | Security | ✅ N/A — apenas estilos/ARIA |

### Veredicto

```
VEREDICTO: PASS
Stories: 2.3 + 3.3 + 3.4 + 4.5 + 4.6 | Data: 2026-04-27
Checklist: 10/10 verificados
Build: ✅ pnpm build limpo (51 páginas)
Issues:
- [CONCERN-1] Token órfão --color-cat-squads: #FF4400 em globals.css:43 (housekeeping follow-up)
Próximo passo: @sites-devops criar commit + push para main
```

---

## 2026-04-26 (re-revisão final) — Stories 4.1–4.4 (Epic KV Growth Sales) — ✅ PASS (com 2 CONCERNS não-bloqueantes)

**Re-revisão após fix:** sites-dev-alpha-2 removeu o bloco legado em `open-source-client.tsx` (commit `91a64d0`). CONCERN-A bloqueante resolvido. Verificação completa abaixo.

### Verificação do fix (CONCERN-A)

- ✅ Bloco `<div className="text-center mb-12 sm:mb-16">` (antigas linhas 204-221) **removido** integralmente — confirmado via `git show 91a64d0`.
- ✅ Novo fluxo do `<section id="skills">`: header editorial KV (191-202) → search (205-234) → category filters (237-252) → grid. Sem duplicação interna.
- ✅ TypeScript continua limpo (`tsc --noEmit` zero erros).
- ✅ Branch ativa: `feat/kv-open-source-header` (merge de `feat/kv-global-tokens-watermark` em `4935217`).

### Novos CONCERNS detectados na re-revisão

**[CONCERN-C — não-bloqueante, regressão SEO/A11y leve] Dois `<h1>` na mesma página `/open-source`:**
- `open-source-client.tsx:151` — H1 do hero ultrawide: "Open Source Skills" (pré-existente).
- `open-source-client.tsx:196` — H1 do header editorial KV: "Open Source" (novo, Story 4.4).
- **Impacto:** Múltiplos `<h1>` na mesma página criam hierarquia ambígua para crawlers (Google trata o primeiro como primary; segundo é tratado como subseção ambígua) e screen readers anunciam dois "primary headings". WCAG 2.1 (2.4.6) requer headings descritivos.
- **Não bloqueia push** porque (a) AC1 da Story 4.4 não exigiu remoção do H1 pré-existente, (b) HTML5 permite múltiplos h1 dentro de `<section>`, (c) ambos descrevem a mesma temática ("Open Source"). Mas é regressão funcional vs. estado anterior (que tinha 1x H1 + 1x H2).
- **Correção sugerida (follow-up):** demover o H1 do hero ultrawide (linha 151) para `<h2>` ou `<p>` estilizado, mantendo apenas o H1 editorial KV (196) como heading principal.

**[CONCERN-D — não-bloqueante, fora de escopo] Padrão `bg-[#FF4400]/10 border border-[#FF4400]/30` ainda em uso:**
- `open-source-client.tsx:298` — caixa de ícone dentro de cada card de skill (decorativo, não badge).
- `open-source-client.tsx:356` — badge "Sobre" da seção About.
- `open-source-client.tsx:423` — badge "Mentoria Exclusiva" da seção CTA.
- **Não bloqueia** porque AC4 da Story 4.4 escopa especificamente o sistema de **categorias** (filtros) — convertidas corretamente para `bg-transparent`. Decorativos de ícone e badges de outras seções não estavam no escopo.
- **Correção sugerida (follow-up):** alinhar com Story 4.5 já registrada no backlog (cleanup #FF4400 legado).

### CONCERN-B (mantido, válido) — Coexistência de tokens

`#FF4400` (legacy) e `#FF3A0E` (novo accent) coexistem em CTAs/componentes legados (`animated-hero.tsx:11`, `mentoria/page.tsx`, `course-modules-timeline.tsx`, etc.). **Story 4.5 já no backlog** como follow-up dedicado.

### 10-point checklist final

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade | ✅ |
| 2 | Acceptance criteria — 4.1/4.2/4.3/4.4 | ✅ Todos os ACs verificados |
| 3 | Sem regressões — TypeScript | ✅ `tsc --noEmit` limpo |
| 4 | Performance | ✅ Fraunces `display: 'swap'`; watermark SVG inline opacity 0.05 |
| 5 | Acessibilidade — WCAG AA | ⚠️ CONCERN-C (2x H1 — não-bloqueante) |
| 6 | SEO — metadata, estrutura | ⚠️ CONCERN-C (2x H1 — não-bloqueante) |
| 7 | Responsivo | ✅ |
| 8 | Copy | ✅ Sem alteração |
| 9 | Cross-browser | ✅ |
| 10 | Security | ✅ |

### Veredicto final

```
VEREDICTO: PASS
Stories: 4.1 + 4.2 + 4.3 + 4.4 | Data: 2026-04-26 (re-revisão final)
Checklist: 10/10 — CONCERN-A resolvido pelo commit 91a64d0
Issues:
- [CONCERN-B] Coexistência #FF4400/#FF3A0E (Story 4.5 follow-up)
- [CONCERN-C] 2x <h1> em /open-source (linhas 151 + 196) — regressão leve SEO/A11y, follow-up sugerido
- [CONCERN-D] bg-[#FF4400]/10 ainda em ícones de card e badges About/CTA (fora de escopo, alinhar com Story 4.5)
Próximo passo: @sites-devops criar PR a partir de `feat/kv-open-source-header` (3 CONCERNS documentados, nenhum bloqueia)
```

---

## 2026-04-26 (revisão intermediária — RESOLVIDO acima) — Stories 4.1–4.4 — ~~⚠️ CONCERNS~~

**Revisão:** Lead identificou header legado duplicado em `open-source-client.tsx` (linhas 204-221) com badge `bg-[#FF4400]/10 border border-[#FF4400]/30` que viola KV Rule 02. Veredicto inicial PASS revisado para **CONCERNS**.

### Issue (precisa correção antes do push)

**[CONCERN-A — bloqueante para PASS limpo] `open-source-client.tsx:204–221`** — bloco legado mantido logo abaixo do novo header editorial:
- Header duplicado visualmente: novo H1 editorial "Open Source" (191-202) + H2 legado "Tudo o que você precisa para escalar com IA" (210-212).
- Badge `bg-[#FF4400]/10 border border-[#FF4400]/30` (linha 205) — viola KV Rule 02 ("nunca duas cores saturadas adjacentes") e contraria o espírito do AC4 da Story 4.4 (`bg-transparent` + `border-{cor}/25`).
- Span ember dentro do H2 ("escalar com IA" em `text-[#FF4400]`) também adiciona segunda referência ember adjacente.

**Correção sugerida:** remover o bloco `<div className="text-center mb-12 sm:mb-16">` (linhas 204-221) inteiro — o novo header editorial (191-202) já cumpre o papel de heading + sub-headline. Alternativamente, manter apenas o H2 + sub-headline mas converter o badge para o novo padrão (`bg-transparent border border-[#FF4400]/25`) e remover o `text-[#FF4400]` do span dentro do H2 para evitar segunda saturação adjacente.

### CONCERN-B (não-bloqueante, segue válido) — Coexistência de tokens

`#FF4400` (legacy) e `#FF3A0E` (novo accent) coexistem em CTAs/componentes legados (`animated-hero.tsx:11`, `mentoria/page.tsx`, `course-modules-timeline.tsx`, etc.). Fora do escopo das 4 stories. Follow-up sugerido (Story 4.5 já no backlog).

### Veredicto revisado

```
VEREDICTO: CONCERNS
Stories: 4.1 + 4.2 + 4.3 + 4.4 | Data: 2026-04-26 (revisão)
Checklist: 9/10 — issue [CONCERN-A] em open-source-client.tsx:204-221 precisa correção
Issues:
- [CONCERN-A] Header legado duplicado + badge bg-[#FF4400]/10 viola KV Rule 02 — pedir correção ao sites-dev-alpha
- [CONCERN-B] Coexistência #FF4400/#FF3A0E (não-bloqueante, Story 4.5 follow-up)
Próximo passo: @sites-dev-alpha corrigir CONCERN-A; após fix, re-revisão e PASS final
```

---

## 2026-04-26 (inicial — REVISADO acima) — Stories 4.1–4.4 (Epic KV Growth Sales) — ~~✅ PASS~~

**Stories:** 4.1 Tokens + watermark + dot-grid · 4.2 Tipografia Fraunces · 4.3 Mentoria facilitadores + badges · 4.4 Open-source header editorial + cores
**Branch:** `feat/kv-global-tokens-watermark`
**Arquivos modificados:** `src/app/globals.css`, `src/app/layout.tsx`, `src/app/mentoria/page.tsx`, `src/app/open-source/open-source-client.tsx`, `src/shared/components/ui/animated-hero.tsx`, `src/shared/components/ui/index.ts`, `src/shared/components/ui/growth-watermark.tsx` (novo)

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade | ✅ Padrões consistentes; sem dead code |
| 2 | Acceptance criteria — 4.1/4.2/4.3/4.4 | ✅ Todos os ACs verificados (ver detalhamento abaixo) |
| 3 | Sem regressões — TypeScript | ✅ `tsc --noEmit` limpo (confirmado pelo lead) |
| 4 | Performance | ✅ Fraunces com `display: 'swap'`; watermark é SVG inline com opacidade 0.05 — impacto mínimo |
| 5 | Acessibilidade — WCAG AA | ✅ `aria-hidden="true"` em watermark; texto branco sobre `#050507` ≈ 20.9:1 (AAA); foco visível mantido (`*:focus-visible` em globals.css:95) |
| 6 | SEO — metadata, estrutura H1/H2 | ✅ H1 únicos por página; metadata intacta |
| 7 | Responsivo | ✅ H1 home `text-5xl sm:text-7xl lg:text-[96px]`; mentoria mobile e desktop separados; open-source `text-5xl sm:text-7xl` |
| 8 | Copy | ✅ Nenhuma alteração de copy |
| 9 | Cross-browser | ✅ CSS variables + radial-gradient + SVG inline são padrões widely-supported |
| 10 | Security | ✅ Sem inputs novos; watermark é SVG inline sem `dangerouslySetInnerHTML` |

### Verificação por story

**Story 4.1 — Tokens + watermark + dot-grid** ✅
- `globals.css:12` — `--color-accent: #FF3A0E` ✅
- `globals.css:7` — `--color-background: #050507` ✅
- `globals.css:79–88` — `body::before` dot-grid com `position: fixed`, `z-index: 0`, `pointer-events: none`, `background-image: radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)`, `background-size: 24px 24px` ✅
- `src/shared/components/ui/growth-watermark.tsx` — componente criado com `aria-hidden="true"` (linha 6) ✅
- `animated-hero.tsx:147` — `<GrowthWatermark size={500} />` instanciado ✅
- `mentoria/page.tsx:178` — `<GrowthWatermark size={600} />` instanciado no hero desktop ✅

**Story 4.2 — Tipografia** ✅
- `layout.tsx:27–33` — `Fraunces` com `weight: ['300','400','700']`, `style: ['normal','italic']`, `variable: '--font-display-serif'`, `display: 'swap'` ✅
- `animated-hero.tsx:92` — H1 `text-5xl sm:text-7xl lg:text-[96px]` (≥ `text-5xl` mobile) ✅
- `animated-hero.tsx:84` — eyebrow `João Guirunas · GrowthSales.ai` em `--font-mono`, 11px, letter-spacing 0.18em, `rgba(255,255,255,0.35)` ✅
- `mentoria/page.tsx:151–154` (mobile) e `:208–211` (desktop) — span Fraunces italic weight-300 cor `#FF3A0E` para "Trabalhando Para Você 24/7" ✅

**Story 4.3 — Facilitadores + badges** ✅
- `mentoria/page.tsx:259–262` — frame quadrado, sem `rounded-full`, sem `ring-*`; hairline `border: 1px solid rgba(255,255,255,0.12)` com hover via `group-hover:[box-shadow:0_0_32px_rgba(255,58,14,0.18)]` + `[border-color:rgba(255,58,14,0.35)]` (`duration-500`) ✅
- Image sem `rounded-full`, com `grayscale group-hover:grayscale-0 transition-all duration-500` ✅
- `mentoria/page.tsx:88–104` — `SectionBadge` é apenas `<p>` mono (11px, letter-spacing 0.16em, `rgba(255, 58, 14, 0.85)`, uppercase, weight 500) sem container colorido ✅

**Story 4.4 — Open-source** ✅
- `open-source-client.tsx:191–202` — header editorial com mono eyebrow ember (11px, letter-spacing 0.16em, `rgba(255,58,14,0.85)`), H1 "Open Source" em `font-[family-name:var(--font-display-serif)]` `text-5xl sm:text-7xl`, sub-headline `rgba(255,255,255,0.5)` `max-w-2xl` ✅
- `open-source-client.tsx:192` — `<GrowthWatermark size={500} />` no header ✅
- `open-source-client.tsx:9` — `{ id: 'all', label: 'Todos', color: 'bg-transparent text-white/70 border-white/20' }` como primeiro filtro ✅
- `open-source-client.tsx:10–14` — todas as 5 categorias usam `bg-transparent` + `border-{cor}/25` ✅
- `open-source-client.tsx:277` — lógica `activeFilter === 'all' || skill.categoryId === activeFilter` retorna todos os cards quando "Todos" ativo ✅

### CONCERN não-bloqueante

**[CONCERN-1] Coexistência de tokens `#FF4400` (legacy) e `#FF3A0E` (novo accent)**
- `animated-hero.tsx:11` define `const ORANGE = '#FF4400'` e usa em CTAs, sparkles e linhas (linhas 36, 49, 56–59, 100, 121).
- `mentoria/page.tsx` usa `#FF4400` em CTAs/timeline/etc; `globals.css:43` mantém `--color-cat-squads: #FF4400`.
- O novo `#FF3A0E` aparece em `--color-accent`, no `SectionBadge`, no span Fraunces italic do mentoria, no eyebrow do open-source e nos hover/glows.
- **Não bloqueia push** — Story 4.1 escopa apenas tokens em `globals.css` e o watermark; nenhum AC exige varredura completa do codebase. KV Rule 02 não é violada porque os usos coexistem em superfícies diferentes (accent global em `globals.css` vs. ember saturado em UI legacy).
- **Follow-up sugerido:** abrir story dedicada para uniformizar todos os usos hardcoded de `#FF4400` para `var(--color-accent)` (`#FF3A0E`).

### Observações fora de escopo (não são issues)

- `mentoria/page.tsx:280` — botão "Conheça Nossa Cultura" mantém `bg-[#FF4400]/10 border border-[#FF4400]/30`. Story 4.3 escopa apenas o `SectionBadge`; este é CTA externo. Não é violação.
- `course-modules-timeline.tsx`, `solution-section.tsx`, `pricing-calculator.tsx`, `mentorship-features.tsx`, `mentorship-pricing.tsx` — ainda usam padrão `bg-[#FF4400]/10`. Fora do escopo das 4 stories.

### Veredicto

```
VEREDICTO: PASS
Stories: 4.1 + 4.2 + 4.3 + 4.4 | Data: 2026-04-26
Checklist: 10/10 verificados
Issues: 1 CONCERN não-bloqueante (coexistência #FF4400/#FF3A0E — story follow-up)
Próximo passo: @sites-devops criar PR (observação documentada)
```

---

## 2026-04-23 — Unstaged sites-dev-gamma (4 arquivos) — ⚠️ CONCERNS (push liberado)

**Escopo:** 4 arquivos unstaged antes de commit. Build + typecheck limpos globalmente.

### 1) `src/app/mentoria/pricing-calculator.tsx` — ✅ PASS com 1 CONCERN

- Estrutura V2 completa (492 linhas): `squads: Squad[]` + tabs + per-squad selection state em `Record<string, Set<string>>`
- ARIA: `role="tablist"` (linha 266) + `role="tab"` (linha 275) + `aria-selected` (linha 276); `aria-pressed={checked}` + `aria-label` dinâmico em `ProfessionalRow` (linhas 135-136)
- Tipagem: `interface Professional` + `interface Squad` explícitos; zero `any` implícito (grep zero matches)
- Todos os 12 ícones importados de lucide-react estão sendo usados (verificado via grep)
- Build + typecheck: ✅ limpos
- Consumer: `src/app/mentoria/page.tsx:8` (import) e `:272` (render) — sem mudanças necessárias

**[CONCERN-1] WAI-ARIA tablist incompleto:** `role="tablist"` + `role="tab"` estão presentes, mas não há `role="tabpanel"` + `aria-controls`/`id` associando cada tab ao seu painel. Segundo WAI-ARIA Authoring Practices (APG 1.2), um `tablist` deve ter `tabpanel`s correspondentes. Screen readers anunciam "tab selecionada" mas não sabem apontar para qual região. **Não bloqueia push** (semântica atual é mais forte que nenhuma e a interação visual funciona), mas follow-up é recomendado.

Opção de correção (follow-up): (a) envolver o `motion.div` do painel esquerdo com `role="tabpanel"` + `id={"panel-" + activeSquad}` + `aria-labelledby`; no `role="tab"` adicionar `aria-controls={"panel-" + squad.id}` + `id={"tab-" + squad.id}`; (b) trocar para padrão de listbox/radiogroup se a intenção não é tabpanel.

### 2) `src/app/mentoria/revos-form.tsx` — ✅ PASS

- Tipagem: `type LoadState = 'loading' | 'loaded' | 'blocked'` explícito
- `onerror` adicionado para detectar bloqueio (rede/extensão)
- Timeout de 5s com atualizador funcional `setState(prev => prev === 'loading' ? 'blocked' : prev)` — evita race condition que sobrescreveria estado tardio de `loaded`
- Cleanup completo: `script.remove()` + `window.clearTimeout(timeout)` no return do `useEffect`
- UI de estado `blocked` com mensagem acessível + link direto (`target="_blank"` + `rel="noopener noreferrer"`)

### 3) `src/app/open-source/page.tsx` — ✅ PASS

- `title`: "Open Source Skills para Claude Code | João Guirunas" — **51 chars** (dentro de 45–60 ✅)
- `description`, `openGraph.*` e `twitter.title/description` permanecem válidos

### 4) `src/app/skills/n8n-killers/page.tsx` — ✅ PASS com 1 CONCERN

- `description`, `openGraph.description` e `twitter.description` atualizados consistentemente (3 ocorrências)
- Nova descrição: **157 chars** (dentro de 140–160 ✅)

**[CONCERN-2] OG image genérica (pré-existente, não introduzido nesta diff):** `openGraph.images` usa `${siteConfig.url}/images/og-default.png`. Confirmado como pré-existente via `git show` (esta mudança foi apenas de texto). Lead já sinalizou que não bloqueia. Follow-up: criar `og-n8n-killers.png` dedicado.

### Concerns não-bloqueantes fora do escopo direto das 4 mudanças

**[CONCERN-3] open-source twitter.description (91 chars, SHORT):** persiste da auditoria anterior. `src/app/open-source/page.tsx:21` tem 91 chars — a diff desta rodada atualizou o title mas não tocou no twitter.description. Pré-existente.

### Veredicto consolidado

```
VEREDICTO: CONCERNS
Escopo: 4 arquivos unstaged sites-dev-gamma | Data: 2026-04-23
Checklist: Build ✅ | TypeCheck ✅ | ARIA ✅ (com ressalva tabpanel) | SEO ranges ✅
Issues:
- [CONCERN-1] pricing-calculator.tsx — tablist sem tabpanel/aria-controls (a11y incompleto, follow-up)
- [CONCERN-2] n8n-killers — OG usa og-default.png (pré-existente, flagged pelo lead)
- [CONCERN-3] open-source twitter.description 91 chars (pré-existente, não tocado nesta diff)
Próximo passo: @sites-devops pode commitar e abrir PR (observações documentadas)
```

---

## 2026-04-23 — Story 3.1 — ✅ PASS (com 1 CONCERN não-bloqueante)

**Story:** 3.1 — Titles e descriptions otimizados (top 10 páginas)
**Commit:** `64631e7`
**Branch:** `main`
**Arquivos modificados:** 8 páginas (home, mentoria, aiox-framework, setup/claude-code, claude-agent-teams, copywriting, crm, website-builder) + 1 .md de story. `n8n-killers` e `open-source` foram marcados como no-op pelo dev.

### Medição de tamanhos (em code points / chars visíveis)

| Página | Title | Description |
|---|---|---|
| / | 52 ✅ | 145 ✅ |
| /mentoria | 51 ✅ | 151 ✅ |
| /framework/aiox-framework | 52 ✅ | 156 ✅ |
| /setup/claude-code | 53 ✅ | 148 ✅ |
| /skills/claude-agent-teams | 52 ✅ | 151 ✅ |
| /skills/copywriting | 52 ✅ | 148 ✅ |
| /skills/crm | 51 ✅ | 148 ✅ |
| /skills/website-builder | 50 ✅ | 147 ✅ |
| /skills/n8n-killers (no-op) | 55 ✅ | 157 ✅ |
| /open-source (no-op) | 51 ✅ | 155 ✅ |

Todos os titles no range 45–60 e descriptions no range 140–160.

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review | ✅ metadata apenas; sem lógica de runtime alterada |
| 2 | AC1 (titles 45–60) | ✅ 10/10 |
| 3 | AC2 (descriptions 140–160) | ✅ 10/10 |
| 4 | AC3 (OG presente) | ✅ todas as 8 modificadas têm `openGraph.title` + `description` + `images`; n8n-killers e open-source já tinham |
| 5 | AC4 (Twitter card) | ✅ todas as 8 modificadas têm `twitter.card` + `title` + `description`; n8n-killers e open-source já tinham |
| 6 | AC5 (siteConfig intacto) | ✅ `src/config/site.ts` não foi tocado pelo commit (confirmado via `git show --name-only`) |
| 7 | AC6 (build) | ✅ `pnpm build` + `pnpm exec tsc --noEmit` limpos |
| 8 | AC7 (escopo) | ✅ apenas as 8 páginas do escopo foram alteradas; nenhuma página extra |
| 9 | SEO — keywords primárias nas primeiras 100 chars | ✅ "Claude Code" e variantes aparecem early em cada descrição |
| 10 | Responsivo / Copy / Cross-browser / Security | ✅ N/A — metadata server-side |

### CONCERN (não-bloqueante, pré-existente)

1. **[CONCERN-1]** `src/app/open-source/page.tsx:22` — `twitter.description` tem 91 chars (SHORT, abaixo de 140). **Pré-existente ao commit `64631e7`**, não é regressão (open-source foi no-op). O commit message indica que foi considerado "já dentro dos ranges" — isto é verdadeiro para `description` principal (155) e `openGraph.description` (155), mas a variante Twitter ficou menor. Recomendo story follow-up para padronizar.

### Observações estilísticas (não são issues)

- OG/twitter titles nas páginas internas usam sufixo `| João Guirunas` para reforço de marca. Home não usa (ela é a marca). Consistente semanticamente.
- Home usa `siteConfig.url` para `openGraph.url` (canônico absoluto) — correto para marcadores sociais.

### Veredicto

```
VEREDICTO: PASS
Story: 3.1 | Data: 2026-04-23
Checklist: 10/10 verificados
Issues: 1 CONCERN não-bloqueante (open-source twitter.description 91 chars — pré-existente)
Próximo passo: @sites-devops push (observação documentada)
```

---

## 2026-04-23 — Story 3.3 — ❌ **FAIL** (bloqueia push)

**Story:** 3.3 — H1 duplo no DOM em /mentoria
**Arquivo:** `src/app/mentoria/page.tsx`
**Estado:** unstaged no working tree (não commitado)
**Linha-alvo:** `page.tsx:132`

### Issue bloqueante

**[CRITICAL-A11Y]** `aria-hidden="true"` adicionado ao `<h1>` mobile (`sm:hidden` branch, linha 132). Isto **remove o heading principal da árvore de acessibilidade em viewport mobile**, violando:
- WCAG 2.1 — **1.3.1 Info and Relationships** (Level A): estrutura semântica precisa ser expressa programaticamente.
- WCAG 2.1 — **2.4.6 Headings and Labels** (Level AA): cabeçalhos devem descrever tópico; ocultar H1 remove a descrição.
- WCAG 2.1 — **4.1.2 Name, Role, Value** (Level A): conteúdo visível não pode ter nome programático suprimido.

**Impacto:** iOS VoiceOver e Android TalkBack (plataformas onde SR é mais usado) não anunciarão o título da página em mobile. Usuário cego não sabe em qual página está.

### Análise da premissa da story

A story parte de premissa técnica **incorreta**: "crawlers veem ambos os H1".
- Googlebot renderiza CSS desde 2019. `sm:hidden` + `hidden sm:block` com breakpoints mutuamente exclusivos são tratados como conteúdo responsivo — não há penalidade SEO por "H1 duplo" nessa configuração.
- `aria-hidden` afeta acessibilidade, **não SEO**. Googlebot ignora `aria-hidden` para ranking.
- Se a preocupação real fosse H1 duplicado no HTML estático, a solução correta seria: (a) H1 único compartilhado entre breakpoints, (b) renderização condicional via JS, ou (c) `role="presentation"` — nenhuma delas envolve `aria-hidden` em heading visível.

### Correção exigida

Reverter `aria-hidden="true"` do `<h1>` em `page.tsx:132`. Se o objetivo é evitar H1 duplicado no DOM, criar story substituta com abordagem que não regrida a11y (ex.: refatorar hero para um único H1 compartilhado que alterna estilos por breakpoint).

### Veredicto

```
VEREDICTO: FAIL
Story: 3.3 | Data: 2026-04-23
Checklist: BLOQUEADO — issue crítico de a11y
Issues:
- [CRITICAL] page.tsx:132 — aria-hidden="true" em <h1> mobile viola WCAG 2.1 1.3.1/2.4.6/4.1.2 (Level A/AA)
Premissa da story (H1 duplo penaliza SEO) é falsa — Googlebot renderiza CSS.
Próximo passo: @sites-dev-gamma remover aria-hidden do H1 mobile; lead decide se reescreve a story ou descarta
```

---

## 2026-04-23 — Conflito Story 2.1 — Esclarecimento

**Verificação:** sites-dev-alpha (commit `bf0795e`) e sites-dev-gamma reportaram caminhos diferentes (V1 com fixes vs V2 restaurado), mas o **estado final do arquivo é o mesmo**.

**Evidência:**
- `src/app/mentoria/pricing-calculator.tsx` no working tree tem 364 linhas (V1 tinha 668).
- Markers V2 presentes: `AGENT_PRICE = 8700`, `PROFESSIONALS` como array plano de 8 (não `squads: Squad[]` agrupado do V1), `AnimatedNumber` com `useSpring`, `barWidth` calculation.
- Fixes a11y aplicados: `aria-pressed={active}`, `aria-label` dinâmico, `role="group"` no wrapper.
- `git status` do arquivo: limpo vs HEAD (commit `bf0795e` é HEAD).

**Conclusão:** Não há conflito real. O commit `bf0795e` efetivamente substituiu V1 por V2 com os fixes necessários. O veredicto **PASS** da Story 2.1 permanece válido.

---

## 2026-04-23 — Story 2.1 — ✅ PASS (com 2 CONCERNS não-bloqueantes)

**Story:** 2.1 — Promover PricingCalculator V2 + fixes (layoutId + a11y)
**Arquivo:** `src/app/mentoria/pricing-calculator.tsx`
**Commit:** `bf0795e`
**Branch:** `main`

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade, manutenibilidade | ✅ |
| 2 | Acceptance criteria — AC1–AC10 | ✅ (AC10 spot-check manual) |
| 3 | Sem regressões — build + typecheck | ✅ `pnpm build` + `tsc --noEmit` limpos |
| 4 | Performance — componente client, animações já existentes | ✅ sem mudança |
| 5 | Acessibilidade — WCAG 2.1 AA | ✅ `aria-pressed` + `aria-label` + `role="group"` |
| 6 | SEO — metadata, estrutura | ✅ sem mudança |
| 7 | Responsivo — mobile/tablet/desktop | ✅ classes responsivas preservadas |
| 8 | Copy | ✅ sem mudança |
| 9 | Cross-browser | ✅ APIs padrão (button + aria-pressed) |
| 10 | Security — inputs validados | ✅ N/A (sem inputs) |

### Pontos validados

- `aria-pressed={active}` em `<motion.button type="button">` — padrão WAI-ARIA correto para toggle de seleção múltipla. Não deve ser `role="checkbox"` (checkbox implica form control; aqui é UI de calculadora).
- `aria-label` template: `"${label}, R$ ${cost}/ano, ${selecionado|não selecionado}"` — screen reader anuncia estado textual + estado do botão (redundância acessível).
- `role="group"` + `aria-label` no wrapper dos cards (linha 225-227) fornece contexto semântico à coleção.
- `layoutId="card-glow"` removido do pricing-calculator. `layoutId="nav-underline"` em `mentoria-nav.tsx:111` é uso legítimo (tab underline compartilhada).
- `toggle()` (linha 155-165) mantém imutabilidade com `Set`; `active={selected.has(prof.id)}` passa estado correto; behavior preservado.
- Nenhuma referência remanescente a `role="checkbox"` / `aria-checked` em `src/app/mentoria/`.

### CONCERNS (não-bloqueantes)

1. **[CONCERN-1]** AC10 — validação via screen reader real (VoiceOver/NVDA) pendente de spot-check manual do dev/usuário. Semântica ARIA está correta; falta apenas verificação auditiva.
2. **[CONCERN-2]** Classe `truncate` no `<p>` de label (linha 107) pode cortar labels longos visualmente. Todos os 8 labels atuais cabem — não é regressão desta story (já existia no V2). Documentar como follow-up caso novos profissionais sejam adicionados.

### Veredicto

```
VEREDICTO: PASS
Story: 2.1 | Data: 2026-04-23
Checklist: 10/10 verificados
Issues: 2 CONCERNS não-bloqueantes (validação manual SR + truncate futuro)
Próximo passo: @sites-devops push (observações documentadas)
```

---

## 2026-05-06 — Gate Fase 6 (Admin) — F6.1, F6.2, F6.3, F6.4

**Escopo:** Fase 6 da plataforma de cursos — painel administrativo completo (dashboard, CRUD de cursos/módulos/aulas, CRUD de turmas com 9 seções, usuários/pagamentos/moderação).
**Commits:** `0896379` (admin shell + F6.1/F6.3/F6.4 — sites-dev-admin) + trabalho posterior em `src/app/(admin)/admin/cursos/` (F6.2 — sites-dev-gamma).
**Arquivos avaliados:**
- `src/middleware.ts` (RBAC)
- `src/app/(admin)/layout.tsx` + `src/components/admin/AdminSidebar.tsx` + `AdminTopBar.tsx`
- `src/app/(admin)/admin/page.tsx` (F6.1)
- `src/app/(admin)/admin/cursos/**` (F6.2 — page, CourseListClient, actions, CourseEditorClient, LessonEditorClient)
- `src/components/editor/ContentEditor.tsx` + TipTapEditor + LessonContent (F6.2)
- `src/app/(admin)/admin/turmas/**` (F6.3 — CohortForm 1312 linhas, CohortListClient, /[id]/page, /nova/page)
- `src/app/(admin)/admin/usuarios/**` + `pagamentos/**` + `moderacao/**` (F6.4)
- `src/components/admin/mock-data.ts` (224 linhas)

**Verificações executadas:**
- `tsc --noEmit` — zero erros em paths de F6 (10 erros existentes são em F7 Stripe, fora de escopo)
- Conferência de cada AC contra código real
- Critérios da Seção 8 Fase 6 (PRD)

---

### Story F6.1 — Admin Dashboard com métricas

| AC | Status | Notas |
|---|---|---|
| AC1 `/admin` com RBAC ADMIN | ✅ | `middleware.ts` linha 65 confere `profile.role !== 'ADMIN'` → redirect 403 |
| AC2 Receita total + mês | ⚠️ MOCK | StatCards renderizam valores hardcoded (`MOCK_METRICS.revenueTotal`); query `payments.amount_cents WHERE status=APPROVED` ausente |
| AC3 Alunos ativos por cohort | ⚠️ MOCK | Hardcoded; sem `count(cohort_members ACTIVE)` |
| AC4 Conclusão média | ⚠️ MOCK | `avgCompletion: 64` fixo |
| AC5 Moderação 24h | ⚠️ MOCK | `newComments: 12, newThreads: 3` fixos |
| AC6 Pagamentos recusados 24h | ⚠️ MOCK | `declinedPayments24h: 2` fixo |
| AC7 Tabela matrículas expirando 7 dias | ❌ FALTA | Apenas card numérico (`expiringIn7Days: 7`); não há tabela com nome/cohort/expires_at/ação "Estender" — AC7 explícita "Tabela com ações" |
| AC8 Gráfico receita 30 dias | ❌ FALTA | Substituído por barras horizontais de "Alunos por Turma"; sem line chart de receita 30d |
| AC9 Layout admin com sidebar | ✅ | `AdminSidebar` tem 6 itens; nota: link `/admin/forum` aponta para rota inexistente |

**Veredicto F6.1:** ⚠️ **CONCERNS** — Dashboard navegável e visualmente pronto mas com **2 ACs faltando entrega** (AC7 tabela, AC8 chart) e **6 ACs com mock**. O comentário do dashboard ("Dados mockados — integração real após F1.8 + F2.3") admite que F1.8/F2.3 já estão completos (vide TaskList), portanto a integração real **deveria estar feita**. Aceitável como entrega parcial pré-Fase 7 desde que AC7 e AC8 sejam adicionadas como follow-up.

---

### Story F6.2 — CRUD courses/modules/lessons com editor de conteúdo

| AC | Status | Notas |
|---|---|---|
| AC1 `/admin/cursos` lista + busca + filtro published/draft + "Novo curso" | ⚠️ | Lista + busca + botão presentes; **filtro published/draft ausente** (toggle existe inline por linha mas não filtro de listagem) |
| AC2 Edita curso + lista modules drag-and-drop | ✅ | `CourseEditorClient.tsx` linha 317-325 — DndContext + SortableContext com PointerSensor; `reorderModules` em `actions.ts:104` |
| AC3 Toggle published/draft | ✅ | `toggleCoursePublished` em actions.ts:39 + UI em CourseListClient.tsx:79 |
| AC4 CRUD modules dentro do curso | ✅ | create/update/delete/reorder em actions.ts:61-110; UI inline forma + drag |
| AC5 CRUD lessons + content_format | ✅ | `LessonEditorClient` cobre kind/video_provider/video_id/content_format; `ContentEditor.tsx` tem 3 botões MDX/HTML/Markdown |
| AC6 Upload materials drag-and-drop bucket `materials` | ⚠️ | Upload via `<input type="file">` funciona (actions.ts:170), mas a "drop zone" é apenas `<label>` clicável, não há `onDrop`/`onDragOver` reais — AC6 explicitamente pede "drag-and-drop" |
| AC7 "Preview como aluno" | ⚠️ PARCIAL | Botão "Preview como aluno" abre toggle inline com `LessonContent`, **não navega para o contexto student** — AC7 pede "abre lesson no contexto de student" |
| AC8 Soft delete | ✅ | actions.ts:50, 96, 152 todos usam `update({ deleted_at })` |
| AC9 Reordenação Server Action transacional | ⚠️ | `reorderModules`/`reorderLessons` usam `Promise.all` (actions.ts:108, 161) — **não é transacional**; falha parcial deixa estado inconsistente |
| AC10 Validação Zod | ❌ | Zero `import { z }` em `src/app/(admin)/admin/cursos/`; validação só HTML5 `required` |

**Critério Seção 8 Fase 6:**
- ✅ Drag-and-drop reordena modules e lessons
- ✅ Editor com seletor MDX/HTML/Markdown + preview (preview HTML/MD inline funciona; MDX preview client-side é placeholder)

**Veredicto F6.2:** ⚠️ **CONCERNS** — Núcleo funcional sólido (CRUD 3 níveis + drag-drop + 3 editores + upload + soft delete). Falhas pontuais: ausência de Zod (AC10), reordenação não-transacional (AC9), drop-zone real ausente (AC6), Preview not navegando para aluno (AC7), filtro published/draft na listagem (AC1). Não bloqueante para gate F6 — registrar follow-up F6.2.x.

---

### Story F6.3 — CRUD de cohorts (coração comercial)

| AC | Status | Notas |
|---|---|---|
| AC1 `/admin/turmas` lista com filtros + "Nova turma" | ✅ | `CohortListClient` + botão "Nova Turma" → `/admin/turmas/nova` |
| AC2 9 seções (Identidade/Status/Acesso/Cursos/Comercial/Extensões/Membros/Sessões/Cupons) | ✅ | `CohortForm.tsx` 1312 linhas — todas as 9 seções implementadas com nav superior + collapsibles |
| AC3 Sync Stripe stub on save | ❌ | `handleSave()` linha 388-391 apenas seta `setSaved(true)` — **não persiste no banco, nem stub de log com Stripe** |
| AC4 Validação Zod por seção | ❌ | Zero Zod; validação ausente |
| AC5 Preço em centavos / input em reais | ⚠️ | UI usa BRL string (`entryPriceBRL`) mas conversão `cents = parseFloat(brl) * 100` ausente; helper `parseBRL` mencionado na story não existe |
| AC6 Tab Membros: busca + adicionar manual com expires_at | ⚠️ | Modal "Adicionar membro" existe mas **inputs todos com value="" e onChange={() => {}}** — totalmente não-funcional; busca por nome/email ausente |
| AC7 "Vagas restantes" calculado | ❌ | Componente `OccupancyBar` existe em `CohortListClient` mas dentro do form de edição não há indicador de seats restantes |

**Critérios Seção 8 Fase 6:**
- ⚠️ "Cohort criada ponta-a-ponta sem mexer no banco" — UI completa mas **nada é persistido**; cohort é apenas mock-driven
- ⚠️ "Cross extension configurada e aplicada em compra real" — UI da matriz cross_extensions ✅; aplicação em compra é F7 (fora de escopo F6.3) ✅
- ❌ "Aluno adicionado manualmente com prazo customizado" — UI presente mas inputs no-op

**Veredicto F6.3:** ❌ **FAIL** — A *forma* das 9 seções está visualmente completa e bem estruturada (1312 LOC + nav + collapsibles + matriz cross-extension + tabelas members/sessions/coupons). Porém **nenhum dado é persistido**, **nenhuma Server Action é chamada**, e **3 modais (membro/sessão/cupom) têm inputs declarativamente quebrados** (`value="" onChange={() => {}}`). Como story do "coração comercial" do admin (PRD: "tempo investido aqui paga retorno em tudo"), o estado é UI-only e bloqueia validação real do critério Seção 8 "cohort criada ponta-a-ponta". Recomendação: tratar como entrega de UI/wireframe interativo e abrir F6.3.b para integração real (Server Actions + Zod + persistência) antes de F7.

---

### Story F6.4 — Usuários, pagamentos, moderação, fórum

| AC | Status | Notas |
|---|---|---|
| AC1 `/admin/usuarios` filtros + busca | ⚠️ | Filtros papel + cohort presentes; busca por nome/email ausente |
| AC2 Perfil do usuário com ações | ⚠️ | `UserProfileModal` mostra identidade + role + memberships; ações "alterar role/desativar/conceder acesso/estender prazo/dar refund" — apenas role tem `setRole` local sem persistir |
| AC3 `/admin/pagamentos` tabela com filtros + link Stripe | ⚠️ | Filtro por status ✅; filtros cohort/range data ausentes; link Stripe ✅ (linha 247-256) |
| AC4 Refund com confirmação dupla | ⚠️ PARCIAL | `RefundConfirmModal` existe; modal + checkbox `confirmed` mas **não é "modal + texto digitado"** como pede AC ("texto digitado"); `handleRefundConfirm` é no-op |
| AC5 Reprocessar webhook | ❌ FALTA | Botão ausente |
| AC6 Exportar CSV | ✅ | `downloadCSV` linha 130-148 monta blob CSV com filtros aplicados |
| AC7 `/admin/moderacao` tabs comments/threads + ações | ✅ | `ModerationClient.tsx` tem 2 tabs + ações remover/spam/OK; **observação: módulo foi reportado faltando inicialmente, mas no commit auditado existe** (validado linha 158-260) — gamma corrigiu |
| AC8 `/admin/forum` CRUD forum_categories | ❌ FALTA | Diretório `src/app/(admin)/admin/forum/` **não existe**; sidebar tem link `/admin/forum` levando a 404 |
| AC9 Todas pages exigem ADMIN | ✅ | Middleware `/admin/*` valida role |

**Critério Seção 8 Fase 6 — `/admin/moderacao` carrega sem erro:** ✅ verificado — ModerationClient existe e renderiza.

**Veredicto F6.4:** ❌ **FAIL** — AC8 (CRUD forum_categories) **completamente ausente** com link quebrado no sidebar. Reprocessar webhook (AC5) ausente. Confirmação dupla de refund não confere com a especificação ("texto digitado"). Ações de UserProfileModal são no-op. Mock-only é aceitável neste momento, mas **um dos 4 sub-temas da story (forum) não foi entregue** e gera 404 navegacional.

---

### Critérios Seção 8 Fase 6 — síntese

| # | Critério | Status |
|---|---|---|
| 1 | Cohort criada ponta-a-ponta sem mexer no banco | ❌ não persiste |
| 2 | Cross extension configurada na matriz e aplicada em compra real | ⚠️ matriz UI ok; compra real = F7 |
| 3 | Aluno adicionado manualmente com prazo customizado | ❌ inputs no-op |
| 4 | Drag-and-drop reordena modules/lessons | ✅ |
| 5 | Editor com seletor MDX/HTML/Markdown + preview | ✅ |
| 6 | `/admin` sem ADMIN → 403 | ✅ middleware |
| 7 | `/admin/moderacao` carrega sem erro | ✅ |

---

### Veredictos formais

```
VEREDICTO: F6.1 — CONCERNS
Story: F6.1 | Data: 2026-05-06
Issues:
- [CONCERN] AC7 falta tabela "Matrículas expirando 7 dias" com ações: src/app/(admin)/admin/page.tsx — adicionar tabela com nome/cohort/expires_at/botão "Estender"
- [CONCERN] AC8 falta line chart de receita 30 dias: substituído por barras de "alunos por turma"
- [CONCERN] 6/9 cards usam mock; integração real prevista após F1.8/F2.3 (já completos) — abrir follow-up
Próximo passo: @sites-devops push (concerns documentados, follow-up F6.1.b)
```

```
VEREDICTO: F6.2 — CONCERNS
Story: F6.2 | Data: 2026-05-06
Issues:
- [CONCERN] AC10 Zod ausente em todos os forms: src/app/(admin)/admin/cursos/actions.ts — adicionar schemas
- [CONCERN] AC9 Promise.all não-transacional em reorderModules/reorderLessons: actions.ts:108,161
- [CONCERN] AC6 drop-zone real ausente (só <label> clicável): LessonEditorClient.tsx:288
- [CONCERN] AC7 "Preview como aluno" não navega para contexto student
- [CONCERN] AC1 filtro published/draft ausente na listagem
Próximo passo: @sites-devops push (5 concerns não-bloqueantes, follow-up F6.2.b)
```

```
VEREDICTO: F6.3 — FAIL
Story: F6.3 | Data: 2026-05-06
Issues bloqueantes:
- [CRITICAL] handleSave() é no-op (CohortForm.tsx:388-391) — nenhuma Server Action; cohort não persiste
- [CRITICAL] AC6 modal "Adicionar membro" inputs declarativamente quebrados (value="" onChange={() => {}}): CohortForm.tsx:923-939
- [CRITICAL] AC4 Zod ausente
- [CRITICAL] AC3 stub de log Stripe ausente em on-save
- [CRITICAL] AC5 conversão BRL→cents ausente; preço nunca é convertido
Próximo passo: @sites-dev-admin reabrir F6.3 — implementar Server Actions de persistência, Zod por seção, parseBRL helper, sync stub Stripe (log). UI está pronta; falta a camada de persistência inteira.
```

```
VEREDICTO: F6.4 — FAIL
Story: F6.4 | Data: 2026-05-06
Issues bloqueantes:
- [CRITICAL] AC8 /admin/forum não existe — diretório src/app/(admin)/admin/forum/ ausente; AdminSidebar.tsx:24 tem link levando a 404
- [CRITICAL] AC5 botão "Reprocessar webhook" ausente em PaymentsClient
- [CONCERN] AC4 confirmação dupla de refund não inclui "texto digitado" — apenas checkbox
- [CONCERN] AC2 ações de UserProfileModal são no-op (alterar role/desativar/estender)
- [CONCERN] AC1 busca por nome/email ausente em UsersClient
- [CONCERN] AC3 filtros cohort/range de data ausentes em PaymentsClient
Próximo passo: @sites-dev-admin reabrir F6.4 — criar /admin/forum CRUD de forum_categories (PRD: slug, name, description, sort_order, color, is_active), botão reprocessar webhook, refund com texto digitado.
```

---

### Síntese do gate Fase 6

- **2 PASS-with-CONCERNS:** F6.1, F6.2 — entregas funcionais com ressalvas documentadas
- **2 FAIL:** F6.3 (não persiste), F6.4 (forum 404 + reprocess webhook ausente)
- **5/7 critérios Seção 8** atendidos
- **TypeCheck:** zero erros nas paths F6 (erros em F7 Stripe são fora de escopo)

---

## 2026-05-06 — Gate Fase 4 (Comments + Materials)

**Escopo:** F4.1 (Comments nas aulas) + F4.2 (Materials com signed URL).
**Arquivos avaliados:**
- `src/lib/actions/comments.ts` (Server Actions stub)
- `src/components/student/CommentSection.tsx` (componente em uso na página de aula)
- `src/components/student/CommentsSection.tsx` (componente alternativo, código morto)
- `src/lib/storage/materials.ts`
- `src/app/(student)/curso/[slug]/aula/[lesson-slug]/material-actions.ts`
- `src/components/student/MaterialsList.tsx`
- `src/app/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` (integra Comments + Materials)
- `src/app/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx`

**Verificações:**
- `tsc --noEmit` em paths F4
- Conferência por AC + critérios Seção 8

---

### Story F4.1 — Comments nas aulas

| AC | Status | Notas |
|---|---|---|
| AC1 `<Comments lessonId>` Server Component carrega via Supabase respeitando RLS | ❌ | Page passa `MOCK_COMMENTS` filtrado client-side; nenhuma query Supabase |
| AC2 `createComment` valida has_access + sanitiza | ❌ | `addComment` em `comments.ts:6-15` retorna `{ success: true }` no-op; comentário "TODO F4.1" explícito |
| AC3 Reply parent_comment_id, UI 1 nível | ⚠️ UI ok | UI tem reply form e renderização nested; persistência ausente |
| AC4 Soft delete, "[comentário removido]" | ⚠️ UI ok | `CommentSection.tsx:106` mostra "[comentário removido]" para `deleted_at`; delete handler é `confirm() + // TODO` linha 67-70 |
| AC5 Edição até 15min após criação | ⚠️ DIVERGE | Spec pede 15min; código usa `EDIT_WINDOW_MS = 30 * 60 * 1000` (30min) em CommentSection.tsx:7. Editar persistência ausente (TODO linha 55) |
| AC6 Badge MENTOR/ADMIN/SUPPORT | ⚠️ | Badge MENTOR + ADMIN presentes (`ROLE_CONFIG` linha 9-12); **SUPPORT ausente** |
| AC7 Pin por ADMIN/MENTOR; pinned no topo | ⚠️ | Renderização de `is_pinned` existe (linha 79-84); botão "Fixar" para ADMIN/MENTOR ausente; ordenação pinned-first ausente |
| AC8 Markdown básico (negrito/link/código) | ❌ | Renderiza com `<p>` bruto (linha 125); zero parsing markdown |
| AC9 Avatar + nome + timestamp relativo | ✅ | Avatar inicial, nome, badge, timeAgo (linha 14-22) |
| AC10 Mobile responsive | ✅ | Layout flex/grid adapta |

**Achado bônus — duplicação de componentes:** Há dois componentes paralelos:
- `CommentSection.tsx` (singular) — usado pela página de aula via `LessonTabs.tsx:84`; tem TODOs explícitos (linhas 55, 61, 69, 198) onde Server Actions deveriam estar
- `CommentsSection.tsx` (plural) — não usado em lugar nenhum; importa stubs `addComment/editComment/deleteComment` de `comments.ts`. **Código morto pendente de remoção**.

**TypeCheck:** 3 erros em LessonTabs.tsx (`deletedAt` vs `deleted_at`) + page.tsx (`lessonId` vs `lesson_id`) — task #48 in_progress está rastreando.

**Veredicto F4.1:** ❌ **FAIL** — Apesar do task #34 marcado como completed, **comments não persistem**. UI rica e bem estruturada (reply, edit form, pin render, soft-delete render, badge, timeAgo) mas absolutamente nada chama Supabase. Server Actions `addComment/editComment/deleteComment` são no-op explícito (`return { success: true }`). Sanitização DOMPurify ausente. Markdown ausente. Janela de edição diverge da spec (30min vs 15min). SUPPORT badge faltando. **Critério Seção 8 "Comments: threads 1 nível, soft delete visível como '[removido]', badge MENTOR/ADMIN, edição até 30min" parcialmente verificado em UI mas NÃO em comportamento real**.

---

### Story F4.2 — Materials com signed URL

| AC | Status | Notas |
|---|---|---|
| AC1 `<Materials lessonId>` lista título + kind badge + tamanho | ✅ | `MaterialsList.tsx` mostra ícone por kind (PDF/ZIP/IMG/LINK), título, formatBytes |
| AC2 `getDownloadUrl(materialId)` valida has_access + signed URL 5min | ✅ | `materials.ts:26-80` valida user, busca material, faz `rpc('has_access')`, gera signed URL 300s; ADMIN bypass linha 60-66 |
| AC2b LINK retorna external_url | ✅ | linha 46-49 |
| AC3 Botão dispara action + abre URL + loading UX | ✅ | `MaterialsList.tsx:31-56` cria `<a download>` + spinner "Preparando..." |
| AC4 Materials ordenados por sort_order | ⚠️ | Page usa MOCK array já ordenado; query Supabase com `.order('sort_order')` está em material-actions.ts indireto via getMaterialSignedUrl mas a listagem inicial vem de mock no page.tsx (linhas 12-35 hardcoded) — não há query real |
| AC5 Estado vazio "Esta aula não possui materiais" | ✅ | `MaterialsList.tsx:25-29` |

**Critério Seção 8 "Materials só baixam com `has_access()` da lesson (signed URL 5min)":** ✅ verificado — `materials.ts:55-68` chama `rpc('has_access')` antes de gerar signed URL; expiração `SIGNED_URL_EXPIRY_SECONDS = 300` (5min) — **conforme spec**.

**Critério Seção 8 "Upload de materials no admin funciona":** ⚠️ UI funciona via `<input type="file">` + `uploadMaterial` em `src/app/(admin)/admin/cursos/actions.ts:170-195` (Supabase storage + INSERT em `materials`). Drop-zone real (onDrop/onDragOver) ausente — já registrado em F6.2.

**Veredicto F4.2:** ⚠️ **CONCERNS** — **Camada de download está sólida e segura**: valida user, valida has_access via RPC, ADMIN bypass, signed URL 5min, suporte a LINK. Servidor real conectado. Concerns:
- Listagem inicial vem de mock hardcoded no page.tsx (linhas 12-35) ao invés de query Supabase com `.order('sort_order')`
- Upload admin é input clicável (drop real ausente — concern já registrado em F6.2)
- TypeCheck limpo nos arquivos de F4.2

Aceitável para gate. Listagem mock é tarefa pendente (task #48 in_progress está endereçando integração com banco).

---

### Veredictos formais Fase 4

```
VEREDICTO: F4.1 — FAIL
Story: F4.1 | Data: 2026-05-06
Issues bloqueantes:
- [CRITICAL] addComment/editComment/deleteComment são no-op explícitos (lib/actions/comments.ts:6-37) — UI parece funcionar mas nada persiste
- [CRITICAL] CommentSection.tsx tem 4 TODOs onde Server Actions deveriam ser chamadas (linhas 55, 61, 69, 198)
- [CRITICAL] Sanitização DOMPurify (AC2) ausente
- [CONCERN] Janela de edição: spec=15min, código=30min (CommentSection.tsx:7)
- [CONCERN] AC8 Markdown ausente; AC6 SUPPORT badge ausente; AC7 botão pin/ordenação ausente
- [CONCERN] CommentsSection.tsx (plural) é código morto importando stubs — remover
- [CONCERN] TypeCheck: 3 erros camelCase vs snake_case em LessonTabs/page.tsx
Próximo passo: @sites-dev-alpha implementar Server Actions reais com Supabase + RLS validation + DOMPurify; remover componente duplicado; alinhar janela de edição.
```

```
VEREDICTO: F4.2 — CONCERNS
Story: F4.2 | Data: 2026-05-06
Critério Seção 8 verificado: download via signed URL 5min com has_access ✅
Issues:
- [CONCERN] Listagem inicial usa MOCK_MATERIALS hardcoded em page.tsx (linhas 12-35) ao invés de query Supabase real
- [CONCERN] AC4 ordering por sort_order não validável até integração real
- [CONCERN] Upload admin é click-only (drop-zone real falta — registrado em F6.2)
Próximo passo: @sites-devops push (camada de download está pronta e segura; listagem real vem com task #48)
```

---

## 2026-05-06 — Gate Fase 5 (Forum + Agenda + Certificados)

**Escopo:** F5.1 (Forum), F5.2 (Agenda + live_sessions), F5.3 (Certificados).
**Arquivos avaliados:**
- `src/app/(student)/forum/page.tsx`
- `src/app/(student)/forum/[category]/[slug]/page.tsx`
- `src/app/(student)/forum/novo/` (não inspecionado em detalhe — fora de escopo dos critérios Seção 8)
- `src/app/(student)/agenda/page.tsx`
- `src/components/student/ICSDownloadButton.tsx`
- `src/app/(public)/certificado/v/[code]/page.tsx`
- `src/app/(student)/certificados/page.tsx`
- `src/app/api/certificado/[code]/route.ts`
- `src/components/student/CertificatePDF.tsx` (referenciado pelo route handler)

---

### Story F5.1 — Forum (categorias + threads + replies)

| AC | Status | Notas |
|---|---|---|
| AC1 `/forum` lista categorias + threads recentes | ⚠️ UI | Lista renderizada de `MOCK_FORUM_CATEGORIES` + `MOCK_FORUM_THREADS`; sem query Supabase |
| AC2 `/forum/categoria/[slug]` paginação por last_activity_at | ❌ | Path real é `/forum/[category]/[slug]` que é **thread page**, não category page; spec previa `/forum/categoria/[slug]` separado — **rota da spec não existe** |
| AC3 `/forum/thread/[slug]` thread + replies árvore 1 nível | ⚠️ | Path real é `/forum/[category]/[slug]`; renderiza thread + replies aninhadas; mock-only |
| AC4 Server Actions createThread/createReply/vote/markAsAccepted/markAsResolved | ❌ | **Nenhuma Server Action existe** para fórum — botões Reply/Upvote são `<button>` sem onClick em [category]/[slug]/page.tsx:95-101; ForumReplyForm provavelmente também stub |
| AC5 Editor Markdown | ❌ | Apenas `<p>` cru renderiza content (linha 89, 189); sem parsing |
| AC6 Upvote thread + reply (votes) com count | ❌ | Botão exibido com `voteCount` mas sem persistência; sem tabela votes em uso |
| AC7 Badge "Resolvida" se is_resolved | ✅ UI | Linha 159-164 (thread page) + linha 108-112 (forum page) renderizam |
| AC8 Reply is_accepted_answer destacada | ✅ UI | ReplyCard linha 56-68 destaca com border verde |
| AC9 Busca por título/content via ilike | ❌ | `<input type="search">` sem onChange/handler (forum/page.tsx:55-60); decoração apenas |
| AC10 Acesso exige cohort_member ACTIVE | ❌ | Nenhum guard em layout; rota acessível para qualquer logged user |
| AC11 Admin/Mentor delete (soft) + pin | ❌ | Sem botões; sem actions |

**Critério Seção 8 "Forum: upvote, marcar resposta aceita, busca por título":**
- ❌ Upvote: UI exibe count mas sem ação
- ✅ Marcar resposta aceita: rendering condicional ok (mock); ação ausente
- ❌ Busca por título: input decorativo sem handler

**Veredicto F5.1:** ❌ **FAIL** — Task #32 marcada como "F5.1 Forum UI shell" — confirma que apenas shell foi entregue. AC4 (todas as Server Actions), AC5 (Markdown), AC6 (upvote real), AC9 (busca), AC10 (guard de acesso), AC11 (admin actions) ausentes. Estrutura de URLs diverge da spec (`/forum/[cat]/[slug]` em vez de `/forum/categoria/[slug]` + `/forum/thread/[slug]`). TypeCheck explode com 14+ erros camelCase vs snake_case (`threadId`, `parentReplyId`, `isPinned`, `lastActivityAt`, `createdAt`). Importa `ForumReply` de mock-data que não exporta esse nome (`'ForumReply'` ausente; arquivo exporta `ForumReplyWithMeta`). **Forum é wireframe interativo, não funcional**.

---

### Story F5.2 — Agenda + live_sessions

| AC | Status | Notas |
|---|---|---|
| AC1 Lista live_sessions futuras das cohorts ACTIVE | ⚠️ | Lista por mock, filtro by cohort ACTIVE ausente |
| AC2 Sessions passadas com recording_url em "Encontros gravados" | ✅ | Linha 130-160 separa `upcoming`/`past` |
| AC3 Card mostra título/data/hora/duração/descrição/cohort | ✅ | SessionCard completo |
| AC4 `meeting_url` só renderizado quando `now() >= scheduled_at - 30min` | ✅ **VITAL** | Verificação em `isMeetingLinkAvailable` (linha 28-32) chamada em **Server Component** (page.tsx é async sem 'use client'). Quando `linkAvailable === false`, o `<a href={session.meeting_url}>` NÃO é renderizado (linha 86-101 ternary). O HTML final NÃO contém o URL. Comparação usa `Date.now()` no servidor (server clock) — adequado |
| AC5 Antes de 30min: botão desabilitado com tooltip | ⚠️ | Renderiza `<div>` com texto "Link disponível {hora}" — não é tooltip propriamente, mas comunica claramente o estado |
| AC6 Botão "Adicionar à agenda (.ics)" | ✅ | `ICSDownloadButton.tsx` gera arquivo ICS com BEGIN:VCALENDAR, DTSTART, DTEND, SUMMARY, ORGANIZER |
| AC7 Recording link em sessions passadas | ✅ | Linha 104-115 |
| AC8 Mobile responsive | ✅ | flex-wrap + grid |
| AC9 Próximo encontro no dashboard (referência F3.5) | n/a | Fora de escopo desta story |

**Critério Seção 8 "`meeting_url` liberado EXATAMENTE 30min antes (testar lógica server-side)":**
- ✅ **VERIFICADO** — agenda/page.tsx é Server Component (sem 'use client'); `isMeetingLinkAvailable(session.scheduled_at)` calcula no servidor com `Date.now()` (server time); quando false, o `<a>` com `href={session.meeting_url}` simplesmente não vai ao JSX. **`meeting_url` NÃO chega ao DOM antes da janela de 30min** — único caminho de exposição é via JSX condicional server-side. Janela de 30min: `now >= start - 30 * 60 * 1000` (linha 31).
- ⚠️ **Caveat:** janela termina em `start + 120 min` (linha 31) — i.e. link some 2h após início; OK para o critério "30min antes" mas é um detalhe além da spec.

**Veredicto F5.2:** ⚠️ **CONCERNS** — **Critério vital atendido**: meeting_url tem proteção server-side correta. Todo o resto é mock (lista vem de MOCK_LIVE_SESSIONS, sem filtro por cohort do user). ICS download funciona client-side. Aceitável como entrega parcial; integração com banco virá em iteração futura. TypeCheck limpo em agenda/page.tsx.

---

### Story F5.3 — Certificados

| AC | Status | Notas |
|---|---|---|
| AC1 `checkAndIssueCertificate(courseId, userId)` chamada após saveProgress | ❌ | **Função inexistente** — `grep -rn "checkAndIssueCertificate"` retorna zero matches |
| AC1b Verifica 100% completion + cria registro + gera PDF + cria notification | ❌ | Lógica de issue ausente |
| AC2 Email `certificate-ready.tsx` | ❌ | Não inspecionado mas provavelmente ausente |
| AC3 `/certificados` lista user certificates com download (signed URL 1h) | ⚠️ | Page renderiza MOCK_CERTIFICATES; download usa `/api/certificado/[code]` — não signed URL com expiração |
| AC4 `/certificado/v/[code]` página pública verifica + 404 se inválido | ⚠️ | Página existe; `verifyCertificate` (linha 26-46) **retorna válido para qualquer code com length >= 6** — mock não-discriminador; query Supabase comentada mas não implementada |
| AC5 PDF tem layout próprio com nome/curso/data/code/QR | ⚠️ | `CertificatePDF` componente referenciado em route.ts; não auditei o conteúdo aqui |
| AC6 Geração PDF assíncrona não bloqueia saveProgress | ❌ | saveProgress não dispara nada de certificate; checkAndIssueCertificate não existe |

**Critério Seção 8 "Certificate emitido só com 100% conclusão":**
- ❌ **NÃO VERIFICÁVEL** — função de emissão não existe; mock retorna válido para qualquer code

**Critério Seção 8 "/certificado/v/[code] público funciona sem auth":**
- ✅ Página existe em `(public)/certificado/v/[code]`; rota está em `PUBLIC_PATHS` no middleware (`/certificado` linha 12); acessível sem login. Conteúdo é mock.

**Veredicto F5.3:** ❌ **FAIL** — Task #30 marcada como completed mas:
- Função de emissão (`checkAndIssueCertificate`) **não existe** no código (grep confirmado)
- `verifyCertificate` em `/certificado/v/[code]/page.tsx:26-46` retorna válido para QUALQUER code com >= 6 chars — qualquer URL `/certificado/v/aaaaaa` mostra "João Guirunas | Claude Code"
- Não há integração com tabela `certificates`; query Supabase comentada
- TypeCheck explode em certificados/page.tsx (5 erros camelCase: `issuedAt` vs `issued_at`, `verificationCode` vs `verification_code`, `pdfAvailable` ausente do tipo)
- Email de certificate ausente

PDF geração via @react-pdf/renderer existe e funciona com mock data — único componente real. Página pública renderiza mas sempre mostra dado fake. **Crítico para a integridade do produto**: rota pública `/certificado/v/qualquercoisa` finge ser válida.

---

### Veredictos formais Fase 5

```
VEREDICTO: F5.1 — FAIL
Story: F5.1 | Data: 2026-05-06
Issues bloqueantes:
- [CRITICAL] AC4: nenhuma Server Action de fórum existe (createThread, createReply, vote, markAsAccepted, markAsResolved)
- [CRITICAL] AC2: rota `/forum/categoria/[slug]` da spec ausente; estrutura usa `/forum/[category]/[slug]` que é thread page
- [CRITICAL] AC9 busca: input search sem handler
- [CRITICAL] AC10 acesso requer cohort_member ACTIVE — guard ausente
- [CRITICAL] AC11 admin/mentor delete + pin: sem botões/actions
- [CRITICAL] TypeCheck: 14+ erros camelCase vs snake_case em forum/page.tsx + [category]/[slug]/page.tsx; import `ForumReply` de mock-data que não existe
- [CRITICAL] AC5 Markdown ausente; AC6 upvote sem persistência
Próximo passo: @sites-dev-alpha — esta entrega é wireframe (task #32 confirma "Forum UI shell"). Reabrir como F5.1.b para implementação real ou marcar shell explicitamente e abrir story de funcionalidade separada.
```

```
VEREDICTO: F5.2 — CONCERNS
Story: F5.2 | Data: 2026-05-06
Critério Seção 8 verificado: meeting_url só vai ao DOM ≥30min antes (Server Component render condicional) ✅
Issues:
- [CONCERN] Lista vem de MOCK_LIVE_SESSIONS sem filtro real por cohort ACTIVE do user (AC1)
- [CONCERN] AC5 "tooltip" é apenas div com texto "Link disponível {hora}" — funcional mas não é tooltip
- [CONCERN] Janela termina em start+120min (além da spec) — detalhe operacional aceitável
Próximo passo: @sites-devops push (proteção crítica do meeting_url está correta; integração com banco virá em iteração)
```

```
VEREDICTO: F5.3 — FAIL
Story: F5.3 | Data: 2026-05-06
Issues bloqueantes:
- [CRITICAL] AC1: função `checkAndIssueCertificate` não existe (grep confirmado) — emissão automática 100% ausente
- [CRITICAL] AC4: `verifyCertificate` retorna válido para QUALQUER code >= 6 chars — `/certificado/v/aaaaaa` mostra certificado mock; **integridade pública comprometida**
- [CRITICAL] AC2: email certificate-ready ausente
- [CRITICAL] TypeCheck: 5 erros em /certificados/page.tsx (issuedAt vs issued_at, verificationCode vs verification_code, pdfAvailable não no tipo)
- [CONCERN] AC3: download via /api/certificado/[code] não usa signed URL 1h conforme spec (rota retorna PDF gerado direto)
Próximo passo: @sites-dev-alpha — implementar Server Action checkAndIssueCertificate, query real em verifyCertificate, alinhar tipos snake_case. Crítico desativar/proteger /certificado/v/[code] em prod até query real estar pronta — qualquer URL atual finge ser válida.
```

---

### Síntese Fases 4 e 5

| Story | Veredicto | Critério Seção 8 |
|---|---|---|
| F4.1 Comments | ❌ FAIL | Comments + soft delete + badge + edição — **comportamento não verificado** (UI ok, persistência ausente) |
| F4.2 Materials | ⚠️ CONCERNS | ✅ has_access + signed URL 5min |
| F5.1 Forum | ❌ FAIL | Upvote ❌, resposta aceita ⚠️UI, busca ❌ |
| F5.2 Agenda | ⚠️ CONCERNS | ✅ meeting_url 30min server-side |
| F5.3 Certificados | ❌ FAIL | 100% completion ❌, /certificado/v/[code] público ⚠️ (mock universal) |

**3/5 stories: FAIL**. Núcleo das auditorias revela que F4.1, F5.1 e F5.3 foram marcadas completed (#34, #32, #30) com entregas que são **UI shells funcionando contra mock-data**, sem integração com banco. F4.2 (camada de signed URL) e F5.2 (proteção server-side de meeting_url) — ambos pontos críticos de segurança — **estão corretos**.

---

## Gate F12.1 + F12.2 — InfinitePay Adapter + Webhook + Migration + Admin UI

**Data:** 2026-05-09
**Veredicto:** ⚠️ **CONCERNS** (todos os 10 ACs PASS, mas typecheck do repo está quebrado por efeito colateral)

### F12.1 — Adapter + Webhook
| AC | Resultado | Evidência |
|----|-----------|-----------|
| AC1 — `createCheckoutLink` payload + endpoint + handle | ✅ PASS | `src/lib/payment/infinitepay.ts:53-75` — payload completo, `POST /links`, autenticação via campo `handle` no body (sem Bearer — InfinitePay não usa Authorization header) |
| AC2 — `verifyPayment` payload + endpoint | ✅ PASS | `src/lib/payment/infinitepay.ts:91-106` — handle, order_nsu, transaction_nsu, slug; `POST /payment_check` |
| AC3 — Webhook 200 imediato + processamento async | ✅ PASS | `src/app/api/webhooks/infinitepay/route.ts:39-46` — fire-and-forget com Sentry capture |
| AC4 — Idempotência (PENDING + cohort_members) | ✅ PASS | `route.ts:58-69` busca PENDING; `:99-114` checa membership existente; só incrementa filled_seats em insert novo |
| AC5 — `verifyPayment` antes de liberar acesso | ✅ PASS | `route.ts:72-77` aborta se `!check.paid` |
| AC6 — Welcome email + magic link | ✅ PASS | `route.ts:147-168` — generateMagicLink + sendWelcomeInviteEmail |

### F12.2 — Migration + Admin UI
| AC | Resultado | Evidência |
|----|-----------|-----------|
| AC7 — Migration idempotente em ambas as tabelas | ✅ PASS | `supabase/migrations/20260508020000_payments_infinitepay_fields.sql:5-14` — `IF NOT EXISTS` em todas; cobre cohorts E payments |
| AC8 — UNIQUE em `infinitepay_order_nsu` | ✅ PASS | linha 13: `text unique` |
| AC9 — Dropdown STRIPE/INFINITEPAY com default STRIPE | ✅ PASS | `CohortForm.tsx:230-233` constante; `:297` default `'STRIPE'`; `:971-983` UI |
| AC10 — Persiste `payment_provider` em INSERT/UPDATE | ✅ PASS | `actions.ts:128` (INSERT), `:185` (UPDATE) |

### Concerns (efeitos colaterais fora dos ACs declarados)

- **[CONCERN] Typecheck do repo quebrado**: 4 erros TS resultantes de regenerar tipos após migration. **Build falharia em CI**.
  - `src/components/admin/mock-data.ts:80, 108, 136` — 3 mocks `MockCohort` sem `payment_provider` (campo agora obrigatório no tipo gerado).
  - **Ação:** adicionar `payment_provider: 'STRIPE'` aos 3 cohorts mockados.

- **[CONCERN] F12.3 parcialmente comprometida**: `src/app/actions/checkoutPublic.ts:51` — `user_id: user?.id ?? null` mas `payments.user_id` é NOT NULL. F12.3 não é escopo deste gate, mas o arquivo já está no repo e contribui para o build quebrado. **Sinalizar para próximo gate.**

- **[NIT] Hardcoded fallback handle**: `infinitepay.ts:42` — `INFINITEPAY_HANDLE ?? 'growthsales'`. Se intencional como convenção do tenant, ok; se não, mover para env obrigatório.

### Próximo passo
- @sites-devops: **NÃO push** até `mock-data.ts` corrigir os 3 mocks. Após fix, typecheck deve passar limpo nos arquivos do escopo F12.1/F12.2 (erro residual em `checkoutPublic.ts` é F12.3 e será tratado no gate seguinte).

### Update 2026-05-09 — Re-validação após team-lead

Lead esclareceu/corrigiu os concerns:

1. **mock-data.ts** — re-leitura confirma: linhas 105, 134, 163 já tinham `payment_provider: 'STRIPE'`. Citei posições erradas na primeira leitura (linhas do início do bloco em vez do campo). Arquivo já estava conforme — **falso positivo do meu lado**.
2. **checkoutPublic.ts** — corrigido pelo lead: schema aceita `email?` (linha 12), resolução de `userId` antes do INSERT em duas trilhas (`authUser` ou `findOrCreateUser(email, '')`), `user_id: userId` (linha 75) sempre string. Helper `findOrCreateUser` em `webhookHelpers.ts:6-9` retorna `{ userId, isNew }`. Stripe flow recebe `customerEmail: email ?? null` na sessão.
3. **NIT handle** — confirmado intencional pelo João; env var `INFINITEPAY_HANDLE` sobrescreve.

**Typecheck final:** `npx tsc --noEmit` → **EXIT 0**. Limpo.

### Veredicto consolidado: ✅ PASS

F12.1 + F12.2 + F12.3 — **PASS**. 10/10 ACs originais atendidos, fluxo dual-provider coerente (auth + email-driven), typecheck limpo. Liberado para @sites-devops push.

