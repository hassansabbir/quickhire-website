import React from "react";
import { Badge } from "@/components/common/Badge";

interface JobCardProps {
  logo?: React.ReactNode;
  companyName: string;
  location: string;
  title: string;
  type: string;
  categories: {
    label: string;
    variant: "green" | "blue" | "purple" | "orange" | "red" | "gray";
  }[];
  description?: string;
}

export function JobCard({
  logo,
  companyName,
  location,
  title,
  type,
  categories,
  description,
}: JobCardProps) {
  return (
    <div className="group relative border border-gray-100 rounded-none p-6 hover:shadow-lg transition-all bg-white flex flex-col items-start text-left min-h-[300px]">
      <div className="flex justify-between items-start w-full mb-6">
        <div className="w-12 h-12 flex items-center shrink-0 text-4xl">
          {logo || <div className="w-8 h-8 bg-gray-300 rounded-full" />}
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded border border-[#3B41E3]/30 text-[#3B41E3] bg-white">
          {type}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#3B41E3] transition-colors leading-tight">
        {title}
      </h3>
      <p className="text-[15px] font-medium text-gray-500 mb-4 tracking-wide">
        {companyName} <span className="mx-1 font-normal text-gray-400">•</span>{" "}
        {location}
      </p>

      {description && (
        <p className="text-[15px] text-gray-500 mb-6 leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex flex-wrap gap-2 mt-auto">
        {categories.map((cat, i) => (
          <Badge
            key={i}
            variant={cat.variant}
            className="border-none font-semibold capitalize px-3 py-1 rounded-full"
          >
            {cat.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
