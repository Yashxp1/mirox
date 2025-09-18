import { Workspace } from '@/types/workspace';
import { createCrudClient } from './curdClient';
import { Project } from '@/types/project';
import { Task } from '@/types/task';

export const workspaceApi = createCrudClient<Workspace>('/api/workspace');
export const projectApi = createCrudClient<Project>('/api/project');
export const taskApi = createCrudClient<Task>('/api/task');
