'use client';
import ProjectCard from '@/components/dashboard/ProjectCard';

const Page = () => {
  return (
    <div className="flex">
      <div className="w-full border">
        <div className="p-2 px-0">
          <div className="bg-[#101012]">
            <ProjectCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
