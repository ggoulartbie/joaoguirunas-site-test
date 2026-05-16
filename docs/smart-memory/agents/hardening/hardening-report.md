---
name: hardening-report-fixes-1.1-1.2-1.3
description: Relatório de hardening adversarial dos fixes VideoPlayer, CommentsSection e LessonContent
metadata:
  type: project
  sprint: fix-aula-aluno-ux
  date: 2026-05-16
---

# Hardening Report — Fixes 1.1 / 1.2 / 1.3

## Fix 1 — VideoPlayer aspect ratio (Vimeo)

### Análise adversarial
| Cenário | Status | Ação |
|---|---|---|
| Vídeo 21:9 (cinema) | OK | `responsive: true` no SDK Vimeo trata letterbox automaticamente |
| Vídeo 9:16 (portrait) | OK | `responsive: true` trata pillarbox automaticamente |
| `vimeoDomain` prop vazia (env não definida) | OK | Guard `vimeoDomain ? {domain} : {}` — string vazia não passa o param |
| YouTube com ID inválido | OK | Tratado nas linhas 233-239 — fallback com mensagem visual |
| Mobile < 768px | OK | `w-full` + `responsive: true` — não quebra |
| YouTube duplo clique no play | OK | `setYtStarted(true)` é idempotente; useEffect só monta uma vez |

**Issues críticos/high:** Nenhum no VideoPlayer. Fix correto.

---

## Fix 2 — Comment live update (CommentsSection + addComment)

### Análise adversarial
| Cenário | Status | Ação |
|---|---|---|
| Server retorna `success=true` sem `comment` | CORRIGIDO | Fallback graceful no CommentForm — limpa o campo, não adiciona ao state local |
| Comentário extra-longo (1000+ chars) | OK | `max(4000)` no Zod server-side; UI aceita qualquer tamanho (textarea elastica) |
| XSS via markdown/HTML no conteúdo | OK | `sanitizeHtml()` no server antes de inserir; exibição via `<p>{content}</p>` sem dangerouslySetInnerHTML |
| Duplo envio antes da resposta | OK | `disabled={isPending}` no textarea e button; startTransition é singleton |
| Server timeout | OK | `addComment` retorna `{ success: false, error }` → erro exibido no form |
| **Novo comentário não aparecia na lista** | CORRIGIDO | `onSubmitted` agora recebe `Comment` e faz `setComments(prev => [...prev, comment])` |
| Reply não aparecia na lista | CORRIGIDO | Reply form também atualiza estado local via `onSubmitted` |

**Issue crítico corrigido:** O beta implementou `addComment` retornando `CommentWithAuthor`, mas o `CommentsSection` não usava o retorno. Corrigido em `CommentsSection.tsx`.

**Arquivos modificados:**
- `src/components/student/CommentsSection.tsx` — `onSubmitted` agora tipado como `(comment: Comment) => void`; handlers de form raiz e reply fazem `setComments` com o novo comentário

---

## Fix 3 — Markdown render (LessonContent + LessonTabs)

### Análise adversarial
| Cenário | Status | Ação |
|---|---|---|
| Markdown malformado (ex: `#Titulo` sem espaço) | OK | `react-markdown` é tolerante a malformações — renderiza sem crash |
| Markdown com `<script>` inline | OK | `react-markdown` não executa HTML inline por padrão (sem `rehype-raw`) |
| Aula com `descriptionContent` válido (fluxo principal) | OK | Verificado — `descriptionContent` popula, `LessonContent` renderiza |
| Aula com `description=null` E `descriptionContent=null` | CORRIGIDO | Adicionado estado vazio elegante: "Esta aula não possui descrição." |
| **MARKDOWN format renderizava como texto raw** | CORRIGIDO | Pipeline anterior usava `dangerouslySetInnerHTML` com markdown não convertido |

**Bug crítico corrigido:**
- `processMarkdownCodeBlocks` convertia apenas code blocks para HTML (via Shiki) mas deixava o restante do markdown como texto literal
- `dangerouslySetInnerHTML` recebia markdown misto → `## Titulo` aparecia como `## Titulo` na tela
- **Solução:** `RenderedContent` para MARKDOWN agora carrega `raw: string` (markdown cru); `LessonContent` usa `react-markdown` para renderizar no client, com `CodeBlock` para code fences

**Arquivos modificados:**
- `src/lib/content/index.ts` — tipo `RenderedContent.MARKDOWN` alterado de `{ html: string }` para `{ raw: string }`; `renderContent` passa o markdown cru; função `processMarkdownCodeBlocks` removida
- `src/components/editor/LessonContent.tsx` — adicionado branch `MARKDOWN` usando `react-markdown` + `CodeBlock`
- `src/app/(academy)/academy/(admin)/admin/cursos/[courseId]/aulas/[lessonId]/LessonEditorClient.tsx` — preview inline corrigido para usar `raw` em vez de `html`
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/LessonTabs.tsx` — estado vazio elegante quando description e descriptionContent são nulos

---

## Validação final

```
pnpm typecheck → PASS (0 erros)
```

## Riscos não endereçados

Ver `risks-not-addressed.md`.
