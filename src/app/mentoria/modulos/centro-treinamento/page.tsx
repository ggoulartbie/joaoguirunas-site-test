import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 3: Centro de Treinamento de Agentes | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/modulos/centro-treinamento' },
};

const slides = [
  {
    label: 'Centro de Treinamento',
    title: 'Agentes não nascem prontos — eles são treinados.',
    body: 'O Centro de Treinamento é a infraestrutura que criei para criar, configurar e orquestrar squads de agentes de forma sistemática. Você vai usar ao vivo neste módulo — e vai criar o seu primeiro agente antes de sair daqui.',
  },
  {
    label: '/team-os-creator',
    title: 'A fábrica de agentes.',
    body: 'Uma skill que analisa o seu projeto, detecta o que você precisa, propõe a squad certa e gera cada agente completo: personalidade, especialidade, ferramentas e instruções. Um comando — um agente pronto para trabalhar.',
    note: 'Não é um template genérico. O team-os-creator gera agentes pensados para o seu contexto específico.',
  },
  {
    label: '/team-os',
    title: 'O orquestrador do time.',
    body: 'A skill que comanda a squad. Detecta o estado do projeto, forma o time certo para o objetivo, distribui tarefas, coordena a execução em paralelo e mantém a memória compartilhada entre todos os agentes.',
    note: 'team-os é o líder que você nunca precisou contratar — e que nunca dorme, nunca esquece e nunca perde o contexto.',
  },
  {
    label: 'Anatomia de um agente',
    title: 'O que compõe um agente bem treinado.',
    body: 'Papel e especialidade definidos. Tom e personalidade claros. Ferramentas e acessos configurados. Contrato com o time. Memória compartilhada. Um agente assim não precisa de supervisão constante — ele sabe o que fazer.',
    note: 'A qualidade de um agente é diretamente proporcional à clareza com que você define o papel dele.',
  },
  {
    label: 'Squads',
    title: 'Times inteiros trabalhando em paralelo.',
    body: 'O poder real não é um agente — é um squad. Design + desenvolvimento + QA + deploy, todos ao mesmo tempo, coordenados por um líder. Nas últimas 8 semanas montamos squads para design, social media, vendas e gestão de projetos.',
    note: 'Você vai ver um squad sendo formado ao vivo — e vai montar o seu antes de sair.',
  },
  {
    label: 'Seu primeiro agente',
    title: 'Não um exemplo. O seu mesmo.',
    body: 'Você chega com clareza de qual agente quer criar para o seu negócio. E você vai embora com ele funcionando — testado ao vivo, ajustado em tempo real, pronto para usar na segunda-feira.',
    note: 'Este é o começo. As semanas online constroem em cima disso: squads mais complexos, automações encadeadas, sistemas completos.',
  },
];

export default function CentroTreinamentoPage() {
  return <ModuloSlideshow slug="centro-treinamento" slides={slides} />;
}
