import React from 'react';
import Logo from '../icon/Logo';
import { Button } from '../ui/button';

const Navbar = () => {
  return (
    <nav className="dark:text-zinc-200 px-5 py-2 text-zinc-700 border-b">
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <span className="">
            <Logo />
          </span>
          <h1 className="font-semibold text-lg ">crewspace.</h1>
        </div>
        <div className="flex justify-evenly gap-8 items-center">
          <p className="cursor-default hover:bg-zinc-100 transition-all duration-200 px-2 py-0.5 rounded-full  text-sm ">features</p>
          <p className="cursor-default hover:bg-zinc-100 transition-all duration-200 px-2 py-0.5 rounded-full  text-sm ">Contact Us</p>
          <p className="cursor-default hover:bg-zinc-100 transition-all duration-200 px-2 py-0.5 rounded-full  text-sm ">Help</p>
        </div>
        <div className="flex justify-evenly items-center gap-1 w-fit">
          <Button variant="default" size="sm" className="text-xs">
            Login
          </Button>
          <Button variant="outline" size="sm" className="text-xs">
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
