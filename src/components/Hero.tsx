"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onOpenQuoteModal: () => void;
}

const heroSlides = [
  { src: "/images/timber-villa.jpg", alt: "Skylink Modern Architectural Timber Villa" },
  { src: "/images/hero-villa.jpg", alt: "Skylink Luxury Villa Interior" },
  { src: "/images/hero-slide2.jpg", alt: "Skylink Ocean View Villa" },
];

const stats = [
  { num: "65", suffix: "+", label: "Projects Completed" },
  { num: "7", suffix: "+", label: "Years Experience" },
  { num: "180", suffix: "+", label: "Satisfied Clients" },
];

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 3500);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="relative w-full bg-[#F5F5F7] border-b border-gray-200/80 min-h-[calc(100vh-76px)] flex items-center">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 lg:py-12 flex flex-col justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Left Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2.5">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
                ACOUSTIC &amp; SPECIALTY CONTRACTORS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em]">
                Acoustic &amp; Specialty Solutions
                <span className="block text-gray-500 font-sans font-normal text-base sm:text-lg lg:text-xl mt-2 tracking-normal">
                  From 100 m² — Turnkey in 2 Months
                </span>
              </h1>
            </div>

            <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
              Smart Engineering. Better Spaces. Exceptional Experiences. We build thoughtfully designed acoustic environments for comfortable living.
            </p>

            <div className="flex flex-wrap gap-3.5 items-center pt-1">
              <a
                href="https://wa.me/97470076272"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all"
              >
                <span>WhatsApp Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs rounded-full transition-all cursor-pointer"
              >
                <span>Request Quote</span>
              </button>
            </div>

            {/* Stats - Clean inline without box */}
            <div className="pt-2 max-w-lg">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 divide-x divide-gray-300/80">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`space-y-1 ${idx > 0 ? "pl-4 sm:pl-6" : ""}`}>
                    <div className="flex items-baseline">
                      <span className="font-sans text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#111] tracking-tight leading-none">
                        {stat.num}
                      </span>
                      <span className="font-sans text-lg sm:text-xl font-medium text-[#C49B5B] ml-0.5 select-none">
                        {stat.suffix}
                      </span>
                    </div>
                    <span className="block font-sans text-xs sm:text-[13px] text-gray-600 font-medium leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Architectural Image - Responsive height with curved corners */}
          <div className="lg:col-span-6 relative w-full">
            <div className="relative overflow-hidden w-full h-[320px] sm:h-[420px] lg:h-[480px] xl:h-[520px] shadow-2xl border border-gray-200/60 bg-black rounded-2xl sm:rounded-3xl">
              {heroSlides.map((slide, idx) => (
                <img
                  key={idx}
                  src={slide.src}
                  alt={slide.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${idx === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
