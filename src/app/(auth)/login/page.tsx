import Login from '@/components/auth/LoginForm';
import { signIn } from '@/lib/auth';
import React from 'react';

const handleLogin = async () => {
  'use server';
  await signIn('credentials');
};

const page = () => {
  return <Login />;
};

export default page;
