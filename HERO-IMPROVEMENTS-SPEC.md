# Especificação de Melhorias — Hero /mentoria

## 📋 Resumo Executivo

**Objetivo:** Melhorar conversão e clareza do KV através de ícones mais impactantes, hierarquia visual clara e elementos que reforcem a proposta de valor.

**Problemas resolvidos:**
- Ícones genéricos → Ícones que comunicam "agentes IA"
- Hierarquia fraca → Sistema de espaçamento consistente
- Falta de elementos visuais → Micro-elementos de "squad"

---

## 🎨 Design System — Ícones

### Biblioteca: **Lucide Icons**

```bash
npm install lucide-astro
```

### Paleta de Ícones Proposta

| Elemento | Ícone Atual | Novo Ícone | Significado |
|----------|-------------|------------|-------------|
| Badge "Turmas Limitadas" | Dot animado | `Zap` (raio) | Urgência + Energia |
| CTA Primário | Seta genérica | `Bot` + `ArrowRight` | Agentes IA + Ação |
| CTA Secundário | Seta para baixo | `PlayCircle` | Ver demonstração |
| Microcopy (tempo) | ⏰ emoji | `Clock` (Lucide) | Consistência visual |
| Microcopy (garantia) | ✅ emoji | `ShieldCheck` | Segurança |

---

## 📐 Hierarquia Visual

### Sistema de Espaçamento

**Escala 4px (Tailwind padrão):**
- `gap-2` (8px) — elementos internos
- `gap-3` (12px) — separação de ícones+texto
- `mt-4` (16px) — pequenos espaçamentos
- `mt-6` (24px) — espaçamentos médios
- `mt-8` (32px) — grandes espaçamentos

### Tamanhos de Fonte

**Badge:**
- Mobile: `text-[0.65rem]` → `text-xs` (0.75rem)
- Desktop: `text-[0.7rem]` → `text-sm` (0.875rem)

**Ícones:**
- Badge: `w-3.5 h-3.5` (14px)
- CTAs: `w-5 h-5` (20px)
- Microcopy: `w-4 h-4` (16px)

---

## 🧩 Componentes Novos

### 1. Badge "Turmas Limitadas" (Melhorado)

**Antes:**
```astro
<div class="inline-flex items-center gap-2 bg-[#08080C]/90 backdrop-blur-sm px-3 py-1.5 mb-3 sm:mb-4 border border-[#FF4400]/20">
  <span class="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
    <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4400] opacity-75"></span>
    <span class="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#FF4400]"></span>
  </span>
  <span class="text-[#FF4400] text-[0.5rem] sm:text-[0.6rem]">TURMAS LIMITADAS</span>
</div>
```

**Depois:**
```astro
---
import { Zap } from 'lucide-astro';
---

<div class="inline-flex items-center gap-2 bg-[#08080C]/90 backdrop-blur-sm px-3 py-2 mb-4 sm:mb-6 border border-[#FF4400]/30 hover:border-[#FF4400]/50 transition-colors">
  <Zap class="w-3.5 h-3.5 text-[#FF4400] animate-pulse" />
  <span class="text-[#FF4400] text-xs sm:text-sm font-semibold" style="font-family: 'Geist Mono', monospace; text-transform: uppercase; letter-spacing: 0.12em;">
    Apenas 8 Vagas
  </span>
</div>
```

**Mudanças:**
- ✅ Ícone `Zap` mais impactante que dot
- ✅ Texto maior e mais legível
- ✅ Especificidade: "Apenas 8 Vagas" > "Turmas Limitadas"
- ✅ Hover state para interatividade

---

### 2. CTA Primário (Melhorado)

**Antes:**
```astro
<a href="#inscricao" class="btn-primary ...">
  <span>Fale com um Especialista</span>
  <svg class="h-4 w-4"><!-- seta genérica --></svg>
</a>
```

