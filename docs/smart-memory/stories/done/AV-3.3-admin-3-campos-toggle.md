---
title: "Story AV-3.3: Admin — 3 campos textuais (description, summary, transcript) com toggle Editar/Visualizar"
type: story
status: done
epic: AV
complexity: M
agent: sites-dev-alpha
created: 2026-05-16
updated: 2026-05-16
tags: [story, admin, lesson-editor, markdown, preview, aulas-v2]
related:
  - "[[AV-3.1-migration-aulas-v2]]"
  - "[[../done/2.3-preview-markdown-admin]]"
  - "[[AV-3.4-aluno-5-abas]]"
---

# Story AV-3.3: Admin — 3 campos textuais (description, summary, transcript) com toggle Editar/Visualizar

## Objetivo
Estender o `LessonEditorClient.tsx` (admin) para incluir os campos novos `summary` e `transcript`, ambos com o mesmo padrão "Editar / Visualizar" já em produção para `description` (Story 2.3). Trocar o `<input>` linha-única do `description` por `<textarea>` para acomodar markdown multi-linha do template AV-3.2.

## Acceptance Criteria

- [ ] **AC1 (Description vira textarea)**: O campo `description` em `LessonEditorClient.tsx:237-244` deixa de ser `<input>` e vira `<textarea rows={6}>` com auto-resize via `field-sizing: content` (CSS) ou `useEffect` que ajusta `style.height = scrollHeight`. Toggle "Editar/Visualizar" já existente (linhas 218-227) preservado, sem alterações de comportamento. Modo "Visualizar" continua usando `LessonContent content={{format:'MARKDOWN', raw:description}}` (linhas 229-235).

- [ ] **AC2 (Campo summary)**: Adicionar nova `<section>` "Resumo" entre Vídeo (linha 250) e Conteúdo da Aula (linha 310). Layout idêntico à seção description: label "Resumo", toggle Editar/Visualizar à direita (mostra apenas se `summary` não vazio), `<textarea rows={6}>` no modo Edit, `<LessonContent content={{format:'MARKDOWN', raw:summary}}>` no modo Visualizar. State `summary` inicializado de `lesson.summary ?? ''`. Format fixo MARKDOWN (não expor seletor de formato — UX simples).

- [ ] **AC3 (Campo transcript)**: Mesma estrutura do summary, label "Transcrição", colocada **após** "Conteúdo da Aula" (depois da linha 347, antes de Materiais 350). State `transcript` inicializado de `lesson.transcript ?? ''`. `<textarea rows={12}>` (transcript tende a ser maior). Format fixo MARKDOWN.

- [ ] **AC4 (updateLesson aceita os novos campos)**: A server action `updateLesson` em `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts` aceita `summary`, `summary_format`, `transcript`, `transcript_format` no payload. `handleSave` em `LessonEditorClient.tsx:99-119` envia:
  ```ts
  await updateLesson(lesson.id, courseId, {
    title,
    description: description || null,
    summary: summary || null,
    summary_format: summary ? 'MARKDOWN' : null,
    transcript: transcript || null,
    transcript_format: transcript ? 'MARKDOWN' : null,
    kind, video_provider, video_id,
    content_format, content,
  })
  ```

- [ ] **AC5 (Toggle aria-pressed e foco visível)**: Os 3 toggles "Editar / Visualizar" (description, summary, transcript) seguem o padrão da Story 2.3: `<button type="button" aria-pressed={preview}>` com `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]`. Ícone `<Eye className="h-3 w-3" />` à esquerda. Texto "Editar" / "Visualizar".

- [ ] **AC6 (Default Editar)**: Os 3 campos abrem por default em modo "Editar". Não persistir preferência entre reloads (manter simples, igual Story 2.3).

- [ ] **AC7 (Visualizar oculto quando vazio)**: O toggle só aparece quando o campo correspondente tem conteúdo (`description && ...`, `summary && ...`, `transcript && ...`). Igual ao padrão atual (linha 217: `{description && <button …>}`).

- [ ] **AC8 (Preview reusa LessonContent client-side)**: Para os 3 campos com format MARKDOWN puro, **não** chama `previewContentAction` (server action) — `react-markdown` direto no client é suficiente, igual Story 2.3 já faz pra description. Mantém latência zero.

