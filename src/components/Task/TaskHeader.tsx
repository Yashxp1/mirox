'use client';
import { useGetOneProject } from '@/api-hooks/useProjects';
import { useGetOneWorkspace } from '@/api-hooks/useWorkspaces';
import {
  Box,
  BriefcaseBusiness,
  ClipboardList,
  Link,
  Plus,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';

const TaskHeader = () => {
  const params = useParams();
  const workspaceId = params.id as string;
  const projectId = params.projectid as string;
  const {
    data: wsData,
    error: wsError,
    isLoading: wsLoading,
  } = useGetOneWorkspace(workspaceId);
  const { data, error, isLoading } = useGetOneProject(workspaceId, projectId);
  console.log('pid: ', projectId);
  return (
    <div className="flex justify-between items-center text-sm cursor-default p-4 py-3  border-b">
      <div className="flex gap-2">
        <h2 className="bg-zinc-800 px-2 py-1 rounded-md flex justify-center items-center gap-2">
          {wsLoading ? (
            'Loading...'
          ) : (
            <>
              {wsError && 'workspace id not found'}
              <BriefcaseBusiness size={15} /> {wsData?.name}
            </>
          )}
        </h2>
        <h2 className="bg-zinc-800 px-2 py-1 rounded-md flex justify-center items-center gap-2">
          {isLoading ? (
            'Loading...'
          ) : (
            <>
              {error && 'project id not found'}
              <Box size={15} /> {data?.name}
            </>
          )}
        </h2>

        <h2 className="bg-zinc-800 px-2 py-1 rounded-md flex justify-center items-center gap-2">
          <ClipboardList size={15} /> Tasks
        </h2>
      </div>
      <div className="flex justify-center items-center gap-8">
        <Link size={16} />
        <div className="flex justify-center items-center gap-2  hover:bg-zinc-800 rounded-md px-2 py-1">
          <Plus size={16} />
          <p className="">Add Project</p>
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