**Depois:**
```astro
---
import { Bot, ArrowRight } from 'lucide-astro';
---

<a
  href="#inscricao"
  class="btn-primary inline-flex items-center justify-center gap-3 bg-[#FF4400] px-6 sm:px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#FF4400]/30 hover:bg-[#FF5722] hover:shadow-2xl hover:shadow-[#FF4400]/40 hover:scale-105 transition-all duration-300 w-full sm:w-auto"
  style="text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);"
>
  <Bot class="w-5 h-5 flex-shrink-0" />
  <span class="whitespace-nowrap">Monte Sua Squad de Agentes</span>
  <ArrowRight class="w-5 h-5 flex-shrink-0" />
</a>
```

**Mudanças:**
- ✅ Ícone `Bot` reforça "agentes IA"
- ✅ Copy mais específica: "Monte Sua Squad" > "Fale com Especialista"
- ✅ Hover com `scale-105` para feedback visual
- ✅ Dois ícones (esquerda + direita) para destaque

---

### 3. CTA Secundário (Melhorado)

**Antes:**
```astro
<a href="#como-funciona" class="...">
  Como Funciona
  <svg><!-- seta para baixo --></svg>
</a>
```

**Depois:**
```astro
---
import { PlayCircle } from 'lucide-astro';
---

<a
  href="#como-funciona"
  class="inline-flex items-center justify-center gap-3 border-2 border-white/40 bg-white/10 px-6 sm:px-8 py-4 text-sm sm:text-base font-semibold text-white hover:bg-white/20 hover:border-white/60 transition-all backdrop-blur-md w-full sm:w-auto"
  style="text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);"
>
  <PlayCircle class="w-5 h-5 flex-shrink-0" />
  <span>Ver Como Funciona</span>
</a>
```

**Mudanças:**
- ✅ Ícone `PlayCircle` comunica "ver demonstração"
- ✅ Border mais visível (`border-2`)
- ✅ Hover state mais evidente

---

### 4. Microcopy (Melhorado)

**Antes:**
```astro
<p class="mt-3 sm:mt-4 text-[0.7rem] sm:text-sm text-white/60">
  ⏰ Máx. 12 pessoas | ✅ Garantia 7 dias
</p>
```

**Depois:**
```astro
---
import { Clock, ShieldCheck } from 'lucide-astro';
---

<div class="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-white/70">
  <div class="inline-flex items-center gap-2">
    <Clock class="w-4 h-4 text-[#FF4400]" />
    <span>Máx. 12 pessoas</span>
  </div>
  <span class="text-white/30">|</span>
  <div class="inline-flex items-center gap-2">
    <ShieldCheck class="w-4 h-4 text-[#22C55E]" />
    <span>Garantia 7 dias</span>
  </div>
</div>
```

**Mudanças:**
- ✅ Ícones Lucide ao invés de emojis
- ✅ Cores distintas (`#FF4400` para tempo, `#22C55E` para garantia)
- ✅ Estrutura mais clara com flex

---

## 🎯 Elemento Visual Adicional: "Squad Preview"

### Micro-componente: Avatares de Agentes

Adicionar **antes dos CTAs** para reforçar visualmente "equipe de agentes":

```astro
---
import { Bot, Sparkles, Users, Code, Palette } from 'lucide-astro';
---

<!-- Squad Preview -->
<div class="mt-6 flex items-center justify-center gap-2 sm:gap-3">
  <div class="flex -space-x-2">
    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FF4400]/20 border-2 border-[#FF4400] flex items-center justify-center backdrop-blur-sm">
      <Bot class="w-4 h-4 sm:w-5 sm:h-5 text-[#FF4400]" />
    </div>
    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#8B5CF6]/20 border-2 border-[#8B5CF6] flex items-center justify-center backdrop-blur-sm">
      <Code class="w-4 h-4 sm:w-5 sm:h-5 text-[#8B5CF6]" />
    </div>
    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#22C55E]/20 border-2 border-[#22C55E] flex items-center justify-center backdrop-blur-sm">
      <Palette class="w-4 h-4 sm:w-5 sm:h-5 text-[#22C55E]" />
    </div>
    <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#0EA5E9]/20 border-2 border-[#0EA5E9] flex items-center justify-center backdrop-blur-sm">
      <Users class="w-4 h-4 sm:w-5 sm:h-5 text-[#0EA5E9]" />
    </div>
  </div>
  <div class="text-left">
    <p class="text-xs sm:text-sm text-white/90 font-semibold leading-tight">Sua Squad de Agentes</p>
    <p class="text-[0.65rem] sm:text-xs text-white/60 leading-tight" style="font-family: 'Geist Mono', monospace;">Dev • Designer • QA • PM</p>
  </div>
</div>
```

