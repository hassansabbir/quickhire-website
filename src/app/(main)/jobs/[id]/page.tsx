import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Calendar,
  Briefcase,
} from "lucide-react";
import { Badge } from "@/components/common/Badge";
import ApplyForm from "@/app/(main)/jobs/[id]/ApplyForm";

async function getJob(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export default async function JobDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Await the entire params object before destructuring its properties
  const tempParams = await params;
  const job = await getJob(tempParams.id);

  if (!job) {
    return (
      <div className="container-custom py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Not Found</h1>
        <p className="text-gray-500 mb-8">
          The job you are looking for does not exist or has been removed.
        </p>
        <Link href="/" className="text-[#3B41E3] font-semibold hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    );
  }

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
      {/* Header Banner */}
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="container-custom max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>

          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shrink-0 ${getLogoColors(job.company)}`}
            >
              {job.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600 font-medium text-sm md:text-base mb-6">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  Full Time
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
              <Badge variant="blue" className="px-4 py-1.5 capitalize text-sm">
                {job.category}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom max-w-4xl mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Job Description
            </h2>
            <div className="prose max-w-none text-gray-600 space-y-4 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Apply for this Job
            </h3>
            <ApplyForm jobId={job.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
