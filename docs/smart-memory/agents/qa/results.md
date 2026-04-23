---
title: QA Results
type: qa-log
updated: 2026-04-23
tags: [qa, veredictos]
---

# QA Results — Veredictos formais

Histórico de veredictos emitidos pelo sites-qa (Axis-S).

## 2026-04-23 — Story 2.1 — ✅ PASS (com 1 CONCERN não-bloqueante)

**Story:** 2.1 — Promover PricingCalculator V2 + fixes (layoutId + a11y)
**Arquivo:** `src/app/mentoria/pricing-calculator.tsx`
**Commit:** `bf0795e`
**Branch:** `main`

### 10-point checklist

| # | Critério | Resultado |
|---|---|---|
| 1 | Code review — patterns, legibilidade, manutenibilidade | ✅ |
| 2 | Acceptance criteria — AC1–AC10 | ✅ (AC10 spot-check manual) |
| 3 | Sem regressões — build + typecheck | ✅ `pnpm build` + `tsc --noEmit` limpos |
| 4 | Performance — componente client, animações já existentes | ✅ sem mudança |
| 5 | Acessibilidade — WCAG 2.1 AA | ✅ `aria-pressed` + `aria-label` + `role="group"` |
| 6 | SEO — metadata, estrutura | ✅ sem mudança |
| 7 | Responsivo — mobile/tablet/desktop | ✅ classes responsivas preservadas |
| 8 | Copy | ✅ sem mudança |
| 9 | Cross-browser | ✅ APIs padrão (button + aria-pressed) |
| 10 | Security — inputs validados | ✅ N/A (sem inputs) |

### Pontos validados

- `aria-pressed={active}` em `<motion.button type="button">` — padrão WAI-ARIA correto para toggle de seleção múltipla. Não deve ser `role="checkbox"` (checkbox implica form control; aqui é UI de calculadora).
- `aria-label` template: `"${label}, R$ ${cost}/ano, ${selecionado|não selecionado}"` — screen reader anuncia estado textual + estado do botão (redundância acessível).
- `role="group"` + `aria-label` no wrapper dos cards (linha 225-227) fornece contexto semântico à coleção.
- `layoutId="card-glow"` removido do pricing-calculator. `layoutId="nav-underline"` em `mentoria-nav.tsx:111` é uso legítimo (tab underline compartilhada).
- `toggle()` (linha 155-165) mantém imutabilidade com `Set`; `active={selected.has(prof.id)}` passa estado correto; behavior preservado.
- Nenhuma referência remanescente a `role="checkbox"` / `aria-checked` em `src/app/mentoria/`.

### CONCERNS (não-bloqueantes)

1. **[CONCERN-1]** AC10 — validação via screen reader real (VoiceOver/NVDA) pendente de spot-check manual do dev/usuário. Semântica ARIA está correta; falta apenas verificação auditiva.
2. **[CONCERN-2]** Classe `truncate` no `<p>` de label (linha 107) pode cortar labels longos visualmente. Todos os 8 labels atuais cabem — não é regressão desta story (já existia no V2). Documentar como follow-up caso novos profissionais sejam adicionados.

### Veredicto

```
VEREDICTO: PASS
Story: 2.1 | Data: 2026-04-23
Checklist: 10/10 verificados
Issues: 2 CONCERNS não-bloqueantes (validação manual SR + truncate futuro)
Próximo passo: @sites-devops push (observações documentadas)
```