**Efeito visual:**
- 4 círculos sobrepostos com ícones de agentes
- Cores diferentes por especialidade
- Texto explicativo ao lado

---

## 🎨 Classes Tailwind — Guia de Cores

| Elemento | Cor | Classe Tailwind |
|----------|-----|-----------------|
| Primário (ação) | `#FF4400` | `bg-[#FF4400]` `text-[#FF4400]` |
| Sucesso | `#22C55E` | `bg-[#22C55E]` `text-[#22C55E]` |
| Info | `#0EA5E9` | `bg-[#0EA5E9]` `text-[#0EA5E9]` |
| Destaque | `#8B5CF6` | `bg-[#8B5CF6]` `text-[#8B5CF6]` |
| Fundo escuro | `#08080C` | `bg-[#08080C]` |
| Fundo card | `#0C0C12` | `bg-[#0C0C12]` |

---

## 📱 Mobile-First — Breakpoints

**Tailwind padrão:**
- `sm:` → 640px
- `lg:` → 1024px

**Ajustes mobile:**
- Ícones: `-1px` de tamanho no mobile
- Textos: `-0.125rem` no mobile
- Padding: `-0.5` no mobile

---

## ✅ Checklist de Implementação

### Fase 1: Setup
- [ ] Instalar `lucide-astro`: `npm install lucide-astro`
- [ ] Importar ícones necessários no topo do arquivo

### Fase 2: Badge
- [ ] Substituir dot animado por `Zap`
- [ ] Ajustar tamanho de texto (`text-xs sm:text-sm`)
- [ ] Alterar copy para "Apenas 8 Vagas"

### Fase 3: CTAs
- [ ] CTA Primário: adicionar `Bot` + `ArrowRight`
- [ ] Alterar copy para "Monte Sua Squad de Agentes"
- [ ] CTA Secundário: substituir seta por `PlayCircle`
- [ ] Adicionar hover states (scale, shadow)

### Fase 4: Microcopy
- [ ] Substituir emojis por `Clock` e `ShieldCheck`
- [ ] Reorganizar em flex com cores distintas

### Fase 5: Squad Preview (opcional)
- [ ] Adicionar componente de avatares de agentes
- [ ] Posicionar antes dos CTAs

### Fase 6: Testes
- [ ] Verificar contraste WCAG AA (mínimo 4.5:1)
- [ ] Testar em mobile (iPhone SE, 375px)
- [ ] Testar em desktop (1920px)
- [ ] Validar performance (bundle size de ícones)

---

## 🎯 Resultados Esperados

| Métrica | Antes | Depois (Esperado) |
|---------|-------|-------------------|
| **Clareza da proposta** | 6/10 | 9/10 |
| **Hierarquia visual** | 5/10 | 9/10 |
| **Consistência** | 6/10 | 10/10 |
| **Comunicação de valor** | 5/10 | 9/10 |
| **Taxa de clique no CTA** | Baseline | +15-25% |

---

## 📚 Referências

- **Lucide Icons:** https://lucide.dev/icons/
- **TailwindCSS Docs:** https://tailwindcss.com/docs
- **WCAG Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

## 🤝 Suporte

Para dúvidas sobre implementação, consulte:
- Documentação Lucide Astro: https://github.com/lucide-icons/lucide/tree/main/packages/lucide-astro
- Design System GrowthSales (se disponível)

---

**Última atualização:** 2026-03-29
**Responsável:** Uma (UX Design Expert)
**Status:** ✅ Pronto para implementação
