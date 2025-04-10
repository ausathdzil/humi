import { Header } from "@/components/layout/header";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  style: ["italic"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Humi",
  description: "Visualize your music",
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
        <Header />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  );
}
