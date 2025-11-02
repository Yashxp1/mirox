'use client';
import { ClipboardList, ListTodo, PanelRightOpen } from 'lucide-react';
import React from 'react';
import { ModeToggle } from '../darkmode/ModeToggle';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const params = useParams();
  const id = params.id as string;
  return (
    <div className="border-b py-1 w-full flex">
      <div className="flex w-full justify-between">
        <div className="flex py-1">
          <div
            onClick={toggleSidebar}
            className="flex justify-center items-center hover:bg-zinc-900 hover:text-white text-zinc-500 rounded-lg transition-all px-4 cursor-pointer"
          >
            <PanelRightOpen size={16} strokeWidth={2.5} />
          </div>

          <div className="flex text-xs gap-2">
            <div className="flex cursor-default justify-center items-center gap-2 border px-2 hover:bg-zinc-900 hover:text-white rounded-md transition-all">
              <Link
                href={`/workspace/${id}`}
                className="flex justify-center items-center gap-2"
              >
                <span>{<ClipboardList size={16} />}</span>
                <p className="">All issues</p>
              </Link>
            </div>
            <div className="flex cursor-default justify-center items-center gap-2 border px-2 hover:bg-zinc-900 hover:text-white rounded-md transition-all">
              <span>{<ListTodo size={16} />}</span>
              <p className="">Assigned</p>
            </div>
          </div>
        </div>
        <div className="px-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
