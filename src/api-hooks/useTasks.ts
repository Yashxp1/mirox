import { taskApi } from '@/lib/api';
import { Task } from '@/types/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetAllTasks(wsId: string) {
  return useQuery<Task[]>({
    queryKey: ['tasks', wsId],
    queryFn: () => taskApi.getAll(wsId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOneTasks(wsId: string, taskId: string) {
  return useQuery<Task>({
    queryKey: ['tasks', wsId, taskId],
    queryFn: () => taskApi.getOne(wsId, taskId),
    staleTime: 5 * 60 * 1000,
  });
}

// export function useCreateTask(wsId: string) {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: Partial<Task>) => taskApi.create(payload, wsId),
//     onSuccess: () => qc.invalidateQueries({ queryKey: ['workspace'] }),
//   });
// }

export function useCreateTask(wsId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Task>) => taskApi.create(payload, wsId),
    onSuccess: (updatedTask) => {
      qc.setQueryData(['tasks', wsId], updatedTask);
      qc.invalidateQueries({ queryKey: ['tasks', wsId] });
    },
  });
}

export function useUpdateTask(wsId: string, taskId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Task>) =>
      taskApi.update(taskId, payload, wsId),
    onSuccess: (updatedTask) => {
      qc.setQueryData(['tasks', wsId, taskId], updatedTask);
      qc.invalidateQueries({ queryKey: ['tasks', wsId, taskId] });
    },
  });
}
