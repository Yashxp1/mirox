'use client';
import { ClipboardList, ListTodo, PanelRightOpen, Users } from 'lucide-react';
import React from 'react';
import { ModeToggle } from '../darkmode/ModeToggle';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; // shadcn helper for conditional classes

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const params = useParams();
  const pathname = usePathname();
  const id = params.id as string;

  // Define nav links
  const navLinks = [
    { href: `/workspace/${id}`, label: 'All Issues', icon: ClipboardList },
    { href: `/workspace/${id}/assigned`, label: 'Assigned', icon: ListTodo },
    { href: `/workspace/${id}/members`, label: 'Members', icon: Users },
  ];

  return (
    <div className="border-b border-zinc-300 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 w-full py-1">
      <div className="flex justify-between items-center w-full px-3 sm:px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="flex justify-center items-center rounded-md p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition-all"
          >
            <PanelRightOpen size={18} strokeWidth={2.2} />
          </button>

          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-2 px-2 sm:px-3 py-1 text-xs rounded-md border transition-all',
                    'border-zinc-300 dark:border-zinc-800',
                    'hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
                    isActive
                      ? 'bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 font-medium'
                      : 'bg-transparent text-zinc-600 dark:text-zinc-400'
                  )}
                >
                  <Icon size={16} />
                  <p>{label}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center px-2 sm:px-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
