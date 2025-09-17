import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const getWorkSpaceById = async (
  req: NextRequest,
  user: { id: string },
  { params }: { params: { slug: string } }
) => {
  const workspaceId = (await params).slug;

  const workspace = await prisma.workSpace.findUnique({
    where: { id: parseInt(workspaceId) },
    include: {
      Project: true,
    },
  });

  if (!workspace || workspace.authorId !== user.id) {
    throw new Error('Workspace not found or unauthorized');
  }

  return workspace;
};

export const GET = withApiHandler(getWorkSpaceById);
