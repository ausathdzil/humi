import { Header } from "@/components/layout/header";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import Link from "next/link";
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
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="px-4 sm:px-8 md:px-16 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 bg-primary text-primary-foreground">
      <Link href="/" className="font-bold text-2xl">
        Humi
      </Link>
      <div className="flex flex-col gap-2">
        <span>Resources</span>
        <nav>
          <ul className="text-primary-foreground/80 space-y-2">
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/blog"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <span>Legal</span>
        <nav>
          <ul className="text-primary-foreground/80 space-y-2">
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                className="hover:text-primary-foreground transition-colors"
                href="/terms"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-2">
        <span>Social</span>
        <ul className="text-primary-foreground/80 space-y-2">
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://github.com/ausathdzil/humi"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://x.com/ausathdzil"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
          </li>
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://bsky.app/profile/ausathdzil.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bluesky
            </a>
          </li>
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="https://www.instagram.com/ausathdzil"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <span>Contact</span>
        <ul className="text-primary-foreground/80 space-y-2">
          <li>
            <a
              className="hover:text-primary-foreground transition-colors"
              href="mailto:mail@ausathikram.com"
            >
              mail@ausathikram.com
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
