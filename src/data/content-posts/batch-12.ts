import { ContentPost } from '@/types/content-post'

export const batch12: ContentPost[] = [
  {
    slug: 'tipografia-certa-com-claude-code',
    data: '2026-07-19',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Sua Tipografia com Um Prompt Pro Claude Code',
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
    bgImage: '/images/bg-designer.png',
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

  {
    slug: 'dark-mode-com-claude-code',
    data: '2026-07-13',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Dark Mode com Um Prompt Pro Claude Code',
    ferramenta: 'Claude Code',
    link: '/open-source/dark-mode-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'DARK',
    pilar: 'Ferramentas e Produtividade',
    duracao: '30s',
    longDescription: [
      'Dark mode não é uma feature de UI — é uma expectativa. Usuário abre seu projeto às 23h com brilho reduzido no celular e vê um fundo branco gritando. A implementação errada são 3 arquivos e 40 variáveis duplicadas. A certa é um sistema de CSS variables que funciona em qualquer projeto, em 6 minutos.',
      'Um prompt pro Claude Code resolve. Ele cria o sistema de variáveis, o toggle com persistência em localStorage, a detecção automática de prefers-color-scheme e adiciona o botão no header — sem dependência externa, sem biblioteca.',
      'Este guia entrega o prompt completo e o guia de 3 passos para implementar em qualquer projeto existente — React, Next.js ou HTML puro.',
    ],
    features: [
      { title: 'Sistema de CSS variables', description: '--bg, --text, --surface, --border e --accent em light e dark — um lugar para mudar tudo.', icon: 'design' },
      { title: 'Toggle com localStorage', description: 'Preferência do usuário persistida — quando ele volta, o tema está exatamente como deixou.', icon: 'setup' },
      { title: 'Detecção de prefers-color-scheme', description: 'Primeira visita: o app adota o tema do sistema automaticamente. Zero configuração para o usuário.', icon: 'framework' },
      { title: 'Transição suave em todos os elementos', description: 'transition: background 0.25s, color 0.25s aplicado globalmente — sem piscar na alternância.', icon: 'automation' },
      { title: 'Sem dependência externa', description: 'CSS puro + JavaScript nativo. Funciona em React, Next.js, Vue ou HTML puro sem instalar nada.', icon: 'plugin' },
      { title: 'Prompt pronto para usar', description: 'Cole no Claude Code, adicione o contexto do projeto, receba o sistema completo em 6 minutos.', icon: 'copywriting' },
    ],
    primaryLink: '/open-source/dark-mode-com-claude-code',
    isExternal: false,
    bgImage: '/images/bg-monitor-new.png',
    author: 'João Guirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      { type: 'heading', text: 'O sistema de CSS variables' },
      { type: 'paragraph', text: 'A implementação correta de dark mode não duplica valores — ela cria um sistema de variáveis semânticas que mudam conforme o tema ativo. Cinco variáveis cobrem 90% dos projetos: --bg (fundo principal), --text (texto principal), --surface (cards e painéis), --border (bordas e divisores) e --accent (cor de destaque). Você define os valores em :root para light e em [data-theme="dark"] para dark. O resto do CSS usa var() — nada mais.' },
      { type: 'heading', text: 'O prompt' },
      { type: 'code', language: 'markdown', code: `Adicione dark mode completo neste projeto.

Crie um sistema de CSS variables no arquivo global de estilos com as seguintes variáveis:
--bg (fundo principal), --text (texto principal), --surface (cards e painéis),
--border (bordas e divisores) e --accent (cor de destaque).

Mapeie os valores de light mode e dark mode para cada variável.

Crie um toggle de dark/light mode que:
— persista a preferência no localStorage
— detecte automaticamente prefers-color-scheme na primeira visita
— aplique a transição com transition: background 0.25s, color 0.25s em todos os elementos

Adicione o botão de toggle no header/navbar do projeto com um ícone de sol e lua.` },
      { type: 'heading', text: '3 passos para implementar' },
      { type: 'paragraph', text: 'O processo é o mesmo em qualquer stack — React, Next.js ou HTML puro. Você não precisa reescrever nenhum componente: só define as variáveis, adiciona o toggle e ativa a detecção automática.' },
      { type: 'steps', items: [
        'Cole as CSS variables no arquivo de estilos global: adicione as variáveis de :root para light mode e o seletor [data-theme="dark"] para dark mode. Substitua todas as cores hardcoded por var(--bg), var(--text) etc.',
        'Adicione o toggle no header: em React, useState + useEffect para ler e gravar no localStorage. Em HTML puro, uma função JavaScript que alterna o atributo data-theme no elemento <html>.',
        'Ative a detecção automática do sistema: adicione a verificação de window.matchMedia("(prefers-color-scheme: dark)") na inicialização — se o usuário não tiver preferência salva, o app adota o tema do sistema.',
      ]},
    ],
  },

  {
    slug: 'framer-motion-com-claude-code',
    data: '2026-07-14',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Seu App Parece Estático — Hover, Transição e Skeleton com Claude Code',
    ferramenta: 'Framer Motion + Claude Code',
    link: '/open-source/framer-motion-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'ANIMA',
    pilar: 'Ferramentas e Produtividade',
    duracao: '32s',
    longDescription: [
      'Cada clique sem feedback. Cada página que aparece do nada. Cada lista que carrega de uma vez sem skeleton loader. O app parece estático e sem vida — e isso afasta o usuário antes de ele entender o que você construiu.',
      'Com Claude Code, você instala o Framer Motion e configura hover effects nos cards, transições de entrada das páginas com AnimatePresence e skeleton loaders animados em menos de 15 minutos. Mesmo app, experiência completamente diferente.',
      'Este guia entrega os 3 padrões de animação configurados pelo Claude — com o prompt e o código prontos para plugar no seu projeto React.',
    ],
    features: [
      { title: 'Hover effects nos cards', description: 'Cards que respondem ao mouse com scale e shadow suave — feedback visual imediato sem escrever CSS complexo.', icon: 'design' },
      { title: 'Transição de página com AnimatePresence', description: 'Páginas entram com fade + slide — o usuário sente que está navegando, não que a tela trocou de repente.', icon: 'framework' },
      { title: 'Skeleton loader animado', description: 'Placeholder pulsante enquanto o conteúdo carrega — percepção de performance melhor sem mudar o backend.', icon: 'automation' },
      { title: 'Instalação em um comando', description: 'Claude Code instala o Framer Motion e configura os imports — você não abre a documentação.', icon: 'setup' },
      { title: 'Componentes prontos para reutilizar', description: 'Cada animação configurada como componente isolado — arrastar e soltar em qualquer parte do projeto.', icon: 'plugin' },
      { title: 'Prompt completo incluído', description: 'Um prompt pro Claude Code que configura os 3 padrões de animação de uma vez, adaptado ao seu projeto.', icon: 'copywriting' },
    ],
    primaryLink: '/open-source/framer-motion-com-claude-code',
    isExternal: false,
    bgImage: '/images/bg-productivity.png',
    author: 'João Guirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      { type: 'heading', text: 'Por que animação importa' },
      { type: 'paragraph', text: 'Interface sem animação não é neutra — ela parece quebrada. O usuário clica num botão e não sabe se funcionou. Navega para outra página e a tela troca abruptamente. Espera o conteúdo carregar olhando para o branco. Cada um desses momentos cria atrito. Framer Motion resolve os três com menos de 50 linhas de código.' },
      { type: 'heading', text: 'Os 3 padrões que o Claude configura' },
      { type: 'steps', items: [
        'Hover effects nos cards: scale(1.02) + box-shadow suave no hover com spring animation. O card responde ao mouse imediatamente — feedback sem CSS complexo.',
        'Transição de página com AnimatePresence: envolve o conteúdo com AnimatePresence e configura entrada com opacity 0→1 + y 16→0 e saída com opacity 1→0 em 0.3s. A navegação passa a ter continuidade.',
        'Skeleton loader animado: componente SkeletonCard com retângulos que pulsam usando animate opacity 0.5→1→0.5 em loop infinito — o usuário vê que algo está carregando, não uma tela em branco.',
      ]},
      { type: 'heading', text: 'O prompt' },
      { type: 'code', language: 'markdown', code: `Adicione animações com Framer Motion neste projeto React.

Instale o Framer Motion se ainda não estiver instalado.

Configure os seguintes padrões:

1. HOVER EFFECTS nos cards: scale(1.02) + box-shadow suave no hover, com spring animation (stiffness: 300, damping: 20).

2. TRANSIÇÃO DE PÁGINA com AnimatePresence: envolva o conteúdo principal com AnimatePresence e configure entrada com opacity 0→1 + y 16→0, saída com opacity 1→0, duração 0.3s.

3. SKELETON LOADER: crie um componente SkeletonCard com retângulos animados (pulse effect) usando animate={{ opacity: [0.5, 1, 0.5] }} com repeat: Infinity para usar enquanto o conteúdo carrega.

Entrega os 3 componentes prontos para uso, com os imports corretos.` },
      { type: 'callout', text: 'Mesmo app, experiência completamente diferente. Hover, transição e skeleton loader — os 3 padrões que separam uma interface funcional de uma interface que o usuário quer usar.' },
    ],
  },

  {
    slug: 'lucide-react-com-claude-code',
    data: '2026-07-15',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Ícones Destruindo a Credibilidade — Lucide React com Claude Code',
    ferramenta: 'Lucide React + Claude Code',
    link: '/open-source/lucide-react-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'ICONE',
    pilar: 'Ferramentas e Produtividade',
    duracao: '32s',
    longDescription: [
      'Emoji misturado com SVG. Estilo diferente em cada componente. Tamanhos inconsistentes em cada tela. O usuário percebe o descuido antes de ler uma linha — e a credibilidade do projeto vai junto.',
      'Com Claude Code, você instala o Lucide React e substitui todos os ícones do projeto de forma consistente em menos de 5 minutos. Mesmo tamanho, mesmo peso, mesmo estilo em cada componente — sem revisar arquivo por arquivo.',
      'Este guia entrega o prompt que o Claude usa para varrer o projeto inteiro, identificar todos os ícones e substituir tudo pela biblioteca Lucide com consistência total.',
    ],
    features: [
      { title: 'Substituição em todo o projeto', description: 'Claude varre todos os componentes e troca ícones inconsistentes pelo equivalente Lucide de uma vez.', icon: 'automation' },
      { title: 'Mesmo tamanho, peso e estilo', description: 'Lucide React garante visual coeso em toda a interface — sem variação de stroke ou tamanho entre telas.', icon: 'design' },
      { title: 'Zero SVG manual', description: 'Nenhum arquivo SVG para gerenciar. Import direto do pacote, tree-shaking automático, bundle enxuto.', icon: 'setup' },
      { title: 'Props consistentes', description: 'size, strokeWidth e color padronizados com um valor padrão — qualquer dev novo segue o mesmo padrão.', icon: 'framework' },
      { title: 'Instalação em um comando', description: 'Claude Code instala o lucide-react e configura os imports — você não abre a documentação.', icon: 'plugin' },
      { title: 'Prompt completo incluído', description: 'O prompt exato para o Claude varrer o projeto e substituir todos os ícones com consistência.', icon: 'copywriting' },
    ],
    primaryLink: '/open-source/lucide-react-com-claude-code',
    isExternal: false,
    bgImage: '/images/bg-learn.png',
    author: 'João Guirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      { type: 'heading', text: 'Por que ícones inconsistentes destroem credibilidade' },
      { type: 'paragraph', text: 'O usuário não consegue articular o problema — ele só sente que algo está errado. Emoji misturado com SVG, ícone de biblioteca diferente em cada tela, stroke de 1px aqui e 2px ali. O app parece montado por várias pessoas sem conversar. Lucide React resolve com uma biblioteca única: 1000+ ícones, mesmo estilo, props idênticas em todos.' },
      { type: 'heading', text: 'O prompt' },
      { type: 'code', language: 'markdown', code: `Instale o lucide-react e substitua todos os ícones inconsistentes neste projeto.

1. Instale: npm install lucide-react

2. Varra todos os componentes e identifique:
   — emojis usados como ícones
   — SVGs inline
   — ícones de outras bibliotecas (heroicons, feather, react-icons, etc.)

3. Para cada ícone encontrado, substitua pelo equivalente mais próximo do Lucide React.

4. Padronize os props em todos os usos:
   — size={20} como padrão
   — strokeWidth={1.5}
   — className para cor via Tailwind (ex: text-muted-foreground)

5. Remova os imports e dependências antigas que não forem mais usadas.

Entrega a lista de substituições feitas e avisa se algum ícone não tem equivalente direto no Lucide.` },
      { type: 'heading', text: 'O resultado' },
      { type: 'paragraph', text: 'Depois de rodar o prompt, o projeto tem uma biblioteca de ícones única, com props padronizadas em todos os componentes. Qualquer ícone novo que você adicionar já sabe qual padrão seguir.' },
      { type: 'steps', items: [
        'Todos os ícones do projeto com o mesmo estilo visual — stroke, tamanho e peso unificados.',
        'Bundle mais enxuto: tree-shaking do Lucide importa só os ícones que você usa.',
        'Um padrão claro para qualquer dev novo: import { IconName } from "lucide-react" com as mesmas props em todo lugar.',
      ]},
    ],
  },

  {
    slug: 'design-system-com-claude-code',
    data: '2026-07-17',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Seis Tons de Azul que Não Combinam — Design System com Claude Code',
    ferramenta: 'Claude Code',
    link: '/open-source/design-system-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'SYSTEM',
    pilar: 'Ferramentas e Produtividade',
    duracao: '32s',
    longDescription: [
      'Seis tons de azul diferentes. Três tamanhos de botão que não combinam. Espaçamento no olhômetro. Isso não é falta de talento — é falta de sistema. Sem tokens definidos, cada componente novo vira uma decisão arbitrária.',
      'Com Claude Code, você cria um design system completo em 10 minutos: tokens de cor em CSS variables, escala tipográfica documentada, grid de espaçamento em 8px e componentes Button e Card padronizados. A interface fica coesa — e qualquer dev novo entende o padrão em minutos.',
      'Este guia entrega o prompt que gera o design system do zero, com os tokens, a escala e os componentes base prontos para aplicar no seu projeto.',
    ],
    features: [
      { title: 'Tokens de cor em CSS variables', description: 'Primária, secundária, neutros e feedback definidos em :root — uma mudança afeta toda a interface.', icon: 'design' },
      { title: 'Escala tipográfica documentada', description: 'Tamanhos, pesos e line-heights definidos como tokens — sem decisão arbitrária a cada novo texto.', icon: 'book' },
      { title: 'Grid de espaçamento em 8px', description: 'Sistema de espaçamento baseado em múltiplos de 8 — padding, margin e gap sempre alinhados.', icon: 'framework' },
      { title: 'Componentes Button e Card padronizados', description: 'Variantes (primary, secondary, ghost) e tamanhos (sm, md, lg) definidos uma vez, reutilizados em todo o projeto.', icon: 'plugin' },
      { title: 'Dev novo entende em minutos', description: 'Tokens documentados como comentários no CSS — qualquer pessoa que entrar no projeto sabe qual variável usar, sem perguntar.', icon: 'agents' },
      { title: 'Prompt completo incluído', description: 'O prompt que o Claude usa para criar o design system do zero adaptado ao seu projeto.', icon: 'copywriting' },
    ],
    primaryLink: '/open-source/design-system-com-claude-code',
    isExternal: false,
    bgImage: '/images/bg-skills.png',
    author: 'João Guirunas',
    authorUrl: 'https://instagram.com/joaoguirunas',
    body: [
      { type: 'heading', text: 'O problema sem sistema' },
      { type: 'paragraph', text: 'Sem design system, cada componente novo é uma decisão nova. Qual azul usar? Qual tamanho de botão? Quanto de padding? O resultado é uma interface inconsistente que parece montada por várias pessoas sem conversar — porque é exatamente isso que acontece, mesmo quando é uma pessoa só, em momentos diferentes.' },
      { type: 'heading', text: 'O que o Claude cria' },
      { type: 'steps', items: [
        'Tokens de cor: primária, secundária, neutros (50–900) e cores de feedback (success, warning, error) em CSS variables no :root.',
        'Escala tipográfica: xs a 4xl com font-size, line-height e font-weight documentados como tokens — aplicados via Tailwind ou CSS custom properties.',
        'Grid de espaçamento: múltiplos de 8px (8, 16, 24, 32, 48, 64) como tokens — padding, margin e gap sempre no grid.',
        'Componentes base: Button com variantes primary/secondary/ghost e tamanhos sm/md/lg. Card com surface, border e shadow padronizados.',
      ]},
      { type: 'heading', text: 'O prompt' },
      { type: 'code', language: 'markdown', code: `Crie um design system completo para este projeto.

1. TOKENS DE COR — adicione no CSS global em :root:
   — Primária: 5 tons (100 a 900)
   — Secundária: 5 tons
   — Neutros: 9 tons (50 a 900)
   — Feedback: success, warning, error (bg + text + border)

2. ESCALA TIPOGRÁFICA — tokens para:
   — Tamanhos: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px)
   — Pesos: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
   — Line-heights: tight (1.25), normal (1.5), relaxed (1.75)

3. ESPAÇAMENTO — grid de 8px:
   — Tokens: 1 (8px), 2 (16px), 3 (24px), 4 (32px), 6 (48px), 8 (64px)

4. COMPONENTE BUTTON — variantes:
   — primary, secondary, ghost
   — tamanhos: sm, md, lg
   — estado: default, hover, disabled

5. COMPONENTE CARD — com:
   — surface (background com token), border e border-radius padronizados
   — padding interno usando tokens de espaçamento

Aplique os tokens nos componentes existentes do projeto e documente os padrões em comentários.` },
      { type: 'callout', text: 'Com o design system no lugar, qualquer decisão visual tem uma resposta certa. Qual azul? O token primary-600. Quanto de padding? O token space-3. A consistência vira o padrão — não o esforço.' },
    ],
  },
]
