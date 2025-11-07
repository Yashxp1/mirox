export interface Workspace {
  id: number;
  wsId: string;
  name: string;
  authorId: string;
  CreatedAt: string;
  updatedAt: string;
}
export interface WorkspaceMember {
  id: number;
  userId: string;
  email: string;
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
