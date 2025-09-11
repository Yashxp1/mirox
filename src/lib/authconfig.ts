import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import type { NextAuthConfig } from 'next-auth';
import { LoginSchema } from './schema';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateData = LoginSchema.safeParse(credentials);
        if (!validateData.success) return null;

        const { email, password } = validateData.data;
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password || !user.password) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) return user;

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
