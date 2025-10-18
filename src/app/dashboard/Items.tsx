'use client';
import { useGetAlldoc } from '@/api-hooks/useDocuments';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import Link from 'next/link';
import React from 'react';

interface ItemsProps {
  workspaceId: string;
}

const Items: React.FC<ItemsProps> = ({ workspaceId }) => {
  const { data, isLoading, isError } = useGetAlldoc(workspaceId);

  console.log('Data: ', data);

  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Spinner variant="circle" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Failed to load projects</div>
    );
  }

  if (!data || data.length === 0) {
    return <div className="text-center text-zinc-400">No projects yet</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      
      {data.map((document) => (
        <Link
          key={document.id}
          href={`/ws/${workspaceId}/${document.id}`}
          className="block"
        >
          <div className="rounded-xl p-4 border hover:shadow-2xl transition-all duration-300 bg-zinc-800 text-zinc-200 h-full">
            <div className="flex flex-col gap-1 pb-3">
              <h1 className="font-semibold text-sm">{document.name}</h1>
              {/* <p className="text-zinc-400 text-xs bg-red-900"> {new Date(document.createdAt).toLocaleString()}</p> */}
            </div>
            <hr className="border-zinc-700" />
            {/* <div className="text-sm pt-4 text-zinc-300">
              {document.content.blocks.map((block, idx) => (
                <p key={idx} className="mb-2 line-clamp-3">
                  {block.data.text}
                </p>
              ))}
            </div> */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Items;
