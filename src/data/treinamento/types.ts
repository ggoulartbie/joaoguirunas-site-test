import type { Agente, Squad, SquadId } from '@/data/agentes/types';

export type { Agente, Squad, SquadId };

export interface FolderNode {
  name: string;
  type: 'file' | 'dir';
  description?: string;
  children?: FolderNode[];
}

export interface BaseCommand {
  command: string;
  shortcut?: string;
  description: string;
  detail: string;
}

export interface TeamOsCreatorFunction {
  id: string;
  name: string;
  trigger: string;
  description: string;
  output: string;
}

export interface TeamOsSkill {
  name: string;
  trigger: string;
  tagline: string;
  description: string;
  commands: Array<{
    input: string;
    action: string;
  }>;
}

export interface TreinamentoDataset {
  generatedAt: string;
  folderStructure: FolderNode;
  baseCommands: BaseCommand[];
  teamOsSkill: TeamOsSkill;
  teamOsCreatorFunctions: TeamOsCreatorFunction[];
}
