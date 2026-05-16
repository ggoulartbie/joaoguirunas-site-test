---
name: frontend-bundle-audit
description: Auditoria de imports estáticos de libs pesadas (Three.js, tsParticles, react-pdf) — impacto no bundle inicial e fixes com dynamic import
metadata:
  type: project
  date: 2026-05-16
  author: sites-dev-alpha (Novael)
---

# Auditoria de Bundle — Libs Pesadas

## Resumo Executivo

| Lib | Peso estimado | Status atual | Impacto |
|---|---|---|---|
| `three` + `@react-three/fiber` | ~800 KB min | **SEGURO** — dynamic import com `ssr:false` + loading | 0 KB no bundle inicial |
| `@splinetool/react-spline` | ~5 MB runtime | **NÃO ENCONTRADO** — não está em uso no código | 0 KB |
| `@tsparticles/react` + `@tsparticles/slim` | ~200 KB min | **PROBLEMA CRÍTICO** — import estático na homepage | ~200 KB no bundle inicial |
| `@react-pdf/renderer` | ~500 KB min | **SEGURO** — usado apenas em API route (server-side) | 0 KB no bundle do cliente |
| `framer-motion` | ~100 KB min | Import estático em vários componentes client | Impacto menor (caching ajuda) |

**Total de bundle desnecessário no carregamento inicial: ~200 KB (tsParticles)**

---

## Detalhamento por Lib

### 1. `three` + `@react-three/fiber` + `@react-three/drei`

**Arquivos com imports estáticos:**
- `src/app/agentes/_components/scene/AgentPlanetScene.tsx` — `'use client'`, import estático de `three` e `@react-three/fiber`
- `src/app/agentes/_components/scene/SolarSystemScene.tsx` — `'use client'`, import estático
- `src/app/agentes/_components/scene/CameraRig.tsx` — `'use client'`, import estático
- `src/app/agentes/_components/scene/Planet.tsx` — `'use client'`, import estático
- `src/app/agentes/_components/scene/Starfield.tsx` — `'use client'`, import estático

**Status: SEGURO**
Os scene components têm imports estáticos de Three.js, mas eles nunca são importados diretamente por uma página. O wrapper `SolarSystemBackground.tsx` e `AgentPlanetBackground.tsx` usam `dynamic(() => import('./scene/...'), { ssr: false, loading: () => ... })`. O Three.js só entra no bundle quando o usuário navega para `/agentes`. Correto.

---

### 2. `@splinetool/react-spline` + `@splinetool/runtime`

**Status: NÃO ENCONTRADO**
Nenhum arquivo em `src/` usa essas libs. Podem estar listadas no `package.json` mas sem uso ativo. Recomenda-se remover do `package.json` para reduzir o install size do CI/Vercel (~5 MB de runtime que nunca carrega mas ocupa disco e tempo de install).

---

### 3. `@tsparticles/react` + `@tsparticles/engine` + `@tsparticles/slim` — **PROBLEMA CRÍTICO**

**Arquivo problemático:**
- `src/shared/components/ui/sparkles.tsx` — import estático de `@tsparticles/react`, `@tsparticles/engine`, `@tsparticles/slim`

**Cadeia de imports até a homepage:**
```
src/app/page.tsx
  → import { AnimatedHero } from '@/shared/components/ui/animated-hero'   ← estático
  → import { SparklesCore } from '@/shared/components/ui/sparkles'         ← estático
  → import Particles from '@tsparticles/react'                              ← estático (~200KB)
  → import { loadSlim } from '@tsparticles/slim'                            ← estático (~150KB)
```

`page.tsx` é um Server Component, mas `AnimatedHero` tem `'use client'` e é importado **estaticamente**. Isso força o tsParticles inteiro (~200-350 KB) a entrar no bundle inicial da homepage (`/`).

**Rotas afetadas:** homepage `/` (Server Component que importa estaticamente o AnimatedHero)

---

### 4. `@react-pdf/renderer`

**Arquivos:**
- `src/app/api/certificado/[code]/route.ts` — import estático de `renderToBuffer`
- `src/components/student/CertificatePDF.tsx` — import estático dos componentes PDF

**Status: SEGURO**
Ambos os arquivos são Server-side only (API route e componente sem `'use client'`). O `@react-pdf/renderer` nunca entra no bundle do cliente. O `next.config.ts` já tem `transpilePackages: ['@react-pdf/renderer']`. Correto.

