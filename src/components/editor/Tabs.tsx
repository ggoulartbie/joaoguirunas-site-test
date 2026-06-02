'use client'

import { useState, type ReactNode, Children, isValidElement } from 'react'
import { cn } from '@/lib/utils'

interface TabProps {
  label: string
  children: ReactNode
}

export function Tab({ children }: TabProps) {
  return <>{children}</>
}

interface TabsProps {
  children: ReactNode
}

export function Tabs({ children }: TabsProps) {
  const [active, setActive] = useState(0)

  const tabs = Children.toArray(children).filter(
    (child): child is React.ReactElement<TabProps> =>
      isValidElement(child) && typeof (child.props as TabProps).label === 'string'
  )

  return (
    <div className="my-4">
      <div className="flex gap-1 border-b border-white/10">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2 text-sm transition-colors',
              i === active
                ? 'border-b-2 border-white text-white'
                : 'text-zinc-400 hover:text-zinc-200'
            )}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{tabs[active]}</div>
    </div>
  )
}
