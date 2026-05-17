---
title: "Story LA-1.3: Student badge \"Em breve\" + bloqueio do player"
type: story
status: backlog
epic: LA
complexity: M
agent: sites-dev-alpha
created: 2026-05-17
updated: 2026-05-17
tags: [story, student, frontend, lessons]
related: ["[[LA-1.1-migration-is-available]]", "[[LA-1.2-admin-toggle-is-available]]"]
---

# Story LA-1.3: Student badge "Em breve" + bloqueio do player

## Objetivo
No lado do aluno, aulas com `is_available=false` aparecem normalmente nas listagens (página do curso e sidebar da aula) com um badge **"Em breve"** ao lado do título; ao clicar na aula, o player e o conteúdo NÃO carregam — em seu lugar é exibido um estado bloqueado dedicado ("Esta aula ainda não está disponível"), preservando o resto da página (breadcrumb, sidebar, navegação).

## Decisão arquitetural (registrada nesta story)
Spec do PO: *"a aula fica lá, mas com tag 'em breve'"*. Implicações:

1. **Listagem permanece** — não esconder a aula em `/academy/curso/[slug]` nem no `CourseSidebar`. O aluno vê que ela existe e está chegando.
2. **Badge "Em breve"** ao lado do título, visualmente distinto do "Concluída" e do "Lock" (módulo não comprado). Visualmente neutro/aguardando, não "negado".
3. **Link permanece clicável** — não desabilitar o `<Link>`. Clicar leva à página da aula, mas a renderização da página é o estado bloqueado.
4. **Bloqueio na própria página da aula** (`/curso/[slug]/aula/[lesson-slug]/page.tsx`) — depois de validar `hasAccess`, checar `lesson.is_available`. Se `false`, renderizar um componente `LessonUnavailable` com a mesma estrutura de `LockedContent` (mantém breadcrumb + título), mas mensagem "Em breve" e sem CTA de compra (o aluno já tem acesso ao módulo).
5. **Nav prev/next pula aulas indisponíveis?** **NÃO** nesta story. Manter a navegação linear — clicar em "próxima" pode levar a uma aula indisponível, que renderiza o estado bloqueado. Pular adicionaria complexidade (cálculo cross-module) e pode esconder informação útil. Follow-up opcional.

**Anti-confusão com gates existentes:**
- `LockedContent` (módulo não comprado) — usa cohort+payment CTA.
- `LessonUnavailable` (LA-1.3) — usa mensagem temporal "Em breve", sem CTA.
- Soft-delete (`deleted_at != null`) — aula nem aparece (filtrada na query).

## Acceptance Criteria
- [ ] AC1: Página do curso `src/app/(academy)/academy/(student)/curso/[slug]/page.tsx` adiciona `is_available` ao SELECT de `lessons` (linha ~89) e propaga até `ModuleAccordion`. Para `is_available=false`, renderiza badge "Em breve" (ex.: `<span>` com `font-mono text-[10px] uppercase` cor `var(--bone-mute)` ou similar tom suave) ao lado do título da aula. CheckCircle de "Concluída" continua aparecendo se já marcado.
- [ ] AC2: `CourseSidebar` (`src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/CourseSidebar.tsx`) recebe `is_available` nas lessons (atualizar `SidebarModule.lessons` type e o mapeamento no `page.tsx` da aula linha ~182-200). Renderiza badge "Em breve" idêntico (consistência visual).
- [ ] AC3: `page.tsx` da aula adiciona `is_available` ao SELECT da query principal (linha ~46-85) e, **após** o gate `hasAccess` (linha ~225), faz `if (!lesson.is_available) return <LessonUnavailable lessonTitle={...} courseSlug={slug} />`. Componente novo em `src/components/student/LessonUnavailable.tsx` espelha o layout de `LockedContent` mas mostra "Esta aula ainda não está disponível. Em breve."
- [ ] AC4: `resumeLesson` (página do curso, linha ~208-215) ignora aulas `is_available=false` ao calcular "primeira incompleta" — o aluno não é jogado num conteúdo bloqueado ao clicar "Retomar". Fallback continua sendo a primeira aula disponível (`is_available=true`) acessível.
- [ ] AC5: `pnpm build` passa. Smoke: marcar 1 aula como `is_available=false` no admin (via LA-1.2), abrir `/academy/curso/[slug]` → badge "Em breve" visível; clicar na aula → `LessonUnavailable` renderiza, player não monta, nenhum `video_id` é enviado ao cliente. Marcar de volta `true` → tudo volta ao normal.

## Escopo

**IN:**
- Atualizar SELECT de `lessons` em 2 server components (`page.tsx` do curso e `page.tsx` da aula) para incluir `is_available`.
- Atualizar tipos `LessonRow` locais e `SidebarLesson`/`SidebarModule` em `CourseSidebar.tsx`.
- Componente novo `src/components/student/LessonUnavailable.tsx`.
- Badge "Em breve" em listing do curso (`ModuleAccordion`) e na sidebar (`CourseSidebar`).
- Ajustar `resumeLesson` para pular indisponíveis.

