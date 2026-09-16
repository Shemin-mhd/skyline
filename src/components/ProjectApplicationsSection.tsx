"use client";

import React from "react";

const apps = [
  { title: "Villas", image: "/images/villa-bright.jpg" },
  { title: "Hotels", image: "/images/hero-slide2.jpg" },
  { title: "Apartments", image: "/images/hero-slide3.jpg" },
  { title: "Home Theaters", image: "/images/theater-bright.jpg" },
  { title: "Gyms", image: "/images/gym-bright.jpg" },
  { title: "Commercial", image: "/images/fitout-bright.jpg" },
  { title: "Fit-Out", image: "/images/bedroom-bright.jpg" },
  { title: "Residences", image: "/images/starsky-bright.jpg" },
];

export default function ProjectApplicationsSection() {
  return (
    <section id="applications" className="w-full bg-[#F5F5F7] py-14 sm:py-20 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-10">

        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
            APPLICATION SECTORS
          </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111] tracking-tight">
              Solutions For Every Space
            </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
            From luxury private villas to commercial complexes, we deliver acoustic and specialty solutions designed around your exact spatial needs.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {apps.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden h-[200px] sm:h-[240px] cursor-pointer shadow-xs hover:shadow-lg transition-all duration-500 border border-gray-200/50"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 z-10">
                <span className="font-serif text-base sm:text-lg font-normal text-white tracking-tight">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
