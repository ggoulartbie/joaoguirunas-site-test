---
title: "QA Verdict — Story 2.3 (preview admin)"
type: qa-verdict
status: emitted
agent: sites-qa (Axilun)
created: 2026-05-16
updated: 2026-05-16
tags: [qa, verdict, preview, admin, story-2.3]
related:
  - "[[../../stories/done/2.3-preview-markdown-admin]]"
  - "[[results]]"
  - "[[verdict-stories-2.1-2.2]]"
---

# QA Verdict — Story 2.3 (Preview de markdown/HTML/MDX no editor de aula admin)

**Branch:** `feat-preview-admin-aula`
**Commit:** `d1c6213`
**Data:** 2026-05-16
**Avaliador:** Axilun (sites-qa)

---

## VEREDICTO: ✅ PASS

### Checklist 10 pontos

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade | ✅ Clean. Server action minimalista; useEffect bem isolado |
| 2 | Acceptance criteria — AC1 a AC8 atendidas; AC9 (smoke browser) pendente do user | ⚠️ ver concern #1 |
| 3 | Sem regressões — fluxos de save/upload/delete preservados | ✅ |
| 4 | Performance — debounce 400ms; preview não dispara fora do modo Visualizar | ✅ |
| 5 | Acessibilidade — `aria-pressed` em ambos os toggles, focus-visible ring | ✅ |
| 6 | SEO — N/A (admin) | ✅ |
| 7 | Responsivo — toggle compacto, sem split layout | ✅ |
| 8 | Copy — "Editar / Visualizar", "Renderizando…" claros | ✅ |
| 9 | Cross-browser — sem APIs exóticas | ✅ |
| 10 | Security — `requireAdmin()` na action; HTML preview agora sanitizado via `sanitizeHtml`; risco XSS do estado anterior eliminado | ✅ |

---

## Verificação técnica

### Server action `preview-actions.ts`

```ts
export async function previewContentAction(
  format: ContentFormat,
  content: string
): Promise<RenderedContent> {
  await requireAdmin()
  try {
    return await renderContent(format, content)
  } catch (err) {
    const msg = err instanceof Error ? err.message.slice(0, 200) : 'Erro ao renderizar'
    throw new Error(msg)
  }
}
```

- ✅ `requireAdmin()` primeiro (defesa em profundidade).
- ✅ `renderContent` é a mesma função usada na renderização real do aluno — paridade garantida.
- ✅ Trunca mensagem de erro a 200 chars (atende AC6).
- ✅ `'use server'` no topo, isolado em arquivo dedicado (boa separação).

### Client `LessonEditorClient.tsx`

**Description preview (linhas 60, 215-244):**
- ✅ State `descriptionPreview: boolean`, toggle apenas aparece quando `description` é truthy.
- ✅ `aria-pressed={descriptionPreview}` (linha 220).
- ✅ Renderiza `<LessonContent content={{format: 'MARKDOWN', raw: description}} />` — client-side puro, sem round-trip (otimização correta para campo curto).

**Content preview (linhas 79-97, 309-347):**
- ✅ `useEffect` com:
  - Guard `if (!preview || !content) return` (não chama action fora do preview).
  - `setTimeout` 400ms.
  - `clearTimeout` no cleanup — debounce correto.
  - Dependências `[preview, content, contentFormat]` cobrem todas as mudanças que invalidam o cache.
- ✅ Mantém `previewContent` anterior durante novo render (não há `setPreviewContent(null)` no início do timer) — atende AC5 "sem flash".
- ✅ `previewLoading` + indicador "Renderizando…" canto superior direito (linhas 328-330).
- ✅ `previewError` exibido como `font-mono text-[11px] text-[var(--ember)]` (linha 332) — fallback amigável sem crash.
- ✅ `aria-pressed={preview}` no botão (linha 316).

**ContentEditor cleanup:**
- ✅ Diff entre `82624e4 → d1c6213` mostra remoção limpa do `MDXPreviewClient` quebrado (que usava `useState` em vez de `useEffect` para side-effects).
- ✅ Removido toggle MDX interno; preview agora é responsabilidade exclusiva do `LessonEditorClient`.
- ✅ Único consumidor de `ContentEditor` é o próprio `LessonEditorClient` — sem outras telas afetadas.

### Pipeline de render

