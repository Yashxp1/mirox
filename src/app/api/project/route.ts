import { withApiHandler } from '@/lib/apiHandler';
import {
  assertUserInWorkspace,
  assertUserWorkspaceRole,
} from '@/lib/helper/workspace';
import { prisma } from '@/lib/prisma';
import { CreateProjectSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createProject = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validatedData = CreateProjectSchema.parse(body);

  await assertUserWorkspaceRole(validatedData.workspaceId, user.id);

  const project = await prisma.project.create({
    data: {
      name: validatedData.name,
      summary: validatedData.summary,
      description: validatedData.description,
      status: validatedData.status,
      priority: validatedData.priority,
      startdate: validatedData.startdate,
      target: validatedData.target,
      authorId: user.id,
      workspaceId: validatedData.workspaceId,
    },
  });

  return project;
};

const getProjects = async (req: NextRequest, user: { id: string }) => {
  const url = new URL(req.url);
  const workspaceId = url.searchParams.get('workspaceId');
  if (!workspaceId) throw new Error('workspaceId is required');

  await assertUserInWorkspace(workspaceId, user.id);

  return prisma.project.findMany({ where: { workspaceId } });
};

export const POST = withApiHandler(createProject);
export const GET = withApiHandler(getProjects);
