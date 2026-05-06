import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Lock } from 'lucide-react'
import { CommentSection } from '@/components/student/CommentSection'
import { MOCK_COMMENTS } from '@/components/student/mock-data'

type Props = {
  params: Promise<{ slug: string; 'lesson-slug': string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { 'lesson-slug': lessonSlug } = await params
  return {
    title: lessonSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
  }
}

export default async function AulaPage({ params }: Props) {
  const { slug, 'lesson-slug': lessonSlug } = await params

  // TODO F3.3: Server Component com has_access(userId, lessonId)
  // Se has_access retornar false → renderizar <LockedContent />
  // Nunca expor video_id no DOM sem validação server-side

  // Mock: sempre tem acesso em desenvolvimento
  const hasAccess = true

  const lessonTitle = lessonSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  const lessonComments = MOCK_COMMENTS.filter((c) => c.lessonId === 'lesson-demo')

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/curso/${slug}`}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Voltar ao curso
        </Link>

        <div className="mt-8 flex flex-col items-center border border-white/10 bg-[#0C0C12] p-12 text-center">
          <Lock className="h-10 w-10 text-white/20" />
          <h1 className="mt-4 text-xl font-bold text-white">Conteúdo bloqueado</h1>
          <p className="mt-2 text-sm text-white/50">
            Esta aula faz parte de uma turma que você não tem acesso.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Breadcrumb */}
      <Link
        href={`/curso/${slug}`}
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Voltar ao curso
      </Link>

      {/* Título */}
      <h1 className="text-2xl font-bold text-white">{lessonTitle}</h1>

      {/* Player placeholder — implementado em F3.2 */}
      <div className="flex aspect-video items-center justify-center border border-white/10 bg-[#0C0C12]">
        <p className="font-mono text-xs uppercase tracking-widest text-white/20">
          Player de vídeo — F3.2
        </p>
      </div>

      {/* Ação: marcar como concluída */}
      <div className="flex items-center justify-between border border-white/10 bg-[#0C0C12] p-4">
        <span className="text-sm text-white/60">
          Concluiu esta aula?
        </span>
        <button className="flex items-center gap-2 border border-white/10 px-4 py-2 font-mono text-xs uppercase tracking-wide text-white/50 transition-colors hover:border-green-500/40 hover:text-green-400">
          <CheckCircle className="h-3.5 w-3.5" />
          Marcar como concluída
        </button>
      </div>

      {/* Navegação anterior/próxima */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-white/30 hover:text-white/60 transition-colors disabled:opacity-20">
          <ArrowLeft className="h-3.5 w-3.5" />
          Aula anterior
        </button>
        <button className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-white/30 hover:text-white/60 transition-colors">
          Próxima aula
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Tabs: Sobre / Materiais / Comentários */}
      <LessonTabs lessonSlug={lessonSlug} comments={lessonComments} />
    </div>
  )
}

function LessonTabs({
  lessonSlug: _lessonSlug,
  comments,
}: {
  lessonSlug: string
  comments: (typeof MOCK_COMMENTS)
}) {
  return (
    <div className="space-y-4">
      {/* Tab nav — será Client Component com estado em F3.3 */}
      <div className="flex border-b border-white/10">
        {['Sobre a aula', 'Materiais', 'Comentários'].map((tab, i) => (
          <button
            key={tab}
            className={`px-4 py-2.5 font-mono text-xs uppercase tracking-wide transition-colors ${
              i === 2
                ? 'border-b-2 border-[#FF3A0E] text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Comments tab ativa por padrão neste shell */}
      <CommentSection lessonId="lesson-demo" initialComments={comments} />
    </div>
  )
}
