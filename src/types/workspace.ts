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
  userId: string;
  workspaceId: number;
  role: Role;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

export interface AllWorkspaceMembers {
  id: number;
  userId: string;
  email: string;
  publicId: string;
  name: string;
  member: string;
  createdAt: string;
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
