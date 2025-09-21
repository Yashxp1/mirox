import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateProjectSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = Number(params?.id);

  if (isNaN(workspaceId)) throw new Error('Invalid workspace id');

  const body = await req.json();
  const validatedData = CreateProjectSchema.parse(body);

  const workspace = await prisma.workSpace.findUnique({
    where: { id: workspaceId, authorId: user.id },
  });

  if (!workspace) throw new Error('Workspace not found or access denied');

  const project = await prisma.project.create({
    data: {
      title: validatedData.title,
      name: validatedData.name,
      summary: validatedData.summary,
      description: validatedData.description,
      status: validatedData.status,
      priority: validatedData.priority,
      startdate: validatedData.startdate,
      target: validatedData.target,
      workspaceId,
      authorId: user.id,
    },
  });

  return project;
};

const getProject = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { id: string; projectId: string } }
) => {
  const params = await ctx?.params;
  const workspaceId = Number(params?.id);

  if (isNaN(workspaceId)) throw new Error('Invalid workspace id');

  const workspace = await prisma.workSpace.findFirst({
    where: { id: workspaceId, authorId: user.id },
  });

  if (!workspace) throw new Error('Workspace not found or access denied');

  const project = await prisma.project.findMany({
    where: { authorId: user.id, workspaceId: workspaceId },
  });

  return project;
};

export const POST = withApiHandler(createProject);
export const GET = withApiHandler(getProject);
