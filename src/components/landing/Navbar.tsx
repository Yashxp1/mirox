import React from 'react';
import Logo from '../icon/Logo';
import { Button } from '../ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-white/10 px-5 py-2 text-zinc-700">
      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Logo />
          <h1 className="font-semibold text-lg">crewspace.</h1>
        </div>
        <div className="hidden md:flex justify-evenly gap-8 items-center">
          <p className="cursor-default hover:bg-zinc-100 transition-all duration-200 px-2 py-0.5 rounded-full text-sm">
            features
          </p>
          <p className="cursor-default hover:bg-zinc-100 transition-all duration-200 px-2 py-0.5 rounded-full text-sm">
            Contact Us
          </p>
          <p className="cursor-default hover:bg-zinc-100 transition-all duration-200 px-2 py-0.5 rounded-full text-sm">
            Help
          </p>
        </div>
        <div className="flex items-center gap-1 w-fit">
          <Link href="/login">
            <Button variant="default" size="sm" className="text-xs">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="sm" className="text-xs">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
