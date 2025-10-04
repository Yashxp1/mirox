import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createTask = async (req: NextRequest, user: { id: string }) => {
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  const projectIdStr = searchParams.get('projectId');

  if (!workspaceId || !projectIdStr) {
    throw new Error('Missing workspaceId or projectId query parameter');
  }

  const projectId = Number(projectIdStr);

  const body = await req.json();
  const validatedData = CreateTaskSchema.parse(body);

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: user.id,
    },
  });

  if (!workspaceMember) {
    throw new Error('You are not a member of this workspace');
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      workspaceId,
    },
  });

  if (!project) {
    throw new Error('Project not found in this workspace');
  }

  if (validatedData.assigneeId) {
    const assigneeMember = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId,
        userId: validatedData.assigneeId,
      },
    });

    if (!assigneeMember) {
      throw new Error('Assignee is not a member of this workspace');
    }
  }

  const task = await prisma.task.create({
    data: {
      title: validatedData.title,
      assigneeId: validatedData.assigneeId,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      projectId,
      authorId: user.id,
    },
  });

  return task;
};

const getTask = async (req: NextRequest, user: { id: string }) => {
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  const projectIdStr = searchParams.get('projectId');

  if (!workspaceId || !projectIdStr) {
    throw new Error('Missing workspaceId or projectId query parameter');
  }

  const projectId = Number(projectIdStr);

  const workspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: user.id,
    },
  });

  if (!workspaceMember) {
    throw new Error('You are not a member of this workspace');
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
      workspaceId,
    },
  });

  if (!project) {
    throw new Error('Project not found in this workspace');
  }

  const tasks = await prisma.task.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return tasks;
};

export const POST = withApiHandler(createTask);
export const GET = withApiHandler(getTask);
