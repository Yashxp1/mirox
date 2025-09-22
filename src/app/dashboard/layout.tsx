'use client';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full">
      <Sidebar />
      {children}
    </div>
  );
}
