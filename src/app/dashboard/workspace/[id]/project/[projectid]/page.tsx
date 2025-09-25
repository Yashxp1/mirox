'use client';
import ProjectById from '@/components/project/ProjectById';
import TaskHeader from '@/components/Task/TaskHeader';
import React from 'react';

const page = () => {
  return (
    <div>
      <TaskHeader />
      <ProjectById />
    </div>
  );
};

export default page;
