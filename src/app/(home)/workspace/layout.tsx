'use client';
import { useGetOneWorkspaces } from '@/api-hooks/useWorkspaces';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const params = useParams();
  const id = params.id as string;

const { data: workspace, isError } = useGetOneWorkspaces(id);


  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <main className="flex min-h-screen transition-all duration-300">
      <div className="transition-all duration-300">
        {isSidebarOpen && <Sidebar workspace={workspace} workspaceError={isError} />}
      </div>
      <div className="flex-1 transition-all duration-300">
        <Topbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </main>
  );
}
