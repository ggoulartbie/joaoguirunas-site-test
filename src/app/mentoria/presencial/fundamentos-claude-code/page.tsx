export const dynamic = 'force-dynamic'

import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';
import type { Slide } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 2: Fundamentos do Claude Code | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/presencial/fundamentos-claude-code' },
};

const slides: Slide[] = [
  {
    label: 'Terminal & CLI',
    title: 'Claude Code vive onde os computadores realmente trabalham.',
    body: 'O terminal é a interface direta com a máquina — sem botões, sem menus, só comandos. Claude Code vive aqui porque é onde o trabalho de verdade acontece: acesso ao sistema de arquivos, execução de código, integração com qualquer ferramenta.',
    note: 'Diferente do claude.ai no navegador, aqui Claude tem acesso real ao seu negócio — não só a uma janela de chat.',
    screenshot: '/mentoria/claude-code-terminal.png',
  },
  {
    label: 'Agentes',
    title: 'Especialistas entregam mais que generalistas.',
    body: 'Em vez de um Claude genérico que faz tudo de forma mediana, você cria agentes com papel definido, ferramentas específicas e instruções precisas. Um agente de vendas. Um agente de conteúdo. Um agente de código.',
    note: 'A diferença entre pedir ajuda para um estagiário e contratar um especialista de 10 anos de experiência na área.',
    diagram: 'agent-anatomy',
  },
  {
    label: 'Webhook',
    title: 'O sistema te avisa. Você não precisa perguntar.',
    body: 'Webhook é disparo automático: quando algo acontece num sistema externo — pagamento aprovado, formulário enviado, aluno cadastrado — ele envia um POST para o seu servidor. Claude Code recebe e age imediatamente, sem esperar.',
    note: 'Um aluno compra → Stripe dispara o webhook → Claude cria o acesso automaticamente.',
    diagram: 'webhook',
  },
  {
    label: 'API',
    title: 'Claude pergunta. O sistema responde.',
    body: 'API é consulta sob demanda: Claude Code faz um GET ou POST para um serviço e recebe os dados de volta. Usar a API do Supabase para buscar alunos, da OpenAI para gerar texto, do Google para ler planilhas — tudo funciona assim.',
    note: 'Diferente do webhook, aqui Claude toma a iniciativa. Ele pergunta quando precisa.',
    diagram: 'api',
  },
  {
    label: 'MCP',
    title: 'As chaves de todos os seus sistemas — numa só interface.',
    body: 'Model Context Protocol conecta Claude Code permanentemente às suas ferramentas: banco de dados, Google Drive, e-mail, CRM, Slack. Não é API nem webhook — é uma conexão persistente onde Claude opera a ferramenta de dentro, como um humano faria.',
    note: 'Sem MCP, Claude é inteligente mas desconectado. Com MCP, ele trabalha dentro da sua empresa.',
    diagram: 'mcp',
  },
  {
    label: 'Estrutura Claude Code',
    title: 'CLAUDE.md, .env, settings e hooks — a base de tudo.',
    body: 'Claude Code não é só o chat. Ele lê o CLAUDE.md para saber quem é e o que pode fazer, carrega variáveis do .env para operar seus sistemas, aplica configurações do settings.json e executa hooks automaticamente em cada ação — antes e depois de cada ferramenta.',
    note: 'Hooks são scripts shell que rodam no ciclo de vida: valide, formate, notifique — sem precisar pedir.',
    diagram: 'claude-structure',
  },
];

export default function FundamentosClaudeCodePage() {
  return <ModuloSlideshow slug="fundamentos-claude-code" slides={slides} />;
}
