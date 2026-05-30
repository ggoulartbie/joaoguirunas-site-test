---
title: "Spec UCO-1.1: Página /curso-online unificada (espelho de /mentoria)"
type: spec
story: UCO-1.1
status: approved
agent: sites-ux
created: 2026-05-30
tags: [spec, ux, curso-online, mentoria, unificacao]
---

# Spec UCO-1.1 — Página `/curso-online` unificada

## Contexto

A `/mentoria` é a página canônica com máxima conversion e experiência visual completa. O objetivo é que `/curso-online` seja estruturalmente idêntica, mas sem as secções que dependem de presença física ou de turmas ao vivo.

---

## Mapeamento secção-por-secção

| # | Secção | Fonte mentoria | Alvo curso-online | Acção |
|---|--------|---------------|-------------------|-------|
| 1 | Hero | `MentoriaHeroSpline.tsx` | `CursoOnlineHero.tsx` | **Manter Hero próprio** — ver Decisão UX-1 |
| 2 | Solução | `solution-section.tsx` | `solution-section.tsx` (compartilhado) | **Reutilizar directo** — já importado na page atual |
| 3 | Diferenciais | `mentorship-features.tsx` | `CursoOnlineDiferenciais.tsx` | **Manter componente próprio** — ver Decisão UX-2 |
| 4 | Timeline Módulos | `course-modules-timeline.tsx` | `CursoOnlineTimeline.tsx` | **Manter componente próprio, já filtrado** — ver AC3 |
| 5 | Facilitadores | inline em `mentoria/page.tsx` | inline em `curso-online/page.tsx` | **Reutilizar com bio adaptada** — já feito |
| 6 | Investimento / Pricing | `pricing-calculator.tsx` | `CursoPricingCalculator.tsx` + secção fixa R$ 797 | **Manter dois blocos** — ver Decisão UX-3 |
| 7 | Inscrição / CTA Form | `RevosForm` + secção de espera | `CheckoutForm` + grade included/not-included | **Manter CheckoutForm** — ver Decisão UX-4 |
| 8 | FAQ | `faq-accordion.tsx` | `CursoFaqAccordion.tsx` | **Manter componente próprio** — ver Decisão UX-5 |
| 9 | CTA Final | inline em `mentoria/page.tsx` | inline em `curso-online/page.tsx` | **Manter com cópia adaptada** — já feito |
| 10 | SectionDots | `section-dots.tsx` | `section-dots.tsx` (compartilhado) | **Reutilizar directo** — já importado |

---

## AC3 — Secções removidas da Timeline

A `CourseModulesTimeline` da mentoria tem 8 fases no array `PHASES` (`course-modules-timeline.tsx:23`). As 4 fases a remover:

| Índice PHASES | Label | Razão da remoção |
|---|---|---|
| 0 | `Pré-Mentoria` | Sessão 1:1 individual com Claudia — formato exclusivo da mentoria |
| 1 | `Dia Presencial` | Evento físico em Florianópolis — inexistente no assíncrono |
| 6 | `Bônus Online` | Código proprietário GrowthSales — exclusivo da mentoria |
| 7 | `Encerramento` | Apresentação presencial de projetos — inexistente no assíncrono |

**Fases mantidas:** `Semana 1`, `Semana 2`, `Semana 3`, `Semana 4` — e os encontros `QA` (ao vivo) dentro dessas fases também são removidos.

**Estado actual:** `CursoOnlineTimeline.tsx` já implementa esta filtragem correctamente. Os módulos presentes são:

| Módulo | Título | Fase |
|--------|--------|------|
| 1 | O que é possível | Fundamentos |
| 2 | Fundamentos do Claude Code | Fundamentos |
| 3 | Setup e Instalação | Fundamentos |
| 4 | Centro de Treinamento de Agentes | Fundamentos |
| 5 | Claude Design — Design System | Semana 1 |
| 6 | Squad de Sites — Github e Vercel | Semana 2 |
| 7 | Squad de Social Media | Semana 3 |
| 10 | Squad de Dev — Supabase | Semana 4 |

**Nota:** Módulo numerado 10 corresponde ao conteúdo "Semana 4" da mentoria. A numeração 8 e 9 foi pulada na mentoria (não existe conteúdo registado). Para o curso-online, manter `num: 10` conforme já está — a numeração é fiel ao material real.

**Diferença de header:** `CursoOnlineTimeline` usa badge "8 Módulos · Aprenda no Seu Ritmo" (correcto — 8 items no PHASES). A mentoria usa "Sessão 1:1 + 1 Dia Presencial + 4 Semanas". Manter versão do curso-online.

---

## Decisões UX numeradas

### Decisão UX-1 — Hero: manter `CursoOnlineHero`, não espelhar `MentoriaHeroSpline`

**Decisão:** `CursoOnlineHero` permanece. Não importar nem adaptar `MentoriaHeroSpline`.

