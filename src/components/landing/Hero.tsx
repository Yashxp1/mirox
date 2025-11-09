import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-gradient-to-b  from-indigo-300 to-white rounded-b-md h-[600px]">
      <div className="flex gap-3 flex-col justify-center items-center pt-32">
        <h1 className="text-6xl text-center">
          Move ideas to impact <br /> without the chaos.
        </h1>
        <h2 className="text-center text-lg">
          Your all-in-one workspace to plan, collaborate, <br /> and track
          progress — built for speed, simplicity, and scale.
        </h2>
        <div className="py-8 ">
          <Link href="/register">
            <Button className="text-sm w-40 py-5 rounded-full">
              Get started <ArrowRight className="" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
