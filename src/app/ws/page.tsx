'use client';

import Tiptap from '@/components/TipTap/TipTap';
import { useState } from 'react';
import Topbar from './Topbar';
const Page = () => {
  const [content, setContent] = useState('');

  const onChange = (content: string) => {
    setContent(content);
    console.log(content);
  };

  return (
    <div className="">
      <Topbar />
      <Tiptap contentData={content} onChange={onChange} />
    </div>
  );
};

export default Page;
