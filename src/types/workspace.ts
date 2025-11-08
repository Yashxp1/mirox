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


export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
