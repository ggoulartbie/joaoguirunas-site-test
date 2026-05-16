---
title: "QA Verdict — Stories 2.1 e 2.2 (materiais)"
type: qa-verdict
status: emitted
agent: sites-qa (Axilun)
created: 2026-05-16
updated: 2026-05-16
tags: [qa, verdict, materials, story-2.1, story-2.2]
related:
  - "[[../../stories/done/2.1-material-download-nova-aba]]"
  - "[[../../stories/done/2.2-admin-gerencia-materiais]]"
  - "[[results]]"
---

# QA Verdict — Stories 2.1 e 2.2

**Branch:** `fix-aula-aluno-ux-bugs`
**Data:** 2026-05-16
**Avaliador:** Axilun (sites-qa)

---

## Story 2.1 — Download de material abre em nova aba

**VEREDICTO: ✅ PASS**

### Checklist 10 pontos

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade, manutenibilidade | ✅ |
| 2 | Acceptance criteria — todos atendidos | ✅ AC1–AC5 |
| 3 | Sem regressões — fluxo existente preservado | ✅ |
| 4 | Performance — sem impacto | ✅ |
| 5 | Acessibilidade — `aria-label` mantido, focus-ring intacto | ✅ |
| 6 | SEO — N/A (interação client-side) | ✅ |
| 7 | Responsivo — sem mudança visual | ✅ |
| 8 | Copy — sem alteração | ✅ |
| 9 | Cross-browser — `target="_blank"` + `rel="noopener noreferrer"` é universal | ✅ |
| 10 | Security — `rel="noopener noreferrer"` previne tabnabbing | ✅ |

### Verificação técnica

- `src/components/student/MaterialsList.tsx:42-46` — implementação correta:
  - `a.target = '_blank'` aplicado a todos os kinds.
  - `a.rel = 'noopener noreferrer'` aplicado a todos os kinds.
  - `a.download = material.title` apenas para `kind !== 'LINK'` (atende AC3).
- `aria-label` dinâmico (linha 67) já distingue "Abrir" vs "Baixar" — boa acessibilidade.
- Estado `loading` por id mantido — sem regressão no UX (AC4).
- Action `downloadMaterialAction` intacta (escopo OUT respeitado).
- Commit `8035b6a` confere com a spec.

### Issues
Nenhum.

---

## Story 2.2 — Admin gerencia materiais (listar + excluir)

**VEREDICTO: ⚠️ CONCERNS (autorizado push)**

### Checklist 10 pontos

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade, manutenibilidade | ⚠️ ver concerns |
| 2 | Acceptance criteria — atendidos (com nota em AC3c) | ⚠️ |
| 3 | Sem regressões — `uploadMaterial` legado preservado | ✅ |
| 4 | Performance — optimistic update é o pattern correto | ✅ |
| 5 | Acessibilidade — `aria-label` no botão Trash, `role="alert"` no painel inline (`MaterialsUpload`) | ✅ |
| 6 | SEO — N/A (admin) | ✅ |
| 7 | Responsivo — layout admin já flexível | ✅ |
| 8 | Copy — `confirm('Remover material?')` simples mas funcional | ✅ |
| 9 | Cross-browser — `confirm()` nativo é universal | ✅ |
| 10 | Security — `requireAdmin()` na action + RLS DELETE policy `is_admin()` (defesa em profundidade) | ✅ |

### Verificação técnica

