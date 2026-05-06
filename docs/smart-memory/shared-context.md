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
| sites-data | ✅ concluído | F1.2–F1.8 + F9.x — todas as stories done | 2026-05-06 |
| sites-dev-beta | 🟢 ativo | F10.1 — auth sem signup + routing → /academy/aluno | 2026-05-06 |
| sites-dev-alpha | 🟢 ativo | F10.2 (badge admin) + F10.3 (/curso-online + home CTA) | 2026-05-06 |
| sites-dev-delta | 🟢 ativo | F10.4 — criar aluno manual + email convite (F6.1–F6.4 ✅) | 2026-05-06 |
| sites-dev-gamma | 🟢 ativo | F10.5 — verificar webhook Stripe autocria conta | 2026-05-06 |
| sites-devops | ⏸️ bloqueado | F8.4 ✅ done — F8.6 deploy (Vercel MCP + git CLI) aguarda QA PASS | 2026-05-06 |
| sites-qa | ⏸️ bloqueado | F8.7 AC1 ✅ runbook pronto — aguarda F8.6 (produção) para veredicto final | 2026-05-06 |

## Team ativo

**Nome:** joao-guirunas-site-plataforma-cursos-completo
**Objetivo:** Plataforma de cursos Fases 1–9 — 42 stories, do schema ao deploy
**Início:** 2026-05-06T19:30:00-03:00

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
