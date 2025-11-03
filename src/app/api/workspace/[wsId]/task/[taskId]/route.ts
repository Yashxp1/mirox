import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const getTaskById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;
  const taskId = param?.taskId;

  if (!wsId) {
    throw new Error('workspace not found!');
  }

 const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!workspace) {
    throw new Error('Workspace not found or unauthorized');
  }

  const isAuthor = workspace.authorId === user.id;
  const isMember = workspace.members.some((m) => m.userId === user.id);

  if (!isAuthor && !isMember) {
    throw new Error('Unauthorized access');
  }

  const task = await prisma.task.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task ) {
    throw new Error('Workspace not found or unauthorized');
  }

  return task;
};

const deleteTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;
  const taskId = param?.taskId;

  if (!wsId) {
    throw new Error('workspace not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: { members: true },
  });

  if (!workspace || workspace.authorId !== user.id) {
    throw new Error('Workspace not found or unauthorized');
  }

  if (!taskId) {
    throw new Error('Task Id not found!');
  }

  await prisma.task.delete({
    where: { id: Number(taskId) },
  });

  return { message: 'Deleted task successfully' };
};

const updateTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;
  const taskId = param?.taskId;

  if (!wsId) {
    throw new Error('workspace not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: { members: true },
  });

  if (!workspace || workspace.authorId !== user.id) {
    throw new Error('Workspace not found or unauthorized');
  }

  if (!taskId) {
    throw new Error('Task Id not found!');
  }

  const body = await req.json();
  const validatedData = UpdateTaskSchema.parse(body);

  const updateTask = await prisma.task.update({
    where: { id: Number(taskId) },
    data: {
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      workspaceId: workspace.wsId,
    },
  });

  return updateTask;
};

export const GET = withApiHandler(getTaskById);
export const DELETE = withApiHandler(deleteTask);
export const PUT = withApiHandler(updateTask);
