import { workspaceApi } from '@/lib/api';
import { Workspace } from '@/types/workspace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllWorkspaces() {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: workspaceApi.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOneWorkspaces(id: number) {
  return useQuery<Workspace>({
    queryKey: ['workspaces', id],
    queryFn: () => workspaceApi.getOne(id),
    staleTime: 5 * 60 * 1000,
  });
}

//------Create------
export function useCreateWorkspaces() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: workspaceApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workspaces'] }),
  });
}

//------Update------
export function useUpdateWorkspaces(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Workspace>) =>
      workspaceApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workspaces'] }),
  });
}

//------Delete------
export function useRemoveWorkspaces(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => workspaceApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['workspaces'] }),
  });
}
