"use client";

import React from "react";

export default function ThankYouSection() {
  return (
    <section className="w-full bg-[#F5F5F5] py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden h-[300px] sm:h-[400px] shadow-lg">
          <img
            src="/images/projects-villa.jpg"
            alt="Thank You Skylink"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white space-y-4 px-6">
              <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                Thank You
              </h2>
              <p className="font-sans text-lg sm:text-xl text-white/80 font-light">
                For Exploring Skylink
              </p>
              <p className="font-sans text-sm text-white/60 max-w-md mx-auto">
                Smart Engineering. Better Spaces. Exceptional Experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
