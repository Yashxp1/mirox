import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { CreateWorkSpaceSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validateData = CreateWorkSpaceSchema.parse(body);

  const workspace = await prisma.workspace.create({
    data: {
      name: validateData.name,
      authorId: user.id,
    },
  });

  await prisma.workspaceMember.create({
    data: {
      userId: user.id,
      workspaceId: workspace.id,
      role: 'ADMIN',
    },
  });

  return workspace;
};

const getWorkSpace = async (req: NextRequest, user: { id: string }) => {
  const Workspace = await prisma.workspace.findMany({
    where: {
      OR: [{ authorId: user.id }, { members: { some: { userId: user.id } } }],
    },
    include: {
      members: {
        include: { user: true },
      },
    },
  });
  return Workspace;
};

export const POST = withApiHandler(createWorkSpace);
export const GET = withApiHandler(getWorkSpace);
