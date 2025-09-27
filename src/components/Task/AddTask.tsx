"use client"
import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Box,
  CalendarArrowUp,
  ChartNoAxesColumn,
  CircleDotDashed,
  Crosshair,
  Plus,
  X,
} from 'lucide-react';

const AddTask = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <Button variant="ghost" className="transition-all" onClick={handleModal}>
        <Plus size={16} />
        Add Project
      </Button>
      {isOpen && (
        <div className="fixed inset-0 text-zinc-200 flex items-center justify-center bg-black/70 z-50 transition-all">
          <div className="bg-[#1c1d1f]  w-[60%] h-[50%] rounded-lg border flex flex-col">
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex justify-between ">
                <p className="flex gap-2 ">
                  <Box size={18} />
                  New Task
                </p>
                <X onClick={() => setIsOpen(false)} />
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <input
                  className="text-3xl font-[500] focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Task title"
                />
                <input
                  className="text-lg pb-6 focus:outline-none focus:ring-0"
                  type="text"
                  placeholder="Add a short description..."
                />
              </div>
              <div className="flex pb-8 justify-start gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer">
                  <CircleDotDashed size={16} />
                  <span>Priority</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer">
                  <CalendarArrowUp size={16} />
                  <span>Start Date</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer">
                  <Crosshair size={16} />
                  <span>Target</span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:bg-zinc-800 cursor-pointer">
                  <ChartNoAxesColumn size={16} />
                  <span>Status</span>
                </div>
              </div>
              {/* <hr /> */}
              {/* <div className="pt-6 text-lg">
                <textarea
                  placeholder="Write a description..."
                  className="focus:outline-none ring-0"
                />
              </div> */}
            </div>
            <div className="flex border-t px-6 py-4 gap-3 justify-end items-end">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button>Create project</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;
