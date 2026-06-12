export type DeckSlide = {
  slug: string;
  number: number;
  title: string;
  duration: string;
  href: string;
};

export const WORKSHOP_3_SLIDES: DeckSlide[] = [
  { slug: 'quem-somos',       number: 1, title: 'Olá, Growth Sales',           duration: '2 min',  href: '/workshop-3/quem-somos' },
  { slug: 'pergunta',         number: 2, title: 'A pergunta errada',            duration: '2 min',  href: '/workshop-3/pergunta' },
  { slug: 'tese',             number: 3, title: 'A tese',                       duration: '2 min',  href: '/workshop-3/tese' },
  { slug: 'workos',           number: 4, title: 'WorkOS',                       duration: '3 min',  href: '/workshop-3/workos' },
  { slug: 'orquestrador',     number: 5, title: 'Orquestrador Comercial',       duration: '3 min',  href: '/workshop-3/orquestrador' },
  { slug: 'numeros',          number: 6, title: 'Os números',                   duration: '2 min',  href: '/workshop-3/numeros' },
  { slug: 'clientes',         number: 7, title: 'Quem confiou',                 duration: '2 min',  href: '/workshop-3/clientes' },
  { slug: 'processo-interno', number: 8, title: 'A gente come o que cozinha',   duration: '2 min',  href: '/workshop-3/processo-interno' },
  { slug: 'reflexao',         number: 9, title: 'Reflexão final',               duration: '2 min',  href: '/workshop-3/reflexao' },
];
