"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Cpu, HardHat, Award } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function NewBuildSection({ onOpenQuoteModal }: Props) {
  const steps = [
    {
      num: "01",
      title: "DESIGN",
      desc: "Integrate acoustic simulation and spatial sound pathway planning in the early architectural phase.",
      icon: Cpu,
    },
    {
      num: "02",
      title: "MATERIAL SELECTION",
      desc: "Specify certified non-combustible acoustic insulation, decoupled resilient channels & vibration isolators.",
      icon: ShieldCheck,
    },
    {
      num: "03",
      title: "INSTALLATION",
      desc: "Professional on-site implementation coordinated seamlessly with MEP, drywall, and structural teams.",
      icon: HardHat,
    },
    {
      num: "04",
      title: "ACOUSTIC PERFORMANCE",
      desc: "Field testing and decibel measurement verifying compliance with luxury acoustic building standards.",
      icon: Award,
    },
  ];

  return (
    <div className="w-full bg-[#FAF9F6]">
      <section id="new-build" className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-16 space-y-12">
        
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
            <span className="text-black font-semibold">New Build Projects</span>
          </div>
        </div>

        {/* Top Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase rounded-full">
            03
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-500 uppercase">
            NEW BUILDINGS
          </span>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>

        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em] uppercase">
                Build Quieter.<br />
                Live Better.
              </h1>
              <p className="text-sm sm:text-base font-sans font-semibold text-black mt-2">
                Acoustic Planning for New Residential, Hotel &amp; Commercial Buildings
              </p>
            </div>

            <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              Acoustic performance should be considered during the design and construction stage — not after the problem appears. Skylink Acoustics provides acoustic solutions that can be incorporated into new building projects from the planning stage.
            </p>

            {/* Statement Quote */}
            <div className="p-4 bg-white border-l-2 border-black rounded-r-xl shadow-2xs">
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] italic">
                “Plan acoustics early. Build performance into the project.”
              </p>
            </div>

            {/* Target Clients */}
            <div className="pt-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-1">
                TARGET CLIENTS:
              </span>
              <p className="text-xs font-sans text-gray-600 font-medium">
                Developers · Architects · Consultants · Contractors · Project Managers
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-8 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/97333048555?text=Hello%20Skylink%20Acoustics,%20I%20am%20interested%20in%20Acoustic%20Planning%20for%20a%20New%20Building."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-gray-200 shadow-xl aspect-[16/11] bg-black group">
              <img
                src="/images/new-build-villa.jpg"
                alt="Luxury Modern Architecture New Build"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-black/70 backdrop-blur-md px-3 py-1 border border-white/20 inline-block mb-1">
                  PRE-CONSTRUCTION ACOUSTICS
                </span>
                <p className="text-xs font-sans text-white/80">Embedded Architectural &amp; MEP Flanking Mitigation</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Steps from PDF Page 4 */}
        <div className="pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className="p-6 sm:p-7 bg-white border border-gray-200/80 shadow-2xs hover:border-black transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl font-light text-black block">{s.num}</span>
                    <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-gray-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-normal text-[#111] tracking-tight capitalize">{s.title.toLowerCase()}</h4>
                    <p className="font-sans text-xs text-gray-600 mt-1.5 leading-relaxed">{s.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    <span>Phase Guaranteed</span>
                    <CheckCircle2 className="w-3 h-3 text-black" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>
    </div>
  );
}
