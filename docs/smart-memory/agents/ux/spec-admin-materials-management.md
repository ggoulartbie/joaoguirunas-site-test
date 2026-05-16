---
name: spec-admin-materials-management
description: Spec UX do gerenciamento de materiais no editor admin de aula — listagem, delete com confirmação, estados visuais
metadata:
  type: project
  status: ready-for-implementation
  component: MaterialsUpload
  path: src/components/admin/MaterialsUpload.tsx
---

# Spec — Admin Materials Management

> Escopo: adicionar confirmação de delete ao componente `MaterialsUpload` existente.
> O componente **já tem** lista de itens e lógica de `handleDelete` — falta apenas a confirmação inline e melhoria do feedback de erro/sucesso.

---

## 1. Layout — Posicionamento

O componente já existe e já exibe a lista acima da drop zone. Estrutura mantida:

```
┌─────────────────────────────────────────────────────┐
│  MATERIAIS DA AULA                                  │
├─────────────────────────────────────────────────────┤
│  [PDF]  Apostila-modulo-1.pdf        2.4 MB  [Remover] │
│  [ZIP]  exercicios-semana-2.zip      8.1 MB  [Remover] │
│  [LINK] Planilha de acompanhamento         [Remover] │
├─────────────────────────────────────────────────────┤
│  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐  │
│    Arraste arquivos ou clique para selecionar        │
│  │  PDF, ZIP, Imagens — max. 100MB por arquivo   │  │
│   ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │
├─────────────────────────────────────────────────────┤
│  + Adicionar link externo                           │
└─────────────────────────────────────────────────────┘
```

**Estado vazio** (sem materiais): ocultar a lista — não exibir placeholder. A drop zone já comunica a ação disponível.

---

## 2. Confirmação de Delete — Inline (sem modal externo)

Shadcn AlertDialog **não está instalado**. Usar painel inline expansível no lugar do item — mesma abordagem que o "Adicionar link externo" já usa no componente.

### Fluxo por item:

**Estado default:**
```
│  [PDF]  Apostila-modulo-1.pdf        2.4 MB  [Remover] │
```

**Após clicar "Remover" — item expande para confirmação:**
```
│  [PDF]  Apostila-modulo-1.pdf        2.4 MB            │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Excluir "Apostila-modulo-1.pdf"?                │   │
│  │ Esta ação não pode ser desfeita.                │   │
│  │                          [Cancelar]  [Excluir]  │   │
│  └─────────────────────────────────────────────────┘   │
```

### Textos (pt-BR):
- Título: `Excluir "{titulo}"?`
- Subtexto: `Esta ação não pode ser desfeita.`
- Botão cancelar: `Cancelar` — estilo ghost (`text-[var(--bone-mute)]`)
- Botão confirmar: `Excluir` — fundo `var(--ember)`, texto `var(--void)`

### Implementação do estado de confirmação:
```tsx
// estado local: confirming: string | null (materialId)
// clicar "Remover" → setConfirming(m.id)
// clicar "Cancelar" → setConfirming(null)
// clicar "Excluir" → handleDelete(m.id) + setConfirming(null)
```

Apenas um item pode estar em modo confirmação por vez. Clicar "Remover" em outro item troca o foco (fecha o anterior, abre o novo).

---

## 3. Estados Visuais

### Loading (deletando)
- Botão "Excluir" mostra `...` e fica `disabled`
- Row inteira: `opacity-50`
- Sem spinner — consistente com padrão existente no componente

### Erro (falhou ao deletar)
- Painel de confirmação permanece visível
- Linha de erro aparece dentro do painel:
  ```
  │ ⚠ Erro ao excluir. Tente novamente.  [Cancelar] [Excluir] │
  ```
- Cor: `text-[var(--ember)]` + `bg-[var(--ember)]/10`
- Mesmo padrão do `error` state já existente no componente

### Sucesso (deletado com sucesso)
- Remoção otimista da lista — o item desaparece imediatamente quando `handleDelete` é chamado (não aguardar server response)
- Sem toast — consistente com ausência de sistema de toast no projeto
- Se o server retornar erro, o item reaparece com mensagem de erro inline

---

## 4. Componentes a usar

| Necessidade | Componente |
|---|---|
| Container de item | `<li>` com classes existentes — sem Card shadcn |
| Botões | `<button>` com classes do design system (padrão já em uso) |
| Confirmação | Painel inline `<div>` expansível — sem AlertDialog |
| Erro | `<p>` com `bg-[var(--ember)]/10 text-[var(--ember)]` — já existe |
| Toast | Não usar — projeto não tem sistema de toast instalado |

**Justificativa:** O componente usa design system proprietário (tokens CSS `--ember`, `--void`, `--bone-*`, `--ink-*`) sem componentes shadcn. Introduzir AlertDialog criaria inconsistência visual e dependência nova. O padrão inline já existe no mesmo arquivo (modo link externo).

---

## 5. Acessibilidade

- Botão "Remover": `aria-label="Remover {titulo}"` para diferenciar itens
- Painel de confirmação: `role="alert"` para anunciar ao leitor de tela
- Foco: ao abrir confirmação, mover foco para o botão "Cancelar" (ação segura)
- Ao cancelar/confirmar, devolver foco para o botão "Remover" da row

---

## 6. Resumo para Implementador

1. Adicionar estado `confirming: string | null` ao componente
2. Substituir o `onClick={() => handleDelete(m.id)}` por `onClick={() => setConfirming(m.id)}`
3. Quando `confirming === m.id`, renderizar painel de confirmação abaixo do item (ou substituindo a linha)
4. Implementar remoção otimista: remover item do array local antes da chamada async, restaurar em caso de erro
5. Sem novas dependências — zero imports adicionais

**Nenhuma mudança de layout necessária** — o componente já tem a estrutura correta.
