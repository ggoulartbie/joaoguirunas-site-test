import type { Metadata } from 'next';
import { ModuloSlideshow } from '../_components/ModuloSlideshow';

export const metadata: Metadata = {
  title: 'Módulo 2: Fundamentos do Claude Code | Mentoria Claude Code',
  alternates: { canonical: '/mentoria/modulos/fundamentos-claude-code' },
};

const slides = [
  {
    label: 'Terminal & CLI',
    title: 'Claude Code vive no terminal.',
    body: 'O terminal é a interface de texto do seu computador — onde você dá ordens diretamente à máquina. Claude Code é uma CLI: uma ferramenta que vive nesse ambiente. Quando você digita "claude", ele começa a trabalhar dentro do seu projeto.',
    note: 'Diferente do claude.ai no navegador, a CLI tem acesso real ao seu sistema de arquivos, seus arquivos e seus comandos.',
  },
  {
    label: 'Agentes',
    title: 'Especialistas, não generalistas.',
    body: 'Em vez de um Claude genérico que faz tudo de forma mediana, você cria agentes especializados — cada um com papel definido, ferramentas específicas e instruções precisas. Um agente de conteúdo. Um agente de vendas. Um agente de código.',
    note: 'Quanto mais específico o papel de um agente, melhor o resultado. Generalistas são convenientes. Especialistas são poderosos.',
  },
  {
    label: 'MCP',
    title: 'As chaves do seu negócio.',
    body: 'Model Context Protocol é o padrão que conecta Claude Code a sistemas externos. Banco de dados, Google Drive, e-mail, CRM, redes sociais — qualquer sistema que fale MCP vira uma ferramenta que Claude consegue usar diretamente.',
    note: 'Sem MCP, Claude Code é um funcionário inteligente sem acesso a nenhum sistema da empresa. Com MCP, ele opera de verdade.',
  },
  {
    label: 'API & Webhook',
    title: 'Como sistemas conversam entre si.',
    body: 'API: você pergunta, o sistema responde. Webhook: o sistema te avisa quando algo acontece. Toda automação real depende dessas duas formas de comunicação — e Claude Code usa as duas para integrar com qualquer ferramenta.',
    note: 'Quando um aluno compra o curso e recebe o acesso automaticamente? Webhook. Quando Claude consulta uma API para gerar uma proposta? API.',
  },
  {
    label: 'CLAUDE.md',
    title: 'O briefing que ele nunca esquece.',
    body: 'Toda vez que Claude Code começa a trabalhar no seu projeto, ele lê o CLAUDE.md. É onde você define quem ele é: as regras, o tom, o contexto do negócio, o que pode e o que não pode fazer. A memória de longo prazo do projeto.',
    note: 'Um CLAUDE.md bem escrito elimina a necessidade de repetir contexto a cada sessão. Você escreve uma vez — ele lembra sempre.',
  },
  {
    label: 'Agent Teams',
    title: 'Seu time de IA.',
    body: 'Múltiplos agentes especializados trabalhando em paralelo, coordenados por um líder. Em vez de um Claude fazendo tudo em sequência, você tem um time: cada um no seu papel, entregando ao mesmo tempo, no mesmo objetivo.',
    note: 'Este é o tema central da mentoria. Tudo que aprendemos até aqui existe para chegar aqui — times de agentes que executam projetos completos.',
  },
];

export default function FundamentosClaudeCodePage() {
  return <ModuloSlideshow slug="fundamentos-claude-code" slides={slides} />;
}
