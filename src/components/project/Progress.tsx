import { Pencil } from 'lucide-react';
import React from 'react';

const Progress = () => {
  return (
    <div className="border flex gap-2 rounded-md justify-center items-center py-6">
      <Pencil size={18} />
      <p>Add project update</p>
    </div>
  );
};

export default Progress;
