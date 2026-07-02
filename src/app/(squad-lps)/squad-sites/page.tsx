import type { Metadata } from 'next'
import type { SquadConfig } from '../_components/types'
import { AgentPlanetBackground } from '@/app/agentes/_components/AgentPlanetBackground'
import { SquadHero } from '../_components/SquadHero'
import { SquadSelos } from '../_components/SquadSelos'
import { SquadProblema } from '../_components/SquadProblema'
import { SquadVirada } from '../_components/SquadVirada'
import { SquadCurriculum } from '../_components/SquadCurriculum'
import { SquadBonus } from '../_components/SquadBonus'
import { SquadAgentes } from '../_components/SquadAgentes'
import { SquadTransparencia } from '../_components/SquadTransparencia'
import { SquadInstrutor } from '../_components/SquadInstrutor'
import { SquadOferta } from '../_components/SquadOferta'
import { SquadFaq } from '../_components/SquadFaq'
import { SquadCtaFinal } from '../_components/SquadCtaFinal'
import { SquadFloatingCTA } from '../_components/SquadFloatingCTA'
import { Depoimentos } from '@/shared/components/sections/Depoimentos'
import { SitesPortfolio } from '../_components/SitesPortfolio'
import { getAgentesBySquad, SQUADS } from '@/data/agentes'

const sitesSquad = SQUADS.find(s => s.id === 'sites')!

const config: SquadConfig = {
  headline: 'Crie sites profissionais com agentes de IA — e comece a cobrar de R$1.500 a R$3.000 por projeto, mesmo sem saber programar',
  sub: 'O passo a passo completo para montar sua própria squad de IA que cria, publica e entrega sites no ar — do zero ao primeiro cliente pagante',
  ctaLabel: 'QUERO CRIAR MINHA SQUAD DE SITES — R$297',
  price: 'R$297',
  priceInstallments: '5x R$64,90',
  accent: '#FF3A0E',
  squadId: 'sites' as const,
  race: 'Luminari',
  problema:
    'Você quer criar sites para clientes (ou para o seu negócio) mas não sabe programar — e contratar um dev custa caro e demora. As ferramentas no-code têm limite, e você acaba preso em templates que todo mundo usa.',
  virada:
    'Com uma squad de agentes de IA, você orquestra o processo inteiro: do repositório ao deploy, passando por domínio e publicação automática. Você é o arquiteto — os agentes fazem o trabalho pesado.',
  curriculum: [
    { titulo: 'Squad Sites Luminari em ação', resultado: 'Veja o sistema completo funcionando antes de montar o seu' },
    { titulo: 'Criação de repositório', resultado: 'Repositório estruturado e pronto para versionamento em minutos' },
    { titulo: 'Deploy Vercel', resultado: 'Site no ar com domínio em menos de 1 hora' },
    { titulo: 'Configuração de domínio e DNS', resultado: 'Domínio próprio apontando para o site sem precisar de suporte técnico' },
    { titulo: 'Publicação automática via GitHub', resultado: 'Cada commit atualiza o site automaticamente — zero deploy manual' },
  ],
  bonus:
    'Módulo Claude Design aplicado a sites — aprenda a criar identidade visual, paleta de cores e tipografia com agentes antes de colocar o site no ar.',
  instrutor: {
    nome: 'João Guirunas',
    cargo: 'CSO · GrowthSales.ai',
    bio: 'João é co-fundador da GrowthSales.ai e criador do método Claude Agent Teams. Construiu dezenas de sistemas com IA e ensina na Mentoria Claude Code, onde o conteúdo desta Squad foi originalmente desenvolvido.',
  },
  faq: [
    {
      pergunta: 'Preciso saber programar para fazer este curso?',
      resposta:
        'Não. O método foi desenhado para quem nunca programou. Você aprende a orquestrar agentes de IA que escrevem o código — seu papel é de arquiteto, não de dev.',
    },
    {
      pergunta: 'Funciona no Windows ou só no Mac?',
      resposta:
        'Funciona nos dois. O ambiente é baseado em ferramentas web e terminais padrão (VS Code + terminal) — disponíveis no Windows, Mac e Linux.',
    },
    {
      pergunta: 'Tem alguma ferramenta paga além do curso?',
      resposta:
        'O Claude (Anthropic) e o Vercel têm planos gratuitos suficientes para começar. À medida que você cresce e começa a cobrar de clientes, esses custos são facilmente absorvidos.',
    },
    {
      pergunta: 'Em quanto tempo posso entregar o primeiro site para um cliente?',
      resposta:
        'Estudantes da Mentoria entregaram o primeiro projeto em 2 a 4 semanas. Depende do seu ritmo — o conteúdo foi estruturado para ser executado em paralelo com sua rotina.',
    },
    {
      pergunta: 'Posso usar o que aprender para cobrar de clientes?',
      resposta:
        'Sim. O curso foi desenhado para isso. Você vai aprender a montar uma operação que pode cobrar de R$1.500 a R$3.000 por projeto.',
    },
    {
      pergunta: 'Qual a diferença entre esta Squad e o Curso Online R$797?',
      resposta:
        'O Curso Online cobre os 3 módulos completos (Sites, Social Media e Dev). Esta Squad foca exclusivamente no módulo de Sites — ideal para quem quer começar por este nicho específico antes de expandir.',
    },
    {
      pergunta: 'Tem garantia?',
      resposta:
        'Sim. Garantia incondicional de 7 dias. Se não gostar por qualquer motivo, devolvemos 100% do valor — sem perguntas.',
    },
  ],
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Squad de Sites',
  description: config.sub,
  provider: { '@type': 'Person', name: 'João Guirunas' },
  offers: { '@type': 'Offer', price: '297', priceCurrency: 'BRL' },
}

