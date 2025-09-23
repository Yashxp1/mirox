'use client';

import GetProjects from '@/components/project/GetProjects';
import { useParams } from 'next/navigation';


const Page = () => {
  
  const params = useParams();
  const slug = params.id;

  console.log('slug: ', slug)

  return (
    <div>
      <h1 className="text-center">Workspace: {slug}</h1>
      <GetProjects />
    </div>
  );
};

export default Page;
