---
title: "QA Verdict — dev:restart script (Restart Automático)"
type: qa-verdict
agent: sites-qa (Axilun)
created: 2026-05-16
status: CONCERNS
team: joaoguirunas-academy-investigar-servidor-restart
related:
  - "[[server-crash-analysis]]"
  - "[[project_vercel_pnpm_v10]]"
tags: [qa, verdict, devserver, restart, dx]
---

# QA Verdict — `dev:restart` Script

**Veredicto:** ⚠️ **CONCERNS** — Solução principal funciona corretamente, mas há um achado P1 fora-do-escopo e duas observações de robustez que merecem follow-up.

**Story / Escopo:** Restart automático do servidor de dev quando há colisão de porta (causa raiz: `EADDRINUSE`, conforme `[[server-crash-analysis]]`).

**Data:** 2026-05-16
**Branch:** `feat-aulas-v2`

---

## 1. Checklist Auditado

| # | Critério | Resultado | Evidência |
|---|---|---|---|
| 1 | Script funciona com porta 3000 livre | ✅ PASS | `fuser -k 3000/tcp` retorna exit 1, `;` permite `pnpm dev` continuar. Testado em `/tmp` com porta limpa. |
| 2 | Script funciona com porta 3000 ocupada | ✅ PASS | Subi `nc -l 127.0.0.1 3000`, `fuser -k` matou o processo, porta liberada antes de `pnpm dev`. |
| 3 | Sem side-effects agressivos | ✅ PASS | `fuser -k 3000/tcp` mira **somente** a porta 3000; não toca outros processos do shell, do Node, ou do sistema. Confirmado por inspeção do output: apenas o PID que escutava na 3000 foi terminado. |
| 4 | `pnpm-workspace.yaml` não foi quebrado | ✅ PASS (no escopo) | Arquivo não foi modificado neste sprint. `pnpm install` roda sem erro em pnpm v11.1.2. **Ver concern C-002 abaixo (pré-existente).** |

**Resumo:** Os 4 critérios do gate passaram para o escopo do sprint. Os concerns abaixo são pontos adicionais que o lead pediu para avaliar e/ou achados pré-existentes que cruzaram a auditoria.

---

## 2. Análise dos Pontos Extras (solicitados pelo lead)

### 2.1 Separador `;` vs `|| true &&` — Decisão Correta

**Veredicto:** ✅ A escolha de `;` foi **tecnicamente correta**.

**Análise:**
- `fuser -k 3000/tcp` retorna **exit code 1** quando a porta está livre (nada para matar). Verificado: `exit do fuser com porta livre: 1`.
- Se o script usasse `&&`, o `pnpm dev` **nunca rodaria** em ambientes onde o servidor não estava de pé antes (cenário mais comum).
- `;` ignora o exit code e segue para o próximo comando — comportamento desejado.
- `|| true && pnpm dev` seria funcionalmente equivalente (`fuser ... || true` normaliza para exit 0, depois `&& pnpm dev`), mas com mais ruído sintático.

**Recomendação:** Manter `;`. Não trocar.

### 2.2 `NODE_OPTIONS='--max-old-space-size=4096'` no script `dev`

**Veredicto:** ⚠️ **Recomendado implementar como P1, fora do escopo deste gate.**

**Análise:**
- O script atual `"dev": "next dev --turbopack"` **não** define heap size.
- A análise de `[[server-crash-analysis]]` identificou OOM como cenário real de crash em sessões longas (Three.js 8.1MB + Spline 6.6MB + tsParticles + `transpilePackages: ['@react-pdf/renderer']`).
- O default do Node V8 é ~2GB em sistemas de 64 bits — insuficiente em sessões com hot-reload intenso de componentes pesados.
- Custo da mudança: **zero** (uma flag de env). Benefício: previne classe inteira de crash.

**Recomendação:** Em uma PR separada (P1), atualizar para:
```json
"dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev --turbopack",
"dev:restart": "fuser -k 3000/tcp 2>/dev/null; pnpm dev"
```

**Por que não bloquear este gate:** A solução de `dev:restart` resolve o problema **relatado** (causa raiz = `EADDRINUSE`). OOM é um cenário diferente, ainda não observado em produção do squad, e o fix é trivial de aplicar depois.

### 2.3 `pnpm-workspace.yaml` — `true` sem aspas é aceito?

**Veredicto:** ⚠️ **Sintaxe aceita pelo YAML, mas a chave `allowBuilds` em si NÃO é a chave canônica do pnpm v10/11.**

**Análise:**

| Aspecto | Resultado |
|---|---|
| YAML interpreta `true` (sem aspas) como booleano | ✅ Sim (spec YAML 1.2) |
| `pnpm install` executa sem warnings/erros | ✅ Sim (testado com pnpm v11.1.2) |
| `pnpm` reconhece a chave `allowBuilds` | ❌ **Não — a chave canônica é `onlyBuiltDependencies` (lista)** |
| Scripts de build de `sharp` realmente rodam | ❌ **Não — `node_modules/sharp/build/Release/sharp-linux-x64.node` está ausente após install** |

**Evidência concreta:**
```
$ test -f node_modules/sharp/build/Release/sharp-linux-x64.node && echo "presente" || echo "ausente"
ausente
$ ls node_modules/sharp/
(sem diretório build/)
```

