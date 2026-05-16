---
title: "Research: Vimeo Player Aspect Ratio Fix"
type: research
agent: sites-analyst
created: 2026-05-16
tags: [research, vimeo, video, css]
---

# Research: Vimeo Player Aspect Ratio Fix

**Decisão que informa:** Como corrigir aspect ratio do container Vimeo sem quebrar `responsive: true`
**Solicitado por:** sites-architect

## Resumo executivo

O SDK `@vimeo/player` com `responsive: true` injeta um iframe dentro do container `ref` com padding-bottom wrapper automático. O container pai controla o tamanho — o CSS `aspect-ratio` no wrapper pai é a abordagem correta e moderna.

## Findings

### Como `responsive: true` funciona

- O SDK injeta um `<div>` wrapper com `padding-bottom: 56.25%` (16:9) + `position: relative; height: 0`
- O iframe fica `position: absolute; width: 100%; height: 100%` dentro desse wrapper
- O wrapper respeita a largura do container pai — portanto **o container pai determina o tamanho**

### Situação atual no projeto

- `VideoPlayer.tsx:299-306`: o `vimeoContainerRef` já tem `w-full overflow-hidden` e `style={{ aspectRatio: '16/9' }}`
- O problema: `style={{ aspectRatio: '16/9' }}` no `<div ref={vimeoContainerRef}>` conflita com o wrapper que o SDK injeta (que usa `height: 0` + `padding-bottom`)
- Resultado: o container pai define aspectRatio mas o SDK sobreescreve a altura internamente

### Abordagem recomendada (5 bullets)

- **Separar wrapper externo de ref interno:** criar um `<div>` pai com `aspect-ratio: 16/9` e `w-full`, e passar o `ref` para um `<div>` filho sem estilo conflitante
- **Não colocar `aspectRatio` no elemento que recebe o `ref`** — o SDK escreve estilos inline nele
- **Container pai:** `style={{ aspectRatio: '16/9', width: '100%', overflow: 'hidden' }}`
- **Div do ref:** `style={{ width: '100%', height: '100%' }}` — sem aspectRatio, sem height fixo
- **Remover `height: 0`** de qualquer reset CSS que afete o container (o SDK já cuida da proporção interna)

### Snippet corrigido

```tsx
<div className={className}>
  <div style={{ aspectRatio: '16/9', width: '100%', overflow: 'hidden' }}>
    <div ref={vimeoContainerRef} style={{ width: '100%', height: '100%' }} />
  </div>
</div>
```

## Fontes

- [Vimeo Player SDK Embed Options](https://developer.vimeo.com/player/sdk/embed)
- [CSS aspect-ratio para iframes responsivos](https://gomakethings.com/responsive-iframes-with-the-css-aspect-ratio-property/)
- [Mastering Responsive Vimeo Embedding](https://moldstud.com/articles/p-mastering-responsive-vimeo-video-embedding-advanced-techniques-best-practices)
