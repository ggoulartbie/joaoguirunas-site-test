---
title: "Research: Análise de Conteúdo — Mentoria Claude Code"
type: research
agent: sites-analyst
created: 2026-05-17
tags: [research, academy, mentoria, supabase, seed]
---

# Research: Análise de Conteúdo — Mentoria Claude Code

**Decisão que informa:** como popular o curso "Mentoria Claude Code" no Supabase
**Solicitado por:** team-lead (time joao-guirunas-site-mentoria-curso)

## Resumo executivo

O conteúdo real do curso vive em `docs/mentoria-claude-code/Curso On-line/` (11 módulos, 33 aulas com metadados em `.txt`). O schema Supabase suporta completamente a hierarquia courses→modules→lessons→materials. O principal blocker para população imediata é a ausência de `vimeo_id` — os vídeos existem localmente mas ainda não foram subidos ao Vimeo.

## Findings

### Estado do conteúdo local

- **11 módulos** fisicamente presentes (incluindo 2 módulos com numeração "9")
- **33 arquivos `.txt`** com metadados de aulas (título + descrição + duração aproximada em minutos)
- **17 arquivos `.mp4`** de vídeo (nos módulos 3 e 5; módulo 4 só tem `.txt`)
- **4 PDFs de manual** (módulos 3, 4, 5, 6)
- Módulos 0, 1, 2, 7, 8, 9 vazios — ainda não gravados
- `src/data/treinamento/` NÃO é fonte de dados do curso (são dados de slides UI)

### Campos disponíveis nos `.txt`

| Campo no .txt | Campo Supabase | Status |
|---|---|---|
| TÍTULO | lessons.title | Mapeado direto |
| DESCRIÇÃO | lessons.description | Mapeado direto |
| Duração: ~N minutos | lessons.duration_seconds | Requer conversão (× 60) |
| — | lessons.slug | Precisa ser gerado |
| — | lessons.video_id | Precisa de upload Vimeo |
| — | lessons.kind | Inferir por presença de .mp4 |

### Schema Supabase

O banco tem todas as tabelas necessárias:
- `courses` — registro único do curso
- `modules` — 1:N por curso, com `sort_order`
- `lessons` — 1:N por módulo, com `video_id` + `video_provider` para Vimeo
- `materials` — materiais por aula
- `module_materials` — materiais por módulo (adicionado na sprint FM-3.x)
- `cohorts` + `cohort_courses` — para turmas com preço e datas de acesso

## Comparação

| Aspecto | Conteúdo local | Schema Supabase |
|---|---|---|
| Hierarquia | Curso > Módulo > Aula > Material | courses > modules > lessons > materials |
| Título | Sim | Sim |
| Descrição | Sim | Sim (lessons.description) |
| Slug | Não | Obrigatório — precisa gerar |
| Video ID | Não (só .mp4 local) | lessons.video_id (Vimeo) |
| Duração | Aprox. em minutos | duration_seconds (int) |
| Manuais PDF | Sim (.pdf por módulo) | module_materials |
| Sort order | Implícito no nome | Explícito (int obrigatório) |
| Publicação | — | lessons.published, modules.published |

## Gaps críticos

1. **vimeo_id ausente** — blocker para player funcionar. Upload ao Vimeo necessário antes de ter lessons com `kind = "video"` ativas.
2. **Slugs precisam ser gerados** — nenhum arquivo local tem slug. Geração via normalização do título.
3. **Duração aproximada** — "~5 minutos" não é preciso para progress tracking real.
4. **Cohort não criado** — João precisa criar a turma no admin antes de liberar acesso a alunos.
5. **Typo no diretório M4** — "Treainamento" → corrigir para "Treinamento" no title do banco.
6. **Dois módulos com número 9** — slugs distintos necessários; sort_order 9 e 10.

## O que os dados sugerem

A estrutura local está mapeável ao schema sem alterações de banco. A população pode ser feita via script de seed TypeScript em duas fases: (1) inserir courses + modules + lessons + module_materials com `published: false` e `video_id: null`; (2) após upload ao Vimeo, atualizar `video_id` + `video_provider` + `published: true` por módulo concluído.

## Fontes

- `docs/mentoria-claude-code/Curso On-line/` — conteúdo real do curso
- `src/types/database.ts` — schema Supabase autorizado
- `src/lib/supabase/database.types.ts` — schema gerado pelo CLI Supabase
- `docs/smart-memory/shared-context.md` — histórico de decisões do projeto
