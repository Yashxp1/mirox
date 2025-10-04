import { withApiHandler } from '@/lib/apiHandler';
import {
  assertUserInWorkspace,
  assertUserWorkspaceRole,
} from '@/lib/helper/workspace';
import { prisma } from '@/lib/prisma';
import { UpdateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const updateTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { taskId: number } }
) => {
  if (!ctx?.params) throw new Error('Missing route parameters');

  const { taskId } = await ctx.params;
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  const projectIdStr = searchParams.get('projectId');

  if (!workspaceId || !projectIdStr) {
    throw new Error('Missing workspaceId or projectId query parameter');
  }

  const projectId = Number(projectIdStr);

  if (isNaN(projectId) || isNaN(taskId)) {
    throw new Error('Invalid task id or project id');
  }

  assertUserInWorkspace(workspaceId, user.id);

  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      Project: {
        workspaceId,
      },
    },
  });

  if (!existingTask) {
    throw new Error('Task not found in this project');
  }

  const body = await req.json();
  const validatedData = UpdateTaskSchema.parse(body);

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

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: {
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      assigneeId: validatedData.assigneeId,
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  return updated;
};

const deleteTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { taskId: number } }
) => {
  if (!ctx?.params) {
    throw new Error('Missing route parameters');
  }

  const { taskId } = await ctx.params;
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');
  const projectIdStr = searchParams.get('projectId');

  if (!workspaceId || !projectIdStr) {
    throw new Error('Missing workspaceId or projectId query parameter');
  }

  const projectId = Number(projectIdStr);

  if (isNaN(projectId) || isNaN(taskId) || !workspaceId)
    throw new Error('Invalid task id or project id');

  assertUserWorkspaceRole(workspaceId, user.id);

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
  ctx?: { params: { taskId: string } }
) => {
  if (!ctx?.params) {
    throw new Error('Missing route parameters');
  }

  const taskId = Number(await ctx.params.taskId);
  const { searchParams } = new URL(req.url);
  const projectIdStr = searchParams.get('projectId');
  const workspaceId = searchParams.get('workspaceId');

  if (!projectIdStr || !workspaceId) {
    throw new Error('Missing projectId or workspaceId');
  }

  const projectId = Number(projectIdStr);

  if (isNaN(projectId) || isNaN(taskId)) {
    throw new Error('Invalid task id or project id');
  }

  assertUserInWorkspace(workspaceId, user.id);

  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      projectId,
      Project: { workspaceId },
      OR: [{ authorId: user.id }, { assigneeId: user.id }],
    },
    include: {
      author: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
    },
  });

  if (!task) {
    throw new Error('Task not found or not authorized');
  }

  return task;
};

export const PUT = withApiHandler(updateTask);
export const DELETE = withApiHandler(deleteTask);
export const GET = withApiHandler(getTaskById);
