import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const getProjectById = async (
  req: NextRequest,
  user: { id: string },
  { params }: { params: { slug: string } }
) => {
  const projectId = (await params).slug;

  const project = await prisma.workSpace.findUnique({
    where: { id: parseInt(projectId) },
    include: {
      Project: true,
    },
  });

  if (!project || project.authorId !== user.id) {
    throw new Error('Workspace not found or unauthorized');
  }

  return project;
};

export const GET = withApiHandler(getProjectById);
