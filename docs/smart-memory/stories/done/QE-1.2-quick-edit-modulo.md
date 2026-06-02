---
title: "Story QE-1.2: Quick edit de título de módulo via InlineEditField"
type: story
status: done
epic: QE
complexity: S
agent: dev-architect
created: 2026-06-02
updated: 2026-06-02
tags: [story, admin, ux]
related: [QE-1.1, QE-1.3]
---

# Story QE-1.2: Quick edit de título de módulo via `<InlineEditField>`

## Objetivo
Corrigir o HTML inválido do header do módulo (input dentro de `<button>`) e substituir a lógica de edição inline (hoje inlined em `SortableModule`) pelo componente `<InlineEditField>` de QE-1.1, mantendo o comportamento atual (Enter/Escape/blur, slug auto-derivado, persistência via `updateModule`) com zero regressão.

## Acceptance Criteria
- [ ] AC1: **Fix de HTML inválido:** atualmente o `<input>` de edição fica **dentro** do `<button>` de toggle collapse (CourseEditorClient.tsx:234-272) — `<button>` não pode conter `<input>`. Reestruturar o header conforme a spec §136-147: o **chevron vira botão independente** e o título (span/InlineEditField com `flex-1`) fica solto no flex, fora de qualquer `<button>`. Layout final: `<div.flex> [grip] [chevron-button] [InlineEditField.flex-1] [count] [lápis] [Materiais] [trash]`.
- [ ] AC2: Em `SortableModule`, o título do módulo é renderizado via `<InlineEditField>` com estado controlado: `isEditing={editingTitle}` + `onEditingChange={setEditingTitle}`. O `<input>` inline manual e a lógica de `titleDraft`/Enter/Escape/blur são **removidos** (vivem agora no componente).
- [ ] AC3: O ícone lápis (Pencil, CourseEditorClient.tsx:273-279) permanece como `<button>` e ativa a edição via `setEditingTitle(true)`. Mantém ref no lápis para o foco-retorno (QE-1.1 AC11).
- [ ] AC4: `onSave` deriva o slug via `slugify(trimmed)` e chama `updateModule(mod.id, courseId, { title: trimmed, slug: newSlug })`, depois `onUpdate(mod.id, { title, slug })` para atualizar o estado pai (paridade com CourseEditorClient.tsx:251-255). Módulo **deriva slug do título** (diferente da aula — ver QE-1.3 AC3).
- [ ] AC5: Enter/Check salva; Escape/X cancela restaurando o título; blur salva se mudou/não-vazio — comportamento herdado de `<InlineEditField>` (QE-1.1 AC5-AC9).
- [ ] AC6: Entrar/editar **não** dispara o toggle de expand/collapse nem o drag. Com o chevron agora separado e o título fora do `<button>`, o conflito estrutural some; o `onClick` do input ainda faz `stopPropagation` (QE-1.1 já cobre).
- [ ] AC7: Salvar com sucesso atualiza o título exibido sem reload; o contador "N aulas", o toggle collapse, "Materiais", delete e demais controles continuam funcionando.
- [ ] AC8: `pnpm build` passa; nenhuma regressão visual no header do módulo (alinhamento do chevron, espaçamentos).

## Escopo

**IN:**
- Fix estrutural do header (chevron como botão independente, título fora do `<button>`).
- Refactor de `SortableModule` para consumir `<InlineEditField>` controlado.
- Remoção do código de edição inline duplicado.
- Slug auto-derivado do título e atualização otimista do pai.

**OUT:**
- Edição de descrição do módulo.
- Alteração da página `/modulos/[moduleId]` (materiais).
- Qualquer mudança em server actions (`updateModule` já existe e basta).
- Unificação do `slugify` duplicado (linhas 170 e 405) — fora de escopo.

## Contexto Técnico
- **Spec UX:** `docs/smart-memory/agents/ux/quick-edit-spec.md` §136-147 (fix estrutural do header) e §238-251 (exemplo de wiring no pai).
- Bloqueada por **QE-1.1** (precisa do componente).
- Comportamento atual de referência: CourseEditorClient.tsx:243-279.
- `updateModule(id, courseId, data)` já existe em `actions.ts:94` e revalida `/academy/admin/cursos/${courseId}`.
- `slugify` está duplicado no arquivo (linhas 170 e 405) — reusar a instância já presente em `SortableModule`.
- **Causa do bug de HTML:** o título e o input vivem dentro do `<button>` de toggle collapse (CourseEditorClient.tsx:234-272). Separar o chevron resolve tanto a invalidez de HTML quanto o conflito de propagação de eventos do toggle.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | Novael (sites-dev-alpha) |
| Iniciado   | 2026-06-02 |
| Concluído  | 2026-06-02 |
| Branch     | victor-alteracoes-aluno |

## File List
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/CourseEditorClient.tsx` — SortableModule refatorado: header reestruturado (chevron independente, título fora do button), InlineEditField controlado, remoção da lógica manual de edição, callback onUpdate para atualização otimista

## QA Results
<!-- QA preenche ao revisar -->
