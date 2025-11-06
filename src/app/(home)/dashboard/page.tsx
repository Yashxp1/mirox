'use client';

import {
  useCreateWorkspaces,
  useGetAllWorkspaces,
  useJoinWorkspace,
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
  const [workspaceID, setWorkspaceID] = useState('');
  const { data, isLoading, isError } = useGetAllWorkspaces();

  const { mutate, isPending } = useCreateWorkspaces();

  const { mutate: joinWorkspace, isPending: isJoining } = useJoinWorkspace();

  const [WSAction, setWSAction] = useState<'create' | 'Join' | null>('Join');

  // const handleToggleAction = () => {
  //   setWSAction(!WSAction);
  //   console.log('clicked!', WSAction);
  // };

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

  const handleJoinWorkspace = () => {
    if (!workspaceID.trim()) {
      toast.error('Workspace ID cannot be empty');
      return;
    }

    joinWorkspace(workspaceID, {
      onSuccess: () => {
        toast.success('Joined workspace successfully!');
        setWorkspaceID('');
      },
      onError: (err) => {
        console.error(err);
        toast.error('Failed to join workspace');
      },
    });
  };

  if (isError) return <p>Error loading workspace</p>;

  return (
    <div className="flex flex-col items-center text-foreground w-full min-h-[400px] py-8 px-4 sm:px-6 md:px-8">
      <div className="flex flex-col justify-center items-center w-full max-w-md">
        <div className="flex w-full gap-2 pb-3">
          <h1
            onClick={() => setWSAction('create')}
            className={`flex-1 text-center py-2 rounded-md border cursor-pointer text-sm sm:text-base font-medium transition-all ${
              WSAction === 'create'
                ? 'bg-zinc-800 text-white border-zinc-700'
                : 'bg-transparent hover:bg-zinc-900 border-zinc-700 text-zinc-300'
            }`}
          >
            Create
          </h1>
          <h1
            onClick={() => setWSAction('Join')}
            className={`flex-1 text-center py-2 rounded-md border cursor-pointer text-sm sm:text-base font-medium transition-all ${
              WSAction === 'Join'
                ? 'bg-zinc-800 text-white border-zinc-700'
                : 'bg-transparent hover:bg-zinc-900 border-zinc-700 text-zinc-300'
            }`}
          >
            Join
          </h1>
        </div>

        {WSAction === 'create' && (
          <div className="flex flex-col w-full gap-3 rounded-md bg-zinc-950/40 backdrop-blur-sm">
            <Input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="Enter workspace name"
              className="text-sm sm:text-base"
            />
            <Button
              className="w-full text-sm sm:text-base"
              onClick={handleCreateWorkspace}
              disabled={isPending}
            >
              {isPending ? <Spinner /> : 'Create Workspace'}
            </Button>
          </div>
        )}

        {WSAction === 'Join' && (
          <div className="flex flex-col w-full gap-3 rounded-md bg-zinc-950/40 backdrop-blur-sm">
            <Input
              value={workspaceID}
              onChange={(e) => setWorkspaceID(e.target.value)}
              placeholder="Enter workspace ID to join"
              className="text-sm sm:text-base"
            />
            <Button
              className="w-full text-sm sm:text-base"
              onClick={handleJoinWorkspace}
              disabled={isJoining}
            >
              {isJoining ? <Spinner /> : 'Join Workspace'}
            </Button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="pt-6">
          <Spinner className="size-6" />
        </div>
      ) : (
        <div className="pt-3 w-full flex flex-col items-center">
          {data?.length === 0 ? (
            <p className='dark:text-zinc-400 text-zinc-800'>No workspace found</p>
          ) : (
            <>
              {data?.map((ws) => (
                <Link
                  key={ws.id}
                  href={`/workspace/${ws.wsId}`}
                  className="w-full max-w-md"
                >
                  <div className="border border-border flex justify-between w-full rounded-lg p-2 sm:p-2 my-1 text-sm sm:text-base hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                    <p className="flex items-center gap-2 truncate">
                      <BriefcaseBusiness size={16} /> {ws.name}
                    </p>
                    <p className="flex text-xs sm:text-sm items-center gap-1 text-zinc-400">
                      {new Date(ws.CreatedAt).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                      <ArrowRight size={16} />
                    </p>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
