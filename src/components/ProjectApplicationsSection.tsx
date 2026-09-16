"use client";

import React from "react";

const sectors = [
  {
    title: "Residential",
    tag: "HOMES & LUXURY LIVING",
    image: "/images/villa-bright.jpg",
    items: ["Villas", "Apartments", "Home Theaters", "Bedrooms", "Entertainment Rooms", "Private Gyms"],
  },
  {
    title: "Hospitality",
    tag: "HOTELS & LEISURE",
    image: "/images/bedroom-bright.jpg",
    items: ["Hotels", "Guest Rooms", "Restaurants", "Lounges", "VIP Areas", "Common Areas"],
  },
  {
    title: "Commercial",
    tag: "WORKPLACES & RETAIL",
    image: "/images/fitout-bright.jpg",
    items: ["Offices", "Meeting Rooms", "Retail Spaces", "Restaurants", "Fitness Centers", "Large Commercial Projects"],
  },
  {
    title: "Construction & Fit-Out",
    tag: "DEVELOPMENT & FIT-OUT",
    image: "/images/new-build-villa.jpg",
    items: ["New Developments", "Renovation Projects", "Interior Fit-Outs", "Large-Scale Developments", "Acoustic Upgrades"],
  },
];

export default function ProjectApplicationsSection() {
  return (
    <section id="applications" className="w-full bg-[#FAF9F6] py-14 sm:py-20 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-10">

        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] uppercase">
            Solutions for Every Space
          </h2>
          <p className="text-gray-700 font-sans text-sm sm:text-base md:text-lg font-medium italic leading-relaxed">
            “One acoustic partner for multiple project requirements.”
          </p>
        </div>

        {/* 4 Architectural Sector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((sector, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-black">
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-300 block">
                    {sector.tag}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-white mt-0.5">
                    {sector.title}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <ul className="space-y-2">
                  {sector.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2 text-xs font-sans text-gray-600 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