---

## next.config.ts — Análise

```ts
transpilePackages: ['@react-pdf/renderer']  // correto
// Sem: experimental.optimizePackageImports
// Sem: webpack customizado para bundle splitting
// Turbopack: não configurado
// Sentry: configurado com treeshake.removeDebugLogging
```

**Oportunidade:** Adicionar `experimental.optimizePackageImports` para libs com muitos re-exports pode reduzir o bundle de `framer-motion` e `lucide-react`.

---

## Fixes Propostos — Top 3 por Impacto

### Fix #1 — CRÍTICO: `animated-hero.tsx` → dynamic import do SparklesCore (~200 KB economizados no bundle inicial)

**Arquivo:** `src/shared/components/ui/animated-hero.tsx`

```tsx
// ANTES:
import { SparklesCore } from '@/shared/components/ui/sparkles';

// DEPOIS:
import dynamic from 'next/dynamic';

const SparklesCore = dynamic(
  () => import('@/shared/components/ui/sparkles').then((m) => m.SparklesCore),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full" />
    ),
  }
);
```

**Por que funciona:** `SparklesCore` só é visível após o JS do cliente hidratar. O fallback vazio preserva o layout (a div pai já tem altura fixa `h-52 sm:h-48`). As partículas aparecem após ~200ms — imperceptível ao usuário.

---

### Fix #2 — ALTO: `animated-hero.tsx` → dynamic import do AnimatedHero em `page.tsx` (~350 KB economizados via lazy hydration)

**Arquivo:** `src/app/page.tsx`

```tsx
// ANTES:
import { AnimatedHero } from '@/shared/components/ui/animated-hero';

// DEPOIS:
import dynamic from 'next/dynamic';

const AnimatedHero = dynamic(
  () => import('@/shared/components/ui/animated-hero').then((m) => m.AnimatedHero),
  {
    ssr: false,
    loading: () => (
      <div className="w-full min-h-screen bg-black flex items-center justify-center" />
    ),
  }
);
```

**Atenção:** `page.tsx` é Server Component. Importar `AnimatedHero` estaticamente força o bundler a incluir todo o grafo de dependências client-side (tsParticles, framer-motion) no bundle do route. Com `dynamic + ssr: false`, esses chunks só são baixados após a hidratação inicial.

**Tradeoff:** O hero some durante SSR (tela preta até hidratar). Já é `'use client'` então não há conteúdo SSR perdido — o fallback já é visualmente idêntico ao estado pré-hidratação.

---

### Fix #3 — MÉDIO: Remover `@splinetool` do package.json se não estiver em uso

**Verificar e remover:**
```bash
grep -r "splinetool" package.json
# Se presente mas sem uso em src/: 
pnpm remove @splinetool/react-spline @splinetool/runtime
```

**Impacto:** ~5 MB a menos no install do Vercel/CI. Não afeta bundle do cliente (lib não está em uso), mas acelera deploys e reduz surface de segurança.

---

## Impacto Total Estimado

| Fix | Bundle inicial (economia) | Tipo |
|---|---|---|
| Fix #1 — SparklesCore dynamic | ~200 KB | Client bundle |
| Fix #2 — AnimatedHero dynamic em page.tsx | ~150 KB adicional (framer-motion lazy) | Client bundle |
| Fix #3 — Remover Spline | ~5 MB | Install/deploy time |
| **Total economia no bundle cliente** | **~350 KB** | |

**Nota sobre crashes do servidor:** O bundle grande do cliente não causa crash do servidor Node.js diretamente — o servidor renderiza HTML/RSC. O crash pode estar relacionado a: (a) OOM durante build por dependências pesadas, (b) Spline runtime sendo importado em contexto SSR sem `ssr: false`, (c) alto consumo de memória em concorrência. Com esses fixes, o build fica mais leve e o risco de OOM durante SSR é eliminado.

---

## Recomendação de Prioridade

1. **Fazer agora:** Fix #1 (SparklesCore dynamic em animated-hero) — baixo risco, alto impacto, não quebra nada
2. **Fazer agora:** Fix #2 (AnimatedHero dynamic em page.tsx) — valide visualmente no browser antes de commitar
3. **Verificar e fazer:** Fix #3 (remover Spline se não usado) — rode `grep` antes de remover
4. **Futuro:** `experimental.optimizePackageImports: ['framer-motion', 'lucide-react']` no next.config.ts
