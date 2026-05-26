# NAV-1.1 — Courses Popover Dropdown no Hero

**Epic:** NAV — Navegação e CTAs
**Assignee:** sites-dev-alpha
**Status:** active
**Priority:** high

---

## Contexto

O botão "Curso Online" no `AnimatedHero` aponta para `/curso-online` (1 curso). Como serão vários cursos, precisamos de um popover dropdown que expande ao clicar.

**Arquivo alvo:** `src/shared/components/ui/animated-hero.tsx`
**Novo componente:** `src/shared/components/ui/CoursesDropdown.tsx`

---

## Cursos a listar

| Título | Rota | Estado |
|---|---|---|
| Claude Agents Team | /curso-online | ATIVO — R$ 797 |
| Design com IA | /curso-design | Em breve |
| Dev com IA | /curso-dev | Em breve |
| IA & Agentes | /curso-ia-agentes | Em breve |
| Social Media & Conteúdo | /curso-social-media | Em breve |
| Bundle — os 4 cursos | /curso-bundle | Em breve |

---

## Acceptance Criteria

### AC1 — Componente `CoursesDropdown`
- [ ] `'use client'` component em `src/shared/components/ui/CoursesDropdown.tsx`
- [ ] Botão trigger com mesmo estilo dos outros CTAs do hero (border `rgba(255,255,255,0.14)`, text `white/70`, hover `white/100 + bg white/5`)
- [ ] Label do botão: `"Cursos"` (plural, não "Curso Online")
- [ ] Chevron down (lucide `ChevronDown`) rotaciona 180° quando aberto

### AC2 — Popover
- [ ] Abre/fecha via `useState` + click no trigger
- [ ] Fecha ao clicar fora (`useEffect` com `mousedown` listener no `document`)
- [ ] Fecha ao pressionar `Escape` (`useEffect` com `keydown` listener)
- [ ] Posicionado abaixo do botão com `absolute` + `top-full mt-2`
- [ ] `z-50` para ficar sobre outros elementos

### AC3 — Estilo do popover
- [ ] Background: `#0a0a0a` com `border: 1px solid rgba(255,255,255,0.10)`
- [ ] Min-width: `240px`
- [ ] Animação Framer Motion: `initial={{ opacity: 0, y: -8, scale: 0.97 }}` → `animate={{ opacity: 1, y: 0, scale: 1 }}` com `duration: 0.18`

### AC4 — Itens da lista
- [ ] Curso ATIVO (Claude Agents Team): badge laranja `#FF3A0E` com texto "Ativo", nome em branco full, `ArrowRight` icon
- [ ] Cursos Em Breve: badge cinza com "Em breve", nome em `white/50`, sem ícone de seta
- [ ] Separador visual (`<hr>`) antes do Bundle
- [ ] Hover nos itens: `bg-white/[0.04]`
- [ ] Cada item é um `<Link>` do Next.js que fecha o dropdown ao clicar

### AC5 — Integração no AnimatedHero
- [ ] Substituir o `<Link href="/curso-online">` pelo `<CoursesDropdown />`
- [ ] Wrapper com `position: relative` para o popover se posicionar corretamente
- [ ] Manter mesma estrutura do flex dos CTAs

### AC6 — Mobile
- [ ] Dropdown aparece acima dos outros botões se necessário (sem sair da viewport)
- [ ] Largura mínima de 240px funciona em telas pequenas

---

## Notas de implementação

```tsx
// Estrutura base do componente
'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'

const EMBER = '#FF3A0E'

const COURSES = [
  { title: 'Claude Agents Team', href: '/curso-online', badge: 'Ativo', active: true },
  { title: 'Design com IA', href: '/curso-design', badge: 'Em breve', active: false },
  { title: 'Dev com IA', href: '/curso-dev', badge: 'Em breve', active: false },
  { title: 'IA & Agentes', href: '/curso-ia-agentes', badge: 'Em breve', active: false },
  { title: 'Social Media & Conteúdo', href: '/curso-social-media', badge: 'Em breve', active: false },
  // separador
  { title: 'Bundle — os 4 cursos', href: '/curso-bundle', badge: 'Em breve', active: false, separator: true },
]
```

---

## QA Gate

- Testar abertura/fechamento por click, Escape e click fora
- Testar em mobile (375px)
- Verificar que não quebra o layout do hero (os 3 CTAs devem manter alinhamento)
