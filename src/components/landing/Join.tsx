import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Join = () => {
  return (
    <div className="bg-gradient-to-t from-blue-400 via-blue-50 to-white rounded-b-lg px-4 py-12 sm:py-16">
      <div className="flex flex-col justify-center items-center gap-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Let’s build something amazing — as a team
        </h1>
        <p className="text-base sm:text-lg text-zinc-700">
          Collaborate, track progress, and <br className="hidden sm:block" /> get things done faster than ever before.
        </p>
        <div>
          <Link href="/register">
            <Button className="w-28 sm:w-32 my-6 flex items-center justify-center gap-2 text-sm sm:text-base">
              Let’s go! <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
