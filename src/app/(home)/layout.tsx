import { AppProviders } from '@/providers/AppProvider';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} antialiased text-zinc-800 dark:text-zinc-200`}
    >
      <AppProviders>
        <main>{children}</main>
      </AppProviders>
    </div>
  );
}
