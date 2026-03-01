import React from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Facebook, Instagram, Dribbble, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "Dribbble", icon: Dribbble },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Twitter", icon: Twitter },
];

export function Footer() {
  return (
    <footer className="bg-[#191B21] text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-gray-800 pb-12 mb-8">
          <div className="col-span-1 md:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#3B41E3] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                QuickHire
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed pr-8">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-lg mb-6">About</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Advice
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Help Docs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Guide
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Updates
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4">
            <h4 className="font-semibold text-lg mb-6">
              Get job notifications
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white text-gray-900 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#3B41E3]"
              />
              <Button variant="primary" className="whitespace-nowrap px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>2026 @ QuickHire. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {socialLinks.map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href="#"
                className="hover:text-white transition-colors"
                aria-label={name}
              >
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center transition-colors hover:bg-[#3B41E3]">
                  <Icon className="w-4 h-4 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
