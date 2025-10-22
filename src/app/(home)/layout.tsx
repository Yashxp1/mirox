export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen((prev) => !prev);

  return (
    <main className="">
      {/* <div>{isSidebarOpen && <Sidebar />}</div> */}
      <div className="">
        {/* <Topbar toggleSidebar={toggleSidebar} /> */}
        {children}
      </div>
    </main>
  );
}
