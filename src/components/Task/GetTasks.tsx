import { useGetAllTasks } from '@/api-hooks/useTasks';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const GetTasks = () => {
  const params = useParams();

  const projectSlug = params.projectid as string;
  const workspaceSlug = params.id as string;

  // console.log('projectid: ', projectSlug);
  // console.log('workspaceid: ', workspaceSlug);

  const { data } = useGetAllTasks(workspaceSlug, projectSlug);
  console.log('data: ', data);

  return (
    <div>
      GetTasks
      {/* <p>{data.}</p> */}
      <ul>
        {data?.map((task) => (
          <Link
            key={task.id}
            href={`/dashboard/workspace/${workspaceSlug}/project/${projectSlug}/task/${task.id}`}
          >
            <li>{task.title}</li>
            <li>{task.createdAt}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GetTasks;
