import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  const params = await ctx?.params;

  const workspaceId = params?.id
  const projectId = Number(params?.projectId);

  if (isNaN(projectId) || !workspaceId)
    throw new Error('Invalid project id');

  const body = await req.json();
  const validatedData = CreateTaskSchema.parse(body);

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      workspaceId,
      authorId: user.id,
    },
  });

  if (!project) throw new Error('Project not found');

  const task = await prisma.task.create({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      projectId,
      authorId: user.id,
      // assigneeId: validatedData.assigneeId || null,
    },
  });

  return task;
};

const getTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id
  const projectId = Number(params?.projectId);

  if (isNaN(projectId) || !workspaceId)
    throw new Error('Invalid project id');

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      workspaceId,
      authorId: user.id,
    },
  });

  if (!project) throw new Error('Project not found');

  const task = await prisma.task.findMany({
    where: { authorId: user.id, projectId: projectId },
  });

  return task;
};

export const POST = withApiHandler(createTask);
export const GET = withApiHandler(getTask);
