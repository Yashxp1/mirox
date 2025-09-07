import { ModeToggle } from '@/components/darkmode/ModeToggle';
import React from 'react';

const page = () => {
  return (
    <div className="flex justify-center items-center">
      <h1>Landing Page</h1>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default page;
