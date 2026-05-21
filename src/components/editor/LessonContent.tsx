'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { MDXRemote } from 'next-mdx-remote'
import { useEffect, useRef } from 'react'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { Tab, Tabs } from './Tabs'
import type { RenderedContent } from '@/lib/content'

const markdownComponents: React.ComponentProps<typeof ReactMarkdown>['components'] = {
  h3: ({ children }) => (
    <h3
      className="mt-8 text-base font-semibold"
      style={{ color: 'var(--bone)', fontFamily: 'var(--type-sans)' }}
    >
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4
      className="mt-6 text-sm font-medium"
      style={{ color: 'var(--bone-dim)', fontFamily: 'var(--type-sans)' }}
    >
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-relaxed" style={{ color: 'var(--bone-dim)' }}>
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-none space-y-1.5 pl-5" style={{ color: 'var(--bone-dim)' }}>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="space-y-1.5 pl-5" style={{ color: 'var(--bone-dim)' }}>
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li
      className="relative pl-3 text-sm leading-relaxed before:absolute before:left-0 before:top-0 before:content-['·'] before:text-[var(--bone-mute)]"
      style={{ color: 'var(--bone-dim)' }}
    >
      {children}
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold" style={{ color: 'var(--bone)' }}>
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic" style={{ color: 'var(--bone-dim)' }}>
      {children}
    </em>
  ),
  blockquote: ({ children }) => (
    <blockquote
      className="my-4 border-l-2 py-0.5 pl-4 italic"
      style={{ borderColor: 'var(--hairline-strong)', color: 'var(--bone-mute)' }}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <hr className="my-8 border-t" style={{ borderColor: 'var(--hairline)' }} />
  ),
  img: ({ src, alt }) => (
    <figure className="my-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? ''} className="w-full max-w-lg rounded-sm" />
      {alt && (
        <figcaption
          className="mt-1.5 text-center font-mono text-[11px]"
          style={{ color: 'var(--bone-mute)' }}
        >
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline"
      style={{ color: 'var(--ember)' }}
    >
      {children}
    </a>
  ),
  del: ({ children }) => (
    <del style={{ color: 'var(--bone-mute)' }}>{children}</del>
  ),
  mark: ({ children }) => (
    <mark style={{ background: 'var(--ember)', color: 'var(--void)', padding: '0 0.25rem' }}>
      {children}
    </mark>
  ),
  sup: ({ children }) => <sup style={{ fontSize: '0.75em' }}>{children}</sup>,
  sub: ({ children }) => <sub style={{ fontSize: '0.75em' }}>{children}</sub>,
  pre: ({ children }) => {
    const child = children as React.ReactElement<{ className?: string; children?: string }>
    const cls = child?.props?.className ?? ''
    const lang = cls.startsWith('language-') ? cls.replace('language-', '') : undefined
    const code = typeof child?.props?.children === 'string'
      ? child.props.children.replace(/\n$/, '')
      : String(child?.props?.children ?? '')
    return <CodeBlock language={lang}>{code}</CodeBlock>
  },
  code: ({ className: cls, children }) => {
    // inline code only — fenced blocks are handled by the `pre` renderer above
    if (cls?.startsWith('language-')) return <>{children}</>
    return (
      <code
        className="rounded px-1 py-0.5 font-mono text-sm"
        style={{ background: 'var(--ink-3)', color: 'var(--ember)' }}
      >
        {children}
      </code>
    )
  },
}

const mdxComponents = {
  Callout,
  CodeBlock,
  Tabs,
  Tab,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => {
    const child = (props.children as React.ReactElement<{ className?: string; children?: string }>)
    const lang = child?.props?.className?.replace('language-', '') ?? ''
    return <CodeBlock language={lang}>{child?.props?.children ?? ''}</CodeBlock>
  },
}

interface LessonContentProps {
  content: RenderedContent
  className?: string
}

export function LessonContent({ content, className }: LessonContentProps) {
  if (content.format === 'MDX') {
    return (
      <div className={`space-y-4 ${className ?? ''}`}>
        <MDXRemote {...content.serialized} components={mdxComponents} />
      </div>
    )
  }

  if (content.format === 'MARKDOWN') {
    return (
      <div className={`space-y-4 ${className ?? ''}`}>
        <ReactMarkdown
          components={markdownComponents}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          remarkRehypeOptions={{ allowDangerousHtml: true }}
        >
          {content.raw}
        </ReactMarkdown>
      </div>
    )
  }

  // HTML — sanitized server-side via sanitizeHtml() before reaching this point
  return <HtmlLessonContent html={content.html} className={className} />
}

function HtmlLessonContent({ html, className }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const pres = container.querySelectorAll<HTMLPreElement>('pre')
    const cleanups: (() => void)[] = []

    pres.forEach((pre) => {
      if (pre.querySelector('[data-copy-btn]')) return

      pre.style.position = 'relative'

      const btn = document.createElement('button')
      btn.setAttribute('data-copy-btn', '')
      btn.textContent = 'Copiar'
      btn.style.cssText =
        'position:absolute;top:8px;right:12px;font-size:11px;color:#d4d4d8;background:#3f3f46;border:1px solid #52525b;border-radius:6px;padding:3px 10px;cursor:pointer;display:flex;align-items:center;gap:4px;font-family:inherit;transition:all 150ms;font-weight:500'

      const toast = document.createElement('div')
      toast.textContent = 'Copiado com sucesso'
      toast.style.cssText =
        'position:absolute;top:8px;right:12px;font-size:11px;background:#3f3f46;color:#fff;padding:4px 10px;border-radius:6px;pointer-events:none;opacity:0;transition:opacity 200ms;z-index:10'
      pre.appendChild(toast)

      let timer: ReturnType<typeof setTimeout>
      function handleClick() {
        const code = pre.querySelector('code')
        const text = (code ?? pre).innerText
        navigator.clipboard.writeText(text.trim()).then(() => {
          btn.textContent = 'Copiado!'
          btn.style.color = '#86efac'
          btn.style.background = 'rgba(34,197,94,0.1)'
          btn.style.borderColor = 'rgba(34,197,94,0.4)'
          toast.style.opacity = '1'
          clearTimeout(timer)
          timer = setTimeout(() => {
            btn.textContent = 'Copiar'
            btn.style.color = '#d4d4d8'
            btn.style.background = '#3f3f46'
            btn.style.borderColor = '#52525b'
            toast.style.opacity = '0'
          }, 2000)
        })
      }

      btn.addEventListener('click', handleClick)
      pre.appendChild(btn)
      cleanups.push(() => {
        clearTimeout(timer)
        btn.removeEventListener('click', handleClick)
        btn.remove()
        toast.remove()
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [html])

  return (
    <div
      ref={ref}
      className={`lesson-html ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

