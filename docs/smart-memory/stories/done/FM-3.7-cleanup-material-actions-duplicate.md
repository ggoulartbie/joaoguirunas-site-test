---
title: "FM-3.7: Cleanup — remover `material-actions.ts` órfão e `MaterialsUpload.tsx` órfão (absorve Story 2.4)"
type: story
status: done
epic: FM
complexity: S
agent: sites-dev-alpha
created: 2026-05-17
supersedes: "2.4-cleanup-material-actions-duplicate"
tags: [story, cleanup, tech-debt, admin, materials]
checklist: GO
related:
  - "[[../../decisions/ADR-002-materiais-por-modulo-schema]]"
  - "[[FM-3.3-server-actions-module-materials]]"
  - "[[2.4-cleanup-material-actions-duplicate]]"
  - "[[2.2-admin-gerencia-materiais]]"
---

# FM-3.7: Cleanup — remover `material-actions.ts` órfão e `MaterialsUpload.tsx` órfão

## Objetivo

Absorver e executar a Story 2.4 como parte da Epic FM: deletar
`src/app/(academy)/academy/(admin)/admin/cursos/material-actions.ts` (arquivo
inteiro **não importado** por nada em `src/`) e
`src/components/admin/MaterialsUpload.tsx` (componente **órfão**, sem imports
em `src/`). Após o cleanup, a funcionalidade de delete de material por aula
fica centralizada em `actions.ts:212` (`deleteMaterial`), e a funcionalidade
de material por módulo fica em `actions.ts` com as 3 novas actions da FM-3.3.

Single source of truth para server actions de admin/cursos = `actions.ts`.

## Acceptance Criteria

- [ ] **AC1 (Confirmar via grep — `MaterialsUpload.tsx`)**: rodar
  `grep -rn "MaterialsUpload" src/ app/ 2>/dev/null` e confirmar que
  **nenhum** arquivo (exceto o próprio `MaterialsUpload.tsx`) importa o
  componente. Se aparecer import inesperado, **NÃO deletar** — registrar
  achado e converter para refactor (consolidar funcionalidade na chamada
  remanescente).
- [ ] **AC2 (Confirmar via grep — `material-actions.ts`)**: rodar
  `grep -rn "from.*material-actions" src/ app/ 2>/dev/null` e
  `grep -rn "addLinkMaterialAction\|deleteMaterialAction" src/ app/ 2>/dev/null`
  e confirmar que nenhum import remanesce. Especial atenção: a FM-3.3 incluiu
  `addLinkModuleMaterial` em `actions.ts` (NÃO importa de `material-actions.ts`)
  — confirmar.
- [ ] **AC3 (Delete dos 2 arquivos)**: se AC1 + AC2 PASS, deletar:
  - `src/app/(academy)/academy/(admin)/admin/cursos/material-actions.ts`
  - `src/components/admin/MaterialsUpload.tsx`
- [ ] **AC4 (Refactor alternativo se algum import aparecer)**: se algum
  arquivo importar `material-actions.ts` ou `MaterialsUpload.tsx` em ponto
  não-óbvio, **não deletar** — abrir nota no PR explicando, consolidar a
  função usada em `actions.ts` e atualizar o import. Documentar onde foi
  consolidado.
- [ ] **AC5 (Typecheck e build)**: `pnpm typecheck` e `pnpm build` passam
  sem erros após o delete.
- [ ] **AC6 (Sem regressão — materiais de aula)**: smoke manual rápido:
  - admin acessa `/academy/admin/cursos/[id]/aulas/[id]` → editor de aula
    abre normalmente
  - upload de material de aula funciona
  - delete de material de aula funciona
  - aluno vê materiais de aula corretamente
- [ ] **AC7 (Sem regressão — materiais de módulo)**: smoke manual rápido:
  - admin acessa `/academy/admin/cursos/[id]/modulos/[id]` → editor de
    módulo abre normalmente
  - upload + add link + delete funcionam
