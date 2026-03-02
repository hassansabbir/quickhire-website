"use client";

import { api } from "@/lib/api";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit,
  X,
  Save,
  Search,
  Briefcase,
  TrendingUp,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  created_at: string;
}

// ── Skeleton Row ──
function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100 animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-36"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
        </div>
      </td>
    </tr>
  );
}

// ── Relative Time Helper ──
function timeAgo(dateStr: string) {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffDay > 30) return date.toLocaleDateString();
  if (diffDay >= 1) return `${diffDay}d ago`;
  if (diffHr >= 1) return `${diffHr}h ago`;
  if (diffMin >= 1) return `${diffMin}m ago`;
  return "Just now";
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Edit modal state
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await api("/jobs");
      const data = await response.json();
      if (data.success) {
        setJobs(data.data);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ── Filtering ──
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchesCategory =
        !categoryFilter ||
        job.category.toLowerCase() === categoryFilter.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [jobs, searchQuery, categoryFilter]);

  // ── Stats ──
  const stats = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    jobs.forEach((j) => {
      const cat = j.category.toLowerCase();
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });
    const topCategory = Object.entries(categoryCount).sort(
      (a, b) => b[1] - a[1],
    )[0];
    const latestJob = jobs.length > 0 ? jobs[0] : null;

    return {
      total: jobs.length,
      topCategory: topCategory
        ? `${topCategory[0].charAt(0).toUpperCase() + topCategory[0].slice(1)} (${topCategory[1]})`
        : "—",
      latestDate: latestJob ? timeAgo(latestJob.created_at) : "—",
    };
  }, [jobs]);

  // ── Unique categories for dropdown ──
  const categories = useMemo(() => {
    const set = new Set(jobs.map((j) => j.category.toLowerCase()));
    return Array.from(set).sort();
  }, [jobs]);

  // ── Delete ──
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const response = await api(`/jobs/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setJobs(jobs.filter((job) => job.id !== id));
        toast.success("Job deleted successfully!");
      } else {
        toast.error(data.message || "Failed to delete job.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred while deleting.");
    }
  };

  // ── Edit ──
  const openEditModal = (job: Job) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setEditingJob(job);
    setEditForm({
      title: job.title,
      company: job.company,
      location: job.location,
      category: job.category,
      description: job.description || "",
    });
    requestAnimationFrame(() => setModalVisible(true));
  };

  const closeEditModal = () => {
    setModalVisible(false);
    closeTimeoutRef.current = setTimeout(() => setEditingJob(null), 200);
  };

  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    setSaving(true);

    try {
      const response = await api(`/jobs/${editingJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setJobs(
          jobs.map((job) =>
            job.id === editingJob.id ? { ...job, ...data.data } : job,
          ),
        );
        toast.success("Job updated successfully!");
        closeEditModal();
      } else {
        toast.error(data.message || "Failed to update job.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred while updating.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
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

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-[#3B41E3]" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Jobs</p>
            <p className="text-2xl font-bold text-gray-900">
              {loading ? (
                <span className="inline-block h-7 w-10 bg-gray-200 rounded animate-pulse" />
              ) : (
                stats.total
              )}
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Top Category</p>
            <p className="text-lg font-bold text-gray-900 capitalize">
              {loading ? (
                <span className="inline-block h-5 w-24 bg-gray-200 rounded animate-pulse" />
              ) : (
                stats.topCategory
              )}
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
          <div className="w-11 h-11 rounded-lg bg-purple-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Latest Post</p>
            <p className="text-lg font-bold text-gray-900">
              {loading ? (
                <span className="inline-block h-5 w-16 bg-gray-200 rounded animate-pulse" />
              ) : (
                stats.latestDate
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by title, company, or location..."
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent capitalize"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* ── Active Filters ── */}
      {(searchQuery || categoryFilter) && !loading && (
        <div className="flex items-center gap-2 flex-wrap text-sm">
          <span className="text-gray-500">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </span>
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#3B41E3] rounded-full font-medium">
              &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery("")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {categoryFilter && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium capitalize">
              {categoryFilter}
              <button onClick={() => setCategoryFilter("")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
            }}
            className="text-gray-400 hover:text-gray-600 underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Table ── */}
      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
                    Job Title
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
                    Company & Location
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
                    Category
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm">
                    Posted
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">
                    Actions
                  </th>
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
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                          <Briefcase className="w-7 h-7 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {searchQuery || categoryFilter
                            ? "No matching jobs"
                            : "No jobs posted yet"}
                        </h3>
                        <p className="text-gray-500 text-sm mb-4">
                          {searchQuery || categoryFilter
                            ? "Try adjusting your search or filters."
                            : 'Click "Post New Job" to create your first listing.'}
                        </p>
                        {(searchQuery || categoryFilter) && (
                          <button
                            onClick={() => {
                              setSearchQuery("");
                              setCategoryFilter("");
                            }}
                            className="text-[#3B41E3] font-medium text-sm hover:underline"
                          >
                            Clear filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job, index) => (
                    <tr
                      key={job.id}
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        index % 2 === 1 ? "bg-gray-50/30" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">
                          {job.title}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-700 font-medium">
                          {job.company}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {job.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-blue-50 text-[#3B41E3] font-medium text-xs rounded-full capitalize">
                          {job.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {timeAgo(job.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEditModal(job)}
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

      {/* ── Edit Job Modal ── */}
      {editingJob && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ease-out ${
            modalVisible ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={closeEditModal}
        >
          <div
            className={`bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-all duration-200 ease-out ${
              modalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Edit Job</h2>
              <button
                onClick={closeEditModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="edit-title"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Job Title *
                  </label>
                  <input
                    id="edit-title"
                    name="title"
                    type="text"
                    required
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-company"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Company Name *
                  </label>
                  <input
                    id="edit-company"
                    name="company"
                    type="text"
                    required
                    value={editForm.company}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-location"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Location *
                  </label>
                  <input
                    id="edit-location"
                    name="location"
                    type="text"
                    required
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-category"
                    className="block text-sm font-semibold text-gray-700 mb-1"
                  >
                    Category *
                  </label>
                  <select
                    id="edit-category"
                    name="category"
                    required
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Select a category</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="management">Management</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  Job Description *
                </label>
                <textarea
                  id="edit-description"
                  name="description"
                  required
                  rows={6}
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all resize-y"
                />
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#3B41E3] hover:bg-[#322bb8] text-white font-semibold transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
