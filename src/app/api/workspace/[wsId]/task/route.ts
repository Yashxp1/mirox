import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;

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

  const body = await req.json();
  const validatedData = CreateTaskSchema.parse(body);

  const currentMember = workspace.members.find((m) => m.userId === user.id);
  const isAuthor = workspace.authorId === user.id;
  const isAdmin = currentMember?.role === 'ADMIN';

  if (!isAuthor && !isAdmin) {
    throw new Error('Unauthorized: only author or admin can assign tasks');
  }

  const task = await prisma.task.create({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      authorId: user.id,
      workspaceId: workspace.wsId,
      assigneeId: validatedData.assigneeId,
    },
  });

  return task;
};

const getTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;

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

  const task = await prisma.task.findMany({
    where: { workspaceId: workspace.wsId },
    orderBy: { createdAt: 'desc' },
  });

  if (!task) {
    throw new Error('Task not found'!);
  }

  return task;
};

export const POST = withApiHandler(createTask);
export const GET = withApiHandler(getTask);
