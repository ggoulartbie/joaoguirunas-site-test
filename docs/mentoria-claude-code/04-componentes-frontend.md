---
title: Componentes Frontend — Inventário Completo (Academy)
updated: 2026-05-17
team: joao-guirunas-site-mentoria-curso
---

# Componentes Frontend — Inventário Completo

## Componentes do aluno (inventário completo)

### `meus-cursos/page.tsx` — Lista de cursos do aluno

Server Component. Faz 6 queries encadeadas:

1. `cohort_members` — cohorts ativas do aluno (`status = 'ACTIVE'`)
2. `cohort_courses` — cursos + `included_module_ids` por cohort
3. `courses` — dados do curso (`id, slug, title, description, cover_image_url`)
4. `modules` — todos os módulos dos cursos (para contagem total)
5. `lessons` — aulas dos módulos acessíveis (para calcular progresso)
6. `lesson_progress` — aulas concluídas pelo aluno

**O que renderiza:**
- Grid de cards de cursos acessíveis (thumbnail 16:9, título, description, status badge, barra de progresso, `completedLessons/totalLessons`)
- Seção "Conteúdo bloqueado" para cursos sem aulas acessíveis (opacity 0.6)
- Empty state se sem nenhum cohort

**Campos dinâmicos por curso:**
- `cover_image_url` — thumbnail (inline background-image, fallback: ícone BookOpen)
- `progressPercent`, `completedLessons`, `totalLessons`
- `isPartialAccess` — quando `included_module_ids` limita acesso (exibe `X/Y módulos`)
- `cohortName`, `cohortSlug` — rodapé do card

---

### `curso/[slug]/page.tsx` — Página do curso

Server Component. Dados necessários do banco:

| Campo | Tabela | Uso |
|---|---|---|
| `id, title, description, cover_image_url, slug` | `courses` | Hero + breadcrumb |
| `id, title, slug, sort_order, deleted_at` | `modules` | Lista de módulos |
| `id, title, slug, kind, sort_order, deleted_at` | `lessons` | Lista de aulas |
| `lesson_id, completed` | `lesson_progress` | Badges de conclusão |
| `cohort_id` | `cohort_members` | Access gate |
| `cohort_id, included_module_ids` | `cohort_courses` | Modules acessíveis |
| `id, module_id, title, kind, storage_path, external_url, size_bytes` | `module_materials` | Materiais do módulo |

**Lógica de acesso:**
- `included_module_ids = []` → full access ao curso
- `included_module_ids = [uuid, ...]` → acesso parcial (restante locked)
- `cohort_members` ativo mas sem `cohort_courses` → `hasGlobalAccess = true`

**Materiais do módulo (inline no acordeão):**
- Signed URL gerada server-side (TTL 300s) para `kind != 'LINK'`
- `kind = 'LINK'` usa `external_url` direto

**Sub-componentes (todos server-only, sem estado):**
- `ModuleAccordion` — módulo desbloqueado com `<details open>`, lista de aulas, materiais
- `LockedModuleCard` — módulo bloqueado, opacidade 50%
- `LessonKindIcon` — ícone por `kind` (VIDEO/QUIZ/outros)

---

### `curso/[slug]/aula/[lesson-slug]/page.tsx` — Página da aula

Server Component com layout em duas colunas (desktop).

**Dados necessários do banco:**

| Campo | Tabela | Uso |
|---|---|---|
| `id, title, description, content, content_format, summary, summary_format, transcript, transcript_format` | `lessons` | Conteúdo das tabs |
| `video_id, video_provider, kind` | `lessons` | Player de vídeo |
| `sort_order, module_id` | `lessons` | Navegação prev/next |
| `id, title, sort_order, course_id` | `modules` | Breadcrumb + sidebar |
| `id, slug, title` | `courses` | Breadcrumb |
| `id, name, slug, description` | `cohorts` (via `cohort_courses`) | CTA de acesso bloqueado |
| `lesson_id, completed` | `lesson_progress` | Estado do botão MarkComplete + sidebar |
| `seconds_watched, completed` | `lesson_progress` | Resumo de progresso da aula atual |
| `reaction, user_id` | `lesson_reactions` | Estado inicial do LessonReactions |
| `id, lesson_id, content, created_at, ...` | `comments` | CommentsSection |
| `id, name, role` | `profiles` (via join) | Autor do comentário |
| `id, title, kind, external_url, storage_path, size_bytes, sort_order` | `materials` | MaterialsList |
| `cohort_id` | `cohort_members` | Access gate + sidebar navigation |
| `included_module_ids` | `cohort_courses` | Navegação cross-module filtrada |

**RPC crítico:** `has_access(p_user_id, p_lesson_id)` — verificado server-side antes de expor `video_id`.

**Sub-componentes do layout:**
- `VideoPlayer` — player client-side (veja abaixo)
- `MarkCompleteButton` — botão toggle completar aula
- `LessonReactions` — like/dislike com optimistic update
- `LessonTabs` — abas com conteúdo da aula
- `CourseSidebar` — sidebar desktop (sticky, 320px)
- `MobileLessonDrawer` — drawer mobile com lista de aulas
- `LessonNavCompact` — navegação prev/next (server, sem handlers)

