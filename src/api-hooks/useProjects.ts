import { projectApi } from '@/lib/api';
import { Project } from '@/types/project';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAllProject() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: projectApi.getAll,
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOneProject(id: number) {
  return useQuery<Project>({
    queryKey: ['projects', id],
    queryFn: () => projectApi.getOne(id),
    staleTime: 5 * 60 * 1000,
  });
}

//------Create------
export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: projectApi.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}
//------Update------
export function useUpdateProject(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Project>) => projectApi.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

//------Delete------
export function useRemoveProject(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => projectApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}
