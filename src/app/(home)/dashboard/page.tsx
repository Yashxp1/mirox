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
    <div className="flex flex-col items-center text-foreground w-full min-h-[400px] py-8">
      <div className="flex flex-col gap-4 w-full max-w-md">
        <div className="flex flex-col gap-2">
          <Input
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            placeholder="Enter workspace name"
          />
          <Button
            className="w-full"
            variant="secondary"
            onClick={handleCreateWorkspace}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : 'Create Workspace'}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Input
            value={workspaceID}
            onChange={(e) => setWorkspaceID(e.target.value)}
            placeholder="Enter workspace ID to join"
          />
          <Button
            className="w-full"
            onClick={handleJoinWorkspace}
            disabled={isJoining}
          >
            {isJoining ? <Spinner /> : 'Join Workspace'}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="pt-6">
          <Spinner className="size-6" />
        </div>
      ) : (
        <div className="pt-6 w-full flex flex-col items-center">
          {data?.map((ws) => (
            <Link
              key={ws.id}
              href={`/workspace/${ws.wsId}`}
              className="w-full max-w-md"
            >
              <div className="border border-border flex text-sm justify-between w-full rounded-lg p-2 my-1 hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                <p className="flex items-center gap-2">
                  <BriefcaseBusiness size={16} /> {ws.name}
                </p>
                <p className="flex text-xs items-center gap-2">
                  {new Date(ws.CreatedAt).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                  <ArrowRight size={16} />
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
