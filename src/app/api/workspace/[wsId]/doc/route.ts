import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { DocSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createDocs = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;

  console.log('wsID ----> ', wsId);

  if (!wsId) {
    throw new Error('workspce id not found');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: wsId },
    include: { members: true },
  });

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const body = await req.json();
  const validateData = DocSchema.parse(body);

  const document = await prisma.doc.create({
    data: {
      name: validateData.name,
      authorId: user.id,
      content: validateData.content ?? {},
      workspaceId: wsId,
    },
  });

  return document;
};

const getDocs = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;

  if (!wsId) {
    throw new Error('workspce id not found');
  }

  const docs = await prisma.doc.findMany({
    where: {
      workspaceId: wsId,
      authorId: user.id,
    },
  });

  return docs;
};

export const POST = withApiHandler(createDocs);
export const GET = withApiHandler(getDocs);