- [ ] **AC9 (Smoke manual)**:
  1. Abrir aula `/academy/admin/cursos/{courseId}/aulas/{lessonId}` — ver 3 campos: Descrição (textarea), Resumo (textarea), Transcrição (textarea).
  2. Digitar markdown nos 3, alternar para "Visualizar" cada um — ver renderização.
  3. Clicar "Salvar Aula" → revalidate. Recarregar — valores persistem.
  4. Abrir aula no aluno (`/academy/curso/{slug}/aula/{slug}`) — confirmar que summary e transcript aparecem nas abas correspondentes (escopo de [[AV-3.4-aluno-5-abas]], mas teste de fumaça aqui).

## Escopo

**IN:**
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/aulas/[lessonId]/LessonEditorClient.tsx`:
  - Trocar `<input>` description por `<textarea>` com auto-resize.
  - Adicionar `useState` para `summary`, `summaryPreview`, `transcript`, `transcriptPreview`.
  - Renderizar 2 novas `<section>` (Resumo, Transcrição) seguindo o padrão visual.
  - Atualizar `handleSave` pra enviar os novos campos.
- `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts`:
  - Estender o tipo do payload de `updateLesson` com `summary`, `summary_format`, `transcript`, `transcript_format`.
  - Estender o objeto passado para o `update()` do Supabase.
- Tipos: confirmar que `Database['public']['Tables']['lessons']['Row']` já tem os 4 campos novos (depende de [[AV-3.1-migration-aulas-v2]] AC6).

**OUT:**
- Seletor de formato (HTML/MDX) para summary e transcript — fixo MARKDOWN no MVP. Se aluno pedir HTML/MDX no futuro, adicionar depois.
- WYSIWYG (TipTap) para summary/transcript — `<textarea>` markdown é coerente com o tom técnico do produto.
- Preview side-by-side simultâneo.
- Validação de tamanho máximo (transcript pode ser longo).
- Auto-save em rascunho.
- Diff "alterações não salvas".
- Migration (já em [[AV-3.1-migration-aulas-v2]]).

## Contexto Técnico

**Padrão estabelecido pela Story 2.3** (em `done/2.3-preview-markdown-admin.md`):
- Toggle Editar/Visualizar é `<button type="button" aria-pressed={state}>` com `<Eye />` icon.
- Modo Visualizar renderiza `<LessonContent content={{format:'MARKDOWN', raw:value}}>` direto no client (sem server action) para markdown puro.
- Server action `previewContentAction` é reservada para `content` (que pode ser MDX/HTML) — não precisamos pra summary/transcript.

**Layout de seções** (`sectionClass` linha 41-42):
```ts
const sectionClass = 'border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-6 space-y-4'
```
Reusar nas seções Resumo e Transcrição.

**Auto-resize do textarea:**
- Opção A (CSS moderno): `field-sizing: content` em `globals.css`. Suporte: Chrome 123+, Safari 17.4+ (cobertura ~90% em 2026). Fallback: rows fixo.
- Opção B (JS): `useEffect` que monitora `value` e ajusta `el.style.height = el.scrollHeight + 'px'`. Mais código mas universal.
- Decisão: usar Opção A com fallback para `rows`. Se quebrar em algum browser, fica funcional, só não auto-resize.

**Order visual recomendada das seções no admin:**
1. Informações (título, tipo, descrição) — já existe
2. Vídeo — já existe
3. **Resumo** — NOVO
4. Conteúdo da Aula — já existe
5. **Transcrição** — NOVO
6. Materiais — já existe

Por quê transcript depois de "Conteúdo da Aula"? Transcript é o texto literal do vídeo, conceitualmente vem após o conteúdo principal. Resumo é teaser, vem antes.

**Coordenação:**
- sites-dev-alpha sozinho (não precisa de UX dedicado — padrão visual já estabelecido pela Story 2.3).
- Depende de [[AV-3.1-migration-aulas-v2]] estar aplicada (tipos regenerados).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha (Novael) |
| Iniciado   | 2026-05-16 |
| Concluído  | 2026-05-16 |
| Branch     | feat-aulas-v2 |

## File List

- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/aulas/[lessonId]/LessonEditorClient.tsx` — MarkdownField subcomponente, textarea com field-sizing:content, seções Resumo e Transcrição, handleSave com summary/transcript

## QA Results
<!-- QA preenche ao revisar -->
