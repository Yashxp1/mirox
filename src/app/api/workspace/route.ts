import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateWorkSpaceSchema,  } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validateData = CreateWorkSpaceSchema.parse(body);

  const workSpace = await prisma.workspace.create({
    data: {
      name: validateData.name,
      authorId: user.id,
    },
  });

  return workSpace;
};


const getWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const Workspace = await prisma.workspace.findMany({
    where: { authorId: user.id },
    include: {
      members: true,
    },
  });
  return Workspace;
};

export const POST = withApiHandler(createWorkSpace);
export const GET = withApiHandler(getWorkSpace);
