// src/api-hooks/useWorkspaces.ts
import { ApiResponse, Workspace } from '@/types/workspace';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchWorkspaces = async (): Promise<Workspace[]> => {
  const res = await axios.get<ApiResponse<Workspace[]>>(
    'http://localhost:3000/api/workspace'
  );

  return res.data.data;
};

export function useWorkspaces() {
  return useQuery<Workspace[]>({
    queryKey: ['workspaces'],
    queryFn: fetchWorkspaces,
    staleTime: 5 * 60
  });
}
