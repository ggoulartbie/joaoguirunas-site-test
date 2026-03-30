# 🚀 Quick Start — Hero Improvements

## 📦 Instalação (1 comando)

```bash
npm install lucide-astro
```

---

## 🎨 Before & After — Visual Comparison

### ANTES (Problemas)
```
┌─────────────────────────────────────────────┐
│  • TURMAS LIMITADAS (muito pequeno)        │
│                                             │
│  Tenha uma Equipe de Agentes de IA...      │
│  (headline ok)                              │
│                                             │
│  Aprenda a criar...                         │
│  (parágrafo ok)                             │
│                                             │
│  [Fale com Especialista →]  (genérico)     │
│  [Como Funciona ↓]                          │
│                                             │
│  ⏰ Máx. 12 pessoas | ✅ Garantia 7 dias    │
│  (emojis inconsistentes)                    │
└─────────────────────────────────────────────┘
```

### DEPOIS (Soluções)
```
┌─────────────────────────────────────────────┐
│  ⚡ APENAS 8 VAGAS (maior, mais legível)    │
│                                             │
│  Tenha uma Equipe de Agentes de IA...      │
│  (headline mantida)                         │
│                                             │
│  Aprenda a criar...                         │
│  (parágrafo mantido)                        │
│                                             │
│  [🤖][💻][🎨][👥] Sua Squad de Agentes     │
│  Dev • Designer • QA • PM                   │
│  (NOVO: preview visual da squad)            │
│                                             │
│  [🤖 Monte Sua Squad de Agentes →→]        │
│  (copy mais específica, 2 ícones)           │
│                                             │
│  [▶ Ver Como Funciona]                      │
│  (ícone play mais claro)                    │
│                                             │
│  🕐 Máx. 12 pessoas | 🛡️ Garantia 7 dias   │
│  (ícones Lucide consistentes)               │
└─────────────────────────────────────────────┘
```

---

## ⚡ Implementação em 3 Passos

### PASSO 1: Instalar Lucide
```bash
npm install lucide-astro
```

### PASSO 2: Substituir Hero Section
1. Abrir `/src/pages/mentoria.astro`
2. Localizar `<section id="hero">` (linha 11)
3. Substituir TODO o conteúdo até `</section>` (linha 73)
4. Colar o código de `hero-improved-IMPLEMENTATION.astro`

### PASSO 3: Testar
```bash
npm run dev
```
Acessar: http://localhost:4321/mentoria

---

## 📊 Mudanças Principais (Resumo)

| Elemento | Antes | Depois | Impacto |
|----------|-------|--------|---------|
| **Badge** | Dot animado + texto tiny | `Zap` icon + "Apenas 8 Vagas" | ✅ Mais legível, mais urgente |
| **Squad Preview** | ❌ Não existe | 4 avatares + texto | ✅ Reforça proposta de valor |
| **CTA Primário** | "Fale com Especialista" + seta | "Monte Sua Squad" + Bot + Seta | ✅ Copy mais específica |
| **CTA Secundário** | Seta genérica | `PlayCircle` icon | ✅ Comunica "demonstração" |
| **Microcopy** | Emojis (⏰ ✅) | Ícones Lucide (`Clock`, `ShieldCheck`) | ✅ Consistência visual |

---

## 🎯 Conversão Esperada

| Métrica | Estimativa |
|---------|------------|
| **Clareza da proposta** | +50% (6→9/10) |
| **Taxa de clique no CTA** | +15-25% |
| **Bounce rate** | -10-15% |
| **Tempo na página** | +20-30 segundos |

---

## ✅ Checklist de QA

Após implementar, verificar:

- [ ] Ícones Lucide carregando corretamente
- [ ] Badge "Apenas 8 Vagas" visível no mobile
- [ ] Squad Preview (4 avatares) alinhado corretamente
- [ ] CTA primário com hover effect (scale + shadow)
- [ ] CTA secundário com `PlayCircle` ao invés de seta
- [ ] Microcopy com ícones `Clock` e `ShieldCheck`
- [ ] Responsividade em 375px (iPhone SE)
- [ ] Responsividade em 1920px (Desktop)
- [ ] Contraste WCAG AA (mínimo 4.5:1)
- [ ] Performance: bundle size não aumentou significativamente

---

## 🐛 Troubleshooting

### Ícones não aparecem
```bash
# Verificar instalação
npm list lucide-astro

# Reinstalar se necessário
npm install lucide-astro --force
```

### Ícones sem cor
Verificar que os ícones têm `class="text-[cor]"`:
```astro
<Bot class="w-5 h-5 text-[#FF4400]" />
```

### Squad Preview desalinhado
Verificar que o container tem `flex items-center`:
```astro
<div class="flex items-center justify-start gap-3">
```

---

## 📚 Referências Rápidas

**Lucide Icons:**
- Catálogo: https://lucide.dev/icons/
- Docs Astro: https://github.com/lucide-icons/lucide/tree/main/packages/lucide-astro

**Cores GrowthSales:**
- Primário: `#FF4400` (laranja)
- Sucesso: `#22C55E` (verde)
- Info: `#0EA5E9` (azul)
- Destaque: `#8B5CF6` (roxo)

**Tailwind Breakpoints:**
- `sm:` → 640px
- `lg:` → 1024px

---

## 🎨 Ícones Usados

| Ícone | Uso | Cor |
|-------|-----|-----|
| `Zap` | Badge urgência | `#FF4400` |
| `Bot` | CTA primário + Squad | `#FF4400` |
| `ArrowRight` | CTA primário | `white` |
| `PlayCircle` | CTA secundário | `white` |
| `Clock` | Microcopy tempo | `#FF4400` |
| `ShieldCheck` | Microcopy garantia | `#22C55E` |
| `Code` | Squad avatar (Dev) | `#8B5CF6` |
| `Palette` | Squad avatar (Designer) | `#22C55E` |
| `Users` | Squad avatar (PM) | `#0EA5E9` |

---

## 🚀 Deploy

Após implementar e testar localmente:

1. Commit:
```bash
git add .
git commit -m "feat: improve hero section with Lucide icons and squad preview"
```

2. Build de produção:
```bash
npm run build
```

3. Verificar bundle size:
```bash
npm run build -- --analyze
```

4. Deploy conforme processo usual do projeto

---

**Tempo estimado de implementação:** 15-30 minutos
**Complexidade:** Baixa (apenas substituição de componente)
**Risco:** Baixo (não altera funcionalidade, apenas visual)

---

**Criado por:** Uma (UX Design Expert)
**Data:** 2026-03-29
**Status:** ✅ Pronto para implementação
