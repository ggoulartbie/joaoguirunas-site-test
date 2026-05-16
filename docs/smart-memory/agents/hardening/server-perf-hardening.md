---
name: server-perf-hardening
description: Investigação adversarial de resiliência — libs pesadas, error boundaries, memory leaks, server stability (2026-05-16)
metadata:
  type: project
  status: open
  investigado_em: 2026-05-16
---

# Hardening — Server Performance & Resilience

> Investigação adversarial por Kronilux. Mindset: tudo vai falhar — vamos provar.

---

## CRÍTICO

### C1 — `sparkles.tsx:45` — fpsLimit 120 na home pública
**Arquivo:** `src/shared/components/ui/sparkles.tsx:45`
**Problema:** `fpsLimit: 120` com `particleDensity: 1200` (valor passado na home, `animated-hero.tsx:64`). tsParticles rodando a 120fps com 1200 partículas no `<Canvas>` do `page.tsx` (rota `/`) consome GPU/CPU de qualquer dispositivo. Throttle no background não acontece pois `fullScreen.enable: false` mas o componente ainda está mounted e animando.
**Impacto:** Página pública de maior tráfego com animação ativa que trava celulares midrange e aquece servidores via Vercel Edge Functions durante SSR do wrapper.
**Fix:** Reduzir para `fpsLimit: 30`, `particleDensity: 80` (mobile) / `300` (desktop). Usar `matchMedia('(prefers-reduced-motion: reduce)')` para desabilitar.

### C2 — `route.ts:55` — `renderToBuffer` sem try/catch e sem timeout
**Arquivo:** `src/app/api/certificado/[code]/route.ts:55`
**Problema:** `renderToBuffer` do `@react-pdf/renderer` roda no Node.js runtime, sem `try/catch`. Se o PDF render lança (fonte remota indisponível, dado malformado, OOM), a requisição trava até timeout do Vercel (25s default) sem retornar resposta ao cliente. Com múltiplos requests simultâneos de certificados, cada um pode segurar uma instância Node por 25s.
**Impacto:** Crash silencioso + acúmulo de requisições pendentes → servidor cai.
**Fix:**
```typescript
try {
  const buffer = await Promise.race([
    renderToBuffer(element as any),
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error('PDF timeout')), 10000))
  ])
  // ...
} catch (err) {
  return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 })
}
```

### C3 — `SplineScene.tsx:5` — Spline sem ErrorBoundary
**Arquivo:** `src/shared/components/ui/SplineScene.tsx:5`
**Problema:** `lazy(() => import('@splinetool/react-spline'))` carrega runtime Spline (WebGL, WASM) sem `<ErrorBoundary>`. Se o `scene` CDN falhar (timeout, 404, CORS), a exceção não capturada propaga pela árvore React e mata a página `/mentoria` inteira — usuário vê tela branca.
**Impacto:** Página de conversão (`/mentoria`) fica inoperante quando CDN Spline está lento.
**Fix:** Adicionar `<ErrorBoundary fallback={<div />}>` envolvendo o `<Suspense>` em `SplineScene.tsx`.

---

## ALTO

### A1 — `dashboard/page.tsx` — 7 queries Supabase sem try/catch no Server Component
**Arquivo:** `src/app/(academy)/academy/(student)/dashboard/page.tsx:22-190`
**Problema:** Página executa 7 queries sequenciais e paralelas ao Supabase Admin (sem SDK timeout configurado). Zero try/catch. Se qualquer query retornar erro de rede, o Server Component lança e Next.js sobe o erro para o `error.tsx` mais próximo — que não existe nessa rota.
**Impacto:** Dashboard do aluno vira "Application error: a server-side exception has occurred" sem fallback.

### A2 — `curso/[slug]/page.tsx` — mesmo padrão: 6 queries sem try/catch
**Arquivo:** `src/app/(academy)/academy/(student)/curso/[slug]/page.tsx:63-145`
**Problema:** Idêntico ao A1. `generateMetadata` também faz query sem try/catch.

### A3 — Zero `error.tsx` em toda a árvore `/academy`
**Arquivo:** `src/app/(academy)/` (diretório inteiro)
**Problema:** `find src/app -name error.tsx` retorna vazio. Não existe nenhum `error.tsx`. Qualquer exceção não tratada em Server Components apresenta "Application error" genérico sem recovery UI.
**Impacto:** Todos os erros de Supabase/auth/fetch expõem tela de erro Next.js padrão sem botão de retry.

### A4 — `SolarSystemScene.tsx` — 4 texturas 4K-8K carregadas simultaneamente, sem suspense individual
**Arquivo:** `src/app/agentes/_components/scene/SolarSystemScene.tsx:106-111`
**Problema:** Quatro texturas (mars-8k.jpg, venus-8k.jpg, jupiter-4k.jpg, neptune-4k.jpg) são carregadas via `useLoader(THREE.TextureLoader)` dentro do mesmo `<Suspense>`. Uma textura lenta bloqueia todas. mars-8k e venus-8k pesam ~8-15MB cada. Em conexão 3G ou celular midrange → tela preta por vários segundos.
**Impacto:** INP/LCP da página `/agentes` e `agentes/[squad]/[agent]` comprometidos.

