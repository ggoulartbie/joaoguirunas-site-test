---
name: spec-video-player-aspect-ratio
description: Spec visual do container do player Vimeo — fix do iframe cortando barra de controles
metadata:
  type: project
  tags: [video, vimeo, iframe, aspect-ratio, responsive]
---

## Problema

O container do player está com aspect-ratio 16:9 forçado, mas o iframe respeita o aspect-ratio do vídeo original. Quando o vídeo é mais estreito que 16:9, o iframe encolhe verticalmente e a barra de controles do Vimeo fica cortada abaixo da borda do container.

## Solução

O iframe deve preencher 100% do container (`width: 100%; height: 100%`). Quem gerencia letterbox/pillarbox é o próprio Vimeo internamente — não o container.

## Especificação do Container

**Wrapper externo (aspect-ratio shell):**
- `position: relative`
- `width: 100%`
- `aspect-ratio: 16 / 9`
- `background-color: #000` (preto — fallback elegante para letterbox visível)
- `overflow: hidden`
- `border-radius` pode ser mantido do design system existente

**Iframe interno:**
- `position: absolute`
- `inset: 0` (equivalente a top/right/bottom/left: 0)
- `width: 100%`
- `height: 100%`
- `border: 0`

## Comportamento Responsivo

**Desktop (>= 768px):** container ocupa a largura disponível do layout; altura determinada pelo aspect-ratio 16:9.

**Mobile (< 768px):** mesmo comportamento — `width: 100%` + `aspect-ratio: 16/9`. Sem altura fixa em px. Sem overflow horizontal.

## Acceptance Criteria

- [ ] O iframe ocupa exatamente 100% da largura e 100% da altura do container em qualquer viewport
- [ ] A barra de controles do Vimeo aparece completamente dentro dos bounds do container
- [ ] Vídeos com aspect-ratio diferente de 16:9 exibem letterbox/pillarbox preto — não cortam conteúdo
- [ ] Nenhum scroll horizontal é introduzido em viewport mobile (320px+)
- [ ] O container não vaza para fora do layout pai em nenhum breakpoint
