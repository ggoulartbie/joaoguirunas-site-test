---
task: Assign Task to Agent
responsavel: "@chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: task_description
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: agent_name
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: assignment_confirmation
    tipo: string
    destino: Maestri Notes
    persistido: true

Checklist:
  - "[ ] Validate agent is connected"
  - "[ ] Send via maestri ask"
  - "[ ] Update status-board"
---

# Assign Task to Agent

Assigns a task to a specific agent via `maestri ask "{agent_name}" "{task}"` and updates status-board.

---

*Task created by squad-creator for themaestrisites squad*
