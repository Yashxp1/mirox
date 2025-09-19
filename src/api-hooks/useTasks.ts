import { projectApi, taskApi } from '@/lib/api';
import { Task } from '@/types/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllTask() {
  return useQuery<Task[]>({
    queryKey: ['task'],
    queryFn: taskApi.getAll,
    staleTime: 5 * 60,
  });
}

//------ReadOne------
export function useGetOneTask(id: number) {
  return useQuery<Task>({
    queryKey: ['tasks', id],
    queryFn: () => taskApi.getOne(id),
  });
}

//------Create------
export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: taskApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

//------Update------
export function useUpdateTask(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Task>) => taskApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  });
}

//------Delete------
export function useRemoveTask(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => projectApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}
