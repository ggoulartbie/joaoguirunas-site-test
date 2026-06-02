import 'server-only'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

export type SerializedMDX = MDXRemoteSerializeResult

// Components available in MDX content — imported by the client MDXContent component
export { Callout } from '@/components/editor/Callout'
export { CodeBlock } from '@/components/editor/CodeBlock'
export { Tab, Tabs } from '@/components/editor/Tabs'

export async function serializeMDX(source: string): Promise<SerializedMDX> {
  return serialize(source, {
    parseFrontmatter: false,
    mdxOptions: {
      development: process.env.NODE_ENV === 'development',
    },
  })
}
