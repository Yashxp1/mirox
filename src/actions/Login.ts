'use server';
import { signIn } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schema';
import bcrypt from 'bcryptjs';
import z from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const validateData = LoginSchema.parse(data);

    const { email, password } = validateData;

    if (!validateData) {
      return { message: 'Invalid input data' };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { error: 'Email or password is incorrect' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { error: 'Email or password is incorrect' };
    }

    await signIn('credentials', {
      email: user.email,
      password: password,
      redirectTo: '/dashboard',
    });

    return { message: 'Login successful', user };
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'An error occured' };
  }
};
