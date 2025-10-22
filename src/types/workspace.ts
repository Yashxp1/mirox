import { Project } from './project';

export interface Workspace {
  id: number;
  wsId: string;
  name: string;
  authorId: string;
  CreatedAt: string;
  updatedAt: string;
  Project: Project[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
