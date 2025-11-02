'use client';
import { useOneTasks, useUpdateTask } from '@/api-hooks/useTasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { ChevronDownIcon, SendHorizontal } from 'lucide-react';
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

type PriorityLevelType = 'LOW' | 'MEDIUM' | 'HIGH' | 'NONE';
type TaskStatusType = 'IN_PROGRESS' | 'DONE' | 'PLANNED';

const Page = () => {
  const params = useParams();
  const id = params.id as string;
  const taskId = params.taskId as string;

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

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

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (data?.title) setTaskName(data.title);
    if (data?.description) setTaskDescription(data.description);
    if (data?.priority) setTaskPriority(data?.priority);
    if (data?.status) setTaskStatus(data?.status);
    if (data?.startdate)
      setTaskStart(data?.startdate ? new Date(data.startdate) : undefined);
    if (data?.target)
      setTaskTarget(data.target ? new Date(data.target) : undefined);
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
      taskDescription !== (data.description || '') ||
      taskPriority !== data.priority ||
      taskStatus !== data.status ||
      currentStart !== originalStart ||
      currentTarget !== originalTarget;

    setIsModified(changed);
  }, [
    taskName,
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
              {/* <div className="flex flex-col">
                <span className="text-xs flex items-center gap-1 text-muted-foreground mb-1">
                  <User size={16} /> Author
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border-blue-500/50 transition-all cursor-default">
                  {data?.authorId}
                </p>
              </div> */}

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
                    <p className="flex border py-1 px-2 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300 border-red-500/50 transition-all cursor-default">
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
                    <p className="flex border py-1 px-2 rounded-md bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 border-yellow-500/50 transition-all cursor-default">
                      {taskStatus || data?.status || 'Set Status'}
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
            </div>
            {isModified && (
              <div className="pt-4 transition-all duration-200">
                <Button
                  onClick={handleUpdate}
                  className="transition-all duration-200"
                >
                  {isPending ? <Spinner /> : 'Save'}
                </Button>
              </div>
            )}
            <div className="border-b pt-4" />
            <div className="pt-3">
              <h1 className="font-[500] py-4">Comments</h1>
              <div className="flex gap-2">
                <Input />
                <Button>
                  <SendHorizontal />
                </Button>
                {/* <Textarea /> */}
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
