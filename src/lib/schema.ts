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
  inviteId: z.string().optional(),
});

export const UpdateWorkSpaceSchema = z.object({
  name: z.string().min(1).optional(),
});

export const DocSchema = z.object({
  name: z.string().min(1),
  // wsId: z.string(),
  content: z.json(),
});

// ===== role =====
export const roleUpdateSchema = z.object({
  targetUserId: z.string().min(1),
  role: z.enum(['OWNER', 'ADMIN', 'MEMBER', 'VIEWER']),
});
