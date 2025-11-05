import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const getTaskByAsigneeId = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;

  if (!wsId) {
    throw new Error('workspace not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: {
      members: true,
    },
  });

  if (!workspace) {
    throw new Error('Workspace not found or unauthorized');
  }

  const isAuthor = workspace.authorId === user.id;
  const isMember = workspace.members.some((m) => m.userId === user.id);

  if (!isAuthor && !isMember) {
    throw new Error('Unauthorized access');
  }

  const task = await prisma.task.findMany({
    where: {
      assigneeId: user.id,
      workspace: {
        wsId: wsId,
      },
    },
    include: {
      assignee: true,
    },
  });

  if (!task) {
    throw new Error('Workspace not found or unauthorized');
  }

  return task;
};

export const GET = withApiHandler(getTaskByAsigneeId);
