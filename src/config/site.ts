export const siteConfig = {
  name: 'João Guirunas',
  url: 'https://joaoguirunas.com',
  description:
    'CEO da GrowthSales.ai. Uso IA em negócios reais — automação, growth e sistemas que escalam. O que funciona, eu compartilho e ensino.',
  ogImage: '/images/og-default.png',
  locale: 'pt_BR',
  lang: 'pt-BR',
  twitter: {
    site: '@joaoguirunas',
    creator: '@joaoguirunas',
  },
  social: {
    github: 'https://github.com/joaoguirunas',
    linkedin: 'https://linkedin.com/in/joaoguirunas',
    twitter: 'https://twitter.com/joaoguirunas',
  },
} as const;

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'João Guirunas',
  url: siteConfig.url,
  image: `${siteConfig.url}/images/joao-guirunas-profile.jpg`,
  description: siteConfig.description,
  jobTitle: 'CEO',
  worksFor: {
    '@type': 'Organization',
    name: 'GrowthSales.ai',
    url: 'https://www.growthsales.ai',
  },
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
