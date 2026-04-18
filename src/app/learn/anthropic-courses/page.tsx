import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cursos Anthropic — Plataforma Oficial',
  description:
    'Cursos gratuitos da Anthropic na plataforma oficial. Aprenda prompt engineering, tool use, agentes e muito mais diretamente com quem criou o Claude.',
  alternates: { canonical: `${siteConfig.url}/learn/anthropic-courses` },
  openGraph: {
    title: 'Cursos Anthropic — Plataforma Oficial | João Guirunas',
    description:
      'Cursos gratuitos da Anthropic na plataforma oficial. Aprenda prompt engineering, tool use, agentes e muito mais diretamente com quem criou o Claude.',
    url: `${siteConfig.url}/learn/anthropic-courses`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Cursos Anthropic — Plataforma Oficial | João Guirunas',
    description:
      'Cursos gratuitos da Anthropic na plataforma oficial. Aprenda prompt engineering, tool use, agentes e muito mais diretamente com quem criou o Claude.',
  },
};

const features = [
  {
    title: 'Intro to Claude',
    description:
      'Fundamentos do Claude: como funciona, capacidades, limites e como tirar o máximo resultado em qualquer tarefa.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  },
  {
    title: 'Prompt Engineering',
    description:
      'Técnicas avançadas de construção de prompts: chain of thought, few-shot, role prompting e estruturação de contexto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  },
  {
    title: 'Tool Use & Function Calling',
    description:
      'Integre o Claude com APIs externas, bancos de dados e ferramentas via function calling para criar agentes reais.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>',
  },
  {
    title: 'Agentic & Multi-Agent',
    description:
      'Construa sistemas de agentes autônomos que planejam, executam e colaboram entre si para tarefas complexas.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  },
  {
    title: 'RAG & Embeddings',
    description:
      'Retrieval Augmented Generation: dê ao Claude acesso a bases de conhecimento externas com embeddings e busca semântica.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>',
  },
  {
    title: 'API & Desenvolvimento',
    description:
      'Use a API da Anthropic do zero: autenticação, streaming, controle de tokens, tratamento de erros e boas práticas de produção.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  },
];

const longDescription = [
  'A Anthropic disponibiliza cursos gratuitos na plataforma oficial de educação — de prompt engineering básico até construção de agentes multi-step com tool use e RAG.',
  'Os cursos são estruturados por nível: do zero absoluto até integrações avançadas com a API. Cada módulo tem exemplos práticos, exercícios e certificado de conclusão.',
  'Todo o conteúdo é oficial, atualizado pela própria Anthropic e reflete as capacidades reais do Claude. Ideal para quem quer dominar o ecossistema sem depender de cursos de terceiros.',
];

export default function AnthropicCoursesPage() {
  return (
    <SkillPage
      title="Cursos Anthropic — Plataforma Oficial"
      description="Cursos gratuitos da Anthropic na plataforma oficial. Aprenda prompt engineering, tool use, agentes e muito mais diretamente com quem criou o Claude."
      category="Aprendizado"
      categoryColor="aprendizado"
      longDescription={longDescription}
      features={features}
      primaryLink="https://anthropic.skilljar.com/"
      primaryLabel="Acessar Plataforma de Cursos"
      author="Anthropic"
      authorUrl="https://anthropic.com"
      bgImage="/images/bg-learn.png"
      canonicalPath="/learn/anthropic-courses"
    />
  );
}
