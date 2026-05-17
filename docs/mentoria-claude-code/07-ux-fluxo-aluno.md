# UX — Fluxo do Aluno: Mentoria Claude Code

## Fluxo de navegação do aluno (step by step)

```
Dashboard
  └─ "Continue de onde parou" → deeplink para aula em progresso
  └─ "Suas turmas" → /academy/meus-cursos

Meus Cursos (/academy/meus-cursos)
  └─ Card do curso → /academy/curso/[slug]

Página do Curso (/academy/curso/[slug])
  └─ Hero com progresso geral + CTA "Começar" / "Retomar"
  └─ Lista de módulos (accordion, abertos por padrão)
      └─ Cada módulo → lista de aulas
          └─ Aula → /academy/curso/[slug]/aula/[lesson-slug]

Página da Aula (/academy/curso/[slug]/aula/[lesson-slug])
  └─ Player de vídeo (topo, 16:9)
  └─ Abaixo do player: breadcrumb + título + MarkComplete + Reactions + Nav prev/next
  └─ LessonTabs (Sobre a aula / Resumo / Transcrição / Materiais / Comentários)
  └─ Sidebar direita (desktop): Course Outline com progresso
  └─ Mobile: drawer do outline via botão
```

---

## O que cada página exibe

### Dashboard

- Saudação com nome do aluno
- Card 2/3: "Continue de onde parou" — última aula com progresso > 0 segundos, não concluída (ordenado por `updated_at` desc). Se nenhuma, exibe CTA para Meus Cursos.
- Card 1/3: "Próximo encontro" — próxima `live_session` futura da cohort do aluno.
- Grid de turmas: card por cohort ativa com progress bar e data de expiração.
- Banner de aviso se alguma turma expira em <= 30 dias.

### Meus Cursos

- Header: "Meus Cursos" + contagem de cursos disponíveis.
- Grid responsivo (1 col mobile / 2 sm / 3 xl) de cards de curso.
- Cada card: thumbnail 16:9, badge de status (ATIVO / PARCIAL / CONCLUÍDO), título, descrição (2 linhas truncadas), indicador de acesso parcial (X/Y módulos), progress bar + percentual, footer com aulas concluídas/total + CTA "Acessar →".
- Cursos sem aulas liberadas aparecem na seção "Conteúdo bloqueado" (opacidade 0.6, sem link).

### Página do Curso

- Breadcrumb: Meus Cursos → [Título do Curso]
- Hero: título em itálico, descrição, progress bar com contagem de aulas e módulos.
- CTA "Começar" (0%) ou "Retomar" (>0%) aponta para primeira aula não concluída.
- Lista de módulos como `<details open>` (accordion HTML nativo):
  - Header: número do módulo, título, check se completo, contagem de aulas, percentual se em progresso.
  - Se houver `module_materials`: seção "Materiais do módulo" antes da lista de aulas (links externos ou downloads com URL assinada TTL 5min).
  - Lista de aulas: número, ícone (VIDEO / QUIZ / texto), título, check se concluída.
  - Footer do módulo: "X/Y aulas concluídas".
- Módulos sem acesso renderizam como `LockedModuleCard` (opacidade 0.5, ícone de cadeado, texto "acesso não incluído na sua turma").

### Página da Aula

Layout split: coluna esquerda (conteúdo) + sidebar direita fixa 320px (desktop only).

**Zona superior — vídeo:**
- Div aspect-video com background `var(--ink-3)`.
- Se `kind === 'VIDEO'` e `video_id` existir: `<VideoPlayer>` com `videoId`, `provider`, `initialSeconds` (segundos já assistidos), `vimeoDomain` (env var `VIMEO_DOMAIN_WHITELIST`).
- Se não houver vídeo: ícone Play centralizado.

**Zona abaixo do player:**
- Breadcrumb: [Nome do Curso] / [Nome do Módulo]
- Título da aula em itálico, tamanho clamp(1.5rem → 2rem)
- MarkCompleteButton: toggle servidor-side via `lesson_progress`
- LessonReactions: LIKE / DISLIKE
- LessonNavCompact: botões Anterior/Próxima com título truncado da aula adjacente
- MobileLessonDrawer (apenas mobile): abre lista completa de aulas

**LessonTabs (tabs dinâmicas — só aparecem se o conteúdo existe):**
| Tab | Condição para aparecer | Conteúdo |
|---|---|---|
| Sobre a aula | `description` ou `content` não vazio | Conteúdo renderizado (MDX/HTML/Markdown) ou texto simples |
| Resumo | `summary` não vazio | Conteúdo renderizado |
| Transcrição | `transcript` não vazio | Conteúdo renderizado |
| Materiais | `materials.length > 0` | Lista com links para download/links externos |
| Comentários | sempre | CommentsSection com threading e badge de contagem |

**Sidebar direita (desktop) — CourseSidebar:**
- Progresso total do curso (X/Y aulas)
- Lista de módulos colapsável com contagem por módulo
- Aula atual highlighted
- Links para todas as aulas acessíveis

