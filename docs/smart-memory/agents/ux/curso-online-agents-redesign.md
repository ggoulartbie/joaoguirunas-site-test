# Spec: Redesign da Seção de Agentes em /curso-online

**Status:** Pronto para implementação  
**Arquivo alvo principal:** `src/app/curso-online/_components/CursoSquadSection.tsx`  
**Arquivos secundários:** `src/app/agentes/_components/AgentBelt.tsx`, `src/app/curso-online/page.tsx`

---

## 1. Tamanho dos cards — BELT_CARD_W de 220 → 110

O `BELT_CARD_W` atual é `220` e o `BELT_GAP` é `12` (ambos em `AgentBelt.tsx`).

**Problema:** `CursoSquadSection.tsx` importa e usa diretamente os valores de `AgentBelt.tsx`. Alterar `BELT_CARD_W` no arquivo original quebraria `/agentes`. A solução correta é declarar constantes locais em `CursoSquadSection.tsx` e passá-las via props para um novo componente de belt ou diretamente no JSX.

**Valores novos (apenas para /curso-online):**

```ts
const CURSO_BELT_CARD_W = 110;
const CURSO_BELT_GAP = 8;
```

**Como aplicar no `CursoSquadSection.tsx`:**

Substituir a linha:
```ts
const totalWidth = agentes.length * (BELT_CARD_W + BELT_GAP);
```
Por:
```ts
const totalWidth = agentes.length * (CURSO_BELT_CARD_W + CURSO_BELT_GAP);
```

E no `beltX useTransform`, a extensão de scroll já se auto-ajusta pois usa `totalWidth` calculado.

No JSX do belt, substituir `<AgentBelt>` por inline `motion.div` com os cards `CursoAgentCard` (ver seção 2), ou criar `CursoAgentBelt` local que aceita `cardW` e `gap` como props.

---

## 2. Variante de card sem link — CursoAgentCard

Criar `src/app/curso-online/_components/CursoAgentCard.tsx` baseado em `AgentCard.tsx` com as seguintes diferenças:

| Elemento | Estado atual (AgentCard) | Estado novo (CursoAgentCard) |
|---|---|---|
| Wrapper | `<Link href={href}>` | `<div>` |
| hover translate | `hover:-translate-y-0.5` | remover |
| hover arrow SVG | presente (bottom-right, opacity-0→100 on hover) | remover completamente |
| backdrop-blur | `backdrop-blur-md` | remover |
| Image sizes | `"(max-width: 768px) 160px, 220px"` | `"(max-width: 768px) 80px, 110px"` |

**Conteúdo do body (simplificado para escala menor):**

Manter apenas:
- `codename || name` (h3, fonte display-serif, text-xs)
- `agente.id` (codename monospace, text-[8px])

Remover:
- `agente.title` (linha `{agente.title && ...}`)
- `agente.squadRole || agente.description` (parágrafo longo)

O card em 110px de largura não tem espaço visual para body text. Nome + codename é suficiente para identificação.

**Body padding:** reduzir de `p-2 sm:p-3` para `p-1.5`.

**Squad badge (top-left):** manter — é o único identificador de contexto.  
**Model badge (top-right):** remover — muito pequeno para ser legível em 110px.

---

## 3. Remoção de blur — três locais em page.tsx

Localizar e alterar em `src/app/curso-online/page.tsx`:

### 3a. Stats bar (linha ~243)
```diff
- style={{ ..., backdropFilter: 'blur(12px)' }}
+ style={{ ..., background: 'rgba(5,5,7,0.92)' }}
```
Compensar removendo `backdrop-filter` com fundo levemente mais opaco para manter legibilidade.

### 3b. Container de squads (linha ~265)
```diff
- style={{ background: 'rgba(5,5,7,0.6)', backdropFilter: 'blur(4px)' }}
+ style={{ background: 'rgba(5,5,7,0.6)' }}
```

### 3c. Nenhum blur adicional identificado em CursoSquadSection.tsx

O `backdrop-blur-md` do `AgentCard` original é o terceiro ponto, resolvido criando `CursoAgentCard` sem a classe (seção 2 acima).

---

## 4. Altura da seção de squads — min-h-[150vh] → 80vh

Em `CursoSquadSection.tsx`, linha ~98:

```diff
- <div className="hidden lg:block min-h-[150vh]">
+ <div className="hidden lg:block min-h-[80vh]">
```

**Raciocínio:** `150vh` por squad significa que para 4 squads o usuário percorre 6 viewports apenas nesta seção antes de ver o conteúdo do curso. Com cards menores (110px) o belt é visualmente mais rápido de processar; `80vh` mantém o efeito sticky sem prender o scroll por tempo excessivo.

Se ainda parecer lento após teste, pode reduzir para `60vh`. Não ir abaixo de `60vh` — abaixo disso o sticky não tem tempo suficiente para a animação de entrada/saída ser percebida.

---

## 5. Ordem das seções em page.tsx — confirmação

A ordem atual já é correta. O conteúdo do curso está **depois** da seção de agentes:

```
1. Hero
2. Stats bar
3. Seção de squads/agentes  ← CursoSquadSection × 4
4. Facilitadores
5. Módulos
6. Calculadora de precificação
7. O que está incluído
8. Para quem é
9. Depoimentos
10. Garantia
11. FAQ
12. Preço + CTA final
```

O usuário sentiu que o conteúdo foi suprimido provavelmente por causa de `min-h-[150vh] × 4 squads = 600vh` de scroll antes de chegar em Facilitadores/Módulos. Reduzir para `80vh` resolve a percepção sem alterar a ordem.

---

## Resumo de arquivos a criar/modificar

| Ação | Arquivo |
|---|---|
| Criar | `src/app/curso-online/_components/CursoAgentCard.tsx` |
| Modificar | `src/app/curso-online/_components/CursoSquadSection.tsx` |
| Modificar | `src/app/curso-online/page.tsx` |
| Não alterar | `src/app/agentes/_components/AgentCard.tsx` |
| Não alterar | `src/app/agentes/_components/AgentBelt.tsx` |
