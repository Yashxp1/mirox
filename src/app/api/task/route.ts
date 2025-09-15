import { withApiHandler } from '@/lib/apiHandler';
import { prisma } from '@/lib/prisma';
import { TaskSchema, UpdateTaskSchema } from '@/lib/schema';
import { NextRequest } from 'next/server';

const createTask = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validatedData = TaskSchema.parse(body);

  const task = await prisma.task.create({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      author: { connect: { id: user.id } },
    },
  });

  return task;
};

const updateTask = async (req: NextRequest, user: { id: string }) => {
  const body = await req.json();
  const validatedData = UpdateTaskSchema.parse(body);

  const updateTask = await prisma.task.update({
    where: { id: validatedData.id },
    data: {
      title: validatedData.title,
      description: validatedData.description,
      startdate: validatedData.startdate,
      target: validatedData.target,
      status: validatedData.status,
      priority: validatedData.priority,
      author: { connect: { id: user.id } },
    },
  });

  return updateTask;
};

const deleteTask = async (req: NextRequest) => {
  const { taskId } = await req.json();
  if (!taskId) {
    throw new Error('Task Id not found!');
  }
  const deleteTask = await prisma.task.delete({ where: { id: taskId } });
  return deleteTask;
};

const getTask = async (req: NextRequest, user: { id: string }) => {
  const task = await prisma.task.findMany({
    where: { authorId: user.id },
    include: {
      comments: true,
    },
  });

  return task;
};

// const getTaskById = async (req: NextRequest) => {
//   const { taskId } = await req.json();

//   const task = await prisma.task.findUnique({ where: { id: taskId } });

//   return task;
// };

export const POST = withApiHandler(createTask);
export const PUT = withApiHandler(updateTask);
export const DELETE = withApiHandler(deleteTask);
export const GET = withApiHandler(getTask);
// export const GET = withApiHandler(getTaskById);
