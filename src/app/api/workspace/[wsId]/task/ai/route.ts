import { withApiHandler } from '@/lib/apiHandler';
import { geminiCall } from '@/lib/gemini';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

const getTaskDetails = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;

  const { query } = await req.json();

  if (!wsId) {
    throw new Error('workspace not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!workspace) {
    throw new Error('Workspace not found or unauthorized');
  }

  const isAuthor = workspace.authorId === user.id;
  const isMember = workspace.members.some((m) => m.userId === user.id);

  if (!isAuthor && !isMember) {
    throw new Error('Unauthorized access');
  }

  const tasks = await prisma.task.findMany({
    where: { workspaceId: workspace.wsId },
    select: {
      id: true,
      title: true,
      description: true,
      startdate: true,
      target: true,
      status: true,
      priority: true,
      createdAt: true,
      updatedAt: true,
      assigneeId: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!tasks) {
    throw new Error('Task not found'!);
  }

  const taskContext = JSON.stringify(tasks);

  geminiCall(taskContext, query);
  // console.log(geminiCall)
  return tasks;
};

const createTaskUsingAI = async (
  req: NextRequest,
  user: { id: string },
  ctx?: { params: { wsId: string } }
) => {
  const param = await ctx?.params;
  const wsId = param?.wsId;

  const { prompt } = (await req.json()) as { prompt: string };

  console.log("prompt : ", prompt)

  if (!prompt) {
    throw new Error('Prompt is required');
  }

  if (!wsId) {
    throw new Error('workspace not found!');
  }

  const workspace = await prisma.workspace.findUnique({
    where: { wsId },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!workspace) {
    throw new Error('Workspace not found or unauthorized');
  }

  const isAuthor = workspace.authorId === user.id;
  const isMember = workspace.members.some((m) => m.userId === user.id);

  if (!isAuthor && !isMember) {
    throw new Error('Unauthorized access');
  }

  // AI generates the task details from the prompt
  const aiTask = await geminiCall(prompt);

  if (!aiTask || !aiTask.title) {
    throw new Error('AI failed to generate valid task data');
  }

  const task = await prisma.task.create({
    data: {
      title: aiTask.title,
      description: aiTask.description ?? '',
      startdate: new Date(),
      priority: aiTask.priority ?? 'NONE',
      authorId: user.id,
      workspaceId: workspace.wsId,
    },
  });

  return task;
};

// export const POST = withApiHandler(createTaskUsingAI);
export const POST = withApiHandler(getTaskDetails);
