"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Sliders } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function FitOutSection({ onOpenQuoteModal }: Props) {
  const [sliderPos, setSliderPos] = useState(50);

  const tags = ["CUSTOMIZED SOLUTIONS", "PROFESSIONAL INSTALLATION", "PROJECT SUPPORT"];

  const pillars = [
    {
      num: "01",
      title: "Architectural Millwork & Slats",
      desc: "Precision CNC timber acoustic slats and micro-perforated veneer panels that control reverberation with warm aesthetics.",
    },
    {
      num: "02",
      title: "Coffered Acoustic Ceilings",
      desc: "Custom suspended ceiling baffles with hidden high-density sound absorption cores and flush LED channel integrations.",
    },
    {
      num: "03",
      title: "Master Craftsmanship",
      desc: "Turnkey fit-out contractors executing flawless transitions between architectural stone, glass, and acoustic woodwork.",
    },
  ];

  return (
    <div className="w-full bg-white">
      <section id="fit-out" className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-16 space-y-12">
        
        {/* Top Navigation & Go Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => {
              if (typeof window !== "undefined" && window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = "/#services";
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-black hover:text-white text-black border border-gray-300 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-xs group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-gray-500">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-black transition-colors">Services</Link>
            <span>/</span>
            <span className="text-black font-semibold">Fit-Out Solutions</span>
          </div>
        </div>

        {/* Top Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase">
            04
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-500 uppercase">
            FIT-OUT &amp; PROJECT SOLUTIONS
          </span>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          <div className="lg:col-span-8 space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[52px] font-normal text-[#111] leading-[1.08] tracking-tight">
              From Empty Space<br />
              To Perfectly Finished Space.
            </h1>
            <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed max-w-2xl">
              Customized acoustic solutions for homeowners, contractors, developers, consultants and project teams—from concept through professional installation.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-8 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Consult On Fit-Out</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 bg-[#FAF9F6] border border-gray-200 text-black text-xs font-sans font-semibold tracking-wider uppercase rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Interactive Before & After Slider */}
        <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[540px] overflow-hidden border border-gray-200 shadow-xl select-none bg-black">
          {/* After Image */}
          <div className="absolute inset-0">
            <img
              src="/images/fitout-after.jpg"
              alt="After Turnkey Acoustic Fit-out"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 right-6 bg-black/80 backdrop-blur-md text-white text-xs font-sans font-bold px-4 py-2 uppercase tracking-widest border border-white/20">
              AFTER · COMPLETED SPACE
            </div>
          </div>

          {/* Before Image with draggable width */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src="/images/fitout-before.jpg"
              alt="Before Turnkey Acoustic Fit-out"
              className="absolute inset-y-0 left-0 h-full w-[1600px] max-w-none object-cover"
            />
            <div className="absolute bottom-5 left-6 bg-white/90 backdrop-blur-md text-[#111] text-xs font-sans font-bold px-4 py-2 uppercase tracking-widest shadow-md">
              BEFORE · BARE SHELL
            </div>
          </div>

          {/* Interactive Range Input overlay */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />

          {/* Center Handle Bar */}
          <div
            className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
            style={{ left: `calc(${sliderPos}% - 18px)` }}
          >
            <div className="w-9 h-9 rounded-full bg-white shadow-2xl flex items-center justify-center text-[#111] text-xs font-bold border border-gray-200">
              <Sliders className="w-4 h-4 text-black" />
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          {pillars.map((p) => (
            <div key={p.num} className="p-6 sm:p-7 bg-[#FAF9F6] border border-gray-200/80 space-y-3">
              <span className="font-serif text-3xl font-light text-gray-400 block">{p.num}</span>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-black tracking-tight">{p.title}</h3>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </section>
    </div>
  );
}
