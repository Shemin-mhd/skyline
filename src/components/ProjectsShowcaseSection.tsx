"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
              FEATURED PORTFOLIO
            </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111] tracking-tight leading-[1.1]">
                Spaces That Speak <br />
                For Themselves.
              </h2>
            <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
              A selection of our turnkey work across private villas, luxury hotels, commercial towers, and cinemas.
            </p>
          </div>

          {/* Navigation Arrows - Round Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentIdx((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
              aria-label="Previous Project"
              className="w-11 h-11 border border-gray-300 bg-white text-[#111] flex items-center justify-center hover:bg-gray-100 active:scale-95 transition-all shadow-xs rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentIdx((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
              aria-label="Next Project"
              className="w-11 h-11 bg-[#111] hover:bg-black text-white flex items-center justify-center active:scale-95 transition-all shadow-md rounded-full cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
