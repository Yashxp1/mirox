import Header from '@/components/project/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full">
      <Header />
      {children}
    </div>
  );
}