**OUT:**
- Pular aulas indisponíveis no nav prev/next da página da aula (`globalPrev`/`globalNext`). Documentado na decisão acima.
- Esconder a aula completamente quando `is_available=false` (contraria spec do PO).
- Email/notification ao aluno quando uma aula sai do "Em breve" e fica disponível (fora de escopo).
- Mudar policies RLS para filtrar aulas indisponíveis no banco — gate é de aplicação, intencionalmente (PO pode reverter rápido).
- Bloqueio no `MarkCompleteButton` server action — se o aluno conseguir POSTAR progresso de uma aula indisponível (improvável via UI mas teoricamente possível), aceitar; LA-1.3 não muda actions de progresso.
- Bloqueio de comentários/likes em aula indisponível — `LessonUnavailable` retorna antes desses blocos renderizarem; sem necessidade extra.

## Contexto Técnico

**Arquivos afetados:**
- `src/app/(academy)/academy/(student)/curso/[slug]/page.tsx` (SELECT lessons linha ~89, `LessonRow` type linha ~25-32, `ModuleAccordion` linha ~480-525, `resumeLesson` linha ~208-215).
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/page.tsx` (SELECT principal linha ~46-85, gate após `hasAccess` linha ~225, mapeamento `sidebarModules` linha ~182-200).
- `src/app/(academy)/academy/(student)/curso/[slug]/aula/[lesson-slug]/CourseSidebar.tsx` (types `SidebarLesson`, render do `<li>`).
- `src/components/student/LessonUnavailable.tsx` (novo, espelho de `LockedContent`).

**Componente `LessonUnavailable.tsx` (template):**
```tsx
import { Clock } from 'lucide-react'
import Link from 'next/link'

export function LessonUnavailable({
  lessonTitle,
  courseSlug,
}: {
  lessonTitle: string
  courseSlug: string
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="border-b p-6" style={{ borderColor: 'var(--hairline)' }}>
        <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--bone-mute)' }}>
          <Link
            href={`/academy/curso/${courseSlug}`}
            className="transition-colors hover:text-[var(--bone)]"
            style={{ color: 'var(--bone-mute)' }}
          >
            Voltar ao curso
          </Link>
        </p>
        <h1
          className="mt-3 font-[var(--type-display)] italic"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2rem)', lineHeight: 1.1, color: 'var(--bone)' }}
        >
          {lessonTitle}
        </h1>
      </div>
      <div className="flex flex-col items-center gap-4 p-12 text-center">
        <Clock className="h-8 w-8" style={{ color: 'var(--bone-mute)' }} aria-hidden="true" />
        <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: 'var(--bone-mute)' }}>
          Em breve
        </p>
        <p className="max-w-md text-[14px]" style={{ color: 'var(--bone-dim)' }}>
          Esta aula ainda não está disponível. Volte em breve para acessar o conteúdo.
        </p>
      </div>
    </div>
  )
}
```

**Badge "Em breve" inline (template para `ModuleAccordion` linha ~510 e `CourseSidebar` ~189):**
```tsx
{!lesson.is_available && (
  <span
    className="shrink-0 border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider"
    style={{ borderColor: 'var(--hairline)', color: 'var(--bone-mute)' }}
  >
    Em breve
  </span>
)}
```

**Gate na página da aula (após linha ~225, antes de renderizar conteúdo):**
```ts
if (!lesson.is_available) {
  return <LessonUnavailable lessonTitle={lesson.title} courseSlug={slug} />
}
```

**Segurança (defesa em profundidade):** o gate `!lesson.is_available` roda **depois** de `hasAccess`. Isso garante que aluno sem acesso ao módulo veja `LockedContent` (CTA de compra) primeiro, e aluno COM acesso veja `LessonUnavailable` (mensagem temporal). A ordem importa.

**Anti-leak de `video_id`:** o `return` antecipado garante que a página NÃO chega na linha que envia `video_id` para `<VideoPlayer>`. Sem `is_available=false`, sem `video_id` no HTML do cliente.

**`resumeLesson` (linha ~208-215 de `page.tsx` do curso):**
```ts
const firstIncomplete = course.modules
  .filter((m) => hasGlobalAccess || accessibleModuleIds.has(m.id))
  .flatMap((m) => m.lessons)
  .find((l) => l.is_available && !completedSet.has(l.id))  // ← novo filtro
const firstLesson = course.modules
  .filter((m) => hasGlobalAccess || accessibleModuleIds.has(m.id))
  .flatMap((m) => m.lessons)
  .find((l) => l.is_available)  // ← novo filtro
const resumeLesson = firstIncomplete ?? firstLesson
```

**Dependência:** LA-1.1 (coluna + tipos) é PRÉ-REQUISITO. LA-1.2 (admin toggle) é INDEPENDENTE — podem rodar em paralelo após LA-1.1, mas QA E2E final só faz sentido com LA-1.2 + LA-1.3 juntas (admin marca, aluno vê).

## Dev Agent Record

| Campo      | Valor |
|---         |---|
| Agente     | — |
| Iniciado   | — |
| Concluído  | — |
| Branch     | — |

## File List
<!-- Dev preenche ao concluir -->

## QA Results
<!-- QA preenche ao revisar -->
