---
title: "AP-1.3: Filtros do dashboard de progresso (curso, turma, módulo)"
type: story
status: backlog
epic: AP
complexity: S
agent: sites-dev-alpha
created: 2026-05-21
updated: 2026-05-21
tags: [story, admin, progress, ui, filters, optional]
checklist: GO
related:
  - "[[AP-1.1-server-actions-progresso-admin]]"
  - "[[AP-1.2-pagina-admin-progresso]]"
---

# AP-1.3: Filtros do dashboard de progresso (curso, turma, módulo)

## Objetivo

Adicionar filtros estruturados à página `/admin/progresso` para escopar a visualização por curso, turma (cohort) e módulo. Reaproveita a infraestrutura de AP-1.1/AP-1.2 — a action `getStudentsProgress` já recebe `cohortId` e `courseId` por contrato; esta story adiciona o filtro de **módulo** (não previsto no contrato base) e a UI dos 3 filtros.

## Acceptance Criteria

- [ ] **AC1 — UI de filtros:** componente `ProgressFilters.tsx` no topo da página `/admin/progresso`, abaixo do header. Três selects (combobox ou native `<select>` — implementador escolhe; preferência: `<select>` por simplicidade): "Curso", "Turma", "Módulo". Cada um com opção padrão "Todos".
- [ ] **AC2 — Opções dos selects:**
  - **Curso:** lista de `courses` com `cohort_courses` (apenas cursos que pelo menos um aluno tem acesso)
  - **Turma:** lista de `cohorts` que têm `cohort_members` `ACTIVE`
  - **Módulo:** desabilitado até um curso ser escolhido. Quando há curso selecionado, lista os módulos daquele curso (`modules.course_id = courseId`, ordenados por `order_index`/`position` se existir, senão título)
- [ ] **AC3 — Estado dos filtros via URL:** filtros sincronizam com query params (`?course=<uuid>&cohort=<uuid>&module=<uuid>`). Permite compartilhar link, reload preserva estado, back button funciona. Usar `useRouter` + `useSearchParams` do Next.js App Router.
- [ ] **AC4 — Extensão da action `getStudentsProgress`:** aceita `moduleId?: string` em `filters`. Quando informado, restringe o cálculo de `totalLessons`/`completedLessons` **apenas àquele módulo** (não ao curso inteiro). Mesma validação UUID. AC8 da AP-1.1 (≤ 3 queries) continua valendo.
- [ ] **AC5 — Extensão da action `getLessonsCompletionStats`:** aceita `moduleId?: string`. Quando informado, retorna **apenas as aulas daquele módulo**.
- [ ] **AC6 — Re-fetch ao mudar filtros:** mudança de qualquer select dispara reload da página (server-side re-render) via `router.push` com novos searchParams. Page é `force-dynamic`, então não há staleness.
- [ ] **AC7 — Reset de filtros:** botão "Limpar filtros" visível quando pelo menos 1 filtro está ativo. Reset volta para `/admin/progresso` sem params.
- [ ] **AC8 — Combinação de filtros:** os 3 filtros podem ser combinados (curso + turma + módulo). Resultado da tabela e da seção "por aula" reflete a interseção. Exemplo: curso=X + cohort=Y + module=Z → "alunos da turma Y, vendo progresso só do módulo Z dentro do curso X".
- [ ] **AC9 — Validação de query params malformados:** UUID inválido na URL → ignora aquele filtro e renderiza sem ele (não throw). Module ID sem course ID → ignora module (não faz sentido isolado).
- [ ] **AC10 — Acessibilidade:** selects têm `<label>` associado. Botão "Limpar filtros" tem `aria-label` quando só ícone.
- [ ] **AC11 — Typecheck + lint + build:** `pnpm typecheck`, `pnpm lint` e `pnpm build` PASS.
- [ ] **AC12 — Smoke manual:** validar as 8 combinações (000, X00, 0Y0, 00Z, XY0, X0Z, 0YZ, XYZ) renderizam coerentemente. Documentar no PR.

## Escopo

**IN:**
- Componente `ProgressFilters.tsx`
- Extensão de 2 actions de AP-1.1 (`getStudentsProgress`, `getLessonsCompletionStats`) com `moduleId`
- Sincronização URL ↔ filtros
- Reset de filtros
- Validação defensiva de UUIDs vindos da URL

**OUT:**
- Filtro por intervalo de datas (não pedido pelo PO; abrir follow-up se solicitar)
- Filtro por status (ACTIVE/EXPIRED/CANCELLED) — universo já é ACTIVE
- Salvar conjunto de filtros como preset
- Multi-select (1 valor por dimensão nesta entrega)
- Filtro por aula individual (granular demais; tabela já lista aulas por módulo)
- Export filtrado em CSV
- Cache de opções de select (pequeno o suficiente para re-fetch toda render)

## Contexto Técnico

**Status:** opcional segundo o PO. Só deve sair do backlog quando AP-1.1 e AP-1.2 estiverem em `done/`.

**Padrão de URL ↔ state:**
- Server Component lê `searchParams: Promise<{ course?: string, cohort?: string, module?: string }>` (Next 16 — params são async)
- Valida cada um (UUID regex)
- Passa para `getStudentsProgress({ cohortId, courseId, moduleId })`
- Client component dos selects usa `useSearchParams()` + `useRouter().push()`

**Dependência de campo no schema:** AC2 do filtro Módulo assume `modules.order_index` ou `modules.position`. Caso nenhum dos dois exista, usar ordem alfabética por título (documentar no PR). Não criar migration nesta story.

**Risco de regressão:** mudanças no contrato das actions de AP-1.1 — adicionar campo opcional `moduleId` é backwards-compatible; a AP-1.2 já passa o objeto inteiro, então sem refactor de callers existentes.

## Coordenação

- **Bloqueada por:** [[AP-1.1-server-actions-progresso-admin|AP-1.1]] e [[AP-1.2-pagina-admin-progresso|AP-1.2]] precisam estar `done`.
- **Status PO:** opcional — só promover para `active` se PO João pedir explicitamente após AP-1.1/AP-1.2.
- **Decisão de descarte:** se PO indicar que filtros não são necessários (universo pequeno), mover para `deleted` com justificativa.

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-alpha |
| Iniciado | — |
| Concluído | — |
| Branch | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