export const metadata: Metadata = {
  title: 'Squad de Sites — Crie sites com agentes de IA | João Guirunas',
  description:
    'Aprenda a criar e publicar sites profissionais com agentes de IA. Do repositório ao deploy Vercel. Mesmo sem saber programar.',
  alternates: { canonical: '/squad-sites' },
  openGraph: {
    title: 'Squad de Sites — Crie sites com agentes de IA | João Guirunas',
    description:
      'Aprenda a criar e publicar sites profissionais com agentes de IA. Do repositório ao deploy Vercel. Mesmo sem saber programar.',
    url: '/squad-sites',
  },
}

export default async function SquadSitesPage() {
  const vimeoRes = await fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/1206325946&width=1920', { next: { revalidate: 86400 } })
  const vimeoData = vimeoRes.ok ? await vimeoRes.json() : null
  const vslThumbnailUrl: string | undefined = vimeoData?.thumbnail_url

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgentPlanetBackground squadId="sites" />
      <div className="relative z-10 -mt-16">
        <SquadHero
          headline={config.headline}
          sub={config.sub}
          ctaLabel={config.ctaLabel}
          price={config.price}
          priceInstallments={config.priceInstallments}
          accent="#FF3A0E"
          badgeLabel="SQUAD SITES · LUMINARI"
          vslAccent="#FF3A0E"
          vslVideoId="1206325946"
          vslThumbnailUrl={vslThumbnailUrl}
        />
        <SquadSelos />
        <SquadProblema problema={config.problema} />
        <SquadVirada virada={config.virada} />
        <SquadCurriculum
          accent="#FF3A0E"
          ctaLabel="Garantir minha vaga — R$297"
          squadModule={{
            num: 6,
            title: 'Squad de Sites',
            count: 13,
            description:
              'Do zero ao site no ar. GitHub, Vercel, Next.js e a squad Luminari construindo. Em uma manhã você publica o que uma equipe humana entrega em semanas — operando tudo pelo terminal, via Claude Code.',
            tags: ['GitHub', 'Vercel', 'Next.js', 'Deploy'],
          }}
        />
        <SquadBonus bonus={config.bonus} />
        <SquadAgentes agentes={getAgentesBySquad('sites')} squad={sitesSquad} />
<SitesPortfolio accent="#FF3A0E" />
        <Depoimentos accent="#FF3A0E" />
        <SquadTransparencia />
        <SquadInstrutor instrutor={config.instrutor} />
        <SquadOferta
          price={config.price}
          priceInstallments={config.priceInstallments}
          ctaLabel={config.ctaLabel}
        />
        <SquadFaq faq={config.faq} />
        <SquadCtaFinal ctaLabel={config.ctaLabel} />
      </div>
      <SquadFloatingCTA ctaLabel="Garantir vaga" price="R$297" accent="#FF3A0E" />
    </>
  )
}
