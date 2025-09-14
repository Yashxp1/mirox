'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Github from './GithubSignIn';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/lib/schema';
import { login } from '@/actions/Login';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    const res = await login(data);

    if (res?.error) {
      setIsError(res.error);
      setIsLoading(false);
    }

    if (res?.error) {
      setIsError('');
      setIsSuccess(res.error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h1 className="flex justify-center items-center text-2xl font-semibold">
          Login
        </h1>
        {isSuccess && <p className="text-green-600">{isSuccess}</p>}
        {isError && <p className="text-red-600">{isError}</p>}
      </CardHeader>

      {/* Form starts here */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...form.register('email')}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
              />
              {form.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2 pt-6">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Logging you in...' : 'Login'}
          </Button>

          <hr />

          <Link href="/register">
            <Button variant="ghost">Register</Button>
          </Link>
        </CardFooter>
      </form>
      <div className="flex justify-center items-center">
        <Github />
      </div>
    </Card>
  );
};

export default LoginForm;
