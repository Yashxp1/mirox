export interface Project {
  id: number;
  name: string;
  title: string;
  summary: string | null;
  description: string | null;
  startdate: string | null;
  target: string | null;
  priority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
  authorId: string;
  workspaceId: number;
  createdAt: string;
  updatedAt: string;
}
