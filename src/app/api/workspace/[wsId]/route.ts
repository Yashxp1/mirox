import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const getWorkSpaceById = async (
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

  return workspace;
};

const updateWorkSpace = async (
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
  const validateData = UpdateWorkSpaceSchema.parse(body);

  const update = await prisma.workspace.update({
    where: { wsId: wsId },
    data: {
      name: validateData.name,
      authorId: user.id,
    },
  });

  return update;
};

const deleteWorkSpace = async (
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

  await prisma.workspace.delete({
    where: { wsId },
  });

  return { message: 'Deleted workspace successfully' };
};

export const GET = withApiHandler(getWorkSpaceById);
export const PUT = withApiHandler(updateWorkSpace);
export const DELETE = withApiHandler(deleteWorkSpace);
