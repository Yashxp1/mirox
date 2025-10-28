'use client';

import {
  useCreateWorkspaces,
  useGetAllWorkspaces,
} from '@/api-hooks/useWorkspaces';
import Link from 'next/link';
import { Spinner } from '@/components/ui/spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const Page = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const { data, isLoading, isError } = useGetAllWorkspaces();

  const { mutate, isPending } = useCreateWorkspaces();

  const handleCreateWorkspace = () => {
    if (!workspaceName.trim()) {
      toast.error('Workspace name cannot be empty');
      return;
    }

    mutate(
      { name: workspaceName },
      {
        onSuccess: () => {
          toast.success('Workspace created successfully!');
          setWorkspaceName('');
        },
        onError: (err) => {
          console.error(err);
          toast.error('Failed to create workspace');
        },
      }
    );
  };

  if (isError) return <p>Error loading workspace: {String(isError)}</p>;

  return (
    <div className="flex text-zinc-200 justify-center flex-col items-center w-full h-[400px]">
      <div className="flex justify-center gap-2 py-4">
        <Input
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          placeholder="Enter a workspace name"
        />
        <Button onClick={handleCreateWorkspace} disabled={isPending}>
          {isPending ? <Spinner /> : 'Join'}
        </Button>
      </div>

      {isLoading ? (
        <div className="pt-6">
          <Spinner className="size-6" />
        </div>
      ) : (
        data?.map((ws) => (
          <div key={ws.id} className="w-full flex justify-center items-center">
            <Link href={`/workspace/${ws.wsId}`}>
              <div className="border flex text-sm justify-between w-[280px] rounded-lg p-2 my-1 hover:bg-zinc-800 transition-all duration-300">
                <p className="flex justify-center items-center gap-2">
                  <BriefcaseBusiness size={16} /> {ws.name}
                </p>
                <p className="flex text-xs justify-center items-center gap-2">
                  {new Date(ws.CreatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  <ArrowRight size={16} />
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Page;
