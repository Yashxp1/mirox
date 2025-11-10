import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const removeFromWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; mId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;
  const mId = param?.mId;

  if (!wsId || !mId) {
    throw new Error('workspace not found or member id not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
  });

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const requesterMembership = await prisma.workspaceMember.findFirst({
    where: {
      userId: user.id,
      workspaceId: workspace.id,
    },
  });

  if (!requesterMembership) {
    throw new Error('You are not a member of this workspace');
  }

  const isOwner = workspace.authorId === user.id;
  const isAdmin = requesterMembership.role === 'ADMIN';

  if (!isOwner && !isAdmin) {
    throw new Error('Only the workspace owner or admin can remove members');
  }

  const targetMember = await prisma.workspaceMember.findFirst({
    where: {
      userId: mId,
      workspaceId: workspace.id,
    },
    include: { user: true },
  });

  if (!targetMember) {
    throw new Error('Member not found');
  }

  if (targetMember.userId === workspace.authorId) {
    throw new Error('Cannot remove the workspace owner');
  }

  await prisma.workspaceMember.delete({
    where: { id: targetMember.id },
  });

  return { message: 'Left workspace successfully' };
};

const updateMemberRole = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; mId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;
  const mId = param?.mId;

  const { role }: { role: 'ADMIN' | 'MEMBER' } = await req.json();

  if (!role || !wsId || !mId) throw new Error('Invalid input');

  const workspace = await prisma.workspace.findUnique({ where: { wsId } });
  if (!workspace) throw new Error('Workspace not found!');

  const member = await prisma.workspaceMember.findFirst({
    where: { userId: mId, workspaceId: workspace.id },
  });

  const updatedRole = await prisma.workspaceMember.update({
    where: { id: member?.id },
    data: {
      role,
    },
  });

  return updatedRole;
};

const getMember = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; mId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;
  const mId = param?.mId;

  if (!wsId || !mId) {
    throw new Error('Missing workspace ID or member ID.');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    select: { id: true },
  });

  if (!workspace) {
    throw new Error('Workspace not found.');
  }

  const member = await prisma.workspaceMember.findFirst({
    where: {
      userId: mId,
      workspaceId: workspace.id,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true, image: true },
      },
    },
  });

  if (!member) {
    throw new Error('Member not found in this workspace.');
  }

  return {
    id: member.id,
    role: member.role,
    createdAt: member.createdAt,
    userId: member.userId,
    workspaceId: member.workspaceId,
    user: member.user,
  };
};

export const PUT = withApiHandler(updateMemberRole);
export const DELETE = withApiHandler(removeFromWorkspace);
export const GET = withApiHandler(getMember);
