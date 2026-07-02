import type { Metadata } from 'next'
import type { SquadConfig } from '../_components/types'
import { SquadHero } from '../_components/SquadHero'
import { SquadSelos } from '../_components/SquadSelos'
import { SquadProblema } from '../_components/SquadProblema'
import { SquadVirada } from '../_components/SquadVirada'
import { SquadCurriculum } from '../_components/SquadCurriculum'
import { SquadBonus } from '../_components/SquadBonus'
import { SquadProva } from '../_components/SquadProva'
import { SquadTransparencia } from '../_components/SquadTransparencia'
import { SquadInstrutor } from '../_components/SquadInstrutor'
import { SquadOferta } from '../_components/SquadOferta'
import { SquadFaq } from '../_components/SquadFaq'
import { SquadCtaFinal } from '../_components/SquadCtaFinal'
import { AgentPlanetBackground } from '@/app/agentes/_components/AgentPlanetBackground'
import { SquadAgentes } from '../_components/SquadAgentes'
import { SquadFloatingCTA } from '../_components/SquadFloatingCTA'
import { Depoimentos } from '@/shared/components/sections/Depoimentos'
import { getAgentesBySquad, SQUADS } from '@/data/agentes'

const config: SquadConfig = {
  headline: 'Construa sistemas com banco de dados real, login de usuário e API — sem contratar um desenvolvedor',
  sub: 'Aprenda a orquestrar uma squad de IA que cria tabelas, escreve queries, configura autenticação e expõe APIs usando Supabase — para o seu produto ou para clientes',
  ctaLabel: 'QUERO MINHA SQUAD DE DEV — R$397',
  price: 'R$397',
  priceInstallments: '5x R$86,90',
  accent: '#A78BFA',
  squadId: 'dev',
  race: 'Arcturiana',
  problema:
    'Você tem uma ideia de produto digital mas trava quando precisa de banco de dados, autenticação ou API. Contratar um dev custa caro e cria dependência — e as ferramentas no-code não escalam.',
  virada:
    'Com uma squad de agentes de IA + Supabase, você constrói o backend do zero: tabelas, autenticação de usuários e APIs expostas. Você define o que o sistema precisa fazer — a squad implementa. Você deixa de ser o gargalo do produto.',
  curriculum: [
    { titulo: 'Criação de tabelas no Supabase', resultado: 'Schema de banco de dados criado e documentado sem escrever SQL manualmente' },
    { titulo: 'Configuração de autenticação', resultado: 'Login e cadastro de usuários funcionando em minutos' },
    { titulo: 'Queries com agentes', resultado: 'Buscas, filtros e joins escritos por agentes — você só descreve o que quer' },
    { titulo: 'Exposição de APIs', resultado: 'Endpoints REST disponíveis para qualquer frontend ou integração' },
  ],
  bonus:
    'Gravação de projeto real do zero — banco + auth + API construídos ao vivo em uma sessão completa, do schema ao endpoint funcionando.',
  instrutor: {
    nome: 'João Guirunas',
    cargo: 'CSO · GrowthSales.ai',
    bio: 'João é co-fundador da GrowthSales.ai e criador do método Claude Agent Teams. O próprio backend da plataforma da GrowthSales foi construído com essa mesma squad de dev — é o que você vai aprender neste módulo.',
  },
  faq: [
    {
      pergunta: 'Preciso saber programar para fazer este curso?',
      resposta:
        'Não. Você aprende a descrever o que o sistema precisa fazer — os agentes escrevem o código SQL, as migrations e as configurações do Supabase.',
    },
    {
      pergunta: 'O Supabase é pago separado?',
      resposta:
        'O Supabase tem um plano gratuito generoso (500MB de banco, auth ilimitado) que cobre o aprendizado completo. Você só precisa de plano pago quando o produto crescer.',
    },
    {
      pergunta: 'Serve para qualquer tipo de sistema?',
      resposta:
        'Qualquer sistema que precise de banco de dados relacional, autenticação e API — SaaS, marketplace, plataforma de cursos, app interno, etc.',
    },
    {
      pergunta: 'Em quanto tempo consigo montar o primeiro banco de dados?',
      resposta:
        'No primeiro módulo você já cria tabelas e configura autenticação. Alunos da Mentoria entregaram projetos funcionais em 1 a 3 semanas.',
    },
    {
      pergunta: 'Posso usar para projetos comerciais ou de clientes?',
      resposta:
        'Sim. O curso foi desenhado para isso — você aprende a montar um sistema que pode ser entregue para clientes ou virar a base do seu próprio produto.',
    },
    {
      pergunta: 'Qual a diferença entre esta Squad e o Curso Online R$797?',
      resposta:
        'O Curso Online cobre os 3 módulos. Esta Squad foca exclusivamente em Dev — ideal para quem quer dominar backend com IA antes de partir para os outros módulos.',
    },
    {
      pergunta: 'Tem garantia?',
      resposta:
        'Sim. Garantia incondicional de 7 dias. Devolução de 100% sem nenhuma pergunta.',
    },
  ],
}

