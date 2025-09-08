import Create from '@/components/icon/Create';
import { LayoutGrid, Search } from 'lucide-react';

const SidebarHeader = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <div className='hover-sidebarHeader'>
        <LayoutGrid size={19} />
      </div>
      <div className="flex justify-center gap-1 items-center">
        <div className="hover-sidebarHeader">
          <Search size={19} />
        </div>
        <span className=" hover-sidebarHeader bg-zinc-800">
          <Create/>
        </span>
      </div>
    </div>
  );
};

export default SidebarHeader;
