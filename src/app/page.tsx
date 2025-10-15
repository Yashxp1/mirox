import Github from '@/components/auth/GithubSignIn';
import { ModeToggle } from '@/components/darkmode/ModeToggle';
import React from 'react';

const Page = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Landing Page</h1>
      <div>
        <ModeToggle />
      </div>
      <Github />
    </div>
  );
};

export default Page;
