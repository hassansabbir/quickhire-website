"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Edit } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  created_at: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== id));
      } else {
        alert("Failed to delete job");
      }
    } catch (err) {
      alert("An error occurred while deleting");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Listings</h1>
          <p className="text-gray-500 mt-1">
            Manage and view all active job postings on QuickHire.
          </p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="flex items-center gap-2 bg-[#3B41E3] hover:bg-[#322bb8] text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
        >
          <Plus className="w-5 h-5" />
          Post New Job
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B41E3]"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Job Title
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Company
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700">
                    Date Posted
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No jobs found. Click &quot;Post New Job&quot; to create
                      one.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr
                      key={job.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {job.title}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {job.company} • {job.location}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-[#3B41E3] font-medium text-sm rounded-full capitalize">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {new Date(job.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => alert("Editing coming soon!")}
                            className="p-2 text-gray-400 hover:text-[#3B41E3] hover:bg-blue-50 rounded-lg transition-colors"
                            aria-label="Edit job"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Delete job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
