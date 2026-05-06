---
title: Shared Context
type: status-board
updated: 2026-05-06
tags: [ops]
---

# Status Board

O lead (team-os) atualiza este arquivo a cada mudança de estado dos teammates.

## Teammates ativos

| Teammate | Status | Task atual | Desde |
|---|---|---|---|
| — | idle | — | — |

## Team ativo

**Nome:** —
**Objetivo:** —
**Início:** —

## Último encerramento

**Data:** 2026-05-06
**Sessão:** Mentoria Onboarding Tool — formulário presencial com Supabase + PDF upload
**Trabalho realizado:**
- Tabela `onboarding` + bucket `onboarding-pdfs` criados via migrations
- `/mentoria/onboarding` — lista single-line com CRUD, copy prompt, PDF ↗
- `/mentoria/onboarding/[id]` — formulário com auto-save, ✓ por campo, nav com Planejamento último
- PDF upload via signed URL (fix do limite 1MB do Next.js server actions)

## ⚠️ Pendente para próxima sessão

- **git commit + push** de todos os arquivos modificados (nenhum commit desta sessão ainda)
  - Novo: `OnboardingListClient.tsx`, `[id]/OnboardingFormClient.tsx`, `[id]/page.tsx`, `onboarding.ts`, 2 migrations
  - Modificados (plataforma-cursos): academy pages, AdminSidebar, MaterialsUpload

## Decisões ativas
<!-- Architect atualiza após cada ADR -->

## Blockers
<!-- Lead registra quando teammate está travado -->
