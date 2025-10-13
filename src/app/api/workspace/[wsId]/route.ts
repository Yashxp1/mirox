import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const getWorkspaceById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;

  if (!wsId) {
    throw new Error('workspce id not found');
  }

  const workspace = await prisma.workspace.findMany({
    where: {
      id: wsId,
    },
    include: {
      documents: true,
      author: true,
    },
  });

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  return workspace;
};

const updateWs = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;

  if (!wsId) {
    throw new Error('workspce id not found');
  }

  const body = await req.json();
  const validateData = UpdateWorkSpaceSchema.parse(body);

  const updateWs = await prisma.workspace.update({
    where: { id: wsId },
    data: {
      name: validateData.name,
    },
  });

  return updateWs;
};

const deleteWs = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;

  if (!wsId) {
    throw new Error('workspce id not found');
  }

  const deleteWs = await prisma.workspace.delete({
    where: { id: wsId, authorId: user.id },
  });

  return deleteWs;
};

export const GET = withApiHandler(getWorkspaceById);
export const PUT = withApiHandler(updateWs);
export const DELETE = withApiHandler(deleteWs);
