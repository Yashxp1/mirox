import { Workspace } from '@/types/workspace';
import axios from 'axios';

const baseURL = '/api/workspace';

export const workspaceApi = {
  getAll: async (): Promise<Workspace[]> => {
    const res = await axios.get<{ data: Workspace[] }>(`${baseURL}/`);
    return res.data.data;
  },

  getOne: async (workspaceId: string | number): Promise<Workspace> => {
    const res = await axios.get<{ data: Workspace }>(
      `${baseURL}/${workspaceId}`
    );
    return res.data.data;
  },

  create: async (data: { name: string }): Promise<Workspace> => {
    const res = await axios.post<Workspace>(`${baseURL}/`, data);
    return res.data;
  },

  update: async (
    workspaceId: string | number,
    payload: Partial<Workspace>
  ): Promise<Workspace> => {
    const res = await axios.put<{ data: Workspace }>(
      `${baseURL}/${workspaceId}`,
      payload
    );
    return res.data.data;
  },

  remove: async (workspaceId: string | number): Promise<void> => {
    await axios.delete(`${baseURL}/${workspaceId}/`);
  },
};
