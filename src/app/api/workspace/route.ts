import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { UpdateWorkSpaceSchema, WorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validateData = WorkSpaceSchema.parse(body);

  const workSpace = await prisma.workSpace.create({
    data: {
      name: validateData.name,
      author: { connect: { id: user.id } },
    },
  });

  return workSpace;
};

const updateWorkSpace = async (req: NextRequest) => {
  const body = await req.json();
  const validateData = UpdateWorkSpaceSchema.parse(body);

  const update = await prisma.workSpace.update({
    where: { id: validateData.id },
    data: {
      name: validateData.name,
    },
  });

  return update;
};
const deleteWorkSpace = async (req: NextRequest) => {
  const { taskId } = await req.json();
  if (!taskId) {
    throw new Error('Workspace Id not found!');
  }
  const deleteWorkSpace = await prisma.workSpace.delete({
    where: { id: taskId },
  });
  return deleteWorkSpace;
};

const getWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const Workspace = await prisma.workSpace.findMany({
    where: { authorId: user.id },
    include: {
      Project: true,
    },
  });
  return Workspace;
};

export const POST = withApiHandler(createWorkSpace);
export const PUT = withApiHandler(updateWorkSpace);
export const DELETE = withApiHandler(deleteWorkSpace);
export const GET = withApiHandler(getWorkSpace);