**Estado sem acesso (`has_access === false`):**
- Mostra apenas breadcrumb + título + `<LockedContent>` com CTA para turma.

---

## Estrutura recomendada do curso "Mentoria Claude Code"

Baseado nos diretórios e arquivos .txt com títulos e descrições reais presentes em `docs/mentoria-claude-code/Curso On-line/`:

### Módulo 0 — Abertura
*(conteúdo ainda a ser definido — pasta vazia)*

Sugestão: 1 aula de boas-vindas com o João apresentando o método e o que o aluno vai construir ao longo do curso.

---

### Módulo 1 — O que é Possível
*(conteúdo ainda a ser definido — pasta vazia)*

Sugestão: 2–3 aulas demonstrando casos reais de uso do Claude Code antes de qualquer setup.

---

### Módulo 2 — Setup
*(conteúdo ainda a ser definido — pasta vazia)*

Sugestão: aulas guiadas de instalação do Claude Code, configuração do terminal, chaves de API.

---

### Módulo 3 — Fundamentos
*(conteúdo parcialmente pronto — roteiro e PDF entregues, aulas gravadas em .mp4)*

| # | Slug sugerido | Título | Tipo |
|---|---|---|---|
| 1 | m3-abertura | Abertura | VIDEO |
| 2 | m3-parte-0 | Parte 0 | VIDEO |
| 3 | m3-parte-1 | Parte 1 | VIDEO |
| 4 | m3-parte-2-pastas | Pastas | VIDEO |
| 5 | m3-parte-3-claude | Claude | VIDEO |
| 6 | m3-parte-4-comandos-base | Comandos Base | VIDEO |
| 7 | m3-parte-5-como-claude-trabalha | Como Claude Trabalha | VIDEO |
| 8 | m3-parte-6-skills-hooks-agents | Skills, Hooks e Agents | VIDEO |
| 9 | m3-parte-7-pontes-com-o-mundo | Pontes com o Mundo | VIDEO |
| 10 | m3-parte-8-encerramento | Encerramento | VIDEO |

Material do módulo: `manual-m3.pdf`

---

### Módulo 4 — Centro de Treinamento
*(conteúdo pronto — roteiro + PDF + .txt por aula com descrições finais)*

| # | Slug sugerido | Título | Tipo |
|---|---|---|---|
| 1 | m4-arquitetura-mental | Arquitetura Mental | VIDEO |
| 2 | m4-instalacao-do-centro | Instalação do Centro | VIDEO |
| 3 | m4-centro-de-comando | Centro de Comando | VIDEO |
| 4 | m4-smart-memory | Smart-Memory | VIDEO |
| 5 | m4-anatomia-de-um-squad | Anatomia de um Squad | VIDEO |
| 6 | m4-os-4-squads-prontos | Os 4 Squads Prontos | VIDEO |
| 7 | m4-team-os | Team-OS | VIDEO |
| 8 | m4-bootstrap-magico | Bootstrap Mágico | VIDEO |
| 9 | m4-team-os-creator | Team-OS-Creator | VIDEO |
| 10 | m4-operacao-do-zero | Operação do Zero | VIDEO |
| 11 | m4-regras-invisiveis | Regras Invisíveis | VIDEO |
| 12 | m4-encerramento | Encerramento | VIDEO |

Material do módulo: `manual-m4.pdf`

---

### Módulo 5 — Claude Design
*(conteúdo pronto — roteiro + PDF + .txt por aula, maioria com .mp4)*

| # | Slug sugerido | Título | Tipo |
|---|---|---|---|
| 1 | m5-abertura | Abertura | VIDEO |
| 2 | m5-diretor-de-arte | Diretor de Arte | VIDEO |
| 3 | m5-por-que-esse-modulo-importa | Por que Esse Módulo Importa | VIDEO |
| 4 | m5-logica-de-projetos | Lógica de Projetos | VIDEO |
| 5 | m5-design-system | Design System | VIDEO |
| 6 | m5-kv-site | KV Site | VIDEO |
| 7 | m5-kv-social | KV Social | VIDEO |
| 8 | m5-kv-trafego | KV Tráfego | VIDEO |
| 9 | m5-kv-dev | KV Dev | VIDEO |
| 10 | m5-handoff-pro-claude-code | Handoff pro Claude Code | VIDEO |
| 11 | m5-encerramento | Encerramento | VIDEO |

Material do módulo: `manual-m5.pdf`

---

### Módulo 6 — Squad de Sites
*(roteiro e PDF prontos — sem pasta Aulas ainda)*

| # | Slug sugerido | Título sugerido | Tipo |
|---|---|---|---|
| 1 | m6-abertura | Abertura | VIDEO |
| 2–N | (derivar do roteiro) | (ver `roteiro-modulo-6-squad-sites.md`) | VIDEO |

Material do módulo: `manual-m6.pdf`

---

### Módulo 7 — Squad de Social Media
*(pasta vazia — conteúdo a ser produzido)*

---