**Justificativa:** `MentoriaHeroSpline` carrega Spline 3D (bundle pesado, LCP impactado) e toda a sua cópia é orientada a turmas ao vivo ("Turma esgotada", "Início 15 de junho", "Max. 12 pessoas"). O `CursoOnlineHero` já tem a identidade correcta: badge pulsante "Curso Online · Aulas Gravadas", H1 genérico "Agentes Claude que trabalham por você", sem datas. Espelhar o Spline não reduz fricção — aumenta tempo de carregamento sem benefício de conversão para um produto assíncrono.

**Impacto em UCO-1.2:** Nenhum. Componente já correcto.

---

### Decisão UX-2 — Diferenciais: manter `CursoOnlineDiferenciais`, não usar `MentorshipFeatures`

**Decisão:** `CursoOnlineDiferenciais` permanece.

**Justificativa:** `MentorshipFeatures` tem Card 1 "Desbloqueio Mental com Claudia Guirunas" (sessão individual presencial) e Card 2 "Turmas de No Máximo 12 Pessoas" — ambos são propostas de valor exclusivas da mentoria. Exibi-los no curso online seria enganoso. `CursoOnlineDiferenciais` já tem cards adaptados ao assíncrono (Aulas Gravadas, Ritmo Próprio, Comunidade).

**Impacto em UCO-1.2:** Nenhum. Componente já correcto.

---

### Decisão UX-3 — Pricing: manter `CursoPricingCalculator` + secção fixa R$ 797, não usar `PricingCalculator` da mentoria

**Decisão:** Manter os dois blocos de pricing do curso-online actuais: (a) `CursoPricingCalculator` (calculadora de squads com comparativo) e (b) a secção `id="inscricao"` com a grade `INCLUDED`/`NOT_INCLUDED` + card R$ 797 + `CheckoutForm`.

**Justificativa:** A `PricingCalculator` da mentoria tem `AGENT_COST = 8_700` hardcoded em múltiplos lugares e o checklist inclui "Desbloqueio mental com Claudia", "Squad personalizada para seu negócio" — conteúdos inexistentes no curso online. Reutilizar criaria discrepância de informação. A calculadora do curso-online já existe e exibe R$ 797. A secção `NOT_INCLUDED` é diferencial único do curso online que cria expectativa honesta e encaminha quem quer mais para `/mentoria` — esta fricção positiva tem valor.

**Impacto em UCO-1.2:** Nenhum. Componentes já correctos. Verificar se `CursoPricingCalculator` também usa `AGENT_COST = 797` correctamente.

---

### Decisão UX-4 — Inscrição: manter `CheckoutForm` com `cohortSlug = 'curso-online-padrao'`

**Decisão:** `CheckoutForm` permanece. `RevosForm` não é importado no curso-online.

**Justificativa:** `RevosForm` é um embed CRM de lista de espera — o modelo de venda é diferente (acesso imediato vs. espera por turma). O `CheckoutForm` processa compra directa sem atrito de espera, que é o contrato correcto para um produto assíncrono. `cohortSlug = 'curso-online-padrao'` permanece sem alteração.

**Constraint confirmada:** Não criar ou activar nova lógica de checkout — manter `cohortSlug` existente conforme instrução da story.

**Impacto em UCO-1.2:** Nenhum.

---

### Decisão UX-5 — FAQ: manter `CursoFaqAccordion`, não usar `FaqAccordion` da mentoria

**Decisão:** `CursoFaqAccordion` permanece.

**Justificativa:** `FaqAccordion` contém perguntas específicas da mentoria: "E se eu não puder ir a Florianópolis?", "As aulas online são ao vivo?" (resposta: sim), "Quanto tempo dura o programa?" (resposta: 8 encontros). Exibi-las no curso online causaria confusão directa. `CursoFaqAccordion` já tem FAQ adaptado: questão sobre diferença mentoria/curso, resposta "não" para ao vivo, garantia 7 dias documentada.

**Impacto em UCO-1.2:** Nenhum.

---

### Decisão UX-6 — Background: remover `SolarSystemBackground` do curso-online

**Decisão:** Remover `SolarSystemBackground` da `/curso-online/page.tsx`.

**Justificativa:** A `/mentoria` não usa este background. O `SolarSystemBackground` é o background da página `/agentes` (contexto de produto diferente). Usá-lo no curso-online cria inconsistência visual com a mentoria e pode causar confusão de identidade de produto. O background da mentoria é o gradient `BG_STRIPES` do Hero + fundo `#050507` / `#08080C` por secção — o curso-online já tem fundos por secção compatíveis. Remover `SolarSystemBackground` e o `<div className="relative z-10">` wrapper que o acompanha, deixando as secções ao nível normal do DOM.

**Impacto em UCO-1.2:** Alteração cirúrgica em `curso-online/page.tsx` — remover import `SolarSystemBackground` e o wrapper `<div className="relative z-10">`.

---

## Ordem final canônica das secções

