
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className=" w-full h-screen bg-[#0F0F10]">{children}</div>;
}
