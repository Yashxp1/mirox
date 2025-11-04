import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const assignTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  const body = await req.json();
  const { assigneeId } = body;

  if (!assigneeId) throw new Error('Assignee ID is required');

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

  const currentMember = workspace.members.find((m) => m.userId === user.id);
  const isAuthor = workspace.authorId === user.id;
  const isAdmin = currentMember?.role === 'ADMIN';

  if (!isAuthor && !isAdmin) {
    throw new Error('Unauthorized: only author or admin can assign tasks');
  }

  const isValidMember = workspace.members.some((m) => m.userId === assigneeId);
  if (!isValidMember) throw new Error('User is not part of this workspace');

  const task = await prisma.task.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task) {
    throw new Error('Workspace not found or unauthorized');
  }

  const updateTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      assigneeId,
    },
    include: {
      assignee: true,
    },
  });

  return updateTask;
};

const leaveAssignedTask = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: { members: true },
  });

  if (!workspace) throw new Error('Workspace not found');

  const task = await prisma.task.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task) throw new Error('Task not found');

  const currentMember = workspace.members.find((m) => m.userId === user.id);
  const isAuthor = workspace.authorId === user.id;
  const isAdmin = currentMember?.role === 'ADMIN';
  const isAssignee = task.assigneeId === user.id;

  if (!isAuthor && !isAdmin && !isAssignee) {
    throw new Error('Unauthorized to unassign this task');
  }

  const updatedTask = await prisma.task.update({
    where: { id: Number(taskId) },
    data: { assigneeId: null },
  });

  return updatedTask;
};

const updateAssignee = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  const body = await req.json();
  const { assigneeId } = body;

  if (!assigneeId) throw new Error('Assignee ID is required');

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

  const currentMember = workspace.members.find((m) => m.userId === user.id);
  const isAuthor = workspace.authorId === user.id;
  const isAdmin = currentMember?.role === 'ADMIN';

  if (!isAuthor && !isAdmin) {
    throw new Error('Unauthorized: only author or admin can assign tasks');
  }

  const isValidMember = workspace.members.some((m) => m.userId === assigneeId);
  if (!isValidMember) throw new Error('User is not part of this workspace');

  const task = await prisma.task.findUnique({
    where: { id: Number(taskId) },
  });

  if (!task) {
    throw new Error('Workspace not found or unauthorized');
  }

  const updateTask = await prisma.task.update({
    where: {
      id: Number(taskId),
    },
    data: {
      assigneeId,
    },
    include: {
      assignee: true,
    },
  });

  return updateTask;
};

export const POST = withApiHandler(assignTask);
export const DELETE = withApiHandler(leaveAssignedTask);
export const PUT = withApiHandler(updateAssignee);
