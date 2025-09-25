import { Project } from '@/types/project';
import axios from 'axios';

const baseURL = '/api/workspace';

export const projectApi = {
  getAll: async (workspaceId: string | number): Promise<Project[]> => {
    const res = await axios.get<{ data: Project[] }>(
      `${baseURL}/${workspaceId}/project`
    );
    return res.data.data;
  },

  getOne: async (
    workspaceId: string | number,
    projectId: string | number
  ): Promise<Project> => {
    const res = await axios.get<{ data: Project }>(
      `${baseURL}/${workspaceId}/project/${projectId}`
    );
    return res.data.data;
  },

  create: async (
    workspaceId: string | number,
    payload: Omit<Project, 'id'>
  ): Promise<Project> => {
    const res = await axios.post<{ data: Project }>(
      `${baseURL}/${workspaceId}`,
      payload
    );
    return res.data.data;
  },

  update: async (
    workspaceId: string | number,
    projectId: string | number,
    payload: Partial<Project>
  ): Promise<Project> => {
    const res = await axios.put<{ data: Project }>(
      `${baseURL}/${workspaceId}/${projectId}`,
      payload
    );
    return res.data.data;
  },

  remove: async (
    workspaceId: string | number,
    projectId: string | number
  ): Promise<void> => {
    await axios.delete(`${baseURL}/${workspaceId}/${projectId}`);
  },
};
