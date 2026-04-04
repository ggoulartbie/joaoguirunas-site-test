export const siteConfig = {
  name: 'GrowthSales Open Source',
  url: 'https://opensource.growthsales.ai',
  description:
    'Open Source Tools by GrowthSales AI — Multiplicacao de produtividade com agentes autonomos e Claude Code.',
  ogImage: '/images/og-default.png',
  locale: 'pt_BR',
  lang: 'pt-BR',
  twitter: {
    site: '@growthsales_ai',
    creator: '@growthsales_ai',
  },
  social: {
    github: 'https://github.com/SynkraAI',
    linkedin: 'https://linkedin.com/company/growthsales-ai',
    twitter: 'https://twitter.com/growthsales_ai',
  },
} as const;

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GrowthSales AI',
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.svg`,
  description:
    'Open source tools para multiplicacao de produtividade com agentes autonomos e Claude Code.',
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.twitter],
};

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: siteConfig.lang,
};