**Significado:** O `pnpm-workspace.yaml` atual **não está fazendo o que aparenta fazer**. Em pnpm v10+, scripts de build de deps não rodam por padrão (proteção contra supply-chain) e devem ser aprovados via `onlyBuiltDependencies` (em formato lista) ou via `pnpm approve-builds`. A chave `allowBuilds` parece ter sido escrita por confusão com `dangerouslyAllowAllBuilds` ou com versões anteriores.

**Formato correto (canônico pnpm v10/11):**
```yaml
onlyBuiltDependencies:
  - '@sentry/cli'
  - '@tsparticles/engine'
  - esbuild
  - sharp
```

**Por que isso NÃO bloqueia este gate:**
1. O arquivo **não foi tocado** neste sprint — é estado pré-existente.
2. O risco já está documentado em `[[project_vercel_pnpm_v10]]` da memória do projeto.
3. Em **dev local** o impacto é limitado (sharp tem fallback JS; tsparticles e esbuild não dependem de native build para funcionar mínimo).
4. Em **produção/Vercel** pode causar problemas — mas é um sprint separado.

**Recomendação:** Abrir story dedicada para corrigir `pnpm-workspace.yaml`. Não anexar ao escopo do `dev:restart`.

---

## 3. Concerns Documentados

### C-001 (P1 — fora do escopo, recomendado) — Heap size do dev server
**Issue:** Script `dev` sem `NODE_OPTIONS='--max-old-space-size=4096'`.
**Risco:** OOM em sessões longas com componentes pesados (Three.js + Spline + tsParticles).
**Próximo passo:** Story dedicada — mudança trivial, alto benefício/baixo custo.
**Referência:** `docs/smart-memory/agents/research/server-crash-analysis.md` §3.1 e §5.3.

### C-002 (P1 — pré-existente, fora do escopo) — `pnpm-workspace.yaml` com chave incorreta
**Issue:** Chave `allowBuilds` não é reconhecida pelo pnpm v10/11. Scripts de build de `sharp` não estão rodando (`sharp-linux-x64.node` ausente).
**Risco em dev:** Baixo — `sharp` tem fallback JS, tsparticles/esbuild funcionam sem native.
**Risco em prod:** Médio-alto — build do Vercel pode ter mesma situação, comprometendo otimização de imagens.
**Próximo passo:** Story dedicada para migrar para `onlyBuiltDependencies` (formato lista).
**Referência:** Memória `project_vercel_pnpm_v10`.

### C-003 (P2 — robustez) — Porta hardcoded no script
**Issue:** `dev:restart` assume porta 3000. Se o desenvolvedor rodar `pnpm dev -p 3001` ou setar `PORT=3001`, o `fuser -k 3000/tcp` matará o **processo errado** (qualquer outra coisa rodando na 3000) e o `pnpm dev` da 3001 continuará órfão.
**Risco:** Baixo — convenção do squad usa porta 3000, mas o script silenciosamente faz a coisa errada quando há override.
**Próximo passo:** Considerar:
```json
"dev:restart": "fuser -k ${PORT:-3000}/tcp 2>/dev/null; pnpm dev"
```
Mantendo a sintaxe `;`. Pode ficar para um refinamento futuro.

---

## 4. Itens Verificados Sem Issue

- ✅ `fuser` disponível no sistema (`/usr/bin/fuser`, PSmisc 23.7).
- ✅ Output stderr suprimido com `2>/dev/null` — terminal limpo quando porta livre.
- ✅ `pnpm dev` é chamado via `pnpm` (não `npm`/`yarn`) — consistente com o lockfile.
- ✅ Script não toca em arquivos do projeto, não modifica env, não escreve em disco.
- ✅ Sem dependências novas adicionadas ao `package.json` para implementar o restart (boa decisão — `fuser` é util do sistema, não dep do projeto).
- ✅ Limitação Unix-only é aceitável: o squad opera em Linux/macOS conforme contexto do projeto. Se Windows entrar no escopo, trocar para `kill-port` (devDep).

---

## 5. Veredicto Formal

```
VEREDICTO: CONCERNS
Story: dev:restart automation (team joaoguirunas-academy-investigar-servidor-restart)
Data: 2026-05-16
Checklist: 4/4 verificados (PASS no escopo)

Aprovado com observações:
- [C-001 P1] Script `dev` sem --max-old-space-size — recomendar story dedicada
- [C-002 P1] pnpm-workspace.yaml usa chave incorreta `allowBuilds` (pré-existente, sharp.node ausente)
- [C-003 P2] Porta hardcoded em 3000 — quebra com PORT customizado

Próximo passo: @sites-devops pode fazer push do dev:restart como está.
                 Abrir stories separadas para C-001 e C-002.
```

---

## 6. Decisão sobre Push

✅ **Liberado para push** o seguinte conjunto:
- `package.json` — adição do script `dev:restart`
- `docs/smart-memory/agents/research/server-crash-analysis.md` — documento de análise

⛔ **Não incluir neste push:**
- Mudanças em `pnpm-workspace.yaml` (story separada — C-002)
- Modificação do script `dev` para adicionar `NODE_OPTIONS` (story separada — C-001)

---

A luz está correta — observações documentadas, escopo respeitado, ação imediata liberada.
