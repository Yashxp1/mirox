import { signIn } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { LoginSchema } from '@/lib/schema';
import z from 'zod';

export const login = async (data: z.infer<typeof LoginSchema>) => {
  try {
    const validateData = LoginSchema.parse(data);

    if (!validateData) {
      return { message: 'Invalid input data' };
    }

    const { email, password } = validateData;

    const userExisits = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExisits || !userExisits.password || !userExisits.email) {
      return { message: 'email or password is incorrect' };
    }

    await signIn('credentials', {
      email: userExisits.email,
      password: password,
    });
  } catch (error) {
    console.error('Database error:', error);
    return { error: 'An error occured' };
  }
};
