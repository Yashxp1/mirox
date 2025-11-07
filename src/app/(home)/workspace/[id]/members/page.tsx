'use client';
import { useGetWSMembers, useLeaveWorkspace } from '@/api-hooks/useWorkspaces';
import { Spinner } from '@/components/ui/spinner';
import { User } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useGetWSMembers(id);
  const userId = data?.map((i) => i.id);
  const { mutate, isPending: isDeleting } = useLeaveWorkspace(id, userId);

  // const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleRemoveUser = () => {
    // if (!selectedUserId) return;

    mutate(undefined, {
      onSuccess: () => {
        toast.success('User removed successfully');
        // setSelectedUserId(null);
      },
      onError: () => {
        toast.error('Failed to remove the user');
      },
    });
  };

  if (isError)
    return (
      <p className="text-destructive text-sm text-center mt-10">
        An error occurred.
      </p>
    );

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-60">
        <Spinner className="size-6" />
      </div>
    );

  if (!data || data.length === 0)
    return (
      <p className="text-muted-foreground text-sm text-center mt-10">
        No members found.
      </p>
    );

  return (
    <div className=" flex flex-col items-center py-10 px-4 bg-background text-foreground transition-colors duration-200">
      <div className="w-full max-w-5xl text-sm border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_1fr] gap-4 border-b border-border px-5 py-3 font-medium text-muted-foreground bg-muted/40">
          <p>Name</p>
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

            <p
              className={` text-xs ${
                i.role === 'ADMIN'
                  ? 'text-emerald-600 dark:text-emerald-400 bg-green-600/20  py-1 px-1.5 rounded-full w-fit'
                  : 'text-yellow-600 bg-amber-600/20 py-1 px-1.5 rounded-full w-fit'
              }`}
            >
              {i.role.toLowerCase()}
            </p>
            <p className="text-muted-foreground text-xs">
              {new Date(i.createdAt).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <p className="truncate">{i.email || 'N/A'}</p>

            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    // onClick={() => setSelectedUserId(i.id)}
                    className="text-xs bg-red-500/20 text-red-600 px-2 py-1 rounded-full"
                  >
                    remove
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Remove user</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to remove this user?
                    </DialogDescription>
                  </DialogHeader>

                  <div className="flex justify-center items-center w-full gap-2">
                    <Button
                      onClick={handleRemoveUser}
                      type="button"
                      className="bg-red-600/20 text-red-500 hover:bg-red-600/10"
                      disabled={isDeleting}
                    >
                      {isDeleting ? <Spinner /> : 'Remove'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
