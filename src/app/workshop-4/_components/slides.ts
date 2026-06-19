export type DeckSlide = {
  slug: string;
  number: number;
  title: string;
  duration: string;
  href: string;
};

export const WORKSHOP_CD_SLIDES: DeckSlide[] = [
  { number: 1, slug: 'abertura',             title: 'Antes da técnica, existe a percepção', duration: '3:00',  href: '/workshop-4/abertura' },
  { number: 2, slug: 'estrutura',            title: 'Claude Design — seu novo diretor de arte', duration: '3:00',  href: '/workshop-4/estrutura' },
  { number: 3, slug: 'ao-vivo',              title: 'Demo ao vivo',                         duration: '20:00', href: '/workshop-4/ao-vivo' },
  { number: 4, slug: 'prompt-design-system', title: 'Prompt: Design System',                duration: '5:00',  href: '/workshop-4/prompt-design-system' },
  { number: 5, slug: 'prompt-apresentacao',  title: 'Prompt: Apresentação',                 duration: '5:00',  href: '/workshop-4/prompt-apresentacao' },
  { number: 6, slug: 'mentoria',             title: '47 agentes na sua empresa',            duration: '2:00',  href: '/workshop-4/mentoria' },
];
