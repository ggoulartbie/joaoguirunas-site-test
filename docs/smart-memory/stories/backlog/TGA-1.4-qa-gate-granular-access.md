---
title: "Story TGA-1.4: QA gate adversarial — controle granular de turma"
type: story
status: backlog
epic: TGA
complexity: M
agent: sites-qa
created: 2026-05-25
updated: 2026-05-25
tags: [story, qa, adversarial, cohorts, access-control, rls, regression]
related:
  - "[[../../decisions/ADR-turma-granular-access]]"
  - "[[TGA-1.1-migration-included-lesson-ids]]"
  - "[[TGA-1.2-admin-ui-lesson-selector]]"
  - "[[TGA-1.3-student-enforcement-included-lesson-ids]]"
---

# Story TGA-1.4: QA gate adversarial — controle granular de turma

## Objetivo

Validar end-to-end a Epic TGA (controle de acesso por aula em turmas), com veredicto formal GO/NO-GO. Testa o caminho completo: admin configura → DB persiste → RPC `has_access` autoriza → student pages exibem/escondem corretamente → não há leak de `video_id`.

## Acceptance Criteria

- [ ] **AC1 — Setup de teste:** uma turma de teste com 1 curso, 3 módulos × 3 aulas cada (9 aulas total) é criada via admin (ou seed dedicado). Variantes preparadas:
  - **Variant L (Legacy):** `included_module_ids = '{}'`, `included_lesson_ids = '{}'` → todas 9 aulas acessíveis.
  - **Variant M (só módulos):** `included_module_ids = '{mod1, mod2}'`, `included_lesson_ids = '{}'` → 6 aulas acessíveis.
  - **Variant ML (módulos + aulas):** `included_module_ids = '{mod1, mod2}'`, `included_lesson_ids = '{l1.1, l1.2, l2.1}'` → 3 aulas acessíveis.
  - **Variant L-only (inconsistente):** `included_module_ids = '{mod1}'`, `included_lesson_ids = '{l2.1}'` (aula de módulo NÃO incluído) → 0 aulas acessíveis (módulo bloqueia).
- [ ] **AC2 — RPC `has_access` retorna corretamente em cada variant:** rodar `select public.has_access('{userId}', '{lessonId}')` para cada uma das 9 aulas em cada variant. Resultado bate com a tabela do AC1. Total: 36 invocações, 36 resultados esperados.
- [ ] **AC3 — Defense in depth da aplicação:** para Variant ML, fazer login como aluno, abrir `/dashboard`, `/meus-cursos`, `/curso/{slug}`:
  - Lista de aulas mostra apenas {l1.1, l1.2, l2.1}.
  - Contadores de "X de Y aulas concluídas" refletem 3 aulas no total.
  - Tentar URL direta `/curso/{slug}/aula/{l1.3-slug}` → renderiza `<LockedContent />`, body NÃO contém `video_id` (verificar com curl + grep).
- [ ] **AC4 — Variant L-only (inconsistente):** aluno na variant L-only → todas as listagens vazias (nenhuma aula visível). `/curso/{slug}/aula/{l2.1-slug}` → bloqueado pelo `<LockedContent />`, pois módulo bloqueia primeiro (invariante ADR-003).
- [ ] **AC5 — Admin override preserved:** admin (role=ADMIN) sem matrícula em nenhuma turma com a aula restrita acessa `/curso/{slug}/aula/{l1.3-slug}` da Variant ML e **vê o conteúdo normalmente**. RPC `has_access` retorna `true`.
- [ ] **AC6 — Legacy regression:** uma turma de produção pré-existente (real ou simulada com `included_lesson_ids = '{}'`) renderiza para um aluno matriculado **exatamente** o mesmo conteúdo que renderizava antes da migration. Diff visual zero entre antes e depois da migration. Verificar contagem total de aulas/módulos e existência de aulas individuais nas listagens.
- [ ] **AC7 — Admin UI persistência:** abrir uma turma na UI admin, marcar/desmarcar aulas, salvar, recarregar — estado preservado byte-perfect. Marcar todas as aulas de um módulo (= equivalente a "sem restrição") salva como `included_lesson_ids = []`. Verificar no DB com SELECT.
- [ ] **AC8 — Admin UI coerência módulo/aula:** desmarcar um módulo (TGA-1.2 AC4) limpa as aulas daquele módulo automaticamente. Verificar via DB que nenhuma aula órfã ficou em `included_lesson_ids` para um módulo não incluído em `included_module_ids`.
- [ ] **AC9 — Performance smoke:** carregar `/dashboard` e `/curso/{slug}` para aluno com 3 cohorts ativas, total ~30 lessons. Tempo de resposta server-side ≤ 250ms (typical) e ≤ 600ms (P95). Sem N+1 visível em logs. Helper `filterLessonsByCohortAccess` (TGA-1.3) é puro JS — overhead < 5ms.
- [ ] **AC10 — Storage / materials não regridem:** materiais de aula (`materials`) continuam acessíveis para aulas autorizadas. Materiais de módulo (`module_materials`) gated por `has_module_access` continuam funcionando idênticos (ADR-003 confirma que `has_module_access` não foi tocada).
- [ ] **AC11 — Build & tests:** `pnpm typecheck`, `pnpm lint`, `pnpm build` passam. Se existir suite Playwright, smoke E2E adversarial passa (variant ML em particular).
- [ ] **AC12 — QA Results obrigatoriamente preenchido — anti-recorrência Story 1.1:** o campo `QA Results` desta story precisa conter evidência reproduzível (scripts, screenshots, logs do supabase) **antes** de mover qualquer story TGA para `done/`. Se algum AC falhar, listar com prioridade (P0/P1/P2). Lead decide aceitação ou retorno para fix.
- [ ] **AC13 — Veredicto formal:** documentar em `docs/smart-memory/agents/qa/verdict-epic-TGA.md` o veredicto GO / CONCERNS / NO-GO com checklist completo e referência aos arquivos tocados.

