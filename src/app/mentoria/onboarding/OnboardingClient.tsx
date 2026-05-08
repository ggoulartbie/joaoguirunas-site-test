'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const EMBER = '#FF3A0E';

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.65rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  fontWeight: 600,
};

// ─── Dados ────────────────────────────────────────────────────────────────────

interface Module {
  num?: number;
  live?: boolean;
  title: string;
  description: string;
  date?: string;
  tags: string[];
}

interface Phase {
  id: string;
  label: string;
  date?: string;
  accent?: boolean;
  amber?: boolean;
  description: string;
  image: string;
  modules: Module[];
}

const PHASES: Phase[] = [
  {
    id: 'presencial',
    label: 'Dia Presencial',
    date: '12 de maio · Terça · 13h–18h',
    accent: true,
    description: 'Um dia intensivo para resetar sua mentalidade sobre IA, dominar as ferramentas na prática e criar o seu primeiro agente Claude do zero.',
    image: '/images/claudia-guirunas.png',
    modules: [
      {
        num: 0,
        title: 'Abertura — Desbloqueio e Crenças Limitantes',
        description: 'Claudia Guirunas conduz uma sessão de desbloqueio mental para eliminar as barreiras que impedem a adoção de IA. Exercícios práticos de reprogramação de crenças e mindset de execução.',
        tags: ['Claudia Guirunas', 'Mindset'],
      },
      {
        num: 1,
        title: 'O que é possível com IA Agêntica',
        description: 'Uma visão real do que já está sendo construído com agentes IA — automação de processos, criação de produtos e ganhos de produtividade. Demos ao vivo com ferramentas reais.',
        tags: ['Cases', 'Demos ao vivo'],
      },
      {
        num: 2,
        title: 'Fundamentos do Claude Code',
        description: 'Como o Claude Code funciona, por que é diferente de qualquer outro assistente de IA, e como usar MCP para conectar agentes a ferramentas externas e sistemas reais.',
        tags: ['Claude Code', 'MCP', 'Agentes'],
      },
      {
        num: 3,
        title: 'Setup e Instalação completos',
        description: 'Instalação do Claude Code, configuração da API Key Anthropic, setup do terminal e das ferramentas essenciais. Você sai do presencial com tudo funcionando.',
        tags: ['Ambiente', 'API Keys', 'Ferramentas'],
      },
      {
        num: 4,
        title: 'Centro de Treinamento de Agentes',
        description: 'Crie seu primeiro agente Claude com persona, autoridades e skills definidos. Exercício prático guiado — você finaliza o presencial com um agente seu funcionando.',
        tags: ['Primeiro Agente', 'CTA'],
      },
    ],
  },
  {
    id: 'semana-1',
    label: 'Semana 1',
    date: '13–17 de maio',
    description: 'Aprenda a criar sistemas de design completos com IA — tokens, componentes e guias de estilo gerados em minutos, sem precisar de um designer.',
    image: '/images/bg-designer.png',
    modules: [
      {
        num: 5,
        title: 'Claude Design — Design System',
        description: 'Crie um design system completo usando Claude Code: paleta de cores, tipografia, componentes e tokens de design. Sem Figma, sem designer — IA gera e documenta tudo em código.',
        tags: ['Design System', 'Tokens', 'Componentes'],
      },
      {
        live: true,
        title: 'Encontro de Dúvidas',
        description: 'Sessão ao vivo para tirar dúvidas sobre o conteúdo da semana, compartilhar o que foi construído e receber feedback direto do João.',
        date: '14 de maio · Quinta · 19h–20:30h',
        tags: ['Suporte', 'Ao Vivo'],
      },
    ],
  },
  {
    id: 'semana-2',
    label: 'Semana 2',
    date: '18–22 de maio',
    description: 'Construa e publique sites profissionais do zero com agentes Claude, conectando GitHub ao Vercel com deploy automático.',
    image: '/images/bg-github.png',
    modules: [
      {
        num: 6,
        title: 'Squad de Sites — Github e Vercel',
        description: 'Use a squad de Sites para construir um site profissional do zero, versionar no GitHub e fazer deploy automático no Vercel — com agentes Claude cuidando de cada camada do projeto.',
        tags: ['Sites', 'Github', 'Vercel', 'Deploy'],
      },
      {
        live: true,
        title: 'Encontro de Dúvidas 1',
        description: 'Sessão ao vivo para tirar dúvidas sobre o conteúdo da semana e avançar no projeto.',
        date: '19 de maio · Terça · 19h–20:30h',
        tags: ['Suporte', 'Ao Vivo'],
      },
      {
        live: true,
        title: 'Encontro de Dúvidas 2',
        description: 'Segunda sessão ao vivo da semana para consolidar aprendizados e resolver bloqueios.',
        date: '21 de maio · Quinta · 19h–20:30h',
        tags: ['Suporte', 'Ao Vivo'],
      },
    ],
  },
  {
    id: 'semana-3',
    label: 'Semana 3',
    date: '25–29 de maio',
    description: 'Automatize sua presença nas redes sociais com agentes que criam, editam e publicam conteúdo por você.',
    image: '/images/bg-marketing.png',
    modules: [
      {
        num: 7,
        title: 'Squad de Social Media',
        description: 'Configure agentes que criam imagens no Freepik, gravam vozes com Eleven Labs, geram vídeos no Heygen e publicam automaticamente via Meta API — tudo orquestrado pelo Claude.',
        tags: ['Freepik', 'Eleven Labs', 'Heygen', 'Meta API'],
      },
      {
        live: true,
        title: 'Encontro de Dúvidas',
        description: 'Sessão ao vivo para tirar dúvidas sobre automação de social media e avançar na integração dos agentes.',
        date: '26 de maio · Terça · 19h–20:30h',
        tags: ['Suporte', 'Ao Vivo'],
      },
    ],
  },
  {
    id: 'semana-4',
    label: 'Semana 4',
    date: '01–05 de junho',
    description: 'Integre banco de dados, autenticação e APIs usando Supabase — o backend completo do seu projeto final.',
    image: '/images/bg-supabase.png',
    modules: [
      {
        num: 10,
        title: 'Squad de Dev — Supabase',
        description: 'Integre Supabase ao seu projeto: banco de dados PostgreSQL, autenticação, Row Level Security e edge functions. A squad de Dev tem agentes especializados em frontend, backend e DevOps.',
        tags: ['Dev', 'Supabase', 'Banco de Dados', 'APIs'],
      },
      {
        live: true,
        title: 'Encontro de Dúvidas 1',
        description: 'Sessão ao vivo para tirar dúvidas sobre Supabase e integrações de backend.',
        date: '02 de junho · Terça · 19h–20:30h',
        tags: ['Suporte', 'Ao Vivo'],
      },
      {
        live: true,
        title: 'Encontro de Dúvidas 2',
        description: 'Sessão de preparação final — ajuste do projeto e alinhamento para a apresentação.',
        date: '04 de junho · Quinta · 19h–20:30h',
        tags: ['Suporte', 'Ao Vivo'],
      },
    ],
  },
  {
    id: 'bonus',
    label: 'Bônus Online',
    date: 'Sempre disponível',
    amber: true,
    description: 'Sistemas prontos para uso imediato no seu negócio — automação comercial e gestão de projetos com código completo incluso.',
    image: '/images/bg-productivity.png',
    modules: [
      {
        num: 12,
        title: 'Orquestrador Comercial',
        description: 'Sistema completo de automação comercial da GrowthSales.ai — código pronto para instalar. Agentes para prospecção, qualificação de leads e follow-up automatizado.',
        tags: ['Aula + Código Pronto', 'GrowthSales', 'Comercial'],
      },
      {
        num: 13,
        title: 'Gestão de Projetos com IA',
        description: 'Framework de gestão de projetos com IA: como estruturar tarefas, delegar para agentes Claude e acompanhar progresso sem perder o controle da operação.',
        tags: ['Aula + Código Pronto', 'GrowthSales', 'Gestão'],
      },
    ],
  },
  {
    id: 'encerramento',
    label: 'Encerramento',
    date: 'Presencial · Data a definir',
    accent: true,
    description: 'Apresente o projeto que você construiu ao longo da mentoria e receba seu certificado de conclusão presencialmente.',
    image: '/images/cta-team.png',
    modules: [
      {
        num: 14,
        live: true,
        title: 'Apresentação de Projetos',
        description: 'Cada mentorado apresenta seu projeto presencialmente por 30 minutos para a turma. Feedback direto do João e da comunidade. Certificado de conclusão emitido ao final da sessão.',
        date: 'Presencial · Data a definir',
        tags: ['3 projetos × 30 min', 'Presencial', 'Certificação'],
      },
    ],
  },
];

