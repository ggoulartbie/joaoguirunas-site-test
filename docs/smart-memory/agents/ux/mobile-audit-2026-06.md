# Mobile Audit — Junho 2026

**Viewports testados:** 375×812 (iPhone SE/12) · 390×844 (iPhone 13/14) · 414×896 (iPhone Plus)  
**Método:** Inspeção estática de código-fonte (componentes, Tailwind classes, inline styles)  
**Data:** 2026-06-10  
**Auditor:** Velani (sites-ux)

---

## Sumário Executivo

O site tem responsividade parcialmente implementada. A maioria das seções usa breakpoints `sm:` / `md:` corretamente, mas há padrões inconsistentes: o padding lateral varia entre `px-5`, `px-6`, e `lg:px-[140px]`; o breakpoint de navegação é `md:` no header/NavLinks mas os layouts de conteúdo usam `sm:`; e o robô Spline está intencionalmente oculto no mobile com `hidden sm:block` sem substituto visual.

---

## P0 — Críticos

### Issue P0-01: Spline 3D invisível em /mentoria (CONFIRMADO)

**Arquivo:** `src/app/mentoria/_components/MentoriaHeroSpline.tsx:204`

```tsx
<div className="hidden sm:block absolute right-0 top-0 bottom-0 w-[58%]">
  <SplineScene ... />
</div>
```

**Diagnóstico da raiz:** `hidden sm:block` — esconde com `display:none` em qualquer viewport abaixo de `sm` (640px). É intencional no código atual, mas cria um hero que no mobile mostra apenas texto sobre fundo escuro sem elemento visual diferenciador.

**Impacto:** O hero no mobile tem `min-h-[520px]` com fundo escuro e texto à esquerda. Sem o robô, fica vazio no lado direito (que no mobile some, mas a altura de 520px permanece sem justificativa visual).

**Fix sugerido:**
- Opção A (recomendada): exibir imagem estática do robô como fallback em mobile — `<div className="sm:hidden absolute bottom-0 right-0 ..."><Image src="/images/spline-fallback.webp" .../></div>`
- Opção B: reduzir `min-h` no mobile de `520px` para `auto` ou `360px` e adicionar gradient/pattern que preencha o espaço visualmente
- Opção C: ativar Spline também no mobile com `lazy` e performance budget (risco: GPU usage em low-end)

---

### Issue P0-02: Navegação sem hamburger menu no mobile

**Arquivo:** `src/shared/components/layout/NavLinks.tsx:20`

```tsx
<nav className="hidden md:flex items-center" ...>
```

**Diagnóstico:** A nav completa está com `hidden md:flex` — fica invisível em dispositivos < 768px. Não há componente hamburger/drawer alternativo no Header ou SiteChrome.

**Impacto:** Em mobile (375-414px), o header mostra apenas logo + avatar. Nenhum link de navegação é acessível. Usuário não consegue navegar para `/mentoria`, `/curso-online`, `/open-source`, nem `/consultoria` sem digitar a URL manualmente.

**Fix sugerido:** Implementar hamburger menu com drawer lateral ou bottom sheet. Target mínimo do botão: 44×44px. Links internos + externo neste menu.

---

### Issue P0-03: Workshop slides inacessíveis no mobile

**Arquivo:** `src/app/workshop-1/WorkshopClient.tsx:57,70`

```tsx
// Slide wrapper
<div className="relative w-full h-screen overflow-hidden">
// Content
<div className="relative z-10 h-full px-20 pt-20 pb-16 flex flex-col">
```

**Diagnóstico:** `px-20` (80px) de cada lado em um viewport de 375px deixa apenas 215px de largura para conteúdo. `h-screen` em mobile com as URL bars causa overflow. Não há breakpoint responsivo.

**Impacto:** Todo o conteúdo do workshop fica cortado ou ilegível em mobile. Slides com `grid-cols-2` ou `grid-cols-4` dentro de um container de ~215px quebram completamente.

**Fix sugerido:** Trocar `px-20` por `px-6 sm:px-20`. Slides com grids precisam de `grid-cols-1 sm:grid-cols-2`. Avaliar se workshop é intencionalmente desktop-only (em caso afirmativo, adicionar aviso de "melhor em desktop" no mobile).

---

### Issue P0-04: Workshop de apresentação idêntico (`/mentoria/apresentacao`)

**Arquivo:** `src/app/mentoria/apresentacao/ApresentacaoClient.tsx` (referenciado via page.tsx)

O mesmo padrão `h-screen`, `px-20`, `grid-cols-2/3/4` sem breakpoints responsivos se aplica. Slides com cards de 12 agentes em grid de 4 colunas tornam-se ilegíveis em 375px.

