"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/assets/quickHireLogo.png";
import { Button } from "@/components/common/Button";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm py-0"
          : "bg-transparent border-b border-transparent py-2"
      }`}
    >
      <div className="container-custom h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoImg} alt="QuickHire" className="h-8 w-auto" />
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Browse Companies
            </Link>
          </nav>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-[#3B41E3] font-semibold hover:bg-blue-50"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              variant="primary"
              className="bg-[#4640DE] hover:bg-[#322bb8] text-white"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
