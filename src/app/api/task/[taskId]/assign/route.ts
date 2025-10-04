import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withApiHandler } from '@/lib/apiHandler';

export const assignTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string; taskId: string } }
) => {
  const params = ctx?.params;
  const workspaceId = params?.id;
  const projectId = Number(params?.projectId);
  const taskId = Number(params?.taskId);

  if (!workspaceId || !projectId || !taskId) {
    throw new Error('Workspace, project, or task ID missing');
  }

  const { userId } = await req.json();

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      Project: {
        workspaceId,
      },
    },
  });

  if (!task) {
    throw new Error('Task not found');
  }

  if (task.assigneeId) {
    throw new Error('Task is already assigned to someone');
  }

  const userExists = await prisma.workspaceMember.findFirst({
    where: {
      userId: userId,
      workspaceId: workspaceId,
    },
  });

  if (!userExists) {
    throw new Error('User not found in workspace');
  }

  const updatedTask = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  return updatedTask;
};

export const getAssignTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string; taskId: string } }
) => {
  const params = ctx?.params;
  const workspaceId = params?.id;
  const projectId = Number(params?.projectId);
  const taskId = Number(params?.taskId);

  if (!workspaceId || !projectId || !taskId) {
    throw new Error('Workspace, project, or task ID missing');
  }

  

};
export const POST = withApiHandler(assignTask);
export const PUT = withApiHandler(assignTask);
export const DELETE = withApiHandler(assignTask);
