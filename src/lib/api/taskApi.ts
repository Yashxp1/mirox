import axios from 'axios';
import { Task } from '@/types/task';

const baseURL = '/api/workspace/';

export const taskApi = {
  getAll: async (
    workspaceId: string | number,
    projectId: string | number
  ): Promise<Task[]> => {
    const res = await axios.get<{ data: Task[] }>(
      `${baseURL}${workspaceId}/project/${projectId}/task`
    );
    return res.data.data;
  },

  getOne: async (
    workspaceId: string | number,
    projectId: string | number,
    taskId: number
  ): Promise<Task> => {
    const res = await axios.get<{ data: Task }>(
      `${baseURL}${workspaceId}/project/${projectId}/task/${taskId}`
    );
    return res.data.data;
  },

  create: async (
    workspaceId: string | number,
    projectId: string | number,
    payload: Omit<Task, 'id'>
  ): Promise<Task> => {
    const res = await axios.post<{ data: Task }>(
      `${baseURL}${workspaceId}/project/${projectId}/task`,
      payload
    );
    return res.data.data;
  },

  update: async (
    workspaceId: string | number,
    projectId: string | number,
    taskId: number,
    payload: Partial<Task>
  ): Promise<Task> => {
    const res = await axios.put<{ data: Task }>(
      `${baseURL}${workspaceId}/project/${projectId}/task/${taskId}`,
      payload
    );
    return res.data.data;
  },

  remove: async (
    workspaceId: string | number,
    projectId: string | number,
    taskId: number
  ): Promise<void> => {
    await axios.delete(
      `${baseURL}${workspaceId}/project/${projectId}/task/${taskId}`
    );
  },
};
