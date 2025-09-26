import { useGetOneProject } from '@/api-hooks/useProjects';
import {
  Box,
  BriefcaseBusiness,
  CalendarArrowUp,
  ChartNoAxesColumn,
  CircleDotDashed,
  Crosshair,
  Plus,
} from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import Loader from '../Loader';
import Progress from './Progress';

const ProjectById = () => {
  const params = useParams();
  const workspaceId = params.id as string;
  const projectId = params.projectid as string;
  const { data, error, isLoading } = useGetOneProject(workspaceId, projectId);

  if (error) return <p className='text-3xl flex justify-center items-center'>A error occured</p>;
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-between items-center w-full h-screen">
          <Loader />
        </div>
      ) : (
        <div className=" text-zinc-200 flex justify-center items-center">
          <div className="lg:w-[70%] p-10 ">
            <div className="flex flex-col gap-3">
              <div className="bg-zinc-800 w-min p-1 rounded-md">
                <Box />
              </div>
              <h1 className="text-3xl font-semibold">{data?.name}</h1>
            </div>
            <div className="py-2.5 font-[500]">
              {data?.summary ? (
                data.summary
              ) : (
                <input
                  className="focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Add a short summary..."
                />
              )}
            </div>
            <div className="flex justify-center items-center py-5 text-sm">
              <p className="">Properties</p>
              <ul className="flex justify-evenly w-full">
                <li className="flex gap-2 hover:bg-zinc-800 px-2 py-1.5 rounded-md justify-center items-center">
                  <Box size={18} />
                  {data?.id}
                </li>
                <li className="flex gap-2 hover:bg-zinc-800 px-2 py-1.5 rounded-md justify-center items-center">
                  {' '}
                  <CircleDotDashed size={18} />
                  {data?.priority}
                </li>
                <li className="flex gap-2 hover:bg-zinc-800 px-2 py-1.5 rounded-md justify-center items-center">
                  <CalendarArrowUp size={18} />
                  {data?.startdate
                    ? new Date(data?.startdate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </li>
                <li className="flex gap-2 hover:bg-zinc-800 px-2 py-1.5 rounded-md justify-center items-center">
                  <Crosshair size={18} />

                  {data?.target
                    ? new Date(data?.target).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })
                    : '-'}
                </li>
                <li className="flex gap-2 hover:bg-zinc-800 px-2 py-1.5 rounded-md justify-center items-center">
                  <ChartNoAxesColumn size={18} />
                  {data?.status}
                </li>
                <li className="flex gap-2 hover:bg-zinc-800 px-2 py-1.5 rounded-md justify-center items-center">
                  {' '}
                  <BriefcaseBusiness size={18} />
                  {data?.workspaceId}
                </li>
              </ul>
            </div>
            <div className="flex  gap-6 items-center pb-6  text-sm">
              <p>Resources</p>

              <p className="flex text-zinc-400 justify-center items-center gap-1">
                <Plus size={18} />
                Add document or link...
              </p>
            </div>
            <div>
              <Progress />
            </div>

            <div className="font-[500] flex flex-col gap-6 py-14">
              <h2 className="text-zinc-400">Description</h2>
              {data?.description ? (
                data.description
              ) : (
                <input
                  className="focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Add a short summary..."
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectById;
