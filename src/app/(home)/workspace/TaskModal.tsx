'use client';
import { Button } from '@/components/ui/button';
import { PencilLine } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ChevronDownIcon } from 'lucide-react';

import { useState } from 'react';
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
import { useCreateTask } from '@/api-hooks/useTasks';
import { Spinner } from '@/components/ui/spinner';

type PriorityLevelType = 'LOW' | 'MEDIUM' | 'HIGH' | 'NONE';
type TaskStatusType = 'IN_PROGRESS' | 'DONE' | 'PLANNED';

const TaskModal = () => {
  const params = useParams();
  const id = params?.id as string;

  const { mutate, isPending, isError } = useCreateTask(id);

  const [taskTitle, settaskTitle] = useState('');

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

  const handleCreateTask = () => {
    if (!taskTitle.trim()) {
      toast.error('task name cannot be empty');
      return;
    }

    mutate(
      {
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        status: taskStatus,
        startdate: taskStart ? taskStart.toISOString() : undefined,
        target: taskTarget ? taskTarget.toISOString() : undefined,
      },
      {
        onSuccess: () => {
          toast.success('task create successfully');
          settaskTitle('');
        },
        onError: (err) => {
          console.log(err);
          toast.error('failed to create a task');
        },
      }
    );
  };

  if (isError) return <p>An error occured</p>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full flex items-center gap-2">
          <PencilLine size={18} />
          Create Task
        </Button>
      </DialogTrigger>

      <DialogContent className="dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Create a new task</DialogTitle>
          <DialogDescription>
            Fill out the task details below.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <input
            value={taskTitle}
            onChange={(e) => settaskTitle(e.target.value)}
            type="text"
            placeholder="Task title"
            className="w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-sm focus:outline-none"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task description"
            className="w-full px-3 py-2 rounded-md border border-zinc-700 bg-transparent text-sm focus:outline-none"
          />
          <div>
            <div className="flex pt-6 text-xs gap-2">
              {/* <div className="flex flex-col">
                <span className="text-xs text-muted-foreground mb-1">
                  Created
                </span>
                <p className="flex border py-1 px-2 rounded-md bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border-blue-500/50 transition-all cursor-default">
                  date created
                </p>
              </div> */}

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
                        {taskStart
                          ? new Date(taskStart).toLocaleString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Set start date'}
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
                        {taskTarget
                          ? new Date(taskTarget).toLocaleString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Set target'}
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
                      className={`flex border py-1 px-2 rounded-md ${
                        taskPriority === 'LOW'
                          ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-700 dark:text-pink-300 border-pink-500/50'
                          : taskPriority === 'MEDIUM'
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 border-yellow-500/50'
                          : taskPriority === 'HIGH'
                          ? 'bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300 border-red-500/50'
                          : 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 dark:text-gray-300 border-gray-500/50'
                      } transition-all cursor-default`}
                    >
                      {taskPriority || 'Set Priority'}
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
                      className={`flex border py-1 px-2 rounded-md ${
                        taskStatus === 'DONE'
                          ? 'bg-green-500/20 hover:bg-green-500/30 text-green-700 dark:text-green-300 border-green-500/50'
                          : taskStatus === 'IN_PROGRESS'
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 border-yellow-500/50'
                          : taskStatus === 'PLANNED'
                          ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 dark:text-blue-300 border-blue-500/50'
                          : 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-700 dark:text-gray-300 border-gray-500/50'
                      } transition-all cursor-default`}
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
            </div>
          </div>
          <Button onClick={handleCreateTask} className="w-full">
            {isPending ? <Spinner /> : 'Create Task'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
