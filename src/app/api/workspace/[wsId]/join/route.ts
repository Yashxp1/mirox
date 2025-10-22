import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const joinWorkspace = async (
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

  const existingMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
      workspaceId: workspace?.id,
    },
  });

  if (existingMember) {
    throw new Error('Already a member of this workspace');
  }

  const newMember = await prisma.workspaceMember.create({
    data: {
      userId: user.id,
      workspaceId: workspace!.id,
      role: 'MEMBER',
    },
  });

  return { message: 'Joined workspace successfully', member: newMember };
};

const leaveWorkspace = async (
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
  });

  const isMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
      workspaceId: workspace?.id,
    },
  });

  if (!isMember) {
    throw new Error('You are not a member of this workspace');
  }

  if (workspace?.authorId === user.id) {
    throw new Error('Workspace owner cannot leave their own workspace');
  }

  await prisma.workspace.delete({ where: { id: isMember.id } });

  return { message: 'Left workspace successfully' };
  
};

export const POST = withApiHandler(joinWorkspace);
export const DELETE = withApiHandler(leaveWorkspace);
