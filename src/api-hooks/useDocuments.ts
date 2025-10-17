import { docApi } from '@/lib/api/projectApi';
import { Document } from '@/types/document';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

//------ReadAll------
export function useGetAlldoc(workspaceId: string | number) {
  return useQuery<Document[]>({
    queryKey: ['docs', workspaceId],
    queryFn: () => docApi.getAll(workspaceId),
    staleTime: 5 * 60 * 1000,
  });
}

//------ReadOne------
export function useGetOnedoc(
  workspaceId: number | string,
  docId: string | number
) {
  return useQuery<Document>({
    queryKey: ['docs', workspaceId, docId],
    queryFn: () => docApi.getOne(workspaceId, docId),
    staleTime: 5 * 60 * 1000,
  });
}

//------Create------
export function useCreatedoc(workspaceId: string | number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Document>) =>
      docApi.create(workspaceId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['docs'] }),
  });
}
//------Update------
export function useUpdatedoc(
  workspaceId: number | string,
  docId: string | number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Document>) =>
      docApi.update(workspaceId, docId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['docs'] }),
  });
}

//------Delete------
export function useRemovedoc(
  workspaceId: number | string,
  docId: string | number
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => docApi.remove(workspaceId, docId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['docs'] }),
  });
}
