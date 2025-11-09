'use client';

import React from 'react';

const features = [
  {
    id: 1,
    title: 'Real-time Collaboration',
    description:
      'Work together seamlessly with instant updates, task syncing, and live editing.',
  },
  {
    id: 2,
    title: 'Task Management',
    description:
      'Create, assign, and track tasks effortlessly — from idea to completion.',
  },
  {
    id: 3,
    title: 'Role & Permissions',
    description:
      'Control access with customizable roles for admins, members, and guests.',
  },
  {
    id: 4,
    title: 'Priority & Status',
    description:
      'Organize your work with priority levels and track progress at a glance.',
  },
  {
    id: 5,
    title: 'Analytics Dashboard',
    description:
      'Visualize productivity, track deadlines, and make data-driven decisions.',
  },
  {
    id: 6,
    title: 'Notifications & Alerts',
    description:
      'Stay in the loop with real-time updates and smart activity notifications.',
  },
];

const Working = () => {
  return (
    <div className="py-30">
      <div className="flex justify-center items-center flex-col">
        <span className="text-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm">
          How it works
        </span>
        <h1 className="text-center text-4xl pt-6 leading-tight">
          Create your workspace. Add tasks. <br /> Get things done — together.
        </h1>
        <p className="text-center text-xl text-gray-600 pt-4 max-w-2xl">
          Your entire workflow, connected and effortless.
        </p>
      </div>

      <div className=" py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative border border-dashed border-gray-200 bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-semibold text-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {feature.id}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Working;
