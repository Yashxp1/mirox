'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import React from 'react';

interface DocumentData {
  id: number;
  name: string;
  content: {
    blocks: {
      data: {
        text: string;
      };
      type: string;
    }[];
  };
  authorId: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ResDoc {
  Tdata: DocumentData;
  onChange: (Tdata: DocumentData) => void;
}

// interface EditorProps {
//   contentData: string;
//   onChange: (contentData: string) => void;
// }

const Tiptap = ({ Tdata, onChange }: ResDoc) => {
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
    content: Tdata?.content.blocks[0]?.data.text ?? 'ERROR',
    editorProps: {
      attributes: {
        class: ' w-[900px] focus:outline-none ring-0 py-10 px-10 ',
      },
    },
    onUpdate: ({ editor }) => {
      // Update the DocumentData with the new content
      const updatedData = {
        ...Tdata,
        content: {
          blocks: [
            {
              data: {
                text: editor.getText(), // or editor.getHTML() if you want HTML
              },
              type: 'paragraph',
            },
          ],
        },
      };
      onChange(updatedData);
    },
    immediatelyRender: false,
  });

  // Update editor content when Tdata changes
  React.useEffect(() => {
    if (editor && Tdata?.content.blocks[0]?.data.text) {
      const currentContent = editor.getText();
      const newContent = Tdata.content.blocks[0].data.text;
      
      if (currentContent !== newContent) {
        editor.commands.setContent(newContent);
      }
    }
  }, [Tdata, editor]);

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
