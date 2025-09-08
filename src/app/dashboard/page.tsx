"use client"
import ProjectCard from '@/components/dashboard/ProjectCard';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

const Page = () => {

  return (
    <div className="flex">
      <div className=''>
        <Sidebar />
      </div>
      <div className='w-full border'>
        <Topbar />
        <ProjectCard />
      </div>
    </div>
  );
};

export default Page;
