'use client';
import { useGetAllTasks } from '@/api-hooks/useTasks';
import {
  CalendarDays,
  CircleDotDashed,
  ClipboardList,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import Loader from '../Loader';

const GetTasks = () => {
  const params = useParams();

  const projectSlug = params.projectid as string;
  const workspaceSlug = params.id as string;

  const { data, isLoading, error } = useGetAllTasks(workspaceSlug, projectSlug);
  console.log('data: ', data);
  if (error) return <p>an error occured</p>;

  return (
    <div>
      {isLoading ? (
        <div className="justify-center flex items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex border-b text-xs">
            <div className="flex-1 p-4">Title</div>
            {/* <div className="flex-1 p-4">Start</div> */}
            <div className="flex-1 p-4">Target</div>
            <div className="flex-1 p-4">Assignee</div>
            {/* <div className="flex-1 p-4">Status</div> */}
            <div className="flex-1 p-4">Priority</div>
          </div>
          {data?.map((task) => (
            
            <Link
              href={`/dashboard/workspace/${workspaceSlug}/project/${projectSlug}/task/${task.id}`}
              key={task.id}
            >
              <div className="flex text-sm font-[500] border-b cursor-pointer hover:bg-zinc-900 transition-all">
                <div className="flex-1 flex gap-2 p-4">
                  {' '}
                  <ClipboardList size={15} />
                  {task.title
                    ? task.title.length > 30
                      ? task.title.slice(0, 30) + '...'
                      : task.title
                    : '-'}
                </div>

                <div className="flex-1 p-4 flex gap-2 ">
                  <CalendarDays size={15} />
                  {task.target
                    ? new Date(task.target).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </div>
                <div className="flex-1 p-4 flex gap-2 ">
                  <User size={15} />-
                </div>
                <div className="flex-1 p-4 flex gap-2 ">
                  <CircleDotDashed size={15} />
                  {task.priority || '-'}
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default GetTasks;
