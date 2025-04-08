"use client";

import { AuthButton } from "@/components/auth-button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 px-16 py-8 transition-all duration-200 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
      }`}
    >
      <nav className="flex items-center justify-between">
        <ul className="flex items-center justify-between gap-8">
          <li>
            <Link
              className="hover:text-primary transition-colors flex items-center gap-2 font-bold text-2xl"
              href="/"
            >
              <Image src="/humi.svg" alt="Humi" width={32} height={32} />
              <span>Humi</span>
            </Link>
          </li>
          {/* <li>
            <Link
              className="hover:text-primary transition-colors"
              href="/features"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-primary transition-colors"
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link className="hover:text-primary transition-colors" href="/blog">
              Blog
            </Link>
          </li> */}
        </ul>
        <AuthButton />
      </nav>
    </header>
  );
}
