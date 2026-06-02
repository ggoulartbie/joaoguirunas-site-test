---
title: "MC-1.3: Integrar video_ids Vimeo nas aulas do curso"
type: story
status: backlog
epic: MC
complexity: S
agent: sites-data + João (PO operacional)
created: 2026-05-17
tags: [story, mentoria-claude-code, vimeo, video-integration]
checklist: GO
related:
  - "[[MC-1.2-popular-curso-mentoria-claude-code-supabase]]"
  - "[[MC-1.4-validar-visualizacao-curso-aluno]]"
---

# MC-1.3: Integrar video_ids Vimeo nas aulas do curso

## Objetivo

Preencher `lessons.video_id` (e confirmar `lessons.video_provider = 'vimeo'`) para todas as aulas do curso "Mentoria Claude Code" após o João subir os vídeos no Vimeo. Sem `video_id`, o `<VideoPlayer>` renderiza vazio e a aula fica inútil para o aluno.

## Acceptance Criteria

- [ ] **AC1 (Inventário de uploads):** João (ou agente delegado) lista os `vimeo_id` por aula numa tabela em comentário desta story OU num arquivo `docs/mentoria-claude-code/vimeo-ids.md` com colunas `module_slug | lesson_slug | vimeo_id | nota`.
- [ ] **AC2 (Vimeo privacy):** cada vídeo no Vimeo está com privacy `unlisted` + domínio `joaoguirunas.com` (e `localhost` para dev) no whitelist — runbook de privacidade Vimeo da fricção descoberta na FAA-1.4 (memory `project_vimeo_localhost_domain`).
- [ ] **AC3 (Script/SQL de update):** script SQL idempotente ou snippet Node que faz `update lessons set video_id = X, video_provider = 'vimeo' where slug = Y and module_id = (select id from modules where slug = Z)`. Atualizado lote ou linha-a-linha.
- [ ] **AC4 (Aulas sem vídeo):** se alguma aula ainda não tem vídeo gravado, mantém `video_id = null` e documenta em `vimeo-ids.md`. Aluno verá fallback (content sem player) — kind continua `VIDEO`.
- [ ] **AC5 (Dimensions test):** após preencher, smoke test em uma aula confirma:
  - iframe Vimeo renderiza dentro do container 16:9.
  - `responsive: false` da FAA-1.4 ainda funciona para o video específico.
  - 9:16 / 4:3 nativos não estouram (validação herdada da Story 1.4).
- [ ] **AC6 (Não toca outras aulas):** updates afetam apenas `lessons` do `course slug = 'mentoria-claude-code'`. Query usa `module_id` explícito ou JOIN com `modules.course_id`.

## Escopo

**IN:**
- Coleta de `vimeo_id`s.
- Aplicação dos updates no Supabase (idempotente).
- Smoke visual rápido (1 aula com vídeo).

**OUT:**
- Upload em si para o Vimeo (operação manual do João via web UI Vimeo).
- Substituir o provider de vídeo.
- Refator do `VideoPlayer`.
- Geração de thumbnails.

## Contexto Técnico

**Endpoint Vimeo:** `https://player.vimeo.com/video/{video_id}` (resolvido pelo `VideoPlayer.tsx`).

**Privacy chained com domain whitelist:** se não estiver configurado, Vimeo bloqueia embed → iframe vazio sem erro evidente. Fricção real descoberta na FAA-1.4. Confirmar `joaoguirunas.com` E `localhost` no whitelist de domínios do vídeo.

**SQL template:**
```sql
update public.lessons l
set video_id = $1, video_provider = 'vimeo'
from public.modules m, public.courses c
where l.module_id = m.id
  and m.course_id = c.id
  and c.slug = 'mentoria-claude-code'
  and m.slug = $2
  and l.slug = $3;
```

## Definition of Done

- Todas as aulas com vídeo gravado têm `video_id` preenchido.
- `vimeo-ids.md` (ou tabela na story) atualizada com IDs + status.
- Smoke visual em 1 aula PASSOU.

## QA Results

<!-- preenchido pelo agente que executar — antes de mover para done -->
