import { ContentPost } from '@/types/content-post'

export const batch12: ContentPost[] = [
  {
    slug: 'tipografia-certa-com-claude-code',
    data: '2026-07-19',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Fonte Genérica Denuncia Site de Template — O Claude Define a Stack Certa',
    ferramenta: 'Claude Code',
    link: '/open-source/tipografia-certa-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'FONTE',
    pilar: 'Ferramentas e Produtividade',
    duracao: '30s',
    longDescription: [
      'Um designer cobra R$600 para definir a tipografia de um projeto — você resolve com um prompt. Fonte genérica, hierarquia plana, sem respiro entre tamanhos. O trabalho parece amador mesmo quando o código é bom.',
      'Um prompt pro Claude Code muda isso. Você descreve o projeto: tom, público, tipo de produto. O Claude escolhe o stack de 3 fontes, justifica cada escolha e entrega o layout.tsx, o globals.css e exemplos de uso — tudo configurado para o seu contexto específico.',
      'Aqui está a configuração completa que prometi: o prompt com o campo personalizável em destaque, os 4 stacks mais usados por tipo de projeto e o exemplo real de output gerado para um SaaS financeiro em dark mode.',
    ],
    features: [
      { title: 'Sistema de 3 camadas', description: 'Display + Body + Mono com critério técnico — você nunca mais escolhe fonte no olhômetro.', icon: 'framework' },
      { title: '4 stacks por contexto', description: 'Editorial, SaaS, Vercel e Corporativo — o Claude escolhe qual encaixa com base no que você descreve.', icon: 'design' },
      { title: 'Prompt pronto para usar', description: 'Cole, preencha o contexto do projeto e receba o stack com justificativa técnica completa.', icon: 'copywriting' },
      { title: 'Output: layout.tsx completo', description: 'Imports configurados e variáveis CSS prontas — colar direto no projeto, sem reescrever nada.', icon: 'book' },
      { title: 'Output: globals.css + Tailwind', description: 'Compatível com Tailwind v4 e v3 — funciona no seu stack sem ajuste manual.', icon: 'setup' },
      { title: 'Exemplos de uso incluídos', description: 'H1, parágrafo e label técnico em código real — você vê o resultado antes de aplicar.', icon: 'automation' },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
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
      { type: 'heading', text: 'Em qual projeto usar cada stack' },
      { type: 'paragraph', text: 'O stack Editorial (Fraunces + Inter Tight + JetBrains Mono) funciona para projetos com personalidade forte e audiência que valoriza refinamento — portfólios, agências, tools com posicionamento premium. O SaaS (Sora + Plus Jakarta Sans) funciona para produtos que precisam parecer ambiciosos e modernos sem intimidar. O Vercel Ecosystem (Space Grotesk + Geist + Geist Mono) é o mais seguro para projetos dev-facing — já conversa com o ecossistema visualmente.' },
      { type: 'callout', text: 'O Claude não conhece a identidade visual completa do projeto na primeira execução. Descreva com detalhes — tom, público e tipo de produto fazem toda a diferença no stack escolhido. Quanto mais específico, menos ajuste manual depois.' },
      { type: 'heading', text: 'Depois que o sistema está no lugar' },
      { type: 'paragraph', text: 'Com o stack configurado, qualquer decisão tipográfica tem uma resposta certa. Qual fonte para o título? A display. Para o texto corrido? A body. Para metadados e badges? A mono. Você não decide mais fonte no olhômetro — e qualquer dev que entrar no projeto segue o mesmo sistema sem perguntar.' },
    ],
  },

  {
    slug: 'dark-mode-com-claude-code',
    data: '2026-07-13',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Sem Dark Mode o Seu App Denuncia que Não Foi Pensado',
    ferramenta: 'Claude Code',
    link: '/open-source/dark-mode-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'DARK',
    pilar: 'Ferramentas e Produtividade',
    duracao: '30s',
    longDescription: [
      'Dark mode não é uma feature de UI — é uma expectativa. O usuário abre seu projeto às 23h, brilho reduzido no celular, e vê um fundo branco gritando. A implementação errada são 3 arquivos e 40 variáveis duplicadas. A certa é um sistema de CSS variables que funciona em qualquer projeto.',
      'Um prompt pro Claude Code resolve em 6 minutos. Ele cria o sistema de CSS variables, o toggle com persistência em localStorage, a detecção automática de prefers-color-scheme e adiciona o botão no header — sem dependência externa, sem biblioteca. Funciona em React, Next.js e HTML puro.',
      'Aqui está a implementação completa que prometi: o prompt, o output esperado com CSS variables e o componente de toggle prontos para aplicar no seu projeto.',
    ],
    features: [
      { title: 'Sistema de CSS variables', description: '--bg, --text, --surface, --border e --accent: uma mudança no :root atualiza toda a interface.', icon: 'design' },
      { title: 'Toggle com localStorage', description: 'O usuário define o tema uma vez e encontra o mesmo na próxima visita — zero atrito.', icon: 'setup' },
      { title: 'Detecção de prefers-color-scheme', description: 'Na primeira visita, o app já está no tema certo — sem o usuário ter que configurar nada.', icon: 'framework' },
      { title: 'Transição suave em todos os elementos', description: 'Background e cor mudam sem piscar — alternância suave que não incomoda.', icon: 'automation' },
      { title: 'Sem dependência externa', description: 'CSS puro + JavaScript nativo. Funciona em React, Next.js, Vue ou HTML puro sem instalar nada extra.', icon: 'plugin' },
      { title: 'Prompt pronto para usar', description: 'Cole no Claude Code, adicione o contexto do projeto, receba o sistema completo em 6 minutos.', icon: 'copywriting' },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
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
      { type: 'heading', text: 'Output esperado: CSS variables' },
      { type: 'paragraph', text: 'O Claude entrega o arquivo de estilos globais com as variáveis semânticas para light e dark — prontas para colar no seu globals.css.' },
      { type: 'code', language: 'css', code: `:root {
  --bg: #ffffff;
  --text: #0e0e11;
  --surface: #f5f5f7;
  --border: #e5e5ea;
  --accent: #FF3A0E;
  transition: background 0.25s, color 0.25s;
}

[data-theme="dark"] {
  --bg: #050507;
  --text: #f1f1f3;
  --surface: #16161a;
  --border: rgba(255, 255, 255, 0.08);
  --accent: #FF3A0E;
}

*, *::before, *::after {
  transition: background-color 0.25s, color 0.25s, border-color 0.25s;
}` },
      { type: 'heading', text: 'Output esperado: toggle component' },
      { type: 'code', language: 'tsx', code: `'use client'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light'
    const active = (saved as 'light' | 'dark') ?? preferred
    setTheme(active)
    document.documentElement.setAttribute('data-theme', active)
  }, [])

  function toggle() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button onClick={toggle} aria-label="Alternar tema">
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}` },
      { type: 'heading', text: '3 passos para implementar' },
      { type: 'paragraph', text: 'O processo é o mesmo em qualquer stack — React, Next.js ou HTML puro. Você não precisa reescrever nenhum componente: só define as variáveis, adiciona o toggle e ativa a detecção automática.' },
      { type: 'steps', items: [
        'Cole as CSS variables no arquivo de estilos global: adicione as variáveis de :root para light mode e o seletor [data-theme="dark"] para dark mode. Substitua todas as cores hardcoded por var(--bg), var(--text) etc.',
        'Adicione o ThemeToggle no header: importe o componente e coloque no navbar. Em HTML puro, use a função JavaScript que alterna o atributo data-theme no elemento html.',
        'Verifique se todos os componentes usam as variáveis: qualquer cor hardcoded (ex: background: #fff) quebra o dark mode. O Claude lista o que encontrar.',
      ]},
      { type: 'heading', text: 'Erros comuns na implementação' },
      { type: 'paragraph', text: 'Três problemas aparecem em 90% das implementações manuais: cores hardcoded em componentes individuais que não mudam com o tema, ausência de transição que faz a tela piscar na alternância, e falta de persistência que reseta o tema a cada visita.' },
      { type: 'heading', text: 'Depois que o sistema está no lugar' },
      { type: 'paragraph', text: 'Com as CSS variables no lugar, qualquer componente novo herda o dark mode automaticamente — sem código extra. Você usa var(--bg) e var(--text) e o tema funciona. Adicionar uma nova cor ao sistema é uma linha no :root.' },
    ],
  },

  {
    slug: 'framer-motion-com-claude-code',
    data: '2026-07-14',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Sem Hover, Sem Transição, Sem Skeleton — Os 3 Padrões que Separam App de Produto',
    ferramenta: 'Framer Motion + Claude Code',
    link: '/open-source/framer-motion-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'ANIMA',
    pilar: 'Ferramentas e Produtividade',
    duracao: '32s',
    longDescription: [
      'Um dev freelancer cobra R$1.200 por animações customizadas. Você cola o prompt e o Claude configura os três padrões mais impactantes. Cada clique sem feedback, cada página que aparece do nada — o app parece estático e isso afasta o usuário antes de ele entender o que você construiu.',
      'Com Claude Code, você instala o Framer Motion e configura hover effects nos cards, transições de entrada com AnimatePresence e skeleton loaders animados em menos de 15 minutos. Mesmo app, experiência completamente diferente.',
      'Aqui estão os 3 componentes prontos que prometi — com o código React copiável para plugar direto no seu projeto, sem precisar rodar o Claude primeiro.',
    ],
    features: [
      { title: 'Hover effects nos cards', description: 'Cards que respondem ao mouse imediatamente — o usuário sente que a interface está viva.', icon: 'design' },
      { title: 'Transição de página com AnimatePresence', description: 'O usuário sente que está navegando, não que a tela trocou de repente.', icon: 'framework' },
      { title: 'Skeleton loader animado', description: 'O usuário vê que algo está carregando — percepção de performance melhor sem mudar o backend.', icon: 'automation' },
      { title: 'Instalação em um comando', description: 'Claude instala o Framer Motion e configura os imports — você não abre a documentação.', icon: 'setup' },
      { title: 'Componentes prontos para reutilizar', description: 'Arrastar e soltar em qualquer parte do projeto — sem reescrever a lógica de animação.', icon: 'plugin' },
      { title: 'Prompt completo incluído', description: 'Um prompt configura os 3 padrões de uma vez — hover, transição e skeleton em menos de 15 minutos.', icon: 'copywriting' },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
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
      { type: 'heading', text: 'Componente 1 — MotionCard (hover effect)' },
      { type: 'code', language: 'tsx', code: `import { motion } from 'framer-motion'

export function MotionCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ borderRadius: 12, cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  )
}` },
      { type: 'heading', text: 'Componente 2 — PageTransition (AnimatePresence)' },
      { type: 'code', language: 'tsx', code: `import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}` },
      { type: 'heading', text: 'Componente 3 — SkeletonCard (skeleton loader)' },
      { type: 'code', language: 'tsx', code: `import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <div style={{ borderRadius: 12, padding: 20, background: '#16161a' }}>
      {[80, 100, 60].map((width, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
          style={{
            height: i === 0 ? 20 : 14,
            width: \`\${width}%\`,
            borderRadius: 6,
            background: 'rgba(255,255,255,0.08)',
            marginBottom: i < 2 ? 12 : 0,
          }}
        />
      ))}
    </div>
  )
}` },
      { type: 'heading', text: 'O prompt (para gerar adaptado ao seu projeto)' },
      { type: 'code', language: 'markdown', code: `Adicione animações com Framer Motion neste projeto React.

Instale o Framer Motion se ainda não estiver instalado.

Configure os seguintes padrões:

1. HOVER EFFECTS nos cards: scale(1.02) + box-shadow suave no hover, com spring animation (stiffness: 300, damping: 20).

2. TRANSIÇÃO DE PÁGINA com AnimatePresence: envolva o conteúdo principal com AnimatePresence e configure entrada com opacity 0→1 + y 16→0, saída com opacity 1→0, duração 0.3s.

3. SKELETON LOADER: crie um componente SkeletonCard com retângulos animados (pulse effect) usando animate={{ opacity: [0.5, 1, 0.5] }} com repeat: Infinity para usar enquanto o conteúdo carrega.

Entrega os 3 componentes prontos para uso, com os imports corretos.` },
      { type: 'heading', text: 'Acessibilidade: prefers-reduced-motion' },
      { type: 'paragraph', text: 'Usuários com sensibilidade a movimento configuram o sistema operacional para reduzir animações. O Framer Motion respeita essa preferência automaticamente via CSS media query. Adicione isso no globals.css para garantir que as animações sejam desabilitadas para quem precisa.' },
      { type: 'callout', text: 'Mesmo app, experiência completamente diferente. Hover, transição e skeleton loader — os 3 padrões que separam uma interface funcional de uma interface que o usuário quer usar.' },
    ],
  },

  {
    slug: 'lucide-react-com-claude-code',
    data: '2026-07-15',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Emoji Misturado com SVG e Ícones de 3 Tamanhos — O Claude Varre o Projeto Inteiro',
    ferramenta: 'Lucide React + Claude Code',
    link: '/open-source/lucide-react-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'ICONE',
    pilar: 'Ferramentas e Produtividade',
    duracao: '32s',
    longDescription: [
      'Emoji misturado com SVG. Estilo diferente em cada componente. Tamanhos inconsistentes em cada tela. Um dev leva uma tarde para corrigir isso na mão — e ainda esquece algum SVG solto no CSS. O usuário percebe o descuido antes de ler uma linha.',
      'Com Claude Code, você instala o Lucide React e substitui todos os ícones do projeto de forma consistente em menos de 5 minutos. Mesmo tamanho, mesmo peso, mesmo estilo em cada componente — sem revisar arquivo por arquivo.',
      'Aqui está o prompt exato que prometi: o Claude varre o projeto inteiro, identifica todos os ícones inconsistentes e substitui tudo pela biblioteca Lucide com consistência total.',
    ],
    features: [
      { title: 'Substituição em todo o projeto', description: 'Claude varre tudo de uma vez — você não revisa arquivo por arquivo.', icon: 'automation' },
      { title: 'Mesmo tamanho, peso e estilo', description: 'A interface fica visualmente coesa — o usuário não percebe mais inconsistência.', icon: 'design' },
      { title: 'Zero SVG manual', description: 'Nenhum arquivo SVG para gerenciar — bundle enxuto com tree-shaking automático.', icon: 'setup' },
      { title: 'Props consistentes', description: 'Qualquer dev novo segue o mesmo padrão sem perguntar — um projeto que se documenta sozinho.', icon: 'framework' },
      { title: 'Instalação em um comando', description: 'Claude instala o lucide-react e configura os imports — você não abre a documentação.', icon: 'plugin' },
      { title: 'Prompt completo incluído', description: 'O prompt exato para varrer o projeto e substituir tudo com consistência em menos de 5 minutos.', icon: 'copywriting' },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
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
      { type: 'heading', text: 'Quando manter SVGs customizados' },
      { type: 'paragraph', text: 'Nem todo ícone tem equivalente no Lucide. Logos de marca, ilustrações customizadas e ícones com identidade visual específica do produto devem continuar como SVGs inline ou em arquivo separado. O Claude avisa quando não encontra equivalente — esses você decide manter ou adaptar.' },
      { type: 'heading', text: 'Como verificar consistência pós-execução' },
      { type: 'steps', items: [
        'Busque no projeto por "emoji" e por extensões .svg para garantir que nenhum arquivo foi esquecido.',
        'Verifique se todos os imports de react-icons, heroicons ou feather foram removidos do package.json.',
        'Inspecione visualmente as telas principais: stroke, tamanho e cor devem ser iguais em todos os ícones.',
      ]},
      { type: 'callout', text: 'Ícones são o detalhe que o usuário não nomeia mas sente. Quando a biblioteca é única e as props são consistentes, o projeto parece profissional — mesmo antes de qualquer outra melhoria visual.' },
    ],
  },

  {
    slug: 'design-system-com-claude-code',
    data: '2026-07-17',
    slot: 'A',
    formato: 'Reel',
    titulo: 'Seis Tons de Azul que Não Combinam — Não É Falta de Talento, É Falta de Sistema',
    ferramenta: 'Claude Code',
    link: '/open-source/design-system-com-claude-code',
    categoryId: 'skills',
    keyword_cta: 'SYSTEM',
    pilar: 'Ferramentas e Produtividade',
    duracao: '32s',
    longDescription: [
      'Uma agência cobra R$8.000 para entregar um design system em 3 semanas. O Claude entrega em uma sessão — e você ajusta em tempo real. Seis tons de azul diferentes, três tamanhos de botão que não combinam, espaçamento no olhômetro. Isso não é falta de talento — é falta de sistema.',
      'Com Claude Code, você cria um design system completo em 10 minutos: tokens de cor em CSS variables, escala tipográfica documentada, grid de espaçamento em 8px e componentes Button e Card padronizados. A interface fica coesa — e qualquer dev novo entende o padrão em minutos.',
      'Aqui está o design system completo que prometi: o prompt que gera os tokens, a escala e os componentes base — prontos para aplicar no seu projeto.',
    ],
    features: [
      { title: 'Tokens de cor em CSS variables', description: 'Uma mudança no token primary afeta toda a interface — sem caçar cor por cor em arquivo por arquivo.', icon: 'design' },
      { title: 'Escala tipográfica documentada', description: 'Sem decisão arbitrária a cada novo texto — o token diz qual tamanho usar.', icon: 'book' },
      { title: 'Grid de espaçamento em 8px', description: 'Padding, margin e gap sempre alinhados — a interface fica ordenada sem esforço.', icon: 'framework' },
      { title: 'Componentes Button e Card padronizados', description: 'Variantes e tamanhos definidos uma vez — qualquer componente novo herda o padrão.', icon: 'plugin' },
      { title: 'Dev novo entende em minutos', description: 'Qualquer pessoa que entrar no projeto sabe qual variável usar — sem precisar perguntar para ninguém.', icon: 'agents' },
      { title: 'Prompt completo incluído', description: 'Gera o design system inteiro de uma vez — tokens, escala, espaçamento e componentes base.', icon: 'copywriting' },
    ],
    primaryLink: 'https://claude.ai/code',
    primaryLabel: 'Abrir o Claude Code',
    isExternal: true,
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
      { type: 'heading', text: 'Como evoluir o design system depois' },
      { type: 'paragraph', text: 'O design system não é estático. Quando surgir uma cor nova, você adiciona o token no :root — não nas instâncias individuais. Quando precisar de um novo componente, ele herda os tokens de cor, tipografia e espaçamento já definidos. A consistência é automática, não um esforço a cada decisão.' },
      { type: 'heading', text: 'O que muda no fluxo de trabalho' },
      { type: 'paragraph', text: 'Com o design system no lugar, cada componente novo herda o padrão automaticamente. Qual azul? O token primary-600. Quanto de padding? O token space-3. Qualquer dev que entrar no projeto em qualquer momento encontra as mesmas respostas. A consistência vira o padrão — não o esforço.' },
      { type: 'callout', text: 'Design system não é documentação — é decisão. Cada token é uma decisão tomada uma vez e reutilizada em todo o projeto. Você para de decidir cor, tipografia e espaçamento no olhômetro e começa a executar.' },
    ],
  },
]
