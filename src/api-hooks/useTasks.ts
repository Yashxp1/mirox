import { taskApi } from '@/lib/api';
import { Task, TaskCmt } from '@/types/task';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetAllTasks(wsId: string) {
  return useQuery<Task[]>({
    queryKey: ['tasks', wsId],
    queryFn: () => taskApi.getAll(wsId),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTaskByAssigneeId(wsId: string) {
  return useQuery<Task[]>({
    queryKey: ['tasks', wsId],
    queryFn: () => taskApi.getByAssigneeId(wsId),
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

export function useAssignTask(wsId: string, taskId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Task>) =>
      taskApi.assignTask(taskId, payload, wsId),
    onSuccess: (updatedTask) => {
      qc.setQueryData(['tasks', wsId, taskId], updatedTask);
      qc.invalidateQueries({ queryKey: ['tasks', wsId, taskId] });
    },
  });
}

export function useGetTaskComments(wsId: string, taskId: string) {
  return useQuery({
    queryKey: ['taskCmt', wsId, taskId],
    queryFn: () => taskApi.getAllComments(wsId, taskId),
    staleTime: 5 * 60 * 1000,
  });
}
export function useCreateTaskComments(wsId: string, taskId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<TaskCmt>) =>
      taskApi.createComment(payload, wsId, taskId),
    onSuccess: (cmt) => {
      qc.invalidateQueries({ queryKey: ['taskCmt'] });
      qc.invalidateQueries({ queryKey: ['taskCmt', wsId, taskId] });
      qc.setQueryData(['taskCmt', taskId, wsId], cmt);
    },
  });
}

// export function useUpdateTaskComments(wsId: string, taskId: string) {
//   return useQuery({
//     queryKey: ['task comments', wsId, taskId],
//     queryFn: () => taskApi.getAllComments(wsId, taskId),
//     staleTime: 5 * 60 * 1000,
//   });
// }

// export function useDeleteTaskComments(wsId: string, taskId: string) {
//   return useQuery({
//     queryKey: ['task comments', wsId, taskId],
//     queryFn: () => taskApi.getAllComments(wsId, taskId),
//     staleTime: 5 * 60 * 1000,
//   });
// }
