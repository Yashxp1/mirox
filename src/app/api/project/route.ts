import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateProjectSchema, UpdateProjectSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createProject = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validatedData = CreateProjectSchema.parse(body);

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
      author: { connect: { id: user.id } },
      workspace: { connect: { id: validatedData.workspaceId } },
    },
    include: {
      workspace: {
        select: {
          id: true,
        },
      },
    },
  });

  return project;
};

const updateProject = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validatedData = UpdateProjectSchema.parse(body);

  const updateTask = await prisma.project.update({
    where: { id: validatedData.id },
    data: {
      title: validatedData.title,
      name: validatedData.name,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      authorId: user.id,
    },
  });

  return updateTask;
};
const deleteProject = async (req: NextRequest) => {
  const { projectId } = await req.json();

  if (!projectId) {
    throw new Error('Project Id not found');
  }

  const deleteProject = await prisma.project.delete({
    where: { id: projectId },
    include: { tasks: true },
  });

  return deleteProject;
};
const getProject = async (req: NextRequest, user: { id: string }) => {
  const project = await prisma.project.findMany({
    where: { authorId: user.id },
  });
  return project;
};

export const POST = withApiHandler(createProject);
export const PUT = withApiHandler(updateProject);
export const DELETE = withApiHandler(deleteProject);
export const GET = withApiHandler(getProject);
