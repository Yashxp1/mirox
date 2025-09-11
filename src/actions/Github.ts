'use server';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
 
export async function githubSignIn() {
  try {
    await signIn('github');
  } catch (error) {
    if (error instanceof AuthError) {
      return 'Github login failed';
    }

    throw Error;
  }
}
