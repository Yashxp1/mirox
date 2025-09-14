import React from 'react';
import { Button } from '../ui/button';
import { signout } from '@/actions/Sign-out';

const SignOut = () => {
  return (
    <form action={signout}>
      <Button type="submit" className="cursor-pointer" variant="destructive">
        Sign Out
      </Button>
    </form>
  );
};

export default SignOut;
