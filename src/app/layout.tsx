import { AuthInfo } from '@/components/auth-components';
import { SideNav } from '@/components/side-nav';
import { Button } from '@/components/ui/button';
import { Loader, SparklesIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  style: ['italic'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Humi',
  description: 'Visualize your music',
};

export const experimental_ppr = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.variable} ${lora.variable} rounded-full font-sans antialiased min-h-screen flex flex-col`}
        style={{ fontFeatureSettings: "'ss01', 'ss02', 'ss08'" }}
      >
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
        </Suspense>
        <Toaster
          richColors
          toastOptions={{
            style: {
              borderRadius: 'calc(infinity * 1px)',
            },
          }}
        />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 px-8 md:px-16 py-4 md:py-8 transition-all bg-background/90 backdrop-blur-sm">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center justify-between gap-4 sm:gap-8">
          <li>
            <Link
              aria-label="Home"
              className="hover:text-primary transition-colors flex items-center gap-3 font-bold text-xl sm:text-2xl"
              href="/"
            >
              <Image src="/humi.svg" alt="Humi Logo" width={28} height={28} />
              <span className="hidden sm:block">Humi</span>
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-2 sm:gap-4">
          <AuthInfo />
          <Button
            aria-label="Create Moodboard"
            variant="ghost"
            size="icon"
            asChild
          >
            <Link href="/create">
              <SparklesIcon />
            </Link>
          </Button>
          <SideNav />
        </div>
      </nav>
    </header>
  );
}

function Loading() {
  return (
    <main className="grow bg-background flex items-center justify-center">
      <Loader className="animate-spin" />
    </main>
  );
}
