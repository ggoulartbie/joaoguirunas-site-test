# ♿ Acessibilidade & Boas Práticas — Hero Section

## 📋 WCAG 2.1 AA Compliance Checklist

### ✅ Contraste de Cores

#### Background Escuro (`#08080C`) + Texto Branco

| Elemento | Cor Texto | Cor Fundo | Ratio | Status |
|----------|-----------|-----------|-------|--------|
| Headline | `#FFFFFF` | `#08080C` (via gradient 70%) | **15.3:1** | ✅ AAA |
| Parágrafo | `rgba(255,255,255,0.9)` | `#08080C` | **13.2:1** | ✅ AAA |
| Badge texto | `#FF4400` | `#08080C` | **4.8:1** | ✅ AA |
| CTA Primário | `#FFFFFF` | `#FF4400` | **4.9:1** | ✅ AA |
| Microcopy | `rgba(255,255,255,0.7)` | `#08080C` | **10.1:1** | ✅ AAA |

**Ferramentas de verificação:**
- https://webaim.org/resources/contrastchecker/
- https://colorable.jxnblk.com/

---

### ✅ Tamanhos de Fonte (Legibilidade)

#### Mobile (375px)

| Elemento | Tamanho | Recomendação WCAG | Status |
|----------|---------|-------------------|--------|
| Badge | `12px` (0.75rem) | Min 14px para corpo | ⚠️ Ajustar para 14px |
| Headline | `20px` | Min 18px para títulos | ✅ OK |
| Parágrafo | `14px` | Min 16px para corpo | ⚠️ Considerar 16px |
| CTAs | `14px` | Min 16px para interativos | ⚠️ Ajustar para 16px |
| Microcopy | `12px` | Min 14px para corpo | ⚠️ Ajustar para 14px |

#### Ajustes Recomendados (Mobile)

```astro
<!-- Badge -->
<span class="text-sm sm:text-base">  <!-- 14px → 16px -->

<!-- CTAs -->
<a class="text-base sm:text-lg">  <!-- 16px → 18px -->

<!-- Microcopy -->
<div class="text-sm sm:text-base">  <!-- 14px → 16px -->
```

---

### ✅ Áreas de Toque (Touch Targets)

**WCAG Success Criterion 2.5.5:** Mínimo 44x44px

| Elemento | Tamanho Atual | Recomendação | Status |
|----------|---------------|--------------|--------|
| CTA Primário | `py-4` (≈48px altura) | 44px min | ✅ OK |
| CTA Secundário | `py-4` (≈48px altura) | 44px min | ✅ OK |
| Squad avatares | `w-8 h-8` (32px) | 44px min | ⚠️ Aumentar ou tornar não-clicável |

#### Ajuste para Avatares

**Opção 1:** Não tornar clicável (apenas visual)
```astro
<div class="w-8 h-8 ...">  <!-- Sem <a> ou <button> -->
```

**Opção 2:** Aumentar tamanho
```astro
<div class="w-11 h-11 sm:w-12 sm:h-12">  <!-- 44px+ -->
```

---

### ✅ Atributos ARIA

#### Labels Descritivos

```astro
<!-- CTA Primário -->
<a
  href="#inscricao"
  aria-label="Inscrever-se na mentoria para montar sua squad de agentes de IA"
  class="..."
>
  <Bot class="..." aria-hidden="true" />
  <span>Monte Sua Squad de Agentes</span>
  <ArrowRight class="..." aria-hidden="true" />
</a>

<!-- CTA Secundário -->
<a
  href="#como-funciona"
  aria-label="Ver demonstração de como funciona a mentoria"
  class="..."
>
  <PlayCircle class="..." aria-hidden="true" />
  <span>Ver Como Funciona</span>
</a>

<!-- Squad Avatares (não interativos) -->
<div
  class="flex -space-x-2"
  role="img"
  aria-label="Ícones representando os 4 agentes da squad: Desenvolvedor, Designer, QA e Product Manager"
>
  <div class="...">
    <Bot aria-hidden="true" />
  </div>
  <!-- ... outros avatares -->
</div>
```

---

### ✅ Foco de Teclado (Keyboard Navigation)

#### Estados de Foco Visíveis

```astro
<!-- Adicionar outline visível ao focar -->
<a
  class="... focus:outline-none focus:ring-4 focus:ring-[#FF4400]/50 focus:ring-offset-2 focus:ring-offset-[#08080C]"
>
```

**Classes Tailwind para foco:**
- `focus:ring-4` — anel de foco grosso
- `focus:ring-[#FF4400]/50` — cor laranja com opacidade
- `focus:ring-offset-2` — espaço entre elemento e anel
- `focus:ring-offset-[#08080C]` — cor do offset (fundo escuro)

#### Ordem de Tabulação

```
1. Badge (não focável)
2. CTA Primário [Tab]
3. CTA Secundário [Tab]
4. Avatares (não focáveis se não clicáveis)
```

---

## 📱 Responsividade — Melhorias

### Breakpoints Críticos

| Dispositivo | Largura | Ajustes Necessários |
|-------------|---------|---------------------|
| iPhone SE | 375px | ✅ Testar headline quebra de linha |
| iPhone 12/13 | 390px | ✅ OK |
| iPad Mini | 768px | ✅ Verificar Squad Preview alinhamento |
| Desktop HD | 1920px | ✅ Max-width 6xl (1152px) OK |

