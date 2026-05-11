import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 3: Centro de Treinamento de Agentes | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/presencial/centro-treinamento' },
};

const slides = [
  {
    label: 'Por onde começar',
    title: 'Claude genérico faz tudo mal. Claude especialista faz uma coisa muito bem.',
    body: 'Um agente genérico é como contratar alguém para fazer marketing, vendas, financeiro e código ao mesmo tempo — ele tenta, mas não tem profundidade em nada. Um agente especialista tem papel definido, contexto específico e as ferramentas certas. A diferença de resultado é brutal.',
    note: 'Você não contrata uma pessoa para fazer tudo. Com agentes é exatamente igual.',
  },
  {
    label: 'Anatomia de um agente',
    title: 'O que compõe um agente que funciona de verdade.',
    body: 'Cada agente tem: archetype (implementer, architect, reviewer, devops, ux…), persona e tom de voz, ferramentas e acessos configurados, contrato com o time, e instruções específicas do papel. Um agente bem definido não precisa de supervisão constante — ele sabe o que é seu e o que não é.',
    note: 'A qualidade do resultado é diretamente proporcional à clareza com que você define o papel.',
  },
  {
    label: 'Smart Memory · docs/smart-memory/',
    title: 'A memória compartilhada que todos os agentes do time leem — e atualizam.',
    body: 'Smart Memory é o sistema de memória persistente do projeto, armazenada em docs/smart-memory/ no padrão Obsidian. Cada agente lê e escreve aqui: arquitetura, tech stack, stories em andamento, decisões. Nenhum agente começa do zero — o contexto do projeto está sempre presente.',
    note: 'É como uma wiki viva do projeto que todos os agentes mantêm atualizada automaticamente.',
  },
  {
    label: '/team-os · Team Lead',
    title: 'Detecta o projeto. Planeja. Forma o time. Coordena — em um comando.',
    body: 'team-os é a skill de orquestração nativa do Claude Code: detecta o estado do projeto, quebra objetivos em stories, forma o squad certo, spawna cada agente com instruções específicas e coordena a execução em paralelo. É o sistema que usamos para construir tudo que você viu no Módulo 01.',
    note: '/team-os *bootstrap — e o time está formado, a memória populada, o trabalho em andamento.',
  },
  {
    label: '/team-os-creator · Agent Factory',
    title: 'Você descreve o que precisa. Ele gera o agente pronto para trabalhar.',
    body: 'team-os-creator analisa seu projeto, detecta o archetype certo (SaaS, data, marketing, content), propõe o preset de squad ideal e gera cada arquivo de agente completo — com persona, contrato com o time, skills instaladas e instruções validadas em produção. 9 archetypes, 5 presets, do zero ao squad em minutos.',
    note: '/team-os-creator *squad dev — squad completa de 10 agentes gerada e validada automaticamente.',
  },
  {
    label: 'Sites Squad · Caso Real',
    title: 'Uma squad de 10 agentes reconstruiu todo o meu portal em 8 semanas.',
    body: 'A squad Sites — Architect, Frontend, Backend, Data, UX, Hardening, Fullstack, QA, DevOps e Analyst — executou 70+ stories em paralelo. Cada agente com papel definido, contrato com o time e smart-memory compartilhada. Isso é o que você aprende a montar aqui.',
    note: 'O resultado está no ar em joaoguirunas.com — construído com exatamente o que você vai configurar neste dia.',
    screenshot: '/mentoria/portal-opensource.png',
  },
];

export default function CentroTreinamentoPage() {
  return <ModuloSlideshow slug="centro-treinamento" slides={slides} />;
}
