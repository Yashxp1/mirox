'use client';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import { useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <main className="flex min-h-screen">
      <div>{isSidebarOpen && <Sidebar />}</div>
      <div className="flex-1 transition-all duration-300">
        <Topbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </main>
  );
}
