---
title: "Story QE-1.1: Componente <InlineEditField> reutilizável"
type: story
status: done
epic: QE
complexity: M
agent: dev-architect
created: 2026-06-02
updated: 2026-06-02
tags: [story, admin, ux, component]
related: [QE-1.2, QE-1.3]
---

# Story QE-1.1: Componente `<InlineEditField>` reutilizável

## Objetivo
Extrair um componente client reutilizável `<InlineEditField>` que transforma um label estático em input editável inline, com Enter para confirmar, Escape para cancelar, salvamento via callback async, loading e error state — base para o quick edit de módulos (QE-1.2) e aulas (QE-1.3).

## Acceptance Criteria
- [ ] AC1: Existe `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/InlineEditField.tsx` (`'use client'`) exportando `InlineEditField`. (Co-localizado no folder do editor de curso, não em `src/components/` — ver nota em Contexto Técnico sobre divergência com a spec §328.)
- [ ] AC2: Props: `value: string`, `onSave: (next: string) => Promise<void>` (async, lança exceção em erro), `isEditing: boolean`, `onEditingChange: (editing: boolean) => void`, `className?: string`, `inputClassName?: string`, `placeholder?: string` (default `"Título..."`), `'aria-label'?: string`. **Estado de edição é controlado externamente** (`isEditing` + `onEditingChange`), não por trigger interno — quem ativa é o botão lápis do caller (spec §233-257). Sem refs imperativos.
- [ ] AC3: Estado **idle** (`!isEditing`) renderiza `<span className={className}>{value}</span>` sem handler de clique; estado **editing** (`isEditing`) renderiza `<input>` com `autoFocus`, `value` controlado por draft interno, `border-b border-[var(--ember)]`, `bg-transparent`.
- [ ] AC4: `draft` interno sincroniza com a prop `value` quando `!isEditing` (cobre atualização externa do valor, spec §188). Ao entrar em edição, draft parte do `value` atual.
- [ ] AC5: **Enter** salva (equivale ao Check); **Escape** cancela restaurando `value` original e chama `onEditingChange(false)`; **blur** salva se draft mudou e não-vazio, cancela silencioso se igual ao original ou vazio (spec §50-58).
- [ ] AC6: Botões **Check** (`text-emerald-400`, aria-label "Salvar") e **X** (`text-[var(--bone-mute)]`, aria-label "Cancelar") aparecem à direita do input em modo editing e **desaparecem durante saving** (previne double-submit, spec §65, §217).
- [ ] AC7: Regra de save: dispara `onSave(trimmed)` somente se `trim()` é não-vazio E diferente do `value` original. Igual ao original → fecha silencioso sem request (spec §102-104). Vazio/só-espaços → não salva, **não fecha**, mantém foco, mensagem inline "Título não pode ser vazio" (spec §96-99).
- [ ] AC8: Durante `onSave` pendente: input `opacity-60 cursor-wait` e `disabled`; Check/X ocultos. **Sucesso é silencioso** — sem toast; o novo valor aparece no lugar (spec §68-70).
- [ ] AC9: Se `onSave` rejeitar (throw): input volta ao estado editável (não fecha), **mantém o draft digitado** (não restaura original), mensagem inline `font-mono text-[10px] text-red-400` "Erro ao salvar. Tente novamente." Permite Enter/blur para retry ou Escape para cancelar (spec §73-77, §107-109).
- [ ] AC10: **Edições simultâneas permitidas** — componente stateless quanto a outros itens; módulo e aula podem editar ao mesmo tempo (spec §111-112). "Um campo por item" é garantido pelo caller (booleano `isEditing`).
- [ ] AC11: Acessibilidade: `aria-label` no input; Check/X com aria-label; ao fechar (idle) o **foco retorna ao botão lápis** do caller; `disabled` no input durante saving; contraste `text-red-400` sobre `--ink-2` passa WCAG AA (spec §259-265). Nota: foco-retorno depende de coordenação com o caller — documentar o contrato (caller refoca o lápis via ref ao receber `onEditingChange(false)`).
- [ ] AC12: `activationConstraint: { distance: 8 }` aplicado ao `PointerSensor` dos sensors de DndKit do editor — course-level (`CourseEditorClient.tsx:403`) e lesson-level (`SortableModule`, `CourseEditorClient.tsx:155`). Evita drag acidental ao clicar no grip durante edição (spec §123-132). Verificar se já existe; adicionar onde faltar.
- [ ] AC13: `pnpm build` passa sem erros de tipo/lint.

## Escopo

**IN:**
- Criação do componente `InlineEditField` isolado e genérico, com estado de edição **controlado externamente** (`isEditing`/`onEditingChange`).
- Botões Check/X, loading (opacity/cursor-wait), error inline com retry, validação de trim/vazio/igual.
- Acessibilidade (aria-labels, foco-retorno ao lápis, disabled no saving).
- `activationConstraint: { distance: 8 }` nos PointerSensors do editor (course-level e lesson-level).

**OUT:**
- Wiring em SortableModule (QE-1.2) e SortableLesson (QE-1.3) — só o componente e os sensors aqui.
- Slug auto-derivado a partir do título (responsabilidade do caller, ver QE-1.2/QE-1.3).
- Edição de campos que não sejam título (ex.: descrição, kind).
- Debounce / autosave contínuo — confirmação é explícita (Enter/blur/Check).
- Toast de sucesso — sucesso é silencioso por decisão de UX (spec §68-70).

## Contexto Técnico
- **Spec UX de referência:** `docs/smart-memory/agents/ux/quick-edit-spec.md` — seções 1 (interação), 4 (DndKit), 5 (componente, props, estados, render), 6 (ícones aula). Os ACs acima referenciam linhas dessa spec.
- O padrão de edição inline **já existe** inlined em `CourseEditorClient.tsx:243-279` (input controlado por `editingTitle`/`titleDraft`), mas com problemas estruturais a corrigir em QE-1.2 (input dentro de `<button>`, HTML inválido). Esta story consolida o comportamento num componente único.
- A normalização de slug (`slugify`) e a chamada ao server action (`updateModule`/`updateLesson`) ficam no **caller** via `onSave`. `InlineEditField` é agnóstico ao domínio — só conhece string in / string out.
- **Estado controlado externamente** (decisão de UX, spec §233-235): `isEditing` + `onEditingChange` em vez de `useImperativeHandle`/ref — mais simples, o caller já tem o booleano por item. O foco-retorno ao lápis (AC11) é a única coordenação que exige ref no lado do caller.
- **Divergência de path resolvida:** a spec §328 sugere `src/components/InlineEditField.tsx`; mantive co-localização em `[courseId]/InlineEditField.tsx` porque o componente é específico do editor de curso admin e seu visual é acoplado ao design desse contexto. Se o lead preferir o path da spec, é trivial mover — sinalizar antes do dev iniciar.
- Padrões visuais (cores `--ember`/`--bone`, `font-mono`) seguem o existente; o caller passa tipografia via `className`/`inputClassName`.
- Usar `useTransition` ou `useState` para pending — escolha do dev; os ACs definem o comportamento observável, não a implementação.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | Novael (sites-dev-alpha) |
| Iniciado   | 2026-06-02 |
| Concluído  | 2026-06-02 |
| Branch     | victor-alteracoes-aluno |

## File List
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/InlineEditField.tsx` — criado
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/CourseEditorClient.tsx` — activationConstraint adicionado nos PointerSensors

## QA Results
<!-- QA preenche ao revisar -->
