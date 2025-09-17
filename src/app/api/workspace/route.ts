import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateWorkSpaceSchema, UpdateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validateData = CreateWorkSpaceSchema.parse(body);

  const workSpace = await prisma.workSpace.create({
    data: {
      name: validateData.name,
      authorId: user.id,
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
  const { workSpaceId } = await req.json();
  if (!workSpaceId) {
    throw new Error('Workspace Id not found!');
  }
  const deleteWorkSpace = await prisma.workSpace.delete({
    where: { id: workSpaceId },
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
