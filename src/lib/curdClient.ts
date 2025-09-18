import axios from 'axios';

export function createCrudClient<T extends { id: number | string }>(
  baseUrl: string
) {
  return {
    getAll: async (): Promise<T[]> => {
      const res = await axios.get<{ data: T[] }>(baseUrl);
      return res.data.data;
    },
    getOne: async (id: number): Promise<T> => {
      const res = await axios.get<{ data: T }>(`${baseUrl}/${id}`);
      return res.data.data;
    },
    create: async (payload: Omit<T, 'id'>): Promise<T> => {
      const res = await axios.post<{ data: T }>(baseUrl, payload);
      return res.data.data;
    },
    update: async (id: number, payload: Partial<T>): Promise<T> => {
      const res = await axios.put<{ data: T }>(`${baseUrl}/${id}`, payload);
      return res.data.data;
    },
    remove: async (id: number): Promise<void> => {
      await axios.delete(`${baseUrl}/${id}`);
    },
  };
}