**Renderização de conteúdo:**
`renderContent(format, content)` — suporta `MDX | HTML | MARKDOWN`. Chamado server-side para `content`, `summary` e `transcript`.

---

### `LessonTabs.tsx` — Abas da aula (client)

Props recebidas da page:

```typescript
{
  courseSlug: string
  lessonSlug: string
  activeTab: 'sobre' | 'resumo' | 'transcricao' | 'materiais' | 'comentarios'
  description: string
  descriptionContent?: RenderedContent | null
  summaryContent?: RenderedContent | null
  transcriptContent?: RenderedContent | null
  materials: Material[]        // Database['public']['Tables']['materials']['Row'][]
  comments: CommentWithAuthor[]
  lessonId: string
  currentUserId?: string
}
```

**Lógica de tabs disponíveis:**
- `sobre` — presente se `descriptionContent || description`
- `resumo` — presente se `summaryContent` não nulo
- `transcricao` — presente se `transcriptContent` não nulo
- `materiais` — presente se `materials.length > 0`
- `comentarios` — sempre presente

Estado client: `useState<Tab>` com resolução do tab inicial.

---

### `VideoPlayer.tsx` — Player de vídeo (client)

Props:

```typescript
{
  lessonId: string
  videoId: string
  provider: string | null   // 'VIMEO' | 'YOUTUBE' | outros
  initialSeconds?: number   // retomada de progresso
  className?: string
  vimeoDomain?: string      // env var VIMEO_DOMAIN_WHITELIST
}
```

**O que precisa do banco:** apenas `video_id`, `video_provider`, `lesson.id` e `progress.seconds_watched` — todos resolvidos na page server.

---

### `CommentsSection.tsx` — Seção de comentários (client)

Props:

```typescript
{
  lessonId: string
  initialComments: CommentWithAuthor[]
  currentUserId: string
}
```

`CommentWithAuthor` inclui: `id, lesson_id, content, created_at, updated_at, deleted_at, is_pinned, parent_comment_id, authorId, authorName, authorRole`.

**Lógica de threading:** top-level vs. replies por `parent_comment_id`. CRUD via Server Actions (`addComment`, `editComment`, `deleteComment`).

---

### `LessonReactions.tsx` — Reações da aula (client)

Props:

```typescript
{
  lessonId: string
  initialLikes: number
  initialDislikes: number
  initialMine: 'LIKE' | 'DISLIKE' | null
}
```

Usa `useOptimistic` + `useTransition`. Server action: `setReaction(lessonId, reaction)`.

---

### `MaterialsList.tsx` — Lista de materiais (client)

Props:

```typescript
{
  materials: Database['public']['Tables']['materials']['Row'][]
}
```

Campos usados: `id, title, kind, size_bytes, storage_path, external_url`.

**Fluxo de download:**
1. Chama `downloadMaterialAction(material.id)` — server action que gera signed URL
2. Para `kind = 'LINK'`: abre `external_url` em nova aba
3. Para arquivos: dispara download via `<a download>`

Tipos suportados: `PDF | ZIP | IMAGE | LINK | OTHER`.

---

## Como o vídeo Vimeo é integrado

### Campos necessários na tabela `lessons`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `video_provider` | `text` | sim | `'VIMEO'` |
| `video_id` | `text` | sim | ID numérico do vídeo Vimeo (ex: `"123456789"`) |
| `kind` | `text` | sim | `'VIDEO'` — player só renderiza quando `kind === 'VIDEO'` |

### Env vars necessárias

| Variável | Uso |
|---|---|
| `VIMEO_DOMAIN_WHITELIST` | Passado como `domain` para o SDK Vimeo — necessário para embedded privacy |

### Formato do embed

O player usa o SDK `@vimeo/player` (não `<iframe>` direto no aluno). Configuração:

```typescript
new Player(containerEl, {
  id: parseInt(videoId, 10),   // videoId DEVE ser numérico
  responsive: false,
  autopause: false,
  dnt: true,
  title: false,
  byline: false,
  portrait: false,
  domain: vimeoDomain,          // se env var presente
})
```

O container é um `<div ref>` absoluto dentro de `aspect-ratio: 16/9`. CSS forçado:
```
[&_iframe]:h-full [&_iframe]:w-full [&_iframe]:absolute [&_iframe]:inset-0
```

### Preview no admin (LessonEditorClient)

O editor admin usa `<iframe>` direto (não o SDK):
```
src: https://player.vimeo.com/video/{videoId}?dnt=1&title=0&byline=0&domain={vimeoDomain}
```

### Tracking de progresso (Vimeo)

- `timeupdate` → salva `currentSecondsRef` + marca complete se `seconds/duration >= 0.95`
- `pause` → `saveProgress(lessonId, seconds)` imediato
- `ended` → `saveProgress` + `markLessonComplete`
- Heartbeat a cada 10s durante play (`PROGRESS_INTERVAL_MS = 10_000`)

### YouTube (suporte secundário)

