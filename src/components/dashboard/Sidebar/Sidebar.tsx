import React, { useRef, useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarContent from './SidebarContent';

interface SidebarProps {
  workspace: any; // or define a proper type if you know the shape, e.g. Workspace
  workspaceError: boolean;
}


const Sidebar = ({  workspace, workspaceError  }: SidebarProps) => {
  const [width, setWidth] = useState(240);
  const isResizing = useRef(false);

  const startResize = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  const handleResize = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = Math.min(Math.max(e.clientX, 220), 350);
    setWidth(newWidth);
  };

  const stopResize = () => {
    isResizing.current = false;
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };

  return (
    <div
      className="h-screen w-full relative transition-all duration-200"
      style={{ width }}
    >
      <SidebarHeader workspace={workspace} workspaceError={workspaceError}/>
      <SidebarContent />
      <div
        className="hover:border-r-zinc-500 hover:border border transition-all absolute top-0 right-0 h-screen  cursor-col-resize"
        onMouseDown={startResize}
      ></div>
    </div>
  );
};

export default Sidebar;
