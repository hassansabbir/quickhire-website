import React from "react";
import Link from "next/link";
import { JobCard } from "@/features/jobs/components/JobCard";

export function FeaturedJobsSection({ jobs = [] }: { jobs: any[] }) {
  // Utility to generate a pseudo-random color for company initials
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
    <section className="py-24 bg-white w-full">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
            Featured <span className="text-[#00A3FF]">jobs</span>
          </h2>
          <Link
            href="#"
            className="font-semibold text-[#3B41E3] hover:text-blue-700 hidden md:flex items-center gap-2"
          >
            Show all jobs <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.length === 0 ? (
            <p className="text-gray-500 col-span-full">
              No featured jobs found right now.
            </p>
          ) : (
            jobs.map((job) => (
              <JobCard
                key={job.id}
                logo={
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${getLogoColors(job.company)}`}
                  >
                    {job.company.charAt(0).toUpperCase()}
                  </div>
                }
                title={job.title}
                companyName={job.company}
                location={job.location}
                type="Full Time" // Default since DB doesn't have it yet
                description={job.description}
                categories={[{ label: job.category, variant: "blue" }]}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
