import React from 'react';
import { signout } from '@/actions/Sign-out';

const SignOut = () => {
  return (
    <form action={signout}>
      <button type="submit" className="cursor-pointer text-sm w-full">
        Sign Out
      </button>
    </form>
  );
};

export default SignOut;
