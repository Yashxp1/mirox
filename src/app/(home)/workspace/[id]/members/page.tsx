'use client';
import { useGetWSMembers } from '@/api-hooks/useWorkspaces';
import { Spinner } from '@/components/ui/spinner';
import { User } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useGetWSMembers(id);

  console.log('Data --->', data);

  if (isError)
    return (
      <p className="text-destructive text-sm text-center mt-10">
        An error occurred.
      </p>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-60">
        <Spinner />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <p className="text-muted-foreground text-sm text-center mt-10">
        No members found.
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 bg-background text-foreground transition-colors duration-200">
      <div className="w-full max-w-5xl text-sm border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_1fr] gap-4 border-b border-border px-5 py-3 font-medium text-muted-foreground bg-muted/40">
          <p>Name</p>
          {/* <p>User ID</p> */}
          <p>Role</p>
          <p>Joined</p>
          <p>Email</p>
        </div>

        {data.map((i) => (
          <div
            key={i.id}
            className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_1fr] gap-4 border-b border-border px-5 py-3 items-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <User size={16} />
              <p className="truncate">{i.name || 'Unnamed'}</p>
            </div>
            {/* <p className="truncate text-muted-foreground">{i.publicId}</p> */}
            <p
              className={`font-semibold ${
                i.role === 'ADMIN'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-zinc-600 dark:text-yellow-400'
              }`}
            >
              {i.role.toLowerCase()}
            </p>
            <p className="text-muted-foreground text-sm">
              {new Date(i.joinedAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <p className="truncate">{i.email || 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
