"use client"
import React from 'react';
import { Button } from '../ui/button';
import { GithubIcon } from 'lucide-react';
import { githubSignIn } from '@/actions/Github';

const Github = () => {
  return (
    <div onClick={githubSignIn}>
      <Button
        type="submit"
        variant="outline"
        className="flex w-full justify-center items-center"
      >
        <GithubIcon /> Contiue with Github
      </Button>
    </div>
  );
};

export default Github;
