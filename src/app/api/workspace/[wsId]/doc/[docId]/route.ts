import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { DocSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const getDocumentById = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; docId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const docId = Number(params?.docId);

  if (!wsId || !docId) {
    throw new Error('workspce or doc id not found');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: wsId },
    include: { members: true },
  });

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const doc = await prisma.doc.findUnique({
    where: {
      id: docId,
      workspaceId: wsId,
    },
  });

  if (!doc) {
    throw new Error('Workspace not found');
  }

  return doc;
};

const updateDoc = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; docId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const docId = Number(params?.docId);

  if (!wsId || isNaN(docId)) {
    throw new Error('Workspace or doc id not found');
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

  const updateDoc = await prisma.doc.update({
    where: { id: docId, workspaceId: wsId },
    data: {
      name: validateData.name,
      content: validateData.content ?? {},
    },
  });

  return updateDoc;
};

const deleteDoc = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; docId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const docId = Number(params?.docId);

  if (!wsId || !docId) {
    throw new Error('workspce or doc id not found');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { id: wsId },
    include: { members: true },
  });

  if (!workspace) {
    throw new Error('Workspace not found');
  }

  const deleteDoc = await prisma.doc.delete({
    where: { id: docId, workspaceId: wsId },
  });

  return deleteDoc;
};

export const GET = withApiHandler(getDocumentById);
export const PUT = withApiHandler(updateDoc);
export const DELETE = withApiHandler(deleteDoc);
