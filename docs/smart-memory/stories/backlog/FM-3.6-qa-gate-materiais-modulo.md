---
title: "FM-3.6: QA gate adversarial — materiais por módulo end-to-end"
type: story
status: backlog
epic: FM
complexity: M
agent: sites-qa
created: 2026-05-17
tags: [story, qa, gate, materials, modules, adversarial]
checklist: GO
related:
  - "[[../../decisions/ADR-002-materiais-por-modulo-schema]]"
  - "[[FM-3.2-migration-module-materials]]"
  - "[[FM-3.3-server-actions-module-materials]]"
  - "[[FM-3.4-admin-module-editor-client]]"
  - "[[FM-3.5-student-module-materials-listing]]"
  - "[[done/1.1-fix-vimeo-aspect-ratio]]"
---

# FM-3.6: QA gate adversarial — materiais por módulo end-to-end

## Objetivo

Veredicto formal **GO / NO-GO** sobre a Epic FM (materiais por módulo) como conjunto. Adversarial: tentar quebrar antes de liberar. Cobertura: schema (FM-3.2), actions (FM-3.3), UI admin (FM-3.4), UI student (FM-3.5). Critério rígido herdado da Story 1.1: **QA Results NÃO PODE ficar vazio**.

## Acceptance Criteria

- [ ] **AC1 (Smoke E2E feliz)**: usando 2 contas reais (1 admin, 1 aluno com matrícula ACTIVE no curso de teste), executar fluxo:
  - admin acessa `/academy/admin/cursos/[id]/modulos/[id]` → renderiza
  - admin sobe 1 PDF → aparece na lista sem F5
  - admin sobe 1 IMAGE → aparece
  - admin sobe 1 ZIP → aparece
  - admin adiciona 1 LINK `https://example.com` com título "Slides" → aparece com `LINK` + URL truncada
  - aluno acessa página do curso → vê todos os 4 materiais sob o módulo
  - aluno clica PDF → abre em nova aba (anti-recorrência 2.1)
  - aluno clica LINK → abre `example.com` em nova aba
  - admin deleta o LINK → some da UI admin + aluno (refresh) não vê mais
  - admin deleta o PDF → some + arquivo realmente apagado do bucket `materials/modules/{id}/` (verificar via dashboard Supabase ou `supabase storage ls`)
- [ ] **AC2 (Adversarial — RLS)**: criar uma conta de aluno **SEM** matrícula no curso. Tentar:
  - acessar página pública do curso → não vê materiais
  - tentar query direta via DevTools/Supabase JS com a sessão dele em `module_materials where module_id = <id>` → retorna 0 rows (RLS bloqueou). Documentar a evidência.
  - tentar GET direto da URL do bucket sem signed URL → 403 (bucket privado).