### A5 — Three.js sem dispose de geometrias e materiais
**Arquivo:** `src/app/agentes/_components/scene/Planet.tsx` / `Starfield.tsx`
**Problema:** Nenhum `useEffect` de cleanup com `.dispose()` em geometrias (`sphereGeometry`, `ringGeometry`, `bufferGeometry`), materiais (`meshStandardMaterial`, `meshBasicMaterial`, `pointsMaterial`) ou texturas. Quando o usuário navega para outra rota e o Canvas desmonta, todos esses recursos WebGL vazam na GPU — acumula em SPAs com navegação client-side.
**Impacto:** Memory leak progressivo em sessões longas → crash de tab.

---

## MÉDIO

### M1 — `sparkles.tsx:26` — `initParticlesEngine` sem guard de singleton
**Arquivo:** `src/shared/components/ui/sparkles.tsx:26-29`
**Problema:** `initParticlesEngine` é chamado em todo mount de `SparklesCore`. Se o componente montar/desmontar (HMR, Strict Mode, fast navigation), re-inicializa o engine desnecessariamente.
**Fix:** Usar o padrão `if (!isInitialized)` com variável de módulo ou checar `engine.loaded`.

### M2 — `CertificatePDF.tsx:10-12` — Font.register aponta para URL externa (Google Fonts)
**Arquivo:** `src/components/student/CertificatePDF.tsx:10-12`
**Problema:** Font register usa URL `fonts.gstatic.com`. Se a URL estiver indisponível durante renderização do PDF no servidor, `renderToBuffer` pode falhar ou demorar. A fonte é `GeistMono` mas o estilo `page.fontFamily` usa `'Helvetica'` — a fonte registrada não é usada, o `Font.register` é código morto que gera request externo desnecessário.
**Fix:** Remover o `Font.register` não utilizado.

### M3 — `AgentPlanetScene.tsx:174` — `powerPreference: 'high-performance'` sempre ativo
**Arquivo:** `src/app/agentes/_components/scene/AgentPlanetScene.tsx:174`
**Problema:** `powerPreference: 'high-performance'` força GPU dedicada em laptops com dual GPU, drenando bateria. Mobile já tem condicional, mas desktop usa sempre high-performance mesmo em cenários de baixo movimento.

### M4 — Páginas de aula sem `error.tsx` local
**Arquivo:** `src/app/(academy)/academy/(student)/curso/[slug]/aula/`
**Problema:** A página de aula é a mais crítica para o aluno. Sem `error.tsx` local, qualquer falha (Vimeo indisponível, Supabase timeout) resulta em page crash sem mensagem útil.

---

## Resumo por Prioridade

| ID | Prioridade | Arquivo | Problema |
|----|-----------|---------|----------|
| C1 | CRÍTICO | sparkles.tsx:45 | tsParticles 1200 partículas a 120fps na home |
| C2 | CRÍTICO | api/certificado/route.ts:55 | renderToBuffer sem try/catch nem timeout |
| C3 | CRÍTICO | SplineScene.tsx:5 | Spline sem ErrorBoundary — mata página /mentoria |
| A1 | ALTO | dashboard/page.tsx | 7 queries Supabase sem try/catch, sem error.tsx |
| A2 | ALTO | curso/[slug]/page.tsx | 6 queries sem try/catch |
| A3 | ALTO | (academy)/ inteiro | Zero error.tsx em toda árvore /academy |
| A4 | ALTO | SolarSystemScene.tsx | 4 texturas 4-8K em Suspense único |
| A5 | ALTO | Planet.tsx/Starfield.tsx | Zero dispose() — memory leak WebGL |
| M1 | MÉDIO | sparkles.tsx:26 | initParticlesEngine sem singleton guard |
| M2 | MÉDIO | CertificatePDF.tsx | Font.register morto fazendo request externo |
| M3 | MÉDIO | AgentPlanetScene.tsx | high-performance GPU sempre ligado |
| M4 | MÉDIO | curso/[slug]/aula/ | Sem error.tsx local na página mais crítica |

---

## Fixes Propostos para CRÍTICOs

### Fix C1 — sparkles.tsx
```tsx
// Reduzir carga e respeitar prefers-reduced-motion
const prefersReduced = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

// No options:
fpsLimit: prefersReduced ? 0 : isMobile ? 20 : 30,
// No particleDensity default:
value: prefersReduced ? 0 : (particleDensity || (isMobile ? 60 : 200)),
```

### Fix C2 — api/certificado/route.ts
```typescript
let buffer: Buffer
try {
  buffer = await Promise.race([
    renderToBuffer(element as any),
    new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 10_000)),
  ])
} catch {
  return NextResponse.json({ error: 'Erro ao gerar PDF' }, { status: 500 })
}
```

### Fix C3 — SplineScene.tsx
```tsx
// Criar SplineErrorBoundary simples
class SplineErrorBoundary extends React.Component<{children: React.ReactNode}, {error: boolean}> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    if (this.state.error) return <div className="w-full h-full" /> // fallback silencioso
    return this.props.children
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <SplineErrorBoundary>
      <Suspense fallback={<SplineLoader />}>
        <Spline scene={scene} className={className} />
      </Suspense>
    </SplineErrorBoundary>
  )
}
```
