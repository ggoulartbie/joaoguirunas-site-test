'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  { q: 'Preciso saber programar?', a: 'Não é necessário ser programador. O curso parte do zero e ensina os fundamentos necessários para configurar e orquestrar agentes de IA.' },
  { q: 'Qual computador eu preciso?', a: 'Mac, Windows ou Linux com no mínimo 8GB de RAM (recomendamos 16GB). Você vai instalar softwares, então precisa ter permissões de administrador.' },
  { q: 'Preciso de software pago?', a: 'Sim, você precisa de uma assinatura ativa do Claude Pro (US$ 20/mês). As outras ferramentas usadas no curso têm planos gratuitos suficientes para o aprendizado.' },
  { q: 'As aulas são ao vivo?', a: 'Não. Todo o conteúdo é gravado — você assiste no seu próprio ritmo, pause, retome e reassista quantas vezes quiser durante o período de acesso.' },
  { q: 'Por quanto tempo tenho acesso?', a: 'O acesso é por 6 meses a partir da data de compra. Todo o conteúdo e os materiais ficam disponíveis nesse período.' },
  { q: 'Vou conseguir criar minha própria squad do zero?', a: 'Sim. Esse é o objetivo central do curso. Ao concluir os módulos, você terá autonomia para criar, configurar e orquestrar agentes para qualquer necessidade.' },
  { q: 'Posso usar os agentes comercialmente?', a: 'Sim, 100%. Tudo que você construir é seu para usar como quiser — em projetos comerciais, para clientes ou para sua empresa.' },
  { q: 'Qual a diferença entre o Curso Online e a Mentoria?', a: 'O Curso Online é 100% assíncrono: aulas gravadas no seu ritmo, sem horário fixo. A Mentoria é um programa intensivo com encontros ao vivo, turmas de até 12 pessoas e suporte direto dos facilitadores durante 4 semanas.' },
  { q: 'E se eu não gostar?', a: 'Você tem 7 dias de garantia total. Se dentro desse período sentir que o curso não é para você, devolvemos 100% do valor pago sem questionamentos.' },
]

export function CursoFaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqItems.map((item, i) => (
        <div
          key={i}
          style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
          className="overflow-hidden"
        >
          <button
            type="button"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center justify-between w-full cursor-pointer p-4 sm:p-6 text-left gap-3"
            id={`faq-curso-trigger-${i}`}
            aria-expanded={openIndex === i}
            aria-controls={`faq-curso-panel-${i}`}
          >
            <h3 className={`text-sm sm:text-base font-semibold transition-colors leading-tight ${openIndex === i ? 'text-[#FF3A0E]' : 'text-white'}`}>
              {item.q}
            </h3>
            <svg
              className={`h-4 w-4 text-[#FF3A0E] transition-transform flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === i && (
            <div
              id={`faq-curso-panel-${i}`}
              role="region"
              aria-labelledby={`faq-curso-trigger-${i}`}
              className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.55)' }}
            >
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
