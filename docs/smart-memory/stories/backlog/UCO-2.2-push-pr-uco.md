---
title: "Story UCO-2.2: Push + PR — /curso-online unificada"
type: story
status: backlog
epic: UCO
complexity: S
agent: sites-devops
created: 2026-05-29
updated: 2026-05-29
tags: [story, devops, curso-online, unificacao]
related:
  - "[[backlog/UCO-1.2-adaptar-componentes-curso-online]]"
  - "[[backlog/UCO-1.3-remover-paginas-obsoletas]]"
  - "[[backlog/UCO-1.4-atualizar-sitemap-links-internos]]"
  - "[[backlog/UCO-2.1-qa-gate-curso-online-unificado]]"
---

# Story UCO-2.2: Push + PR — /curso-online unificada

## Objetivo
Após PASS formal de UCO-2.1, commitar tudo, push para branch e abrir PR para `main` com checklist e link para o veredicto QA.

## Acceptance Criteria
- [ ] AC1: Pré-requisito: UCO-2.1 com PASS registrado em `docs/smart-memory/qa-reports/`.
- [ ] AC2: Branch `feat/uco-curso-online-unificado` criada a partir da `main`.
- [ ] AC3: Commit(s) atómicos por story: UCO-1.2, UCO-1.3, UCO-1.4 cada um em commit separado (ou squash com mensagem explícita).
- [ ] AC4: Pré-push checklist (sites-devops autoridade exclusiva sobre `git push`):
  - [ ] `pnpm build` PASS local
  - [ ] `pnpm lint` PASS local
  - [ ] `pnpm typecheck` PASS local (se script existir)
  - [ ] QA-PASS anexado ao PR
- [ ] AC5: PR aberto com título `feat(curso-online): unificar com /mentoria e remover LPs Em Breve`.
- [ ] AC6: PR body lista: secções espelhadas, secções removidas (Pré-Mentoria / Dia Presencial / Bônus / Encerramento), rotas apagadas (5), arquivos sitemap+nav actualizados, link para `docs/smart-memory/qa-reports/UCO-2.1-*.md`.
- [ ] AC7: PR marcado com label `epic:UCO` (criar label se necessário).
- [ ] AC8: Stories `UCO-1.1` a `UCO-2.1` movidas de `backlog/` para `done/` neste mesmo commit (ou commit subsequente em `chore(smart-memory):`).
- [ ] AC9: BACKLOG.md actualizado removendo a tabela do Epic UCO ou marcando todas como `done`.

## Escopo

**IN:**
- Branch + commit + push + PR.
- Movimentação das stories UCO de backlog → done.
- Update do BACKLOG.md.

**OUT:**
- Merge do PR — depende de aprovação humana / CI verde.
- Deploy / Vercel — automático via merge.
- Cleanup de cohorts no DB — fora de escopo.
- Comunicação ao cliente / changelog — fora de escopo (PO/marketing).

## Contexto Técnico

**Autoridades:**
- `sites-devops` é o único agente com permissão de `git push`. Outros agentes commitam local apenas.
- PR base: `main`.

**Comandos canônicos (sites-devops executa, não Zaelion):**
```bash
git checkout -b feat/uco-curso-online-unificado
git add -A && git commit -m "feat(curso-online): espelhar /mentoria sem fases ao vivo"
git push -u origin feat/uco-curso-online-unificado
gh pr create --base main --title "..." --body "$(cat <<'EOF' ... EOF)"
```

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- DevOps preenche ao concluir -->

## QA Results
<!-- N/A — esta story é o gate de push, não de QA -->
