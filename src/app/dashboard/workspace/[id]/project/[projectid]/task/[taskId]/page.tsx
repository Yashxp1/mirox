import Header from '@/components/project/Header';
import GetByIdTasks from '@/components/Task/GetTaskById';
import React from 'react';

const page = () => {
  return (
    <div>
      <Header />
      <GetByIdTasks />
    </div>
  );
};

export default page;