const devSquad = SQUADS.find(s => s.id === 'dev')!
const devAgentes = getAgentesBySquad('dev')

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Squad de Dev',
  description: config.sub,
  provider: { '@type': 'Person', name: 'João Guirunas' },
  offers: { '@type': 'Offer', price: '397', priceCurrency: 'BRL' },
}

export const metadata: Metadata = {
  title: 'Squad de Dev — Construa sistemas com banco de dados e API com IA | João Guirunas',
  description:
    'Aprenda a orquestrar uma squad de IA que cria tabelas, configura autenticação e expõe APIs no Supabase. Sem contratar um desenvolvedor.',
  alternates: { canonical: '/squad-dev' },
  openGraph: {
    title: 'Squad de Dev — Construa sistemas com banco de dados e API com IA | João Guirunas',
    description:
      'Aprenda a orquestrar uma squad de IA que cria tabelas, configura autenticação e expõe APIs no Supabase. Sem contratar um desenvolvedor.',
    url: '/squad-dev',
  },
}

export default function SquadDevPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AgentPlanetBackground squadId="dev" />
      <div className="relative z-10 -mt-16">
        <SquadHero
          headline={config.headline}
          sub={config.sub}
          ctaLabel={config.ctaLabel}
          price={config.price}
          priceInstallments={config.priceInstallments}
          checkoutUrl="https://pay.kiwify.com.br/AY2hGbT"
          accent="#A78BFA"
          badgeLabel="SQUAD DEV · ARCTURIANA"
          vslAccent="#A78BFA"
        />
        <SquadSelos />
        <SquadProblema problema={config.problema} />
        <SquadVirada virada={config.virada} />
        <SquadCurriculum
          accent="#A78BFA"
          ctaLabel="Garantir minha vaga — R$397"
          checkoutUrl="https://pay.kiwify.com.br/AY2hGbT"
          squadModule={{
            num: 8,
            title: 'Squad Dev',
            count: 19,
            description:
              'Do site ao sistema. Sua primeira aplicação real — plataforma de cursos com login, área de membros e painel administrativo. Banco de dados, autenticação e deploy com Supabase.',
            tags: ['Supabase', 'Auth', 'API', 'Deploy'],
          }}
        />
        <SquadBonus bonus={config.bonus} />
        <SquadAgentes agentes={devAgentes} squad={devSquad} />
        <SquadProva />
        <Depoimentos accent="#A78BFA" />
        <SquadTransparencia />
        <SquadInstrutor instrutor={config.instrutor} />
        <SquadOferta
          price={config.price}
          priceInstallments={config.priceInstallments}
          ctaLabel={config.ctaLabel}
          checkoutUrl="https://pay.kiwify.com.br/AY2hGbT"
        />
        <SquadFaq faq={config.faq} />
        <SquadCtaFinal ctaLabel={config.ctaLabel} checkoutUrl="https://pay.kiwify.com.br/AY2hGbT" />
      </div>
      <SquadFloatingCTA ctaLabel="Garantir vaga" price="R$397" accent="#A78BFA" checkoutUrl="https://pay.kiwify.com.br/AY2hGbT" />
    </>
  )
}
