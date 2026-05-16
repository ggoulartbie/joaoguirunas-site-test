---
name: spec-comment-submit-feedback
description: Spec de UX do fluxo de submit de comentário — optimistic update + estados do botão
metadata:
  type: project
  tags: [comment, optimistic-update, feedback, loading-state]
---

## Estados do Fluxo

**Estado 1 — Idle:** botão "Comentar" habilitado. Textarea aceitando input.

**Estado 2 — Loading:** ao clicar, botão muda o label para "Enviando..." e fica `disabled`. Textarea fica `disabled`. O comentário é adicionado IMEDIATAMENTE ao topo da lista com `opacity: 0.7` e um indicador visual sutil (ex: texto "Publicando…" em fonte menor, cor neutra) para sinalizar estado pendente. Nenhum spinner global — o feedback é inline na lista.

**Estado 3 — Sucesso:** resposta do servidor confirmada. O comentário pendente tem `opacity` normalizada para `1`. O indicador "Publicando…" desaparece. Textarea limpa. Botão volta para "Comentar" habilitado.

**Estado 4 — Erro:** o comentário pendente é removido da lista. Mensagem de erro inline aparece abaixo do textarea (já existe no código atual — manter). Textarea mantém o texto digitado para o usuário não perder o conteúdo. Botão volta para "Comentar" habilitado.

## Edge Cases

**Clique duplo / resubmit durante pending:** botão permanece `disabled` enquanto qualquer comentário estiver em estado pendente. Não enfileirar múltiplos submits.

**Textarea vazia:** botão "Comentar" permanece `disabled` se textarea estiver vazia ou só com whitespace. Não chegar no Estado 2.

## Optimistic Update — Estrutura do Item Pendente

O item inserido otimisticamente deve ter a mesma estrutura visual de um comentário real, exceto:
- `opacity: 0.7`
- Indicador de status: string "Publicando…" exibida abaixo do corpo do comentário, em tamanho de fonte reduzido (ex: `text-xs`) e cor neutra (ex: `text-muted-foreground`)

## Acceptance Criteria

- [ ] Comentário aparece na lista em menos de 100ms após click em "Comentar"
- [ ] Botão fica `disabled` e label muda para "Enviando..." durante o request
- [ ] Ao confirmar sucesso, `opacity` do comentário vai para `1` e indicador "Publicando…" desaparece
- [ ] Em caso de erro, o comentário pendente é removido e o texto digitado é preservado no textarea
- [ ] Não é possível submeter um segundo comentário enquanto o primeiro está pendente
- [ ] Textarea vazia não dispara o request
