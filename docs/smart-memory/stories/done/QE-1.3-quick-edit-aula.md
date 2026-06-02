---
title: "Story QE-1.3: Quick edit de título de aula via InlineEditField"
type: story
status: done
epic: QE
complexity: M
agent: dev-architect
created: 2026-06-02
updated: 2026-06-02
tags: [story, admin, ux]
related: [QE-1.1, QE-1.2]
---

# Story QE-1.3: Quick edit de título de aula via `<InlineEditField>`

## Objetivo
Dar à aula o mesmo quick edit do módulo: ao clicar no lápis do `SortableLesson`, editar o título inline (Enter confirma, Escape cancela) e persistir via `updateLesson` sem navegar para a página completa da aula — eliminando o ciclo de navegação para renomeações em sequência.

## Acceptance Criteria
- [ ] AC1: Em `SortableLesson` (CourseEditorClient.tsx:54-130), o título da aula (`<span>` da linha 103) passa a usar `<InlineEditField>` controlado (`isEditing`/`onEditingChange` em estado local da row).
- [ ] AC2: **Lápis vira `<button>`:** o lápis atual é um `<Link>` para `/academy/admin/cursos/${courseId}/aulas/${lesson.id}` (linhas 115-120). Trocar para `<button>` que ativa o quick edit inline (`setEditing(true)`), mantendo ref no botão para foco-retorno (QE-1.1 AC11).
- [ ] AC3: **Novo ícone `ExternalLink`** (`ExternalLink h-3 w-3`, `title="Edição completa"`) adicionado à direita do lápis como `<Link href="/academy/admin/cursos/${courseId}/aulas/${lesson.id}">` — preserva o acesso à página completa da aula (spec §269-281). Ordem final dos ícones na row: `[grip] [kind-badge] [título/InlineEditField] ... [eye-toggle] [lápis=inline edit] [ExternalLink=edição completa] [trash]` (spec §276).
- [ ] AC4: `onSave` chama `updateLesson(lesson.id, courseId, { title: trimmed })` — **apenas título**. NÃO derivar/enviar slug a partir do título (o slug da aula compõe a URL pública e renomear título não deve quebrar a rota; spec §87-90).
- [ ] AC5: Após salvar, o título exibido na linha atualiza sem reload (atualização otimista do estado local de `lessons` no módulo pai).
- [ ] AC6: Enter/Check salva; Escape/X cancela restaurando o título; blur salva se mudou/não-vazio — comportamento herdado de `<InlineEditField>`.
- [ ] AC7: Entrar/sair do modo de edição não dispara o drag da linha (PointerSensor com `activationConstraint` de QE-1.1) nem o reorder; stopPropagation no input/triggers.
- [ ] AC8: Os controles existentes da linha continuam funcionando: toggle de disponibilidade (Eye/EyeOff), delete (Trash2), e o novo acesso à edição completa (ExternalLink).
- [ ] AC9: `pnpm build` passa; sem regressão visual na linha da aula (ImportError: lembrar de importar `ExternalLink` de `lucide-react`).

## Escopo

**IN:**
- Wiring de `<InlineEditField>` controlado no título da aula em `SortableLesson`.
- Lápis `<Link>` → `<button>` (ativa inline edit) + novo ícone `ExternalLink` (acesso à edição completa).
- Persistência de título via `updateLesson` (somente campo `title`, sem slug).
- Atualização otimista do título no estado local de `lessons` via novo callback do `SortableModule`.

**OUT:**
- Edição inline de slug, kind, vídeo, conteúdo da aula — tudo isso permanece na página completa.
- Alteração de server actions (`updateLesson` já aceita `{ title }`).
- Edição de aula a partir de outras telas (player do aluno etc.).

## Contexto Técnico
- **Spec UX:** `docs/smart-memory/agents/ux/quick-edit-spec.md` §6 (ícones aula, lápis→button + ExternalLink) e §269-281.
- Bloqueada por **QE-1.1**. Idealmente implementada após **QE-1.2** para reusar o padrão de wiring validado, mas tecnicamente só depende de QE-1.1.
- `updateLesson(id, courseId, data)` em `actions.ts:155` — só re-deriva slug **se** `data.slug` for string (linha 159). Enviando apenas `{ title }`, o slug não é tocado. Isso é desejado (AC3).
- Diferença-chave vs módulo: **não** derivar slug do título. O slug da aula compõe a URL pública (`ensureUniqueSlugInCourse`) e renomear o título não deve alterar a rota.
- O estado `lessons` é local ao `SortableModule` (CourseEditorClient.tsx:154). A atualização otimista precisa mexer nesse `setLessons`, então `SortableLesson` deve receber um callback `onTitleUpdate` (ou similar) do `SortableModule`, espelhando o padrão `onUpdate` usado para módulos.
- A linha da aula é arrastável (useSortable + PointerSensor). O trigger de edição e o input precisam de `stopPropagation`/`onPointerDown` cuidadoso para não iniciar drag.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | Novael (sites-dev-alpha) |
| Iniciado   | 2026-06-02 |
| Concluído  | 2026-06-02 |
| Branch     | victor-alteracoes-aluno |

## File List
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/CourseEditorClient.tsx` — SortableLesson refatorado: lápis Link→button, ExternalLink adicionado, InlineEditField controlado, onTitleUpdate callback para atualização otimista

## QA Results
<!-- QA preenche ao revisar -->
