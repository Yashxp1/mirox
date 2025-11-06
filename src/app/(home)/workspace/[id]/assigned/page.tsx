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

  if (isError) return <p>Error loading tasks</p>;

  console.log('ass data: => ', data);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Spinner className="size-7" />
        </div>
      ) : (
        <div className="text-sm">
          <div className="grid grid-cols-4 gap-4 border-b border-border px-4 py-2.5 font-medium text-muted-foreground bg-muted/30">
            <p>Task Name</p>
            <p>Assigned</p>
            {/* <p>Task Id</p> */}
            <p>Status</p>
            <p>Priority</p>
          </div>

          <div>
            {data && data.length > 0 ? (
              data.map((task) => (
                <Link key={task.id} href={`/workspace/${id}/${task.id}`}>
                  <div className="grid grid-cols-4 gap-4 border-b border-border hover:bg-accent hover:text-accent-foreground transition-colors px-4 py-2.5 cursor-pointer items-center">
                    <div className="flex gap-2 items-center">
                      <ClipboardList size={16} />
                      <p>{task.title}</p>
                    </div>
                    <p className="">
                      {task.assigneeId ? (
                        <CircleCheck size={18} className="text-green-500" />
                      ) : (
                        <CircleEllipsis size={18} className="text-yellow-500" />
                      )}
                    </p>
                    <p
                      className={`hidden md:flex font-semibold ${
                        task.status === 'DONE'
                          ? 'text-green-500'
                          : task.status === 'IN_PROGRESS'
                          ? 'text-yellow-500'
                          : 'dark:text-white text-black-200'
                      }`}
                    >
                      {task.status.toLocaleLowerCase()}
                    </p>
                    {/* <p className="hidden md:flex">
                      {task.priority.toLowerCase()}
                    </p> */}
                    <p
                      className={`hidden md:flex font-semibold ${
                        task.priority === 'LOW'
                          ? 'text-pink-500'
                          : task.priority === 'MEDIUM'
                          ? 'text-yellow-500'
                          : task.priority === 'HIGH'
                          ? 'text-red-500'
                          : 'dark:text-white text-black-200'
                      }`}
                    >
                      {task.priority.toLocaleLowerCase()}
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

export default Page;
