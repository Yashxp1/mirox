export interface Task {
  id: number;
  title: string;
  description: string | null;
  startdate: string | null;
  target: string | null;
  priority: 'NONE' | 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
  assigneeId: string;
  assignee: Assignee;
  authorId: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
  authorName: string;
  body: string;
}

interface Assignee {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

export interface TaskCmt {
  commentbody: string;
}
