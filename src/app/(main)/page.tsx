import React from "react";
import { HeroSection } from "@/components/ui/HeroSection";
import { CompaniesSection } from "@/components/ui/CompaniesSection";
import { CategoriesSection } from "@/components/ui/CategoriesSection";
import { CTABannerSection } from "@/components/ui/CTABannerSection";
import { FeaturedJobsSection } from "@/components/ui/FeaturedJobsSection";
import { LatestJobsSection } from "@/components/ui/LatestJobsSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  let jobs = [];
  try {
    const res = await fetch("http://localhost:5000/api/jobs", {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      jobs = data.data || [];
    }
  } catch (error) {
    console.error("Failed to fetch jobs for homepage:", error);
  }

  return (
    <div className="w-full">
      <HeroSection />
      <CompaniesSection />
      <CategoriesSection />
      <CTABannerSection />
      <FeaturedJobsSection jobs={jobs.slice(0, 8)} />
      <LatestJobsSection jobs={jobs.slice(0, 8)} />
    </div>
  );
}
