import 'server-only'
import { createHighlighter } from 'shiki'

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: [
        'typescript', 'javascript', 'tsx', 'jsx',
        'python', 'bash', 'sh',
        'sql', 'json', 'yaml', 'toml',
        'css', 'html', 'markdown',
      ],
    })
  }
  return highlighterPromise
}

export async function highlightCode(code: string, lang: string): Promise<string> {
  const highlighter = await getHighlighter()
  const supportedLangs = highlighter.getLoadedLanguages()
  const resolvedLang = supportedLangs.includes(lang as never) ? lang : 'text'

  return highlighter.codeToHtml(code, {
    lang: resolvedLang,
    theme: 'github-dark',
  })
}

// Exported for the react-markdown rehype pipeline
export { getHighlighter }
