"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  created_at: string;
}

export default function JobListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; location?: string }>;
}) {
  const unwrappedParams = use(searchParams);
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // Input states (only applied to filter when searching)
  const [searchQuery, setSearchQuery] = useState(unwrappedParams.query || "");
  const [locationQuery, setLocationQuery] = useState(
    unwrappedParams.location || "",
  );
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/jobs");
      const data = await res.json();
      if (data.success) {
        setJobs(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (locationQuery) params.set("location", locationQuery);
    router.push(`/jobs?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setSelectedCategory("");
    router.push("/jobs");
  };

  // Compute filtered jobs from active URL params and selected category
  const filteredJobs = jobs.filter((job) => {
    const activeQuery = unwrappedParams.query || "";
    const activeLocation = unwrappedParams.location || "";

    const matchesQuery =
      job.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(activeQuery.toLowerCase());
    const matchesLocation = job.location
      .toLowerCase()
      .includes(activeLocation.toLowerCase());
    const matchesCategory = selectedCategory
      ? job.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;

    return matchesQuery && matchesLocation && matchesCategory;
  });

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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Search Header */}
      <div className="bg-[#3B41E3] py-16 mt-20 px-6 relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-6">
            Find Your Dream Job
          </h1>
          <form
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 bg-white p-2 rounded-xl shadow-lg"
          >
            <div className="flex-1 flex items-center px-4 bg-white rounded-lg">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-200 self-center"></div>
            <div className="flex-1 flex items-center px-4 bg-white rounded-lg border-t md:border-t-0 border-gray-100">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="City or remote"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full px-3 py-3 focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="h-12 md:w-auto px-8 w-full justify-center"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="container-custom mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Filter By Category
            </h3>
            <div className="space-y-3">
              {[
                "All",
                "Engineering",
                "Design",
                "Marketing",
                "Sales",
                "Management",
                "Finance",
              ].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat === "All" ? "" : cat.toLowerCase()}
                    checked={
                      selectedCategory ===
                      (cat === "All" ? "" : cat.toLowerCase())
                    }
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-4 h-4 text-[#3B41E3] border-gray-300 focus:ring-[#3B41E3]"
                  />
                  <span
                    className={`text-base font-medium transition-colors ${selectedCategory === (cat === "All" ? "" : cat.toLowerCase()) ? "text-[#3B41E3]" : "text-gray-600 group-hover:text-gray-900"}`}
                  >
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"}{" "}
              Found
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B41E3]"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No jobs match your filters
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search query or removing some filters.
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Link
                  href={`/jobs/${job.id}`}
                  key={job.id}
                  className="block group"
                >
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all sm:flex items-center justify-between gap-6">
                    <div className="flex items-start gap-4 flex-1 mb-4 sm:mb-0">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-xl font-bold shrink-0 ${getLogoColors(job.company)}`}
                      >
                        {job.company.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#3B41E3] transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1 mb-3">
                          <span className="font-medium text-gray-700">
                            {job.company}
                          </span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant="blue"
                            className="bg-blue-50 text-[#3B41E3] border-none capitalize"
                          >
                            {job.category}
                          </Badge>
                          <Badge
                            variant="green"
                            className="bg-green-50 text-green-700 border-none capitalize"
                          >
                            Full Time
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <p className="text-sm text-gray-400 mb-3">
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                      <span className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg bg-gray-50 text-gray-700 group-hover:bg-[#3B41E3] group-hover:text-white transition-colors">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
