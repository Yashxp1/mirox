import { Workspace } from '@/types/workspace';
import { createCrudClient } from './curdClient';
import { Task } from '@/types/task';

export const workspaceApi = createCrudClient<Workspace>('/api/workspace');
export const taskApi = createCrudClient<Task>('/api/workspace');