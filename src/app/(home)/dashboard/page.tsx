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
import { toast } from 'sonner';
import { useState } from 'react';
import SignOut from '@/components/auth/SignOut';
import { ModeToggle } from '@/components/darkmode/ModeToggle';
import { ArrowRight, BriefcaseBusiness, LogOut } from 'lucide-react';

const Page = () => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceID, setWorkspaceID] = useState('');
  const { data, isLoading, isError } = useGetAllWorkspaces();
  const { mutate, isPending } = useCreateWorkspaces();
  const { mutate: joinWorkspace, isPending: isJoining } = useJoinWorkspace();
  const [WSAction, setWSAction] = useState<'create' | 'join' | null>('join');

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

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-2">
          <p className="text-destructive font-medium">
            Failed to load workspaces
          </p>
          <p className="text-sm text-muted-foreground">
            Please try again later
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed flex justify-center items-center bottom-6 right-6 z-50 p-3 gap-2">
        <Button variant="outline" className="" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          <SignOut />
        </Button>
        <ModeToggle />
      </div>

      <main className="container max-w-2xl mx-auto px-4 py-8">
        <div className="dark:bg-zinc-800 bg-zinc-300 p-1 rounded-lg mb-8">
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => setWSAction('create')}
              className={`px-4 py-2.5  text-sm font-medium rounded-md transition-all ${
                WSAction === 'create'
                  ? 'dark:bg-zinc-700 bg-zinc-100 text-foreground shadow-sm'
                  : ' hover:text-foreground dark:text-zinc-300 text-zinc-800'
              }`}
            >
              Create Workspace
            </button>

            <button
              onClick={() => setWSAction('join')}
              className={`px-4 py-2.5  text-sm font-medium rounded-md transition-all ${
                WSAction === 'join'
                  ? 'dark:bg-zinc-700 bg-zinc-100 text-foreground shadow-sm'
                  : 'dark:text-zinc-300 hover:text-foreground text-zinc-800'
              }`}
            >
              Join Workspace
            </button>
          </div>
        </div>

        <div className="mb-12">
          {WSAction === 'create' && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="workspace-name"
                  className="text-sm font-medium mb-2 block"
                >
                  Workspace Name
                </label>
                <Input
                  id="workspace-name"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  placeholder="Enter a workspace name"
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleCreateWorkspace()
                  }
                />
              </div>
              <Button
                className="w-full"
                onClick={handleCreateWorkspace}
                disabled={isPending || !workspaceName.trim()}
                size="lg"
              >
                {isPending ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Creating...
                  </>
                ) : (
                  'Create Workspace'
                )}
              </Button>
            </div>
          )}

          {WSAction === 'join' && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="workspace-id"
                  className="text-sm font-medium mb-2 block"
                >
                  Workspace ID
                </label>
                <Input
                  id="workspace-id"
                  value={workspaceID}
                  onChange={(e) => setWorkspaceID(e.target.value)}
                  placeholder="Enter workspace ID"
                  onKeyDown={(e) => e.key === 'Enter' && handleJoinWorkspace()}
                />
              </div>
              <Button
                className="w-full"
                onClick={handleJoinWorkspace}
                disabled={isJoining || !workspaceID.trim()}
                size="lg"
              >
                {isJoining ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Joining...
                  </>
                ) : (
                  'Join Workspace'
                )}
              </Button>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Spinner className="h-8 w-8" />
            </div>
          ) : data?.length === 0 ? (
            <div className="text-center py-12 border border-dashed rounded-lg">
              <BriefcaseBusiness className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No workspaces found</p>
              <p className="text-sm text-muted-foreground mt-1">
                Create or join a workspace to get started
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {data?.map((ws) => (
                <Link key={ws.id} href={`/workspace/${ws.wsId}`}>
                  <div className="group flex items-center my-1 justify-between px-4 py-2 rounded-lg border bg-card hover:bg-accent transition-colors">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="p-2 rounded-md bg-primary/10">
                        <BriefcaseBusiness className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{ws.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Created{' '}
                          {new Date(ws.CreatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