### Módulo 8 — Squad de DEV
*(pasta vazia — conteúdo a ser produzido)*

---

### Módulo 9 — Bônus: Gerenciador de Tarefas
*(pasta vazia — conteúdo a ser produzido)*

---

### Módulo 9 — Bônus: Orquestrador Comercial
*(pasta vazia — conteúdo a ser produzido)*

---

## Como os links Vimeo serão integrados

**Campo esperado na tabela `lessons`:**

| Campo | Tipo | Valor esperado |
|---|---|---|
| `video_id` | `text` | ID numérico do vídeo no Vimeo (ex: `"123456789"`) |
| `video_provider` | `text` | `"VIMEO"` |
| `kind` | `text` | `"VIDEO"` |

**Fluxo de exibição:**
1. A página da aula consulta `lesson.video_id` e `lesson.video_provider`.
2. O componente `<VideoPlayer>` recebe `videoId` e `provider`.
3. O VideoPlayer renderiza um iframe com domínio autorizado via env var `VIMEO_DOMAIN_WHITELIST`.
4. O progresso em segundos é salvo automaticamente em `lesson_progress.seconds_watched` via evento do SDK Vimeo.
5. O aluno pode retomar de onde parou — `initialSeconds` é passado ao player no carregamento.

**Atenção operacional:**
- `VIMEO_DOMAIN_WHITELIST` precisa incluir o domínio de produção (`joaoguirunas.com`) e `localhost` para dev local.
- O vídeo no Vimeo deve ter domínio autorizado configurado no painel do Vimeo (embed permissions).
- O `video_id` é apenas o número — não a URL completa.

**Formato correto:**
```
video_id: "123456789"          ✅
video_id: "https://vimeo.com/123456789"  ✗
```

---

## Considerações UX para o conteúdo específico deste curso

### 1. Nomenclatura consistente de slugs
Os slugs das aulas devem ser estáveis e previsíveis — uma vez publicados, não mudar. O aluno pode ter bookmarks ou o `lesson_progress` faz lookup por `lesson_id`, mas o link público usa o slug. Sugestão: padrão `m{N}-{topico-kebab}`.

### 2. Módulos com títulos redundantes
Módulos 9 (Bônus) têm o mesmo número. Na tabela Supabase usar `sort_order` para ordenação — o título pode ser "Módulo 9A — Gerenciador de Tarefas" e "Módulo 9B — Orquestrador Comercial" ou simplesmente manter títulos distintos.

### 3. Aulas sem vídeo ainda gravado
Módulos 0, 1, 2, 6, 7, 8 e os Bônus ainda não têm vídeo. Para não bloquear a estrutura do curso, inserir as aulas com `kind = 'TEXT'` e `content` descritivo até os vídeos serem gravados e uploadados. Isso permite que o aluno veja o índice completo do curso mesmo antes de todo conteúdo estar disponível.

### 4. Módulos com release parcial por cohort
O sistema suporta `included_module_ids` na tabela `cohort_courses`. Para a primeira turma do curso online, pode-se liberar apenas os módulos 0–5 no lançamento e adicionar 6–8 conforme produção avança — sem alterar o registro da turma, apenas atualizando `included_module_ids`.

### 5. Materiais por módulo vs. por aula
O sistema tem duas tabelas: `module_materials` (materiais compartilhados por módulo — PDFs dos manuais) e `materials` (materiais por aula — recursos específicos). Os PDFs `manual-mX.pdf` devem ser inseridos como `module_materials` (kind: `FILE`) com `storage_path` no bucket `materials`. Links externos (GitHub, ferramentas) vão como `kind: LINK` com `external_url`.

### 6. Progresso e engajamento
- "Continue de onde parou" no Dashboard só aparece se `seconds_watched > 0` — aulas apenas abertas mas não iniciadas não aparecem. Isso é correto: o aluno precisa de intenção explícita para o card aparecer.
- LessonReactions (LIKE/DISLIKE) ajuda a identificar aulas com baixa satisfação para revisão futura.
- Comentários por aula: para curso assíncrono, comentários são o principal canal de dúvidas — garantir que o campo `is_pinned` seja usado para fixar respostas do João.

### 7. Encontros ao vivo (live sessions)
O encontro gravado `2026_05_14 | Mentoria _ Encontro 0.mp4` (468MB) está em `docs/mentoria-claude-code/Encontros On-line/`. Este conteúdo NÃO pertence ao fluxo de `lessons` — deve ser tratado como `live_sessions` na tabela homônima, ou disponibilizado como aula extra em um módulo de "Gravações ao Vivo". Não subir o MP4 diretamente — usar Vimeo como host e referenciar via `video_id`.

### 8. Acessibilidade das tabs de conteúdo
- As tabs no LessonTabs são botões com estado visual (ember underline) — adicionar `aria-selected` e `role="tabpanel"` para screen readers seria melhoria futura.
- Contraste atual: `var(--bone-mute)` em tabs inativas pode estar abaixo de 4.5:1 contra `var(--ink)` — verificar com ferramenta de contraste antes do lançamento público.