**Fix sugerido:** Mesmo fix que P0-03.

---

### Issue P0-05: SquadSideNav bloqueia conteúdo em /agentes

**Arquivo:** `src/app/agentes/_components/SquadSideNav.tsx:112`

```tsx
<nav className="lg:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-30 ...">
```

**Diagnóstico:** A bottom bar de navegação por squad fica fixada no bottom em mobile/tablet. Ela sobrepõe o conteúdo scrollado sem padding compensation no container de conteúdo.

**Impacto:** O último card visível antes do bottom da tela fica parcialmente encoberto pela nav flutuante (~50px de altura). O botão "Conhecer a Mentoria" no CTA final pode ficar sobreposto.

**Fix sugerido:** Adicionar `pb-20 lg:pb-0` no container de conteúdo `<div className="relative z-10">` em `agentes/page.tsx:56`.

---

## P1 — Alta prioridade

### Issue P1-01: Typography H1 inconsistente entre páginas

| Página | H1 mobile | H1 desktop |
|---|---|---|
| `/` (AnimatedHero) | `text-5xl` (3rem) | `text-7xl` → `text-[96px]` |
| `/mentoria` (MentoriaHeroSpline) | `text-3xl` (1.875rem) | `text-4xl` → `text-5xl` |
| `/agentes` (AgentesHero) | `text-4xl` (2.25rem) | `text-5xl` → `text-6xl` |
| `/curso-online` | mesmo padrão mentoria | |

**Problema:** A home tem H1 50% maior que /mentoria no mobile. `/agentes` fica intermediário. Não há escala tipográfica consistente.

**Fix sugerido:** Adotar escala única: mobile H1 = `text-4xl` (2.25rem), desktop = `sm:text-5xl lg:text-6xl`. Revisar `/` para reduzir `text-5xl` para `text-4xl` mobile, ou documentar que a home é intencionalmente maior.

---

### Issue P1-02: Container widths inconsistentes no padding lateral

| Seção | Classe padding | Valor aprox. |
|---|---|---|
| Header | `px-4 sm:px-6 lg:px-8` | 16px mobile |
| Mentoria hero (conteúdo) | `px-6 sm:px-10 lg:px-16` | 24px mobile |
| Mentoria seções | `px-5 sm:px-6 lg:px-[140px]` | 20px mobile |
| Mentoria FAQ/inscricao | `px-5 sm:px-6 lg:px-8` | 20px mobile |
| SkillPage hero | `px-6 sm:px-10 lg:px-[140px]` | 24px mobile |
| SkillPage features | `px-6 sm:px-10 lg:px-[140px]` | 24px mobile |
| SolutionSection | `px-5 sm:px-6 lg:px-8` | 20px mobile |
| AgentesHero | `px-6 sm:px-10 lg:px-16` | 24px mobile |
| ModuloLayout presencial | `px-6 ... md:px-8` | 24px mobile |

**Problema:** Mistura de `px-4`, `px-5` e `px-6` no mobile (16px vs 20px vs 24px). Visualmente inconsistente ao scrollar entre seções.

**Fix sugerido:** Padronizar em `px-5 sm:px-6 lg:px-8` para páginas de conteúdo, ou `px-6 sm:px-10 lg:px-[140px]` para skill pages. Escolher um padrão e aplicar globalmente.

---

### Issue P1-03: Texto de descrição ilegível em alguns contextos

**Arquivo:** `src/app/mentoria/solution-section.tsx:78`
```tsx
<p className="text-sm text-white/50 leading-relaxed">
```

`text-sm` = 14px com cor `white/50` (50% opacity). Contraste resultante ~2.8:1 contra fundo escuro — abaixo do mínimo WCAG AA de 4.5:1.

**Arquivo:** `src/shared/components/ui/SkillPage.tsx:292`
```tsx
<p ... style={{ color: 'rgba(255,255,255,0.52)' }}>
  {paragraph}
</p>
```

Idem — `rgba(255,255,255,0.52)` sobre `#050507` ≈ 3.0:1.

**Fix sugerido:** Aumentar opacidade para no mínimo `white/65` (`rgba(255,255,255,0.65)`) para textos de corpo. Verificar contraste com ferramenta WCAG antes de subir.

---

### Issue P1-04: Breakpoint de navegação (md:) diferente do breakpoint de layout (sm:)

O header esconde a nav em `< md: (768px)`, mas todos os layouts de conteúdo adaptam em `< sm: (640px)`. Isso cria uma zona cega entre 640-767px onde o layout já se comporta como desktop mas a nav ainda está escondida.

