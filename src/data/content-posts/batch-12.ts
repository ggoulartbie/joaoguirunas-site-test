import { ContentPost } from '@/types/content-post'

export const batch12: ContentPost[] = [
  {
    slug: 'tipografia-certa-com-claude-code',
    data: '2026-07-19',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Sua Tipografia em 8 Minutos — Um Prompt Pro Claude Code',
    ferramenta: 'Claude Code',
    link: '/open-source/tipografia-certa-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'FONTE',
    pilar: 'Ferramentas e Produtividade',
    duracao: '30s',
    longDescription: [
      'A tipografia do seu projeto está destruindo a percepção do trabalho — e você não percebe porque o problema nunca é óbvio. Fonte genérica, hierarquia plana, sem respiro entre tamanhos. Parece amador mesmo quando o código é bom.',
      'Um prompt pro Claude Code resolve isso em 8 minutos. Você descreve o projeto: tom, público, tipo de produto. O Claude escolhe o stack de 3 fontes, justifica cada escolha e entrega o layout.tsx, o globals.css e exemplos de uso — tudo configurado para o seu contexto específico.',
      'Este guia entrega o prompt completo com o campo personalizável em destaque, os 4 stacks mais usados por tipo de projeto e o exemplo real de output gerado para um SaaS financeiro em dark mode.',
    ],
    features: [
      { title: 'Sistema de 3 camadas', description: 'Display (personalidade) + Body (legibilidade) + Mono (textura técnica) — a lógica que o Claude usa para decidir.', icon: 'framework' },
      { title: '4 stacks por contexto', description: 'Editorial, SaaS, Vercel Ecosystem e Corporativo — o Claude escolhe o stack conforme a descrição do seu projeto.', icon: 'design' },
      { title: 'Prompt pronto para usar', description: 'Cole no Claude Code, preencha o campo em laranja com o seu projeto e receba o stack escolhido com justificativa.', icon: 'copywriting' },
      { title: 'Output: layout.tsx completo', description: 'Imports de next/font/google e variáveis CSS configuradas para o seu projeto específico.', icon: 'book' },
      { title: 'Output: globals.css + Tailwind', description: 'Variáveis @theme para Tailwind v4 ou tailwind.config.ts para v3 — conforme o seu stack.', icon: 'setup' },
      { title: 'Exemplos de uso incluídos', description: 'H1 com display, parágrafo com body e label técnico com mono — prontos para copiar e adaptar.', icon: 'automation' },
    ],
    primaryLink: '/open-source/tipografia-certa-com-claude-code',
    isExternal: false,
    bgImage: '/images/bg-framework.png',
    author: 'João Guirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      { type: 'heading', text: 'O sistema de 3 camadas' },
      { type: 'paragraph', text: 'Para o prompt funcionar, o Claude precisa entender a lógica das 3 camadas. Isso é o que ele usa para decidir qual fonte serve pro seu projeto — não chuta uma fonte aleatória, aplica critério.' },
      { type: 'steps', items: [
        'Display — Personalidade: carrega a identidade. H1, heroes, números em destaque. Pode ser serifada, grotesca pesada, experimental. É o rosto do projeto.',
        'Body — Legibilidade: o usuário lê sem notar. Parágrafos, labels de interface, botões. Precisa ser neutra e confortável em múltiplos tamanhos.',
        'Mono — Textura técnica: sinaliza informação técnica. Badges, metadados, eyebrows, código, timestamps. Cria contraste sem mudar cor ou tamanho.',
      ]},
      { type: 'heading', text: 'Stacks por contexto de projeto' },
      { type: 'paragraph', text: 'O Claude decide qual stack usar baseado no que você descreve. Esses são os padrões que ele vai aplicar — dependendo do tom e do tipo de produto.' },
      { type: 'steps', items: [
        'Editorial / Premium / Dark → Fraunces + Inter Tight + JetBrains Mono. Portfólios, agências, projetos com identidade visual forte. João usa esse.',
        'SaaS / Startup / Tech → Sora + Plus Jakarta Sans + JetBrains Mono. Apps, ferramentas de produtividade, produtos com tom ambicioso.',
        'Vercel Ecosystem / Next.js → Space Grotesk + Geist + Geist Mono. Dev tools, infra, projetos no ecossistema Vercel.',
        'Clássico / Serviços / Corporativo → Playfair Display + DM Sans + Fira Code. Imobiliárias, consultoria, restaurantes, serviços premium.',
      ]},
      { type: 'heading', text: 'O prompt' },
      { type: 'paragraph', text: 'Substitua apenas o trecho em destaque pela descrição do seu projeto. Seja específico: tom, público, tipo de produto. Quanto mais contexto, mais preciso o resultado.' },
      { type: 'code', language: 'markdown', code: `Vou te passar o contexto do meu projeto e você vai configurar a tipografia completa para ele.

MEU PROJETO: [descreva aqui — ex: "um SaaS de gestão financeira para pequenas empresas, tom sério mas acessível, dark mode, Next.js"]

Com base nesse contexto, faça o seguinte:

1. ESCOLHA o stack de 3 fontes (display + body + mono) que melhor combina com o projeto. Use fontes disponíveis no Google Fonts / next/font.

2. JUSTIFIQUE brevemente por que cada fonte faz sentido para esse tom e público.

3. GERE o arquivo layout.tsx completo com os imports de next/font/google e as variáveis CSS configuradas.

4. GERE o globals.css com as variáveis @theme para Tailwind v4 (ou tailwind.config.ts para v3).

5. MOSTRE um exemplo de uso para:
   - H1 com a fonte display (grande, com ênfase em itálico)
   - Parágrafo com a fonte body
   - Label técnico com a fonte mono (uppercase, tracking largo)

Entrega tudo junto, sem explicações intermediárias — só o raciocínio final e o código.` },
      { type: 'heading', text: 'O que o Claude entrega' },
      { type: 'steps', items: [
        'Stack escolhido com justificativa: por que cada fonte faz sentido para o tom e público do seu projeto.',
        'layout.tsx completo: imports de next/font/google, variáveis CSS configuradas e aplicadas no html.',
        'globals.css pronto: variáveis @theme para Tailwind v4 — ou tailwind.config.ts para projetos em v3.',
        'Exemplos de uso: H1 com display, parágrafo com body e label técnico com mono em código real.',
      ]},
      { type: 'callout', text: 'Não precisa saber qual fonte usar. Só descrever o projeto. O Claude escolhe, justifica e entrega o código — você revisa e aplica.' },
    ],
  },
]
