'use client';
import {
  useCreateTaskComments,
  useGetTaskComments,
  useOneTasks,
  useUpdateTask,
} from '@/api-hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ArrowUpRight, ChevronDownIcon, User2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetWSMembers } from '@/api-hooks/useWorkspaces';
import { Textarea } from '@/components/ui/textarea';

type PriorityLevelType = 'LOW' | 'MEDIUM' | 'HIGH' | 'NONE';
type TaskStatusType = 'IN_PROGRESS' | 'DONE' | 'PLANNED';
type TaskAssigneeType = string | number;

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const taskId = params.taskId as string;

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskAssignee, setTaskAssignee] = useState<TaskAssigneeType>('');

  const [taskPriority, setTaskPriority] = useState<
    PriorityLevelType | undefined
  >('NONE');
  const [taskStatus, setTaskStatus] = useState<TaskStatusType | undefined>(
    'PLANNED'
  );

  const [taskStart, setTaskStart] = useState<Date | undefined>();
  const [taskTarget, setTaskTarget] = useState<Date | undefined>();

  const [startOpen, setStartOpen] = useState(false);
  const [targetOpen, setTargetOpen] = useState(false);

  const { data, isError, isLoading } = useOneTasks(id, taskId);

  const { mutate, isPending } = useUpdateTask(id, taskId);

  const { data: wsMembers, isPending: isFetching } = useGetWSMembers(id);
  // const { data: wsMembers, isPending: isFetching } = useGetOneWorkspaces(id);

  const { data: taskComments } = useGetTaskComments(id, taskId);

  const [isModified, setIsModified] = useState(false);

  const [taskCmt, setTaskCmt] = useState('');

  useEffect(() => {
    if (data?.title) setTaskName(data.title);
    if (data?.description) setTaskDescription(data.description);
    if (data?.priority) setTaskPriority(data?.priority);
    if (data?.status) setTaskStatus(data?.status);
    if (data?.startdate)
      setTaskStart(data?.startdate ? new Date(data.startdate) : undefined);
    if (data?.target)
      setTaskTarget(data.target ? new Date(data.target) : undefined);
    if (data?.assigneeId) setTaskAssignee(data.assigneeId);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const originalStart = data.startdate
      ? new Date(data.startdate).toISOString()
      : undefined;
    const originalTarget = data.target
      ? new Date(data.target).toISOString()
      : undefined;
    const currentStart = taskStart?.toISOString();
    const currentTarget = taskTarget?.toISOString();

    const changed =
      taskName !== (data.title || '') ||
      taskAssignee !== (data.assigneeId || '') ||
      taskDescription !== (data.description || '') ||
      taskPriority !== data.priority ||
      taskStatus !== data.status ||
      currentStart !== originalStart ||
      currentTarget !== originalTarget;

    setIsModified(changed);
  }, [
    taskName,
    taskAssignee,
    taskDescription,
    taskStart,
    taskPriority,
    taskStatus,
    taskTarget,
    data,
  ]);

  const handleUpdate = () => {
    if (!taskName.trim()) {
      toast.error('task name cannot be empty');
      return;
    }

    mutate(
      {
        title: taskName,
        description: taskDescription,
        priority: taskPriority,
        assigneeId: taskAssignee?.toString(),
        status: taskStatus,
        startdate: taskStart ? taskStart.toISOString() : undefined,
        target: taskTarget ? taskTarget.toISOString() : undefined,
      },
      {
        onSuccess: () => {
          toast.success('task updated successfully');
          setTaskName('');
        },
        onError: (err) => {
          console.log(err);
          toast.error('Failed to update the task');
        },
      }
    );
  };

  const { mutate: createCmt, isPending: isCreatingCmt } = useCreateTaskComments(
    id,
    taskId
  );

  const handleCreateTaskComment = () => {
    if (!taskCmt.trim()) {
      toast.error('comment cannot be blank');
    }

    createCmt(
      {
        commentbody: taskCmt,
      },
      {
        onSuccess: () => {
          toast.success('Added a comment');
          setTaskCmt('');
        },
        onError: (err) => {
          console.log(err);
          toast.error('Failed to  add a comment');
        },
      }
    );
  };

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
            <input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="flex font-semibold text-xl outline-0 w-full"
            />

            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="flex text-sm py-6 outline-0 w-full"
            />

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
                <div className="flex flex-col gap-3">
                  <Popover open={startOpen} onOpenChange={setStartOpen}>
                    <PopoverTrigger asChild>
                      <div
                        id="date"
                        className="flex justify-center items-center gap-1 border py-1 px-2 rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 border-green-500/50 transition-all cursor-default"
                      >
                        {taskStart &&
                          new Date(data?.startdate || '').toLocaleString(
                            'en-US',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            }
                          )}
                        <ChevronDownIcon size={18} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={taskStart}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          // setDate(date);
                          setTaskStart(date);
                          setStartOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Target
                </span>
                <div className="flex flex-col gap-3">
                  <Popover open={targetOpen} onOpenChange={setTargetOpen}>
                    <PopoverTrigger asChild>
                      <div
                        id="date"
                        className="flex justify-between font-normal gap-1 items-center border py-1 px-2 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 border-purple-500/50 transition-all cursor-default"
                      >
                        {taskTarget &&
                          new Date(data?.target || '').toLocaleString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        <ChevronDownIcon size={18} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={taskTarget}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setTaskTarget(date);
                          setTargetOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Priority
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    value={taskPriority}
                    // onChange={(e) => setTaskPriority(e.target.value)}
                    asChild
                  >
                    <p
                      className={`flex border py-1 px-2 rounded-md transition-all cursor-default ${
                        taskPriority === 'LOW'
                          ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-700 dark:text-pink-300 border-pink-500/50'
                          : taskPriority === 'MEDIUM'
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 border-yellow-500/50'
                          : taskPriority === 'HIGH'
                          ? 'bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300 border-red-500/50'
                          : 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 dark:text-gray-300 border-gray-500/50'
                      }`}
                    >
                      {taskPriority || data?.priority || 'Set Priority'}
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      {['LOW', 'MEDIUM', 'HIGH', 'NONE'].map((i, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          onSelect={() =>
                            setTaskPriority(i as PriorityLevelType)
                          }
                        >
                          {i}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Status
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger value={taskStatus} asChild>
                    <p
                      className={`flex border py-1 px-2 rounded-md transition-all cursor-default ${
                        taskStatus === 'DONE'
                          ? 'bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 border-green-500/50'
                          : taskStatus === 'IN_PROGRESS'
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 border-yellow-500/50'
                          : taskStatus === 'PLANNED'
                          ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border-blue-500/50'
                          : 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 dark:text-gray-300 border-gray-500/50'
                      }`}
                    >
                      {taskStatus || 'Set Status'}
                    </p>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      {['IN_PROGRESS', 'PLANNED', 'DONE'].map((i, idx) => (
                        <DropdownMenuItem
                          key={idx}
                          onSelect={() => setTaskStatus(i as TaskStatusType)}
                        >
                          {i}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Assigned to
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger value={taskStatus} asChild>
                    <div className="flex border py-1 px-2 rounded-md hover:bg-black/10 dark:hover:bg-white/30 border-black/20 dark:border-white/50 text-black dark:text-white transition-all cursor-default">
                      {isFetching ? (
                        <Spinner />
                      ) : (
                        <p>{data?.assignee?.name || '-'}</p>
                      )}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="start">
                    <DropdownMenuGroup>
                      {wsMembers?.map((m) => (
                        <DropdownMenuItem
                          key={m.id}
                          onSelect={() => setTaskAssignee(m.userId)}
                        >
                          <User2 /> {m.name || 'error'}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {isModified && (
              <div className="pt-4 transition-all duration-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUpdate}
                  className=""
                >
                  {isPending ? <Spinner /> : 'Save'}
                </Button>
              </div>
            )}
            <div className="border-b pt-4" />
            <div className="pt-3">
              <h1 className="font-[500] py-4">Comments</h1>
              <div className="flex items-start gap-2">
                <Textarea
                  value={taskCmt}
                  onChange={(e) => setTaskCmt(e.target.value)}
                />
                {isCreatingCmt ? (
                  <div
                    onClick={handleCreateTaskComment}
                    className="rounded-full text-white bg-green-800 p-2"
                  >
                    <Spinner />
                  </div>
                ) : (
                  <div
                    onClick={handleCreateTaskComment}
                    className="rounded-full text-white bg-green-800 p-2"
                  >
                    <ArrowUpRight size={16} />
                  </div>
                )}
              </div>
              <div className="my-4 text-sm rounded-md  space-y-2">
                {taskComments?.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start gap-2 p-2 rounded-md transition-colors 
                 hover:bg-purple-100 dark:hover:bg-purple-500/10"
                  >
                    <div>
                      <p
                        className="text-xs px-2 py-1 rounded-sm bg-purple-100 text-purple-700 
                     dark:bg-purple-900/50 dark:text-purple-300 transition-colors duration-200"
                      >
                        {c.authorName || '-'}
                      </p>
                    </div>
                    <div className="flex justify-between w-full items-center">
                      <p className="text-zinc-900 dark:text-zinc-200">
                        {c.body || 'error'}
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400">
                        {new Date(c.createdAt).toLocaleString('en-US', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
