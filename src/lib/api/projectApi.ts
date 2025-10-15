import { Document } from '@/types/document';
import axios from 'axios';

const baseURL = '/api/workspace';

export const docApi = {
  getAll: async (workspaceId: string | number): Promise<Document[]> => {
  const res = await axios.get<{ data: { documents: Document[] }[] }>(`${baseURL}/${workspaceId}`);

  const workspaceArray = res.data.data;
  if (!workspaceArray || workspaceArray.length === 0) return [];

  return workspaceArray[0].documents || [];
},


  getOne: async (
    workspaceId: string | number,
    docId: string | number
  ): Promise<Document> => {
    const res = await axios.get<{ data: Document }>(
      `${baseURL}/${workspaceId}/${docId}`
    );
    return res.data.data;
  },

  create: async (
    workspaceId: string | number,
    payload: Omit<Document, 'id'>
  ): Promise<Document> => {
    const res = await axios.post<{ data: Document }>(
      `${baseURL}/${workspaceId}`,
      payload
    );
    return res.data.data;
  },

  update: async (
    workspaceId: string | number,
    docId: string | number,
    payload: Partial<Document>
  ): Promise<Document> => {
    const res = await axios.put<{ data: Document }>(
      `${baseURL}/${workspaceId}/${docId}`,
      payload
    );
    return res.data.data;
  },

  remove: async (
    workspaceId: string | number,
    docId: string | number
  ): Promise<void> => {
    await axios.delete(`${baseURL}/${workspaceId}/${docId}`);
  },
};
