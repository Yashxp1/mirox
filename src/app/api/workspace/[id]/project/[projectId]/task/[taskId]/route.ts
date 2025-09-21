import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const updateTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string; taskId: string } }
) => {
  const params = await ctx?.params;

  const workspaceId = Number(params?.id);
  const projectId = Number(params?.projectId);
  const taskId = Number(params?.taskId);

  if (isNaN(projectId) || isNaN(taskId) || isNaN(workspaceId))
    throw new Error('Invalid task id or project id');

  const body = await req.json();
  const validatedData = UpdateTaskSchema.parse(body);

  const updated = await prisma.task.update({
    where: { id: taskId, authorId: user.id, projectId },
    data: {
      //  id: z.number(),
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      // assigneeId: validatedData.assigneeId,
    },
  });

  return updated;
};

const deleteTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string; taskId: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = Number(params?.id);
  const projectId = Number(params?.projectId);
  const taskId = Number(params?.taskId);

  if (isNaN(projectId) || isNaN(taskId) || isNaN(workspaceId))
    throw new Error('Invalid task id or project id');

  const deleteTask = await prisma.task.deleteMany({
    where: { id: taskId, authorId: user.id, projectId },
  });

  if (deleteTask.count === 0) {
    throw new Error('task not found or not authorized');
  }

  return deleteTask;
};

const getTaskById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string; taskId: string } }
) => {
  const params = await ctx?.params;

  const workspaceId = Number(params?.id);
  const projectId = Number(params?.projectId);
  const taskId = Number(params?.taskId);

  if (isNaN(projectId) || isNaN(taskId) || isNaN(workspaceId)) {
    throw new Error('Invalid task i or project idd');
  }

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      authorId: user.id,
      projectId,
    },
  });

  return task;
};

export const PUT = withApiHandler(updateTask);
export const DELETE = withApiHandler(deleteTask);
export const GET = withApiHandler(getTaskById);
