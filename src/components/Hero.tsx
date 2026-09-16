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
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em] uppercase">
                Designed for Silence.<br />
                Engineered for Sound.
                <span className="block text-gray-500 font-sans font-normal text-base sm:text-lg lg:text-xl mt-3 tracking-normal normal-case">
                  Premium Acoustic &amp; Sound Solutions for Modern Spaces
                </span>
              </h1>
            </div>

            <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-lg">
              Skylink Acoustics delivers professional acoustic solutions designed to improve sound quality, reduce unwanted noise, control reverberation and create comfortable, high-performance spaces.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 items-center pt-1">
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all"
              >
                <span>Explore Solutions</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenQuoteModal}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-xs rounded-full transition-all cursor-pointer"
              >
                <span>Discuss Your Project</span>
              </button>
            </div>

            {/* Focus Areas Pills */}
            <div className="pt-2">
              <span className="text-[10px] font-sans font-bold tracking-[0.16em] text-gray-400 uppercase block mb-2">
                FOCUS AREAS:
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {[
                  "Acoustic Treatment",
                  "Acoustic Insulation",
                  "Home Theater Solutions",
                  "Luxury Starry Sky Lighting",
                  "Professional Installation",
                  "Sound Isolation",
                  "Impact Noise Control",
                  "Gym Floor Systems",
                  "Customized Design",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white border border-gray-200/90 text-[11px] font-sans font-medium text-gray-700 rounded-full shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats - Clean inline without box */}
            <div className="pt-1 max-w-lg">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 divide-x divide-gray-300/80">
                {stats.map((stat, idx) => (
                  <div key={idx} className={`space-y-1 ${idx > 0 ? "pl-4 sm:pl-6" : ""}`}>
                    <div className="flex items-baseline">
                      <span className="font-sans text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#111] tracking-tight leading-none">
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
