'use client';
import React, { useState } from 'react';
import { Nunito } from 'next/font/google';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  useCreateWorkspace,
  useGetAllWorkspace,
} from '@/api-hooks/useWorkspaces';
import Link from 'next/link';
import { Spinner } from '@/components/ui/shadcn-io/spinner';

const nunito = Nunito({ subsets: ['latin'] });

const Workspace = () => {
  const [inputValue, setInputValue] = useState('');

  const createWs = useCreateWorkspace();
  const { data: ws, isLoading, isError } = useGetAllWorkspace();

  const handleInput = (e: React.FormEvent) => {
    e.preventDefault();
    createWs.mutate({
      name: inputValue,
    });
    setInputValue('');
  };

  if (isError) {
    return (
      <div className="text-center text-red-500">Failed to load projects</div>
    );
  }

  return (
    <div
      className={`${nunito.className} antialiased flex justify-center items-center h-screen`}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl">Hello, Yash</h1>
        <div className="flex justify-center items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="create a workspace..."
          />
          <Button
            onClick={handleInput}
            variant="outline"
            disabled={createWs.isPending}
          >
            {createWs.isPending ? <Spinner variant="circle" /> : 'Create'}
          </Button>
        </div>
        <div className="border p-4 rounded-2xl">
          <p className="font-semibold pl-1 pb-2">Available workspaces:</p>

          <div className="flex flex-col gap-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <Spinner variant="circle" />
              </div>
            ) : ws?.length === 0 ? (
              <p className="text-sm text-zinc-300">No workspace found</p>
            ) : (
              ws?.map((i) => (
                <Link key={i.id} href={`/ws/${i.id}`}>
                  <p className="border text-sm rounded-sm bg-zinc-800 px-2 py-1 flex justify-between items-center hover:bg-zinc-900 transition-all duration-300">
                    {i.name} <ArrowRight size={16} />
                  </p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
