---
title: "MC-1.4: Validar visualização do curso pelo aluno (smoke E2E)"
type: story
status: backlog
epic: MC
complexity: S
agent: sites-qa
created: 2026-05-17
tags: [story, mentoria-claude-code, qa, smoke, e2e]
checklist: GO
related:
  - "[[MC-1.2-popular-curso-mentoria-claude-code-supabase]]"
  - "[[MC-1.3-integrar-links-vimeo-aulas-mentoria]]"
  - "[[done/F8.7-smoke-test-pre-lancamento]]"
---

# MC-1.4: Validar visualização do curso pelo aluno (smoke E2E)

## Objetivo

Veredicto formal **PASS / CONCERNS / FAIL** sobre a entrega do curso "Mentoria Claude Code" do ponto de vista do aluno real. Smoke end-to-end. **Anti-recorrência Story 1.1**: este veredicto não pode ficar vazio em `QA Results`.

## Acceptance Criteria

- [ ] **AC1 (Acesso autorizado):** aluno com `cohort_members.status = ACTIVE` na cohort decidida em MC-1.1 acessa `/academy/curso/mentoria-claude-code` (ou slug decidido) e vê:
  - Título do curso correto
  - Descrição renderizada
  - Todos os módulos populados, em ordem
  - Cada módulo expansível, lessons em ordem
- [ ] **AC2 (Aula com vídeo):** aluno clica em 1 aula que tem `video_id` Vimeo. Verifica:
  - VideoPlayer renderiza
  - Iframe está dentro do container 16:9 sem corte (regressão FAA-1.1/1.4)
  - Vídeo carrega e dá play
  - `timeupdate` é emitido (verificado via DevTools Network → request a `progress` action OU via logging do server)
- [ ] **AC3 (Conteúdo das abas):** abas `Sobre`, `Resumo`, `Transcrição`, `Materiais`, `Comentários` aparecem na quantidade certa:
  - Abas com conteúdo aparecem.
  - Abas sem conteúdo somem (regressão Epic AV-3.4).
  - Markdown renderizado **não exibe raw** (regressão FAA-1.3).
- [ ] **AC4 (Materiais de módulo):** se a MC-1.1 decidiu popular `module_materials` (PDFs), aluno vê o PDF na página do curso sob o módulo correspondente. Click no PDF → abre signed URL em nova aba (regressão FM-2.1).
- [ ] **AC5 (Aluno SEM acesso):** outra conta de aluno **sem** matrícula ativa na cohort que libera este curso acessa `/academy/curso/mentoria-claude-code/aula/[primeira-aula]`:
  - Vê `<LockedContent>` com CTA correto para a cohort.
  - **NÃO** vê o `video_id` no HTML server-rendered (verificar via `view-source:`).
- [ ] **AC6 (Navegação prev/next):** dentro da aula, botões prev/next funcionam cross-module dentro dos módulos acessíveis. Última aula → não tem next. Primeira → não tem prev.
- [ ] **AC7 (Mark complete + sidebar):** aluno completa 1 aula (95% watched OU manual). Sidebar reflete progresso (`completedCount`) sem F5.
- [ ] **AC8 (Mobile):** smoke visual em iPhone real OU DevTools 390x844:
  - Drawer mobile renderiza.
  - Player não estoura viewport.
  - Abas scrolláveis horizontal se overflow.
- [ ] **AC9 (Veredicto formal):** preencher seção "QA Results" abaixo com:
  - **Status:** `PASS` / `CONCERNS` / `FAIL`
  - **Evidência reproduzível:** passos numerados de cada AC validado + screenshot ou texto do `view-source:` quando aplicável.
  - **Bugs encontrados:** lista P0/P1/P2 com repro steps + fix sugerido. P0 bloqueia publicar; P1 pode virar follow-up com OK do PO.
  - **Aceitação pragmática:** se algum AC for relaxado, assinatura do João via PR ou nota explícita.
- [ ] **AC10 (Anti-recorrência):** **não mover esta story para `done/` com `QA Results` vazio**. Sites-architect valida antes do move (regra Zaelion herdada da FM-3.6 AC10).

## Escopo

**IN:**
- Smoke E2E do ponto de vista do aluno autorizado e não-autorizado.
- Validação visual mobile + desktop.
- Veredicto formal escrito.

**OUT:**
- Correção de bugs encontrados (vira follow-up ou volta pra dev se P0).
- Testes E2E automatizados via Playwright (debt já reconhecido em F8.5).
- Publicar (`courses.published = true`) — feito pelo João após GO.

## Contexto Técnico

**Conta de teste sem acesso:** se não existir, sites-data cria uma `profile` de teste sem `cohort_members.status = ACTIVE`. Documentar credenciais no QA Results.

**View-source check:** o `video_id` só pode aparecer no HTML server-rendered quando `has_access` retorna `true`. Em `view-source:` da aula com aluno sem acesso, **NÃO pode ter** o número Vimeo. Critério de segurança herdado da F9.16.

**Aulas v2 (regressões a observar):**
- Vimeo aspect ratio (FAA-1.1, FAA-1.4)
- Comments live update com `useOptimistic` (FAA-1.2)
- Markdown render fallback (FAA-1.3)
- Materiais nova aba (FM-2.1)
- 5 abas que escondem vazias (AV-3.4)
- Like/Dislike (AV-3.5)
- Nav prev/next no topo (AV-3.6)

## Definition of Done

- `QA Results` preenchido com status + evidência + bugs.
- Sites-architect lê e libera move para `done/`.
- Se PASS: João autorizado a setar `courses.published = true`.

## QA Results

<!-- OBRIGATÓRIO preencher antes de mover para done — regra inquebrável anti-recorrência Story 1.1 -->
