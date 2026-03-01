"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, Calendar } from "lucide-react";

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

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications");
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review applicant submissions here.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
                <th className="p-4">Applicant</th>
                <th className="p-4">Job Title</th>
                <th className="p-4">Resume</th>
                <th className="p-4">Cover Note</th>
                <th className="p-4">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B41E3]"></div>
                    </div>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
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
                        <span className="text-gray-400 italic">
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
                        {new Date(app.created_at).toLocaleDateString()}
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