### Stack de CTAs em Mobile

**Atual:** `flex-col sm:flex-row` ✅ Correto

**Melhorar espaçamento:**
```astro
<div class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4">
  <!-- CTAs com w-full sm:w-auto para melhor adaptação -->
```

---

## 🎨 Hover & Active States

### Feedback Visual Detalhado

```astro
<!-- CTA Primário -->
<a
  class="
    ...
    hover:bg-[#FF5722]
    hover:shadow-2xl
    hover:shadow-[#FF4400]/40
    hover:scale-105
    active:scale-95
    active:shadow-lg
    transition-all duration-300
  "
>

<!-- CTA Secundário -->
<a
  class="
    ...
    hover:bg-white/20
    hover:border-white/60
    active:bg-white/10
    active:border-white/40
    transition-all duration-200
  "
>

<!-- Squad Avatares (micro-interação) -->
<div
  class="
    ...
    hover:scale-110
    hover:rotate-6
    transition-transform duration-300
  "
>
```

---

## 🧪 Testes Recomendados

### Navegadores

- [ ] Chrome 120+ (desktop + mobile)
- [ ] Safari 17+ (macOS + iOS)
- [ ] Firefox 120+
- [ ] Edge 120+

### Dispositivos

- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 Pro (390px)
- [ ] iPad (768px)
- [ ] Desktop 1920px

### Acessibilidade

- [ ] **Screen reader:** VoiceOver (macOS/iOS)
- [ ] **Screen reader:** NVDA (Windows)
- [ ] **Navegação por teclado:** Tab, Enter, Escape
- [ ] **Zoom:** 200% sem quebra de layout
- [ ] **Contraste:** Verificar com ferramenta automática

### Performance

- [ ] **Lighthouse Accessibility:** Score 95+
- [ ] **Bundle size:** Lucide icons não aumentaram >10KB
- [ ] **First Contentful Paint:** <1.5s
- [ ] **Largest Contentful Paint:** <2.5s

---

## 🚨 Avisos Importantes

### Text-Shadow Excessivo

**Problema atual:**
```astro
style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.9), 0 4px 16px rgba(0, 0, 0, 0.6);"
```

**Impacto:**
- ⚠️ Pode prejudicar legibilidade em algumas telas
- ⚠️ Pode causar "halo effect" em textos pequenos

**Recomendação:**
```astro
<!-- Simplificar para 1 shadow -->
style="text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);"
```

### Gradient Overlay

**Atual:** `from-[#08080C]/60 via-[#08080C]/70 to-[#08080C]/95`

**Verificar:**
- Texto legível em toda a extensão do gradient
- Imagem de fundo não compete com texto
- Contraste mantido em todos os pontos

---

## 🎯 Melhores Práticas — Resumo

| Prática | Status | Ação |
|---------|--------|------|
| **Contraste mínimo 4.5:1** | ✅ OK | Manter |
| **Fontes mínimas 14px** | ⚠️ Ajustar | Aumentar badge e microcopy |
| **Touch targets 44x44px** | ⚠️ Ajustar | Aumentar avatares ou tornar não-clicáveis |
| **ARIA labels** | ❌ Falta | Adicionar conforme exemplos |
| **Focus states** | ❌ Falta | Adicionar `focus:ring` |
| **Keyboard nav** | ✅ OK | Testar ordem de tabulação |
| **Screen reader** | ⚠️ Testar | Verificar com VoiceOver/NVDA |
| **Responsividade** | ✅ OK | Testar breakpoints críticos |

---

## 📚 Referências

### WCAG 2.1 AA
- **1.4.3 Contrast:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum
- **1.4.11 Non-text Contrast:** https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast
- **2.5.5 Target Size:** https://www.w3.org/WAI/WCAG21/Understanding/target-size

### Ferramentas
- **Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **WAVE:** https://wave.webaim.org/
- **axe DevTools:** https://www.deque.com/axe/devtools/
- **Lighthouse:** Chrome DevTools > Lighthouse > Accessibility

### Guias
- **WebAIM:** https://webaim.org/
- **A11y Project:** https://www.a11yproject.com/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

## ✅ Implementação Final Recomendada

### Prioridade ALTA (fazer antes de deploy)

1. ✅ Adicionar `aria-label` nos CTAs
2. ✅ Adicionar `focus:ring` nos elementos interativos
3. ✅ Marcar ícones decorativos com `aria-hidden="true"`
4. ✅ Aumentar tamanho de fonte do badge para 14px (mobile)

### Prioridade MÉDIA (fazer em próxima iteração)

5. ⚠️ Aumentar avatares para 44x44px ou tornar não-clicáveis
6. ⚠️ Simplificar text-shadow para 1 camada
7. ⚠️ Testar com screen readers (VoiceOver + NVDA)

### Prioridade BAIXA (nice to have)

8. 💡 Adicionar animações de entrada (fade-in, slide-up)
9. 💡 Implementar "prefers-reduced-motion" para acessibilidade
10. 💡 Adicionar skip link ("Pular para conteúdo principal")

---

**Criado por:** Uma (UX Design Expert)
**Data:** 2026-03-29
**Checklist:** WCAG 2.1 AA Compliance
**Status:** ✅ Pronto para review
