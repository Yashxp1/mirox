'use client';
import { useTaskByAssigneeId } from '@/api-hooks/useTasks';
import { Spinner } from '@/components/ui/spinner';
import { CircleCheck, CircleEllipsis, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  // const taskId = params.taskId as string;

  const { data, isLoading, isError } = useTaskByAssigneeId(id);

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
        No tasks found.
      </p>
    );

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-background text-foreground transition-colors duration-200">
      <div className="w-full max-w-5xl text-sm border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 border-b border-border px-5 py-3 font-medium text-muted-foreground bg-muted/40">
          <p>Task Name</p>
          <p>Assigned</p>
          <p>Status</p>
          <p>Priority</p>
        </div>

        {data.map((task) => (
          <Link key={task.id} href={`/workspace/${id}/${task.id}`}>
            <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr] gap-4 border-b border-border px-5 py-3 items-center hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <ClipboardList size={16} />
                <p className="truncate">{task.title}</p>
              </div>

              <div className="flex items-center">
                {task.assigneeId ? (
                  <CircleCheck size={18} className="text-green-500" />
                ) : (
                  <CircleEllipsis size={18} className="text-yellow-500" />
                )}
              </div>

              <p
                className={`font-semibold ${
                  task.status === 'DONE'
                    ? 'text-green-500'
                    : task.status === 'IN_PROGRESS'
                    ? 'text-yellow-500'
                    : 'text-zinc-600 dark:text-white'
                }`}
              >
                {task.status.toLocaleLowerCase()}
              </p>

              <p
                className={`font-semibold ${
                  task.priority === 'LOW'
                    ? 'text-pink-500'
                    : task.priority === 'MEDIUM'
                    ? 'text-yellow-500'
                    : task.priority === 'HIGH'
                    ? 'text-red-400'
                    : 'text-zinc-600 dark:text-white'
                }`}
              >
                {task.priority.toLocaleLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;