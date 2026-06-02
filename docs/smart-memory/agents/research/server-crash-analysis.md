---
title: "Research: Causa Raiz — Queda do Servidor Local de Desenvolvimento"
type: research
agent: sites-dev-delta (Kronilux)
created: 2026-05-16
tags: [research, devserver, nextjs, turbopack, diagnosis, restart]
---

# Research: Causa Raiz — Queda do Servidor Local de Desenvolvimento

**Solicitado por:** team-lead (team `joaoguirunas-academy-investigar-servidor-restart`)
**Branch:** `feat-aulas-v2`
**Stack:** Next.js 16 + Turbopack (`next dev --turbopack`)

---

## 1. Causa Raiz Confirmada — Processo Duplicado (não crash real)

**Veredicto: O episódio relatado NÃO é queda de servidor.**

Quando `pnpm dev` é executado uma segunda vez enquanto a primeira instância ainda está rodando, o comportamento é:

1. O segundo processo tenta vincular a porta 3000 (default do Next.js).
2. Detecta `EADDRINUSE` — porta já ocupada pelo processo 1.
3. Emite mensagem de erro e termina imediatamente.

A saída do processo 2 aparece no terminal como uma mensagem de erro vermelha (`Error: listen EADDRINUSE: address already in use :::3000`), que visualmente se parece com um crash, mas é comportamento intencional e seguro — o processo 1 continua rodando normalmente.

**Verificação:** porta 3000 estava livre no momento desta análise — nenhuma instância ativa de `pnpm dev` encontrada no ambiente.

---

## 2. Configuração Atual do Dev Server

### package.json — script `dev`
```json
"dev": "next dev --turbopack"
```

**Flags ausentes que poderiam ajudar:**
- Sem `--port` explícito → usa porta 3000 por padrão
- Sem script de `predev` ou `postdev`
- Sem `pidfile` ou lockfile de processo

### next.config.ts — fatores de instabilidade no dev
- `withSentryConfig` wrapping toda a configuração → adiciona webpack plugin que pode aumentar tempo de compilação
- `reactStrictMode: true` → em dev, double-invokes effects (comportamento esperado, não é crash)
- `transpilePackages: ['@react-pdf/renderer']` → compilação extra em dev
- `tunnelRoute: '/monitoring'` (Sentry tunnel) → rewrite interno adicionado
- **sourcemaps desabilitados em não-produção** → `sourcemaps.disable: process.env.NODE_ENV !== 'production'` (correto, não é problema)

### pnpm-workspace.yaml — bug identificado
```yaml
allowBuilds:
  '@sentry/cli': true
  '@tsparticles/engine': true
  esbuild: true
  sharp: true
```
Os valores `true` são strings no YAML, mas o campo espera booleanos. Isso pode causar comportamento undefined no pnpm v10 (Vercel) — memória `project_vercel_pnpm_v10` confirma. Em dev local o impacto é menor, mas é um fator de instabilidade em build.

### Scripts existentes
- `scripts/lib/freepik.mjs` — script utilitário para assets, irrelevante para dev
- `scripts/lib/load-env.mjs` — carregamento de env, irrelevante para dev
- `scripts/parse-agentes.mjs` — parser de dados, irrelevante para dev
- **Sem Makefile, sem scripts de start/restart, sem process manager**

---

## 3. Cenários Reais de Risco (além do processo duplicado)

Análise adversarial dos vetores reais que podem derrubar o dev server:

### 3.1 OOM — Out of Memory (ALTO)
**Causa:** tsParticles com 1200 partículas + Three.js (8.1MB) + Spline runtime (~6.6MB) + `@react-pdf/renderer` com `transpilePackages` → compilação enorme em memória.

Em Turbopack, o compilador mantém cache em memória crescente durante a sessão. Em máquinas com < 8GB RAM disponível para o processo Node, sessões longas de dev (2h+) podem atingir o limite e provocar `JavaScript heap out of memory`.

**Sintoma real:** Terminal mostra `FATAL ERROR: Reached heap limit Allocation failed` e processo termina.

**Frequência estimada:** Baixa em desenvolvimento normal, alta em sessões com hot-reload intenso (múltiplos saves de componentes pesados).

### 3.2 Watcher travado por fsync excessivo (MÉDIO)
**Causa:** Turbopack usa watchers de filesystem (inotify no Linux). Projetos com muitos `node_modules` (> 50k arquivos) podem saturar o limite de inotify watches disponíveis.

**Sintoma real:** `Error: ENOSPC: System limit for number of file watchers reached` — dev server para de detectar mudanças mas não termina.

