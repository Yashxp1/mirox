import { taskApi } from '@/lib/api/taskApi';
import { Task } from '@/types/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllTasks(
  workspaceId: string | number,
  projectId: string | number
) {
  return useQuery<Task[]>({
    queryKey: ['projects', workspaceId, projectId],
    queryFn: () => taskApi.getAll(workspaceId, projectId),
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOneTask(
  workspaceId: string | number,
  projectId: string | number,
  taskId: number
) {
  return useQuery<Task>({
    queryKey: ['projects', workspaceId, projectId, taskId],
    queryFn: () => taskApi.getOne(workspaceId, projectId, taskId),
    staleTime: 5 * 60 * 1000,
  });
}

//------Create------
export function useCreateTask(
  workspaceId: string | number,
  projectId: string | number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Task, 'id'>) =>
      taskApi.create(workspaceId, projectId, payload),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ['task'],
      });
    },
  });
}

//------Update------
export function useUpdateTask(
  workspaceId: string | number,
  projectId: string | number,
  taskId: number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Task>) =>
      taskApi.update(workspaceId, projectId, taskId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

//------Delete------
export function useRemoveTask(
  workspaceId: string | number,
  projectId: string | number,
  taskId: number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => taskApi.remove(workspaceId, projectId, taskId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}
