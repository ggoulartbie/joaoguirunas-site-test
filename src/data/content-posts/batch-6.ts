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
    roteiro: `## Slide 1 — Capa

**Texto principal:**
A FERRAMENTA AI QUE MAIS ME
SURPREENDEU ESSA SEMANA

**Subtítulo:**
MiniMax M3 — open-weight, 1 milhão de tokens de contexto.

---

## Slide 2 — O que é

**Título:** O que é o MiniMax M3

MiniMax M3 é o primeiro modelo open-weight da empresa com capacidades de agente de código de nível frontier. Lançado em 1° de junho de 2026, combina 1 milhão de tokens de contexto nativo, computer use (vê e opera interfaces de desktop) e performance de coding que, segundo a MiniMax, rivaliza com modelos fechados de topo.

Open-weight: os pesos podem ser baixados e rodados na sua própria infraestrutura.

---

## Slide 3 — O problema que resolve

**Título:** O problema que ele resolve

Modelos de contexto longo fechados custam caro. Modelos open-weight bons em código costumavam ter contexto curto. E poucos tinham computer use nativo.

O M3 ataca as três restrições ao mesmo tempo.

---

## Slide 4 — Na prática — como usar

**Título:** Na prática — como acessar

Via API (minimax.io): cadastro, acesso via API compatível com padrão OpenAI, contexto de até 1M tokens.

Via open weights: quando publicados no HuggingFace, download direto e execução em infra própria via Ollama ou vLLM. Confirme a disponibilidade dos pesos antes de usar.

---

## Slide 5 — Por que me surpreendeu

**Título:** Por que essa e não outra

A maioria dos lançamentos de junho foi de modelos fechados e caros. O M3 apareceu sob o radar.

Segundo a MiniMax, marca 59% no SWE-Bench Pro — ainda sem verificação independente. Vem com MIT license: uso comercial, modificação e redistribuição liberados. A arquitetura MiniMax Sparse Attention, de acordo com a empresa, entregaria ganho expressivo de velocidade em contexto longo.

---

## Slide 6 — Como usar com Claude Code

**Título:** Como usar com Claude Code

Compatível com o padrão de API OpenAI, então qualquer cliente nesse formato consegue apontar pra ele. No Claude Code, dá pra usar o M3 como backend via MCP server custom ou proxy OpenAI-compatível, deixando o M3 processar contextos longos enquanto o Claude Code orquestra.

Útil pra análise de codebases extensos.

---

## Slide 7 — Limitações honestas

**Título:** O que ainda não funciona bem

Os benchmarks divulgados são vendor-reported — aguardar reprodução independente antes de confiar nos números. O computer use está em fase inicial de produção. A disponibilidade dos open weights precisa ser confirmada. E rodar o modelo completo (~428B params) exige hardware significativo.

---

## Slide 8 — CTA

**Texto:**
Comenta IA25 que eu te mando o link direto para a API e o repositório no HuggingFace.

Salva esse post.`,
    legenda: `Comenta IA25 que eu te mando o link direto para a API e o repositório no HuggingFace.

A maioria dos lançamentos de junho foi de modelo fechado e caro. O MiniMax M3 apareceu sob o radar — open-weight, MIT license, 1 milhão de tokens de contexto e computer use nativo num único modelo.

Os benchmarks de coding divulgados pela MiniMax são fortes — ainda sem verificação independente — e a arquitetura nova promete bem mais velocidade em contexto longo. Pra quem quer rodar modelo capaz na própria infra sem pagar API cara, vale acompanhar. 🔍

No carrossel: o que é, o problema que resolve, como acessar, integração com Claude Code e as limitações honestas — porque hype sem contexto não ajuda ninguém.

#ia #inteligenciaartificial #ferramentasIA #claudecode #aitools #novidadesai #opensource #minimax #minimaxm3 #aiagents #llm #aiweekly`,
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
    roteiro: `Alguém transformou o Claude Code num estúdio de produção de vídeo completo.
E é completamente gratuito.

Chama OpenMontage.

Você descreve o vídeo que quer criar.
O sistema assume o controle do pipeline inteiro de produção automaticamente.

Ele escreve o roteiro.
Gera os visuais.
Adiciona o voiceover.
Edita tudo junto.

Mas o que diferencia do resto: antes de gerar qualquer coisa, ele busca informações reais da web.
Dados atuais, contexto real — não conteúdo inventado pela AI.
O resultado parece autêntico, não parece vídeo gerado por máquina.

Explainers, trailers, anúncios, vídeos educacionais — tudo numa plataforma só, dentro do Claude Code.

Comenta OPEN que eu te mando o repositório do OpenMontage agora.`,
    legenda: `Comenta OPEN que eu te mando o repositório do OpenMontage agora.

Claude Code já escreve código, cria sites e automatiza fluxos. Agora ele também produz vídeo completo — do roteiro ao arquivo final. Chama OpenMontage e é grátis.

Você descreve o que quer. Ele escreve o roteiro, gera os visuais, adiciona voiceover e edita tudo sozinho. O diferencial que muda tudo: antes de gerar, ele pesquisa informações reais na web. O vídeo sai com contexto atual, não conteúdo alucinado. 🎬

Explainers, trailers, anúncios, vídeos educacionais — tudo sem abrir Premiere, CapCut ou qualquer editor. Tudo dentro do Claude Code.

Estúdio de produção completo. Custo zero.

#claudecode #openmontage #videoai #producaodevideo #ia #inteligenciaartificial #ferramentasIA #aitools #automacao #criadordeconteudo #voiceover #videomarketing`,
    keyword_cta: 'OPEN',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '39s',
  },
  {
    slug: 'voiceover-automatico-pt-br-com-claude-elevenlabs',
    data: '2026-06-26',
    slot: 'B',
    formato: 'Carrossel',
    titulo: 'Voiceover Automático PT-BR com Claude + ElevenLabs',
    ferramenta: 'Claude Code + ElevenLabs API',
    link: 'https://elevenlabs.io + https://claude.ai/code',
    roteiro: `## Slide 1 — Capa

**Texto principal:**
VOICEOVER AUTOMÁTICO EM PT-BR
COM CLAUDE + ELEVENLABS

**Subtítulo:**
Do texto ao áudio em segundos — sem gravar nada

---

## Slide 2 — Por que usar voiceover AI

**Título:** O problema que isso resolve

Gravar narração leva tempo. Precisa de microfone, ambiente silencioso, edição de áudio.

Com Claude Code + ElevenLabs MCP, você:
— Gera voiceover em PT-BR de alta qualidade sem gravar nada
— Usa a mesma voz em todos os projetos (consistência de marca)
— Regenera instantâneo se o texto mudar
— Escala produção sem depender de estúdio ou locutor

---

## Slide 3 — Passo 1: Configurar ElevenLabs

**Título:** Passo 1 — Conta e API key

1. Cria conta em elevenlabs.io (tem plano gratuito)
2. Vai em Profile > API Keys
3. Gera uma chave de API
4. Copia e guarda — vai usar na configuração do MCP

O plano gratuito oferece créditos suficientes para testar. Para produção contínua, o plano Starter (U$5/mês) é o suficiente para a maioria dos criadores.

---

## Slide 4 — Passo 2: Escolher a voz PT-BR

**Título:** Passo 2 — Voz que soa natural em português

No painel do ElevenLabs:
— Vai em Voice Library
— Filtra por idioma: Português (Brasil)
— Teste as vozes disponíveis com um texto seu
— Clica em "Use" na voz escolhida e copia o Voice ID

Dica: escolha uma voz com tom neutro-autoritativo para conteúdo educacional. Evite vozes que soam robóticas nos finais de frase.

---

## Slide 5 — Passo 3: Instalar o MCP do ElevenLabs no Claude Code

**Título:** Passo 3 — MCP conectado

No arquivo \`~/.claude/settings.json\`, adicione:

\`\`\`json
"elevenlabs": {
  "command": "npx",
  "args": ["-y", "@elevenlabs/mcp"],
  "env": {
    "ELEVENLABS_API_KEY": "sua-chave-aqui"
  }
}
\`\`\`

Reinicie o Claude Code. O MCP aparece automaticamente como ferramenta disponível.

---

## Slide 6 — Passo 4: Gerar áudio com Claude Code

**Título:** Passo 4 — Pedindo o voiceover

Dentro do Claude Code, você escreve:

"Gera um voiceover com a voz [VOICE_ID] para este texto: [ROTEIRO]. Salva como audio_01.mp3 na pasta /assets/audio/"

O Claude chama o ElevenLabs automaticamente via MCP e salva o arquivo no caminho que você indicou.

Sem copiar e colar em interface web. Sem fazer manualmente.

---

## Slide 7 — Passo 5: Integrar com vídeo

**Título:** Passo 5 — Sincronizar com o vídeo

Com o áudio gerado, você pode:

— Usar no CapCut, Premiere ou qualquer editor: arrasta o .mp3 para a timeline
— Usar com Remotion (motion design no Claude Code): o Claude sincroniza automaticamente
— Usar com OpenMontage: o pipeline de vídeo já inclui voiceover automático

O áudio fica na pasta do projeto — junto com o vídeo, não numa pasta genérica separada.

---

## Slide 8 — Exemplo real de uso

**Título:** Fluxo completo em 3 minutos

1. Você escreve ou pede ao Claude o roteiro do vídeo
2. Claude gera o roteiro e já chama o ElevenLabs via MCP
3. Áudio .mp3 salvo na pasta do projeto
4. Você arrasta para o editor ou usa via Remotion
5. Vídeo com narração profissional pronto

Do texto ao vídeo narrado: menos de 3 minutos.

---

## Slide 9 — CTA

**Texto:**
Comenta VOZ que eu te mando o setup completo do MCP com o Voice ID da voz que uso nos meus vídeos.

Salva esse post para quando for gravar o próximo roteiro.`,
    legenda: `Comenta VOZ que eu te mando o setup completo do MCP com o Voice ID da voz que uso nos meus vídeos.

Gravar narração leva tempo, precisa de setup e travaca a produção quando o roteiro muda. Com Claude Code + ElevenLabs MCP, você gera voiceover em PT-BR em segundos — sem gravar nada.

O fluxo completo está no carrossel: criar conta no ElevenLabs, escolher voz PT-BR que soa natural, instalar o MCP no Claude Code, gerar o áudio direto do terminal e sincronizar com o vídeo. Do roteiro ao áudio: menos de 3 minutos. 🎙️

A parte que muda tudo: o Claude chama o ElevenLabs automaticamente. Você não precisa entrar na interface web, copiar texto, esperar, baixar, renomear. Só fala no Claude Code e o arquivo aparece na pasta certa do projeto.

Produção de vídeo que dependia de estúdio. Agora é um comando.

#claudecode #elevenlabs #voiceover #audioia #ia #inteligenciaartificial #mcp #producaodevideo #criadordeconteudo #automacao #ferramentasIA #ptbr`,
    keyword_cta: 'VOZ',
    pilar: 'Produção de Conteúdo com IA',
    duracao: '9 slides',
  },
]
