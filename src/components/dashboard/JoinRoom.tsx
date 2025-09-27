import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const JoinRoom = () => {
  return (
    <div className="border-b flex items-center justify-center ">
      <div className="flex flex-col w-[20%] gap-4 py-10">
        <Input className="focus:outline-none  ring-0 border rounded-md" />
        <div className='w-full flex gap-4 justify-center items-center'>
          <Button>
            Join workspace
          </Button>
          <Button variant='outline'>Create workspace</Button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
