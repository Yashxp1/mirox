import { useGetOnedoc } from '@/api-hooks/useDocuments';
import Profile from '@/components/auth/Profile';
import { ModeToggle } from '@/components/darkmode/ModeToggle';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Bell, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface TopbarProps {
  wsId: string;
  docId: string;
}

const Topbar = ({ wsId, docId }: TopbarProps) => {
  const { data, isLoading, isError } = useGetOnedoc(wsId, docId);

  console.log('doc data: ', data);

  return (
    <div className=" dark:bg-[#222120] bg-zinc-50 shadow-2xs  w-full flex justify-between items-center py-2 dark:text-zinc-200 text-zinc-700 px-2 border-b">
      <Link href={`/ws/${wsId}`}>
        <Home className="size-5" />
      </Link>
      {isLoading ? (
        <Spinner variant="circle" />
      ) : (
        <h1 className="text-sm font-semibold">
          {data?.name || 'Untitled document'}
        </h1>
      )}
      {isError && <h1>Failed to load the name</h1>}
      <div className="flex justify-center items-center gap-4">
        <ModeToggle />
        <Bell className="size-5" />
        <Profile />
      </div>
    </div>
  );
};

export default Topbar;
