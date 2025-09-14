'use server';

import { signOut } from '@/lib/auth';

export async function signout() {
  await signOut({ redirectTo: '/' });
}
