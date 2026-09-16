"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Clapperboard, Volume2, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function HomeTheaterDedicatedSection({ onOpenQuoteModal }: Props) {
  const applications = [
    "PRIVATE VILLAS",
    "MEDIA ROOMS",
    "HOME THEATERS",
    "ENTERTAINMENT ROOMS",
  ];

  const pillars = [
    {
      title: "Dolby Atmos Immersion",
      desc: "Calibrated 7.2.4 to 11.4.6 speaker isolation with zero acoustic room interference.",
      icon: Volume2,
    },
    {
      title: "Acoustic Wall Paneling",
      desc: "Architectural stretched-fabric systems and wooden diffusers for precise reverberation control (RT60 ~0.3s).",
      icon: Clapperboard,
    },
    {
      title: "Bass Trap Decoupling",
      desc: "Eliminates room flutter echoes, corner standing waves, and sound bleeding into neighboring bedrooms.",
      icon: ShieldCheck,
    },
    {
      title: "Turnkey Cinema Build",
      desc: "Complete interior execution including tiered seating, star sky ceiling lighting, and concealed wiring.",
      icon: Sparkles,
    },
  ];

  const workflow = [
    { num: "01", step: "CONSULTATION", desc: "Room acoustic audit & client entertainment vision." },
    { num: "02", step: "DESIGN", desc: "3D acoustic simulation, RT60 calculations & layout." },
    { num: "03", step: "INSTALLATION", desc: "Precision framing, acoustic baffles & speaker integration." },
    { num: "04", step: "FINAL DELIVERY", desc: "Audio calibration, measurement report & handover." },
  ];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* Hero Split */}
      <section className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-16 space-y-12">
        
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
            <span className="text-black font-semibold">Home Theater</span>
          </div>
        </div>

        {/* Top Category Tag */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase">
            01
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-500 uppercase">
            HOME THEATER
          </span>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block mb-2">
                HOME THEATERS
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em] uppercase">
                Your Home.<br />
                Your Cinema.<br />
                <span className="text-gray-500">Perfect Sound.</span>
              </h1>
              <p className="text-sm sm:text-base font-sans font-semibold text-black mt-2">
                Luxury Acoustic Solutions for Private Home Theaters
              </p>
            </div>

            <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              Transform your private entertainment room into an immersive cinematic experience. Our home theater acoustic solutions are designed to control unwanted reflections, improve sound clarity and create a balanced listening environment.
            </p>

            {/* Statement Quote */}
            <div className="p-4 bg-white border-l-2 border-black rounded-r-xl shadow-2xs">
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] italic">
                “Experience every dialogue, detail and soundtrack with greater clarity.”
              </p>
            </div>

            {/* Solutions List */}
            <div className="pt-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-2.5">
                ACOUSTIC SOLUTIONS:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans font-semibold text-gray-800">
                {[
                  "Acoustic wall treatment",
                  "Acoustic ceiling treatment",
                  "Sound isolation",
                  "Reverberation control",
                  "Speaker integration",
                  "Bass management",
                  "Customized acoustic design",
                  "Professional installation",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Clients */}
            <div className="pt-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-1">
                TARGET CLIENTS:
              </span>
              <p className="text-xs font-sans text-gray-600 font-medium">
                Luxury Villa Owners · Homeowners · Private Cinema Projects · Interior Designers
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2 rounded-full"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/97333048555?text=Hello%20Skylink%20Acoustics,%20I%20am%20interested%20in%20Home%20Theater%20acoustic%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 rounded-full"
              >
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-gray-200 shadow-xl aspect-[16/11] bg-black group">
              <img
                src="/images/theater-bright.jpg"
                alt="Luxury Home Theater Cinema"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-black/70 backdrop-blur-md px-3 py-1 border border-white/20 inline-block mb-1">
                  DOLBY ATMOS CALIBRATED
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium text-white">
                  Concealed Acoustic Fabric • Bass Absorption • Star Sky Ambience
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars */}
        <div className="pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-white border border-gray-200/80 shadow-2xs hover:border-black transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FAF9F6] border border-gray-200 flex items-center justify-center text-black">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-sm text-[#111] uppercase tracking-wider">{p.title}</h4>
                    <p className="font-sans text-xs text-gray-600 mt-1.5 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    <span>Acoustic Spec</span>
                    <CheckCircle2 className="w-3 h-3 text-black" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Workflow Steps */}
        <div className="pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {workflow.map((w, idx) => (
              <div key={idx} className="p-6 bg-white border border-gray-200/80 space-y-2">
                <span className="font-serif text-3xl font-light text-gray-400 block">{w.num}</span>
                <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-black">{w.step}</h5>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
