"use client";

import React from "react";

export default function HowWeWorkSection() {
  const steps = [
    {
      num: "01",
      title: "Consultation & Design",
      desc: "Understand the project, develop the appropriate acoustic or specialty solution.",
      isFilled: true,
      icon: (
        // Consultation & Planning
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="24" cy="14" r="4.5" />
          <circle cx="13" cy="18" r="3.5" />
          <circle cx="35" cy="18" r="3.5" />
          <path d="M16 32h16c2.5 0 4-2 4-4v-1a6 6 0 0 0-6-6h-8a6 6 0 0 0-6 6v1c0 2 1.5 4 4 4z" />
          <path d="M8 30v-1a5 5 0 0 1 4-4.8" />
          <path d="M40 30v-1a5 5 0 0 0-4-4.8" />
          <path d="M12 36h24v2H12z" />
          <path d="M20 38v4M28 38v4" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Material & Installation",
      desc: "Supply and professionally install the selected system with quality-focused execution.",
      isFilled: false,
      icon: (
        // Engineering & Installation
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="10" width="32" height="28" rx="2" />
          <path d="M8 18h32M18 10v28M28 10v28" />
          <circle cx="33" cy="31" r="3" />
          <path d="M31 29l4 4" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Final Delivery",
      desc: "Complete the project on time with measurable results and satisfaction.",
      isFilled: true,
      icon: (
        // Final Handover & Certification
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 28h12a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H10l-4-4 6-4z" />
          <circle cx="34" cy="20" r="5" />
          <path d="M31 24l-9 9" />
          <path d="M24 31l2 2M26 29l2 2" />
        </svg>
      ),
    },
  ];

  return (
    <section id="process" className="w-full bg-[#F5F5F7] py-14 sm:py-20 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8 sm:mb-10">
          <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
            OUR PROCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
            Three Steps To Your Project
          </h2>
          <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
            A clear and structured process from concept to completion.
          </p>
        </div>

        {/* Circular Flowchart Layout */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 items-start">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative flex flex-col items-center text-center group">

                {/* Horizontal Arrow Line between circles (desktop) */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center absolute top-9 left-[62%] w-[76%] z-0 pointer-events-none">
                    <div className="w-full h-[1px] bg-gray-300 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-gray-400 rotate-45" />
                    </div>
                  </div>
                )}

                {/* Scaled-down Circular Node */}
                <div
                  className={`relative z-10 w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${step.isFilled
                      ? "bg-black text-white shadow-sm"
                      : "bg-white border-2 border-black text-black shadow-2xs"
                    }`}
                >
                  {step.icon}
                </div>

                {/* Step Number Tag */}
                <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mt-3">
                  STEP {step.num}
                </span>

                {/* Step Title & Description */}
                <div className="mt-1.5 space-y-1 px-2 max-w-[260px]">
                  <h3 className="font-serif text-base sm:text-lg font-normal text-black leading-snug tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
