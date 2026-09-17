"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  onOpenQuoteModal: () => void;
}

// The exact 3 cards requested by the user:
// 01 - Luxury Home Theater Solutions
// 05 - Gym Floor Acoustic Insulation
// 03 - Acoustic Treatment for New Buildings
const heroCards = [
  {
    id: "home-theater",
    num: "01",
    tag: "01 — LUXURY HOME THEATERS",
    title: "Luxury Home Theater Solutions",
    headline: "YOUR HOME. YOUR CINEMA. PERFECT SOUND.",
    image: "/images/theater-bright.jpg",
    href: "/home-theater",
  },
  {
    id: "gym-floor",
    num: "05",
    tag: "05 — GYM FLOOR INSULATION",
    title: "Gym Floor Acoustic Insulation",
    headline: "POWER WITHOUT THE NOISE.",
    image: "/images/gym-pdf-hero.jpg",
    href: "/gym-floor",
  },
  {
    id: "new-build",
    num: "03",
    tag: "03 — NEW BUILDINGS",
    title: "Acoustic Treatment for New Buildings",
    headline: "BUILD QUIETER. LIVE BETTER.",
    image: "/images/villa-bright.jpg",
    href: "/new-build",
  },
];

const stats = [
  { num: "65", suffix: "+", label: "Projects Completed" },
  { num: "7", suffix: "+", label: "Years Experience" },
  { num: "180", suffix: "+", label: "Satisfied Clients" },
];

export default function Hero({ onOpenQuoteModal }: HeroProps) {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalCards = heroCards.length;

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const goToPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // Smooth automatic continuous rotation every 4 seconds (pauses on hover so user can interact comfortably)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [goToNext, isPaused]);

  return (
    <section className="relative w-full bg-[#F5F5F7] border-b border-gray-200/80 min-h-[calc(100vh-76px)] flex items-center">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 lg:py-12 flex flex-col justify-center">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">

          {/* Left Content (6 cols) */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="space-y-2.5">
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[50px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em] uppercase">
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
                className="inline-flex items-center justify-center px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all active:scale-95"
              >
                <span>Explore Solutions</span>
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

            {/* Stats */}
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

          {/* Right Hero: Silky-Smooth 3D Card Deck */}
          <div
            className="lg:col-span-6 relative w-full flex flex-col items-center justify-center pt-2 sm:pt-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* 3D Perspective Viewport */}
            <div
              className="relative w-full max-w-[530px] h-[460px] sm:h-[490px] flex items-center justify-center"
              style={{ perspective: "1200px" }}
            >
              {heroCards.map((card, idx) => {
                // Calculate cyclic distance
                const diff = (idx - current + totalCards) % totalCards;
                const isCenter = diff === 0;
                const isRight = diff === 1;
                const isLeft = diff === 2;

                const xOffset = isCenter ? 0 : isRight ? 105 : -105;
                const rotateY = isCenter ? 0 : isRight ? -9 : 9;
                const scale = isCenter ? 1 : 0.88;
                const opacity = isCenter ? 1 : 0.62;
                const zIndex = isCenter ? 20 : 10;

                return (
                  <motion.div
                    key={card.id}
                    animate={{
                      x: xOffset,
                      scale: scale,
                      rotateY: rotateY,
                      opacity: opacity,
                      zIndex: zIndex,
                    }}
                    transition={{
                      duration: 0.85,
                      ease: [0.22, 1, 0.36, 1], // Apple-grade silky smooth easing
                    }}
                    onClick={() => {
                      if (isLeft) goToPrev();
                      else if (isRight) goToNext();
                      else if (isCenter) router.push(card.href);
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                    className={`group absolute w-[290px] sm:w-[315px] md:w-[330px] h-[435px] sm:h-[465px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl transition-shadow duration-500 select-none cursor-pointer ${
                      isCenter ? "hover:scale-[1.01] hover:border-white/40" : "hover:opacity-85"
                    }`}
                  >
                    {/* Background Architectural Photo */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Ambient Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-50% to-black/20 group-hover:from-black transition-colors duration-500" />

                    {/* Top Row: Number Badge & Quick Action Arrow */}
                    <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between">
                      {/* Step Number Badge */}
                      <span className="px-3.5 py-1.5 bg-black/75 backdrop-blur-md text-xs font-sans font-bold tracking-widest text-white border border-white/20 uppercase rounded-full shadow-xs">
                        {card.num}
                      </span>

                      {/* Top Right Quick Click Action */}
                      <Link
                        href={card.href}
                        onClick={(e) => {
                          if (!isCenter) e.preventDefault();
                        }}
                        className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-transform"
                        title="Explore solution"
                      >
                        <ArrowUpRight className="w-4 h-4 text-black" />
                      </Link>
                    </div>

                    {/* Bottom Content Block */}
                    <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-10 flex flex-col justify-end">
                      <span className="text-[11px] sm:text-xs font-sans font-bold text-gray-300 tracking-[0.2em] uppercase block mb-1">
                        {card.tag}
                      </span>

                      <h3 className="font-heading text-2xl sm:text-[26px] font-bold text-white leading-tight tracking-tight mb-2 group-hover:text-gray-200 transition-colors">
                        {card.title}
                      </h3>

                      <p className="text-gray-300 font-sans text-xs sm:text-[13px] uppercase font-bold tracking-wider leading-relaxed mb-3 sm:mb-4">
                        {card.headline}
                      </p>

                      {/* Explore Solution Button */}
                      <Link
                        href={card.href}
                        onClick={(e) => {
                          if (!isCenter) e.preventDefault();
                        }}
                        className="pt-3.5 sm:pt-4 border-t border-white/20 flex items-center justify-between text-white text-xs sm:text-sm font-semibold group/link"
                      >
                        <span className="tracking-wide uppercase text-[11px] sm:text-xs group-hover/link:underline underline-offset-4">
                          Explore Solution
                        </span>
                        <div className="w-8 h-8 sm:w-9 sm:h-9 bg-white text-black flex items-center justify-center rounded-full shadow-md group-hover/link:scale-110 transition-transform duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
