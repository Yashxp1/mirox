import { z } from 'zod';

export const credentialSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
