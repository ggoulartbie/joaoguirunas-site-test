---
title: "Research: Diagnóstico de Performance — Servidor Pesado e Crashes"
type: research
agent: sites-analyst
created: 2026-05-16
tags: [research, performance, bundle, nextjs, three, spline, tsparticles]
---

# Research: Diagnóstico de Performance — Servidor Pesado e Crashes

**Decisão que informa:** Quais libs/padrões remover, lazy-load ou reconfigurar para estabilizar o servidor e reduzir o bundle
**Solicitado por:** team-lead (sprint de estabilização)

---

## Resumo executivo

Três causas raiz concentram ~90% do impacto: (1) SparklesCore com densidade 1200 partículas na home pública sem dynamic import, (2) MentoriaHeroSpline carregando `@splinetool/runtime` (~6.6MB) de forma estática na página /mentoria, e (3) Sentry Session Replay habilitado no cliente com `replaysOnErrorSampleRate: 1.0`, que carrega o SDK de replay (~100KB extra) para todos os visitantes. O dev server usa `--turbopack`, mas os crashes em produção vêm de memória e CPU no SSR/RSC.

---

## Findings

### CRÍTICO-1 — SparklesCore sem dynamic() na home pública

- **Arquivo:** `src/shared/components/ui/animated-hero.tsx:8` importa `sparkles.tsx` estaticamente
- **sparkles.tsx** carrega `@tsparticles/react` + `@tsparticles/engine` + `@tsparticles/slim` (18MB total em node_modules, JS minificado estimado ~300KB gzip ~80KB)
- **`particleDensity={1200}`** — 10x acima do default de 120 — gera loop de animação com 1200 partículas, bloqueando o thread principal em CPUs lentas
- **`fpsLimit: 120`** — sem cap de FPS razoável, força rAF a 120Hz mesmo em dispositivos móveis
- **Rota afetada:** `/` (home pública, maior volume de tráfego)
- **Tipo de render:** 'use client' — executa no browser, mas o módulo inteiro entra no bundle da home
- **Impacto:** Alta CPU no client + bundle pesado na rota de maior tráfego

### CRÍTICO-2 — MentoriaHeroSpline com import estático (sem dynamic())

- **Arquivo:** `src/app/mentoria/page.tsx:5` — `import { MentoriaHeroSpline }` **sem dynamic()**
- `MentoriaHeroSpline.tsx` usa `SplineScene.tsx` que faz `lazy(() => import('@splinetool/react-spline'))` (React.lazy, não next/dynamic)
- **Problema:** React.lazy é client-only e não tem SSR:false — o `@splinetool/runtime` (~6.6MB em disco, estimado ~500KB+ gzip) entra no bundle SSR e é avaliado no servidor mesmo sem renderizar nada
- `@splinetool/runtime` carrega cena 3D via URL externa (`prod.spline.design`) — cada request de /mentoria faz um fetch externo
- **Impacto:** Aumento de memória RSS do processo Next.js, tempo de SSR mais alto, possível OOM em serverless com pouca RAM

### ALTO-1 — Sentry Session Replay com replaysOnErrorSampleRate=1.0

- **Arquivo:** `sentry.client.config.ts:12`
- `replaysOnErrorSampleRate: 1.0` significa que 100% dos erros gravam replay completo de sessão
- O SDK de Replay do Sentry adiciona ~100-150KB ao bundle do cliente e observa DOM mutations continuamente
- Em produção com `tracesSampleRate: 0.1` os traces são limitados, mas o replay não é
- **Impacto:** CPU contínua no client (MutationObserver), latência de First Interaction

### ALTO-2 — Three.js / @react-three na rota /agentes E /curso-online

- **Arquivos:** `src/app/agentes/page.tsx:7` e `src/app/curso-online/page.tsx:9` importam `SolarSystemBackground` via `dynamic({ssr:false})` — **isso está correto**
- `src/app/agentes/[squad]/[agent]/page.tsx:8` importa `AgentPlanetBackground` via `dynamic({ssr:false})` — **correto**
- Three.js build: 8.1MB em disco, estimado ~580KB gzip no bundle
- **Avaliação:** O dynamic() com ssr:false está aplicado, então Three.js não bloqueia SSR. O risco é no client bundle size para usuários que visitam /agentes ou /curso-online
- **Impacto:** Menor — já corretamente lazy-loaded; Three.js aumenta o JS parse time no client

### ALTO-3 — @react-pdf/renderer no API route GET /api/certificado/[code]

- **Arquivo:** `src/app/api/certificado/[code]/route.ts:1`
- `renderToBuffer` é síncrono-pesado — gera PDF em memória no processo Node.js
- Sem cache: cada request gera o PDF do zero (não há `Cache-Control` de longa duração — tem `max-age=3600` mas é private/client-only)
- `transpilePackages: ['@react-pdf/renderer']` em next.config.ts indica que a lib tem incompatibilidade nativa
- **Impacto:** Spike de CPU/memória por request de certificado; pode derrubar função serverless se concorrente

### MÉDIO-1 — TipTapEditor sem dynamic() (admin-only, baixo impacto)

