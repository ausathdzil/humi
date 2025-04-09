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
      className={`sticky top-0 z-50 px-4 sm:px-8 md:px-16 py-4 transition-all border-b ${
        isScrolled ? "bg-background/80 backdrop-blur-md" : ""
      }`}
    >
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
        <AuthButton />
      </nav>
    </header>
  );
}
