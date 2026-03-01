import React from "react";
import Link from "next/link";
import { CategoryCard } from "@/features/jobs/components/CategoryCard";
import {
  PenTool,
  TrendingUp,
  Megaphone,
  DollarSign,
  MonitorSmartphone,
  Code,
  Briefcase,
  Users,
} from "lucide-react";

export function CategoriesSection() {
  return (
    <section className="py-24 bg-white w-full">
      <div className="container-custom">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Explore by <span className="text-blue-400">category</span>
          </h2>
          <Link
            href="#"
            className="font-semibold text-[#3B41E3] hover:text-blue-700 hidden md:flex items-center gap-2"
          >
            Show all jobs <span className="text-xl">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <CategoryCard
            title="Design"
            jobCount={235}
            icon={<PenTool className="w-5 h-5" />}
          />
          <CategoryCard
            title="Sales"
            jobCount={756}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <CategoryCard
            title="Marketing"
            jobCount={140}
            icon={<Megaphone className="w-5 h-5" />}
          />
          <CategoryCard
            title="Finance"
            jobCount={325}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <CategoryCard
            title="Technology"
            jobCount={436}
            icon={<MonitorSmartphone className="w-5 h-5" />}
          />
          <CategoryCard
            title="Engineering"
            jobCount={542}
            icon={<Code className="w-5 h-5" />}
          />
          <CategoryCard
            title="Business"
            jobCount={211}
            icon={<Briefcase className="w-5 h-5" />}
          />
          <CategoryCard
            title="Human Resource"
            jobCount={346}
            icon={<Users className="w-5 h-5" />}
          />
        </div>
      </div>
    </section>
  );
}
