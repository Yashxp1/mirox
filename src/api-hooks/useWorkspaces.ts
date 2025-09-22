import { workspaceApi } from '@/lib/api/workspaceApi';
import { Workspace } from '@/types/workspace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllWorkspace() {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: workspaceApi.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOneWorkspace(workspaceId: string | number) {
  return useQuery<Workspace>({
    queryKey: ['workspaces', workspaceId],
    queryFn: () => workspaceApi.getOne(workspaceId),
    staleTime: 5 * 60 * 1000,
  });
}

//------Create------
export function useCreateWorkspace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: workspaceApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workspaces'] }),
  });
}

//------Update------
export function useUpdateWorkspace(workspaceId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Workspace>) =>
      workspaceApi.update(workspaceId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workspaces'] }),
  });
}

//------Delete------
export function useRemoveWorkspace(workspaceId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => workspaceApi.remove(workspaceId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workspaces'] }),
  });
}
