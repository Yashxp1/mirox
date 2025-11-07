'use client';


import { BriefcaseBusiness, Plus } from 'lucide-react';
import Topbar from '@/components/dashboard/Topbar';
import { Spinner } from '@/components/ui/spinner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import TaskModal from './TaskModal';
import {
  useGetAllWorkspaces,
  useGetOneWorkspaces,
} from '@/api-hooks/useWorkspaces';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isLoading } = useGetAllWorkspaces();
  const params = useParams();
  const wsId = params.id as string;
  const { data: wsName, isLoading: isFetching } = useGetOneWorkspaces(wsId);

  const handleInvite = async () => {
    await navigator.clipboard.writeText(wsId);
    toast.success('Workspace id copied!');
  };

  return (
    <main className="flex min-h-screen relative transition-all duration-300 bg-background">
      <div className="sticky top-0 z-40 w-full">
        <Topbar />
        <div className="px-4 md:px-8 py-4">{children}</div>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed bottom-6 right-6 z-50 p-3" variant="outline">
            <BriefcaseBusiness />
            {isFetching ? <Spinner /> : <>{wsName?.name}</>}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          side="top"
          className="w-96 p-0 z-[9999] rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner />
            </div>
          ) : (
            <div className="bg-popover">
              <div className="flex justify-between items-center border-b border-border/50 px-5 py-2 bg-muted/30">
                <div>
                  <h2 className="text-base text-foreground">
                    Workspace actions
                  </h2>
                </div>
                <div>
                  <Button
                    onClick={handleInvite}
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                  >
                    <Plus size={14} />
                    Invite
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-2">
                    <BriefcaseBusiness size={14} className="text-primary" />
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Workspaces
                    </h3>
                  </div>

                  {data?.length ? (
                    <div className="space-y-1">
                      {data.map((ws) => (
                        <Link
                          key={ws.id}
                          href={`/workspace/${ws.wsId}`}
                          className="block"
                        >
                          <div
                            className="rounded-md dark:bg-zinc-800 bg-zinc-100 text-xs font-[500] text-foreground 
                                     hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer transition-all duration-200 
                                     py-2.5 px-3"
                          >
                            {ws.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground py-2 px-3">
                      No workspaces available
                    </p>
                  )}
                  <div className="">
                    <Link href="/dashboard" className="block pt-1 w-full">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-2 text-sm justify-center rounded-lg font-medium"
                      >
                        <Plus size={16} />
                        New Workspace
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="h-px bg-border/50 my-2"></div>

                <TaskModal />

                <div className="h-px bg-border/50 my-2"></div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </main>
  );
}
