---
task: Check All Agents
responsavel: "@chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada: []
Saida:
  - campo: squad_report
    tipo: string
    destino: User + Maestri Notes
    persistido: true

Checklist:
  - "[ ] maestri list"
  - "[ ] maestri check on each agent"
  - "[ ] Compile report"
  - "[ ] Update status-board"
---

# Check All Agents

Runs `maestri check` on every connected agent and compiles a squad-wide status report.

---

*Task created by squad-creator for themaestrisites squad*
