'use client';

import { useGetAllTasks } from '@/api-hooks/useTasks';
import { Spinner } from '@/components/ui/spinner';
import { CircleCheck, CircleEllipsis, ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const Tasks = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useGetAllTasks(id);

  if (isError) return <p className="text-center py-5 text-red-500">Error loading tasks</p>;

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Spinner className="size-7" />
        </div>
      ) : (
        <div className="text-sm">
          {/* Header row (changes per screen size) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 border-b border-border px-4 py-2.5 font-medium text-muted-foreground bg-muted/30">
            <p>Task Name</p>
            <p className="hidden sm:block">Assigned</p>
            <p className="hidden lg:block">Status</p>
            <p className="hidden sm:block">Priority</p>
          </div>

          {/* Task list */}
          <div>
            {data && data.length > 0 ? (
              data.map((task) => (
                <Link key={task.id} href={`/workspace/${id}/${task.id}`}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 border-b border-border hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2.5 cursor-pointer items-center">
                    {/* Task name (always visible) */}
                    <div className="flex gap-2 items-center">
                      <ClipboardList size={16} />
                      <p className="truncate">{task.title}</p>
                    </div>

                    {/* Assigned (tablet & up) */}
                    <div className="hidden sm:flex items-center">
                      {task.assigneeId ? (
                        <CircleCheck size={18} className="text-green-500" />
                      ) : (
                        <CircleEllipsis size={18} className="text-yellow-500" />
                      )}
                    </div>

                    {/* Status (desktop only) */}
                    <p
                      className={`hidden lg:flex font-semibold ${
                        task.status === 'DONE'
                          ? 'text-green-500'
                          : task.status === 'IN_PROGRESS'
                          ? 'text-yellow-500'
                          : 'text-black dark:text-white'
                      }`}
                    >
                      {task.status.toLocaleLowerCase()}
                    </p>

                    {/* Priority (tablet & up) */}
                    <p
                      className={`hidden sm:flex font-semibold ${
                        task.priority === 'LOW'
                          ? 'text-pink-500'
                          : task.priority === 'MEDIUM'
                          ? 'text-yellow-500'
                          : task.priority === 'HIGH'
                          ? 'text-red-400'
                          : 'text-black dark:text-white'
                      }`}
                    >
                      {task.priority.toLocaleLowerCase()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center py-3 text-muted-foreground">No task found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
