'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  MessageSquare,
  LogOut,
  BookOpen,
  Shield,
  ExternalLink,
  Settings,
  BarChart2,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Conteúdo',
    items: [
      { href: '/academy/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/academy/admin/cursos', label: 'Cursos', icon: BookOpen },
      { href: '/academy/admin/turmas', label: 'Turmas', icon: GraduationCap },
      { href: '/academy/admin/progresso', label: 'Progresso', icon: BarChart2 },
    ],
  },
  {
    label: 'Comunidade',
    items: [
      { href: '/academy/admin/forum', label: 'Fórum', icon: MessageSquare },
      { href: '/academy/admin/moderacao', label: 'Moderação', icon: Shield },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      { href: '/academy/admin/pagamentos', label: 'Pagamentos', icon: CreditCard },
    ],
  },
  {
    label: 'Usuários',
    items: [
      { href: '/academy/admin/usuarios', label: 'Usuários', icon: Users },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { href: '/academy/admin/configuracoes', label: 'Configurações', icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/academy/login')
    router.refresh()
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-white/[0.07] bg-[var(--void)] lg:flex">
      <div className="flex h-16 flex-col justify-center border-b border-white/[0.07] px-6">
        <Image
          src="/images/brand/logo-horizontal.svg"
          width={140}
          height={26}
          alt="Logo"
          className="object-contain object-left"
          priority
        />
        <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--ember)]">
          Admin
        </span>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto py-2">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-6 pb-1 pt-4 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
              {group.label}
            </p>
            {group.items.map(({ href, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === href
                : pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-6 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors',
                    active
                      ? 'border-l-2 border-[var(--ember)] bg-[var(--ember)]/[0.06] text-[var(--ember)]'
                      : 'border-l-2 border-transparent text-[var(--bone-mute)] hover:bg-white/[0.04] hover:text-[var(--bone)]'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      active ? 'text-[var(--ember)]' : 'text-[var(--bone-mute)]'
                    )}
                  />
                  {label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.07]">
        <Link
          href="/"
          className="flex w-full items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)]"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Voltar ao site
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)]"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}
