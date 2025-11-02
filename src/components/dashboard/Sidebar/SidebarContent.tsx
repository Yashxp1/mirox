'use client';

import { Inbox } from 'lucide-react';

const SidebarContent = () => {
  return (
    <aside className="flex  text-sm flex-col justify-between px-4">
      <div className=" gap-0.5 flex flex-col">
        <h2 className='font-[500] py-1 text-zinc-400'>Workspace</h2>
        <p className="flex pl-2 py-1.5 rounded-sm hover:bg-zinc-900 items-center gap-2 transition-all duration-200">
          <Inbox size={19} /> Inbox
        </p>
      </div>
    </aside>
  );
};

export default SidebarContent;
