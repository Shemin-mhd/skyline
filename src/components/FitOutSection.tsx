"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Sliders, Layers, Building2, Home, Film, Sparkles } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function FitOutSection({ onOpenQuoteModal }: Props) {
  const [sliderPos, setSliderPos] = useState(50);

  const projectScales = [
    {
      num: "01",
      title: "Single Room",
      desc: "Private acoustic listening rooms, bedrooms, podcast studios, and high-performance quiet spaces.",
      icon: Home,
    },
    {
      num: "02",
      title: "Home Theater",
      desc: "Bespoke private cinemas engineered with decoupled isolation, bass traps, and fabric finishes.",
      icon: Film,
    },
    {
      num: "03",
      title: "Office / Restaurant",
      desc: "Architectural sound absorption systems to control reverberation and ensure acoustic comfort.",
      icon: Layers,
    },
    {
      num: "04",
      title: "Hotel / Large-Scale Development",
      desc: "Comprehensive multi-unit acoustic insulation, room-to-room privacy, and large-scale fit-out execution.",
      icon: Building2,
    },
  ];

  const applications = [
    "Residential fit-outs & villa interiors",
    "Home theaters",
    "Offices & restaurants",
    "Hotels & retail spaces",
    "Commercial interiors",
    "Large-scale projects",
  ];

  const capabilities = [
    "Acoustic wall systems",
    "Acoustic ceiling systems",
    "Sound isolation & noise control",
    "Reverberation control",
    "Customized acoustic solutions",
    "Professional installation",
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
            <span className="text-black font-semibold">Fit-Out Projects</span>
          </div>
        </div>

        {/* Top Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase">
            04
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-500 uppercase">
            FIT-OUT PROJECTS
          </span>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
              Customized Acoustic Solutions for Fit-Out Projects
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-[#111] leading-[1.08] tracking-tight">
              FROM ONE ROOM TO AN ENTIRE PROJECT.
            </h1>
            <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
              Whether it is a single residential room or a major commercial development, Skylink Acoustics provides project-specific acoustic solutions designed around the space, application and performance requirements.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-8 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Discuss Your Fit-Out</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/97333048555?text=Hello%20Skylink%20Acoustics,%20I%20am%20interested%20in%20Fit-Out%20Acoustic%20Solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-sans font-bold text-gray-600 hover:text-black tracking-wider uppercase underline underline-offset-4"
            >
              WhatsApp +973 33048555 →
            </a>
          </div>
        </div>

        {/* Statement Quote Banner */}
        <div className="p-6 sm:p-8 bg-[#FAF9F6] border-l-4 border-black border-y border-r border-gray-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-500 block mb-1">
              Project Statement
            </span>
            <p className="font-heading text-xl sm:text-2xl font-semibold text-[#111] tracking-tight">
              “One specialist. Multiple project scales.”
            </p>
          </div>
          <span className="px-4 py-1.5 bg-black text-white text-xs font-sans font-bold tracking-widest uppercase rounded-full">
            Turnkey Delivery
          </span>
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

        {/* Project Scale: 01 to 04 */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.24em] text-gray-500">
              PROJECT SCALE
            </span>
            <div className="flex-1 h-[1px] bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectScales.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.num} className="p-6 bg-[#FAF9F6] border border-gray-200/80 space-y-3 hover:border-black transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-2xl font-bold text-gray-400">{p.num}</span>
                    <Icon className="w-5 h-5 text-gray-500" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-black tracking-tight">{p.title}</h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applications & Capabilities Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          {/* Applications */}
          <div className="p-8 bg-white border border-gray-200 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
                Versatile Deployments
              </span>
              <h3 className="font-heading text-2xl font-bold text-black tracking-tight">
                Applications
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {applications.map((app, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-sans text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="p-8 bg-[#FAF9F6] border border-gray-200 space-y-6">
            <div className="space-y-1">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
                Engineering Disciplines
              </span>
              <h3 className="font-heading text-2xl font-bold text-black tracking-tight">
                Capabilities
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-sans text-gray-800">
                  <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
