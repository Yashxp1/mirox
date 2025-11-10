'use client';
import {
  useCreateTaskComments,
  useDeleteTask,
  useGetTaskComments,
  useOneTasks,
  useUpdateTask,
} from '@/api-hooks/useTasks';
import { Spinner } from '@/components/ui/spinner';
import { ArrowUpRight, ChevronDownIcon, Trash2, User2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(id);
  const { mutate, isPending } = useUpdateTask(id, taskId);
  const { data: wsMembers, isPending: isFetching } = useGetWSMembers(id);
  const router = useRouter();
  const [isModified, setIsModified] = useState(false);
  const [taskCmt, setTaskCmt] = useState('');
  const { data: taskComments } = useGetTaskComments(id, taskId);
  const { mutate: createCmt, isPending: isCreatingCmt } = useCreateTaskComments(
    id,
    taskId
  );

  useEffect(() => {
    if (data?.title) setTaskName(data.title);
    if (data?.description) setTaskDescription(data.description);
    if (data?.priority) setTaskPriority(data?.priority);
    if (data?.status) setTaskStatus(data?.status);
    if (data?.startdate) setTaskStart(new Date(data.startdate));
    if (data?.target) setTaskTarget(new Date(data.target));
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
        onError: () => toast.error('Failed to update the task'),
      }
    );
  };

  const handleDelete = () => {
    deleteTask(taskId, {
      onSuccess: () => {
        router.push(`/workspace/${id}`);
        toast.success('Task deleted');
      },
      onError: () => toast.error('Failed to delete task'),
    });
  };

  const handleCreateTaskComment = () => {
    if (!taskCmt.trim()) {
      toast.error('comment cannot be blank');
      return;
    }
    createCmt(
      { commentbody: taskCmt },
      {
        onSuccess: () => {
          toast.success('Added a comment');
          setTaskCmt('');
        },
        onError: () => toast.error('Failed to add a comment'),
      }
    );
  };

  if (isError) return <p>An error occurred</p>;

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-6 w-full">
      {isLoading ? (
        <div className="flex justify-center items-center h-[400px]">
          <Spinner className="size-6" />
        </div>
      ) : (
        <div className="flex flex-col w-full max-w-5xl mx-auto">
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="font-semibold text-lg sm:text-xl outline-none w-full mb-4"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="text-sm py-4 outline-none w-full mb-4"
          />

          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs pt-4">
            <div className="flex flex-col">
              <span className="text-muted-foreground mb-1">Created</span>
              <p className="border py-1 px-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border-blue-500/50 transition-all cursor-default">
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
              <span className="text-muted-foreground mb-1">Start Date</span>
              <Popover open={startOpen} onOpenChange={setStartOpen}>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-1 border py-1 px-2 rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 border-green-500/50 transition-all cursor-default">
                    {taskStart
                      ? new Date(taskStart).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Select date'}
                    <ChevronDownIcon size={16} />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={taskStart}
                    onSelect={(date) => {
                      setTaskStart(date);
                      setStartOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground mb-1">Target</span>
              <Popover open={targetOpen} onOpenChange={setTargetOpen}>
                <PopoverTrigger asChild>
                  <div className="flex items-center gap-1 border py-1 px-2 rounded-md bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 dark:text-purple-300 border-purple-500/50 transition-all cursor-default">
                    {taskTarget
                      ? new Date(taskTarget).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'Select date'}
                    <ChevronDownIcon size={16} />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={taskTarget}
                    onSelect={(date) => {
                      setTaskTarget(date);
                      setTargetOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground mb-1">Priority</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p
                    className={`flex border py-1 px-2 rounded-md cursor-default ${
                      taskPriority === 'LOW'
                        ? 'bg-pink-500/20 text-pink-700 dark:text-pink-300 border-pink-500/50'
                        : taskPriority === 'MEDIUM'
                        ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/50'
                        : taskPriority === 'HIGH'
                        ? 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/50'
                        : 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/50'
                    }`}
                  >
                    {taskPriority || 'Set Priority'}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {['LOW', 'MEDIUM', 'HIGH', 'NONE'].map((i) => (
                      <DropdownMenuItem
                        key={i}
                        onSelect={() => setTaskPriority(i as PriorityLevelType)}
                      >
                        {i}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground mb-1">Status</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <p
                    className={`flex border py-1 px-2 rounded-md cursor-default ${
                      taskStatus === 'DONE'
                        ? 'bg-green-500/20 text-green-700 dark:text-green-300 border-green-500/50'
                        : taskStatus === 'IN_PROGRESS'
                        ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/50'
                        : 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/50'
                    }`}
                  >
                    {taskStatus}
                  </p>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {['IN_PROGRESS', 'PLANNED', 'DONE'].map((i) => (
                      <DropdownMenuItem
                        key={i}
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
              <span className="text-muted-foreground mb-1">Assigned to</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex border py-1 px-2 rounded-md hover:bg-black/10 dark:hover:bg-white/20 border-black/20 dark:border-white/50">
                    {isFetching ? (
                      <Spinner />
                    ) : (
                      <p>{data?.assignee?.name || '-'}</p>
                    )}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {wsMembers?.map((m) => (
                      <DropdownMenuItem
                        key={m.id}
                        onSelect={() => setTaskAssignee(m.userId)}
                      >
                        <User2 size={14} /> {m.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-col">
              <span className="text-muted-foreground mb-1">Delete</span>
              <Dialog>
                <DialogTrigger asChild>
                  <span className="bg-red-700/30 text-red-500 py-1 rounded-md flex justify-center items-center cursor-pointer">
                    <Trash2 size={16} />
                  </span>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this task?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={handleDelete}
                      className="bg-red-600/20 text-red-500 hover:bg-red-600/10"
                    >
                      {isDeleting ? <Spinner /> : 'Delete'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {isModified && (
            <div className="pt-4">
              <Button variant="outline" size="sm" onClick={handleUpdate}>
                {isPending ? <Spinner /> : 'Save'}
              </Button>
            </div>
          )}

          <div className="border-b pt-6" />
          <div className="pt-3">
            <h1 className="font-medium py-4">Comments</h1>
            <div className="flex items-start gap-2 flex-col sm:flex-row">
              <Textarea
                value={taskCmt}
                onChange={(e) => setTaskCmt(e.target.value)}
              />
              <div
                onClick={handleCreateTaskComment}
                className="rounded-full text-white bg-green-800 p-2 cursor-pointer"
              >
                {isCreatingCmt ? <Spinner /> : <ArrowUpRight size={16} />}
              </div>
            </div>

            <div className="my-4 text-sm rounded-md space-y-2">
              {taskComments?.map((c) => (
                <div
                  key={c.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 rounded-md hover:bg-purple-100 dark:hover:bg-purple-500/10"
                >
                  <p className="text-xs px-2 py-1 rounded-sm bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300">
                    {c.authorName || '-'}
                  </p>
                  <div className="flex justify-between w-full items-center">
                    <p className="text-zinc-900 dark:text-zinc-200">{c.body}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      {new Date(c.createdAt).toLocaleDateString('en-US', {
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
  );
};

export default Page;
