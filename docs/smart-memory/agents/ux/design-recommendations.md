---
title: Design Recommendations
type: ux-spec
status: active
agent: sites-ux
created: 2026-04-23
updated: 2026-04-23
tags: [ux, design, recommendations, quick-wins]
related: ["[[components]]", "[[../../project/overview]]"]
---

# Design Recommendations — joao-guirunas-site

Priorizado por impacto visual × esforço de implementação.

---

## P0 — Bloqueadores de consistência (sites-dev-alpha deve resolver antes de qualquer release)

### 1. HeroSection — accent divergente `#E8601C` vs `#FF4400`

**Componente:** `src/shared/components/sections/HeroSection.tsx`

**Problema:** O componente usa `#E8601C` como constante `ORANGE`, aplicada em:
- Background do badge social proof
- Border/color do badge
- Cor do span de destaque no H1
- `box-shadow` nos CTAs (focus ring)
- Background do botão primário
- Inline style do radial-gradient de glow de fundo

O design system do projeto define accent como `#FF4400`. Qualquer contexto onde `HeroSection` apareça quebrará a coerência cromática da marca.

**Recomendação:** Como o componente não tem importadores ativos (não referenciado em nenhum `page.tsx`), há duas opções:

| Opção | Quando escolher |
|---|---|
| **A — Deletar o arquivo** | Se o componente foi um experimento abandonado e não há plano de uso futuro |
| **B — Corrigir o accent e ativar** | Se há intenção de usar como hero alternativo (ex.: landing de campanha) |

**Decisão recomendada:** Opção A (delete) — o `AnimatedHero` em `src/shared/components/ui/animated-hero.tsx` já cumpre o papel de hero da home. `HeroSection` seria redundante e introduz risco de regressão cromática se alguém importar por engano.

**Se Opção B for escolhida** — substitua em HeroSection.tsx:
- `const ORANGE = '#E8601C'` → `const ORANGE = '#FF4400'`
- `const BG = '#111111'` → `const BG = '#08080C'` (alinhar com bg padrão do projeto)
- Remover `const BLUE = '#1E3A5F'` (sem uso no design system atual)

---

### 2. PricingCalculatorV2 — dead code com design system mais robusto que o ativo

**Componentes:**
- Ativo: `src/app/mentoria/pricing-calculator.tsx` (importado em `mentoria/page.tsx`)
- Inativo: `src/app/mentoria/pricing-calculator-v2.tsx` (não importado em nenhum lugar)

**Análise comparativa:**

| Dimensão | V1 (ativo) | V2 (inativo) |
|---|---|---|
| Accent | `#FF4400` correto | `#FF4400` correto |
| Estrutura | Squad tabs → profissionais filtrados | Lista plana de 8 profissionais |
| Painel direito | Investment card com checklist | Painel com "inclusos" + barra de economia % |
| Cálculo | Por squad selecionado (reset ao trocar squad) | Acumulativo entre todos os profissionais |
| UX da barra de progresso | Ausente | Presente (progresso visual do custo) |
| Percentual de economia | Exibido inline no savings callout | Exibido como badge animado |
| Acessibilidade das checkboxes | `<button>` com ícone check — sem `role="checkbox"` ou `aria-checked` | Idem |
| CTA | Dentro do painel direito, uppercase, `Roboto Mono` | Botão full-width, texto normal |

**Problema de UX da V1 (ativo):** Quando o usuário troca de squad, o estado de seleção é resetado — comportamento não esperado para uma calculadora de ROI onde o usuário quer comparar combinações personalizadas.

**Problema de UX da V2:** O `layoutId="card-glow"` compartilhado entre múltiplos `ProfessionalCard` ativos causa animações de transição inesperadas quando dois itens estão selecionados simultaneamente.

**Recomendação:** Substituir V1 por V2, corrigindo os dois problemas acima:

1. Remover `layoutId="card-glow"` do `ProfessionalCard` — usar apenas `transition` de opacidade/box-shadow
2. Adicionar `aria-pressed` nos botões de toggle (acessibilidade)
3. Adicionar `aria-label` descritivo em cada `ProfessionalCard` (ex: "Marketing Manager, R$ 96.000/ano, selecionado")