## Escopo

**IN:**
- Testes adversariais nas 4 variants de cohort (L, M, ML, L-only).
- Validação SQL direta do RPC `has_access` para todas as 36 combinações (9 aulas × 4 variants).
- Defense in depth checks nas listagens do aluno (dashboard, meus-cursos, curso/[slug]).
- Verificação de não-leak de `video_id` em aulas bloqueadas.
- Regressão de turma legacy (zero diff visual antes/depois).
- Verificação de persistência na UI admin.
- Performance smoke (timing server-side).
- Veredicto formal em `docs/smart-memory/agents/qa/verdict-epic-TGA.md`.

**OUT:**
- Implementação de fixes — apenas reportar concerns. Lead aprova retorno ou aceita.
- Load testing serio (esta epic não muda perfil de carga).
- Mudanças em código de produção.
- Penetration test full — gate adversarial é focado em RLS/access control, não em outras superfícies.
- Refactor de turmas existentes (problemas de dados são responsabilidade do PO).

## Contexto Técnico

**Bloqueado por:** [[TGA-1.1-migration-included-lesson-ids|TGA-1.1]], [[TGA-1.2-admin-ui-lesson-selector|TGA-1.2]], [[TGA-1.3-student-enforcement-included-lesson-ids|TGA-1.3]] (todas precisam estar em `feat-turma-granular-access` ANTES desta story rodar).

**Ambiente:** branch `feat-turma-granular-access` apontando para Supabase local com a migration TGA-1.1 aplicada. Se for em staging, lead autoriza.

**Setup de dados (sugestão de seed para QA):**

```sql
-- Curso de teste
insert into public.courses (id, slug, title, published, deleted_at)
values ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'tga-test-course', 'TGA Test Course', true, null);

-- 3 módulos
insert into public.modules (id, course_id, title, slug, sort_order, deleted_at) values
  ('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mod 1', 'mod-1', 1, null),
  ('22222222-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mod 2', 'mod-2', 2, null),
  ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Mod 3', 'mod-3', 3, null);

-- 3 aulas por módulo (9 total). Padrão de ID: lXY = lesson módulo X aula Y.
-- ... (seed completo no arquivo de QA, omitido aqui por brevidade)

-- 4 turmas, 1 por variant. Aluno único.
-- Variant L: cohort_courses com '{}' '{}'
-- Variant M: cohort_courses com '{mod1, mod2}' '{}'
-- Variant ML: cohort_courses com '{mod1, mod2}' '{l1.1, l1.2, l2.1}'
-- Variant L-only: cohort_courses com '{mod1}' '{l2.1}' (l2.1 NÃO está em mod1 → 0 acesso)
```

**Caminhos auditados (referência rápida):**

| Caminho | Camada | Validação |
|---|---|---|
| `has_access` RPC | DB | AC2 |
| `/dashboard` listagem | App (server) | AC3, AC4 |
| `/meus-cursos` listagem | App (server) | AC3 |
| `/curso/{slug}` listagem + counts | App (server) | AC3, AC4, AC6 |
| `/curso/{slug}/aula/{lesson-slug}` player | App (server, RPC) | AC3, AC4, AC5 |
| CohortForm save | App (server action) | AC7, AC8 |

**Anti-recorrência:**
- **Story 1.1 cleanup**: QA Results foi preenchido fora do padrão por bug histórico. AC12 obriga preenchimento antes de mover para `done`.
- **Risco RLS crítico (ADR-001)**: gate adversarial específico em AC2 cobre TODAS as variants no RPC, não só "feliz path".
- **Variant L-only** (módulo bloqueia mesmo com aula listada) é o caso mais sutil — testar explicitamente.
- **Veredicto formal arquivado** em `docs/smart-memory/agents/qa/verdict-epic-TGA.md` segue o padrão de epics anteriores (Aulas v2, FM-3, F9.12).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-qa |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-turma-granular-access (pull, não toca) |

## File List
<!-- QA preenche ao concluir -->
- `docs/smart-memory/agents/qa/verdict-epic-TGA.md` (NEW — veredicto formal)
- (opcional) `docs/smart-memory/agents/qa/tga-seed.sql` — seed SQL reusável

## QA Results
<!-- QA preenche aqui o veredicto resumido + link para o arquivo completo em /agents/qa/ -->
