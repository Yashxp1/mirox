'use client';
import Topbar from '@/app/dashboard/Topbar';
import Tiptap from '@/components/TipTap/TipTap';
import { useState } from 'react';

const Page = () => {
  const [content, setContent] = useState('');

  const onChange = (content: string) => {
    setContent(content);
    console.log(content);
  };

  return (
    <div className="flex">
      <div className="z-50 top fixed w-full">
        <Topbar />
      </div>
      <div className="pt-14 p-4  w-full">
        <Tiptap contentData={content} onChange={onChange} />
      </div>
    </div>
  );
};

export default Page;
