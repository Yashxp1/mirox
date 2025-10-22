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

export const StatusEnum = z.enum([
  'DONE',
  'IN_PROGRESS',
  'PLANNED',
  'COMPLETED',
  'BACKLOG',
  'CANCELED',
]);
export const PriorityEnum = z.enum(['LOW', 'HIGH', 'MEDIUM', 'NONE']);

export const CreateWorkSpaceSchema = z.object({
  name: z.string().min(1),
});

export const UpdateWorkSpaceSchema = z.object({
  name: z.string().min(1).optional(),
});

export const CreateProjectSchema = z.object({
  title: z.string().min(1),
  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  startdate: z.coerce.date().nullable().optional(),
  target: z.coerce.date().nullable().optional(),
  workspaceId: z.number(),
});

export const UpdateProjectSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  summary: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  startdate: z.coerce.date().nullable().optional(),
  target: z.coerce.date().nullable().optional(),
});

// ===== Task =====
export const CreateTaskSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  startdate: z.coerce.date().nullable().optional(),
  target: z.coerce.date().nullable().optional(),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  assigneeId: z.string().nullable().optional(),
  // workspaceId: z.string()
});

export const UpdateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().nullable().optional(),
  startdate: z.coerce.date().nullable().optional(),
  target: z.coerce.date().nullable().optional(),
  status: StatusEnum.optional(),
  priority: PriorityEnum.optional(),
  assigneeId: z.string().nullable().optional(),
});
