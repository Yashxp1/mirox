'use client';
import { useCreatedoc } from '@/api-hooks/useDocuments';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { Paintbrush, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DocProps {
  workspaceId: string;
}

const DocUtils = ({ workspaceId }: DocProps) => {
  const createDoc = useCreatedoc(workspaceId);
  const router = useRouter();

  // console.log("wsid : ", workspaceId)

  const handleCreateDoc = async () => {
    if (!workspaceId) {
      alert('Missing workspaceId');
      return;
    }

    try {
      const newDoc = await createDoc.mutateAsync({
        name: 'Untitled document',
        // content: { blocks: [] },
      });

      console.log('docId : ', newDoc.id);
      router.push(`/ws/${workspaceId}/${newDoc.id}`);
    } catch (err) {
      console.error(err);
      alert('Failed to create document');
    }
  };

  return (
    <div className="text-sm pt-15 flex gap-2 justify-end px-4 w-full">
      <button
        onClick={handleCreateDoc}
        className="bg-blue-500/20 text-blue-500 hover:bg-blue-700/30 transition-all duration-300 rounded-sm flex justify-center items-center p-1.5 gap-1"
      >
        {createDoc.isPending ? (
          <Spinner variant="circle" />
        ) : (
          <>
            <Plus size={16} /> Create doc
          </>
        )}
      </button>
      <button className="bg-purple-500/20 text-purple-500 hover:bg-purple-700/30 transition-all duration-300 rounded-sm flex justify-center items-center p-1.5 gap-1">
        <Paintbrush size={16} />
        Templates
      </button>
    </div>
  );
};

export default DocUtils;
