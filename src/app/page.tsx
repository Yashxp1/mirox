import Github from '@/components/auth/GithubSignIn';
import { ModeToggle } from '@/components/darkmode/ModeToggle';
import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  // const router = useRouter();

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Landing Page</h1>
      <div>
        <ModeToggle />
      </div>
      {/* <Button variant="outline" onClick={() => router.push('/dashboard')}>
        Dashboard
      </Button> */}

      <Github />
    </div>
  );
};

export default Page;