- [ ] **AC3 (Adversarial — admin escape)**: tentar do client com sessão de aluno normal: insert/update/delete via Supabase JS em `module_materials` → recebe erro de policy (RLS bloqueou). Documentar a evidência (mensagem de erro do PostgREST).
- [ ] **AC4 (Adversarial — corrupted state)**:
  - upload com arquivo de 0 bytes → comportamento esperado: aceita (sem validação de tamanho mínimo declarada) **OU** rejeita com mensagem clara. Documentar qual.
  - upload com nome de arquivo com caracteres especiais (`/`, `\`, espaços, unicode) → não quebra path nem storage. Validar que arquivo realmente sobe e pode ser baixado depois.
  - delete de material cujo arquivo no bucket **já foi deletado externamente** (simular via dashboard) → action ainda DELETA a row (não trava no `storage.remove` — garantia da FM-3.3 AC2 "tolerância a arquivo ausente").
  - add link com URL inválida (`"javascript:alert(1)"`, string vazia, texto qualquer) → rejeitado pelo guard da FM-3.3 AC3.
- [ ] **AC5 (Adversarial — concurrency)**: 2 abas admin simultâneas:
  - delete o mesmo material em ambas → uma sucede, outra recebe erro mas não corrompe state da UI (rollback do snapshot funciona — anti-recorrência 2.2)
- [ ] **AC6 (Performance — N+1 check)**: curso de teste com **3+ módulos** e 2 materiais cada. Página pública do curso para aluno deve fazer **1 query** (ou no máximo 2 — uma agregada) para os materiais. Documentar via Network tab ou Supabase Studio logs.
- [ ] **AC7 (Regressão — materiais de aula intactos)**: validar que a Story 2.2 (gestão de materiais por aula) **continua funcionando** após as mudanças desta epic:
  - editor de aula admin lista materiais corretamente
  - upload de material de aula funciona
  - delete de material de aula funciona
  - aluno vê materiais de aula como antes
  - Nenhuma policy de `materials` foi alterada (verificar via grep + diff de migration — defesa da FM-3.2 AC12)
- [ ] **AC8 (Typecheck + build)**: `pnpm typecheck` e `pnpm build` PASS após todas as stories FM-3.2 a FM-3.5 mergeadas localmente.
- [ ] **AC9 (Veredicto formal preenchido — anti-recorrência Story 1.1)**: este arquivo deve ter a seção **"QA Results"** preenchida com:
  - **Status:** `PASS` / `CONCERNS` / `FAIL`
  - **Evidência reproduzível:** lista numerada de comandos / clicks / screenshots para cada AC validado
  - **Bugs encontrados** (se houver): cada um com severidade (P0/P1/P2), repro steps, fix sugerido. P0 BLOQUEIA o GO; P1 pode virar follow-up com aprovação explícita do PO
  - **Aceitação pragmática:** se algum AC for relaxado (ex.: smoke parcial por limitação de ambiente), exige assinatura do PO João no PR com `Reviewed-by: João Guirunas <joao@growthsales.ai>` ou equivalente registrado
- [ ] **AC10 (NÃO marcar `done` com QA Results vazio)**: regra inquebrável herdada do gap-raiz da Story 1.1 (arquivo `stories/done/1.1-fix-vimeo-aspect-ratio.md` tinha `checklist: GO` mas QA Results VAZIO — fechou sem gate exercido). Esta story só pode ir para `done/` quando AC9 estiver preenchido. **sites-architect (Zaelion)** valida via leitura antes de mover.

## Escopo

**IN:**
- Validação end-to-end das 4 stories (FM-3.2 a FM-3.5)
- Adversarial: RLS, admin escape, corrupted state, concurrency, perf
- Regressão sobre Story 2.2 (materiais de aula)
- Veredicto formal escrito em "QA Results" desta story
- Indicar P0/P1/P2 separadamente

**OUT:**
- Correção de bugs (vira follow-up se P1, vira blocker e devolve pra dev se P0)
- Push pra prod (sites-devops faz após GO + autorização João)
- Cobertura de outras épicas

## Contexto Técnico

**Gap-raiz Story 1.1 (referência inquebrável):** o arquivo
`docs/smart-memory/stories/done/1.1-fix-vimeo-aspect-ratio.md` foi marcado
`done` com `checklist: GO` mas o campo "QA Results" ficou **vazio** — gate
formal nunca foi exercido. Resultado: bug regrediu para vídeos não-16:9
(originando a Story FAA-1.4). Esta Epic FM **não pode repetir esse padrão**.
A `AC9` e `AC10` desta story formalizam a regra.

**Critério para PASS:**
- AC1, AC2, AC3, AC6, AC7, AC8 sem P0
- AC4 e AC5 com no máximo CONCERNS (P1/P2 ok)
- AC9 obrigatoriamente preenchido com evidência reproduzível

**Critério para FAIL:**
- Qualquer P0 (vazamento de dados via RLS, build quebrado, regressão em Story 2.2)
- AC9 vazio ou genérico

## Coordenação

- **Bloqueado por:** FM-3.2, FM-3.3, FM-3.4, FM-3.5 — todas precisam estar mergeadas localmente em uma branch comum
- **Bloqueia:** release (sites-devops só pusha após GO + autorização João)
- **Coordenação direta:** após veredicto, mensagem ao lead com `PASS`/`CONCERNS`/`FAIL` + link para a seção "QA Results" preenchida

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-qa (Axilun) |
| Iniciado | _a preencher_ |
| Concluído | _a preencher_ |
| Branch validada | _a definir_ |

## QA Results
<!--
ATENÇÃO: este campo NÃO pode ficar vazio quando story for movida para done/.
Preencher com:

## Status
PASS | CONCERNS | FAIL

## Evidência
1. AC1 — descrever
2. AC2 — descrever
...

## Bugs encontrados
- [P0|P1|P2] Título do bug — repro steps — fix sugerido

## Decisão final
Texto.

Aceitação pragmática (se aplicável):
- AC_X relaxado por motivo Y — aprovado por João Guirunas em DD/MM/AAAA via canal Z
-->
