import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const joinProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: number } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;
  const projectId = params?.projectId;

  if (!workspaceId || !projectId) {
    throw new Error('workspace or project id not found');
  }

  const checkWorkspace = await prisma.workSpace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  const checkProject = await prisma.projectMemeber.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!checkWorkspace || !checkProject) {
    throw new Error('Workspace or Project not found');
  }

  const existingWorkspaceMember = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId: user.id,
    },
  });

  if (existingWorkspaceMember)
    return { message: 'Already a member', workspaceId };

  const existingProjectMember = await prisma.projectMemeber.findFirst({
    where: {
      projectId,
      userId: user.id,
    },
  });

  if (existingProjectMember) return { message: 'Already a member', projectId };

  const newMember = await prisma.projectMemeber.create({
    data: {
      projectId,
      userId: user.id,
      role: 'MEMBER',
      invitedBy: null,
    },
  });

  return newMember;
};
const getProjectMembers = async () => {};
const leaveProject = async () => {};
const updateRole = async () => {};

export const POST = withApiHandler(joinProject);
export const GET = withApiHandler(getProjectMembers);
export const DELETE = withApiHandler(leaveProject);
export const PUT = withApiHandler(updateRole);