interface QuestionGroup {
  id: string;
  title: string;
  description: string;
  items: { key: string; question: string }[];
}

const QUESTION_GROUPS: QuestionGroup[] = [
  {
    id: 'objetivos',
    title: 'Objetivos',
    description: 'Vamos entender o que te trouxe até aqui e o que você quer transformar no seu negócio com IA.',
    items: [
      { key: 'obj_1', question: 'Qual é o principal objetivo com IA no seu negócio?' },
      { key: 'obj_2', question: 'O que você faz hoje que consome mais tempo ou energia?' },
      { key: 'obj_3', question: 'Qual é a maior dor no seu processo atual?' },
      { key: 'obj_4', question: 'Você já usou alguma ferramenta de IA? O que funcionou ou não?' },
    ],
  },
  {
    id: 'contexto',
    title: 'Contexto',
    description: 'Para personalizar a sua jornada, preciso entender de onde você parte e o que já existe no seu negócio.',
    items: [
      { key: 'ctx_1', question: 'Qual é o seu nível com tecnologia hoje?' },
      { key: 'ctx_2', question: 'Você tem algum produto ou serviço digital rodando?' },
      { key: 'ctx_3', question: 'Quais ferramentas usa no dia a dia do negócio?' },
      { key: 'ctx_4', question: 'Qual resultado seria um sucesso claro ao final da mentoria?' },
    ],
  },
];

