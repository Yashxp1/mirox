import Profile from '@/components/auth/Profile';
import { ModeToggle } from '@/components/darkmode/ModeToggle';
import { Bell, PanelRightClose, Search } from 'lucide-react';
import React from 'react';

const Topbar = () => {
  return (
    <div className=" dark:bg-[#222120] bg-zinc-100 shadow-2xs  w-full border-b flex justify-center items-center py-2 dark:text-zinc-200 text-zinc-700 px-2">
      <PanelRightClose className="size-5" />
      <div className="w-full flex justify-center items-center">
        <div className="w-[30%] px-2 flex justify-center items-center dark:border-zinc-700 border-zinc-300 dark:bg-zinc-800 bg-zinc-200 border focus:ring-0 outline-0 rounded-full">
          <Search className="size-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full dark:text-zinc-200 text-zinc-800 text-sm py-1 px-2 focus:ring-0 outline-0 rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <ModeToggle />
        <Bell className="size-5" />
        <Profile />
      </div>
    </div>
  );
};

export default Topbar;
