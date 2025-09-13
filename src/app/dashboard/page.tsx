'use client';
import ProjectCard from '@/components/dashboard/ProjectCard';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { useState } from 'react';

const Page = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <div className="">{isSidebarOpen && <Sidebar />}</div>
      <div className="w-full border">
        <div className="p-2 px-0">
          <div className="bg-[#101012]">
            <Topbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
