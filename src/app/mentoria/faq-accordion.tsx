'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  { q: 'Preciso saber programar?', a: 'Não é necessário ser programador nem ter conhecimento de terminal. Ensinamos tudo do zero no encontro presencial, incluindo os fundamentos de linha de comando. Você não precisa estudar nada antes.' },
  { q: 'Qual computador eu preciso?', a: 'Mac, Windows ou Linux com no mínimo 8GB de RAM (recomendamos 16GB). Você vai instalar softwares, então precisa ter permissões de administrador.' },
  { q: 'Preciso de software pago?', a: 'Sim, você precisa de uma assinatura ativa do Claude Pro (US$ 20/mês). As outras ferramentas são gratuitas ou têm planos gratuitos suficientes.' },
  { q: 'As aulas online são ao vivo?', a: 'Sim, todas são ao vivo com interação em tempo real. E todas são gravadas — se você perder uma aula, pode assistir depois e tirar dúvidas no grupo.' },
  { q: 'E se eu não puder ir a Florianópolis?', a: 'O encontro presencial é parte fundamental (setup inicial + sessão de desbloqueio mental com Claudia). Se você realmente não puder ir, recomendamos esperar uma turma futura que funcione para sua agenda.' },
  { q: 'Quanto tempo dura o programa?', a: 'São 8 encontros distribuídos ao longo de 6-8 semanas (aproximadamente 2 meses).' },
  { q: 'Vou conseguir criar minha própria squad do zero?', a: 'Sim! Esse é um dos principais objetivos. Ao final, você terá autonomia completa para criar, configurar e orquestrar agentes para qualquer necessidade.' },
  { q: 'Posso usar os agentes comercialmente?', a: 'Sim, 100%. Tudo que você criar é seu para usar como quiser — incluindo em projetos comerciais, para clientes, ou para sua empresa.' },
  { q: 'Terei suporte depois do programa?', a: 'Você terá acesso vitalício ao grupo de alunos, onde pode tirar dúvidas, trocar experiências e acompanhar as evoluções do framework.' },
  { q: 'O que acontece se eu não gostar?', a: 'Entre em contato conosco para saber mais sobre as condições e garantias da mentoria.' },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqItems.map((item, i) => (
        <div key={i} className="glass-card overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center justify-between w-full cursor-pointer p-4 sm:p-6 lg:p-8 text-left gap-3"
            aria-expanded={openIndex === i}
          >
            <h3 className={`text-sm sm:text-lg font-semibold transition-colors leading-tight ${openIndex === i ? 'text-[#FF4400]' : 'text-white'}`}>
              {item.q}
            </h3>
            <svg
              className={`h-4 w-4 sm:h-5 sm:w-5 text-[#FF4400] transition-transform flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}
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
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8 text-white/60 leading-relaxed text-sm sm:text-base">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
