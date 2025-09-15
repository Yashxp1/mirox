import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),

  name: z.string().min(1, {
    message: 'Name is required',
  }),

  password: z.string().min(6, {
    message: 'Password must be at least 6 characters long',
  }),

  passwordConfirmation: z.string().min(6, {
    message: 'Password must be at least 6 characters long ',
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),

  password: z.string().min(1, { message: 'Please enter a valid password' }),
});

export const TaskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  startdate: z.string().nullable(),
  target: z.string().nullable(),
  status: z.enum([]),
  priority: z.enum([]),
  authorId: z.string(),
  assigneeId: z.string().nullable(),
  CreatedAt: z.string(),
  updatedAt: z.string(),
  userId: z.string().nullable(),
  projectId: z.number().nullable(),
});

export const UpdateTaskSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  startdate: z.string().nullable().optional(),
  target: z.string().nullable().optional(),
  status: z.enum([]).optional(),
  priority: z.enum([]).optional(),
  authorId: z.string().optional(),
  assigneeId: z.string().nullable().optional(),
});

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  authorId: z.string(),
  summary: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.enum([]).optional(),
  priority: z.enum([]).optional(),
  startdate: z.string().datetime().optional().nullable(),
  target: z.string().datetime().optional().nullable(),
});

export const UpdateProjectSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  summary: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.enum([]).optional(),
  priority: z.enum([]).optional(),
  startdate: z.string().datetime().optional().nullable(),
  target: z.string().datetime().optional().nullable(),
});

export const WorkSpaceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const UpdateWorkSpaceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
});
