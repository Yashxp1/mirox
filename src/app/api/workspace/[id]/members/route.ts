import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { roleUpdateSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const joinWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;

  if (!workspaceId) throw new Error('Invalid workspace id');

  const checkWorkspace = await prisma.workSpace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  if (!checkWorkspace) throw new Error('Workspace not found');

  const existingMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: user.id,
    },
  });

  if (existingMember) return { message: 'Already a member', workspaceId };

  const newMember = await prisma.workspaceMember.create({
    data: {
      workspaceId,
      userId: user.id,
      role: 'MEMBER',
      invitedBy: null,
    },
  });

  return newMember;
};

const getMembers = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;
  if (!workspaceId) throw new Error('Invalid workspace id');

  const workspace = await prisma.workSpace.findUnique({
    where: { id: workspaceId },
  });
  if (!workspace) throw new Error('Workspace not found');

  const members = await prisma.workspaceMember.findMany({
    where: {
      workspaceId,
    },
    include: {
      user: true,
    },
  });

  return members;
};

const leaveWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;

  if (!workspaceId) throw new Error('Invalid workspace id');

  const workspace = await prisma.workSpace.findUnique({
    where: { id: workspaceId },
  });

  if (!workspace) {
    throw new Error('Workspace not found');
  }
  if (workspace.authorId === user.id) {
    throw new Error('Owner cannot leave the workspace');
  }

  const deleteMembership = await prisma.workspaceMember.delete({
    where: {
      userId_workspaceId: {
        userId: user.id,
        workspaceId,
      },
    },
  });

  return deleteMembership;
};

const updateRole = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;

  const body = await req.json();
  const validateData = roleUpdateSchema.parse(body);

  if (!workspaceId) {
    throw new Error('Workspace not found');
  }

  const membership = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: user.id,
    },
  });

  if (!membership || !['OWNER', 'ADMIN'].includes(membership.role)) {
    throw new Error('Not authorized to change roles');
  }

  const updateRole = await prisma.workspaceMember.update({
    where: {
      userId_workspaceId: {
        userId: validateData.targetUserId,
        workspaceId,
      },
    },
    data: { role: validateData.role },
  });

  return updateRole;
};

export const POST = withApiHandler(joinWorkspace);
export const GET = withApiHandler(getMembers);
export const DELETE = withApiHandler(leaveWorkspace);
export const PUT = withApiHandler(updateRole);
