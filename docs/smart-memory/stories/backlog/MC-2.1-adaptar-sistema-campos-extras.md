---
title: "MC-2.1: Adaptar sistema academy para campos extras do conteúdo (se necessário)"
type: story
status: backlog
epic: MC
complexity: M
agent: sites-architect + sites-data
created: 2026-05-17
tags: [story, mentoria-claude-code, schema, adapter, contingency]
checklist: CONDITIONAL_GO
related:
  - "[[MC-1.1-mapear-campos-treinamento-supabase]]"
  - "[[../../decisions/ADR-001-plataforma-cursos-stack]]"
---

# MC-2.1: Adaptar sistema academy para campos extras do conteúdo (se necessário)

## Objetivo

**Story contingente:** só vira `active` se a MC-1.1 (mapeamento) identificar **gap real** entre os campos do conteúdo da Mentoria e o schema atual de `lessons` / `modules` / `materials`. Caso contrário, `delete` com nota.

## Acceptance Criteria

- [ ] **AC1 (Gap report):** sites-architect produz lista de campos faltantes no schema, cada um com:
  - Nome do campo
  - Tipo proposto (text, jsonb, enum, etc.)
  - Tabela alvo
  - Justificativa concreta (qual conteúdo da Mentoria precisa dele)
  - Alternativa **sem schema change** considerada (ex.: usar `content` MDX para tudo)
- [ ] **AC2 (ADR-003 opcional):** se houver schema change envolvendo RLS ou múltiplas tabelas, abrir `ADR-003-mentoria-claude-code-schema-extension.md` com trade-offs. Padrão herdado da ADR-002.
- [ ] **AC3 (Migration + tipos):** migration aplica os campos, tipos regenerados, `pnpm typecheck` PASS.
- [ ] **AC4 (Backwards-compat):** todos os campos novos são `NULL`-able ou têm default seguro. Conteúdo existente (cursos `fundamentos-claude-code` e `curso-online-padrao`) **não regride**.
- [ ] **AC5 (RLS preservada):** se o campo afeta `lessons` ou `materials`, RLS confirma que aluno sem acesso continua sem ver. **Defesa em profundidade.**

## Escopo

**IN:**
- Gap analysis com decisão "schema-change" vs "usar MDX em content".
- Eventual ADR-003 + migration + tipos.

**OUT:**
- Refator amplo do schema academy.
- Substituição de provider (Stripe, Vimeo).
- Mudanças em outros cursos.

## Contexto Técnico

**Hipótese (baseline):** o schema atual cobre Mentoria Claude Code **sem** schema change, porque:
- `lessons.content` (MDX) é flexível o suficiente para qualquer corpo.
- `lessons.summary` + `lessons.transcript` (Epic AV-3) já existem.
- `module_materials` cobre manuais PDF e LINKs.
- `lessons.kind` cobre `VIDEO | LIVE | IN_PERSON | CODE | READING`.

**Possíveis gaps a investigar:**
- Suporte a "encontros ao vivo" da mentoria → já há `live_sessions` (Epic F9.6).
- Trilhas de prompts (`prompts-modulo-5-claude-design.md`) → pode ir em `materials.kind = LINK` ou ser parte do `content` MDX. Decisão da MC-1.1.

## Condicional GO

Esta story passa de `backlog` para `active` apenas se MC-1.1 (AC1-AC4) demonstrar gap real. Caso contrário, sites-architect marca status `deleted` com justificativa "no schema change needed".

## Definition of Done

- Decisão registrada: implementada OU deletada com justificativa.

## QA Results

<!-- só se a story for ativada -->
