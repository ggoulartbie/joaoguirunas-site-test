---
title: "Story UCO-1.4: Actualizar sitemap.ts, NavLinks e CoursesDropdown"
type: story
status: done
epic: UCO
complexity: S
agent: sites-dev-beta
created: 2026-05-29
updated: 2026-05-29
tags: [story, seo, navigation, curso-online, unificacao]
related:
  - "[[backlog/UCO-1.2-adaptar-componentes-curso-online]]"
  - "[[backlog/UCO-1.3-remover-paginas-obsoletas]]"
  - "[[backlog/UCO-2.1-qa-gate-curso-online-unificado]]"
---

# Story UCO-1.4: Actualizar sitemap.ts, NavLinks e CoursesDropdown

## Objetivo
Remover do sitemap e da navegação todas as referências às 5 rotas apagadas em UCO-1.3 (`/curso-bundle`, `/curso-design`, `/curso-dev`, `/curso-ia-agentes`, `/curso-social-media`). Manter apenas `/curso-online` como rota de curso pública.

## Acceptance Criteria
- [x] AC1: `src/app/sitemap.ts` — remover as 5 entradas listadas em `Cursos (landing pages "Em Breve")`. `/curso-online` permanece com `priority: 0.9`.
- [x] AC2: `src/shared/components/layout/NavLinks.tsx` — apenas `curso-online` presente, rotulado como `Curso Online`.
- [x] AC3: `src/shared/components/ui/CoursesDropdown.tsx` — componente removido por completo (sem consumidores após UCO-1.5).
- [x] AC4: grep retorna 0 linhas confirmado.
- [ ] AC5: Smoke sitemap.xml (requer servidor dev — delegado a QA).
- [ ] AC6: `pnpm build` passa sem erros (delegado a QA gate UCO-2.1).
- [ ] AC7: Smoke navegacional manual (delegado a QA).

## Escopo

**IN:**
- `src/app/sitemap.ts`
- `src/shared/components/layout/NavLinks.tsx`
- `src/shared/components/ui/CoursesDropdown.tsx`
- Smoke navegacional pós-deploy local.

**OUT:**
- Remoção das pastas (já feita em UCO-1.3).
- Mudanças visuais do dropdown além de tirar items mortos.
- Mudança em `siteConfig` ou metadata global.
- Redirects 301 — fora de escopo (PO ainda não decidiu se rotas antigas precisam redirect; padrão: 404).

## Contexto Técnico

**Sitemap actual (linhas 60-65):**
```ts
// Cursos (landing pages "Em Breve")
{ path: '/curso-ia-agentes',          priority: 0.8, freq: 'weekly' },
{ path: '/curso-design',              priority: 0.8, freq: 'weekly' },
{ path: '/curso-dev',                 priority: 0.8, freq: 'weekly' },
{ path: '/curso-social-media',        priority: 0.8, freq: 'weekly' },
{ path: '/curso-bundle',              priority: 0.8, freq: 'weekly' },
```
→ Apagar o bloco inteiro (e comentário).

**NavLinks (linhas 13-18):** apagar as 5 entries não-`curso-online`.

**CoursesDropdown (linhas 19-24):** apagar as 5 entries "Em breve" + separator.

**Dependência:** UCO-1.3 concluída (rotas físicas removidas).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | Rex-S (sites-dev-beta) |
| Iniciado   | 2026-05-30 |
| Concluído  | 2026-05-30 |
| Branch     | main |

## File List
- `src/app/sitemap.ts` — já sem as 5 rotas obsoletas (feito em f782362)
- `src/shared/components/layout/NavLinks.tsx` — 4 itens apenas, sem dropdown (feito em 4dae913 / UCO-1.5)
- `src/shared/components/ui/CoursesDropdown.tsx` — removido (feito em 4dae913)

## QA Results
<!-- QA preenche ao revisar -->
