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
          {data && data.length > 0 ? (
            data.map((task) => (
              <Link key={task.id} href={`/workspace/${id}/${task.id}`}>
                <div className="border-b hover:bg-zinc-900 transition-colors grid grid-cols-[1fr_100px_120px_100px] gap-4 px-4 py-2.5 items-center pr-10 cursor-default w-full">
                  <div className="flex gap-2 items-center">
                    <ClipboardList size={16} />
                    <p>{task.title}</p>
                  </div>
                  <p className="text-right">{task.id}</p>
                  <p className="text-right">{task.status}</p>
                  <p className="text-right">{task.priority}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center py-3">No task found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
