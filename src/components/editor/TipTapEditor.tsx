'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { createLowlight, common } from 'lowlight'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'

const lowlight = createLowlight(common)

interface TipTapEditorProps {
  value: string
  onChange: (html: string) => void
  className?: string
}

const toolbarBtn = 'px-2 py-1 font-mono text-[10px] text-white/50 transition-colors hover:bg-white/10 hover:text-white/80 disabled:opacity-30'
const activeBtn = 'bg-white/10 text-white/90'

export function TipTapEditor({ value, onChange, className }: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false }),
      Image,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  // Sync external value changes (e.g. format switching)
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div className={cn('flex flex-col border border-white/10', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap gap-0.5 border-b border-white/10 bg-white/[0.02] p-1.5">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={cn(toolbarBtn, editor.isActive('bold') && activeBtn)}>B</button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={cn(toolbarBtn, editor.isActive('italic') && activeBtn, 'italic')}>I</button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={cn(toolbarBtn, editor.isActive('strike') && activeBtn, 'line-through')}>S</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={cn(toolbarBtn, editor.isActive('code') && activeBtn, 'font-mono')}>{'<>'}</button>
        <div className="mx-1 w-px bg-white/10" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn(toolbarBtn, editor.isActive('heading', { level: 2 }) && activeBtn)}>H2</button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={cn(toolbarBtn, editor.isActive('heading', { level: 3 }) && activeBtn)}>H3</button>
        <div className="mx-1 w-px bg-white/10" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={cn(toolbarBtn, editor.isActive('bulletList') && activeBtn)}>• Lista</button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={cn(toolbarBtn, editor.isActive('orderedList') && activeBtn)}>1. Lista</button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={cn(toolbarBtn, editor.isActive('blockquote') && activeBtn)}>&quot;&quot;</button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={cn(toolbarBtn, editor.isActive('codeBlock') && activeBtn)}>{'{ }'}</button>
        <div className="mx-1 w-px bg-white/10" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL do link:')
            if (url) editor.chain().focus().setLink({ href: url }).run()
          }}
          className={cn(toolbarBtn, editor.isActive('link') && activeBtn)}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL da imagem:')
            if (url) editor.chain().focus().setImage({ src: url }).run()
          }}
          className={toolbarBtn}
        >
          Img
        </button>
        <div className="mx-1 w-px bg-white/10" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={toolbarBtn}>↩</button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={toolbarBtn}>↪</button>
      </div>

      {/* Content area */}
      <EditorContent
        editor={editor}
        className="tiptap-content min-h-[320px] p-4 text-sm text-white/80 outline-none"
      />
    </div>
  )
}
