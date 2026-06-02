import dataset from './treinamento.json';
import type { TreinamentoDataset, FolderNode, BaseCommand, TeamOsCreatorFunction, TeamOsSkill } from './types';
import { ALL_AGENTES, SQUADS, TOTAL_AGENTES, getAgentesBySquad, getAgenteBySlug, getSquad } from '@/data/agentes';

const data = dataset as unknown as TreinamentoDataset;

export const FOLDER_STRUCTURE: FolderNode = data.folderStructure;
export const BASE_COMMANDS: BaseCommand[] = data.baseCommands;
export const TEAM_OS_SKILL: TeamOsSkill = data.teamOsSkill;
export const TEAM_OS_CREATOR_FUNCTIONS: TeamOsCreatorFunction[] = data.teamOsCreatorFunctions;

export { ALL_AGENTES, SQUADS, TOTAL_AGENTES, getAgentesBySquad, getAgenteBySlug, getSquad };

export type { TreinamentoDataset, FolderNode, BaseCommand, TeamOsCreatorFunction, TeamOsSkill };
export type { Agente, Squad, SquadId } from './types';
