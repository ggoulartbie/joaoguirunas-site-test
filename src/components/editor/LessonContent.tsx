'use client'

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
  // Override default pre/code to use CodeBlock
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

  // HTML (sanitized server-side) and MARKDOWN (pre-highlighted code blocks)
  return (
    <div
      className={className}
      // Safe: HTML comes exclusively from sanitizeHtml() which runs server-side with DOMPurify
      dangerouslySetInnerHTML={{ __html: content.html }}
    />
  )
}