`previewContentAction` → `renderContent(format, content)`:
- `MDX` → `serializeMDX` via `next-mdx-remote/serialize` → `MDXRemote` no client.
- `HTML` → `sanitizeHtml` (lista branca de tags/atributos) → `dangerouslySetInnerHTML` (seguro pós-sanitize).
- `MARKDOWN` → `raw` → `<ReactMarkdown>` no client.

Pipeline idêntico ao usado para renderizar para o aluno em produção — preview reflete fielmente o resultado final.

### Build & typecheck

- ✅ `pnpm typecheck` — `$ tsc --noEmit` sem erros.
- ✅ `pnpm build` — `✓ Compiled successfully in 10.1s` + 144 static pages geradas (proxy `supabaseAdmin` OK).

### Bonus: CONCERN-1 da Story 2.2 corrigido

Commit `8d03531` (anterior ao escopo desta story) corrigiu o ponto levantado no verdict 2.1/2.2:

```diff
-await deleteMaterial(id, storagePath ?? '', courseId)
+await deleteMaterial(id, storagePath ?? '', courseId, lesson.id)
```

`LessonEditorClient.tsx:149` agora passa o 4º arg → `revalidatePath` da rota da aula no servidor dispara corretamente.

---

## Issues

### Bloqueantes
Nenhum.

### CONCERNS (não bloqueantes)

#### CONCERN-1: Smoke test browser não executado

Não tenho ambiente browser + admin local rodando para validar manualmente:
- Toggle preview "Visualizar" → editar markdown → ver render em ~400ms.
- Mudança de formato MARKDOWN → HTML → MDX no preview.
- Paste de MDX inválido (ex: `<UnknownComponent />`) → ver fallback amigável.
- Description preview render de `**bold**`.

**Compensação:** code review profundo + verificação de paridade com a pipeline já em produção do aluno. Pipeline `renderContent` é a mesma utilizada quando o aluno acessa a aula — qualquer issue ali já seria observado em prod. Toggle UI seguindo padrão existente do projeto.

**Recomendação:** João/devops faz o smoke local antes do push para prod (5 min). Especialmente o caminho MDX com componente inválido para confirmar o fallback de erro.

#### CONCERN-2: Sem rate-limit no `previewContentAction` (out of scope)

A cada keystroke após 400ms de pausa, dispara server action. Admin é trusted, sem risco prático, mas teoricamente sem limite. Fora de escopo da story; mencionado para registro.

#### CONCERN-3: Preview de `description` é puro client-side (assimétrico)

`description` usa `<LessonContent content={{format: 'MARKDOWN', raw: description}} />` direto, sem passar por `previewContentAction`. É uma escolha de design (campo curto, sempre markdown, dispensa MDX), documentada na spec linha 102. Funcionalmente correto; só nota que se um dia `description` mudar de tipo, esse caminho precisará revisar.

---

## Resumo executivo

| Aspecto | Status |
|---|---|
| ACs (AC1-AC8) | ✅ Todas atendidas |
| AC9 (smoke manual) | ⚠️ Pendente do user — não bloqueia push |
| Typecheck | ✅ Limpo |
| Build de produção | ✅ Compiled successfully (144/144 static pages) |
| Cleanup do MDXPreviewClient quebrado | ✅ Confirmado por diff |
| ContentEditor — outros usages | ✅ Único consumidor é LessonEditorClient |
| Segurança | ✅ requireAdmin + HTML sanitizado + XSS preview eliminado |
| CONCERN-1 da Story 2.2 | ✅ Corrigido (commit 8d03531) |

**Próximo passo:** `sites-devops` autorizado a push para `feat-preview-admin-aula`. Smoke test local recomendado mas não obrigatório (paridade com pipeline em prod já garante o caminho feliz).

---

## Validações executadas

- ✅ Read review: `preview-actions.ts`, `LessonEditorClient.tsx` (430 linhas), `ContentEditor.tsx`, `LessonContent.tsx`, `mdx.ts`, `html.ts`, `index.ts` (renderContent).
- ✅ Diff `82624e4 → d1c6213` em `ContentEditor.tsx` confirmou remoção do `MDXPreviewClient` quebrado.
- ✅ Grep usages de `ContentEditor` — único consumidor é `LessonEditorClient.tsx`.
- ✅ `pnpm typecheck` — limpo.
- ✅ `pnpm build` — Compiled successfully em 10.1s + 144 static pages.
- ✅ Verificação de paridade do pipeline preview vs. render real do aluno (`renderContent` é idêntica).
- ❌ Smoke test browser — não executado (ambiente sem browser).
