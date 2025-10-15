'use client';
import { useGetAllProject } from '@/api-hooks/useDocuments';
import {
  Box,
  CalendarArrowUp,
  CalendarDays,
  ChartNoAxesColumn,
  CircleDotDashed,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import Loader from '../Loader';

const GetProjects = () => {
  const params = useParams();
  const workspaceId = params.id as string;

  const { data, error, isLoading } = useGetAllProject(workspaceId);

  console.log('data: ', data);

  // if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading projects</p>;

  return (
    <div>
      {isLoading ? (
        <div className='justify-center flex items-center h-screen'>

        <Loader />
        </div>
      ) : (
        <>
          <div className="flex border-b text-xs">
            <div className="flex-1 p-4">Name</div>
            <div className="flex-1 p-4">Start</div>
            <div className="flex-1 p-4">Target</div>
            <div className="flex-1 p-4">Status</div>
            <div className="flex-1 p-4">Priority</div>
          </div>

          {data?.map((project) => (
            <Link
              href={`/dashboard/workspace/${workspaceId}/project/${project.id}`}
              key={project.id}
            >
              <div className="flex text-sm font-[500] border-b cursor-pointer hover:bg-zinc-900 transition-all">
                <div className="flex-1 flex gap-2 p-4">
                  {' '}
                  <Box size={15} />
                  {project.name || '-'}
                </div>
                <div className="flex-1 p-4 flex gap-2">
                  <CalendarArrowUp size={15} />
                  {project.startdate
                    ? new Date(project.startdate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </div>
                <div className="flex-1 p-4 flex gap-2 ">
                  <CalendarDays size={15} />
                  {project.target
                    ? new Date(project.target).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </div>
                <div className="flex-1 p-4 flex gap-2 ">
                  <ChartNoAxesColumn size={15} />
                  {project.status || '-'}
                </div>
                <div className="flex-1 p-4 flex gap-2 ">
                  <CircleDotDashed size={15} />
                  {project.priority || '-'}
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default GetProjects;
