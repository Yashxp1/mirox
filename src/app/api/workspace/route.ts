import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createWorkspace = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validatedData = CreateWorkSpaceSchema.parse(body);

  const existingUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!existingUser) {
    throw new Error(`User with id ${user.id} not found`);
  }

  const workspace = await prisma.workSpace.create({
    data: {
      name: validatedData.name,
      author: { connect: { id: user.id } },
      members: {
        create: { userId: user.id, role: 'OWNER' },
      },
    },
    include: {
      members: true,
    },
  });

  return workspace;
};

const getAllWorkspace = async (req: NextRequest, user: { id: string }) => {
  const workspace = await prisma.workSpace.findMany({
    where: { authorId: user.id,  },
  });

  return workspace;
};

export const POST = withApiHandler(createWorkspace);
export const GET = withApiHandler(getAllWorkspace);
