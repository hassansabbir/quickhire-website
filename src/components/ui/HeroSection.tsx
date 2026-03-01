"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/common/Button";
import heroBgPattern from "@/assets/bannerImageBackgroundPattern.png";
import heroPerson from "@/assets/bannerForegroundPersonImage.png";
import headingUnderline from "@/assets/bannerHeadingUnderline.png";

export function HeroSection() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("query", search);
    if (location) params.set("location", location);
    router.push(`/jobs?${params.toString()}`);
  };
  return (
    <section className="relative bg-white py-24 md:py-32 overflow-hidden w-full min-h-[600px] flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-3/4 z-0 pointer-events-none opacity-60">
        <Image
          src={heroBgPattern}
          alt="Pattern"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      <div className="container-custom relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#111827] mb-6 leading-[1.1]">
            Discover <br />
            more than <br />
            <span className="text-[#2563EB] relative inline-block">
              5000+ Jobs
              <Image
                src={headingUnderline}
                alt=""
                className="absolute w-[110%] -bottom-7 -left-2"
                aria-hidden="true"
              />
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-md">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          {/* Search Bar Container */}
          <form
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center gap-2"
          >
            <div className="flex-1 w-full relative flex items-center border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="w-5 h-5 text-gray-400 pl-4 pr-3 box-content" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title or keyword"
                className="w-full h-12 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent pr-4 min-w-[170px]"
              />
            </div>
            <div className="flex-1 w-full relative flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 pl-4 pr-3 box-content" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Florence, Italy"
                className="w-full h-12 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent pr-4"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto px-8 rounded-lg whitespace-nowrap bg-[#3B41E3] hover:bg-blue-700 h-12"
            >
              Search my job
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500">
            Popular: UI Designer, UX Researcher, Android, Admin
          </p>
        </div>

        <div className="hidden lg:block absolute bottom-36 right-0 w-1/2 h-full z-10 pointer-events-none">
          <Image
            src={heroPerson}
            alt="Job Seeker Pointing"
            className="object-contain object-bottom right-0 ml-auto translate-y-8"
            priority
          />
        </div>
      </div>
    </section>
  );
}
