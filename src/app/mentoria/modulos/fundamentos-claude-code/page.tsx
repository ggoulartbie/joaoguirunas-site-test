import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 2: Fundamentos do Claude Code | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/modulos/fundamentos-claude-code' },
};

const slides = [
  {
    label: 'Terminal & CLI',
    title: 'Claude Code vive onde os computadores realmente trabalham.',
    body: 'O terminal é a interface direta com a máquina — sem botões, sem menus, só comandos. Claude Code vive aqui porque é onde o trabalho de verdade acontece: acesso ao seu sistema de arquivos, execução de código, integração com qualquer ferramenta.',
    note: 'Diferente do claude.ai no navegador, aqui Claude tem acesso real ao seu negócio — não só a uma janela de chat.',
  },
  {
    label: 'Agentes',
    title: 'Especialistas entregam mais que generalistas.',
    body: 'Em vez de um Claude genérico que faz tudo de forma mediana, você cria agentes com papel definido, ferramentas específicas e instruções precisas. Um agente de vendas. Um agente de conteúdo. Um agente de código.',
    note: 'A diferença entre pedir ajuda para um estagiário e contratar um especialista de 10 anos de experiência na área.',
  },
  {
    label: 'MCP',
    title: 'As chaves dos seus sistemas.',
    body: 'Model Context Protocol é o padrão que conecta Claude Code ao seu negócio. Banco de dados, Google Drive, e-mail, CRM, redes sociais — qualquer ferramenta que fale MCP vira algo que Claude consegue operar de verdade.',
    note: 'Sem MCP, Claude é inteligente mas desconectado. Com MCP, ele trabalha dentro da sua empresa.',
  },
  {
    label: 'API & Webhook',
    title: 'É assim que sistemas conversam entre si.',
    body: 'API: você pergunta, o sistema responde. Webhook: o sistema te avisa automaticamente quando algo acontece. Toda automação real depende dessas duas formas de comunicação — e Claude Code usa as duas.',
    note: 'Quando um aluno compra e recebe o acesso automaticamente? Webhook. Quando Claude consulta dados para gerar uma proposta? API.',
  },
  {
    label: 'CLAUDE.md',
    title: 'O briefing que ele lê toda vez que começa a trabalhar.',
    body: 'Toda sessão começa com Claude lendo o CLAUDE.md do seu projeto. É onde você define quem ele é: as regras do negócio, o tom da marca, o que pode fazer e o que está fora de escopo.',
    note: 'Um CLAUDE.md bem escrito elimina a necessidade de repetir contexto toda vez. Você escreve uma vez — ele lembra sempre.',
  },
  {
    label: 'Agent Teams',
    title: 'Seu time de IA.',
    body: 'Múltiplos agentes especializados trabalhando em paralelo, coordenados por um líder. Em vez de um Claude fazendo tudo em sequência, você tem um time completo — cada um no seu papel, entregando ao mesmo tempo, no mesmo objetivo.',
    note: 'Este é o tema central da mentoria. Tudo que aprendemos até aqui existe para chegar neste ponto.',
  },
];

export default function FundamentosClaudeCodePage() {
  return <ModuloSlideshow slug="fundamentos-claude-code" slides={slides} />;
}
