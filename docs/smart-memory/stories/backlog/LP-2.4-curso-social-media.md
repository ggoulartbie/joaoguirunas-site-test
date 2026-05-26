---
title: "Story LP-2.4: LP Curso Social Media & Conteúdo (/curso-social-media)"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-alpha
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, lp, social-media, conteudo]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-1.2-shared-components-cursos]]"
---

# Story LP-2.4: LP Curso Social Media & Conteúdo

## Objetivo
Criar landing page `src/app/curso-social-media/page.tsx` para o curso de Social Media & Conteúdo com IA — squad de produção e publicação automática (cobertura: módulo 7 do curso — Freepik, Eleven Labs, Heygen, Meta API).

## Acceptance Criteria

- [ ] **AC1** — Rota `src/app/curso-social-media/page.tsx` existe. Server Component + `export const dynamic = 'force-dynamic'`.
- [ ] **AC2** — `metadata` definido: `title: "Curso de Social Media com IA | Conteúdo no Piloto Automático — João Guirunas"`, `description` ≤ 160 char com angle "Produção e publicação de conteúdo no piloto automático", `alternates.canonical: '/curso-social-media'`.
- [ ] **AC3** — JSON-LD `@type: "Course"`, `offers.availability: 'PreOrder'`.
- [ ] **AC4** — Ordem das seções idêntica a LP-2.1.
- [ ] **AC5** — `<CursoHero>` recebe: eyebrow="Curso · Social Media & Conteúdo", headline="Conteúdo no", headlineHighlight="piloto automático", subhead focado em squad que produz e publica sozinho. Badges: `{ value: '1', label: 'Módulo Avançado' }`, `{ value: '6m', label: 'Acesso' }`, `{ value: '4', label: 'Ferramentas Integradas' }`. `priceLabel="Em Breve — R$ 497"`. `source="curso-social-media"`.
- [ ] **AC6** — `<CursoCurriculum>` recebe `phases` cobrindo módulo 7 (extraído de `CursoOnlineTimeline.tsx:82-93`). Subdivide o módulo em sub-aulas para densidade: "Imagens com Freepik", "Narração com Eleven Labs", "Vídeos com Heygen", "Publicação via Meta API". Fase única "Squad de Conteúdo".
- [ ] **AC7** — `<CursoBenefits>` recebe 3 features específicas: "Imagens, áudio e vídeo gerados por IA", "Publicação automática nas redes", "Funciona enquanto você dorme". Ícones: `Image`, `Mic`, `Send` (de `lucide-react`).
- [ ] **AC8** — `<CursoFaq>` recebe items específicos: "Preciso ser criador de conteúdo?", "Funciona para qual rede social?" (resposta: foco Meta — Instagram/Facebook; outras adaptáveis), "Preciso de Eleven Labs/Heygen pagos?" (resposta: planos gratuitos suficientes para começar), "Posso usar para clientes?", "Vou aprender a roteirizar também?", + "Por quanto tempo tenho acesso?", "E se eu não gostar?".
- [ ] **AC9** — Bloco de Inscrição (id="inscricao") com `<ComingSoonCTA priceLabel="Em Breve — R$ 497" source="curso-social-media" />`.
- [ ] **AC10** — `<CursoFinalCTA>` recebe headline "Pronto para deixar a", headlineHighlight="produção rodar sozinha?", copy curta + `priceLabel`.
- [ ] **AC11** — Smoke local: form submete e CRM recebe `source="curso-social-media"`.
- [ ] **AC12** — Lighthouse Performance ≥ 80 mobile, A11y ≥ 90, SEO ≥ 95.
- [ ] **AC13** — `npm run build` passa.

## Escopo

**IN:**
- `src/app/curso-social-media/page.tsx`

**OUT:**
- Mesmos OUTs da LP-2.1.

## Contexto Técnico

- **Bloqueada por LP-1.1 e LP-1.2.**
- Preço placeholder `R$ 497` — confirmar com PO.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | sites-dev-alpha |
| Iniciado   | — |
| Concluído  | — |
| Branch     | `feat/landing-pages-cursos` |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA cobre na LP-3.1 -->
