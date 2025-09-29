import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateProjectSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const updateProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id
  const projectId = Number(params?.projectId);

  if (!workspaceId || isNaN(projectId)) {
    throw new Error('Invalid workspace or project id');
  }

  const body = await req.json();
  const validatedData = UpdateProjectSchema.parse(body);

  const update = await prisma.project.update({
    where: {
      id: projectId,
      authorId: user.id,
      // workspaceId: workspaceId,
    },
    data: {
      name: validatedData.name,
      title: validatedData.title,
      summary: validatedData.summary,
      description: validatedData.description,
      status: validatedData.status,
      priority: validatedData.priority,
      startdate: validatedData.startdate,
      target: validatedData.target,
      workspaceId,
    },
  });

  return update;
};

const getProjectById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = params?.id
  const projectId = Number(params?.projectId);

  if (!workspaceId || isNaN(projectId)) {
    throw new Error('Invalid workspace or project id');
  }

  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
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
  const params = await ctx?.params;
  const workspaceId = params?.id
  const projectId = Number(params?.projectId);

  if (!workspaceId || isNaN(projectId)) {
    throw new Error('Invalid workspace or project id');
  }

  const deleteProject = await prisma.project.delete({
    where: {
      id: projectId,
      authorId: user.id,
      workspaceId: workspaceId,
    },
  });

  return deleteProject;
};

// Note: POST doesn't make sense at /workspace/[id]/project/[projectId]
// This should be at /workspace/[id]/project/ (without projectId)

export const PUT = withApiHandler(updateProject);
export const GET = withApiHandler(getProjectById);
export const DELETE = withApiHandler(deleteProject);
// Consider moving to /workspace/[id]/project/route.ts
