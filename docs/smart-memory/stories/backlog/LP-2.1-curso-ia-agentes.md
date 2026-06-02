---
title: "Story LP-2.1: LP Curso IA & Agentes (/curso-ia-agentes)"
type: story
status: backlog
epic: LP
complexity: M
agent: sites-dev-alpha
created: 2026-05-26
updated: 2026-05-26
tags: [story, landing-pages, lp, ia-agentes]
related:
  - "[[../../decisions/ADR-landing-pages-cursos]]"
  - "[[LP-1.1-server-action-create-lead-only]]"
  - "[[LP-1.2-shared-components-cursos]]"
---

# Story LP-2.1: LP Curso IA & Agentes

## Objetivo
Criar landing page `src/app/curso-ia-agentes/page.tsx` para o curso de IA & Agentes Claude Code (cobertura: Fundamentos + Centro de Treinamento de Agentes — módulos 1 a 4 do curso completo). Consome shared components de LP-1.2 e action `createLeadOnly` de LP-1.1.

## Acceptance Criteria

- [ ] **AC1** — Rota `src/app/curso-ia-agentes/page.tsx` existe. Server Component com `export const dynamic = 'force-dynamic'` (paridade com `curso-online/page.tsx:1`).
- [ ] **AC2** — `metadata` definido: `title: "Curso de IA & Agentes Claude | Aprenda com IA — João Guirunas"` (≤ 70 char), `description` em ≤ 160 char com angle "Construa agentes autônomos com Claude Code", `alternates.canonical: '/curso-ia-agentes'`, openGraph + twitter padronizados.
- [ ] **AC3** — JSON-LD `@type: "Course"` com `name`, `description`, `provider`, `inLanguage: 'pt-BR'`, `url`, `offers.availability: 'https://schema.org/PreOrder'` (não InStock, porque está "Em Breve") e `offers.price`/`priceCurrency` placeholder (`797` / `BRL`).
- [ ] **AC4** — Page renderiza, na ordem: `<SolarSystemBackground />` (importado de `@/app/agentes/_components/SolarSystemBackground`), `<SectionDots />` (de `@/app/mentoria/section-dots`), `<CursoHero>`, `<CursoBenefits>`, `<CursoCurriculum>`, `<CursoFacilitadores>`, **bloco de Inscrição com `ComingSoonCTA` (id="inscricao")**, `<CursoFaq>`, `<CursoFinalCTA>`. Paridade visual com `curso-online/page.tsx`.
- [ ] **AC5** — `<CursoHero>` recebe: eyebrow="Curso · IA & Agentes", headline="Agentes Claude que", headlineHighlight="trabalham por você", subhead focado em automação. Badges: `{ value: '4', label: 'Módulos' }`, `{ value: '6m', label: 'Acesso' }`, `{ value: '100%', label: 'On-demand' }`. `priceLabel="Em Breve — R$ 797"`. `source="curso-ia-agentes"`.
- [ ] **AC6** — `<CursoCurriculum>` recebe array `phases` mapeando os módulos 1–4 do curso completo (extraídos do `CursoOnlineTimeline.tsx:23-55`): M1 "O que é possível", M2 "Fundamentos do Claude Code", M3 "Setup e Instalação", M4 "Centro de Treinamento de Agentes". Fase única label "Fundamentos".
- [ ] **AC7** — `<CursoBenefits>` recebe 3 features específicas: "Demos reais de agentes em produção", "Construa seu primeiro agente", "Materiais e templates de cada módulo". Ícones: `Bot`, `Play`, `FileText` (de `lucide-react`).
- [ ] **AC8** — `<CursoFaq>` recebe items específicos da LP: 5–7 perguntas focadas em IA & Agentes (subset adaptado de `CursoFaqAccordion.tsx` — perguntas "Preciso saber programar?", "Qual computador eu preciso?", "Preciso de software pago?", "Vou conseguir criar minha própria squad?", "Posso usar comercialmente?", "Por quanto tempo tenho acesso?", "E se eu não gostar?").
- [ ] **AC9** — Bloco de Inscrição (id="inscricao") renderiza `<ComingSoonCTA priceLabel="Em Breve — R$ 797" source="curso-ia-agentes" />` dentro de container estilizado igual ao bloco direito de `curso-online/page.tsx:284-310`.
- [ ] **AC10** — `<CursoFinalCTA>` recebe headline "Pronto para ter sua própria", headlineHighlight="squad de agentes IA?", copy curta + `priceLabel`.
- [ ] **AC11** — Sitemap: `src/app/sitemap.ts` atualizado para incluir `/curso-ia-agentes` (será atualizado em conjunto na LP-2.5 que adiciona as 5 rotas de uma vez — esta AC fica como nota mas a implementação consolidada vai pra LP-2.5).
- [ ] **AC12** — Smoke local: `npm run dev` → abrir `http://localhost:3000/curso-ia-agentes` → hero renderiza, botão "Em Breve" visível e não-clicável, form de captura funciona (preenchimento manual com email teste → submit → CRM webhook bate no destino, form mostra confirmação).
- [ ] **AC13** — Lighthouse Performance ≥ 80 mobile (paridade com curso-online), Accessibility ≥ 90, SEO ≥ 95.
- [ ] **AC14** — `npm run build` passa. TypeScript estrito. Sem warnings novos.

## Escopo

**IN:**
- `src/app/curso-ia-agentes/page.tsx` (novo)
- Eventuais componentes 100% específicos desta LP em `src/app/curso-ia-agentes/_components/` (apenas se necessário; preferir shared)

**OUT:**
- Sitemap (consolidado em LP-2.5)
- Conteúdo de blog ou prova social além das 3 features e FAQ
- A/B testing
- Pixel de tracking / GTM (futuro)

## Contexto Técnico

- **Bloqueada por LP-1.1 e LP-1.2.** Não iniciar antes de ambas done.
- Reusa `SolarSystemBackground` e `SectionDots` direto dos caminhos atuais.
- Visual = `curso-online/page.tsx` exceto: hero copy, modules cobertos, FAQ items, ausência de `CursoPricingCalculator`.
- `priceLabel="Em Breve — R$ 797"` — preço é placeholder; pode ser ajustado quando definir o preço real do curso individual.

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
