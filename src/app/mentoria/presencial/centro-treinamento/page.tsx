import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';
import type { Slide, SlideAgent } from '../_components/ModuloSlideshow';
import { ALL_AGENTES } from '@/data/agentes';

export const metadata: Metadata = {
  title: 'Módulo 3: Centro de Treinamento de Agentes | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/presencial/centro-treinamento' },
};

const SQUAD_ACCENTS: Record<string, string> = {
  dev: '#A78BFA',
  sites: '#FF3A0E',
  social: '#EC4899',
  traffic: '#06B6D4',
};

const allAgents: SlideAgent[] = ALL_AGENTES.map((a) => ({
  slug: a.slug,
  codename: a.codename ?? a.name,
  accent: SQUAD_ACCENTS[a.squad] ?? '#FF3A0E',
  title: a.title ?? undefined,
}));

const slides: Slide[] = [
  {
    label: 'Centro de Treinamento · 37 Agentes',
    title: 'Conheça o time inteiro — 37 agentes, 4 squads.',
    body: 'Cada agente tem identidade própria, ferramentas específicas e papel insubstituível. Dev, Sites, Social e Traffic — squads completas que trabalham em paralelo, coordenadas por um único lead. Nenhum generalista. Nenhum acúmulo de função.',
    diagram: 'all-agents',
    agents: allAgents,
  },
  {
    label: 'Centro de Treinamento · 4 Squads',
    title: '37 agentes, 4 squads, 1 lead — um sistema operacional para IA.',
    body: 'O Centro de Treinamento é o repositório central de agentes e skills nativos do Claude Code. Cada agente tem papel único, ferramentas específicas e responsabilidades claras. Nenhum sabe fazer tudo — e isso é o que torna o sistema confiável. Tudo em .claude/agents/ e .claude/skills/ — portável entre projetos.',
    diagram: 'ct-overview',
  },
  {
    label: 'Squads · Quem é quem',
    title: '4 squads, papéis claros — nenhum agente sabe fazer tudo.',
    body: 'Especialização é a lei. Cada squad tem autoridades exclusivas: só o devops faz push, só o qa emite veredictos, só o architect cria stories. Nenhum agente invade o território do outro — e é isso que torna o time previsível.',
    diagram: 'squads-detail',
  },
  {
    label: 'Time vs Solo · Protocolo',
    title: 'Por que agentes em time — e como se coordenam.',
    body: 'IA solo tenta fazer tudo e faz mal. Agentes em time têm papéis definidos, QA formal e execução paralela. O protocolo garante autoridade exclusiva: só dev-qa emite veredictos, só dev-devops faz push. Sem nested teams. Sem polling — cada agente avisa quando termina.',
    note: 'Enquanto o backend implementa, o QA já prepara os critérios. Zero retrabalho de handoff.',
    diagram: 'team-protocol',
  },
  {
    label: 'Estrutura · Source → Projects',
    title: 'Um catálogo central. Cada projeto puxa o que precisa.',
    body: 'O centro de treinamento é a fonte — .claude/agents/ e .claude/skills/ prontos. Cada projeto destino recebe exatamente os agentes e skills que precisa, sem duplicar manualmente.',
    note: 'team-os-creator faz a sincronização — sem cópia manual.',
    diagram: 'folder-structure',
  },
  {
    label: '/team-os · O Maestro',
    title: 'Detecta o projeto. Planeja. Forma o time. Coordena — em um comando.',
    body: 'team-os é a skill de orquestração nativa: detecta o estado automaticamente (NEW / READY / IN_PROGRESS), faz bootstrap completo em projetos novos, quebra objetivos em stories, forma o squad certo e coordena execução em paralelo. É o sistema que usamos para construir tudo que você viu no Módulo 01.',
    diagram: 'team-os-commands',
  },
  {
    label: 'Smart Memory · docs/smart-memory/',
    title: 'A fonte de verdade que todos os agentes leem — e atualizam.',
    body: 'Agentes não têm memória entre sessões. Smart Memory resolve isso: docs/smart-memory/ é um vault Obsidian com wikilinks entre arquivos, frontmatter YAML e estrutura por tipo — project, stories, decisions, ops. Cada agente lê e escreve aqui.',
    note: 'Qualquer agente (ou humano) entra numa sessão nova e tem contexto completo em segundos.',
    video: '/mentoria/smart-memory-obsidian.mov',
  },
  {
    label: 'Comandos base · CLI',
    title: 'Antes de orquestrar agentes — domine os 3 comandos.',
    body: '/model controla custo e capacidade por sessão. /compact preserva contexto em sessões longas sem reiniciar do zero. /clear reseta tudo quando um novo problema exige raciocínio limpo.',
    diagram: 'base-commands',
  },
  {
    label: '/team-os-creator · Agent Factory',
    title: 'Você descreve o que precisa. Ele gera o squad pronto para trabalhar.',
    body: 'team-os-creator analisa o stack do projeto, propõe a squad ideal, gera os arquivos .claude/agents/*.md completos e instala as skills relevantes. Nunca sobrescreve silenciosamente. Nunca duplica o orquestrador. Propaga updates para múltiplos projetos de uma vez.',
    diagram: 'creator-commands',
  },
  {
    label: 'Por onde começar · 3 passos',
    title: 'Do zero ao time rodando em 3 comandos.',
    body: 'Instalar a squad, inicializar o smart-memory e despachar o trabalho. Do projeto virgem ao time em execução paralela — sem configuração manual, sem setup demorado. Você só aprova.',
    note: 'O time planeja, executa e entrega. Você define o objetivo.',
    diagram: 'getting-started',
  },
  {
    label: '/team-os-creator · Referência',
    title: 'A fábrica está à sua disposição.',
    body: 'Todos os comandos do team-os-creator que você vai usar para criar, instalar, atualizar e auditar squads em qualquer projeto. Leve com você.',
    note: 'Nunca sobrescreve silenciosamente. Nunca duplica o orquestrador. Skills sempre instaladas junto.',
    diagram: 'creator-commands',
  },
];

export default function CentroTreinamentoPage() {
  return <ModuloSlideshow slug="centro-treinamento" slides={slides} />;
}
