"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function GymFloorSection({ onOpenQuoteModal }: Props) {
  return (
    <section id="gym-floor" className="w-full bg-white">
      {/* 1. FULL PAGE HERO BANNER (05 / GYM FLOOR ACOUSTICS) */}
      <div className="relative w-full min-h-[calc(100vh-76px)] flex items-center overflow-hidden bg-[#0B0C0E]">

        {/* Full-Bleed Realistic Background Gym Image */}
        <img
          src="/images/gym-pdf-hero.jpg"
          alt="Commercial Gym Overlooking Marina Skyline"
          className="absolute inset-0 w-full h-full object-cover object-right lg:object-center brightness-105"
        />

        {/* Subtle mobile gradient scrim for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent lg:hidden" />

        {/* Floating Dark Architectural Box - Responsive Positioning */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-12 flex items-center">
          <div className="w-full sm:w-[500px] lg:w-[520px] xl:w-[550px] bg-[#0D0E11]/96 backdrop-blur-md p-8 sm:p-10 lg:p-12 xl:p-14 border border-white/10 shadow-2xl flex flex-col justify-between rounded-2xl sm:rounded-3xl">

            {/* Top Back & Category Tag */}
            <div>
              <div className="mb-6">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.history.length > 1) {
                      window.history.back();
                    } else {
                      window.location.href = "/#services";
                    }
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white hover:text-black text-white border border-white/20 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-xs group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  <span>Go Back</span>
                </button>
              </div>

              <div className="text-[#C49B5B] font-sans text-xs sm:text-[13px] font-bold tracking-[0.24em] uppercase mb-6 sm:mb-8 flex items-center gap-2">
                <span>05</span>
                <span className="text-[#C49B5B]/60">/</span>
                <span>GYM FLOOR ACOUSTICS</span>
              </div>

              {/* Main Headline: Powerful Workouts. Quieter Spaces. */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[46px] xl:text-[52px] font-normal text-white tracking-tight leading-[1.08] mb-6">
                Powerful<br />
                Workouts.<br />
                Quieter Spaces.
              </h1>

              {/* Body Description */}
              <p className="font-sans text-gray-300 text-xs sm:text-sm lg:text-[15px] leading-relaxed max-w-sm">
                Specialized floor systems reduce impact noise, vibration and structural sound transmission from equipment and heavy workouts.
              </p>
            </div>

            {/* Bottom Specs & Action Button */}
            <div className="mt-8 pt-8 border-t border-white/15 space-y-6">

              {/* Exact Two Lines from PDF */}
              <div className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.22em] text-gray-300 uppercase space-y-2">
                <div>IMPACT NOISE &nbsp;/&nbsp; VIBRATION CONTROL</div>
                <div>FLOOR PROTECTION &nbsp;/&nbsp; IMPROVED COMFORT</div>
              </div>

              {/* Action Button */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenQuoteModal}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-100 text-[#111] text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 rounded-full cursor-pointer"
                >
                  <span>Request Engineering Quote</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <Link
                  href="/contact"
                  className="text-xs font-semibold text-gray-300 hover:text-white underline underline-offset-4 tracking-wider uppercase transition-colors"
                >
                  Book Acoustic Audit →
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