**Fix sugerido:** Ao implementar hamburger menu (P0-02), definir se o breakpoint de "desktop" do site é `sm:` (640px) ou `md:` (768px) e unificar. Recomendação: usar `md:` como breakpoint do site (mais próximo dos 768px padrão do iPad mini).

---

### Issue P1-05: SolutionSection carousel — cards com width fixo

**Arquivo:** `src/app/mentoria/solution-section.tsx:185`
```tsx
<div className="w-[280px] flex-shrink-0 snap-center md:w-auto">
```

Em 375px, um card de 280px deixa apenas 95px de margem lateral total — o card de conteúdo ocupa 74% da tela. O scroll horizontal funciona, mas os cards que ficam "off-screen" não têm peek visual suficiente para sugerir que há mais.

**Fix sugerido:** Trocar `w-[280px]` por `w-[calc(100vw-64px)]` para mostrar que há um próximo card (deixar ~32px de peek).

---

## P2 — Médio (polish)

### Issue P2-01: AgentesHero — 3 CTAs empilhados em mobile

**Arquivo:** `src/app/agentes/_components/AgentesHero.tsx:59`
```tsx
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
  {/* Primary, Secondary, Tertiary */}
```

No mobile, os 3 CTAs ficam empilhados verticalmente. O terceiro ("Como instalar") tem texto com opacidade 28% — muito sutil. Tap target OK (py-3 = ~44px), mas a ordem visual pode confundir.

**Fix sugerido:** Esconder o terceiro CTA no mobile com `hidden sm:inline-flex`, já que "Como instalar" é ação secundária que não precisa de destaque no mobile.

---

### Issue P2-02: PricingCalculator — tabs horizontais sem scroll hint

**Arquivo:** `src/app/mentoria/pricing-calculator.tsx:277`
```tsx
className="flex gap-3 mb-10 sm:mb-12 overflow-x-auto sm:overflow-visible"
style={{ scrollbarWidth: 'none' }}
```

As 4 tabs (Engineering, Growth Marketing, Social Media, Branding) em overflow-x-auto sem scroll indicator visual. Em 375px, "Branding" fica cortado sem indicar que há scroll.

**Fix sugerido:** Adicionar fade gradient no lado direito como indicador de scroll: `after:content-[''] after:absolute after:right-0 after:top-0 after:bottom-0 after:w-8 after:bg-gradient-to-l after:from-[#08080C] after:pointer-events-none`.

---

### Issue P2-03: SkillPage hero — `min-h-[52vh]` pode ficar pequeno

**Arquivo:** `src/shared/components/ui/SkillPage.tsx:121`
```tsx
<section className="relative overflow-hidden flex items-end min-h-[52vh]">
```

Em 375px com `52vh` ≈ 393px. O conteúdo (breadcrumb + badge + H1 grande + description + CTAs) pode transbordar esse min-height, causando sobreposição do overlay de imagem.

**Fix sugerido:** Trocar `min-h-[52vh]` por `min-h-fit sm:min-h-[52vh]` e ajustar o padding `py-16 sm:py-20` para garantir espaço suficiente.

---

### Issue P2-04: MentoriaHeroSpline — trust strip mobile com dado desatualizado

**Arquivo:** `src/app/mentoria/_components/MentoriaHeroSpline.tsx:233`
```tsx
<span className="text-white font-semibold">12 de maio</span>
```

O trust strip mobile (`sm:hidden`) ainda mostra "12 de maio" como data, e "Turma esgotada" — inconsistente com o conteúdo do resto da página que usa "Julho 2026 — data a definir".

**Fix sugerido:** Atualizar o trust strip mobile para usar as mesmas constantes de data que o restante da página. Avaliar criar uma constante compartilhada `NEXT_TURMA_DATE`.

---

### Issue P2-05: AnimatedHero — H1 em `text-5xl` mobile com texto longo

**Arquivo:** `src/shared/components/ui/animated-hero.tsx:80`
```tsx
className="text-5xl sm:text-7xl lg:text-[96px]"
```

`text-5xl` = 3rem em 375px. O texto animado mais longo é "aprendo usando" (14 chars). Com `letterSpacing: '-0.03em'` e `lineHeight: 0.92`, cabe, mas fica muito grande para o contexto visual de uma homepage que também tem CTAs e subheadline.

**Fix sugerido:** Reduzir para `text-4xl sm:text-7xl` no mobile para dar mais espaço aos CTAs abaixo sem forçar scroll excessivo.

---

### Issue P2-06: Presencial ModuloLayout — `px-20` nos slides

**Arquivo:** `src/app/workshop-1/WorkshopClient.tsx:70` (e presencial equivalente)

