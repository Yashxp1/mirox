import { taskApi } from '@/lib/api';
import { Task } from '@/types/task';
import { useQuery } from '@tanstack/react-query';

export function useGetAllTasks(wsId: string) {
  return useQuery<Task[]>({
    queryKey: ['tasks', wsId],
    queryFn: () => taskApi.getAll(wsId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useOneTasks(wsId: string, taskId:string) {
  return useQuery<Task>({
    queryKey: ['tasks', wsId, taskId],
    queryFn: () => taskApi.getOne(wsId, taskId),
    staleTime: 5 * 60 * 1000,
  });
}
