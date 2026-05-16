// Dados do Centro de Treinamento — usado em ModuloSlideshow.tsx
// (slides FolderStructureDiagram + BaseCommandsDiagram)

export type FolderNode = {
  name: string
  type: 'dir' | 'file'
  description?: string
  children?: FolderNode[]
}

export type BaseCommand = {
  command: string
  description: string
  detail: string
}

export const FOLDER_STRUCTURE: FolderNode = {
  name: 'centro-treinamento-agentes/',
  type: 'dir',
  description: 'repositório com agentes, skills e comandos',
  children: [
    {
      name: '.claude/',
      type: 'dir',
      description: 'config padrão do Claude Code',
      children: [
        { name: 'agents/', type: 'dir', description: '37 agentes em 4 squads' },
        { name: 'skills/', type: 'dir', description: 'skills compartilhadas' },
        { name: 'commands/', type: 'dir', description: 'slash commands' },
        { name: 'hooks/', type: 'dir', description: 'pre/post tool hooks' },
      ],
    },
    { name: 'CLAUDE.md', type: 'file', description: 'instruções globais do repo' },
    { name: 'README.md', type: 'file' },
  ],
}

export const BASE_COMMANDS: BaseCommand[] = [
  {
    command: '/model',
    description: 'Troca o modelo da sessão atual (Sonnet, Opus, Haiku).',
    detail: 'Use Opus para raciocínio pesado, Sonnet no geral, Haiku para tarefas rápidas e baratas.',
  },
  {
    command: '/compact',
    description: 'Resume a conversa preservando o essencial.',
    detail: 'Quando o contexto está enchendo e você precisa continuar sem perder o fio da meada.',
  },
  {
    command: '/clear',
    description: 'Limpa a conversa e começa do zero.',
    detail: 'Use para trocar de tarefa completamente — evita poluir contexto com histórico irrelevante.',
  },
  {
    command: '/agents',
    description: 'Lista, cria e edita agentes disponíveis.',
    detail: 'Entre aqui para ver o catálogo do squad e ajustar prompt de qualquer agente.',
  },
]
