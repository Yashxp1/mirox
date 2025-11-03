'use client';
import TaskModal from '@/app/(home)/workspace/TaskModal';
import { Inbox } from 'lucide-react';

const SidebarContent = () => {
  return (
    <aside className="flex text-sm flex-col justify-between px-4 w-full">
      <div className="gap-0.5 flex flex-col w-full">
        <h2 className="font-[500] py-1 text-muted-foreground">Workspace</h2>
        <p className="flex pl-2 py-1.5 rounded-sm hover:bg-accent hover:text-accent-foreground items-center gap-2 transition-all duration-200 cursor-pointer">
          <Inbox size={19} /> Inbox
        </p>
        <div className="w-full">
          <TaskModal />
        </div>
      </div>
    </aside>
  );
};

export default SidebarContent;
