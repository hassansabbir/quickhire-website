import React from "react";

import company1 from "@/assets/companyWeHelped/vodafon.png";
import company2 from "@/assets/companyWeHelped/intel.png";
import company3 from "@/assets/companyWeHelped/tesla.png";
import company4 from "@/assets/companyWeHelped/vodafon.png";
import company5 from "@/assets/companyWeHelped/amd-logo-1.png";
import Image from "next/image";

export function CompaniesSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-10 w-full">
      <div className="container-custom">
        <p className="text-sm text-gray-500 mb-6 font-medium">
          Companies we helped grow
        </p>
        <div className="flex flex-wrap items-center justify-between gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Emulated Logos */}
          <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <Image src={company1} alt="Company 1" className="h-10 w-auto" />
          </div>
          <div className="flex items-center font-bold text-3xl font-serif text-blue-600">
            <Image src={company2} alt="Company 2" className="h-10 w-auto" />
          </div>
          <div className="flex items-center font-bold text-2xl tracking-widest text-[#E82127]">
            <Image src={company3} alt="Company 3" className="h-8 w-auto" />
          </div>
          <div className="flex items-center font-bold text-3xl text-gray-800">
            <Image src={company4} alt="Company 4" className="h-10 w-auto" />
          </div>
          <div className="flex items-center font-bold text-2xl text-[#1E3A8A]">
            <Image src={company5} alt="Company 5" className="h-8 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
