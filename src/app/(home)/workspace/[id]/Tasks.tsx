'use client';

import { useGetAllTasks } from '@/api-hooks/useTasks';
import { Spinner } from '@/components/ui/spinner';
import { ClipboardList } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const Tasks = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isLoading, isError } = useGetAllTasks(id);

  if (isError) return <p>Error loading tasks</p>;

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Spinner className="size-7" />
        </div>
      ) : (
        <div className="text-sm">
          <div className="grid grid-cols-[1fr_100px_120px_100px] gap-4 border-b border-border px-4 py-2.5 font-medium text-muted-foreground bg-muted/30">
            <p>Task Name</p>
            <p>Task Id</p>
            <p>Status</p>
            <p>Priority</p>
          </div>

          <div>
            {data && data.length > 0 ? (
              data.map((task) => (
                <Link key={task.id} href={`/workspace/${id}/${task.id}`}>
                  <div className="grid grid-cols-[1fr_100px_120px_100px] gap-4 border-b border-border hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2.5 cursor-pointer items-center">
                    <div className="flex gap-2 items-center">
                      <ClipboardList size={16} />
                      <p>{task.title}</p>
                    </div>
                    <p className="hidden md:flex">{task.id}</p>
                    <p>{task.status.toLowerCase()}</p>
                    <p className="hidden md:flex">
                      {task.priority.toLowerCase()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center py-3 text-muted-foreground">
                No task found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tasks;
