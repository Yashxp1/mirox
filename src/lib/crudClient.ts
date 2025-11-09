import { TaskCmt } from '@/types/task';
import { AllWorkspaceMembers, WorkspaceMember } from '@/types/workspace';
import axios from 'axios';

export function createCrudClient<T extends { id: number | string }>(
  baseUrl: string
) {
  return {
    getAll: async (wsId?: string): Promise<T[]> => {
      const url = wsId ? `${baseUrl}/${wsId}/task` : baseUrl;
      const res = await axios.get<{ data: T[] }>(url);
      return res.data.data;
    },

    getByAssigneeId: async (wsId?: string): Promise<T[]> => {
      const url = `${baseUrl}/${wsId}/task/assignee`;
      const res = await axios.get<{ data: T[] }>(url);
      return res.data.data;
    },

    getOne: async (wsId?: string, taskId?: string): Promise<T> => {
      let url;
      if (wsId && taskId) url = `${baseUrl}/${wsId}/task/${taskId}`;
      else if (wsId) url = `${baseUrl}/${wsId}`;
      else throw new Error('Missing workspace ID');

      const res = await axios.get<{ data: T }>(url);
      return res.data.data;
    },

    create: async (payload: Partial<T>, wsId?: string): Promise<T> => {
      const url = wsId ? `${baseUrl}/${wsId}/task` : baseUrl;
      const res = await axios.post<{ data: T }>(url, payload);
      return res.data.data;
    },

    update: async (
      id: number | string,
      payload: Partial<T>,
      wsId?: string
    ): Promise<T> => {
      const url = wsId ? `${baseUrl}/${wsId}/task/${id}` : `${baseUrl}/${id}`;
      const res = await axios.put<{ data: T }>(url, payload);
      return res.data.data;
    },

    remove: async (id: number | string, wsId?: string): Promise<void> => {
      const url = wsId ? `${baseUrl}/${wsId}/task/${id}` : `${baseUrl}/${id}`;
      await axios.delete(url);
    },

    leaveWS: async (wsId: string, mId: string): Promise<void> => {
      const url = `${baseUrl}/${wsId}/join/${mId}`;
      await axios.delete(url);
    },

    updateWSMemberRole: async (
      wsId: string,
      payload: Partial<T>,
      mId: string
    ): Promise<T> => {
      const url = `${baseUrl}/${wsId}/join/${mId}`;
      const res = await axios.put<{ data: T }>(url, payload);
      return res.data.data;
    },

    join: async (wsId?: string): Promise<T> => {
      const url = `${baseUrl}/${wsId}/join`;
      const res = await axios.post<{ data: T }>(url);
      return res.data.data;
    },

    getWorkspaceMembers: async (wsId: string): Promise<AllWorkspaceMembers[]> => {
      const url = `${baseUrl}/${wsId}/join`;
      const res = await axios.get<{ data: AllWorkspaceMembers[] }>(url);
      return res.data.data;
    },

    getOneWSMember: async (
      wsId: string,
      mId: string
    ): Promise<WorkspaceMember> => {
      const url = `${baseUrl}/${wsId}/join/${mId}`;
      const res = await axios.get<{ data: WorkspaceMember}>(url);
      return res.data.data;
    },

    assignTask: async (
      id: number | string,
      payload: Partial<T>,
      wsId?: string
    ): Promise<T> => {
      const url = `${baseUrl}/${wsId}/task/${id}/assign`;
      const res = await axios.get<{ data: T }>(url);
      return res.data.data;
    },

    getAllComments: async (wsId: string, taskId: string): Promise<T[]> => {
      const url = `${baseUrl}/${wsId}/task/${taskId}/comments`;
      const res = await axios.get<{ data: T[] }>(url);
      return res.data.data;
    },

    createComment: async (
      payload: Partial<TaskCmt>,
      wsId: string,
      taskId: string
    ): Promise<TaskCmt> => {
      const url = `${baseUrl}/${wsId}/task/${taskId}/comments`;
      const res = await axios.post<{ data: TaskCmt }>(url, payload);
      return res.data.data;
    },

    updateTaskComments: async (wsId: string, taskId: string): Promise<T[]> => {
      const url = `${baseUrl}/${wsId}/task/${taskId}/comments`;
      const res = await axios.get<{ data: T[] }>(url);
      return res.data.data;
    },
  };
}
