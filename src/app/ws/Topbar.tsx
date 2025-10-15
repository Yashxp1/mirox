import Profile from '@/components/auth/Profile';
import { ModeToggle } from '@/components/darkmode/ModeToggle';
import { Bell, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Topbar = () => {
  return (
    <div className=" dark:bg-[#222120] bg-zinc-50 shadow-2xs  w-full flex justify-between items-center py-2 dark:text-zinc-200 text-zinc-700 px-2 border-b">
      <Link href='/dashboard'>
        <Home className="size-5" />
      </Link>

      <div className="flex justify-center items-center gap-4">
        <ModeToggle />
        <Bell className="size-5" />
        <Profile />
      </div>
    </div>
  );
};

export default Topbar;
