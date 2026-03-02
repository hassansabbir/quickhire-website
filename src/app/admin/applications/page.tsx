"use client";

import { api } from "@/lib/api";

import React, { useState, useEffect, useMemo } from "react";
import { ExternalLink, Calendar, Search, X, Users } from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  resume_link: string;
  cover_note: string;
  job_id: {
    id: string;
    title: string;
    company: string;
  } | null;
  created_at: string;
}

// ── Skeleton Row ──
function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 animate-pulse">
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-36"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </td>
      <td className="p-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>
    </tr>
  );
}

// ── Relative Time Helper ──
function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDay > 30) return date.toLocaleDateString();
  if (diffDay >= 1) return `${diffDay}d ago`;
  const diffHr = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHr >= 1) return `${diffHr}h ago`;
  return "Just now";
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchApplications = async () => {
    try {
      const res = await api("/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // ── Filtering ──
  const filteredApplications = useMemo(() => {
    if (!searchQuery) return applications;
    const q = searchQuery.toLowerCase();
    return applications.filter((app) => {
      const matchesName = app.name.toLowerCase().includes(q);
      const matchesEmail = app.email.toLowerCase().includes(q);
      const matchesJob = app.job_id
        ? app.job_id.title.toLowerCase().includes(q) ||
          app.job_id.company.toLowerCase().includes(q)
        : false;
      return matchesName || matchesEmail || matchesJob;
    });
  }, [applications, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 mt-1">
            Review applicant submissions here.
          </p>
        </div>
      </div>

      {/* ── Stat Card ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center">
            <Users className="w-5 h-5 text-[#3B41E3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Total Applications
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? (
                <span className="inline-block h-7 w-10 bg-gray-200 rounded animate-pulse" />
              ) : (
                applications.length
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by applicant name, email, or job title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filters ── */}
      {searchQuery && !loading && (
        <div className="flex items-center gap-2 flex-wrap text-sm">
          <span className="text-gray-500">
            Showing {filteredApplications.length} of {applications.length}{" "}
            applications
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#3B41E3] rounded-full font-medium">
            &quot;{searchQuery}&quot;
            <button onClick={() => setSearchQuery("")}>
              <X className="w-3 h-3" />
            </button>
          </span>
        </div>
      )}

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
                <th className="p-4">Applicant</th>
                <th className="p-4">Job Title</th>
                <th className="p-4">Resume</th>
                <th className="p-4">Cover Note</th>
                <th className="p-4">Applied</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-7 h-7 text-gray-300" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {searchQuery
                          ? "No matching applications"
                          : "No applications received yet"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {searchQuery
                          ? "Try adjusting your search."
                          : "Applications will appear here once candidates apply."}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="mt-3 text-[#3B41E3] font-medium text-sm hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app, index) => (
                  <tr
                    key={app.id}
                    className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                      index % 2 === 1 ? "bg-gray-50/30" : ""
                    }`}
                  >
                    <td className="p-4">
                      <div className="font-semibold text-gray-900">
                        {app.name}
                      </div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </td>
                    <td className="p-4">
                      {app.job_id ? (
                        <>
                          <div className="font-medium text-gray-900">
                            {app.job_id.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {app.job_id.company}
                          </div>
                        </>
                      ) : (
                        <span className="text-gray-400 italic text-sm">
                          Job Deleted
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <a
                        href={app.resume_link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[#3B41E3] hover:underline font-medium"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Link
                      </a>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p
                        className="text-sm text-gray-600 truncate"
                        title={app.cover_note}
                      >
                        {app.cover_note}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {timeAgo(app.created_at)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
