import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 3: Centro de Treinamento de Agentes | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/modulos/centro-treinamento' },
};

const slides = [
  {
    label: 'Centro de Treinamento de Agentes',
    title: 'Agentes não nascem prontos — eles são treinados.',
    body: 'O Centro de Treinamento é a infraestrutura que permite criar, configurar e orquestrar squads de agentes de forma sistemática. Você vai usar ao vivo neste módulo — e vai criar seu primeiro agente antes de sair daqui.',
  },
  {
    label: '/team-os-creator',
    title: 'Uma fábrica de agentes. Um comando, um time pronto.',
    body: 'A skill analisa seu projeto, detecta o que você precisa, propõe o squad certo e gera cada agente completo — personalidade, especialidade, ferramentas e instruções. Não é um template genérico.',
    note: 'O team-os-creator gera agentes pensados para o seu contexto específico, não para o contexto de outra pessoa.',
  },
  {
    label: '/team-os',
    title: 'O líder que nunca dorme, nunca perde o contexto.',
    body: 'A skill que comanda o squad. Detecta o estado do projeto, forma o time certo para o objetivo, distribui tarefas, coordena em paralelo e mantém a memória compartilhada entre todos os agentes.',
    note: 'team-os é o líder de time que você nunca precisou contratar — e que nunca fica sobrecarregado.',
  },
  {
    label: 'Anatomia de um agente',
    title: 'O que separa um agente mediano de um especialista.',
    body: 'Papel e especialidade definidos. Tom e personalidade claros. Ferramentas e acessos configurados. Memória compartilhada. Um agente bem treinado não precisa de supervisão constante — ele sabe exatamente o que fazer.',
    note: 'A qualidade de um agente é diretamente proporcional à clareza com que você define o papel dele.',
  },
  {
    label: 'Squads',
    title: 'O poder real não é um agente. É um time.',
    body: 'Design, desenvolvimento, QA e deploy — todos ao mesmo tempo, coordenados por um líder. Nas últimas 8 semanas montamos squads para design, social media, vendas e gestão de projetos.',
    note: 'Você vai ver um squad sendo formado ao vivo — e vai montar o seu antes de sair.',
  },
  {
    label: 'Seu primeiro agente',
    title: 'Não um exemplo. O seu mesmo — funcionando hoje.',
    body: 'Você chega com clareza de qual agente quer criar para o seu negócio. Vai embora com ele funcionando: testado ao vivo, ajustado em tempo real, pronto para usar na segunda-feira.',
    note: 'Este é o começo. As semanas online constroem em cima disso — squads mais complexos, automações encadeadas, sistemas completos.',
  },
];

export default function CentroTreinamentoPage() {
  return <ModuloSlideshow slug="centro-treinamento" slides={slides} />;
}
