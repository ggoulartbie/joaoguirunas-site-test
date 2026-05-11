import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 1: O que é possível | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/modulos/o-que-e-possivel' },
};

const slides = [
  {
    label: 'Nas últimas 8 semanas',
    title: 'Tudo que você vai ver foi construído ao vivo — com agentes.',
    body: 'Não são demos de laboratório nem protótipos acadêmicos. São sistemas reais, operando em produção, gerando receita e atendendo clientes hoje. Cada um foi construído com Claude Code e squads de agentes especializados.',
  },
  {
    label: 'REV OS · Orquestrador Comercial',
    title: 'Mais de R$ 100k em receita gerada por agentes. Sem intervenção humana.',
    body: 'O REV OS qualifica leads, personaliza a abordagem, gera propostas e faz follow-up automaticamente. Do primeiro contato ao contrato assinado — sem uma pessoa precisar tocar no processo.',
    note: 'Está operando em clientes reais hoje. Não é um piloto.',
  },
  {
    label: 'WORK OS · Gestão de Projetos',
    title: 'Reuniões de status viraram história.',
    body: 'O Work OS cria tarefas, delega, monitora progresso e sinaliza bloqueios sozinho. Do briefing ao entregável, com rastreabilidade completa de cada decisão — sem planilhas manuais.',
    note: 'A mesma infraestrutura de Agent Teams que você vai aprender a montar neste dia.',
  },
  {
    label: 'Design System · GrowthSales.ai',
    title: 'Identidade visual completa — em dias, não semanas.',
    body: 'Tokens, paletas, tipografia, componentes e brandbook — reconstruídos do zero com um squad de agentes de design. O que normalmente levaria semanas com uma agência foi feito em uma fração do tempo.',
    note: 'O resultado está em uso em todas as peças da marca hoje.',
  },
  {
    label: 'Novo Site · GrowthSales.ai',
    title: 'Design, copy e código — três agentes trabalhando em paralelo.',
    body: 'Site institucional completo: do briefing ao deploy, com agentes de design, desenvolvimento e copy atuando ao mesmo tempo. O site que você pode visitar hoje foi construído exatamente assim.',
    note: 'growthsales.ai — coordenado por um lead, executado por um squad.',
  },
  {
    label: 'Área de Mídia · João Guirunas',
    title: 'Uma operação de conteúdo que roda sozinha toda semana.',
    body: 'Calendário editorial, briefings por canal, aprovação de pautas e distribuição — tudo operado por agentes. Um agente de estratégia, um de redação e um de revisão trabalham toda semana.',
    note: 'O João não planeja mais manualmente.',
  },
  {
    label: 'Equipe Social Media',
    title: 'Cinco pessoas substituídas por cinco agentes.',
    body: 'Planejamento, Redação, Fotografia, Design e Edição de vídeo trabalhando em paralelo. Uma operação de conteúdo completa — sem contratar ninguém, sem reuniões de alinhamento, sem gargalos.',
    note: 'Você vai ver o squad funcionando ao vivo e vai entender como montar o seu para o seu negócio.',
  },
];

export default function OQueEPossivelPage() {
  return <ModuloSlideshow slug="o-que-e-possivel" slides={slides} />;
}
