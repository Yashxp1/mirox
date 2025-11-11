import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b mt-14 from-indigo-300 to-white rounded-md h-[600px] flex flex-col justify-center items-center px-4">
      <div className="flex flex-col gap-3 justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
          Move ideas to impact <br className="hidden sm:block" /> without the chaos.
        </h1>
        <h2 className="text-base sm:text-lg md:text-xl text-zinc-700">
          Your all-in-one workspace to plan, collaborate, <br className="hidden sm:block" />
          and track progress — built for speed, simplicity, and scale.
        </h2>
        <div className="py-8">
          <Link href="/register">
            <Button className="text-sm sm:text-base w-36 sm:w-40 py-4 sm:py-5 rounded-full flex items-center justify-center gap-2">
              Get started <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
