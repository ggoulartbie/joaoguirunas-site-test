import { ContentPost } from '@/types/content-post'

export const batch6: ContentPost[] = [
  {
    slug: 'a-ferramenta-ai-que-mais-me-surpreendeu-essa-semana',
    data: '2026-06-25',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'A Ferramenta AI Que Mais Me Surpreendeu Essa Semana',
    ferramenta: 'MiniMax M3',
    link: 'https://huggingface.co/MiniMaxAI/MiniMax-M3',
    keyword_cta: 'IA25',
    pilar: 'Notícias e Tendências AI',
    duracao: '8 slides',
  },
  {
    slug: 'openmontage-transforma-claude-em-estudio-de-video',
    data: '2026-06-26',
    slot: 'A',
    formato: 'Reel',
    titulo: 'OpenMontage Transforma Claude em Estúdio de Vídeo',
    ferramenta: 'OpenMontage',
    link: 'https://github.com/calesthio/OpenMontage',
    keyword_cta: 'OPEN',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '39s',
    categoryId: 'integracoes',
    longDescription: [
      'OpenMontage é um sistema open source de produção de vídeo agêntica — ele transforma o seu assistente de código (Claude Code, Cursor, Copilot, Windsurf ou Codex) num estúdio de vídeo completo. Você descreve em linguagem natural o vídeo que quer e o agente assume todo o pipeline: pesquisa o tema com busca na web, escreve e narra o roteiro, gera imagens ou busca footage real, encontra trilha royalty-free, queima as legendas com timing por palavra e renderiza o arquivo final.',
      'O diferencial é que o OpenMontage não se limita a "animar algumas imagens e chamar de vídeo". Ele tem um caminho de footage real: o agente monta um corpus pesquisável a partir de arquivos abertos (Archive.org, NASA, Wikimedia Commons) e fontes gratuitas como Pexels e Unsplash, recupera clipes de movimento reais e os edita numa timeline. Antes de você ver qualquer coisa, o sistema roda uma auto-revisão multiponto — validação com ffprobe, amostragem de frames, análise de níveis de áudio e checagem das legendas.',
      'Por ser pipeline-driven e gratuito, dá pra produzir explainers, trailers, anúncios e shorts animados sem abrir Premiere ou CapCut — tudo dentro do terminal. O projeto é licenciado sob AGPLv3 e funciona até com zero chaves de API, usando Piper TTS (narração offline gratuita) e Remotion para a composição.',
    ],
    features: [
      {
        title: 'Pipeline de vídeo completo',
        description: 'Do roteiro ao MP4 final: pesquisa, narração, geração de visuais, trilha, legendas e renderização — tudo automatizado dentro do seu assistente de código.',
        icon: 'video',
      },
      {
        title: 'Footage real, não só stills',
        description: 'Monta um corpus pesquisável de Archive.org, NASA e Wikimedia Commons e corta clipes de movimento reais numa timeline — não apenas animação de imagens estáticas.',
        icon: 'image',
      },
      {
        title: 'Pesquisa na web antes de gerar',
        description: 'O agente usa busca ao vivo para coletar contexto real do tema antes de escrever o roteiro, evitando conteúdo alucinado.',
        icon: 'browser',
      },
      {
        title: 'Funciona com zero chaves de API',
        description: 'Out of the box usa Piper TTS (narração offline grátis) + Remotion. Cada chave adicional (FAL, ElevenLabs, OpenAI…) desbloqueia mais ferramentas.',
        icon: 'plugin',
      },
      {
        title: 'Auto-revisão antes da entrega',
        description: 'Validação com ffprobe, amostragem de frames, análise de áudio e checagem de legendas rodam antes de você ver o vídeo — cada decisão de provider é pontuada e auditável.',
        icon: 'monitor',
      },
      {
        title: 'Open source (AGPLv3)',
        description: 'Código aberto e reproduzível: cada vídeo de exemplo no canal traz prompt, pipeline, ferramentas usadas e custo, para você replicar.',
        icon: 'github',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'O OpenMontage roda dentro do seu assistente de código. A ideia é simples: você abre o projeto, descreve o vídeo em linguagem natural e o agente conduz o pipeline de produção. Abaixo, o passo a passo real para instalar e gerar o primeiro vídeo.',
      },
      {
        type: 'heading',
        text: 'Pré-requisitos',
      },
      {
        type: 'steps',
        items: [
          'Python 3.10 ou superior instalado.',
          'FFmpeg (macOS: brew install ffmpeg · Linux: sudo apt install ffmpeg).',
          'Node.js 18 ou superior.',
          'Um assistente de código: Claude Code, Cursor, Copilot, Windsurf ou Codex.',
        ],
      },
      {
        type: 'heading',
        text: 'Passo 1 — Clonar e instalar',
      },
      {
        type: 'paragraph',
        text: 'Clone o repositório e rode o setup. O comando make setup prepara o ambiente Python, instala o composer Remotion e cria o arquivo .env.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `git clone https://github.com/calesthio/OpenMontage.git
cd OpenMontage
make setup`,
      },
      {
        type: 'callout',
        text: 'Sem make? Rode manualmente: pip install -r requirements.txt && cd remotion-composer && npm install && cd .. && pip install piper-tts && cp .env.example .env',
      },
      {
        type: 'heading',
        text: 'Passo 2 — (Opcional) Adicionar chaves de API',
      },
      {
        type: 'paragraph',
        text: 'O sistema já produz vídeos reais com zero chaves usando Piper TTS e footage de arquivos abertos. Cada chave que você adiciona ao .env desbloqueia mais providers — todas são opcionais.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `# .env — toda chave é opcional, adicione o que tiver
FAL_KEY=sua-chave          # imagens FLUX + vídeo Veo/Kling/MiniMax
PEXELS_API_KEY=sua-chave   # footage e imagens grátis
ELEVENLABS_API_KEY=sua-chave  # TTS premium e efeitos sonoros
OPENAI_API_KEY=sua-chave   # TTS da OpenAI + imagens DALL-E 3`,
      },
      {
        type: 'heading',
        text: 'Passo 3 — Descrever o vídeo',
      },
      {
        type: 'paragraph',
        text: 'Abra o projeto no seu assistente de código e diga, em linguagem natural, o que você quer. O agente cuida da pesquisa, do roteiro, dos visuais, da narração, da trilha e da renderização.',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Faça um explainer animado de 60 segundos sobre como redes neurais aprendem"`,
      },
      {
        type: 'paragraph',
        text: 'Para o caminho de footage real, peça explicitamente uma montagem documental e diga para usar apenas footage real:',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Faça uma montagem documental de 75 segundos sobre a vida na cidade na chuva. Use apenas footage real, sem narração, tom elegíaco, com música."`,
      },
      {
        type: 'callout',
        text: 'Antes de você ver o resultado, o OpenMontage roda uma auto-revisão: validação com ffprobe, amostragem de frames, análise de níveis de áudio e checagem das legendas. Cada decisão de provider é pontuada em 7 dimensões com log auditável.',
      },
      {
        type: 'heading',
        text: 'Tem GPU? Geração de vídeo local grátis',
      },
      {
        type: 'paragraph',
        text: 'Com uma GPU dá para desbloquear geração de vídeo local sem custo de API, rodando modelos abertos como Wan 2.1, HunyuanVideo ou LTX-2.',
      },
      {
        type: 'code',
        language: 'bash',
        code: `make install-gpu

# depois, no .env:
VIDEO_GEN_LOCAL_ENABLED=true
VIDEO_GEN_LOCAL_MODEL=wan2.1-1.3b`,
      },
    ],
    primaryLink: 'https://github.com/calesthio/OpenMontage',
    primaryLabel: 'Ver no GitHub',
    isExternal: true,
    author: '@joaoguirunas',
    sourceUrl: 'https://github.com/calesthio/OpenMontage',
  },
  {
    slug: 'voiceover-automatico-pt-br-com-claude-elevenlabs',
    data: '2026-06-26',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'Voiceover Automático PT-BR com Claude + ElevenLabs',
    ferramenta: 'Claude Code + ElevenLabs API',
    link: 'https://elevenlabs.io + https://claude.ai/code',
    keyword_cta: 'VOZ',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '9 slides',
    categoryId: 'integracoes',
    longDescription: [
      'Voiceover automático em PT-BR é o fluxo de gerar a narração dos seus vídeos sem precisar gravar nada: o Claude Code escreve (ou recebe) o roteiro e chama a API da ElevenLabs via MCP para sintetizar o áudio numa voz natural em português brasileiro. O arquivo .mp3 aparece direto na pasta do projeto, pronto para entrar na timeline.',
      'A ElevenLabs é uma plataforma de síntese de voz com qualidade de estúdio e suporte a português brasileiro. O MCP oficial (Model Context Protocol) expõe as ferramentas da ElevenLabs para o Claude Code — text-to-speech, biblioteca de vozes, efeitos sonoros — para que o agente gere o áudio sem você abrir a interface web, copiar texto, esperar e baixar manualmente.',
      'O ganho é consistência e velocidade: a mesma voz em todos os projetos (identidade de marca), regeneração instantânea quando o roteiro muda e produção em escala sem depender de estúdio ou locutor. Para um criador, é a diferença entre travar a produção a cada ajuste de texto e narrar tudo com um comando no terminal.',
    ],
    features: [
      {
        title: 'Do texto ao áudio em segundos',
        description: 'Você escreve o roteiro e o Claude chama a ElevenLabs via MCP. O .mp3 com narração em PT-BR é salvo na pasta do projeto, sem gravar nada.',
        icon: 'message',
      },
      {
        title: 'Voz consistente de marca',
        description: 'Escolha um Voice ID PT-BR na Voice Library e use a mesma voz em todos os vídeos — identidade sonora coerente em toda a sua produção.',
        icon: 'video',
      },
      {
        title: 'Regeneração instantânea',
        description: 'Mudou o roteiro? Refaça a narração em segundos. Sem reagendar gravação nem reabrir editor de áudio.',
        icon: 'automation',
      },
      {
        title: 'MCP oficial da ElevenLabs',
        description: 'Conexão via Model Context Protocol mantida pela própria ElevenLabs, instalada com uvx — text-to-speech, vozes e efeitos sonoros disponíveis como ferramentas no Claude.',
        icon: 'plugin',
      },
      {
        title: 'Integra com seu pipeline de vídeo',
        description: 'O áudio gerado entra no CapCut, Premiere, no Remotion (sincronia automática) ou direto no OpenMontage, que já inclui voiceover no pipeline.',
        icon: 'remotion',
      },
      {
        title: 'Plano gratuito para testar',
        description: 'A ElevenLabs tem créditos gratuitos para começar; o plano Starter cobre produção contínua para a maioria dos criadores.',
        icon: 'book',
      },
    ],
    body: [
      {
        type: 'paragraph',
        text: 'A ideia é conectar a API da ElevenLabs ao Claude Code via MCP oficial. Depois disso, gerar narração vira um comando: você pede o áudio e o arquivo aparece na pasta do projeto. Abaixo, o passo a passo real.',
      },
      {
        type: 'heading',
        text: 'Pré-requisitos',
      },
      {
        type: 'steps',
        items: [
          'Conta na ElevenLabs (o plano gratuito já serve para testar).',
          'uv instalado — o MCP oficial roda via uvx (curl -LsSf https://astral.sh/uv/install.sh | sh).',
          'Claude Code instalado.',
        ],
      },
      {
        type: 'heading',
        text: 'Passo 1 — Conta e API key',
      },
      {
        type: 'steps',
        items: [
          'Crie a conta em elevenlabs.io.',
          'Acesse seu perfil e abra a seção API Keys.',
          'Gere uma chave de API.',
          'Copie e guarde a chave — você vai usá-la na configuração do MCP.',
        ],
      },
      {
        type: 'heading',
        text: 'Passo 2 — Escolher a voz PT-BR',
      },
      {
        type: 'steps',
        items: [
          'No painel da ElevenLabs, abra a Voice Library.',
          'Filtre por idioma: Português (Brasil).',
          'Teste as vozes com um texto seu para sentir o tom.',
          'Adicione a voz escolhida e copie o Voice ID — você vai passá-lo no prompt.',
        ],
      },
      {
        type: 'callout',
        text: 'Dica: para conteúdo educacional, prefira uma voz de tom neutro-autoritativo e evite vozes que soam robóticas nos finais de frase.',
      },
      {
        type: 'heading',
        text: 'Passo 3 — Instalar o MCP oficial no Claude Code',
      },
      {
        type: 'paragraph',
        text: 'O MCP oficial da ElevenLabs roda via uvx. A forma mais rápida é registrá-lo com o comando do Claude Code, passando a chave como variável de ambiente:',
      },
      {
        type: 'code',
        language: 'bash',
        code: `claude mcp add elevenlabs \\
  --env ELEVENLABS_API_KEY=sua-chave-aqui \\
  -- uvx elevenlabs-mcp`,
      },
      {
        type: 'paragraph',
        text: 'Se preferir editar a config do MCP manualmente, o bloco equivalente é:',
      },
      {
        type: 'code',
        language: 'json',
        code: `{
  "mcpServers": {
    "elevenlabs": {
      "command": "uvx",
      "args": ["elevenlabs-mcp"],
      "env": {
        "ELEVENLABS_API_KEY": "sua-chave-aqui"
      }
    }
  }
}`,
      },
      {
        type: 'callout',
        text: 'Erro "spawn uvx ENOENT"? Rode which uvx para achar o caminho absoluto (ex.: /usr/local/bin/uvx) e use esse caminho no campo command.',
      },
      {
        type: 'heading',
        text: 'Passo 4 — Gerar o voiceover',
      },
      {
        type: 'paragraph',
        text: 'Reinicie o Claude Code para ele carregar o MCP. Depois é só pedir o áudio em linguagem natural, informando o Voice ID e onde salvar:',
      },
      {
        type: 'code',
        language: 'text',
        code: `"Gera um voiceover com a voz [VOICE_ID] para este texto: [ROTEIRO].
Salva como audio_01.mp3 na pasta assets/audio/ do projeto."`,
      },
      {
        type: 'paragraph',
        text: 'O Claude chama a ElevenLabs via MCP, sintetiza a narração e salva o arquivo no caminho indicado — sem você abrir a interface web.',
      },
      {
        type: 'heading',
        text: 'Passo 5 — Integrar com o vídeo',
      },
      {
        type: 'steps',
        items: [
          'Editor tradicional: arraste o .mp3 para a timeline no CapCut, Premiere ou DaVinci.',
          'Remotion (motion design no Claude Code): o Claude sincroniza o áudio com a composição.',
          'OpenMontage: o pipeline de vídeo já inclui voiceover automático — o áudio entra direto.',
        ],
      },
      {
        type: 'callout',
        text: 'Mantenha o áudio na pasta do projeto (ex.: assets/audio/), junto do vídeo, não numa pasta genérica separada — facilita versionar e regenerar quando o roteiro mudar.',
      },
    ],
    primaryLink: 'https://github.com/elevenlabs/elevenlabs-mcp',
    primaryLabel: 'Ver MCP no GitHub',
    isExternal: true,
    author: '@joaoguirunas',
    sourceUrl: 'https://github.com/elevenlabs/elevenlabs-mcp',
  },
]
