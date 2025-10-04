import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const joinProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  if (!ctx?.params) throw new Error('Missing route params');

  const { projectId: projectStr } = await ctx?.params;
  const projectId = Number(projectStr);
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');

  if (!workspaceId) {
    throw new Error('Missing workspaceId query parameter');
  }

  const checkWorkspace = await prisma.workSpace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  const checkProject = await prisma.project.findUnique({
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

  if (!existingWorkspaceMember)
    return { message: 'u dont belong to a workspace', workspaceId };

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

const getProjectMembers = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { workspaceId: string; projectId: string } }
) => {
  if (!ctx?.params) throw new Error('Missing route parameters');

  const { projectId: projectStr } = await ctx.params;
  const projectId = Number(projectStr);

  const { searchParams } = new URL(req.url);
  
  const workspaceId = searchParams.get('workspaceId');

  if (!workspaceId) {
    throw new Error('Missing workspaceId query parameter');
  }

  const checkWorkspace = await prisma.workSpace.findUnique({
    where: {
      id: workspaceId,
    },
  });

  const checkProject = await prisma.project.findUnique({
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

  if (!existingWorkspaceMember) {
    return { message: 'u dont belong to a workspace', workspaceId };
  }

  const members = await prisma.projectMemeber.findMany({
    where: { projectId },
    include: {
      user: true,
    },
  });

  return members;
};

const leaveProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id;
  const projectId = Number(params?.projectId);

  if (!workspaceId || !projectId) {
    throw new Error('workspace or project id not found');
  }

  const project = await prisma.project.findUnique({
    where: { id: projectId },
  });

  if (!project) {
    throw new Error('project not found');
  }

  if (project.authorId === user.id) {
    throw new Error('Owner cannot leave the project');
  }

  const deleteMembership = await prisma.projectMemeber.delete({
    where: {
      userId_projectId: {
        userId: user.id,
        projectId,
      },
    },
  });

  return deleteMembership;
};

const updateRole = async () => {};

export const POST = withApiHandler(joinProject);
export const GET = withApiHandler(getProjectMembers);
export const DELETE = withApiHandler(leaveProject);
export const PUT = withApiHandler(updateRole);