interface ProjectField {
  key: string;
  label: string;
  hint: string;
}

const PROJECT_FIELDS: ProjectField[] = [
  { key: 'proj_nome', label: 'Nome do projeto', hint: 'Como você quer chamar?' },
  { key: 'proj_problema', label: 'Problema que resolve', hint: 'Qual dor elimina?' },
  { key: 'proj_publico', label: 'Para quem', hint: 'Público-alvo ou uso interno?' },
  { key: 'proj_tools', label: 'Ferramentas que vai usar', hint: 'Sites, Social Media, Dev…' },
  { key: 'proj_resultado', label: 'Resultado esperado', hint: 'Como vai saber que deu certo?' },
];

interface ProfileField {
  key: string;
  label: string;
  hint: string;
  full?: boolean;
}

const PROFILE_FIELDS: ProfileField[] = [
  { key: 'perfil_nome', label: 'Nome completo', hint: 'Como prefere ser chamado?' },
  { key: 'perfil_profissao', label: 'Profissão / Cargo', hint: 'Ex: CEO, Designer, Desenvolvedor…' },
  { key: 'perfil_empresa', label: 'Empresa / Negócio', hint: 'Nome da empresa ou projeto' },
  { key: 'perfil_segmento', label: 'Segmento / Nicho', hint: 'Ex: e-commerce, saúde, educação…' },
  { key: 'perfil_cidade', label: 'Cidade / Estado', hint: 'Onde você está baseado?' },
  { key: 'perfil_linkedin', label: 'LinkedIn / Site (opcional)', hint: 'URL do perfil ou site', full: true },
];

type Answers = Record<string, string>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function phaseAccentColor(phase: Phase) {
  if (phase.accent) return EMBER;
  if (phase.amber) return '#F59E0B';
  return 'rgba(255,255,255,0.35)';
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // 48px sticky nav height + 24px breathing room
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: 'smooth' });
}