A V2 tem UX superior: lista plana é mais escaneável que tabs com reset de estado, e o painel de economia com percentual + barra de progresso comunica o valor da mentoria de forma mais imediata.

---

## P1 — Quick wins visuais (alto impacto, baixo esforço)

### 3. RevosForm — ausência de estado de loading visível

**Componente:** `src/app/mentoria/revos-form.tsx`

**Problema:** O container tem `min-h-[400px]` mas não exibe nenhum indicador de que o formulário está carregando enquanto o script do Revos é injetado. Em conexões lentas, o usuário vê uma área vazia por vários segundos ao chegar em `#inscricao`.

**Recomendação:** Adicionar skeleton/placeholder dentro do container enquanto o script não renderizou o form:

```
┌──────────────────────────────────────────────┐
│  [████████████████████]  ← input skeleton    │
│  [████████████████████]  ← input skeleton    │
│  [██████████]            ← input skeleton    │
│  [    Carregando...    ] ← botão desabilitado│
└──────────────────────────────────────────────┘
```

Implementação mínima: estado `isLoading: boolean` no `RevosForm`, removido quando o script dispara o evento de `load`. Exibir 3 `div` com `animate-pulse bg-white/[0.06] rounded h-10 mb-3` enquanto `isLoading`.

---

### 4. MentorshipFeatures — hover glow com `layoutId` ausente

**Componente:** `src/app/mentoria/mentorship-features.tsx`

**Problema:** O overlay de glow laranja em hover usa `position: absolute` dentro de cada card mas não tem `pointer-events-none` explícito — verificar se cliques estão passando corretamente para o conteúdo abaixo. (Não é bloqueador, mas vale confirmar durante QA.)

---

### 5. AnimatedHero — typo na documentação de componentes (não no código)

**Componente:** `src/shared/components/ui/animated-hero.tsx`

**Status:** Confirmado — o código usa `'compartilho'` (correto) no array de títulos (linha 14). O typo "compartilhho" existia apenas no arquivo `components.md` da documentação. Nenhuma ação de código necessária.

---

## P2 — Melhorias de acessibilidade

### 6. PricingCalculator (ambas versões) — checkboxes sem semântica correta

**Problema:** Botões de seleção de profissionais usam `<button>` com ícone check visual, sem `role="checkbox"` e sem `aria-checked`. Screen readers anunciam "button" sem indicar estado de seleção.

**Spec de correção:**

```tsx
<button
  role="checkbox"
  aria-checked={active}
  aria-label={`${professional.label}, R$ ${professional.cost.toLocaleString('pt-BR')}/ano`}
  onClick={onToggle}
  ...
>
```

### 7. FaqAccordion — verificar `aria-controls`

**Componente:** `src/app/mentoria/faq-accordion.tsx`

O catálogo confirma `aria-expanded` presente. Verificar se cada botão tem `aria-controls` apontando para o `id` do painel correspondente — o par é obrigatório para WCAG 2.1 AA.

---

## Resumo de prioridades para sites-dev-alpha

| # | Ação | Arquivo | Esforço |
|---|---|---|---|
| P0.1 | Deletar `HeroSection.tsx` ou corrigir accent | `src/shared/components/sections/HeroSection.tsx` | XS |
| P0.2 | Substituir PricingCalculator por V2 (com fixes) | `mentoria/page.tsx` + `pricing-calculator*.tsx` | S |
| P1.3 | Adicionar skeleton de loading no RevosForm | `src/app/mentoria/revos-form.tsx` | S |
| P1.5 | Confirmar/corrigir typo "compartilhho" | `animated-hero.tsx` | XS |
| P2.6 | `role="checkbox"` + `aria-checked` nas calculadoras | Ambas versões do `pricing-calculator` | XS |
| P2.7 | Verificar `aria-controls` no FaqAccordion | `faq-accordion.tsx` | XS |
