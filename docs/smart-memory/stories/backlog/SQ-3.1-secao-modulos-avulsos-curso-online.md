---
title: "Story SQ-3.1: Seção 'módulos avulsos' em /curso-online"
type: story
status: active
epic: SQ
complexity: S
agent: sites-dev-alpha
created: 2026-07-01
updated: 2026-07-01
tags: [story, squads, curso-online]
related: ["[[../../decisions/ADR-squad-lps]]"]
---

# Story SQ-3.1: Seção 'módulos avulsos' em /curso-online

## Contexto

Além das LPs standalone (acessadas por ads), os 3 produtos-squad também são apresentados dentro do `/curso-online`, abaixo do curso completo, como opção "comece por um squad". Mudança **cirúrgica e de baixo risco**: uma seção nova, nenhuma outra seção tocada. Ref: ADR-squad-lps D7.

## Acceptance Criteria

- [ ] AC1 — Nova seção adicionada em `src/app/curso-online/page.tsx` **abaixo** de `<CursoPricingCalculator />` (linha ~203) e **acima** da seção `#inscricao`.
- [ ] AC2 — A seção mostra 3 cards: **Squad de Sites** (R$297 → `/squad-sites`), **Squad de Social Media** (R$297 → `/squad-social`), **Squad de Dev** (R$397 → `/squad-dev`). Cada card: título, 1 linha de descrição, preço e CTA linkando para a LP.
- [ ] AC3 — Título de seção coerente com o tom (ex.: "Prefere começar por um squad?" / "Módulos avulsos"), com `SectionBadge` no padrão da página.
- [ ] AC4 — Links usam `<Link href="/squad-*">` (navegação interna). Responsivo (grid 1 col mobile → 3 cols desktop).
- [ ] AC5 — Nenhuma outra seção do `/curso-online` alterada; `build` passa; regressão visual zero nas seções existentes.

## Escopo

**IN:** uma seção nova + 3 cards em `curso-online/page.tsx`.

**OUT:** alterar Hero/Timeline/Pricing/Form/FAQ existentes; criar componentes shared novos (pode reusar um card simples inline ou um pequeno componente local).

## Notas técnicas

- Identidade KV: `#FF3A0E`, Fraunces, mono; espelhar `SectionBadge` e o estilo de card já usados na página.
- Preço do Squad de Dev é **R$397** (os outros R$297).
- Os CTAs precisam que as rotas `/squad-*` existam (SQ-2.x) para não gerarem 404 em prod — por isso QA (SQ-4.1) valida após SQ-2.x.

## Dependências

- Depende de: SQ-2.1, SQ-2.2, SQ-2.3 (rotas destino existirem para os links)
- Bloqueia: SQ-4.1 (QA)

---

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-alpha (Novael) |
| Iniciado | 2026-07-01 |
| Concluído | 2026-07-01 |
| Branch | main |

### File List

**Modificados:**
- `src/app/curso-online/page.tsx` — adicionada seção "Módulos Avulsos" entre CursoPricingCalculator e #inscricao; import Link de next/link; 3 cards inline com Link href para /squad-sites, /squad-social, /squad-dev

---

## QA Results

**Veredicto:** —
</content>
