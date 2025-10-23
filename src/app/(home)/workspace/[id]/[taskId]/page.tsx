'use client';
import { useOneTasks } from '@/api-hooks/useTasks';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useParams } from 'next/navigation';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const taskId = params.taskId as string;

  const { data, isError, isLoading } = useOneTasks(id, taskId);

  if (isError) return <p>An error occured</p>;

  return (
    <div>
      <div className="flex justify-center flex-col items-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-[500px] w-full">
            <Spinner className="size-6" />
          </div>
        ) : (
          <div className=" w-full px-40 py-12">
            {/* <h1 className="flex font-semibold text-xl">{data?.title}</h1> */}
            <input
              className="flex font-semibold text-xl outline-0 w-full"
              value={data?.title ?? ''}
            />
            {/* <p className="flex text-sm py-6">{data?.description}</p> */}
            <textarea
              value={data?.description ?? ''}
              className="flex text-sm py-6 outline-0 w-full"
            />
            {/* <hr /> */}
            <div className="flex pt-6 text-xs gap-2">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Created
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border-blue-500/50 transition-all cursor-default">
                  {data?.createdAt
                    ? new Date(data?.createdAt).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Start Date
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 border-green-500/50 transition-all cursor-default">
                  {data?.startdate
                    ? new Date(data?.startdate).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Target
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 border-purple-500/50 transition-all cursor-default">
                  {data?.target
                    ? new Date(data?.target).toLocaleString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Priority
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300 border-red-500/50 transition-all cursor-default">
                  {data?.priority}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Status
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 border-yellow-500/50 transition-all cursor-default">
                  {data?.status}
                </p>
              </div>
            </div>
            <div className="border-b py-4" />
            <div className="pt-3">
              <h1 className="font-[500] py-4">Comments</h1>
              <div>
                <Textarea />
              </div>
              <div>{/* {data?.comments} */}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
