'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

const faqItems: FaqItem[] = [
  { q: 'Preciso saber programar?', a: 'Nao e necessario ser programador nem ter conhecimento de terminal. Ensinamos tudo do zero no encontro presencial, incluindo os fundamentos de linha de comando. Voce nao precisa estudar nada antes.' },
  { q: 'Qual computador eu preciso?', a: 'Mac, Windows ou Linux com no minimo 8GB de RAM (recomendamos 16GB). Voce vai instalar softwares, entao precisa ter permissoes de administrador.' },
  { q: 'Preciso de software pago?', a: 'Sim, voce precisa de uma assinatura ativa do Claude Pro (US$ 20/mes). As outras ferramentas sao gratuitas ou tem planos gratuitos suficientes.' },
  { q: 'As aulas online sao ao vivo?', a: 'Sim, todas sao ao vivo com interacao em tempo real. E todas sao gravadas — se voce perder uma aula, pode assistir depois e tirar duvidas no grupo.' },
  { q: 'E se eu nao puder ir a Florianopolis?', a: 'O encontro presencial e parte fundamental (setup inicial + sessao de desbloqueio mental com Claudia). Se voce realmente nao puder ir, recomendamos esperar uma turma futura que funcione para sua agenda.' },
  { q: 'Quanto tempo dura o programa?', a: 'Sao 8 encontros distribuidos ao longo de 6-8 semanas (aproximadamente 2 meses).' },
  { q: 'Vou conseguir criar minha propria squad do zero?', a: 'Sim! Esse e um dos principais objetivos. Ao final, voce tera autonomia completa para criar, configurar e orquestrar agentes para qualquer necessidade.' },
  { q: 'Posso usar os agentes comercialmente?', a: 'Sim, 100%. Tudo que voce criar e seu para usar como quiser — incluindo em projetos comerciais, para clientes, ou para sua empresa.' },
  { q: 'Terei suporte depois do programa?', a: 'Voce tera acesso vitalicio ao grupo de alunos, onde pode tirar duvidas, trocar experiencias e acompanhar as evolucoes do framework.' },
  { q: 'O que acontece se eu nao gostar?', a: 'Entre em contato conosco para saber mais sobre as condicoes e garantias da mentoria.' },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 sm:space-y-4">
      {faqItems.map((item, i) => (
        <div key={i} className="glass-card overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex items-center justify-between w-full cursor-pointer p-6 sm:p-8 text-left gap-3"
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
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-white/60 leading-relaxed text-sm sm:text-base">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