- **Arquivo:** `src/components/editor/TipTapEditor.tsx` — import estático de 5 pacotes @tiptap
- Usado em `LessonEditorClient.tsx` (admin — `/admin/cursos/[courseId]/aulas/[lessonId]`)
- Por ser rota de admin com baixo tráfego, impacto é menor
- Mas cada page visit do admin carrega o bundle inteiro do TipTap (~200KB estimado)

### MÉDIO-2 — Cron diário com N+1 queries por membro (fallback desabilitado, mas código existe)

- **Arquivo:** `src/app/api/cron/daily/route.ts:64` e `src/app/api/cron/hourly/route.ts:96`
- Para cada membro de cada sessão: `supabaseAdmin.auth.admin.getUserById(userId)` + query em `profiles`
- Se os crons estiverem habilitados (`CRON_FALLBACK_ENABLED=true`), com muitos membros isso seria N*2 queries
- **Mitigação atual:** `CRON_FALLBACK_ENABLED !== 'true'` retorna imediatamente — **OK por enquanto**

### MÉDIO-3 — pnpm-workspace.yaml com valores inválidos

- **Arquivo:** `pnpm-workspace.yaml` — valores são literalmente `set this to true or false` em vez de `true`/`false`
- Isso pode causar warnings ou comportamento undefined no build do Vercel
- **Impacto:** Build instável/imprevisível no CI

---

## Comparação de impacto estimado no bundle do cliente

| Lib/Feature | Tamanho disco | Bundle JS estimado (gzip) | Dynamic? | Rota | Severidade |
|---|---|---|---|---|---|
| @tsparticles (sparkles, density 1200) | 18MB total | ~80KB + CPU contínua | Não | / (home) | CRÍTICO |
| @splinetool/runtime | 6.6MB | ~500KB | Não (só React.lazy) | /mentoria | CRÍTICO |
| Three.js + @react-three/fiber + drei | 8.1MB build | ~580KB | Sim (ssr:false) | /agentes, /curso-online | ALTO (já mitigado) |
| Sentry Replay SDK | N/A | ~120KB | N/A (sempre carregado) | todas | ALTO |
| @tiptap (5 pkgs) | ~200KB est | ~150KB | Não | /admin/** | MÉDIO |
| @react-pdf (API route) | 2.8MB | N/A (server-only) | N/A | /api/certificado | ALTO (server) |

---

## Quick Wins (alto impacto, baixa complexidade)

1. **Reduzir `particleDensity` de 1200 para 80-120** em `animated-hero.tsx:64` — mudança de 1 linha, reduz CPU em ~90% na animação de partículas
2. **Reduzir `fpsLimit` de 120 para 60** em `sparkles.tsx:43` — 1 linha
3. **Trocar `React.lazy` por `next/dynamic({ssr:false})`** em `SplineScene.tsx:5` — impede que `@splinetool/runtime` entre no bundle SSR
4. **Wrapping `MentoriaHeroSpline` com `dynamic({ssr:false})`** em `mentoria/page.tsx:5` — elimina custo de SSR do runtime Spline
5. **Reduzir `replaysOnErrorSampleRate` de 1.0 para 0.2`** em `sentry.client.config.ts:12` — menos sessões gravadas, menos CPU de replay
6. **Wrapping `AnimatedHero` com `dynamic({ssr:false})`** em `app/page.tsx:3` — remove tsparticles do bundle SSR da home pública
7. **Corrigir `pnpm-workspace.yaml`** — trocar os strings literais por `true`/`false`

## Mudanças mais complexas

1. **Substituir @tsparticles por CSS animation puro** na home — elimina ~80KB de JS e a dependência de runtime inteiramente
2. **Cache de PDF do certificado via ISR ou Vercel Edge Cache** — adicionar `Cache-Control: public, max-age=86400, s-maxage=86400` no route handler do certificado (já é determinístico por código de verificação)
3. **Substituir SplineScene por vídeo/WebP animado** — @splinetool/runtime é ~6.6MB para uma cena decorativa; um WebP ou MP4 seria <1MB sem JS
4. **Lazy load TipTap no editor de admin** — wrapping com `dynamic({ssr:false})` e loading skeleton
5. **Avaliar remoção total de Three.js** de /curso-online — a `SolarSystemScene` é puramente decorativa e representa ~580KB de JS para uma página de conversão; CSS/Canvas 2D simples teria impacto menor

---

## Contexto de dev vs produção

- Dev server usa `--turbopack` — comportamento de bundle splitting difere do webpack de produção
- Crashes descritos pelo usuário são mais prováveis em **produção** (serverless/Vercel), onde cada função tem RAM limitada (~1GB default)
- `@react-pdf/renderer` com `renderToBuffer` + `@splinetool/runtime` avaliado no módulo SSR são os maiores riscos de OOM em produção

---

## Fontes
- Inspeção direta dos arquivos do repositório (`src/`, `next.config.ts`, `sentry.*.config.ts`, `pnpm-workspace.yaml`)
- Tamanhos medidos via `du -sh` em `node_modules/.pnpm/`
- Documentação Sentry Session Replay: https://docs.sentry.io/platforms/javascript/session-replay/
- Next.js dynamic() docs: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading
