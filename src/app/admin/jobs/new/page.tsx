"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

export default function AddJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    category: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success("Job posted successfully!");
        router.push("/admin");
      } else {
        toast.error(
          data.message || "Failed to post job. Please check your inputs.",
        );
      }
    } catch (err: any) {
      toast.error(
        err.message || "An unexpected error occurred. Is the backend running?",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Listings
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
        <p className="text-gray-500 mt-1">
          Fill out the details below to create a new job posting.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Job Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Company Name *
              </label>
              <input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Google"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Location *
              </label>
              <input
                id="location"
                name="location"
                type="text"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Remote, San Francisco, CA"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
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
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Job Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={8}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and requirements..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3B41E3] focus:border-transparent transition-all resize-y"
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <Link href="/admin">
              <Button
                type="button"
                variant="outline"
                className="h-12 border-gray-200 text-gray-700"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              className="h-12 bg-[#3B41E3] hover:bg-[#322bb8] px-8 font-semibold flex items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
