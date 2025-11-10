import { workspaceApi } from '@/lib/api';
import {
  AllWorkspaceMembers,
  Workspace,
  WorkspaceMember,
} from '@/types/workspace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllWorkspaces() {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: () => workspaceApi.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOneWorkspaces(id: string) {
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

//---------leaveWs--------
export function useLeaveWS(wsId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (mId: string) => workspaceApi.leaveWS(wsId, mId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workspace', wsId] });
    },
  });
}

export function useUpdateMemberRole(wsId: string, mId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<WorkspaceMember>) =>
      workspaceApi.updateWSMemberRole(wsId, payload, mId),
    onSuccess: (updatedTask) => {
      qc.setQueryData(['tasks', wsId, mId], updatedTask);
      qc.invalidateQueries({ queryKey: ['tasks', wsId, mId] });
    },
  });
}

//------Join------
export function useJoinWorkspace() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (wsId: string) => {
      if (!wsId) throw new Error('Workspace ID is required');
      return await workspaceApi.join(wsId);
    },
    onSuccess: (data, wsId) => {
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', wsId] });
      queryClient.setQueryData(['workspace', wsId], data);
    },
  });
}
//------WsMembers------
export function useGetWSMembers(wsId?: string) {
  return useQuery<AllWorkspaceMembers[]>({
    queryKey: ['workspace-members', wsId],
    queryFn: () => workspaceApi.getWorkspaceMembers(wsId!),
    enabled: !!wsId,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetOneWSMember(wsId: string, mId: string) {
  return useQuery<WorkspaceMember>({
    queryKey: ['workspace-members', wsId, mId],
    queryFn: () => workspaceApi.getOneWSMember(wsId, mId),
    staleTime: 5 * 60 * 1000,
  });
}
