import dataset from './agentes.json';
import type { AgentesDataset, Agente, Squad, SquadId } from './types';

const data = dataset as unknown as AgentesDataset;

export const ALL_AGENTES: Agente[] = data.agentes;
export const SQUADS: Squad[] = data.squads;
export const TOTAL_AGENTES = data.total;

export function getAgentesBySquad(squadId: SquadId): Agente[] {
  return ALL_AGENTES.filter((a) => a.squad === squadId);
}

export function getAgenteBySlug(squadId: SquadId, slug: string): Agente | null {
  return ALL_AGENTES.find((a) => a.squad === squadId && a.slug === slug) ?? null;
}

export function getSquad(squadId: SquadId): Squad | null {
  return SQUADS.find((s) => s.id === squadId) ?? null;
}

export function getSiblings(agente: Agente, limit = 3): Agente[] {
  return ALL_AGENTES.filter((a) => a.squad === agente.squad && a.id !== agente.id).slice(0, limit);
}

export type { Agente, Squad, SquadId, AgentesDataset };
