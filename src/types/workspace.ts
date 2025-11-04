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
export interface WorkspaceMember {
  id: number;
  email: string;
  publicId: string;
  name: string;
  member: string;
  joinedAt: string;
  role: Role;
}

export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}


export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