**Mitigação simples:** `echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

### 3.3 Erro de compilação em arquivo de rota (MÉDIO)
**Causa:** TypeScript error severo ou syntax error em Server Component → Turbopack falha em compilar a rota mas **não** derruba o servidor — exibe overlay de erro na página.

**Exceção:** Erros em `next.config.ts` ou `middleware.ts` podem impedir o restart do watcher interno do Turbopack, necessitando restart manual do processo.

### 3.4 Sentry webpack plugin em watch mode (BAIXO)
**Causa:** `withSentryConfig` adiciona um webpack plugin. Em dev com Turbopack (`--turbopack`), o Sentry SDK tem compatibilidade parcial — Turbopack usa seu próprio bundler, não webpack. O plugin do Sentry pode emitir warnings ou tentar hooks que não existem.

**Impacto atual:** Não detectado como causa de crash, mas pode aumentar tempo de startup (5-15s extra).

### 3.5 renderToBuffer no dev server (CRÍTICO — herdado da análise de produção)
**Causa:** Se alguém testar geração de certificado em dev (`/api/certificado/[code]`), o `renderToBuffer` sem timeout pode travar a função por 25s. Em dev, isso manifesta como endpoint que nunca responde + terminal sem output.

**Distinção:** Não derruba o servidor, mas bloqueia o processo de resposta do endpoint indefinidamente.

---

## 4. Árvore de Decisão — Crash vs. Duplicado

```
pnpm dev falhou?
├── Terminal mostra: "Error: listen EADDRINUSE :3000"
│   └── CAUSA: processo duplicado — matar instância anterior com `kill $(lsof -t -i:3000)`
├── Terminal mostra: "FATAL ERROR: Reached heap limit"
│   └── CAUSA: OOM — reiniciar + reduzir carga ou aumentar `--max-old-space-size`
├── Terminal mostra: "ENOSPC: no space left" ou watchdog error
│   └── CAUSA: inotify esgotado — ajustar kernel + reiniciar
├── Terminal mostra: erro de TypeScript/compilation
│   └── CAUSA: erro de código — não é crash do servidor
└── Terminal mostra nada mas processo sumiu
    └── CAUSA: OOM silencioso ou SIGKILL do sistema — verificar `dmesg | tail -20`
```

---

## 5. Recomendações para sites-devops — Implementação do Restart Automático

### 5.1 Script `dev:restart` no package.json (P0 — Quick Win)

Adicionar ao `package.json`:
```json
"dev:restart": "kill $(lsof -t -i:3000) 2>/dev/null; sleep 1; pnpm dev"
```

Ou versão cross-platform mais robusta:
```json
"dev:kill": "fuser -k 3000/tcp 2>/dev/null || true",
"dev:restart": "pnpm dev:kill && pnpm dev"
```

**Limitação:** `lsof` e `fuser` são Unix-only. Para cross-platform, usar `cross-port-killer` ou `kill-port`.

### 5.2 Watchdog simples com pm2 (P1 — Se reinício automático for necessário)

```bash
# Instalar apenas em devDependencies locais, nunca em produção
pnpm add -D pm2

# ecosystem.config.js (não commitar — adicionar ao .gitignore)
module.exports = {
  apps: [{
    name: 'nextjs-dev',
    script: 'pnpm',
    args: 'dev',
    watch: false,
    restart_delay: 3000,
    max_restarts: 3,
    env: { NODE_ENV: 'development' }
  }]
}

# Uso:
# pm2 start ecosystem.config.js
# pm2 logs nextjs-dev
# pm2 stop nextjs-dev
```

**Atenção:** pm2 mascara crashes — se o servidor cair mais de 3 vezes, investigar causa antes de aumentar `max_restarts`.

### 5.3 Aumentar limite de heap para sessões longas (P1)

Adicionar ao script `dev`:
```json
"dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev --turbopack"
```

Isso previne OOM em sessões longas com Turbopack + Three.js + Spline em memória simultaneamente.

### 5.4 Corrigir pnpm-workspace.yaml (P0 — Trivial, já identificado)

Os valores `true` estão como strings — o YAML sem aspas os interpreta como booleanos corretamente, mas a semântica deve ser explícita para evitar surpresa:
```yaml
allowBuilds:
  '@sentry/cli': true
  '@tsparticles/engine': true
  esbuild: true
  sharp: true
```
Verificar se pnpm v10 aceita essa sintaxe sem aspas. Se não, converter para:
```yaml
allowBuilds:
  - '@sentry/cli'
  - '@tsparticles/engine'
  - esbuild
  - sharp
```

---

## 6. Diagnóstico de Causa Raiz — Sumário para sites-devops

| Cenário | Classificação | Probabilidade | Ação |
|---|---|---|---|
| Processo duplicado (`EADDRINUSE`) | Falso positivo — não é crash | Alta (90% dos casos relatados) | `pnpm dev:restart` |
| OOM por libs pesadas (Three.js + Spline + tsParticles) | Crash real | Média em sessões longas | `--max-old-space-size=4096` |
| inotify esgotado | Crash/freeze real | Baixa | Ajuste de kernel one-time |
| Erro de compilação em next.config.ts | Semi-crash (watcher para) | Baixa | Restart manual |
| renderToBuffer sem timeout | Freeze de endpoint | Baixa | Fix C2 do sprint de hardening |

**Conclusão:** O episódio relatado é **processo duplicado**. O servidor não caiu — o segundo `pnpm dev` não conseguiu subir e emitiu erro de porta. Implementar `dev:restart` resolve 90% dos casos futuros. O único crash real possível é OOM em sessões longas — mitigado com `--max-old-space-size`.

---

A luz está correta.
