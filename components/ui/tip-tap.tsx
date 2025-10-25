'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '@/components/ui/button'
import {
   Bold,
   Italic,
   Heading1,
   Heading2,
   List,
   ListOrdered,
   Quote,
   Undo,
   Redo,
   Heading3,
   Underline
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TiptapEditorProps {
   value: string
   onChange: (value: string) => void
   placeholder?: string
   className?: string
}

export function TiptapEditor({
   value,
   onChange,
   placeholder = 'Type here...',
   className,
}: TiptapEditorProps) {
   const editor = useEditor({
      extensions: [
         StarterKit.configure({
            heading: {
               levels: [1, 2, 3],
            },
         }),
         Placeholder.configure({
            placeholder,
         }),

      ],
      immediatelyRender: false,
      content: value,
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML())
      },
      editorProps: {
         attributes: {
            class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none max-w-none min-h-[200px] p-4',
         },
      },
   })

   if (!editor) return null




   return (
      <div className={cn('border rounded-lg overflow-hidden bg-background', className)}>
         {/* Toolbar */}
         <div className="border-b bg-muted p-2 flex flex-wrap gap-1">
            {/* Text Formatting */}
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleBold().run()}
               className={editor.isActive('bold') ? 'bg-accent' : ''}
               title="Bold (Ctrl+B)"
            >
               <Bold className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleItalic().run()}
               className={editor.isActive('italic') ? 'bg-accent' : ''}
               title="Italic (Ctrl+I)"
            >
               <Italic className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleUnderline().run()} 
               className={editor.isActive('underline') ? 'bg-accent' : ''}
               title="Underline (Ctrl+U)"
            >
               <Underline className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Headings */}
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
               className={editor.isActive('heading', { level: 1 }) ? 'bg-accent' : ''}
               title="Heading 1"
            >
               <Heading1 className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
               className={editor.isActive('heading', { level: 2 }) ? 'bg-accent' : ''}
               title="Heading 2"
            >
               <Heading2 className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
               title="Heading 3"
            >
               <Heading3 className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            {/* Lists */}
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleBulletList().run()}
               className={editor.isActive('bulletList') ? 'bg-accent' : ''}
               title="Bullet List"
            >
               <List className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleOrderedList().run()}
               className={editor.isActive('orderedList') ? 'bg-accent' : ''}
               title="Numbered List"
            >
               <ListOrdered className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().toggleBlockquote().run()}
               className={editor.isActive('blockquote') ? 'bg-accent' : ''}
               title="Quote"
            >
               <Quote className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            {/* Undo/Redo */}
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().undo().run()}
               disabled={!editor.can().undo()}
               title="Undo (Ctrl+Z)"
            >
               <Undo className="h-4 w-4" />
            </Button>

            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={() => editor.chain().focus().redo().run()}
               disabled={!editor.can().redo()}
               title="Redo (Ctrl+Y)"
            >
               <Redo className="h-4 w-4" />
            </Button>
         </div>

         {/* Editor Content */}
         <EditorContent
            editor={editor}
            className="max-h-[500px] overflow-y-auto"
         />
      </div>
   )
}