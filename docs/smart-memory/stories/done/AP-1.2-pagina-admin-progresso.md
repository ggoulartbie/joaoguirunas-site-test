---
title: "AP-1.2: Página admin /admin/progresso — tabela de alunos (expansível) + seção por aula"
type: story
status: backlog
epic: AP
complexity: M
agent: sites-dev-alpha
created: 2026-05-21
updated: 2026-05-21
tags: [story, admin, progress, ui, dashboard]
checklist: GO
related:
  - "[[AP-1.1-server-actions-progresso-admin]]"
  - "[[AP-1.3-filtros-progresso-admin]]"
---

# AP-1.2: Página admin `/admin/progresso` — tabela de alunos (expansível) + seção por aula

## Objetivo

Entregar a página admin de acompanhamento de progresso solicitada pelo PO: tabela com todos os alunos mostrando % de progresso por curso (linha expansível listando as aulas concluídas) **+** seção secundária "por aula" mostrando, para cada aula, quantos alunos já concluíram. Consome as 3 actions de [[AP-1.1-server-actions-progresso-admin|AP-1.1]].

## Acceptance Criteria

- [ ] **AC1 — Rota:** `src/app/(academy)/academy/(admin)/admin/progresso/page.tsx` com `export const dynamic = 'force-dynamic'` (toca `supabaseAdmin` no build — padrão obrigatório do projeto, ver project memory `supabase_admin_proxy_build`).
- [ ] **AC2 — Gate:** `await requireAdmin()` antes de qualquer query. Sem fallback: usuário não-admin é redirecionado pela função de helper (paridade `admin/usuarios/page.tsx:11`).
- [ ] **AC3 — Header visual:** segue o padrão das demais páginas admin — breadcrumb `Admin / Progresso` em font-mono uppercase, h1 "Progresso" em `Fraunces` italic light, subtítulo descritivo (mesma estrutura de `admin/usuarios/page.tsx:70-77`).
- [ ] **AC4 — Tabela "Alunos × Cursos" (componente cliente `StudentsProgressTable.tsx`):**
  - Recebe `initialData: StudentProgressRow[]` de AP-1.1
  - Colunas: Avatar+Nome / Email / Turma(s) / por curso uma coluna com `{completed}/{total}` + barra de progresso (% numérico ao lado)
  - Ordenação clicável por nome, email, e por curso (% desc)
  - Cada linha tem ícone chevron — clicar expande a linha mostrando, **lazy-loaded** via `getStudentLessonsBreakdown(userId, courseId)`, a lista das aulas concluídas daquele aluno naquele curso. Mostrar módulo + título + data de conclusão (`completed_at` formatada `dd/MM/yyyy HH:mm`)
  - Loading skeleton enquanto carrega o breakdown
  - Estado vazio: mensagem "Aluno ainda não concluiu nenhuma aula deste curso"
- [ ] **AC5 — Seção "Por aula" (componente cliente `LessonsCompletionList.tsx`):**
  - Abaixo da tabela principal
  - Agrupa as aulas por **curso → módulo → aula**
  - Para cada aula: título + `{completedCount}/{eligibleCount}` + barra de progresso percentual
  - Aulas ordenadas dentro do módulo pela ordem natural do curso (assumir `lessons.position` ou `order_index` se existir; senão, ordem alfabética estável)
  - Linha clicável navega para a página de admin da aula em nova aba (se rota existir; senão, no-op silencioso — confirmar com lead antes de implementar)
- [ ] **AC6 — Busca textual:** input no topo filtra por nome ou email do aluno (debounced 200ms, client-side sobre `initialData`). Não afeta a seção "por aula".
- [ ] **AC7 — Indicação de turma:** quando um aluno tem múltiplas matrículas, mostrar todas as turmas separadas por vírgula (até 2; "+N" se mais).
- [ ] **AC8 — Performance UI:** com 50 alunos × 3 cursos visíveis, render inicial completa em **< 2s** medido em dev local. Tabela usa virtualização **somente se** > 200 linhas (não obrigatório para esta entrega — abrir follow-up se necessário).
- [ ] **AC9 — Acessibilidade básica:**
  - Tabela é `<table>` semântica com `<th scope="col">`
  - Botões de expansão têm `aria-expanded` e `aria-controls`
  - Barras de progresso têm `role="progressbar"` + `aria-valuenow`/`aria-valuemin`/`aria-valuemax`
  - Contraste WCAG AA respeitado nos tokens existentes
