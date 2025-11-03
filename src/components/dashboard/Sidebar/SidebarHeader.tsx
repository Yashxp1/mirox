'use client';
import { useGetAllWorkspaces } from '@/api-hooks/useWorkspaces';
import SignOut from '@/components/auth/SignOut';
import { BriefcaseBusiness, ChevronDown, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

interface SidebarHeaderProps {
  workspace: any;
  workspaceError: boolean;
}

const SidebarHeader = ({ workspace, workspaceError }: SidebarHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handlePopUp = () => {
    console.log('Clicked');
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const { data, error } = useGetAllWorkspaces();

  console.log('wsname : ', workspace?.name);

  if (error) return <p>Something went wrong</p>;
  if (workspaceError) return <p>Something went wrong</p>;

  return (
    <div className="flex justify-between items-center p-4 relative w-full">
      <div
        onClick={handlePopUp}
        className="border border-border w-full flex justify-between items-center cursor-pointer px-2 py-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        <p className="flex items-center gap-2 text-xs text-foreground">
          <BriefcaseBusiness size={16} />
          {workspace?.name || '-'}
        </p>

        <ChevronDown
          size={15}
          className={
            isOpen ? 'rotate-180 transition-transform' : 'transition-transform'
          }
        />
      </div>

      <div
        ref={dropdownRef}
        className={`absolute top-full mx-2 left-4 border border-border bg-background/95 backdrop-blur-3xl rounded-md shadow-lg py-2 px-2 z-10 transition-all duration-200 w-full ${
          isOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-1 py-1.5 border-b border-border">
            <h1 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BriefcaseBusiness size={16} /> Workspaces
            </h1>

            <ul className="flex-1 overflow-y-auto py-2 space-y-1">
              {data?.map((ws) => (
                <li
                  key={ws.id}
                  className="px-3 py-1 rounded-md text-sm font-[500] text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
                >
                  <Link href={`/dashboard/${ws.name}`}>{ws.name}</Link>
                </li>
              ))}

              {(!data || data.length === 0) && (
                <p className="text-xs text-muted-foreground px-3 py-2">
                  No workspaces available
                </p>
              )}
            </ul>
            <Link href="/dashboard">
              <div className="w-full flex gap-1 px-2 border border-border justify-center items-center rounded-md py-1 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <button className="text-sm text-center">
                  Create workspace
                </button>
                <Plus size={19} />
              </div>
            </Link>
          </div>

          <div className="pt-1">
            <div className="flex justify-start px-1 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
              <SignOut />
            </div>
            <div className="flex justify-start text-sm px-1 py-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
              Settings
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center gap-1 items-center">
        <div className="p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
          <Search size={19} />
        </div>
        <span className="p-1.5 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
          <Create />
        </span>
      </div> */}
    </div>
  );
};

export default SidebarHeader;
