'use server';

import { signOut } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function signout() {
  try {
    await signOut();
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Sign-out failed';
    }

    throw Error;
  }
}