- [ ] **AC8 (Arquivo Story 2.4 antiga)**: adicionar nota no topo de
  `docs/smart-memory/stories/backlog/2.4-cleanup-material-actions-duplicate.md`
  marcando como **superseded by FM-3.7** com data e link. Mover o arquivo
  para `docs/smart-memory/stories/done/` com nota `status: superseded` no
  frontmatter (ou manter em `backlog/` com a nota — decisão operacional do
  lead; sugiro `done/` com nota de supersede).
- [ ] **AC9 (Atualizar BACKLOG.md)**: na Epic FM adicionar linha FM-3.7;
  marcar Story 2.4 como `superseded`. Confirmar com grep que `2.4` aparece
  exatamente uma vez no BACKLOG.md (sem duplicação).

## Escopo

**IN:**
- Confirmação via grep de orfandade
- Delete dos 2 arquivos
- Update do arquivo de Story 2.4 (nota de supersede)
- Update do BACKLOG.md
- Smoke regressão (aula + módulo)

**OUT:**
- Refactor estrutural de `actions.ts` (que já cresceu — fica para próxima
  epic se necessário, **não** durante esta cleanup)
- Mudança na assinatura ou comportamento de `deleteMaterial` (aula) ou
  `deleteModuleMaterial` (módulo)
- Touch em `LessonEditorClient.tsx` ou `ModuleEditorClient.tsx`
- Audit log de quem deletou o quê

## Contexto Técnico

**Estado pré-Epic FM** (auditado pela Story 2.4):
- `src/app/(academy)/academy/(admin)/admin/cursos/actions.ts:212` —
  `deleteMaterial` **EM USO** por `LessonEditorClient.tsx`
- `src/app/(academy)/academy/(admin)/admin/cursos/material-actions.ts:181` —
  `deleteMaterialAction` **NÃO USADA** (grep limpo)
- `src/app/(academy)/academy/(admin)/admin/cursos/material-actions.ts:158` —
  `addLinkMaterialAction` **NÃO USADA** (a FM-3.3 implementou
  `addLinkModuleMaterial` em `actions.ts` — não importa do arquivo órfão)
- `src/components/admin/MaterialsUpload.tsx` — **COMPONENTE ÓRFÃO** (grep limpo)

**Por que essa story precisa rodar DEPOIS da FM-3.3:**
- FM-3.3 implementa `addLinkModuleMaterial` em `actions.ts`. Se a FM-3.7
  deletar `material-actions.ts` **antes** de FM-3.3 estar no merge, há risco
  de alguém importar o arquivo morto-vivo para reusar `addLinkMaterialAction`.
  Com FM-3.3 em mão, o caminho canônico já existe em `actions.ts`.

**Por que essa story pode rodar ANTES da FM-3.6 (QA gate):**
- Cleanup puro, sem mudança funcional. O QA gate da FM-3.6 já valida (AC7)
  que materiais de aula não regrediram — então o smoke desta story é
  redundante mas útil como early signal.

## Coordenação

- **Bloqueado por:** FM-3.3 (caminho canônico do addLink existe)
- **Bloqueia:** nada — mas RECOMENDADO rodar antes da FM-3.6 para a QA já
  validar com o arquivo morto-vivo removido
- **Coordenação direta:** após delete + smoke, avisar lead que pode dispatch
  FM-3.6 com confiança de cleanup já aplicado

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-alpha (Novael) |
| Iniciado | 2026-05-17 |
| Concluído | 2026-05-17 |
| Branch | feat-aulas-v2 |

## File List

- `src/app/(academy)/academy/(admin)/admin/cursos/material-actions.ts` — DELETADO (AC1+AC2: zero imports externos confirmados via grep)
- `src/components/admin/MaterialsUpload.tsx` — DELETADO (AC1: zero imports externos; AC2: importava material-actions.ts — ambos deletados juntos)
- `docs/smart-memory/stories/done/2.4-cleanup-material-actions-duplicate.md` — já em done/ com `status: superseded` + `superseded_by: FM-3.7`
- `docs/smart-memory/stories/BACKLOG.md` — FM-3.7 atualizado para `done`

## QA Results
<!-- QA preenche — anti-recorrência Story 1.1: nunca vazio em status done. -->
