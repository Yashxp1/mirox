import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const getTaskById = async (
  req: NextRequest,
  user: { id: string },
  { params }: { params: { slug: string } }
) => {
  const taskId = (await params).slug;

  const task = await prisma.workspace.findUnique({
    where: { id: parseInt(taskId) },
    include: {
     
    },
  });

  if (!task || task.authorId !== user.id) {
    throw new Error('Workspace not found or unauthorized');
  }

  return task;
};

export const GET = withApiHandler(getTaskById);