```
1. SectionDots                  — importado de @/app/mentoria/section-dots
2. CursoOnlineHero              — _components/CursoOnlineHero.tsx
3. SolutionSection              — importado de @/app/mentoria/solution-section
4. CursoOnlineDiferenciais      — _components/CursoOnlineDiferenciais.tsx
5. CursoOnlineTimeline          — _components/CursoOnlineTimeline.tsx
6. Facilitadores                — inline em page.tsx (com bio adaptada da Claudia)
7. CursoPricingCalculator       — _components/CursoPricingCalculator.tsx
8. Inscrição (id="inscricao")   — inline em page.tsx: CheckoutForm + INCLUDED/NOT_INCLUDED
9. CursoFaqAccordion            — _components/CursoFaqAccordion.tsx
10. CTA Final                   — inline em page.tsx
```

Esta ordem é idêntica à da `/mentoria` (Hero → Solução → Diferenciais → Timeline → Facilitadores → Calculadora → Inscrição → FAQ → CTA), com os componentes próprios do curso-online substituindo os equivalentes da mentoria.

---

## Estado actual vs. target

| Item | Estado actual | Acção UCO-1.2 |
|---|---|---|
| Ordem das secções | Correcta | Nenhuma |
| `SolarSystemBackground` | Presente e activo | Remover import + wrapper `<div z-10>` |
| `CursoOnlineTimeline` módulos | Correctos (8 módulos Video) | Nenhuma |
| `CursoOnlineDiferenciais` | Presente | Nenhuma |
| `CursoPricingCalculator` | Presente | Verificar se `AGENT_COST = 797` |
| `CheckoutForm` | Presente com `cohortSlug` | Nenhuma |
| `CursoFaqAccordion` | Presente | Nenhuma |
| Bio Claudia | Adaptada ("mesmo conteúdo que usamos na mentoria") | Nenhuma |
| CTA Final cópia | "Comprar agora — R$ 797" | Nenhuma |

**Trabalho real para UCO-1.2:** remover `SolarSystemBackground` + seu wrapper. Todo o resto já está correcto.

---

## Wireframe de ordem (ASCII)

```
┌─────────────────────────────────────────────────────────┐
│  [SectionDots — lateral direita fixed]                  │
├─────────────────────────────────────────────────────────┤
│  HERO                                                   │
│  Badge: "Curso Online · Aulas Gravadas" [pulsing]       │
│  H1: "Agentes Claude que trabalham por você"            │
│  Sub: copy assíncrono                                   │
│  CTA: [Comprar agora] [Como Funciona ↓]                 │
│  Trust: "Acesso imediato | Garantia 7 dias | 6 meses"   │
├─────────────────────────────────────────────────────────┤
│  SOLUÇÃO                                                │
│  3 cards: Delegação / Equipa Completa / Escala          │
├─────────────────────────────────────────────────────────┤
│  DIFERENCIAIS                                           │
│  3 cards: Aulas Gravadas / Ritmo Próprio / Comunidade   │
├─────────────────────────────────────────────────────────┤
│  TIMELINE (id="modulos")                               │
│  Badge: "8 Módulos · Aprenda no Seu Ritmo"             │
│  H2: "Do Zero ao Time Completo no Seu Ritmo"           │
│  Chips: Aulas em Vídeo / 6 Meses / Fórum / Certificado │
│  ── Fundamentos ──────────────────────────────          │
│  ○ 1 · O que é possível                                │
│  ○ 2 · Fundamentos do Claude Code                      │
│  ○ 3 · Setup e Instalação                              │
│  ○ 4 · Centro de Treinamento de Agentes                │
│  ── Semana 1 ─────────────────────────────             │
│  ○ 5 · Claude Design — Design System                   │
│  ── Semana 2 ─────────────────────────────             │
│  ○ 6 · Squad de Sites — Github e Vercel                │
│  ── Semana 3 ─────────────────────────────             │
│  ○ 7 · Squad de Social Media                           │
│  ── Semana 4 ─────────────────────────────             │
│  ○ 10 · Squad de Dev — Supabase                        │
│  [Comprar — R$ 797]                                    │
├─────────────────────────────────────────────────────────┤
│  FACILITADORES (id="facilitadores")                     │
│  João Guirunas / Claudia Guirunas (bio online)          │
├─────────────────────────────────────────────────────────┤
│  INVESTIMENTO / PRICING (id="investimento")            │
│  Calculadora de squads: Equipa Tradicional vs R$ 797    │
├─────────────────────────────────────────────────────────┤
│  INSCRIÇÃO (id="inscricao")                            │
│  Esquerda: R$ 797 + INCLUDED + NOT_INCLUDED            │
│  Direita: card sticky + CheckoutForm                   │
├─────────────────────────────────────────────────────────┤
│  FAQ (id="faq")                                        │
│  CursoFaqAccordion — 9 perguntas assíncronas            │
├─────────────────────────────────────────────────────────┤
│  CTA FINAL                                             │
│  "Pronto para ter sua própria squad de agentes IA?"    │
│  [Comprar agora — R$ 797]                              │
│  "7 dias de garantia · 6 meses · Cancelamento simples" │
└─────────────────────────────────────────────────────────┘
```

---

## File List (UCO-1.1)

- `docs/smart-memory/specs/uco-curso-online-unified.md` — este arquivo
- `docs/smart-memory/agents/ux/curso-online-spec.md` — análise exploratória prévia (referência)
