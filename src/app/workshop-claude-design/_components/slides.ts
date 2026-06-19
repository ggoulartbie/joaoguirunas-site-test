export type DeckSlide = {
  slug: string;
  number: number;
  title: string;
  duration: string;
  href: string;
};

export const WORKSHOP_CD_SLIDES: DeckSlide[] = [
  { slug: 'abertura',           number: 1,  title: 'Antes da técnica, existe a percepção', duration: '3:00',  href: '/workshop-claude-design/abertura' },
  { slug: 'interface',          number: 2,  title: 'Interface do Claude Design',           duration: '4:00',  href: '/workshop-claude-design/interface' },
  { slug: 'design-system',      number: 3,  title: 'Design System — Demo',                 duration: '6:00',  href: '/workshop-claude-design/design-system' },
  { slug: 'kv-social',          number: 4,  title: 'KV Social — Demo',                     duration: '5:00',  href: '/workshop-claude-design/kv-social' },
  { slug: 'kv-site',            number: 5,  title: 'KV Site — Demo',                       duration: '5:00',  href: '/workshop-claude-design/kv-site' },
  { slug: 'divisao',            number: 6,  title: 'Design System vs KV',                  duration: '4:00',  href: '/workshop-claude-design/divisao' },
  { slug: 'handoff',            number: 7,  title: 'O Handoff',                            duration: '4:00',  href: '/workshop-claude-design/handoff' },
  { slug: 'prompt-design-system', number: 8, title: 'Prompt: Design System',              duration: '5:00',  href: '/workshop-claude-design/prompt-design-system' },
  { slug: 'prompt-apresentacao', number: 9, title: 'Prompt: Apresentação',                duration: '5:00',  href: '/workshop-claude-design/prompt-apresentacao' },
  { slug: 'demo-slides',        number: 10, title: 'Demo Final: Slides do Pitch',          duration: '10:00', href: '/workshop-claude-design/demo-slides' },
];
