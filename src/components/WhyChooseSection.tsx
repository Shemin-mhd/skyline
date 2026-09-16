"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Sliders,
  Wrench,
  Award,
  Clock,
  Layers
} from "lucide-react";

interface WhyPoint {
  icon: React.ElementType;
  badge: string;
  title: string;
  desc: string;
}

const whyPoints: WhyPoint[] = [
  {
    icon: Award,
    badge: "Grade A",
    title: "Professional Engineering",
    desc: "Physics-based acoustic simulation & structural precision for flawless isolation.",
  },
  {
    icon: Sliders,
    badge: "Bespoke",
    title: "100% Custom Solutions",
    desc: "Tailored to your space dimensions, interior decor, and performance criteria.",
  },
  {
    icon: ShieldCheck,
    badge: "Guaranteed",
    title: "Certified Materials",
    desc: "Lab-tested high-density membranes, mineral wools, and decoupled channels.",
  },
  {
    icon: Wrench,
    badge: "Precision",
    title: "Skilled Installation",
    desc: "Trained specialist craftsmen ensuring airtight seals and zero sound leakage.",
  },
  {
    icon: Clock,
    badge: "Reliable",
    title: "Turnkey Timelines",
    desc: "Streamlined project management from initial drawings to final acoustic testing.",
  },
  {
    icon: Layers,
    badge: "Zero Flutter",
    title: "Acoustic Decoupling",
    desc: "Specialized floor, wall, and ceiling decoupling preventing structural vibration.",
  },
];

export default function WhyChooseSection() {
  const [isPaused, setIsPaused] = useState(false);

  // Triple array to ensure an infinite seamless loop
  const marqueeItems = [...whyPoints, ...whyPoints, ...whyPoints];

  return (
    <section id="why-skylink" className="w-full bg-[#F5F5F7] py-14 sm:py-20 border-b border-gray-200/80 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Centered Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 px-6 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase tracking-wider text-black shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>The Skylink Advantage</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
            Why Choose Us
          </h2>

          <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
            Engineered excellence, premium craftsmanship, and guaranteed acoustic performance.
          </p>
        </div>

        {/* Continuous Animated Marquee Track */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Ambient edge gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 sm:gap-5 w-max px-4 cursor-grab active:cursor-grabbing"
            animate={{
              x: isPaused ? undefined : ["-33.33%", "0%"],
            }}
            transition={{
              x: {
                duration: 35,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {marqueeItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="w-[260px] sm:w-[290px] shrink-0 bg-white p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-200/80 hover:border-black hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Icon Container + Small Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 bg-gray-50 group-hover:bg-black flex items-center justify-center border border-gray-100 transition-colors duration-300 shadow-2xs">
                        <Icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                      </div>

                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors px-2.5 py-1 bg-gray-50 border border-gray-100">
                        {item.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-normal text-lg sm:text-xl text-black tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-xs text-gray-500 mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Visual Accent Line */}
                  <div className="w-full h-1 bg-gray-100 rounded-full mt-6 overflow-hidden">
                    <div className="w-0 group-hover:w-full h-full bg-black transition-all duration-500 rounded-full" />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
