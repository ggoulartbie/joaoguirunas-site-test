'use client'

import ReactMarkdown from 'react-markdown'
import { MDXRemote } from 'next-mdx-remote'
import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import { Tab, Tabs } from './Tabs'
import type { RenderedContent } from '@/lib/content'

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
      <div className={className}>
        <MDXRemote {...content.serialized} components={mdxComponents} />
      </div>
    )
  }

  if (content.format === 'MARKDOWN') {
    return (
      <div className={className}>
        <ReactMarkdown
          components={{
            pre: ({ children }) => <>{children}</>,
            code: ({ className: cls, children }) => {
              if (cls?.startsWith('language-')) {
                const lang = cls.replace('language-', '')
                const code = typeof children === 'string' ? children : String(children ?? '')
                return <CodeBlock language={lang}>{code.replace(/\n$/, '')}</CodeBlock>
              }
              return (
                <code
                  className="rounded px-1 py-0.5 font-mono text-sm"
                  style={{ background: 'var(--ink-3)', color: 'var(--ember)' }}
                >
                  {children}
                </code>
              )
            },
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {content.raw}
        </ReactMarkdown>
      </div>
    )
  }

  // HTML — sanitized server-side via sanitizeHtml() before reaching this point
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  )
}
