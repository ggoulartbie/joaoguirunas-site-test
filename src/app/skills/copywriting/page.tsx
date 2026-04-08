import type { Metadata } from 'next';
import { SkillPage } from '@/shared/components/ui/SkillPage';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Copywriting Skill para Claude Code',
  description:
    'Skill que ensina o Claude a escrever textos de venda. Frameworks profissionais para landing pages, home e preços.',
  alternates: { canonical: `${siteConfig.url}/skills/copywriting` },
  openGraph: {
    title: 'Copywriting Skill para Claude Code | GrowthSales Open Source',
    description:
      'Skill que ensina o Claude a escrever textos de venda. Frameworks profissionais para landing pages, home e preços.',
    url: `${siteConfig.url}/skills/copywriting`,
    images: [{ url: `${siteConfig.url}/images/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    title: 'Copywriting Skill para Claude Code | GrowthSales Open Source',
    description:
      'Skill que ensina o Claude a escrever textos de venda. Frameworks profissionais para landing pages, home e preços.',
  },
};

const features = [
  {
    title: 'Onboarding do Produto e Audiência',
    description:
      'O Claude faz perguntas sobre seu produto, audiência e objetivo antes de escrever qualquer texto.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>',
  },
  {
    title: 'Frameworks AIDA, PAS, BAB e 4Ps',
    description:
      'Aplica os principais frameworks de copywriting profissional para cada tipo de página e objetivo.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"/>',
  },
  {
    title: 'Copy para Landing Page',
    description:
      'Textos completos para landing pages com hero, benefícios, prova social e CTA de alta conversão.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"/>',
  },
  {
    title: 'Copy para Página de Preços',
    description:
      'Descrições de planos e ancoragem de valor que convertem visitantes em clientes pagantes.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>',
  },
  {
    title: 'CTAs que Convertem',
    description:
      'Chamadas para ação específicas e diretas — nunca genéricas — para cada etapa do funil.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59"/>',
  },
  {
    title: '51k+ Instalações Semanais',
    description:
      'Uma das skills mais instaladas do skills.sh — testada em produção por milhares de usuários.',
    icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  },
];

const longDescription = [
  'A skill de copywriting do skills.sh tem mais de 51 mil instalações semanais porque resolve um problema real: o Claude escreve bem, mas não sabe fazer copy de venda sem orientação. Essa skill dá ao Claude um sistema completo de frameworks profissionais.',
  'Antes de escrever qualquer texto, o Claude faz perguntas sobre seu produto, sua audiência e o objetivo da página. A partir dessas respostas, ele aplica princípios de copy profissional — clareza sobre criatividade, benefícios concretos em vez de funcionalidades genéricas, CTAs que funcionam.',
  'Para instalar, você simplesmente passa o link da skill diretamente para o Claude Code e ele instala sozinho. Depois é só pedir: escreva o copy da minha landing page para um curso de automação. O Claude sabe qual framework aplicar para cada tipo de página.',
];

export default function CopywritingPage() {
  return (
    <SkillPage
      title="Copywriting Skill para Claude Code"
      description="Skill que ensina o Claude a escrever textos de venda. Frameworks profissionais para landing pages, home e preços."
      category="Skills"
      categoryColor="skills"
      longDescription={longDescription}
      features={features}
      primaryLink="https://skills.sh"
      primaryLabel="Ver em Skills.sh"
      isExternal
      author="@joaoguirunas"
      authorUrl="https://github.com/joaoguirunas"
      canonicalPath="/skills/copywriting"
    />
  );
}
