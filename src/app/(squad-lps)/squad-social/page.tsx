import type { Metadata } from 'next';
import type { SquadConfig } from '../_components/types';
import { SquadHero } from '../_components/SquadHero';
import { SquadSelos } from '../_components/SquadSelos';
import { SquadProblema } from '../_components/SquadProblema';
import { SquadVirada } from '../_components/SquadVirada';
import { SquadCurriculum } from '../_components/SquadCurriculum';
import { SquadBonus } from '../_components/SquadBonus';
import { SquadProva } from '../_components/SquadProva';
import { SquadTransparencia } from '../_components/SquadTransparencia';
import { SquadInstrutor } from '../_components/SquadInstrutor';
import { SquadOferta } from '../_components/SquadOferta';
import { SquadFaq } from '../_components/SquadFaq';
import { SquadCtaFinal } from '../_components/SquadCtaFinal';

export const metadata: Metadata = {
  title: 'Squad de Social Media — Conteúdo com IA no piloto automático | João Guirunas',
  description:
    'Monte uma squad de IA que cria e publica conteúdo para suas redes — imagens, vídeos com avatar, narração e postagem automática via Meta API.',
  alternates: { canonical: '/squad-social' },
  openGraph: {
    title: 'Squad de Social Media — Conteúdo com IA no piloto automático | João Guirunas',
    description:
      'Monte uma squad de IA que cria e publica conteúdo para suas redes — imagens, vídeos com avatar, narração e postagem automática via Meta API.',
    url: '/squad-social',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Squad de Social Media — Conteúdo com IA no piloto automático | João Guirunas',
    description:
      'Monte uma squad de IA que cria e publica conteúdo para suas redes — imagens, vídeos com avatar, narração e postagem automática via Meta API.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Squad de Social Media',
  description:
    'O sistema completo que produz conteúdo de social media no piloto automático, usando Freepik, Eleven Labs, Heygen e publicação direta via Meta API.',
  provider: {
    '@type': 'Person',
    name: 'João Guirunas',
    url: 'https://joaoguirunas.com',
  },
  offers: {
    '@type': 'Offer',
    price: '297',
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
  },
};

const config: SquadConfig = {
  headline:
    'Monte uma squad de IA que cria e publica conteúdo para suas redes sozinha — imagens, vídeos com avatar, narração e postagem automática',
  sub:
    'O sistema completo que produz conteúdo de social media no piloto automático, usando Freepik, Eleven Labs, Heygen e publicação direta via Meta API',
  ctaLabel: 'QUERO MINHA SQUAD DE SOCIAL MEDIA — R$297',
  price: 'R$297',
  priceInstallments: '5x R$64,90',
  problema:
    'Criar conteúdo para redes sociais consome horas todo dia — imagem, legenda, narração, vídeo, postagem. Ou você faz tudo manual e fica preso na operação, ou terceiriza por R$3.000+ por mês e perde o controle da voz da marca.',
  virada:
    'Com uma squad de agentes de IA, você monta uma linha de produção: um agente gera a imagem, outro narra, outro cria o vídeo com avatar, outro publica. Você aprova — a squad executa. Conteúdo consistente sem virar escravo da criação.',
  curriculum: [
    {
      titulo: 'Geração de imagem via Freepik',
      resultado: 'Imagens profissionais para posts e stories em segundos',
    },
    {
      titulo: 'Narração com Eleven Labs',
      resultado: 'Voz sintética natural para vídeos e reels sem gravar',
    },
    {
      titulo: 'Vídeo com avatar via Heygen',
      resultado: 'Vídeos com apresentador IA para YouTube, Instagram e TikTok',
    },
    {
      titulo: 'Publicação automática via Meta API',
      resultado: 'Posts agendados e publicados no Instagram e Facebook sem abrir o app',
    },
  ],
  bonus:
    'Claude Design aplicado a social media — crie paleta de cores, tipografia e estilo de key visual (KV) com agentes para ter identidade visual consistente em todos os canais.',
  instrutor: {
    nome: 'João Guirunas',
    cargo: 'CSO · GrowthSales.ai',
    bio: 'João é co-fundador da GrowthSales.ai e criador do método Claude Agent Teams. Desenvolveu o sistema de produção de conteúdo com IA que a própria GrowthSales usa — e que originou este módulo da Mentoria.',
  },
  faq: [
    {
      pergunta: 'Preciso saber programar para usar essas ferramentas?',
      resposta:
        'Não. Você vai aprender a configurar cada ferramenta e orquestrá-las com agentes — nenhuma linha de código escrita manualmente.',
    },
    {
      pergunta: 'Funciona para qualquer nicho?',
      resposta:
        'Sim. O sistema de produção é agnóstico de nicho — você configura o tom, o estilo visual e o tipo de conteúdo para o seu mercado.',
    },
    {
      pergunta: 'As ferramentas (Freepik, Heygen, Eleven Labs) são pagas separado?',
      resposta:
        'Sim, cada plataforma tem seu próprio plano. Todas têm versão free ou trial para você começar — os planos pagos valem a partir do momento em que você começa a monetizar o conteúdo.',
    },
    {
      pergunta: 'Em quanto tempo o sistema fica funcionando?',
      resposta:
        'Estudantes da Mentoria configuraram o pipeline completo em 1 a 2 semanas. Depende da sua disponibilidade diária.',
    },
    {
      pergunta: 'Posso usar para criar conteúdo para clientes (agência)?',
      resposta:
        'Sim. Vários alunos da Mentoria montaram agências de conteúdo com IA usando exatamente esse sistema.',
    },
    {
      pergunta: 'Qual a diferença entre esta Squad e o Curso Online R$797?',
      resposta:
        'O Curso Online inclui os 3 módulos (Sites, Social Media e Dev). Esta Squad foca exclusivamente em Social Media — ideal para quem quer dominar produção de conteúdo com IA antes de expandir.',
    },
    {
      pergunta: 'Tem garantia?',
      resposta:
        'Sim. Garantia incondicional de 7 dias. Se não gostar por qualquer motivo, devolvemos 100% — sem perguntas.',
    },
  ],
};

export default function SquadSocialPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SquadHero
        headline={config.headline}
        sub={config.sub}
        ctaLabel={config.ctaLabel}
        price={config.price}
        priceInstallments={config.priceInstallments}
      />
      <SquadSelos />
      <SquadProblema problema={config.problema} />
      <SquadVirada virada={config.virada} />
      <SquadCurriculum curriculum={config.curriculum} />
      <SquadBonus bonus={config.bonus} />
      <SquadProva />
      <SquadTransparencia />
      <SquadInstrutor instrutor={config.instrutor} />
      <SquadOferta
        price={config.price}
        priceInstallments={config.priceInstallments}
        ctaLabel={config.ctaLabel}
      />
      <SquadFaq faq={config.faq} />
      <SquadCtaFinal ctaLabel={config.ctaLabel} />
    </>
  );
}
