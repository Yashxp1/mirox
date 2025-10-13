import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createWorkspace = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validateData = CreateWorkSpaceSchema.parse(body);

  const workspace = await prisma.workspace.create({
    data: {
      authorId: user.id,
      name: validateData.name,
    },
  });

  return workspace;
};

const getWorkspace = async (req: NextRequest, user: { id: string }) => {
  const workspace = await prisma.workspace.findMany({
    where: {
      authorId: user.id,
    },
  });

  return workspace;
};

export const POST = withApiHandler(createWorkspace);
export const GET = withApiHandler(getWorkspace);