function buildPrompt(answers: Answers): string {
  const get = (key: string) => answers[key]?.trim() || '(não preenchido)';
  const nome = answers['perfil_nome']?.trim() || 'Mentorado';
  const empresa = answers['perfil_empresa']?.trim();
  const cargo = answers['perfil_profissao']?.trim();
  const projeto = answers['proj_nome']?.trim() || 'Projeto da Mentoria';

  return `# GERAÇÃO DE APRESENTAÇÃO DE ONBOARDING — MENTORIA CLAUDE CODE + IA

Você é um especialista em comunicação executiva e design de documentos. Sua tarefa é gerar uma apresentação de onboarding completa, personalizada e visualmente sofisticada para **${nome}**${cargo ? `, ${cargo}` : ''}${empresa ? ` da ${empresa}` : ''}.

Este documento será entregue ao mentorado como material de referência e acompanhamento durante toda a jornada de 4 semanas + dia presencial.

---

## 1. DADOS DO MENTORADO

| Campo | Valor |
|---|---|
| Nome completo | ${get('perfil_nome')} |
| Profissão / Cargo | ${get('perfil_profissao')} |
| Empresa / Negócio | ${get('perfil_empresa')} |
| Segmento / Nicho | ${get('perfil_segmento')} |
| Cidade / Estado | ${get('perfil_cidade')} |
| LinkedIn / Site | ${get('perfil_linkedin')} |

---

## 2. PROJETO DA MENTORIA — "${projeto}"

| Campo | Definição |
|---|---|
| Nome do projeto | ${get('proj_nome')} |
| Problema que resolve | ${get('proj_problema')} |
| Para quem é | ${get('proj_publico')} |
| Ferramentas que vai usar | ${get('proj_tools')} |
| Critério de sucesso | ${get('proj_resultado')} |

---

## 3. OBJETIVOS E CONTEXTO DO MENTORADO

**Objetivos com IA:**
1. Principal objetivo com IA no negócio: ${get('obj_1')}
2. O que consome mais tempo/energia hoje: ${get('obj_2')}
3. Maior dor no processo atual: ${get('obj_3')}
4. Experiência anterior com ferramentas de IA: ${get('obj_4')}

**Contexto atual:**
1. Nível com tecnologia: ${get('ctx_1')}
2. Produto ou serviço digital rodando: ${get('ctx_2')}
3. Ferramentas usadas no dia a dia: ${get('ctx_3')}
4. Resultado que definiria sucesso ao final: ${get('ctx_4')}

---

## 4. PROGRAMA COMPLETO DA MENTORIA (base de referência)

### DIA PRESENCIAL — 12 de maio de 2026 · Terça · 13h–18h

Sessão intensiva presencial com João Guirunas e Claudia Guirunas. O mentorado sai com ambiente configurado, fundamentos sólidos e o primeiro agente Claude funcionando.

| # | Módulo | Conteúdo |
|---|---|---|
| 0 | Abertura — Desbloqueio e Crenças Limitantes | Claudia Guirunas conduz sessão de reprogramação de mindset para eliminar bloqueios em relação à IA |
| 1 | O que é possível com IA Agêntica | Cases reais, demos ao vivo — o que já está sendo construído e automatizado com agentes |
| 2 | Fundamentos do Claude Code | Como o Claude Code funciona, MCP, agentes e orquestração de tarefas complexas |
| 3 | Setup e Instalação completos | API Key Anthropic, terminal, ferramentas essenciais — tudo configurado no dia |
| 4 | Centro de Treinamento de Agentes | Criação do primeiro agente Claude com persona, autoridades e skills definidos |

### SEMANA 1 — 13 a 17 de maio

**Foco:** Claude Design — Design System com IA
Crie um design system completo (paleta, tipografia, componentes, tokens) sem precisar de Figma ou designer.

- Encontro de Dúvidas ao vivo: 14/05 (Quinta) · 19h–20:30h

### SEMANA 2 — 18 a 22 de maio

**Foco:** Squad de Sites — GitHub + Vercel
Construa e publique sites profissionais do zero com agentes Claude, versionamento no GitHub e deploy automático.

- Encontro de Dúvidas 1 ao vivo: 19/05 (Terça) · 19h–20:30h
- Encontro de Dúvidas 2 ao vivo: 21/05 (Quinta) · 19h–20:30h

### SEMANA 3 — 25 a 29 de maio

**Foco:** Squad de Social Media automatizado
Agentes que criam imagens (Freepik), gravam vozes (Eleven Labs), geram vídeos (Heygen) e publicam via Meta API.

- Encontro de Dúvidas ao vivo: 26/05 (Terça) · 19h–20:30h

### SEMANA 4 — 1 a 5 de junho

**Foco:** Squad de Dev — Supabase
Backend completo: banco PostgreSQL, autenticação, RLS, edge functions. Squad especializada em frontend, backend e DevOps.

- Encontro de Dúvidas 1 ao vivo: 02/06 (Terça) · 19h–20:30h
- Encontro de Dúvidas 2 ao vivo: 04/06 (Quinta) · 19h–20:30h

### BÔNUS ONLINE — Sempre disponível

| # | Bônus | Conteúdo |
|---|---|---|
| 12 | Orquestrador Comercial | Sistema completo de automação comercial GrowthSales.ai — código pronto para usar |
| 13 | Gestão de Projetos com IA | Framework de gestão com agentes Claude — código e método completos |

### ENCERRAMENTO — Presencial · Data a definir

Apresentação ao vivo do projeto desenvolvido durante a mentoria. Cada mentorado apresenta por 30 minutos. Certificado de conclusão emitido ao final.

---

## 5. DIFERENCIAIS DA MENTORIA

- **Formato:** 1 dia presencial intensivo + 4 semanas online estruturadas
- **Suporte:** Encontros ao vivo semanais (até 2x por semana) + comunidade
- **Acesso:** Plataforma de aulas por 6 meses
- **Projeto real:** O mentorado constrói um projeto próprio durante toda a jornada
- **Certificação:** Certificado de conclusão emitido na sessão de encerramento
- **Método:** Aprender → Aplicar → Compartilhar (filosofia de João Guirunas)
- **Ferramentas cobertas:** Claude Code, MCP, Supabase, GitHub, Vercel, Freepik, Eleven Labs, Heygen, Meta API, GrowthSales.ai

---

## 6. SOBRE OS MENTORES

**João Guirunas** — CEO da GrowthSales.ai. Usa IA em negócios reais: automação, growth e sistemas que escalam. O que funciona, ele compartilha e ensina. Referência prática em Claude Code e sistemas agênticos aplicados ao mundo dos negócios.

**Claudia Guirunas** — Especialista em mindset e desbloqueio mental para adoção de tecnologia. Conduz a abertura do presencial com foco em eliminar crenças limitantes e preparar o mentorado emocionalmente para a transformação.

---

## 7. INSTRUÇÕES DE GERAÇÃO

Gere uma **apresentação completa em Markdown** pronta para converter em PDF. Use a seguinte estrutura:

### SEÇÃO 1 — CAPA
- Título: "Onboarding — Mentoria Claude Code + IA"
- Subtítulo: Nome completo de ${nome}${cargo ? `, ${cargo}` : ''}${empresa ? ` · ${empresa}` : ''}
- Projeto: "${projeto}"
- Data de início: **12 de maio de 2026**
- Mentor: João Guirunas · joaoguirunas.com
- Linha de rodapé discreta: "Documento confidencial — uso exclusivo do mentorado"

### SEÇÃO 2 — PERFIL DE ${nome.toUpperCase()}
Use os dados da seção 1 para descrever quem é ${nome}, seu contexto profissional, nível técnico atual e o que o trouxe à mentoria. Escreva em 3º pessoa, tom profissional e direto.

### SEÇÃO 3 — OBJETIVOS E DORES
Transforme as respostas das seções 3 em insights acionáveis. Identifique o padrão central de dor e o objetivo principal. Seja específico — use as palavras do mentorado.

### SEÇÃO 4 — PROJETO: "${projeto}"
Apresente o projeto com clareza executiva:
- O problema que resolve
- Para quem
- As ferramentas da mentoria que serão usadas para construí-lo
- Como vai saber que deu certo (critério de sucesso mensurável)

### SEÇÃO 5 — JORNADA PERSONALIZADA (cronograma)
Monte o cronograma das 7 fases conectando cada semana ao projeto de ${nome}. Para cada fase, inclua: o que será aprendido e como isso se aplica diretamente ao projeto "${projeto}".

### SEÇÃO 6 — PRÓXIMOS PASSOS (primeiros 7 dias)
Liste 5 a 7 ações concretas e específicas para ${nome} nas primeiras 48h após o onboarding. Baseie nos dados de nível técnico e ferramentas que já usa.

### SEÇÃO 7 — RECURSOS E CONTATOS
- Plataforma de aulas: [link]
- Comunidade: [link]
- Suporte: joaoguirunas.com
- Encontros ao vivo: datas conforme cronograma acima

---

**Diretrizes de estilo:**
- Linguagem direta, profissional e calorosa — sem jargões vazios
- Personalize cada seção com o nome e dados reais de ${nome} — evite frases genéricas
- Use tabelas para cronograma e dados estruturados
- Use negrito para destacar datas, nomes de módulos e termos-chave
- Tom: confiante, executivo, encorajador
- Comprimento ideal: 4 a 6 páginas quando convertido em PDF
- Formate o Markdown de forma limpa — sem HTML, sem emojis excessivos`;
}

