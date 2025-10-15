import { Paintbrush, Plus } from 'lucide-react';
import React from 'react';

const DocUtils = () => {
  return (
    <div className=" text-sm pt-15 flex gap-2 justify-end px-4  w-full">
      <button className="bg-blue-500/20 text-blue-500 hover:bg-blue-700/30 transition-all duration-300 rounded-sm flex justify-center items-center p-1.5 gap-1">
        <Plus size={16} />
        Create doc
      </button>
      <button className="bg-purple-500/20 text-purple-500 hover:bg-purple-700/30 transition-all duration-300 rounded-sm flex justify-center items-center p-1.5 gap-1">
        <Paintbrush size={16} />
        Templates
      </button>
    </div>
  );
};

export default DocUtils;
