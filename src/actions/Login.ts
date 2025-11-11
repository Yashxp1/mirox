'use server';
import { signIn } from '@/lib/auth';
import { LoginSchema } from '@/lib/schema';
import { AuthError } from 'next-auth';
import z from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  const validateData = LoginSchema.parse(data);

  const { email, password } = validateData;

  if (!validateData.email || !validateData.password) {
    return { error: 'Invalid input data' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    return { success: 'Login successful' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid email or password' };
        default:
          return { error: 'Something went wrong' };
      }
    }
    throw error;
  }
};
