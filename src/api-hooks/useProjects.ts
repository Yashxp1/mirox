import { projectApi } from '@/lib/api/projectApi';
import { Project } from '@/types/project';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllProject(workspaceId: string | number) {
  return useQuery<Project[]>({
    queryKey: ['projects', workspaceId],
    queryFn: () => projectApi.getAll(workspaceId),
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOneProject(
  workspaceId: number | string,
  projectId: string | number
) {
  return useQuery<Project>({
    queryKey: ['projects', workspaceId, projectId],
    queryFn: () => projectApi.getOne(workspaceId, projectId),
    staleTime: 5 * 60 * 1000,
  });
}

//------Create------
export function useCreateProject(workspaceId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Omit<Project, 'id'>) =>
      projectApi.create(workspaceId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}
//------Update------
export function useUpdateProject(
  workspaceId: number | string,
  projectId: string | number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Project>) =>
      projectApi.update(workspaceId, projectId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

//------Delete------
export function useRemoveProject(
  workspaceId: number | string,
  projectId: string | number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => projectApi.remove(workspaceId, projectId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}
