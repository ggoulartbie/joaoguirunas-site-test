---
id: LS-2.1
title: "Story LS-2.1: Separar campo data+hora em sessões ao vivo e usar calendário nativo"
type: story
status: done
epic: LS
complexity: S
agent: sites-dev-alpha
created: 2026-05-21
updated: 2026-05-21
tags: [story, live-sessions, admin, ux, cohort-form]
related: [[LS-1.2-calendar-default-date-session]]
---

# Story LS-2.1: Separar campo data+hora em sessões ao vivo e usar calendário nativo

## Objetivo

Substituir o `<input type="datetime-local">` dos forms "Adicionar encontro" e "Editar encontro" em `CohortForm.tsx` por dois campos separados (`type="date"` + `type="time"`), expondo o calendário visual nativo do browser e mantendo digitação manual via teclado — sem novas dependências.

## Acceptance Criteria

- [ ] **AC1** — Form "Adicionar encontro ao vivo" (linha ~1432–1448) substitui o `TextInput type="datetime-local"` por dois `TextInput` adjacentes: um `type="date"` e um `type="time"`, ambos sob o label "Data e hora * (horário de Brasília)". Layout permanece dentro do grid `md:grid-cols-2` existente.
- [ ] **AC2** — Form "Editar encontro ao vivo" (linha ~1640–1655) aplica a mesma separação, alimentado pelos valores atuais de `ls.scheduled_at`.
- [ ] **AC3** — Calendário nativo do browser abre ao focar o campo `type="date"` (Chromium/Firefox/Safari). Digitação manual (ex: `21/05/2026`) continua funcionando pelo teclado sem JS adicional.
- [ ] **AC4** — `getDefaultSessionDate()` (linha 211) é refatorada para retornar `{ date: string; time: string }` (ou substituída por duas helpers `getDefaultSessionDate()` + `getDefaultSessionTime()`). Comportamento atual ("próxima hora cheia em BRT") preservado — quando o usuário abre o form "Adicionar", date vem com a data BRT corrente e time com `HH:00` da próxima hora cheia.
- [ ] **AC5** — `toDatetimeLocalValue(iso)` (linha 224) é refatorada para retornar `{ date: string; time: string }` (ou substituída por duas helpers `toDateValue` + `toTimeValue`). Edição preenche os dois campos com a data/hora em BRT a partir de `scheduled_at` (ISO UTC).
- [ ] **AC6** — Submit (Adicionar — linha ~1496–1504; Editar — linha ~1704–1711) combina os dois campos antes de salvar: `new Date(\`\${date}T\${time}:00\`).toISOString()` para `scheduledAt`. Resultado idêntico ao fluxo atual (timestamp UTC enviado à action).
- [ ] **AC7** — Validação: botão "Adicionar"/"Salvar" permanece desabilitado se **qualquer um** dos dois campos (date ou time) estiver vazio. Substitui `!newSessionDate` / `!editSessionDate` por `(!newSessionDate || !newSessionTime)` / `(!editSessionDate || !editSessionTime)`.
- [ ] **AC8** — Cancelar e reabrir o form "Adicionar encontro" atualiza date+time para o momento BRT atual (mantém comportamento da LS-1.2 — não fica congelado na primeira abertura).
- [ ] **AC9** — Zero novas dependências em `package.json`. Sem `react-day-picker`, `date-fns`, `dayjs`, popover/portal customizado. Apenas `<input>` nativo e helpers JS puros.
- [ ] **AC10** — `pnpm tsc --noEmit` PASS. `pnpm lint` sem novos warnings no arquivo. Build (`pnpm build`) PASS.

## Escopo

**IN:**
- `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx` — refactor dos dois forms (add + edit) e dos helpers `getDefaultSessionDate` e `toDatetimeLocalValue`.
- Novos state vars `newSessionTime` e `editSessionTime` (ou shape unificado `{date, time}`).
- Combinação `date + time → ISO` no submit.
- Atualização do clique do botão "Adicionar Encontro" (linha 1415) para inicializar ambos os campos.

**OUT:**
- Migration de banco — `live_sessions.scheduled_at` continua `timestamptz`, sem alteração no schema.
- Server actions `createLiveSession` / `updateLiveSession` — contrato `scheduledAt: string` (ISO) preservado.
- Componente datepicker customizado, dependências externas, popover/portal.
- Outros campos `type="date"` do arquivo (startDate linha 702, endDate linha 706, memberExpiresAt linha 1295) — já estão no padrão correto; ficam fora.
- Mudança de timezone do usuário (assumimos BRT fixo, mesmo comportamento de hoje).
- Refactor visual (cores, espaçamento, tipografia) além do split em dois inputs no mesmo grid.

## Contexto Técnico

**Arquivo principal:** `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx`

**Estado atual relevante:**

| Linha | Símbolo | Comportamento |
|---|---|---|
| 211 | `getDefaultSessionDate()` | Retorna string `YYYY-MM-DDTHH:MM` (datetime-local) para a próxima hora cheia em BRT (UTC-3) |
| 224 | `toDatetimeLocalValue(iso)` | Converte ISO UTC → string datetime-local em BRT para popular edição |
| 374 | `newSessionDate` state | `useState('')`, formato datetime-local |
| 383 | `editSessionDate` state | `useState('')`, formato datetime-local |
| 1415 | Botão "Adicionar Encontro" onClick | `if (!showAddSession) setNewSessionDate(getDefaultSessionDate())` |
| 1442–1448 | Input "Adicionar" | `TextInput type="datetime-local"` |
| 1496–1504 | Submit "Adicionar" | `scheduledAt: new Date(newSessionDate).toISOString()` |
| 1606 | Botão "Editar" onClick | `setEditSessionDate(toDatetimeLocalValue(ls.scheduled_at))` |
| 1650–1655 | Input "Editar" | `TextInput type="datetime-local"` |
| 1704–1711 | Submit "Editar" | `scheduledAt: new Date(editSessionDate).toISOString()` |

