'use client';
import {
  Box,
  BugPlay,
  Cloud,
  FileInput,
  Github,
  Layers,
  MoreHorizontal,
  Plus,
} from 'lucide-react';

const SidebarContent = () => {

  const items = [
    {
      title: null,
      options: [
        { icon: Box, label: 'Projects' },
        { icon: BugPlay, label: 'My issues' },
      ],
    },
    {
      title: 'Workspace',
      options: [
        { icon: Box, label: 'Projects' },
        { icon: Layers, label: 'Views' },
        { icon: MoreHorizontal, label: 'More' },
      ],
    },

    {
      title: 'Your teams',
      teams: [
        {
          icon: Cloud,
          label: 'UI fix',
          options: [
            { icon: FileInput, label: 'Issues' },
            { icon: Box, label: 'Projects' },
            { icon: Layers, label: 'Views' },
          ],
        },
      ],
    },

    {
      title: 'Try',
      options: [
        { icon: FileInput, label: 'Import Issues' },
        { icon: Plus, label: 'Invite People' },
        { icon: Github, label: 'Link Github' },
      ],
    },
  ];

  return (
    <aside className="flex flex-col justify-between px-4">
      {items.map((i, idx) => (
        <div key={idx} className=" gap-0.5 flex flex-col">
          <h1 className="px-2 pt-2 text-sm font-semibold">{i.title}</h1>
          {i.options?.map((i2, idx2) => (
            <div
              key={idx2}
              className="flex  items-center gap-2 hover:bg-zinc-900 hover:text-white text-zinc-500 rounded-lg transition-all p-2"
            >

              <span className="">
                {<i2.icon size={19} strokeWidth={2.5} />}
              </span>

              <p className=" text-[#E3E4E7] font-[500]">{i2.label}</p>
            </div>
          ))}
          
        </div>
      ))}
      
    </aside>
  );
};

export default SidebarContent;
