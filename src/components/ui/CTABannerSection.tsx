import React from "react";
import Image from "next/image";
import { Button } from "@/components/common/Button";

import bannerBg from "@/assets/ctaBanner/blue background.png";
import dashboardImg from "@/assets/ctaBanner/dashboardImage.png";

export function CTABannerSection() {
  return (
    <section className="pt-20 bg-white w-full overflow-hidden">
      <div className="container-custom relative">
        <div className="relative w-full flex items-stretch min-h-[450px]">
          {/* Background Shape */}
          <div className="absolute inset-0 z-0 flex justify-start w-full md:w-[110%] -left-[5%]">
            <Image
              src={bannerBg}
              alt="Background Shape"
              className="object-contain object-left w-full h-full"
            />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch justify-between w-full h-full px-8 md:px-16 lg:px-24">
            {/* Text Content */}
            <div className="max-w-md text-white w-full lg:w-1/2 mb-12 lg:mb-0 flex flex-col justify-center py-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
                Start posting jobs
                <br />
                today
              </h2>
              <p className="text-blue-50 mb-8 font-medium">
                Start posting jobs for only $10.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#3B41E3] hover:bg-gray-50 h-12 px-8 font-semibold w-fit"
              >
                Sign Up For Free
              </Button>
            </div>

            {/* Dashboard Image */}
            <div className="w-full lg:w-1/2 flex justify-end items-end relative z-10 translate-x-0 lg:translate-x-12 mt-8 lg:mt-35">
              <Image
                src={dashboardImg}
                alt="Job Dashboard Preview"
                className="w-full h-auto max-w-[650px] object-contain shadow-2xl rounded-t-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
