import { AuthButton } from '@/components/auth-button';
import { Loader } from 'lucide-react';
import type { Metadata } from 'next';
import { Lora } from 'next/font/google';
import localFont from 'next/font/local';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
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
        className={`${pretendard.variable} ${lora.variable} font-sans antialiased min-h-screen flex flex-col`}
        style={{ fontFeatureSettings: "'ss01', 'ss02', 'ss08'" }}
      >
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}

function Loading() {
  return (
    <main className="grow bg-background flex items-center justify-center">
      <Loader className="animate-spin" />
    </main>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 sm:px-8 md:px-16 py-4 transition-all border-b bg-background/80 backdrop-blur-md">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center justify-between gap-4 sm:gap-8">
          <li>
            <Link
              className="hover:text-primary transition-colors flex items-center gap-2 font-bold text-xl sm:text-2xl"
              href="/"
            >
              <Image src="/humi.svg" alt="Humi Logo" width={28} height={28} />
              <span className="hidden sm:block">Humi</span>
            </Link>
          </li>
        </ul>
        <Suspense fallback={null}>
          <AuthButton />
        </Suspense>
      </nav>
    </header>
  );
}
