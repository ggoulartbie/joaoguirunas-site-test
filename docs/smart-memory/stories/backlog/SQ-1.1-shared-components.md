---
title: "Story SQ-1.1: Componentes compartilhados das Squad LPs + mover CursoOnlineForm"
type: story
status: active
epic: SQ
complexity: M
agent: sites-dev-alpha
created: 2026-07-01
updated: 2026-07-01
tags: [story, squads, components, refactor]
related: ["[[../../decisions/ADR-squad-lps]]"]
---

# Story SQ-1.1: Componentes compartilhados das Squad LPs + mover CursoOnlineForm

## Contexto

As 3 LPs de squad (`/squad-sites`, `/squad-social`, `/squad-dev`) compartilham a mesma estrutura de 12 blocos com conteúdo diferente. Os componentes de conteúdo do `/curso-online` são **hardcoded/prop-less** — esta story cria versões **parametrizadas** em `src/app/(squad-lps)/_components/` e move o form de lead para reuso, **sem tocar** nos originais do curso-online (defesa em profundidade). Ref: ADR-squad-lps D3, D4, D5.

## Acceptance Criteria

- [ ] AC1 — Criados componentes shared parametrizados em `src/app/(squad-lps)/_components/`: `SquadHero`, `SquadCurriculum` (currículo aula→resultado), `SquadFaq`, `SquadBenefits`/`SquadProblema`/`SquadVirada` conforme necessidade — cada um recebe conteúdo via props (nenhuma const hardcoded de copy).
- [ ] AC2 — `types.ts` define `SquadConfig` (headline, sub, ctaLabel, price, priceInstallments, curriculum[], faq[], bonus, problema, virada, instrutor) e tipos auxiliares (`CurriculumItem`, `FaqItem`).
- [ ] AC3 — `CursoOnlineForm` movido para `src/app/(squad-lps)/_components/` (ou `src/shared/components/`) com prop **opcional `formId?: string`** com **default = `'44e30c7d-03d2-4896-a85a-53daef5c6623'`** (FORM_ID atual). O `id` do `<div>` e o `data-form-id` usam o `formId` recebido.
- [ ] AC4 — `src/app/curso-online/page.tsx` importa o `CursoOnlineForm` do novo local **sem passar `formId`** — comportamento idêntico ao atual (default preserva o form CRM existente).
- [ ] AC5 — Um CTA compartilhado (`SquadCta` ou reuso de `<a href="#inscricao">`) rola até a seção de inscrição; **nenhum link externo** (sem Kiwify).
- [ ] AC6 — Vestigiais `CursoSquadSection.tsx` e `CursoSquadsSticky.tsx` deletados (confirmado dead code; grep sem imports). *(Opcional — pode ser adiada; não bloqueia.)*
- [ ] AC7 — `npm run build` (ou `pnpm build`) passa; `/curso-online` renderiza o form CRM idêntico (regressão zero).

## Escopo

**IN:** componentes shared parametrizados, `SquadConfig` types, mover+parametrizar `CursoOnlineForm`, atualizar import no curso-online, CTA âncora shared, delete de vestigiais.

**OUT:** criar as páginas das LPs (SQ-2.x); layout standalone (SQ-1.2); refatorar os componentes originais do curso-online (Hero/Timeline/Diferenciais/FAQ permanecem intactos); qualquer checkout/cohort/Kiwify.

## Notas técnicas

- Manter identidade KV: `#FF3A0E`, Fraunces (`var(--font-display-serif)`), mono. Espelhar o visual dos componentes atuais.
- `CursoOnlineForm` é client (`useEffect` injeta script). Preservar o guard `done.current` para não duplicar script.
- Componentes originais como referência visual: `curso-online/_components/CursoOnlineHero.tsx`, `CursoOnlineTimeline.tsx`, `CursoFaqAccordion.tsx`.

## Dependências

- Depende de: SQ-0.1 (contexto)
- Bloqueia: SQ-2.1, SQ-2.2, SQ-2.3

---

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-alpha (Novael) |
| Iniciado | 2026-07-01 |
| Concluído | 2026-07-01 |
| Branch | main |

### File List

**Criados:**
- `src/app/(squad-lps)/_components/types.ts` — SquadConfig, CurriculumItem, FaqItem
- `src/app/(squad-lps)/_components/SquadForm.tsx` — form CRM com prop formId opcional (default = 44e30c7d-...)
- `src/app/(squad-lps)/_components/SquadHero.tsx`
- `src/app/(squad-lps)/_components/SquadSelos.tsx`
- `src/app/(squad-lps)/_components/SquadProblema.tsx`
- `src/app/(squad-lps)/_components/SquadVirada.tsx`
- `src/app/(squad-lps)/_components/SquadCurriculum.tsx`
- `src/app/(squad-lps)/_components/SquadBonus.tsx`
- `src/app/(squad-lps)/_components/SquadProva.tsx`
- `src/app/(squad-lps)/_components/SquadTransparencia.tsx`
- `src/app/(squad-lps)/_components/SquadInstrutor.tsx`
- `src/app/(squad-lps)/_components/SquadOferta.tsx`
- `src/app/(squad-lps)/_components/SquadFaq.tsx`
- `src/app/(squad-lps)/_components/SquadCtaFinal.tsx`

**Modificados:**
- `src/app/curso-online/page.tsx` — import CursoOnlineForm → SquadForm do shared

**Deletados:**
- `src/app/curso-online/_components/CursoSquadSection.tsx` (dead code)
- `src/app/curso-online/_components/CursoSquadsSticky.tsx` (dead code)

---

## QA Results

**Veredicto:** —
</content>
