---
title: "Story AV-3.7: Smoke E2E final Epic Aulas v2"
type: story
status: backlog
epic: AV
complexity: S
agent: sites-qa
created: 2026-05-16
updated: 2026-05-16
tags: [story, qa, smoke, e2e, aulas-v2]
related:
  - "[[AV-3.1-migration-aulas-v2]]"
  - "[[AV-3.2-template-md-elegante]]"
  - "[[AV-3.3-admin-3-campos-toggle]]"
  - "[[AV-3.4-aluno-5-abas]]"
  - "[[AV-3.5-aluno-like-dislike]]"
  - "[[AV-3.6-nav-prev-next-topo]]"
---

# Story AV-3.7: Smoke E2E final Epic Aulas v2

## Objetivo
Smoke test manual end-to-end da experiência completa Aulas v2 antes do merge da branch `feat-aulas-v2` em `main`. Valida o fluxo admin (criar/editar) → aluno (consumir) cobrindo todas as 6 stories anteriores. Veredicto GO/NO-GO de sites-qa.

## Acceptance Criteria

- [ ] **AC1 (Migration aplicada e tipos regenerados)**: Confirmar que `lessons.summary`, `lessons.transcript`, `lesson_reactions` existem em PROD via Supabase MCP `list_tables`. `database.types.ts` reflete os campos. Sem erros de TS no `pnpm build`.

- [ ] **AC2 (Template populou aulas vazias)**: Listar aulas com `description = $template_inicial` — esperado: ~13 (conforme contagem do dry-run da AV-3.1). Abrir 2-3 dessas aulas no aluno → ver renderização do template em "Sobre a aula".

- [ ] **AC3 (Admin: 3 campos com toggle funcional)**:
  1. Logar como admin → editor de aula.
  2. Editar `description`, `summary`, `transcript` com markdown válido.
  3. Toggle "Visualizar" em cada um → renderização ok (headings, bullets, bold, code).
  4. Toggle "Editar" → volta o textarea com o conteúdo.
  5. Salvar → reload → valores persistem.

- [ ] **AC4 (Aluno: 5 abas funcionando — vazias somem)**:
  1. Aluno abre aula com **todas as abas populadas** → 5 abas: Sobre, Resumo, Transcrição, Materiais, Comentários.
  2. Aluno abre aula com **só `description`** → 2 abas (Sobre, Comentários).
  3. Aluno abre aula com `description` + `summary` (sem materials, sem transcript) → 3 abas.
  4. Click em cada aba → conteúdo renderiza corretamente.

- [ ] **AC5 (Like/Dislike funcionando)**:
  1. Aluno A like → likes=1.
  2. Aluno A like de novo → likes=0 (toggle off).
  3. Aluno A like, depois dislike → likes=0, dislikes=1 (troca).
  4. Aluno B em outra sessão → vê count atualizado após reload.
  5. Optimistic update: clicar e ver count mudar imediatamente, sem flash de loading.
  6. RLS: tentar via SQL editor `INSERT INTO lesson_reactions` com user_id de outro user → bloqueado.

- [ ] **AC6 (Nav prev/next no topo)**:
  1. Aula do meio do curso → nav compacta no topo, NavCards do rodapé removidos.
  2. Click em "Próxima aula" → navega.
  3. Primeira/última aula → estados disabled corretos.
  4. Tooltip mostra título da aula vizinha em hover.
  5. Mobile 375px → botões cabem lado a lado.

- [ ] **AC7 (Sem regressão em features existentes)**:
  1. Comments funciona (criar, editar, excluir, optimistic).
  2. Materials funciona (download abre nova aba — Story FM-2.1).
  3. MarkComplete funciona (toggle persiste, count na sidebar atualiza).
  4. VideoPlayer Vimeo/YouTube renderiza com aspect ratio correto (Story FAA-1.1).
  5. has_access RPC continua bloqueando aulas de cohorts não-incluídos.

- [ ] **AC8 (Acessibilidade básica)**:
  - Tab navigation pelos elementos novos (3 toggles admin, 2 botões reaction, 2 botões nav) sem perder ordem lógica.
  - aria-pressed correto nos toggles.
  - aria-label correto nos botões reaction.
  - Foco visível em todos os botões novos.
  - Sem erros no axe-core / Lighthouse a11y > 95.

- [ ] **AC9 (Performance)**:
  - Page load (LCP) da aula não degrada vs. baseline pré-Epic 3 (margem ±10%).
  - Query `lesson_reactions` não introduz N+1 (uma única query por page load).
  - `renderContent` para summary+transcript não quebra build size (Vercel build passa).

- [ ] **AC10 (Veredicto GO/NO-GO)**: sites-qa documenta resultados em `docs/smart-memory/agents/qa/results.md` com:
  - Bugs P0 encontrados (bloqueiam merge).
  - Bugs P1 (criar story de cleanup).
  - Confirmação ou rejeição do go-live.

## Escopo

**IN:**
- Smoke manual cobrindo as 6 stories anteriores.
- Documentação dos resultados em `agents/qa/results.md`.
- Criação de stories de bug se necessário (numeração `AV-3.x.bug-N.md`).

**OUT:**
- Testes automatizados Playwright (escopo de F8.5/F9.x QA epic — separado).
- Performance profile detalhado.
- Pen-test de RLS (escopo de F9.x hardening).
- Review de código (sites-qa não revisa código, valida UX/comportamento).

## Contexto Técnico

**Pré-condições:**
- Branch `feat-aulas-v2` com todas as 6 stories anteriores merged em `feat-aulas-v2`.
- Migration AV-3.1 aplicada em PROD (Bythelion confirma via Supabase).
- `pnpm build` passando localmente sem erros.

**Cuidados:**
- Branch é `feat-aulas-v2`, **NÃO main**. Smoke roda em deploy preview Vercel (auto-criado pela branch).
- Se algo vazar pra prod (sem aprovação do lead), reverter imediatamente.

**Coordenação:**
- sites-qa coordena.
- Após GO, lead aprova merge `feat-aulas-v2 → main` e sites-devops faz o push (não sites-qa, não architect).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-qa |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-aulas-v2 |

## File List
<!-- QA preenche -->

## QA Results
<!-- QA preenche -->
