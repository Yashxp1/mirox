'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';

interface EditorProps {
  contentData: string;
  onChange: (contentData: string) => void;
}

const Tiptap = ({ contentData, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-3',
          },
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    content: contentData,
    editorProps: {
      attributes: {
        class:
          'min-h-[156px] border rounded-md dark:bg-zinc-800 bg-zinc-100 focus:outline-none ring-0 py-2 px-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