**Server action `actions.ts:211-222` (`deleteMaterial`):**
- ✅ `requireAdmin()` chamado primeiro (`actions.ts:212`).
- ✅ Guard `if (storagePath)` antes do `storage.remove` (linha 213) — atende AC3a.
- ✅ Storage delete acontece ANTES do row delete — consistência preservada.
- ✅ Hard delete na tabela `materials` (linha 216) — atende AC3b.
- ✅ `revalidatePath` do curso (linha 218) e da aula condicional (linhas 219-221) — atende AC3c parcialmente (ver concern #1).

**Server action `material-actions.ts:181-220` (`deleteMaterialAction`):**
- ✅ Versão paralela mais robusta (busca `lesson_id`+`course_id` por join, log de auditoria em caso de falha após storage remove).
- ⚠️ Não usada pelo editor real — apenas pelo componente órfão `MaterialsUpload.tsx`.

**Client `LessonEditorClient.tsx:126-140` (`handleDeleteMaterial`):**
- ✅ Optimistic update + rollback em catch (linhas 128-129, 135) — atende AC4.
- ✅ `await` dentro de try/catch — atende AC4a.
- ✅ `router.refresh()` em sucesso (linha 133) — atende AC4c.
- ✅ `setError` em caso de erro — feedback ao admin (AC4b).
- ✅ Estado `deleting` por id + classe `opacity-50` (linha 309) — feedback visual.
- ✅ Botão delete sempre visível (sem guard `mat.storage_path &&`) — atende AC1+AC2.
- ✅ `kind === 'LINK'` exibe `external_url` truncado (linha 317).

**RLS:**
- ✅ Policy `"materials: admin deleta"` em `supabase/migrations/20260506022037_has_access_rls_policies.sql:190-192` — `using (public.is_admin())`. Cobre DELETE.
- ✅ Action usa `supabaseAdmin` (bypassa RLS), mas defesa em profundidade está presente.

**Build & typecheck:**
- ✅ `pnpm typecheck` — sem erros.
- ✅ `pnpm build` — `✓ Compiled successfully in 11.9s` + `✓ Generating static pages using 11 workers (144/144)`. Crítico porque toca admin (`supabaseAdmin` Proxy throw no build se SERVICE_ROLE_KEY ausente).

### Issues (CONCERNS — não bloqueantes)

#### CONCERN-1: `lessonId` omitido na chamada do client

**Arquivo:** `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/aulas/[lessonId]/LessonEditorClient.tsx:132`

```tsx
await deleteMaterial(id, storagePath ?? '', courseId)
```

A assinatura de `deleteMaterial(materialId, storagePath, courseId, lessonId?)` aceita `lessonId` como 4º argumento opcional para disparar o `revalidatePath` da rota da aula (`actions.ts:219-221`). O cliente **não passa** `lesson.id`, então o `revalidatePath` específico da aula não roda no servidor.

**Mitigação:** `router.refresh()` na linha 133 já força refetch do server component pai → o efeito visual é equivalente ao do revalidatePath. Não há bug funcional para o admin que está na própria página, mas **outras navegações que chegam à mesma rota podem ver cache stale por alguns segundos**.

**Fix sugerido (1 linha, follow-up):**
```tsx
await deleteMaterial(id, storagePath ?? '', courseId, lesson.id)
```

#### CONCERN-2: Duas funções de delete coexistem (débito técnico)

- `actions.ts:211` — `deleteMaterial(materialId, storagePath, courseId, lessonId?)` — usada pelo `LessonEditorClient.tsx` (real).
- `material-actions.ts:181` — `deleteMaterialAction(materialId)` — versão mais robusta (resolve `lesson_id` e `course_id` por query join, log de auditoria), mas usada apenas pelo `MaterialsUpload.tsx` que é **componente órfão** (zero importações fora de definições).

Como o lead já alertou: débito anterior, não escopo destas stories. Recomendação para follow-up: consolidar em `deleteMaterialAction` e deletar `deleteMaterial`+`MaterialsUpload.tsx` órfão.

#### CONCERN-3: Smoke test manual não executado

Não tenho ambiente browser + Supabase local rodando nesta sessão para validar:
- Login admin → upload de PDF teste → delete → confirmar sumiço da UI E do bucket.
- Login aluno → click em material → confirma nova aba.

**Compensação:** o code review profundo cobre todos os caminhos das ACs e o build/typecheck passam. **Recomendo ao usuário/devops executar o smoke test antes do push para produção** — especialmente a parte de delete do storage no Supabase (verificar pelo dashboard que o arquivo sumiu do bucket `materials`).

### Issues bloqueantes
Nenhum.

---

## Resumo executivo

| Story | Veredicto | Observações |
|---|---|---|
| 2.1 | ✅ PASS | Implementação limpa, todas ACs atendidas. |
| 2.2 | ⚠️ CONCERNS | Push autorizado. 1 fix opcional (lessonId arg), débito técnico anterior, smoke test manual pendente do user. |

**Próximo passo:** `sites-devops` autorizado a push para `fix-aula-aluno-ux-bugs`. Ressalvas documentadas; lead decide se aceita os concerns ou pede ajuste do CONCERN-1 antes do push (1 linha de mudança).

---

## Validações executadas

- ✅ Read review: `MaterialsList.tsx`, `MaterialsUpload.tsx`, `LessonEditorClient.tsx`, `actions.ts`, `material-actions.ts`, `materials.ts` (storage helper), `helpers.ts` (auth).
- ✅ Verificação RLS: `20260506022037_has_access_rls_policies.sql:190` — DELETE policy presente.
- ✅ `pnpm typecheck` — limpo.
- ✅ `pnpm build` — compiled successfully (144/144 static pages).
- ❌ Smoke test browser — **não executado** (ambiente sem browser).
- ✅ Cross-reference das ACs com código real.
- ✅ Cross-reference dos commits citados (`8035b6a`, `4861283`, `d05e5ac`, `8c85989`, `bba354d`) com `git log`.
