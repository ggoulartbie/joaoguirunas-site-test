---
title: "Story SQ-1.2: Layout standalone para as Squad LPs"
type: story
status: active
epic: SQ
complexity: S
agent: sites-dev-alpha
created: 2026-07-01
updated: 2026-07-01
tags: [story, squads, layout, chrome]
related: ["[[../../decisions/ADR-squad-lps]]"]
---

# Story SQ-1.2: Layout standalone para as Squad LPs

## Contexto

As LPs de squad são **standalone**: sem nav global, apenas logo no topo + CTA flutuante. **Descoberta crítica:** a nav global vem de `SiteChrome` (client, gated por `usePathname` contra `CHROME_EXCLUDED`), **não de um layout**. Um `layout.tsx` do route group não remove a nav sozinho — é preciso somar os slugs ao `CHROME_EXCLUDED`. Ref: ADR-squad-lps D1, D2.

## Acceptance Criteria

- [x] AC1 — Route group `src/app/(squad-lps)/` criado com `layout.tsx` que renderiza chrome minimalista: barra superior com `<Logo variant="alltype" height={22} />` (de `@/shared/components/ui/Logo`) linkando para `/`, + CTA flutuante ("Garantir vaga" ou similar) apontando para `#inscricao`.
- [x] AC2 — `src/shared/components/layout/SiteChrome.tsx` — array `CHROME_EXCLUDED` recebe `'/squad-sites'`, `'/squad-social'`, `'/squad-dev'`.
- [x] AC3 — Nas 3 rotas, o `<Header/>` e `<Footer/>` globais **não aparecem** no DOM (verificável); o chrome renderizado é só o do route group.
- [x] AC4 — O CTA flutuante não sobrepõe conteúdo crítico em mobile (z-index + posição validados) e tem `aria-label`.
- [x] AC5 — `build` passa; navegar de `/` para `/squad-sites` e voltar não deixa chrome duplicado nem resíduo (SiteChrome é client, re-render por pathname).

## Escopo

**IN:** route group + `layout.tsx` standalone, edição de `CHROME_EXCLUDED`, CTA flutuante, logo header.

**OUT:** conteúdo das páginas (SQ-2.x); componentes de conteúdo (SQ-1.1). Uma `page.tsx` placeholder mínima pode existir só para validar o chrome, mas o conteúdo real vem em SQ-2.x.

## Notas técnicas

- Precedente idêntico: `/workshop-3`, `/workshop-4` (já em `CHROME_EXCLUDED`, com `layout.tsx` próprio retornando `<>{children}</>`). Diferença: as squad LPs querem um logo header + CTA flutuante, não apenas passthrough.
- `hasChromeExcluded` usa `pathname === p || pathname.startsWith(p + '/')` — os slugs exatos bastam.
- **Anti-recorrência (ADR D2):** esquecer o AC2 faz a LP herdar a nav global. QA (SQ-4.1) verifica ausência de `<Header/>`.

## Dependências

- Depende de: SQ-0.1
- Bloqueia: SQ-2.1, SQ-2.2, SQ-2.3

---

## Dev Agent Record

| Campo | Valor |
|---|---|
| Agente | sites-dev-alpha |
| Iniciado | 2026-07-01 |
| Concluído | 2026-07-01 |
| Branch | main |

### File List
- `src/app/(squad-lps)/layout.tsx` — criado (chrome standalone: logo + CTA flutuante)
- `src/app/(squad-lps)/squad-sites/page.tsx` — criado (placeholder)
- `src/app/(squad-lps)/squad-social/page.tsx` — criado (placeholder)
- `src/app/(squad-lps)/squad-dev/page.tsx` — criado (placeholder)
- `src/shared/components/layout/SiteChrome.tsx` — editado (CHROME_EXCLUDED +3 rotas)

---

## QA Results

**Veredicto:** —
</content>
