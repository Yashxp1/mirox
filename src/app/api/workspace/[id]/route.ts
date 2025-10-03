import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const updateWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;
  if (!workspaceId) throw new Error('Invalid workspace id');

  const body = await req.json();
  const validatedData = UpdateWorkSpaceSchema.parse(body);

  const updated = await prisma.workSpace.update({
    where: { id: workspaceId, authorId: user.id },
    data: { name: validatedData.name },
  });

  return updated;
};

const deleteWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;
  if (!workspaceId) throw new Error('Invalid workspace id');

  const deleteWorkspace = await prisma.workSpace.deleteMany({
    where: { id: workspaceId, authorId: user.id },
  });

  if (deleteWorkspace.count === 0) {
    throw new Error('Workspace not found or not authorized');
  }

  return deleteWorkspace;
};

const getWorkspaceById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;

  if (!workspaceId) {
    throw new Error('Invalid workspace id');
  }

 
  const membership = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: user.id,
    },
  });

  const workspace = await prisma.workSpace.findUnique({
    where: { id: workspaceId },
    include: {
      members: { include: { user: true } },
    },
  });

  if (!workspace) throw new Error('Workspace not found');

  if (workspace.authorId !== user.id && !membership) {
    throw new Error('Not authorized to access this workspace');
  }

  return workspace;
};

export const PUT = withApiHandler(updateWorkspace);
export const DELETE = withApiHandler(deleteWorkspace);
export const GET = withApiHandler(getWorkspaceById);
