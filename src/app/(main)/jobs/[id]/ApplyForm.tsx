"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume_link: "",
    cover_note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, job_id: jobId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(
          "Application Sent! The company will review your application soon.",
        );
        setFormData({ name: "", email: "", resume_link: "", cover_note: "" });
      } else {
        toast.error(data.message || "Failed to submit application.");
      }
    } catch (err) {
      toast.error("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Full Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-[#3B41E3] focus:border-[#3B41E3] text-sm transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-[#3B41E3] focus:border-[#3B41E3] text-sm transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="resume_link"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Resume Link (URL) *
        </label>
        <input
          id="resume_link"
          name="resume_link"
          type="url"
          required
          placeholder="https://..."
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-[#3B41E3] focus:border-[#3B41E3] text-sm transition-colors"
        />
      </div>

      <div>
        <label
          htmlFor="cover_note"
          className="block text-sm font-semibold text-gray-700 mb-1"
        >
          Cover Note *
        </label>
        <textarea
          id="cover_note"
          name="cover_note"
          required
          rows={4}
          onChange={handleChange}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-[#3B41E3] focus:border-[#3B41E3] text-sm transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-full justify-center h-12 font-semibold bg-[#3B41E3] hover:bg-[#322bb8]"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  );
}
