export type SquadId = 'dev' | 'sites' | 'social' | 'traffic';

export interface Squad {
  id: SquadId;
  label: string;
  title: string;
  description: string;
  accent: string;
  accentName: string;
  heroBg: string;
  count: number;
  race: string;
  raceDescription: string;
  planetTexture: string;
}

export interface AgentSkill {
  command: string;
  description: string;
}

export interface Agente {
  id: string;
  squad: SquadId;
  name: string;
  codename: string | null;
  title: string | null;
  description: string;
  archetype: string | null;
  tagline: string | null;
  race: string | null;
  model: string;
  color: string | null;
  tools: string[];
  authorities: string[];
  abilities: string[];
  specialization: string[];
  skills: AgentSkill[];
  neverDoes: string[];
  squadRole: string;
  slug: string;
}

export interface AgentesDataset {
  generatedAt: string;
  total: number;
  squads: Squad[];
  agentes: Agente[];
}
