import React from "react";
import Link from "next/link";
import { Badge } from "@/components/common/Badge";
import Image from "next/image";

import bgImage from "@/assets/latestJobsSection/BG.png";
import patternImage from "@/assets/latestJobsSection/bgPattern.png";

export function LatestJobsSection({ jobs = [] }: { jobs: any[] }) {
  const getLogoColors = (name: string) => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
    ];
    const charCode = name.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  return (
    <section className="py-24 w-full relative overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-y-0 right-0 w-full md:w-3/4 lg:w-1/2 z-0 pointer-events-none">
        <Image
          src={patternImage}
          alt="Pattern"
          fill
          className="object-contain object-right"
        />
      </div>

      <div className="absolute inset-x-0 top-0 h-px bg-gray-200 z-10" />
      <div className="container-custom relative z-10">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Latest <span className="text-blue-400">jobs open</span>
          </h2>
          <Link
            href="#"
            className="font-semibold text-[#3B41E3] hover:text-blue-700 hidden md:flex items-center gap-2"
          >
            Show all jobs <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          {jobs.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No recent jobs available right now.
            </p>
          ) : (
            jobs.map((job) => (
              <Link
                href={`/jobs/${job.id}`}
                key={job.id}
                className="flex bg-white items-center p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mr-6 shrink-0 overflow-hidden">
                  <div
                    className={`w-full h-full flex items-center justify-center text-white text-2xl font-bold ${getLogoColors(job.company)}`}
                  >
                    {job.company.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#3B41E3] transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {job.company} • {job.location}
                  </p>
                  <div className="flex gap-2">
                    <Badge
                      variant="green"
                      className="bg-green-50 border border-green-200"
                    >
                      Full Time
                    </Badge>
                    <Badge
                      variant="blue"
                      className="bg-transparent border border-blue-200 capitalize"
                    >
                      {job.category}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
