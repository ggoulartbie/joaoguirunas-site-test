---
title: "Story UCO-2.1: QA gate adversarial — /curso-online unificada + remoções"
type: story
status: backlog
epic: UCO
complexity: M
agent: sites-qa
created: 2026-05-29
updated: 2026-05-29
tags: [story, qa, curso-online, unificacao]
related:
  - "[[backlog/UCO-1.2-adaptar-componentes-curso-online]]"
  - "[[backlog/UCO-1.3-remover-paginas-obsoletas]]"
  - "[[backlog/UCO-1.4-atualizar-sitemap-links-internos]]"
  - "[[backlog/UCO-2.2-push-pr-uco]]"
---

# Story UCO-2.1: QA gate adversarial — /curso-online unificada + remoções

## Objetivo
Veredicto formal sobre UCO-1.2 + UCO-1.3 + UCO-1.4. PASS / FAIL único cobrindo a página unificada, a remoção das 6 pastas, e a limpeza de sitemap + nav. Sem PASS, não há UCO-2.2.

## Acceptance Criteria
- [ ] AC1: `/curso-online` em `dev` renderiza Hero → Solução → Diferenciais → Timeline → Facilitadores → Pricing → Inscrição → FAQ → CTA Final, na mesma ordem da mentoria.
- [ ] AC2: Timeline de `/curso-online` **não contém** fases `Pré-Mentoria`, `Dia Presencial`, `Bônus Online`, `Encerramento`. Contém apenas `Semana 1`, `Semana 2`, `Semana 3`, `Semana 4`.
- [ ] AC3: Visual comparison `/mentoria` vs `/curso-online`: secções Diferenciais, Facilitadores, FAQ, CTA Final batem em layout, tipografia, espaçamento, hover states. Screenshots anexados ao veredicto.
- [ ] AC4: Form de inscrição em `/curso-online#inscricao` é o `CheckoutForm` (não `RevosForm`). Submit testado em dev contra cohort `curso-online-padrao`.
- [ ] AC5: `curl -I http://localhost:3000/curso-bundle` retorna **404**. Mesmo para `/curso-design`, `/curso-dev`, `/curso-ia-agentes`, `/curso-social-media`.
- [ ] AC6: `curl http://localhost:3000/sitemap.xml | grep curso-` mostra apenas `/curso-online`.
- [ ] AC7: Header dropdown / NavLinks não contêm links para as 5 rotas removidas. Smoke clicando cada item.
- [ ] AC8: `pnpm build` passa zero erros / zero warnings em `src/app/curso-online/**` e `src/app/sitemap.ts`.
- [ ] AC9: `pnpm lint` passa nas mesmas pastas.
- [ ] AC10: `grep -rn "from '@/app/cursos\|/cursos/_shared\|/curso-bundle\|/curso-design\|/curso-dev\|/curso-ia-agentes\|/curso-social-media" src/` retorna 0 linhas.
- [ ] AC11: JSON-LD `@type: Course` em `/curso-online` permanece válido (`price: '797'`, `availability: InStock`, `url: /academy/checkout/curso-online-padrao`).
- [ ] AC12: Veredicto registrado em `docs/smart-memory/qa-reports/UCO-2.1-{data}.md` com PASS/FAIL por AC, evidências (screenshots, curl outputs, logs de build).

## Escopo

**IN:**
- Verificação visual lado a lado.
- Verificação de build / lint / typecheck.
- Verificação de 404 das rotas removidas.
- Verificação de sitemap e navegação.
- Verificação do form de inscrição em dev.

**OUT:**
- E2E em produção (vai para UCO-2.2 pós-deploy se aplicável).
- Performance / Lighthouse — fora de escopo (abrir story separada se necessário).
- A11y completo — abrir story separada se PO pedir.

## Contexto Técnico

**Comandos de verificação canônicos:**
```bash
# Build + lint
pnpm build
pnpm lint

# 404 das rotas removidas
for r in curso-bundle curso-design curso-dev curso-ia-agentes curso-social-media; do
  curl -s -o /dev/null -w "%{http_code} /$r\n" http://localhost:3000/$r
done

# Sitemap
curl -s http://localhost:3000/sitemap.xml | grep -o "https[^<]*curso[^<]*" | sort -u

# Imports mortos
grep -rn "from '@/app/cursos\|/cursos/_shared\|/curso-bundle\|/curso-design\|/curso-dev\|/curso-ia-agentes\|/curso-social-media" src/ || echo "CLEAN"
```

**Veredicto:** `sites-qa` tem autoridade exclusiva. Se FAIL, abre tasks de bug e bloqueia UCO-2.2.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List

Arquivos auditados (read-only):
- `src/app/curso-online/page.tsx`
- `src/app/curso-online/_components/CursoOnlineHero.tsx`
- `src/app/curso-online/_components/CursoOnlineDiferenciais.tsx`
- `src/app/curso-online/_components/CursoOnlineTimeline.tsx`
- `src/app/curso-online/_components/CursoPricingCalculator.tsx`
- `src/app/curso-online/_components/CursoFaqAccordion.tsx`
- `src/app/curso-online/_components/checkout-form.tsx`
- `src/app/sitemap.ts`
- `src/shared/components/layout/NavLinks.tsx`
- `src/shared/components/ui/animated-hero.tsx`

Arquivos criados pelo QA:
- `docs/smart-memory/qa-reports/UCO-2.1-2026-05-29.md` (relatório completo)
- Entrada em `docs/smart-memory/agents/qa/results.md` (veredicto formal)

## QA Results

**Veredicto:** ⚠️ CONCERNS (PASS com 3 observações não-bloqueantes)
**Data:** 2026-05-29
**Auditor:** sites-qa (Axilun)
**Relatório completo:** `docs/smart-memory/qa-reports/UCO-2.1-2026-05-29.md`

**Resumo:** 9 de 12 ACs ✅ PASS direto; 3 ACs (AC3, AC4, AC9) com CONCERN não-bloqueante e mitigação documentada. Push para `main` autorizado mediante:
1. Confirmar `cohorts.slug='curso-online-padrao'` no Supabase de prod (C2).
2. João valida visualmente `/curso-online` vs `/mentoria` antes do push (C1).
3. Fix do `pnpm lint` vai como story separada de follow-up (C3).

✦ A luz está correta.
