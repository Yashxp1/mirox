import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Box, Plus, X } from 'lucide-react';
import Status from '../dropDown/Status';
import Target from '../dropDown/Target';
import Priority from '../dropDown/Priority';
import StartDate from '../dropDown/StartDate';
import { useCreateProject } from '@/api-hooks/useProjects';
import { useParams } from 'next/navigation';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Project } from '@/types/project';

const AddProject = () => {
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const workspaceId = params.id as string;

  const { mutate, isPending, error } = useCreateProject(workspaceId);

  const { register, handleSubmit, reset, control } = useForm<Project>({
    defaultValues: {
      name: '',
      summary: '',
      description: '',
      startdate: null,
      target: null,
      priority: 'NONE',
      status: 'PLANNED',
    },
  });

  const onSubmit: SubmitHandler<Project> = (data) => {
    mutate(
      {
        name: data.name,
        summary: data.summary,
        description: data.description,
        startdate: data.startdate,
        target: data.target,
        priority: data.priority,
        status: data.status,
      },
      {
        onSuccess: () => {
          // setIsOpen(false);
          reset();
        },
      }
    );
    console.log('res -> ', data);
  };

  return (
    <div className="">
      <Button
        variant="ghost"
        className="transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Plus size={16} />
        Add Project
      </Button>
      {isOpen && (
        <div className="fixed inset-0 text-zinc-200 flex items-center justify-center bg-black/70 z-50 transition-all">
          <div className="bg-[#1c1d1f]  w-[60%] h-[80%] rounded-lg border flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex justify-between ">
                <p className="flex gap-2 ">
                  <Box size={18} />
                  New Project
                </p>
                <X onClick={() => setIsOpen(false)} />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <div className="flex flex-col gap-3 pt-6">
                  <input
                    {...register('name', { required: true })}
                    className="text-3xl font-[500] focus:outline-none focus:ring-0"
                    type="text"
                    placeholder="Project"
                  />

                  <input
                    {...register('summary')}
                    className="text-lg pb-6 focus:outline-none focus:ring-0"
                    type="text"
                    placeholder="Add a short summary..."
                  />
                </div>
                <div className="flex pb-8 justify-start gap-2 flex-wrap">
                  <Controller
                    name="priority"
                    control={control}
                    render={({ field }) => (
                      <Priority value={field.value} onChange={field.onChange} />
                    )}
                  />
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Status value={field.value} onChange={field.onChange} />
                    )}
                  />

                  <Controller
                    name="startdate"
                    control={control}
                    render={({ field }) => (
                      <StartDate
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    name="target"
                    control={control}
                    render={({ field }) => (
                      <Target value={field.value} onChange={field.onChange} />
                    )}
                  />
                </div>
                <hr />
                <div className="pt-6 text-lg">
                  <textarea
                    {...register('description')}
                    placeholder="Write a description..."
                    className="focus:outline-none ring-0 w-full"
                  />
                </div>
                <div className="flex  px-6 py-4 gap-3 justify-end items-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? 'Creating...' : 'Create project'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProject;