**Padrão já existente no mesmo arquivo (referência):**
- Linha 702 — `<TextInput type="date" value={startDate} onChange={setStartDate} />`
- Linha 706 — `<TextInput type="date" value={endDate} onChange={setEndDate} />`
- Linha 1295 — `<TextInput type="date" value={memberExpiresAt} onChange={setMemberExpiresAt} />`

O projeto **já usa `type="date"` nativo** — esta story estende o padrão para sessões ao vivo, adicionando `type="time"` ao lado.

**Banco de dados:** `live_sessions.scheduled_at` é `timestamptz` (ISO). **Sem migration.** A separação é puramente UI.

**Dependências:** `@radix-ui/react-slot` já instalado; **não** será usado nesta story. Zero novas deps.

**Constraint do navegador:** `<input type="date">` e `<input type="time">` nativos exibem calendário/relógio visual em Chrome, Edge, Firefox e Safari ≥ 14.1 (todos os browsers-alvo do projeto). Acessibilidade por teclado é automática.

**Combinação segura date+time → ISO:**
```ts
// Input: date="2026-05-21", time="15:00"
// Output: ISO UTC representando 2026-05-21T15:00 no fuso local do browser
const iso = new Date(`${date}T${time}:00`).toISOString()
```
Como o admin sempre opera em BRT (mesma assunção atual — `datetime-local` já interpreta no fuso local), o comportamento é **idêntico** ao do `type="datetime-local"` atual.

**Anti-recorrência LS-1.2:** o setter em "Adicionar" precisa rodar a cada abertura do form (não apenas na montagem), para que date+time reflitam o momento corrente — não congelar na primeira abertura.

## Plano de implementação sugerido

1. Refatorar helpers:
   ```ts
   function getDefaultSessionDateTime(): { date: string; time: string } {
     const now = new Date()
     now.setMinutes(0, 0, 0)
     now.setHours(now.getHours() + 1)
     const brt = new Date(now.getTime() - 3 * 60 * 60 * 1000)
     const iso = brt.toISOString()
     return { date: iso.slice(0, 10), time: iso.slice(11, 16) }
   }

   function toDateTimeValues(iso: string | null): { date: string; time: string } {
     if (!iso) return { date: '', time: '' }
     const d = new Date(iso)
     const tzOffset = -3 * 60
     const local = new Date(d.getTime() + tzOffset * 60000 - d.getTimezoneOffset() * 60000)
     const s = local.toISOString()
     return { date: s.slice(0, 10), time: s.slice(11, 16) }
   }
   ```
2. Adicionar state vars `newSessionTime` / `editSessionTime` (default `''`).
3. Atualizar onClick do botão "Adicionar Encontro" para setar ambos via `getDefaultSessionDateTime()`.
4. Atualizar onClick do botão "Editar" para setar ambos via `toDateTimeValues(ls.scheduled_at)`.
5. Substituir cada `TextInput type="datetime-local"` por dois `TextInput` lado a lado dentro do mesmo `<div>` (ou em dois `<div>` adjacentes do grid existente).
6. Atualizar disabled e guard de submit para checar `(!date || !time)`.
7. No submit, combinar: `new Date(\`\${date}T\${time}:00\`).toISOString()`.
8. Rodar `pnpm tsc --noEmit` e `pnpm build`.

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | Novael (sites-dev-alpha) |
| Iniciado   | 2026-05-21 |
| Concluído  | 2026-05-21 |
| Branch     | main |

## File List

- `src/app/(academy)/academy/(admin)/admin/turmas/CohortForm.tsx`

## QA Results

**Veredito: PASS** (lead, 2026-05-21)

- AC1 ✅ Form "Adicionar" — dois campos `type="date"` + `type="time"` dentro de `div.flex.gap-2`
- AC2 ✅ Form "Editar" — mesma separação, alimentada por `toDateTimeValues(ls.scheduled_at)`
- AC3 ✅ Calendário nativo abre no campo `type="date"`; digitação manual funciona
- AC4 ✅ `getDefaultSessionDateTime()` retorna `{ date, time }` com próxima hora cheia BRT
- AC5 ✅ `toDateTimeValues(iso)` retorna `{ date, time }` em BRT a partir de ISO UTC
- AC6 ✅ Submit combina: `` new Date(`${date}T${time}:00`).toISOString() ``
- AC7 ✅ Botão desabilitado se `!newSessionDate || !newSessionTime` / idem Edit
- AC8 ✅ onClick "Adicionar Encontro" inicializa ambos os campos a cada abertura
- AC9 ✅ Zero novas dependências em `package.json`
- AC10 ✅ `pnpm tsc --noEmit` PASS + `pnpm build` PASS (zero erros)

**Nota:** TextInput e textareas receberam CSS extra `[&::-webkit-calendar-picker-indicator]:invert ...` para harmonizar o ícone nativo no tema dark. Inofensivo em textareas (pseudo-elemento inexistente = sem efeito).
