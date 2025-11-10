'use server';

import { prisma } from '@/lib/prisma';
import { RegisterSchema } from '@/lib/schema';
import bcrypt from 'bcryptjs';
import z from 'zod';

export const Register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validateData = RegisterSchema.parse(data);

    const { name, email, password, passwordConfirmation } = validateData;

    if (!validateData) {
      return { message: 'Invalid input data' };
    }

    if (password !== passwordConfirmation) {
      return { message: 'Password do not match' };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const userExisits = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExisits) {
      return { message: 'User already is in use. Please try another on' };
    }

    const lowerCaseEmail = email.toLowerCase();

    const user = await prisma.user.create({
      data: {
        name,
        email: lowerCaseEmail,
        password: hashPassword,
      },
    });

    return {
      user,
      success: `Please continue to login page`,
    };
  } catch (error) {
    console.error('Database message:', error);
    return { message: 'An error occured' };
  }
};
