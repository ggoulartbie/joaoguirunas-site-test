# Brandbook Icons — Tokens de Referencia

**Fonte:** https://brand.aioxsquad.ai/brandbook/icons
**Data:** 2026-04-04

---

## Tamanhos

| Tamanho | Uso |
|---------|-----|
| **16px** | Inline, espacos compactos |
| **24px** | Default/UI (viewBox base canonical) |
| **32px** | Cards, enfase |
| **48px** | Hero, features |

## Stroke

| Propriedade | Valor |
|-------------|-------|
| Stroke width | **2px** (em todos os tamanhos) |
| Stroke linecap | `round` |
| Stroke linejoin | `round` |
| Fill | `none` (somente outline, sem preenchimento) |

## Cores

| Variante | CSS Variable | Uso |
|----------|-------------|-----|
| Default | `var(--cream)` | Texto/icone padrao |
| Brand | `var(--lime)` / `#D1FF00` | Accent, destaque |
| Muted | `var(--dim)` / `#666` | Secundario |
| Error | `var(--error)` | Destrutivo |
| Info | `var(--blue)` | Informativo |
| Warning | `var(--flare)` | Alerta |

**Implementacao:** `currentColor` — icone herda cor do texto pai.

## Container / Background

- Icones **NAO** tem container/background por padrao
- Sao stroke-only, sem fills
- ViewBox base: `24x24`, escala proporcional

## Acessibilidade

- Touch target minimo: **44x44px**
- Icones menores que 24px **devem ter padding** para atingir o target de acessibilidade

## Espacamento (relacao icone-texto)

- Nao ha token explicito de gap no brandbook
- Recomendacao implicita: seguir o padrao do componente pai (inline-flex + gap)

## Regras de Uso

1. Manter stroke width 2px em todas as escalas
2. Usar viewBox 24x24 como base
3. Somente stroke, **nunca fill**
4. Escalar proporcionalmente (nao distorcer)
