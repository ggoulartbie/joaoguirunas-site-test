---
title: "Story AV-3.2: Template MD elegante para description vazia"
type: story
status: done
epic: AV
complexity: S
agent: sites-ux + sites-dev-alpha
created: 2026-05-16
updated: 2026-05-16
tags: [story, template, markdown, ux, aulas-v2]
related:
  - "[[AV-3.1-migration-aulas-v2]]"
  - "[[AV-3.4-aluno-5-abas]]"
  - "[[../../project/architecture]]"
---

# Story AV-3.2: Template MD elegante para description vazia

## Objetivo
Definir o **conteúdo exato** do template Markdown que será inserido nas ~13 aulas atualmente com `description` vazia. Template minimalista, sem emojis, sem cards pesados — fiel à diretriz "menos é mais" do lead. O texto resultante deve renderizar de forma elegante via `LessonContent` (já existente) sem precisar de novos componentes proprietários.

## Acceptance Criteria

- [ ] **AC1 (Conteúdo do template definido)**: Texto Markdown final aprovado pelo lead, salvo em `docs/smart-memory/agents/ux/template-aula-default.md` para que [[AV-3.1-migration-aulas-v2]] consuma. Conteúdo base proposto:
  ```markdown
  ### O que você vai aprender

  - Ponto 1
  - Ponto 2
  - Ponto 3

  ### Pré-requisitos

  Nenhum.

  ### Próximos passos

  Continue com a próxima aula.
  ```
  Sem emojis, sem callouts, sem links externos. Headings nível 3 (`###`) — `LessonContent` já estiliza prose-invert prose-sm.

- [ ] **AC2 (Renderização visual validada)**: Renderizar o template via `LessonContent content={{format:'MARKDOWN', raw: $TEMPLATE}}` e validar visualmente:
  - Headings hierarquia clara, sem peso visual excessivo (sem cards, sem fundos coloridos).
  - Bullets respiram (line-height confortável).
  - Cores derivam do prose-invert (var(--bone) e var(--bone-mute)) — sem cor própria.
  - Sem ícones de lucide-react no template.

- [ ] **AC3 (Tokens proprietários respeitados)**: Não introduz cores hard-coded. Se for preciso refinar a estilização da prose, ajustar via `globals.css` (classe `.prose-invert`) e usar tokens `var(--ember)` (links eventuais), `var(--bone)` (texto), `var(--bone-mute)` (separadores). Nenhum `#hex` direto.

- [ ] **AC4 (Não substitui aulas com texto)**: O template é injetado **apenas** onde `description IS NULL OR trim(description) = ''`. Aulas com qualquer texto preexistente são preservadas.

- [ ] **AC5 (Edição admin trivial)**: Quando o admin abrir uma aula populada com o template, ele vê o texto em texto normal no `<input>` do `description` em `LessonEditorClient.tsx` (e no preview ao toggle "Visualizar" — já implementado em [[../done/2.3-preview-markdown-admin]]). Pode editar/sobrescrever sem fricção.

  - **Atenção**: o campo `description` hoje é um `<input>` (linha única) em `LessonEditorClient.tsx:237-244`. Template tem múltiplas linhas. **Story AV-3.3 deve trocar pra `<textarea>`** — não fixa nesta story, mas marcado como dependência operacional.

- [ ] **AC6 (Sem componentes novos)**: Reuso 100% do `LessonContent` + `react-markdown` + `prose-invert` existentes. Zero código novo, zero novos arquivos de componente.

## Escopo

**IN:**
- Arquivo `docs/smart-memory/agents/ux/template-aula-default.md` com o texto exato do template (escapado pra SQL: aspas simples duplicadas).
- Snippet SQL pronto para colar em `supabase/migrations/{timestamp}_aulas_v2_*.sql` (entregue para Bythelion).
- Verificação visual em ambiente local: rodar `pnpm dev`, abrir aula com description = template, conferir render.
- Se necessário, ajuste fino na classe `.prose` de `globals.css` (ex.: spacing entre h3 e ul) — opcional, só se a renderização default ficar feia.

**OUT:**
- Componentes novos (Callout, Card, etc.) — explicitamente vetado pelo lead.
- Emojis no template.
- Personalização por curso (template é único, global).
- Tradução (template em pt-BR só).
- Refatorar `LessonContent` ou trocar a lib de markdown.
- Trocar o `<input>` do `description` por `<textarea>` (escopo de [[AV-3.3-admin-3-campos-toggle]], que já mexe nos 3 campos).

## Contexto Técnico

**Renderer:** `src/components/editor/LessonContent.tsx` consome `RenderedContent` (tagged union por format). Para MARKDOWN, usa `react-markdown` direto no client. Já existe e funciona — esta story não precisa tocar.

**Diretrizes do lead (literal, da mensagem):**
> "minimalista, sem emojis, sem cards pesados (diretriz do usuário: 'menos é mais')"

**Risco de UX:** se o template ficar parecendo "placeholder genérico", pode poluir a experiência. Por isso o conteúdo é deliberadamente curto e útil ("O que você vai aprender" é universal e não fica errado em nenhuma aula). O admin é encorajado (via copy do próprio template) a substituir conforme for editando.

**Coordenação:**
- sites-ux: aprova o conteúdo final do template, faz a verificação visual.
- sites-dev-alpha: faz a verificação técnica (renderização sem warnings, classe .prose ok).
- Bythelion ([[AV-3.1-migration-aulas-v2]]) consome o template para a migration.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente UX  | sites-ux |
| Agente Dev | sites-dev-alpha |
| Iniciado   | — |
| Concluído  | — |
| Branch     | feat-aulas-v2 |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
