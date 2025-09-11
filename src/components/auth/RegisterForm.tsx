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
import { RegisterSchema } from '@/lib/schema';
import { Register } from '@/actions/Register';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');
  const [isSuccess, setIsSuccess] = useState('');

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setIsLoading(true);
    const res = await Register(data);
    if (res.message) {
      setIsError(res.message);
      setIsLoading(false);
    }
    if (res.success) {
      setIsError('');
      setIsSuccess(res.success);
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <h1 className="flex justify-center items-center text-2xl font-semibold">
          Register
        </h1>
        {isSuccess && <p className="text-green-600">{isSuccess}</p>}
        {isError && <p className="text-red-600">{isError}</p>}
      </CardHeader>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

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

            <div className="grid gap-2">
              <Label htmlFor="passwordConfirmation">Confirm Password</Label>
              <Input
                id="passwordConfirmation"
                type="password"
                {...form.register('passwordConfirmation')}
              />
              {form.formState.errors.passwordConfirmation && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.passwordConfirmation.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </Button>

          <div className="w-full">
            <Github />
          </div>

          <hr />

          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
