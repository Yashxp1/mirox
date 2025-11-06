import { withApiHandler } from '@/lib/apiHandler';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const getComment = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  if (!wsId || !taskId) {
    throw new Error('workspace or taskId not found');
  }

  const workspace = await prisma.workspace.findUnique({ where: { wsId } });

  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });

  if (!workspace || !task) {
    throw new Error('workspace or task Id not found');
  }

  const comments = await prisma.comments.findMany({
    where: { issueId: Number(taskId) },
    include: { issue: true, author: true },
  });

  return comments;
};

const createComment = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  if (!wsId || !taskId) {
    throw new Error('workspace or taskId not found');
  }

  const { commentbody } = await req.json();

  const workspace = await prisma.workspace.findUnique({ where: { wsId } });

  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });

  if (!workspace || !task) {
    throw new Error('workspace or task Id not found');
  }

  const session = await auth();
  if (!session) {
    throw new Error('unauthorised');
  }
  const username = session?.user?.name;

  const comment = await prisma.comments.create({
    data: {
      body: commentbody,
      authorId: user.id,
      authorName: username,
      issueId: Number(taskId),
    },
  });

  return comment;
};

const updateComment = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  if (!wsId || !taskId) {
    throw new Error('workspace or taskId not found');
  }

  const { comment } = await req.json();

  const workspace = await prisma.workspace.findUnique({ where: { wsId } });

  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });

  if (!workspace || !task) {
    throw new Error('workspace or task Id not found');
  }

  const comments = await prisma.comments.update({
    where: { id: Number(taskId), authorId: user.id },
    data: {
      body: comment,
    },
  });

  return comments;
};

const deleteComment = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string; taskId: string } }
) => {
  const params = await ctx?.params;
  const wsId = params?.wsId;
  const taskId = params?.taskId;

  if (!wsId || !taskId) {
    throw new Error('workspace or taskId not found');
  }

  const workspace = await prisma.workspace.findUnique({ where: { wsId } });

  const task = await prisma.task.findUnique({ where: { id: Number(taskId) } });

  if (!workspace || !task) {
    throw new Error('workspace or task Id not found');
  }

  // const comment = await prisma.comments.delete({
  //   where: { id: comme },
  // });

  // return comment;
};

export const GET = withApiHandler(getComment);
export const POST = withApiHandler(createComment);
export const PUT = withApiHandler(updateComment);
export const DELETE = withApiHandler(deleteComment);
