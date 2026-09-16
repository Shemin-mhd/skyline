"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight, Activity, ShieldCheck, Dumbbell, Building2 } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function GymFloorSection({ onOpenQuoteModal }: Props) {
  const controls = [
    "Impact noise",
    "Weight-drop noise",
    "Structural vibration",
    "Footfall noise",
    "Equipment vibration",
  ];

  const applications = [
    "Commercial Gyms",
    "Fitness Centers",
    "Private Gyms",
    "Residential Gyms",
    "Hotels",
    "Wellness Centers",
  ];

  return (
    <section id="gym-floor" className="w-full bg-white">
      {/* 1. FULL PAGE HERO BANNER */}
      <div className="relative w-full min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden bg-[#0B0C0E]">
        {/* Background Gym Image */}
        <img
          src="/images/gym-pdf-hero.jpg"
          alt="High-Performance Gym Floor Acoustic Insulation"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 text-white space-y-8">
          
          {/* Top Back & Category Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4">
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

            <div className="text-[#C49B5B] font-sans text-xs sm:text-[13px] font-bold tracking-[0.24em] uppercase flex items-center gap-2">
              <span>05</span>
              <span className="text-[#C49B5B]/60">/</span>
              <span>GYM FLOOR ACOUSTIC SYSTEMS</span>
            </div>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.24em] text-gray-400 block">
              Acoustic Floor Insulation &amp; Impact Noise Control for Gyms
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[60px] font-bold text-white tracking-tight leading-[1.06]">
              POWER WITHOUT THE NOISE.
            </h1>
            <p className="font-sans text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Heavy equipment, dropped weights and high-impact exercise can generate significant impact noise and vibration. We engineer decoupled subfloor assemblies that stop structural transmission at the source.
            </p>
          </div>

          {/* Main Concept Flow Banner */}
          <div className="inline-flex flex-wrap items-center gap-3 sm:gap-4 p-4 sm:p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#C49B5B]">
              MAIN CONCEPT:
            </span>
            <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-sans font-bold tracking-wider uppercase text-white">
              <span className="px-3 py-1 bg-black/60 rounded">IMPACT</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1 bg-white/20 rounded text-[#C49B5B]">ACOUSTIC FLOOR</span>
              <span className="text-gray-400">→</span>
              <span className="px-3 py-1 bg-black/60 rounded">REDUCED VIBRATION</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenQuoteModal}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-100 text-black text-xs font-bold tracking-wider uppercase transition-all shadow-md rounded-full cursor-pointer"
            >
              <span>Discuss Gym Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/97333048555?text=Hello%20Skylink%20Acoustics,%20I%20am%20interested%20in%20Gym%20Floor%20Acoustic%20Insulation."
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-transparent hover:bg-white/10 border border-white/30 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
            >
              <span>WhatsApp +973 33048555</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. SPECIFICATION & CONTROL METRICS SECTION */}
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 space-y-12">
        
        {/* Statement Quote Banner */}
        <div className="p-6 sm:p-8 bg-[#FAF9F6] border-l-4 border-black border-y border-r border-gray-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-gray-500 block mb-1">
              Engineering Principle
            </span>
            <p className="font-heading text-xl sm:text-2xl font-semibold text-[#111] tracking-tight">
              “High performance above. Controlled impact below.”
            </p>
          </div>
          <span className="px-4 py-1.5 bg-black text-white text-xs font-sans font-bold tracking-widest uppercase rounded-full">
            Impact Decoupled
          </span>
        </div>

        {/* 2 Column Details: Controls vs Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-6 p-8 bg-white border border-gray-200 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
                Vibration Mitigation
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-black tracking-tight">
                Our acoustic floor solutions help control:
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Engineered elastomeric underlayments, floating slab isolators, and heavy-duty rubber tiles absorb mechanical kinetic energy before it enters building structures.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {controls.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-[#FAF9F6] border border-gray-200/70 rounded-lg text-sm font-sans font-semibold text-black"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-4 h-4 text-[#C49B5B]" />
                    <span>{item}</span>
                  </div>
                  <span className="text-xs font-sans text-gray-400 uppercase tracking-wider">Mitigated</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="lg:col-span-6 p-8 bg-[#FAF9F6] border border-gray-200 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
                Space Categorization
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-black tracking-tight">
                Applications
              </h3>
              <p className="font-sans text-sm text-gray-600 leading-relaxed">
                Whether retrofitting a luxury hotel gym above guest suites or engineering high-capacity commercial fitness centers, our systems prevent noise complaints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {applications.map((app, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 bg-white border border-gray-200/70 rounded-lg text-sm font-sans font-semibold text-black"
                >
                  <Dumbbell className="w-4 h-4 text-black shrink-0" />
                  <span>{app}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-white border border-gray-200/70 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-sans text-gray-500 uppercase tracking-wider">Need an on-site vibration audit?</p>
                <p className="text-sm font-sans font-bold text-black">Speak with an acoustic engineer</p>
              </div>
              <button
                onClick={onOpenQuoteModal}
                className="px-4 py-2 bg-black text-white text-xs font-sans font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Inquire Now
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
