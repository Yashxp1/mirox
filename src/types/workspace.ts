import { Project } from './document';

export interface Workspace {
  id: number;
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
