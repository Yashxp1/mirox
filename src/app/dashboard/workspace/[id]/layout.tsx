'use client';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex bg-[#0F0F10] w-full">
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
