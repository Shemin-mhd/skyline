"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Settings, Star } from "lucide-react";

interface HomeTheaterSectionProps {
  onOpenQuoteModal: () => void;
}

export default function HomeTheaterSection({ onOpenQuoteModal }: HomeTheaterSectionProps) {
  return (
    <section id="home-theater" className="w-full bg-white py-14 md:py-20 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column (5.5 cols) - Crisp Native Typography & Blueprint Artwork */}
          <div className="lg:col-span-6 xl:col-span-5 space-y-6">
            {/* Main Title - Elegant Editorial Serif */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-normal text-black leading-[1.12] tracking-tight">
              Crafting Spaces <br />
              With Precision.
            </h2>

            {/* Paragraph Description - Neutral Charcoal */}
            <p className="font-sans text-sm sm:text-[15px] text-gray-700 leading-relaxed max-w-md">
              Skylink Acoustics delivers professional acoustic solutions designed to improve sound quality, reduce unwanted noise, control reverberation and create comfortable, high-performance spaces.
            </p>

            {/* Learn More Button */}
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 border border-black/20 text-black font-sans text-xs sm:text-sm font-semibold px-7 py-3 rounded-full shadow-xs uppercase tracking-wide transition-all hover:border-black/40 active:scale-[0.98]"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </Link>
            </div>

            {/* High-Resolution Perspective Architectural Sketch Transition */}
            <div className="pt-2">
              <div className="relative w-full overflow-hidden shadow-sm border border-gray-200/80 bg-white">
                <img
                  src="/images/about-sketch-render.jpg"
                  alt="Architectural Blueprint to Reality Living Room Cinema"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column (6.5 cols) - 3 High-Resolution Crisp Feature Cards */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4 sm:space-y-5">
            {/* Card 1: Acoustic Expertise */}
            <Link
              href="/acoustic-insulation"
              className="bg-[#F6F6F6] p-4 sm:p-5 border border-gray-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 sm:gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group block"
            >
              <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                {/* 5 Vertical Soundwave Equalizer Bars */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200/80 rounded-full flex items-center justify-center shrink-0 group-hover:bg-black transition-colors">
                  <div className="flex items-center justify-center gap-[3px] h-7">
                    <span className="w-1 h-3 bg-black group-hover:bg-white transition-colors" />
                    <span className="w-1 h-5 bg-black group-hover:bg-white transition-colors" />
                    <span className="w-1 h-7 bg-black group-hover:bg-white transition-colors" />
                    <span className="w-1 h-5 bg-black group-hover:bg-white transition-colors" />
                    <span className="w-1 h-3 bg-black group-hover:bg-white transition-colors" />
                  </div>
                </div>

                <div className="min-w-0 pr-2">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-black leading-snug tracking-tight">
                    Acoustic Expertise
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-gray-600 mt-1 leading-relaxed">
                    Engineered for clarity, comfort and performance.
                  </p>
                </div>
              </div>

              {/* High-Res Thumbnail */}
              <div className="w-40 sm:w-52 md:w-56 h-26 sm:h-30 overflow-hidden shrink-0 border border-gray-200 shadow-xs">
                <img
                  src="/images/acoustic-slats.jpg"
                  alt="Acoustic Wall Treatment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Card 2: Turnkey Solutions */}
            <Link
              href="/fit-out"
              className="bg-[#F6F6F6] p-4 sm:p-5 border border-gray-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 sm:gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group block"
            >
              <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200/80 rounded-full flex items-center justify-center shrink-0 group-hover:bg-black transition-colors">
                  <Settings className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] text-black group-hover:text-white transition-colors" />
                </div>

                <div className="min-w-0 pr-2">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-black leading-snug tracking-tight">
                    Turnkey Solutions
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-gray-600 mt-1 leading-relaxed">
                    From design to installation — we handle it all.
                  </p>
                </div>
              </div>

              {/* High-Res Thumbnail */}
              <div className="w-40 sm:w-52 md:w-56 h-26 sm:h-30 overflow-hidden shrink-0 border border-gray-200 shadow-xs">
                <img
                  src="/images/fitout-after.jpg"
                  alt="Turnkey Fit-Out Project"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>

            {/* Card 3: Premium Experiences */}
            <Link
              href="/star-sky"
              className="bg-[#F6F6F6] p-4 sm:p-5 border border-gray-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 sm:gap-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group block"
            >
              <div className="flex items-center gap-4 sm:gap-5 flex-1 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-200/80 rounded-full flex items-center justify-center shrink-0 group-hover:bg-black transition-colors">
                  <Star className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] text-black group-hover:text-white transition-colors" />
                </div>

                <div className="min-w-0 pr-2">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-black leading-snug tracking-tight">
                    Premium Experiences
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-gray-600 mt-1 leading-relaxed">
                    Spaces that look stunning and feel extraordinary.
                  </p>
                </div>
              </div>

              {/* High-Res Thumbnail */}
              <div className="w-40 sm:w-52 md:w-56 h-26 sm:h-30 overflow-hidden shrink-0 border border-gray-200 shadow-xs">
                <img
                  src="/images/theater-bright.jpg"
                  alt="Acoustic Cinema Excellence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
