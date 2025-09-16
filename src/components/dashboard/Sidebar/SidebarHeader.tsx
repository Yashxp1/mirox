'use client';
import { useWorkspaces } from '@/api-hooks/useWorkspaces';
import SignOut from '@/components/auth/SignOut';
import Create from '@/components/icon/Create';
import {
  BriefcaseBusiness,
  ChevronDown,
  LayoutGrid,
  Plus,
  Search,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SidebarHeader = () => {
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

  const { data, error } = useWorkspaces();
  if (error) return <p>Something went wrong</p>;

  return (
    <div className="flex justify-between items-center p-4 relative">
      <div
        onClick={handlePopUp}
        className="hover-sidebarHeader border w-[60%] flex justify-between items-center cursor-pointer"
      >
        <LayoutGrid size={19} />
        <ChevronDown
          size={15}
          className={
            isOpen ? 'rotate-180 transition-transform' : 'transition-transform'
          }
        />
      </div>

      <div
        ref={dropdownRef}
        className={`absolute top-full mx-2 left-4 border backdrop-blur-3xl rounded-md shadow-lg py-2 px-2 z-10 transition-all duration-200 w-full ${
          isOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="px-1 py-1.5 border-b border-zinc-800">
            <h1 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
              <BriefcaseBusiness size={16} /> Workspaces
            </h1>

            <ul className="flex-1 overflow-y-auto py-2 space-y-1">
              {data?.map((ws) => (
                <li
                  key={ws.id}
                  className="px-3 py-1 rounded-md text-sm font-semibold text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors"
                >
                  {ws.name}
                </li>
              ))}

              {(!data || data.length === 0) && (
                <p className="text-xs text-zinc-500 px-3 py-2">
                  No workspaces available
                </p>
              )}
            </ul>
            <div className="w-full flex gap-1 px-2 border justify-center items-center rounded-lg py-1  bg-white text-black">
              <button className=" text-sm text-center">Create workspace</button>
              <Plus size={19} />
            </div>
          </div>

          <div className="pt-1">
            <div className="flex justify-start px-1 py-1 rounded-md hover:bg-zinc-800 border-zinc-800">
              <SignOut />
            </div>
            <div className="flex justify-start text-sm px-1 py-1 rounded-md hover:bg-zinc-800 border-zinc-800">
              Settings
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-1 items-center">
        <div className="hover-sidebarHeader">
          <Search size={19} />
        </div>
        <span className="hover-sidebarHeader bg-zinc-800">
          <Create />
        </span>
      </div>
    </div>
  );
};

export default SidebarHeader;
