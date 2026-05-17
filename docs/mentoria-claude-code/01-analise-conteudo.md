# Análise de Conteúdo — Mentoria Claude Code

**Produzido por:** sites-analyst  
**Data:** 2026-05-17  
**Decisão que informa:** população do curso "Mentoria Claude Code" no Supabase

---

## Estrutura do conteúdo local (campos, hierarquia)

### Fonte de conteúdo real: `docs/mentoria-claude-code/Curso On-line/`

O conteúdo do curso não vive em `src/data/treinamento/`. Esse diretório contém **dados para slides interativos** do Centro de Treinamento (componentes React: diagramas de agentes, estrutura de pastas, comandos base). São dados de apresentação, não dados de curso.

O conteúdo real do curso está na pasta `docs/mentoria-claude-code/Curso On-line/` com a seguinte hierarquia física:

```
Curso On-line/
  Módulo 0 | Abertura/              # vazio — não gravado ainda
  Módulo 1 | O que é Possível/      # vazio — não gravado ainda
  Módulo 2 | Setup /                # vazio — não gravado ainda
  Módulo 3 | Fundamentos/
    Aulas/
      *.mp4  (vídeos — 9 aulas)
      *.txt  (metadados por aula — título + descrição + duração)
      *.jpg  (materiais de imagem)
    manual-m3.pdf
    roteiro-modulo-3-fundamentos-v2.md
  Módulo 4 | Centro de Treainamento/
    Aulas/
      *.txt  (12 aulas — só metadados, sem vídeo)
    manual-m4.pdf
    roteiro-modulo-4-centro-treinamento.md
  Módulo 5 | Claude Design/
    Aulas/
      *.mp4 + *.txt  (11 aulas)
    manual-m5.pdf
    prompts-modulo-5-claude-design.md
    roteiro-modulo-5-claude-design-v3.md
  Módulo 6 | Squad de Sites/        # sem Aulas/ — só manual-m6.pdf + roteiro
  Módulo 7 | Squad de Social Media/ # vazio
  Módulo 8 | Squad de DEV/          # vazio
  Módulo 9 | Bônus | Gerenciador de Tarefas/   # vazio
  Módulo 9 | Bônus | Orquestrador Comercial/   # vazio
```

