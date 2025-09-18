export interface Task {
  id: number;
  title: string;
  description: string | null;
  startdate: string | null;
  target: string | null;
  priority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
  assigneeId: string;
  authorId: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  comments: string;
}
