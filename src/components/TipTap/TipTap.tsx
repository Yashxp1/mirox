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
        class: ' w-[900px] focus:outline-none ring-0 py-10 px-10 ',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    immediatelyRender: false,
  });

  return (
    <div className="h-full flex flex-col">
      <div className="z-40">
        <MenuBar editor={editor} />
      </div>

      <div className="flex-1 overflow-y-auto flex border rounded-xl justify-center items-center mt-4 dark:bg-zinc-800 bg-zinc-100 mx-auto shadow-2xl">
      <div className="h-[560px]">
        <EditorContent editor={editor} />
      </div>
    </div>
    </div>
  );
};

export default Tiptap;