**Encontros On-line/** contém apenas 1 arquivo de vídeo MP4 (Encontro 0).

### Contagem por estado

| Módulo | Título | Aulas (.txt) | Vídeos (.mp4) | Manual PDF | Status |
|--------|--------|:---:|:---:|:---:|--------|
| 0 | Abertura | 0 | 0 | — | Vazio |
| 1 | O que é Possível | 0 | 0 | — | Vazio |
| 2 | Setup | 0 | 0 | — | Vazio |
| 3 | Fundamentos | 10 | 9 | Sim | Gravado + metadados |
| 4 | Centro de Treinamento | 12 | 0 | Sim | Metadados, sem vídeo |
| 5 | Claude Design | 11 | 8 | Sim | Parcialmente gravado |
| 6 | Squad de Sites | 0 | 0 | Sim | Só manual + roteiro |
| 7 | Squad de Social Media | 0 | 0 | — | Vazio |
| 8 | Squad de DEV | 0 | 0 | — | Vazio |
| 9 | Bônus — Gerenciador | 0 | 0 | — | Vazio |
| 9 | Bônus — Orquestrador | 0 | 0 | — | Vazio |
| **Total** | | **33** | **17** | **4** | |

### Campos disponíveis nos arquivos `.txt` de aula

Cada `.txt` tem estrutura plana com 3 campos:

```
TÍTULO
{título da aula — ex: "Módulo 4 | Aula 1 | Arquitetura Mental"}

DESCRIÇÃO
{descrição de 100–400 palavras — conteúdo conceitual completo da aula}

Duração: ~N minutos
```

Campos ausentes nos `.txt`: `slug`, `vimeo_id`, `video_provider`, `sort_order`, `content_format`, `summary`, `transcript`.

### Outros materiais disponíveis por módulo

- **PDFs manuais:** `manual-m3.pdf`, `manual-m4.pdf`, `manual-m5.pdf`, `manual-m6.pdf`
- **Roteiros:** `.md` com roteiro completo por módulo
- **Prompts:** `prompts-modulo-5-claude-design.md`
- **Imagens:** `.jpg` em `Módulo 3/Aulas/` (assets de identidade visual)

---

## Schema Supabase relevante (tabelas courses, cohorts, modules, lessons, materials)

### Hierarquia no banco

```
courses
  └── cohorts (via cohort_courses — m:m)
  └── modules (1:N — course_id)
        └── lessons (1:N — module_id)
              └── materials (1:N — lesson_id)
              └── lesson_progress (per user)
        └── module_materials (1:N — module_id) ← tabela adicionada na sprint FM-3.x
```

### Tabela `courses`

| Campo | Tipo | Obrigatório |
|-------|------|:-----------:|
| id | uuid | auto |
| title | string | sim |
| slug | string | sim |
| description | string | null |
| cover_image_url | string | null |
| published | boolean | default false |
| sort_order | int | default 0 |
| deleted_at | timestamp | null |

### Tabela `modules`

| Campo | Tipo | Obrigatório |
|-------|------|:-----------:|
| id | uuid | auto |
| course_id | uuid | sim |
| title | string | sim |
| slug | string | sim |
| description | string | null |
| cover_image_url | string | null |
| sort_order | int | sim |
| deleted_at | timestamp | null |

### Tabela `lessons`

| Campo | Tipo | Obrigatório |
|-------|------|:-----------:|
| id | uuid | auto |
| module_id | uuid | sim |
| title | string | sim |
| slug | string | sim |
| kind | string | sim (ex: "video", "text") |
| sort_order | int | sim |
| description | string | null |
| video_id | string | null (Vimeo ID) |
| video_provider | string | null (ex: "vimeo") |
| duration_seconds | int | null |
| content | string | null |
| content_format | string | null |
| summary | string | null |
| summary_format | string | null |
| transcript | string | null |
| transcript_format | string | null |
| deleted_at | timestamp | null |

### Tabela `materials` (por aula)

| Campo | Tipo | Obrigatório |
|-------|------|:-----------:|
| id | uuid | auto |
| lesson_id | uuid | sim |
| title | string | sim |
| kind | string | sim (ex: "pdf", "link", "image", "zip") |
| external_url | string | null |
| storage_path | string | null |
| size_bytes | int | null |
| sort_order | int | default 0 |

### Tabela `module_materials` (por módulo — adicionada em FM-3.x)

Mesma estrutura que `materials`, mas com `module_id` em vez de `lesson_id`.

### Tabela `cohorts`

Representa uma turma (instância do curso com alunos, datas, preço). Campos relevantes:
- `slug`, `name`, `status`, `start_date`, `end_date`, `access_duration_days`
- `is_purchasable`, `entry_price_cents`, `infinitepay_handle`
- `has_live_sessions`, `group_url`, `has_support`

---

## Gap analysis (o que falta, o que precisa de ajuste, campos sem correspondência)

### G1 — Nenhum `slug` nos arquivos de conteúdo

Os `.txt` têm apenas título e descrição. O Supabase exige `slug` único em `courses`, `modules` e `lessons`. Todos os slugs precisam ser **gerados** a partir dos títulos.

- Estratégia: normalizar título → lowercase + hifenização + remoção de caracteres especiais.
- Exemplos: `"Módulo 3 | Fundamentos"` → `modulo-3-fundamentos`, `"Aula 1 | Arquitetura Mental"` → `aula-1-arquitetura-mental`

### G2 — Nenhum `vimeo_id` disponível localmente

Os `.mp4` existem em disco local mas os IDs Vimeo (necessários para `lessons.video_id`) não estão em nenhum arquivo. O mapeamento precisará ser feito após upload dos vídeos ao Vimeo.

- Blocker para `kind = "video"`: sem `video_id`, o player não funciona.
- Workaround: criar lessons com `kind = "text"` inicialmente, atualizar `video_id` após upload.

### G3 — Duração em minutos no `.txt`, banco espera `duration_seconds`

Os arquivos têm `"Duração: ~5 minutos"` (string aproximada). O banco armazena `duration_seconds` (integer).

- Conversão: parse da string → multiplicar por 60 → pode ser ajustado após upload real.
- Risco: valores são aproximados ("~5 minutos") → não usar como dado preciso para progress tracking.

### G4 — Módulos 0, 1, 2, 7, 8, 9 sem conteúdo de aula

Existem como diretórios mas sem `.txt` nem `.mp4`. O banco pode recebê-los como módulos `published: false` sem lessons, ou esperar até ter conteúdo.

### G5 — Dois módulos com numeração "9"

`Módulo 9 | Bônus | Gerenciador de Tarefas` e `Módulo 9 | Bônus | Orquestrador Comercial` têm o mesmo número de módulo. O campo `sort_order` resolve a ordenação, mas os slugs precisarão ser diferenciados:
- `modulo-9-bonus-gerenciador-de-tarefas`
- `modulo-9-bonus-orquestrador-comercial`

### G6 — Erro de digitação no nome de diretório

`Módulo 4 | Centro de Treainamento` tem "Treainamento" (typo). O título no banco deve ser corrigido para "Treinamento".

### G7 — Materiais de módulo vs. materiais de aula

Os PDFs de manuais (`manual-m3.pdf`, etc.) são materiais de módulo, não de aula específica — adequados para `module_materials`. As imagens `.jpg` em `Módulo 3/Aulas/` são materiais de contexto sem aula mapeada explicitamente.

### G8 — Cohort ainda não criado

Para o curso funcionar, é necessário criar pelo menos 1 cohort associado ao course. O shared-context indica que o João ainda precisa criar o cohort da mentoria (slug, preço, datas de acesso).

### G9 — `src/data/treinamento/` não é fonte de dados de curso

**Achado crítico:** os arquivos `src/data/treinamento/` são dados de **componentes de slides UI** (diagramas, comandos base, estrutura de pastas para o Centro de Treinamento interativo) — não contêm módulos/aulas da mentoria. A fonte de conteúdo real é exclusivamente `docs/mentoria-claude-code/Curso On-line/`.

---

## Recomendações para população

**1. Criar o registro em `courses`**
```
title: "Mentoria Claude Code"
slug: "mentoria-claude-code"
published: false  ← manter oculto até revisão
sort_order: 1
```

**2. Popular `modules` com sort_order explícito**

| sort_order | slug | title | published |
|:---:|------|-------|:---------:|
| 0 | modulo-0-abertura | Módulo 0 \| Abertura | false |
| 1 | modulo-1-o-que-e-possivel | Módulo 1 \| O que é Possível | false |
| 2 | modulo-2-setup | Módulo 2 \| Setup | false |
| 3 | modulo-3-fundamentos | Módulo 3 \| Fundamentos | true |
| 4 | modulo-4-centro-de-treinamento | Módulo 4 \| Centro de Treinamento | true |
| 5 | modulo-5-claude-design | Módulo 5 \| Claude Design | true |
| 6 | modulo-6-squad-de-sites | Módulo 6 \| Squad de Sites | false |
| 7 | modulo-7-squad-de-social-media | Módulo 7 \| Squad de Social Media | false |
| 8 | modulo-8-squad-de-dev | Módulo 8 \| Squad de DEV | false |
| 9 | modulo-9-bonus-gerenciador | Módulo 9 \| Bônus \| Gerenciador de Tarefas | false |
| 10 | modulo-9-bonus-orquestrador | Módulo 9 \| Bônus \| Orquestrador Comercial | false |

**3. Popular `lessons` dos módulos 3, 4 e 5**
- Fonte: arquivos `.txt` em `Aulas/`
- `kind = "video"` onde há `.mp4` correspondente, `kind = "text"` onde há só `.txt`
- `video_id = null` inicialmente — atualizar após upload ao Vimeo
- Converter duração: parse `"~N minutos"` × 60 → `duration_seconds`
- `description` = campo DESCRIÇÃO do `.txt`

**4. Popular `module_materials` com os PDFs de manual**
- `manual-m3.pdf`, `manual-m4.pdf`, `manual-m5.pdf`, `manual-m6.pdf`
- `kind = "pdf"`, storage_path após upload no Supabase Storage

**5. Criar cohort da turma "Mentoria Claude Code"**
- João precisa definir: slug, preço, datas de início/fim, `access_duration_days`
- Associar ao curso via `cohort_courses`

**6. Script de seed sugerido**
A população pode ser feita via script TypeScript usando o Supabase client — inserção em cascata: course → modules → lessons → module_materials. Estrutura já bem mapeada para automação.
