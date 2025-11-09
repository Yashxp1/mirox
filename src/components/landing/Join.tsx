import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Join = () => {
  return (
    <div className=" h-84 bg-gradient-to-t from-blue-400 via-blue-50 to-white rounded-b-lg">
      <div className="flex justify-center items-center flex-col gap-3 py-10">
        <h1 className="text-4xl">Let’s build something amazing — as a team</h1>
        <p className="text-lg text-center">
          Collaborate, track progress, and <br /> get things done faster than
          ever before.
        </p>
        <div className="">
          <Link href="/register">
            <Button className="w-32 my-6">
              Let’s go! <ArrowRight />{' '}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