- `video_id` pode ser URL completa ou ID de 11 chars — `extractYouTubeId()` normaliza
- Player carregado lazy (click no thumbnail primeiro) via YouTube IFrame API dinâmica
- Mesmo sistema de heartbeat/threshold

---

## Como materiais são exibidos e baixados

### Materiais por aula (`materials`)

Renderizados na aba "Materiais" do `LessonTabs` via `MaterialsList`.

**Campos necessários:**

| Campo | Uso |
|---|---|
| `id` | key + referência para Server Action |
| `title` | label do botão |
| `kind` | `PDF \| ZIP \| IMAGE \| LINK \| OTHER` — ícone + label "Baixar"/"Abrir" |
| `size_bytes` | exibido formatado se presente |
| `storage_path` | usado pelo Server Action para gerar signed URL |
| `external_url` | usado diretamente quando `kind = 'LINK'` |
| `sort_order` | ordenação (gerenciado pelo servidor) |

**Fluxo de download:** client → `downloadMaterialAction(id)` → server gera signed URL → retorna URL → client abre/baixa.

### Materiais por módulo (`module_materials`)

Renderizados inline no `ModuleAccordion` da página do curso (server-side, não client).

**Signed URL gerada server-side (TTL 300s).** Exibidos antes da lista de aulas no acordeão.

**Campos necessários:**

| Campo | Uso |
|---|---|
| `id, module_id` | chave + agrupamento |
| `title` | texto do link |
| `kind` | `LINK` → usa `external_url`; outros → usa `signedUrl` |
| `storage_path` | para gerar signed URL |
| `external_url` | URL direta para links |
| `size_bytes` | opcional, exibido |

---

## Componentes do admin (editor de aulas/módulos)

### `LessonEditorClient.tsx` — Editor de aula

Campos editáveis mapeados para colunas da tabela `lessons`:

| Campo UI | Coluna DB | Tipo |
|---|---|---|
| Título | `title` | `text` |
| Tipo de Aula | `kind` | `VIDEO \| LIVE \| IN_PERSON \| CODE \| READING` |
| Descrição | `description` | `text` (markdown) |
| Provedor | `video_provider` | `VIMEO \| YOUTUBE \| CLOUDFLARE_STREAM` |
| ID do Vídeo | `video_id` | `text` |
| Sobre a Aula | `content` + `content_format` | `text` + `MDX\|HTML\|MARKDOWN` |
| Resumo | `summary` + `summary_format` | `text` + `MDX\|HTML\|MARKDOWN` |
| Transcrição | `transcript` + `transcript_format` | `text` + `MDX\|HTML\|MARKDOWN` |

**Materiais:** upload de arquivo (`PDF, ZIP, PNG, JPG, JPEG, GIF, WEBP`) via `uploadMaterial` action. Delete via `deleteMaterial`.

**Preview Vimeo no admin:** `<iframe>` direto com `video_id` ao digitar — feedback imediato.

### `ContentFieldSection.tsx` — Seção de campo rich text

Props: `label, format, content, onFormatChange, onContentChange`.

Seletor de formato: `MARKDOWN | HTML | MDX`. Preview server-side via `previewContentAction(format, content)` com debounce de 400ms.

### `ModuleEditorClient.tsx` — Editor de módulo

Gerencia apenas `module_materials`. Funcionalidades:
- Upload de arquivo (mesmo bucket `materials`)
- Adicionar link externo (form inline: `title + url`)
- Delete de material

Sem edição de título/slug do módulo — esses campos são gerenciados em outra rota.

---

## O que precisa do banco para funcionar (data requirements por componente)

### Tabelas essenciais e campos mínimos

#### `courses`
```
id, slug, title, description, cover_image_url
```

#### `modules`
```
id, course_id, title, slug, sort_order, deleted_at
```

#### `lessons`
```
id, module_id, title, slug, kind, sort_order, deleted_at,
description, content, content_format,
summary, summary_format,
transcript, transcript_format,
video_id, video_provider
```

#### `lesson_progress`
```
user_id, lesson_id, completed, seconds_watched
```

#### `materials` (por aula)
```
id, lesson_id, title, kind, storage_path, external_url, size_bytes, sort_order
```

#### `module_materials` (por módulo)
```
id, module_id, title, kind, storage_path, external_url, size_bytes, sort_order
```

#### `cohort_members`
```
user_id, cohort_id, status
```

#### `cohort_courses`
```
cohort_id, course_id, included_module_ids
```

#### `cohorts`
```
id, name, slug, description
```

#### `lesson_reactions`
```
lesson_id, user_id, reaction
```

#### `comments`
```
id, lesson_id, content, created_at, updated_at, deleted_at, is_pinned, parent_comment_id
```
Join com `profiles(id, name, role)`.

#### `profiles`
```
id, name, role
```

### RPC obrigatória

```sql
has_access(p_user_id uuid, p_lesson_id uuid) returns boolean
```
Verificação server-side de acesso antes de expor `video_id`.

### Bucket de storage

- `materials` — privado, signed URLs com TTL 300s (aluno) geradas server-side
