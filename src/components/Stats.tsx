"use client";

import React from "react";

export default function Stats() {
  const statItems = [
    {
      number: "50+",
      label: "Projects",
    },
    {
      number: "100%",
      label: "Client Satisfaction",
    },
    {
      number: "Bahrain / KSA / GCC",
      label: "Our Presence",
    },
  ];

  return (
    <section className="w-full bg-[#FBF9F5] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E0D8] text-center md:text-left">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center py-6 md:py-0 ${idx === 0 ? "md:pr-12" : idx === 1 ? "md:px-12" : "md:pl-12"
                }`}
            >
              <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1815] tracking-tight">
                {item.number}
              </span>
              <span className="font-sans text-xs sm:text-sm text-[#6B6355] mt-2 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
