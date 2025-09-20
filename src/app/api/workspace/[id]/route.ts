import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const updateWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const workspaceId = await Number(ctx?.params.id);
  if (isNaN(workspaceId)) throw new Error('Invalid workspace id');

  const body = await req.json();
  const validated = UpdateWorkSpaceSchema.parse(body);

  const updated = await prisma.workSpace.update({
    where: { id: workspaceId, authorId: user.id },
    data: { name: validated.name },
  });

  return updated;
};

const deleteWorkspace = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const workspaceId = Number(ctx?.params.id);
  if (isNaN(workspaceId)) throw new Error('Invalid workspace id');

  const deleteWorkspace = await prisma.workSpace.deleteMany({
    where: { id: workspaceId, authorId: user.id },
  });

  if (deleteWorkspace.count === 0) {
    throw new Error('Workspace not found or not authorized');
  }

  return deleteWorkspace;
};

export const PUT = withApiHandler(updateWorkspace);
export const DELETE = withApiHandler(deleteWorkspace);
