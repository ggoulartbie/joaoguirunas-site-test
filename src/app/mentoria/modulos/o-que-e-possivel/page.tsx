import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 1: O que é possível | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/modulos/o-que-e-possivel' },
};

const slides = [
  {
    label: 'Nas últimas 8 semanas',
    title: 'Construímos isso — ao vivo, com agentes.',
    body: 'Não são demos de laboratório. São sistemas reais, rodando em produção na GrowthSales.ai, gerando receita e operando clientes hoje. Cada um foi construído com Claude Code e squads de agentes.',
  },
  {
    label: 'REV OS — Orquestrador Comercial',
    title: 'Mais de 100k de receita recorrente gerada por agentes.',
    body: 'O REV OS é um orquestrador comercial autônomo: qualifica leads, personaliza abordagem, gera propostas e faz follow-up — sem intervenção humana nas etapas repetitivas. Está operando em clientes reais hoje.',
    note: 'Um agente de vendas que nunca dorme, nunca esquece um follow-up e personaliza cada abordagem com o contexto completo do cliente.',
  },
  {
    label: 'Work OS — Gestão de Projetos',
    title: 'Projetos gerenciados de ponta a ponta por agentes.',
    body: 'O Work OS cria tasks, delega, acompanha progresso e sinaliza bloqueios. Do briefing ao entregável, com rastreabilidade completa — sem reuniões de status, sem planilhas manuais.',
    note: 'A mesma infraestrutura de Agent Teams que você vai aprender — aplicada à gestão de projetos reais da GrowthSales.ai.',
  },
  {
    label: 'Design System + Brandbook',
    title: 'Identidade visual completa da GrowthSales.ai.',
    body: 'Tokens, paletas, tipografia, componentes e brandbook — tudo reconstruído do zero com um squad de agentes de design. Do briefing ao handoff em uma fração do tempo de uma agência tradicional.',
    note: 'Um único squad de agentes substituiu semanas de trabalho manual. O resultado está em uso em todas as peças da marca hoje.',
  },
  {
    label: 'Novo Site',
    title: 'Site institucional da GrowthSales.ai em produção.',
    body: 'Design, desenvolvimento, copy e deploy — agentes especializados trabalhando em paralelo. O site que você pode visitar hoje foi construído com o mesmo processo que você vai aprender.',
    note: 'growthsales.ai — do briefing ao deploy, coordenado por um lead e executado por uma squad completa.',
  },
  {
    label: 'Área de Mídia',
    title: 'Sistema de planejamento de conteúdo — João Guirunas.',
    body: 'Calendário editorial, briefings por canal, aprovação de pautas e distribuição — tudo num ambiente operado por agentes. Uma operação de mídia pessoal que roda sozinha.',
    note: 'O João não planeja mais manualmente. Um agente de estratégia, um de redação e um de revisão trabalham toda semana.',
  },
  {
    label: 'Equipe Social Media',
    title: 'Uma operação de conteúdo inteira — cinco agentes.',
    body: 'Planejamento, Redação, Fotografia, Design e Edição de vídeo trabalhando em paralelo. Uma operação que normalmente exige uma equipe de cinco pessoas, operada por IA.',
    note: 'Você vai ver o squad funcionando ao vivo — e vai entender como montar o seu para o seu negócio.',
  },
];

export default function OQueEPossivelPage() {
  return <ModuloSlideshow slug="o-que-e-possivel" slides={slides} />;
}