// ─── Phase Section ────────────────────────────────────────────────────────────

function PhaseSection({ phase }: { phase: Phase }) {
  const accent = phaseAccentColor(phase);
  const liveColor = '#34D399';

  return (
    <section
      id={phase.id}
      data-section="true"
      className="py-20 sm:py-24"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      {/* ── Full-width image banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden mb-12"
        style={{ minHeight: 280, border: `1px solid ${accent}22` }}
      >
        <Image
          src={phase.image}
          alt={phase.label}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(8,8,12,0.9) 0%, rgba(8,8,12,0.6) 55%, rgba(8,8,12,0.3) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,12,0.65) 0%, transparent 55%)' }} />

        <div className="relative flex flex-col justify-between p-8 sm:p-12" style={{ minHeight: 280 }}>
          {/* Top: label + date */}
          <div className="flex flex-wrap items-center gap-3">
            <span style={{ ...MONO, color: accent, border: `1px solid ${accent}45`, background: 'rgba(8,8,12,0.8)', padding: '5px 14px' }}>
              {phase.label}
            </span>
            {phase.date && (
              <span style={{ ...MONO, color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem' }}>{phase.date}</span>
            )}
          </div>

          {/* Bottom: description + count */}
          <div>
            <p
              className="text-2xl sm:text-3xl font-semibold text-white max-w-xl leading-snug mb-5"
              style={{ letterSpacing: '-0.025em', textShadow: '0 2px 24px rgba(0,0,0,0.6)' }}
            >
              {phase.description}
            </p>
            <div className="flex items-center gap-2.5">
              <div className="h-px" style={{ width: 28, background: accent }} />
              <span style={{ ...MONO, color: 'rgba(255,255,255,0.28)', fontSize: '0.58rem' }}>
                {phase.modules.length} {phase.modules.length === 1 ? 'módulo' : 'módulos'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Module cards ── */}
      <div className="space-y-5">
        {phase.modules.map((mod, i) => {
          const isLive = !!mod.live;
          const borderColor = isLive ? 'rgba(52,211,153,0.14)' : 'rgba(255,255,255,0.07)';
          const bg = isLive ? 'rgba(52,211,153,0.025)' : 'rgba(255,255,255,0.02)';
          const numColor = isLive ? liveColor : phase.accent ? EMBER : 'rgba(255,255,255,0.45)';
          const numBorder = isLive ? 'rgba(52,211,153,0.4)' : phase.accent ? `${EMBER}50` : 'rgba(255,255,255,0.18)';
          const tagColor = isLive ? 'rgba(52,211,153,0.5)' : 'rgba(255,255,255,0.32)';
          const tagBorder = isLive ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.07)';
          const dateColor = isLive ? 'rgba(52,211,153,0.6)' : 'rgba(255,255,255,0.22)';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: i * 0.07, duration: 0.45 }}
              className="flex gap-6 p-7 sm:p-8"
              style={{ border: `1px solid ${borderColor}`, background: bg }}
            >
              {/* Badge */}
              <div
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full mt-0.5"
                style={{ border: `2px solid ${numBorder}` }}
              >
                {isLive ? (
                  <span style={{ ...MONO, color: liveColor, fontSize: '0.42rem', lineHeight: 1.3, textAlign: 'center' }}>
                    AO<br />VIVO
                  </span>
                ) : (
                  <span style={{ ...MONO, color: numColor, fontSize: '0.6rem' }}>{mod.num}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-white" style={{ letterSpacing: '-0.01em' }}>
                    {mod.title}
                  </h3>
                  {mod.date && (
                    <span style={{ ...MONO, fontSize: '0.58rem', color: dateColor }}>{mod.date}</span>
                  )}
                </div>

                <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.48)', maxWidth: '52ch' }}>
                  {mod.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {mod.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        ...MONO, fontSize: '0.53rem', padding: '2px 9px',
                        color: tagColor, border: `1px solid ${tagBorder}`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Prompt Preview Section ───────────────────────────────────────────────────

function PromptPreview({ answers, filledCount, totalFields }: { answers: Answers; filledCount: number; totalFields: number }) {
  const [copied, setCopied] = useState(false);
  const prompt = buildPrompt(answers);
  const pct = Math.round((filledCount / totalFields) * 100);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [prompt]);

  return (
    <section className="py-20 sm:py-24 pb-32">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <p className="mb-3" style={{ ...MONO, color: `${EMBER}b0` }}>Pronto para gerar</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
          Prompt para o <span style={{ color: EMBER }}>Claude</span>
        </h2>
        <p className="text-sm sm:text-base leading-relaxed mb-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Cole este prompt no Claude para gerar a apresentação PDF personalizada do mentorado. Quanto mais campos preenchidos, mais rica fica a apresentação.
        </p>

        {/* Progress bar */}
        <div className="flex items-center gap-4 mb-2">
          <div className="flex-1 h-1 max-w-xs" style={{ background: 'rgba(255,255,255,0.07)' }}>
            <div
              className="h-full transition-all duration-500"
              style={{ width: `${pct}%`, background: pct === 100 ? '#34D399' : EMBER }}
            />
          </div>
          <span style={{ ...MONO, color: pct === 100 ? '#34D399' : 'rgba(255,255,255,0.35)', fontSize: '0.6rem' }}>
            {filledCount} de {totalFields} campos preenchidos {pct === 100 ? '✓' : ''}
          </span>
        </div>
      </motion.div>

      {/* Prompt text block */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative"
        style={{ border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.018)' }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: EMBER }} />
            <span style={{ ...MONO, color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}>
              prompt.md — {prompt.split('\n').length} linhas
            </span>
          </div>
          <span style={{ ...MONO, color: 'rgba(255,255,255,0.18)', fontSize: '0.58rem' }}>
            Claude · claude.ai
          </span>
        </div>

        {/* Prompt text — scrollable */}
        <pre
          className="overflow-auto p-6 sm:p-8 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.62)',
            maxHeight: 520,
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}
        >
          {prompt}
        </pre>
      </motion.div>

      {/* Copy button — full width, prominent */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-4"
      >
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-3 transition-all duration-200 hover:brightness-110 active:scale-[0.99]"
          style={{
            background: copied ? '#16a34a' : EMBER,
            color: '#08080C',
            padding: '18px 24px',
            ...MONO,
            fontSize: '0.75rem',
            boxShadow: `0 0 32px ${copied ? 'rgba(22,163,74,0.25)' : `${EMBER}30`}`,
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Prompt copiado — cole no Claude
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2.5"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="9" y="9" width="13" height="13" rx="1" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copiar prompt completo
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p className="text-center mt-3" style={{ ...MONO, color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem' }}>
          Abra claude.ai → novo chat → cole o prompt → envie
        </p>
      </motion.div>
    </section>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function OnboardingClient() {
  const [activeId, setActiveId] = useState<string>('presencial');
  const [answers, setAnswers] = useState<Answers>({});

  const totalFields = PROFILE_FIELDS.length + QUESTION_GROUPS.flatMap((g) => g.items).length + PROJECT_FIELDS.length;
  const filledCount = Object.values(answers).filter((v) => v.trim().length > 0).length;

  const setAnswer = useCallback((key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { threshold: 0, rootMargin: '-10% 0px -80% 0px' }
    );
    document.querySelectorAll('[data-section]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#08080C', color: '#fff' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-end" style={{ minHeight: '62vh' }}>
        <Image
          src="/images/bg-open-source.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,8,12,0.5) 0%, rgba(8,8,12,0.5) 50%, rgba(8,8,12,0.98) 100%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(8,8,12,0.78) 0%, rgba(8,8,12,0.2) 60%, transparent 100%)' }}
        />

        {/* Top bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 sm:px-10 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <span style={{ ...MONO, color: 'rgba(255,255,255,0.3)' }}>João Guirunas · Mentoria</span>
          <a
            href="/mentoria"
            className="transition-opacity hover:opacity-70"
            style={{ ...MONO, color: EMBER, border: `1px solid ${EMBER}35`, padding: '5px 14px' }}
          >
            ← Voltar
          </a>
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 pb-16 pt-36">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              className="inline-flex items-center gap-2 mb-7"
              style={{ border: `1px solid ${EMBER}35`, background: `${EMBER}0e`, padding: '5px 16px' }}
            >
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: EMBER }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: EMBER }} />
              </span>
              <span style={{ ...MONO, color: EMBER }}>Entrevista de Onboarding</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[64px] text-white mb-6 max-w-3xl"
              style={{ fontFamily: 'var(--font-display-serif)', fontWeight: 400, lineHeight: 0.95, letterSpacing: '-0.03em' }}
            >
              Bem-vindo à{' '}
              <span style={{ color: EMBER, fontStyle: 'italic' }}>Mentoria</span>
              <br />Claude Code + IA
            </h1>

            <p className="text-base sm:text-lg leading-relaxed max-w-lg mb-10" style={{ color: 'rgba(255,255,255,0.52)' }}>
              Vamos conversar sobre seus objetivos, conhecer cada fase do programa e definir o
              projeto que você vai construir nas próximas semanas.
            </p>

            <div className="flex flex-wrap gap-2">
              {PHASES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className="transition-opacity hover:opacity-70"
                  style={{
                    ...MONO,
                    color: phaseAccentColor(p),
                    border: `1px solid ${p.accent ? `${EMBER}30` : p.amber ? '#F59E0B30' : 'rgba(255,255,255,0.1)'}`,
                    background: p.accent ? `${EMBER}0b` : p.amber ? '#F59E0B09' : 'rgba(255,255,255,0.025)',
                    padding: '6px 14px',
                  }}
                >
                  {p.label}
                  {p.date && <span style={{ marginLeft: 10, opacity: 0.5, fontWeight: 400 }}>{p.date}</span>}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Sticky nav ───────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-40"
        style={{ background: 'rgba(8,8,12,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <div className="flex px-6 sm:px-10" style={{ minWidth: 'max-content' }}>
            {PHASES.map((phase) => {
              const isActive = activeId === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => scrollTo(phase.id)}
                  className="transition-all duration-200"
                  style={{
                    ...MONO,
                    color: isActive ? EMBER : 'rgba(255,255,255,0.3)',
                    padding: '14px 18px',
                    borderBottom: `2px solid ${isActive ? EMBER : 'transparent'}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {phase.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10">

        {PHASES.map((phase) => (
          <PhaseSection key={phase.id} phase={phase} />
        ))}

        {/* ── Perfil do Mentorado ───────────────────────────────────────── */}
        <section
          id="perfil"
          className="py-16 sm:py-20"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3" style={{ ...MONO, color: `${EMBER}b0` }}>Identificação</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              Perfil do <span style={{ color: EMBER }}>Mentorado</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Essas informações serão usadas para personalizar a apresentação PDF que você vai levar ao final da entrevista.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {PROFILE_FIELDS.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className={`p-5 ${field.full ? 'sm:col-span-2' : ''}`}
                style={{
                  border: `1px solid ${answers[field.key]?.trim() ? `${EMBER}35` : 'rgba(255,255,255,0.07)'}`,
                  background: answers[field.key]?.trim() ? `${EMBER}07` : 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <p className="mb-2" style={{ ...MONO, color: `${EMBER}99` }}>{field.label}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 10 }} />
                <input
                  type="text"
                  placeholder={field.hint}
                  value={answers[field.key] || ''}
                  onChange={(e) => setAnswer(field.key, e.target.value)}
                  className="w-full outline-none bg-transparent text-white/80 placeholder:text-white/20"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', caretColor: EMBER }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Questions ────────────────────────────────────────────────── */}
        {QUESTION_GROUPS.map((group) => (
          <section
            key={group.id}
            id={group.id}
            className="py-16 sm:py-20"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-3" style={{ ...MONO, color: `${EMBER}b0` }}>Perguntas</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                {group.title}
              </h2>
              <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {group.description}
              </p>
            </motion.div>

            <div className="space-y-4 max-w-2xl">
              {group.items.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="p-4 sm:p-5"
                  style={{
                    border: `1px solid ${answers[item.key]?.trim() ? `${EMBER}30` : 'rgba(255,255,255,0.07)'}`,
                    background: answers[item.key]?.trim() ? `${EMBER}06` : 'rgba(255,255,255,0.02)',
                    transition: 'border-color 0.3s, background 0.3s',
                  }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span style={{ ...MONO, color: EMBER, fontSize: '0.7rem' }} className="flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm sm:text-base text-white/80 leading-relaxed">{item.question}</p>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Escreva aqui sua resposta..."
                    value={answers[item.key] || ''}
                    onChange={(e) => setAnswer(item.key, e.target.value)}
                    className="w-full resize-none outline-none bg-transparent text-sm leading-relaxed placeholder:text-white/20 text-white/75"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      paddingTop: 10,
                      caretColor: EMBER,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        ))}

        {/* ── Project definition ────────────────────────────────────────── */}
        <section id="projeto" className="py-16 sm:py-20" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3" style={{ ...MONO, color: `${EMBER}b0` }}>Definição</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
              Projeto da <span style={{ color: EMBER }}>Mentoria</span>
            </h2>
            <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Definir o projeto desde o início te ajuda a aprender com propósito. Cada módulo é construído em torno do que você vai criar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {PROJECT_FIELDS.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                className={`p-5 ${i === PROJECT_FIELDS.length - 1 && PROJECT_FIELDS.length % 2 !== 0 ? 'sm:col-span-2' : ''}`}
                style={{
                  border: `1px solid ${answers[field.key]?.trim() ? `${EMBER}30` : 'rgba(255,255,255,0.07)'}`,
                  background: answers[field.key]?.trim() ? `${EMBER}06` : 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
              >
                <p className="mb-2" style={{ ...MONO, color: `${EMBER}99` }}>{field.label}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 10 }} />
                <input
                  type="text"
                  placeholder={field.hint}
                  value={answers[field.key] || ''}
                  onChange={(e) => setAnswer(field.key, e.target.value)}
                  className="w-full outline-none bg-transparent text-white/80 placeholder:text-white/20"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', caretColor: EMBER }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Prompt Preview — ao final, completo ──────────────────────── */}
        <PromptPreview answers={answers} filledCount={filledCount} totalFields={totalFields} />

      </main>

    </div>
  );
}
