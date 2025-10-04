import { withApiHandler } from '@/lib/apiHandler';
import { assertUserWorkspaceRole } from '@/lib/helper/workspace';
import { prisma } from '@/lib/prisma';
import { UpdateProjectSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const updateProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { workspaceId: string; projectId: string } }
) => {
  if (!ctx?.params) throw new Error('Missing route parameters');

  const { projectId } = await ctx?.params;
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');

  const body = await req.json();
  const validatedData = UpdateProjectSchema.parse(body);

  if (!workspaceId) {
    throw new Error('Missing workspaceId query parameter');
  }

  await assertUserWorkspaceRole(workspaceId, user.id);

  const update = await prisma.project.update({
    where: { id: Number(projectId) },
    data: {
      name: validatedData.name,
      summary: validatedData.summary,
      description: validatedData.description,
      status: validatedData.status,
      priority: validatedData.priority,
      startdate: validatedData.startdate,
      target: validatedData.target,
    },
  });

  return update;
};

const getProjectById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { workspaceId: string; projectId: string } }
) => {
  if (!ctx?.params) throw new Error('Missing route parameters');

  const { projectId } = await ctx.params;
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');

  if (!workspaceId) {
    throw new Error('Missing workspaceId query parameter');
  }

  // await assertUserWorkspaceRole(workspaceId, user.id);

  const project = await prisma.project.findFirst({
    where: {
      id: Number(projectId),
      workspaceId: workspaceId,
      workspace: {
        authorId: user.id,
      },
    },
    include: {
      workspace: { select: { id: true, name: true } },
      author: { select: { id: true, name: true, email: true } },
    },
  });

  return project;
};

const deleteProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  if (!ctx?.params) throw new Error('Missing route parameters');

  const { projectId } = await ctx?.params;
  const { searchParams } = new URL(req.url);
  const workspaceId = searchParams.get('workspaceId');

  if (!workspaceId) {
    throw new Error('Missing workspaceId query parameter');
  }

  const deleteProject = await prisma.project.delete({
    where: {
      id: Number(projectId),
      authorId: user.id,
      workspaceId: workspaceId,
    },
  });

  return deleteProject;
};

export const PUT = withApiHandler(updateProject);
export const GET = withApiHandler(getProjectById);
export const DELETE = withApiHandler(deleteProject);
