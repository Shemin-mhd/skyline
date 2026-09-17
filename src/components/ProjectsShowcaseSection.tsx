"use client";

import React, { useState } from "react";

const projects = [
  { title: "Luxury Villa", subtitle: "Home Theater & Acoustics", image: "/images/projects-villa.jpg" },
  { title: "Penthouse Residence", subtitle: "Star Sky Lighting & Insulation", image: "/images/hero-slide2.jpg" },
  { title: "Commercial Tower", subtitle: "Full Fit-Out & Soundproofing", image: "/images/hero-slide3.jpg" },
  { title: "Boutique Hotel", subtitle: "Guest Room Acoustic Insulation", image: "/images/new-build-villa.jpg" },
];

export default function ProjectsShowcaseSection() {
  const [currentIdx, setCurrentIdx] = useState(0);

  return (
    <section id="projects" className="w-full bg-white py-14 sm:py-20 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-10">

        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] uppercase">
            Projects
          </h2>
          <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
            A selection of our turnkey work across private villas, luxury hotels, commercial towers, and cinemas.
          </p>
        </div>

        {/* Project Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className={`bg-white overflow-hidden border transition-all duration-300 cursor-pointer ${idx === currentIdx ? "border-black shadow-lg scale-[1.02]" : "border-gray-200/80 hover:shadow-md"
                }`}
              onClick={() => setCurrentIdx(idx)}
            >
              <div className="h-[210px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif font-normal text-lg sm:text-xl text-[#111] tracking-tight">{p.title}</h3>
                <p className="font-sans text-xs text-gray-500 mt-1">{p.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
