import {
  CircleDashed,
  Copy,
  DiamondPlus,
  PanelRightOpen,
  Radio,
} from 'lucide-react';
import React from 'react';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const items = [
    {
      icon: Copy,
      label: 'All issues',
    },
    {
      icon: Radio,
      label: 'Active',
    },
    {
      icon: CircleDashed,
      label: 'Backlog',
    },
    {
      icon: DiamondPlus,
      label: null,
    },
  ];

  return (
    <div className="border border-l-0 gap-2 w-full flex p-1.5">
      <div
        onClick={toggleSidebar}
        className="flex justify-center items-center hover:bg-zinc-900 hover:text-white text-zinc-500 rounded-lg transition-all px-4"
      >
        <PanelRightOpen size={19} strokeWidth={2.5} />
      </div>
      {items.map((i, idx) => (
        <div
          key={idx}
          className="flex cursor-default justify-center items-center gap-2 border px-2 py-1.5 hover:bg-zinc-900 hover:text-white text-zinc-500 rounded-md transition-all"
        >
          <span>{<i.icon size={17} strokeWidth={2.5} />}</span>
          <p className="text-sm font-medium text-[#E3E4E7]">{i.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Topbar;