Já documentado em P0-03, mas o `/mentoria/presencial` usa ModuloLayout com `px-6 py-16 md:px-8 md:py-24` que é adequado. Os módulos presenciais individuais estão OK. O problema é o WorkshopClient.

---

### Issue P2-07: Learn pages — não auditadas (código não inspecionado)

As ~11 páginas em `/learn/*` usam o mesmo `SkillPage` template ou páginas custom? Verificar se herdam os issues do SkillPage (P2-03, P1-02).

---

## Tabela Consolidada — Padrões Inconsistentes

### Typography Scale

| Elemento | /home | /mentoria | /agentes | /curso-online | Recomendação |
|---|---|---|---|---|---|
| H1 mobile | `text-5xl` | `text-3xl` | `text-4xl` | via CursoOnlineHero | Padronizar: `text-4xl` |
| H1 desktop | `text-7xl`→`96px` | `text-4xl`→`5xl` | `text-5xl`→`6xl` | — | Definir escala |
| H2 mobile | — | `text-3xl` | — | `text-3xl` | OK |
| Body texto | `text-sm/base` | `text-sm/base` | `text-base/lg` | `text-sm/base` | Usar `text-sm sm:text-base` |

### Spacing Scale (padding lateral)

| Contexto | Mobile | sm: | lg: | Status |
|---|---|---|---|---|
| Header | `px-4` | `px-6` | `px-8` | Padrão A |
| Content hero | `px-6` | `px-10` | `px-16` | Padrão B |
| Content sections | `px-5` | `px-6` | `px-8` | Padrão C |
| Skill pages | `px-6` | `px-10` | `px-[140px]` | Padrão D |

**Recomendação:** Adotar 2 padrões apenas: Layout padrão (`px-5 sm:px-6 lg:px-8`) e Layout wide (`px-6 sm:px-10 lg:px-[140px]`). Eliminar o `px-4` do header e o `px-16` do hero.

### Container Widths

| Contexto | max-width | Consistência |
|---|---|---|
| Hero content | `max-w-6xl` | OK |
| FAQ/Forms | `max-w-3xl` / `max-w-4xl` | Misturado |
| Features grid | `max-w-5xl` / `max-w-6xl` | Misturado |
| Presencial modulos | `max-w-3xl` | OK |
| Skill pages | `max-w-6xl` | OK |

**Recomendação:** Definir 3 containers: `narrow` (`max-w-3xl`), `default` (`max-w-4xl`), `wide` (`max-w-6xl`).

### Breakpoints em Uso

| Breakpoint | Pixel | Uso atual |
|---|---|---|
| `sm:` | 640px | Layout de conteúdo (maioria) |
| `md:` | 768px | NavLinks, PricingCalculator grid, ModuloLayout |
| `lg:` | 1024px | SquadSideNav desktop, padding desktop |

**Inconsistência crítica:** Nav usa `md:` mas layouts usam `sm:`. Isso cria zona 640-767px mal definida.

---

## Top 5 P0 por Área

### /mentoria (P0-01, P0-04)
1. Spline 3D invisível no mobile — adicionar fallback visual
2. Trust strip mobile com data desatualizada (P2-04 — risco reputacional)
3. Workshop `/mentoria/apresentacao` ilegível em mobile

### / home (P0-02)
1. Sem hamburger menu — navegação inacessível em mobile
2. H1 `text-5xl` excessivo — considerar `text-4xl`

### /agentes (P0-05)
1. SquadSideNav bottom bar sobrepõe conteúdo — falta `pb-20` no container
2. 3 CTAs empilhados podem confundir hierarquia (P2-01)

### /curso-online
1. Herda issues do SolutionSection (carousel sem peek visual)
2. Sem navigation no mobile (mesmo P0-02)

### /learn, /skills (Tier 3)
1. Herdam padrões do SkillPage — issue P2-03 (`min-h-[52vh]`) e padding inconsistente
2. Nav inacessível no mobile (P0-02 global)

---

## Notas para Implementação

1. **P0-02 (hamburger)** é o fix de maior impacto — resolve a navegação em TODAS as páginas de uma vez.
2. **P0-01 (Spline fallback)** pode ser resolvido com uma imagem estática de ~30KB — sem mudança arquitetural.
3. **P0-03/P0-04 (workshops)** podem ser marcados como "desktop-only" com aviso no mobile se o custo de responsividade for alto.
4. **P1-02 (padding lateral)** — refatorar globalmente usando CSS variable ou Tailwind config `container` para consistência.
5. Os issues de contraste (P1-03) devem ser verificados com ferramenta antes do fix — alguns contextos têm fundo não-uniforme que pode melhorar o contraste real.
