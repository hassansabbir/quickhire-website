import React from "react";

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  jobCount: number;
  highlighted?: boolean;
}

export function CategoryCard({
  icon,
  title,
  jobCount,
  highlighted,
}: CategoryCardProps) {
  return (
    <div
      className={`group p-6 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between items-start text-left min-h-[160px] ${
        highlighted
          ? "bg-[#3B41E3] text-white border-[#3B41E3] shadow-md"
          : "bg-white text-gray-900 border-gray-200 hover:bg-[#3B41E3] hover:text-white hover:border-[#3B41E3] hover:shadow-md"
      }`}
    >
      <div className="mb-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 ${
            highlighted ? "text-white" : "text-[#3B41E3] group-hover:text-white"
          }`}
        >
          {icon}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <div
          className={`text-sm flex items-center gap-1 transition-colors duration-300 ${
            highlighted
              ? "text-blue-100"
              : "text-gray-500 group-hover:text-blue-100"
          }`}
        >
          {jobCount} jobs available
          <span className="ml-1 text-lg">→</span>
        </div>
      </div>
    </div>
  );
}
