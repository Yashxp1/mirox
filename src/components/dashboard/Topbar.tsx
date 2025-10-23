'use client';
import { ClipboardList, ListTodo, PanelRightOpen } from 'lucide-react';
import React from 'react';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="border border-l-0 gap-2 w-full flex p-1.5">
      <div
        onClick={toggleSidebar}
        className="flex justify-center items-center hover:bg-zinc-900 hover:text-white text-zinc-500 rounded-lg transition-all px-4 cursor-pointer"
      >
        <PanelRightOpen size={19} strokeWidth={2.5} />
      </div>

      <div className="flex gap-2">
        <div className="flex cursor-default justify-center items-center gap-2 border px-2 py-1.5 hover:bg-zinc-900 hover:text-white rounded-md transition-all">
          <span>{<ClipboardList size={16} />}</span>
          <p className="text-xs">All issues</p>
        </div>
        <div className="flex cursor-default justify-center items-center gap-2 border px-2 py-1.5 hover:bg-zinc-900 hover:text-white rounded-md transition-all">
          <span>{<ListTodo size={16} />}</span>
          <p className="text-xs">Assigned</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
