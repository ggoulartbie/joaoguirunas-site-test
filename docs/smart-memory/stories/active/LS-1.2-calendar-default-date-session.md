---
id: LS-1.2
title: "Feature: Data atual como padrão no form de encontro"
type: feature
status: active
priority: P1
assignee: sites-dev-alpha
created: 2026-05-18
depends_on: LS-1.1
---

# LS-1.2 — Feature: Data atual como padrão no form de encontro

## Contexto

Ao clicar em "Adicionar Encontro" na seção "Sessões ao Vivo" de uma turma, o campo de data/hora abre vazio. O usuário precisa navegar até o mês atual no calendar picker do browser para selecionar o dia.

O pedido: ao abrir o form de criação de encontro, o campo `datetime-local` já deve vir preenchido com a **data e hora atual** (próxima hora redonda), para que o calendário já esteja sincronizado com o mês corrente.

Arquivo relevante: `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx`

Estado atual:
```tsx
const [newSessionDate, setNewSessionDate] = useState('')
```

Ao clicar em "Adicionar Encontro":
```tsx
onClick={() => { setShowAddSession(!showAddSession); setSessionError(null) }}
```

## Acceptance Criteria

- [x] AC1: Ao clicar em "Adicionar Encontro", o campo de data já vem preenchido com a data e hora atual (próxima hora cheia, ex: se são 14:48, preencher 15:00)
- [x] AC2: O calendário abre no mês correto sem precisar navegar
- [x] AC3: O usuário pode alterar livremente a data/hora selecionada
- [x] AC4: Ao cancelar e re-abrir o form, a data é atualizada para o momento atual (não fica congelada na primeira abertura)
- [x] AC5: `pnpm tsc --noEmit` passa sem erros

## Implementação sugerida

Criar uma função helper que retorna o datetime-local value para "próxima hora cheia no fuso de Brasília":

```tsx
function getDefaultSessionDate(): string {
  const now = new Date()
  // Arredondar para próxima hora
  now.setMinutes(0, 0, 0)
  now.setHours(now.getHours() + 1)
  // Formatar como datetime-local (YYYY-MM-DDTHH:MM) no fuso de Brasília (UTC-3)
  const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  return brt.toISOString().slice(0, 16)
}
```

No click do botão "Adicionar Encontro":
```tsx
onClick={() => { 
  setNewSessionDate(getDefaultSessionDate())
  setShowAddSession(!showAddSession)
  setSessionError(null) 
}}
```

## Arquivos afetados

- `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx`
