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
  date?: string;
  tags: string[];
  image?: string;
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
    description:
      'Um dia intensivo para resetar sua mentalidade sobre IA, dominar as ferramentas na prática e criar o seu primeiro agente Claude do zero — ao lado de outros mentorados.',
    image: '/images/claudia-guirunas.png',
    modules: [
      { num: 0, title: 'Abertura — Desbloqueio e Crenças Limitantes', tags: ['Claudia', 'Mindset'], image: '/images/claudia-guirunas.png' },
      { num: 1, title: 'O que é possível com IA Agêntica', tags: ['Cases', 'Demos ao vivo'], image: '/images/bg-open-source.png' },
      { num: 2, title: 'Fundamentos do Claude Code', tags: ['Claude Code', 'MCP', 'Agentes'], image: '/images/bg-claude-code.png' },
      { num: 3, title: 'Setup e Instalação completos', tags: ['Ambiente', 'API Keys', 'Ferramentas'] },
      { num: 4, title: 'Centro de Treinamento de Agentes', tags: ['Primeiro Agente', 'CTA'], image: '/images/bg-xquads.png' },
    ],
  },
  {
    id: 'semana-1',
    label: 'Semana 1',
    date: '13–17 de maio',
    description: 'Aprenda a criar sistemas de design completos com IA — tokens, componentes e guias de estilo gerados em minutos, sem precisar de um designer.',
    image: '/images/bg-designer.png',
    modules: [
      { num: 5, title: 'Claude Design — Design System', tags: ['Design System', 'Tokens', 'Componentes'], image: '/images/bg-designer.png' },
      { live: true, title: 'Encontro de Dúvidas', date: '14 de maio · Quinta · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'semana-2',
    label: 'Semana 2',
    date: '18–22 de maio',
    description: 'Construa e publique sites profissionais do zero com agentes Claude, conectando GitHub ao Vercel com deploy automático e versionamento.',
    image: '/images/bg-github.png',
    modules: [
      { num: 6, title: 'Squad de Sites — Github e Vercel', tags: ['Sites', 'Github', 'Vercel', 'Deploy'], image: '/images/bg-github.png' },
      { live: true, title: 'Encontro de Dúvidas 1', date: '19 de maio · Terça · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
      { live: true, title: 'Encontro de Dúvidas 2', date: '21 de maio · Quinta · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'semana-3',
    label: 'Semana 3',
    date: '25–29 de maio',
    description: 'Automatize sua presença nas redes sociais com agentes que criam, editam e publicam conteúdo por você — Freepik, Eleven Labs, Heygen e Meta API.',
    image: '/images/bg-marketing.png',
    modules: [
      { num: 7, title: 'Squad de Social Media', tags: ['Freepik', 'Eleven Labs', 'Heygen', 'Meta API'], image: '/images/bg-marketing.png' },
      { live: true, title: 'Encontro de Dúvidas', date: '26 de maio · Terça · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'semana-4',
    label: 'Semana 4',
    date: '01–05 de junho',
    description: 'Integre banco de dados, autenticação e APIs usando Supabase — o backend do seu projeto final. Squad de Dev com agentes especializados para cada camada.',
    image: '/images/bg-supabase.png',
    modules: [
      { num: 10, title: 'Squad de Dev — Supabase', tags: ['Dev', 'Supabase', 'Banco de Dados', 'APIs'], image: '/images/bg-supabase.png' },
      { live: true, title: 'Encontro de Dúvidas 1', date: '02 de junho · Terça · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
      { live: true, title: 'Encontro de Dúvidas 2', date: '04 de junho · Quinta · 19h–20:30h', tags: ['Suporte', 'Ao Vivo'] },
    ],
  },
  {
    id: 'bonus',
    label: 'Bônus Online',
    date: 'Sempre disponível',
    amber: true,
    description: 'Sistemas prontos para uso imediato no seu negócio: automação comercial e gestão de projetos com IA — código completo incluso.',
    image: '/images/bg-productivity.png',
    modules: [
      { num: 12, title: 'Orquestrador Comercial', tags: ['Aula + Código Pronto', 'GrowthSales', 'Comercial'], image: '/images/bg-productivity.png' },
      { num: 13, title: 'Gestão de Projetos com IA', tags: ['Aula + Código Pronto', 'GrowthSales', 'Gestão'] },
    ],
  },
  {
    id: 'encerramento',
    label: 'Encerramento',
    date: '09 de junho',
    accent: true,
    description: 'Apresente o projeto que você construiu ao longo da mentoria para a turma e receba seu certificado de conclusão ao vivo.',
    image: '/images/cta-team.png',
    modules: [
      { num: 14, live: true, title: 'Apresentação de Projetos', date: '09 de junho · Terça · 19h–20:30h', tags: ['3 projetos × 30 min', 'Ao Vivo', 'Certificação'], image: '/images/cta-team.png' },
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
  const top = el.getBoundingClientRect().top + window.scrollY - 52;
  window.scrollTo({ top, behavior: 'smooth' });
}

function buildPrompt(answers: Answers): string {
  const get = (key: string) => answers[key]?.trim() || '(não respondido)';
  const nome = answers['perfil_nome']?.trim() || 'Mentorado';

  return `Você é um designer de apresentações profissionais. Gere uma apresentação completa de onboarding para **${nome}**, mentorado da **Mentoria Claude Code + IA** com João Guirunas.

---

## PERFIL DO MENTORADO

**Nome:** ${get('perfil_nome')}
**Profissão / Cargo:** ${get('perfil_profissao')}
**Empresa / Negócio:** ${get('perfil_empresa')}
**Segmento / Nicho:** ${get('perfil_segmento')}
**Cidade / Estado:** ${get('perfil_cidade')}
**LinkedIn / Site:** ${get('perfil_linkedin')}

---

## PROJETO DA MENTORIA

**Nome do projeto:** ${get('proj_nome')}
**Problema que resolve:** ${get('proj_problema')}
**Para quem:** ${get('proj_publico')}
**Ferramentas que vai usar:** ${get('proj_tools')}
**Resultado esperado:** ${get('proj_resultado')}

---

## OBJETIVOS

1. Principal objetivo com IA: ${get('obj_1')}
2. O que consome mais tempo/energia: ${get('obj_2')}
3. Maior dor no processo atual: ${get('obj_3')}
4. Experiência anterior com IA: ${get('obj_4')}

---

## CONTEXTO

1. Nível com tecnologia: ${get('ctx_1')}
2. Produto/serviço digital existente: ${get('ctx_2')}
3. Ferramentas do dia a dia: ${get('ctx_3')}
4. Resultado que definiria sucesso: ${get('ctx_4')}

---

## PROGRAMA (referência)

- **Dia Presencial** (12/05): Fundamentos Claude Code, primeiro agente ao vivo
- **Semana 1** (13–17/05): Design System com IA
- **Semana 2** (18–22/05): Squad de Sites — GitHub + Vercel
- **Semana 3** (25–29/05): Squad de Social Media automatizado
- **Semana 4** (01–05/06): Squad de Dev + Supabase
- **Bônus Online**: Orquestrador Comercial + Gestão de Projetos
- **Encerramento** (09/06): Apresentação de projetos + Certificação

---

## TAREFA

Crie uma apresentação profissional em Markdown pronto para converter em PDF com as seguintes seções:

1. **Capa** — Nome de ${nome}, cargo/empresa, nome do projeto, data de início (12 de maio de 2025)
2. **Perfil** — Quem é ${nome}, contexto profissional, nível técnico, ferramentas que já usa
3. **Objetivos & Dores** — O que ${nome} quer transformar com IA no negócio
4. **Projeto da Mentoria** — Definição completa: problema, público, ferramentas, critério de sucesso
5. **Cronograma personalizado** — As 7 fases com datas, descrevendo como cada semana se conecta ao projeto de ${nome}
6. **Próximos passos** — 5 ações concretas para a primeira semana

Linguagem direta, profissional, personalizada para ${nome}. Evite frases genéricas — use os dados acima para personalizar cada seção. O documento é entregue ao mentorado como guia de referência durante toda a jornada.`;
}

// ─── Phase Section ────────────────────────────────────────────────────────────

function PhaseSection({ phase }: { phase: Phase }) {
  const accent = phaseAccentColor(phase);

  return (
    <section
      id={phase.id}
      data-section="true"
      className="py-16 sm:py-20"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55 }}
        className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-10 lg:mb-12"
      >
        {/* Left: text */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <span
              style={{
                ...MONO,
                color: accent,
                border: `1px solid ${accent}40`,
                background: `${accent}0d`,
                padding: '4px 12px',
              }}
            >
              {phase.label}
            </span>
            {phase.date && (
              <span style={{ ...MONO, color: 'rgba(255,255,255,0.22)', fontSize: '0.6rem' }}>
                {phase.date}
              </span>
            )}
          </div>

          <p
            className="text-xl sm:text-2xl font-semibold text-white leading-snug mb-4 max-w-md"
            style={{ letterSpacing: '-0.02em' }}
          >
            {phase.description}
          </p>

          <div className="flex items-center gap-2">
            <div className="h-px" style={{ width: 32, background: accent }} />
            <span style={{ ...MONO, color: 'rgba(255,255,255,0.22)', fontSize: '0.58rem' }}>
              {phase.modules.length} {phase.modules.length === 1 ? 'módulo' : 'módulos'}
            </span>
          </div>
        </div>

        {/* Right: featured image */}
        <div className="lg:w-[380px] xl:w-[420px] flex-shrink-0">
          <div
            className="relative overflow-hidden"
            style={{ height: 220, border: `1px solid ${accent}25` }}
          >
            <Image
              src={phase.image}
              alt={phase.label}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(8,8,12,0.72) 0%, rgba(8,8,12,0.22) 60%, rgba(8,8,12,0.06) 100%)' }}
            />
            <div className="absolute bottom-4 left-4">
              <span
                style={{
                  ...MONO,
                  color: accent,
                  background: 'rgba(8,8,12,0.85)',
                  padding: '4px 10px',
                  border: `1px solid ${accent}30`,
                }}
              >
                {phase.label}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Module cards */}
      <div className="space-y-3">
        {phase.modules.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
          >
            {mod.image && !mod.live ? (
              <div
                className="relative overflow-hidden flex items-end"
                style={{
                  height: 160,
                  border: `1px solid ${phase.accent ? `${EMBER}20` : 'rgba(255,255,255,0.07)'}`,
                }}
              >
                <Image src={mod.image} alt={mod.title} fill className="object-cover" sizes="(max-width: 640px) 100vw, 800px" />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,12,0.93) 30%, rgba(8,8,12,0.55) 70%, rgba(8,8,12,0.2) 100%)' }}
                />
                <div className="relative w-full p-4 sm:p-5 flex items-end gap-4">
                  <div
                    className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full"
                    style={{ border: `2px solid ${phase.accent ? `${EMBER}55` : 'rgba(255,255,255,0.25)'}`, background: 'rgba(8,8,12,0.7)' }}
                  >
                    <span style={{ ...MONO, color: phase.accent ? EMBER : 'rgba(255,255,255,0.55)' }}>{mod.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5">{mod.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {mod.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            ...MONO, fontSize: '0.55rem', padding: '2px 8px',
                            color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(8,8,12,0.6)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex items-start gap-4 p-4 sm:p-5"
                style={{
                  border: `1px solid ${mod.live ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.07)'}`,
                  background: mod.live ? 'rgba(52,211,153,0.025)' : 'rgba(255,255,255,0.02)',
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full"
                  style={{ border: `2px solid ${mod.live ? 'rgba(52,211,153,0.45)' : phase.accent ? `${EMBER}55` : 'rgba(255,255,255,0.18)'}` }}
                >
                  {mod.live ? (
                    <span style={{ ...MONO, color: '#34D399', fontSize: '0.42rem', lineHeight: 1.2, textAlign: 'center' }}>
                      AO<br />VIVO
                    </span>
                  ) : (
                    <span style={{ ...MONO, color: phase.accent ? EMBER : 'rgba(255,255,255,0.45)' }}>{mod.num}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                    <h3 className="text-sm sm:text-base font-semibold text-white">{mod.title}</h3>
                    {mod.date && (
                      <span style={{ ...MONO, fontSize: '0.55rem', color: mod.live ? 'rgba(52,211,153,0.6)' : 'rgba(255,255,255,0.22)' }}>
                        {mod.date}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mod.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          ...MONO, fontSize: '0.55rem', padding: '2px 8px',
                          color: mod.live ? 'rgba(52,211,153,0.55)' : 'rgba(255,255,255,0.35)',
                          border: `1px solid ${mod.live ? 'rgba(52,211,153,0.14)' : 'rgba(255,255,255,0.07)'}`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Copy Prompt Button (floating) ───────────────────────────────────────────

function CopyPromptButton({ answers, filledCount, totalFields }: { answers: Answers; filledCount: number; totalFields: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const prompt = buildPrompt(answers);
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [answers]);

  const pct = Math.round((filledCount / totalFields) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
    >
      {/* Progress pill */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          background: 'rgba(8,8,12,0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="w-20 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div
            className="h-full transition-all duration-500"
            style={{ width: `${pct}%`, background: EMBER }}
          />
        </div>
        <span style={{ ...MONO, color: 'rgba(255,255,255,0.4)', fontSize: '0.58rem' }}>
          {filledCount}/{totalFields} campos
        </span>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="flex items-center gap-2.5 transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
        style={{
          background: copied ? '#16a34a' : EMBER,
          color: '#08080C',
          padding: '12px 20px',
          ...MONO,
          fontSize: '0.7rem',
          boxShadow: `0 0 24px ${copied ? 'rgba(22,163,74,0.35)' : `${EMBER}40`}`,
        }}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Copiado!
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="9" y="9" width="13" height="13" rx="1" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copiar Prompt Claude
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
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
          src="/images/mentoria-hero-v2.png"
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
        <section id="projeto" className="py-16 sm:py-20 pb-32">
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
                  className="w-full outline-none bg-transparent text-white/80 placeholder:text-white/18"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    caretColor: EMBER,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Inline copy hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 max-w-2xl flex items-start gap-3 p-4"
            style={{ border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={EMBER} strokeWidth={1.5} className="flex-shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
            </svg>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.6 }}>
              Preencha as perguntas e campos acima. Quando estiver pronto, clique em{' '}
              <span style={{ color: EMBER }}>Copiar Prompt Claude</span> no canto inferior direito
              e cole no Claude para gerar a apresentação PDF personalizada do mentorado.
            </p>
          </motion.div>
        </section>

      </main>

      {/* ── Floating copy button ──────────────────────────────────────────── */}
      <CopyPromptButton answers={answers} filledCount={filledCount} totalFields={totalFields} />

    </div>
  );
}