- [ ] **AC10 — Estados vazios:**
  - Nenhum aluno encontrado: "Nenhum aluno com matrícula ativa"
  - Filtro de busca sem resultado: "Nenhum aluno corresponde ao termo buscado"
  - Sem aulas no sistema: seção "por aula" oculta com mensagem
- [ ] **AC11 — Link no menu admin:** adicionar entrada "Progresso" no menu lateral admin (`AdminNav.tsx` ou equivalente — localizar via grep no link de "Usuários"). Posição: entre "Turmas" e "Pagamentos" (pareceu o lugar mais natural, ajustar se lead preferir outro).
- [ ] **AC12 — Validação manual:** com seed real do dev local (pelo menos 2 alunos + 1 curso com aulas), validar visualmente: tabela carrega, expansão funciona, seção por aula bate com o esperado, busca filtra, links funcionam.
- [ ] **AC13 — Typecheck + lint + build:** `pnpm typecheck`, `pnpm lint` e `pnpm build` PASS.

## Escopo

**IN:**
- Rota `/academy/admin/progresso` (Server Component)
- Componentes cliente: `StudentsProgressTable.tsx`, `LessonsCompletionList.tsx`
- Server Action wrapper para o lazy load do breakdown por aluno (chama `getStudentLessonsBreakdown` da AP-1.1)
- Entrada no menu admin
- Busca textual client-side
- Ordenação client-side
- Barras de progresso visuais

**OUT:**
- Filtros estruturados (curso, turma, módulo) — AP-1.3 opcional
- Export CSV / PDF / Excel
- Gráficos / charts agregados (linhas, pizza) — não pedido pelo PO
- Notificações automáticas / lembretes
- Edição/correção manual de progresso pelo admin
- Bulk actions
- Indicador realtime de quem está assistindo agora
- Mobile-first dedicado (responsivo razoável, mas dashboard admin é desktop-primary — paridade com /admin/usuarios)

## Contexto Técnico

**Stack:**
- Next.js 16 (App Router) — Server Components para a page, Client Components (`'use client'`) para tabela/lista
- Tailwind v4 + tokens do KV (variáveis `--bone`, `--bone-mute`, `--hairline`, `--type-display`)
- Sem libs novas: usar `useState` + `useTransition` + Server Actions (sem TanStack Query)

**Padrão de referência:**
- `src/app/(academy)/academy/(admin)/admin/usuarios/page.tsx` — Server Component que fetcha tudo e passa para `UsersClient`
- `src/app/(academy)/academy/(admin)/admin/usuarios/UsersClient.tsx` — referência para tabela + modal + lazy actions
- `src/app/(academy)/academy/(admin)/admin/RevenueChart.tsx` — referência para componente client visual

**Pattern de lazy load do breakdown:**
- Click no chevron → `useTransition` envolvendo chamada da action
- Cache local por `userId+courseId` no state do componente (evita re-fetch ao colapsar/expandir)
- Skeleton durante `isPending`

**Decisão de não usar tabs:** página única com a tabela em cima e a seção "por aula" embaixo. PO pediu as duas visões na mesma tela; tabs adicionariam clique sem ganho.

**Decisão de não usar virtualização agora:** universo realista (50–200 alunos) cabe em DOM nativo com tailwind. Virtualização vira AP-1.4 se necessário.

## Coordenação

- **Bloqueado por:** [[AP-1.1-server-actions-progresso-admin|AP-1.1]] — sem as actions, não há dados.
- **Bloqueia:** nada (AP-1.3 é independente, pode ser feita depois e enxertar filtros sem reescrever esta).
- **Reviewer sugerido:** sites-qa para smoke E2E adversarial (acesso de não-admin → redirect; supabaseAdmin não vazado para o client).

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
