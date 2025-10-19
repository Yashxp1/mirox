'use client';

import { useParams } from 'next/navigation';
import Tiptap from '@/components/TipTap/TipTap';
import { useState } from 'react';
import Topbar from '../../Topbar';
import { useGetOnedoc } from '@/api-hooks/useDocuments';

const Page = () => {
  const params = useParams();
  const workspaceId = params?.id as string;
  const docId = params?.doc as string;

  const { data, isError, isLoading } = useGetOnedoc(workspaceId, docId);
  const [content, setContent] = useState(data);

  console.log("content data: ", data)

  const onChange = () => {
  
    setContent(content);
    // console.log('Current content:', content);
  };



  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex">
      <div className="z-50 fixed top-0 w-full">
        <Topbar wsId={workspaceId} docId={docId} />
      </div>
      <div className="pt-14 p-4 w-full">
        {isError ? (
          'An error occured'
        ) : (

          <Tiptap Tdata={content} 
          onChange={onChange} 
          />
        )}
      </div>
    </div>
  );
};

export default Page;
