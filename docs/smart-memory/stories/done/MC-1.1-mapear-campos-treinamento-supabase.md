---
title: "MC-1.1: Auditar aulas módulos 3 e 5 — banco vs conteúdo local"
type: story
status: done
epic: MC
complexity: M
agent: sites-architect + sites-data
created: 2026-05-17
updated: 2026-05-17
tags: [story, mentoria-claude-code, audit, mapping, lessons]
checklist: GO
related:
  - "[[../../mentoria-claude-code/01-analise-conteudo]]"
  - "[[../../agents/data-engineer/fix-soft-delete-2026-05-17]]"
  - "[[MC-1.2-popular-curso-mentoria-claude-code-supabase]]"
---

# MC-1.1: Auditar aulas módulos 3 e 5 — banco vs conteúdo local

## Objetivo

Produzir uma tabela de mapeamento **canônica** `lesson_id → arquivo .txt local` para todas as aulas ativas dos módulos 3 e 5 do curso `mentoria-claude-code-aiox`. A tabela é o insumo direto da MC-1.2 (UPDATEs SQL por ID) e identifica gaps: aulas no banco sem arquivo correspondente, arquivos locais sem aula no banco, títulos divergentes.

## Contexto

Após o mass soft-delete + restauração de 2026-05-17, restam ativas:

- **Módulo 3** (`3901d7a4-7373-4a22-8fcc-f5f6035d3c91`, slug `modulo-3-fundamentos`) — 16 aulas ativas no banco
- **Módulo 5** (`fe6bcf96-...`, slug `modulo-5-claude-design`) — 13 aulas ativas no banco

Conteúdo local em `docs/mentoria-claude-code/Curso On-line/`:
- Módulo 3 → 10 arquivos `.txt`
- Módulo 5 → 11 arquivos `.txt`

**Há divergência de contagem** (banco tem mais aulas que arquivos locais). Esta story resolve a discrepância antes de qualquer UPDATE.

## Acceptance Criteria

- [ ] **AC1 (Snapshot do banco):** rodar via Supabase CLI e capturar em `docs/mentoria-claude-code/08-aulas-banco-vs-local.md`:
  ```sql
  select l.id, l.slug, l.title, l.sort_order, l.video_id,
         coalesce(length(l.summary), 0)    as summary_len,
         coalesce(length(l.transcript), 0) as transcript_len,
         m.slug as module_slug
  from public.lessons l
  join public.modules m on m.id = l.module_id
  where m.id in (
    '3901d7a4-7373-4a22-8fcc-f5f6035d3c91',
    'fe6bcf96-...'  -- preencher full UUID do M5
  )
    and l.deleted_at is null
  order by m.sort_order, l.sort_order;
  ```
  Tabela com: `lesson_id | module_slug | sort_order | slug | title | video_id (null?) | summary (len) | transcript (len)`.

- [ ] **AC2 (Inventário local):** listar todos os `.txt` em `Módulo 3 | Fundamentos/Aulas/` e `Módulo 5 | Claude Design/Aulas/` com:
  - Nome do arquivo
  - Título extraído (campo `TÍTULO` do .txt)
  - Descrição extraída (campo `DESCRIÇÃO` do .txt) — primeiras 200 chars
  - Duração extraída (campo `Duração:`)

- [ ] **AC3 (Mapeamento `id → arquivo`):** tabela de 3 colunas em `08-aulas-banco-vs-local.md`:
  | lesson_id (banco) | sort_order | arquivo local (path relativo) | ação |
  |---|---|---|---|
  | `9828e194-...` | 0 | `Módulo 3.../Aulas/Módulo 3 \| Abertura.txt` | UPDATE |
  | `...` | 1 | `...` | UPDATE |
  | `...` | N | — | SEM ARQUIVO (decidir: deletar? manter título atual?) |
  
  Critério de match: ordem por `sort_order` + similaridade de título (palavras-chave). Casos ambíguos ficam explícitos.

- [ ] **AC4 (Gap report):** seção dedicada listando:
  - Aulas no banco **sem** arquivo local → 3 opções por aula: (a) manter como está, (b) soft-delete (`deleted_at = now()`), (c) gravar conteúdo depois. Cada aula com recomendação justificada.
  - Arquivos locais **sem** aula no banco → opções: (a) criar nova aula (`INSERT`), (b) descartar arquivo. Cada arquivo com recomendação.
  - Aulas com `title` divergente entre banco e arquivo → texto exato dos dois lados + decisão (quase sempre: usar título do arquivo, que é a fonte canônica).

- [ ] **AC5 (Resumo executivo):** topo do documento `08-aulas-banco-vs-local.md` com:
  - Contagem: N aulas banco | M arquivos local | K matches | X gaps banco→local | Y gaps local→banco
  - Recomendação top-level: UPDATEs apenas, ou UPDATEs + soft-deletes, ou UPDATEs + INSERTs.
  - Lista de IDs prontos para MC-1.2 (matches confirmados).

- [ ] **AC6 (Sem modificação de dados):** esta story é **read-only**. Nenhum `UPDATE`, `INSERT` ou `DELETE` é executado. Apenas `SELECT`s e leitura de arquivos. Updates ficam para MC-1.2.

## Escopo

**IN:**
- Snapshot SELECT das aulas ativas em M3 + M5.
- Parse dos `.txt` locais (campos TÍTULO / DESCRIÇÃO / Duração).
- Tabela de mapeamento `id → arquivo` + gap report.
- Recomendação de ação por aula (UPDATE / soft-delete / INSERT / manter).

**OUT:**
- Aplicar qualquer mudança no banco (é MC-1.2 e seguintes).
- Tocar módulos 0, 1, 2, 4, 6, 7, 8, 9 (já soft-deleted ou fora de escopo do sprint).
- Definir `video_id` Vimeo (é MC-1.3).
- Smoke test pelo aluno (é MC-1.4).
- Alterar schema (escalada via ADR se necessário).

## Contexto Técnico

**Como rodar query:**
```bash
supabase db query --linked "SELECT ..."
```
Supabase CLI em `/opt/homebrew/bin/supabase`, projeto linkado `mksmmpfyqowuzjcchhkl` (ver `operational-capabilities.md`).

**Parser do .txt:** formato é plano e estável:
```
TÍTULO
<linha do título>

DESCRIÇÃO
<bloco de descrição>

Duração: ~N minutos
```

**Convenção de matching:** sort_order é provavelmente o melhor critério primário porque tanto o `.txt` quanto o banco seguem a ordem do curso. Título é critério secundário. Quando ambos divergem, pedir confirmação do João.

**Anti-recorrência soft-delete:** durante o snapshot do banco, **sempre filtrar `m.deleted_at IS NULL` E `l.deleted_at IS NULL`** — o bug de duplicidade `abertura` foi causado por query sem esse filtro (`verdict-soft-delete-fix.md`).

## Definition of Done

- `docs/mentoria-claude-code/08-aulas-banco-vs-local.md` commitado em branch (não main) com resumo + 3 seções (banco / local / mapeamento + gaps).
- Lista de `lesson_id`s prontos para MC-1.2 explícita.
- Story atualizada para `done/` apenas após Zaelion (sites-architect) revisar o doc.

## QA Results

<!-- preenchido pelo agente que executar — antes de mover para done -->
