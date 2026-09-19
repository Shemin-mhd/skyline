"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, VolumeX, Bed, Star, Layers, Activity } from "lucide-react";
import WhatsAppChatIcon from "@/components/WhatsAppChatIcon";
import { useWhatsAppNumber } from "@/lib/use-whatsapp-number";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function AcousticInsulationSection({ onOpenQuoteModal }: Props) {
  const { getWhatsAppUrl } = useWhatsAppNumber();
  const applications = [
    "HOTELS",
    "APARTMENTS",
    "GUEST ROOMS",
    "CORRIDORS",
    "COMMON AREAS",
  ];

  const pillars = [
    {
      title: "PRIVACY",
      subtitle: "Certified STC 65+ Wall Assemblies",
      desc: "Prevents conversational speech and media transmission between adjoining rooms, ensuring complete confidentiality.",
      icon: Shield,
    },
    {
      title: "COMFORT",
      subtitle: "Dramatically Reduced Noise Floor",
      desc: "Creates tranquil environments for deep rest, focused study, and undisturbed luxury living.",
      icon: Bed,
    },
    {
      title: "NOISE REDUCTION",
      subtitle: "Multi-Layer Vibration Decoupling",
      desc: "Stops structure-borne impact noise, footfalls, and plumbing vibrations before they transfer through walls.",
      icon: VolumeX,
    },
    {
      title: "BETTER GUEST EXPERIENCE",
      subtitle: "5-Star Hospitality Acoustic Standard",
      desc: "Exceeds international luxury hotel acoustic specifications to eliminate noise complaints entirely.",
      icon: Star,
    },
  ];

  const workflow = [
    { num: "01", step: "CONSULTATION", desc: "Acoustic site inspection, baseline decibel measurement & partition zoning." },
    { num: "02", step: "DESIGN", desc: "Acoustic CAD drawings, resilient clip detailing & STC specification." },
    { num: "03", step: "INSTALLATION", desc: "Supply of certified dense mineral wool, resilient channels & acoustic sealant." },
    { num: "04", step: "FINAL DELIVERY", desc: "Field acoustic verification, decibel transmission report & client sign-off." },
  ];

  return (
    <div className="w-full bg-[#FAF9F6]">
      {/* 1. Page Header & Hero Split Section */}
      <section className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-16">
        
        {/* Top Navigation & Go Back Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
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
            <span className="text-black font-semibold">Acoustic Insulation</span>
          </div>
        </div>


        {/* Headline & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em] uppercase">
                Privacy is the<br />
                New Luxury.
              </h1>
              <p className="text-sm sm:text-base font-sans font-semibold text-black mt-2">
                Acoustic Insulation for Hotels &amp; Apartments
              </p>
            </div>

            <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
              In hospitality and residential environments, acoustic privacy is a critical part of comfort and quality. Our acoustic insulation solutions help reduce unwanted sound transmission between guest rooms, apartments, corridors, service areas, mechanical areas and common spaces.
            </p>

            {/* Statement Quote */}
            <div className="p-4 bg-white border-l-2 border-black rounded-r-xl shadow-2xs">
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] italic">
                “Quieter spaces. Greater privacy. Better guest experiences.”
              </p>
            </div>

            {/* Solutions Pills */}
            <div className="pt-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-2.5">
                INSULATION SOLUTIONS:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-sans font-semibold text-gray-800">
                {[
                  "Wall acoustic insulation",
                  "Ceiling acoustic insulation",
                  "Room-to-room sound isolation",
                  "Impact noise control",
                  "Mechanical noise control",
                  "New construction applications",
                  "Privacy enhancement",
                  "Renovation & fit-out applications",
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
                Hotels · Apartments · Residential Developers · Hospitality Projects
              </p>
            </div>

            {/* Direct Action Buttons - Curved Pill Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppUrl("Hello Skylink Acoustics, I am interested in Acoustic Insulation solutions.")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <WhatsAppChatIcon className="w-4 h-4 fill-[#00A859]" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>
          </div>

          {/* Right Showcase Photo with Decoupled Acoustic Callout */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-gray-200 shadow-xl aspect-[16/11] bg-black group">
              <img
                src="/images/bedroom-bright.jpg"
                alt="Luxury Master Bedroom Acoustic Insulation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* STC 65+ Badge Overlay */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-3.5 py-1.5 bg-black/80 backdrop-blur-md text-white border border-white/20 text-xs font-sans font-bold uppercase tracking-wider">
                  STC 65+ RATED
                </span>
              </div>

              {/* Bottom Acoustic Architecture Bar */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-white/80 uppercase block mb-0.5">
                  DECOUPLED RESILIENT ASSEMBLY
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium text-white line-clamp-1">
                  High-Density Mineral Core • Resilient Channels • Acoustic Flanking Seals
                </p>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* 2. Four Key Value Pillars from PDF Page 3 */}
      <section className="w-full bg-white py-16 sm:py-20 border-y border-gray-200/80">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block mb-1">
                ACOUSTIC ENGINEERING PILLARS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-black tracking-tight">
                Designed for Absolute Silence
              </h2>
            </div>
            <p className="text-gray-500 font-sans text-xs sm:text-sm max-w-sm sm:text-right leading-relaxed">
              Every detail engineered to prevent sound flanking, mechanical noise transmission, and vibration leakage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 bg-[#FAF9F6] border border-gray-200/80 hover:border-black transition-all flex flex-col justify-between shadow-2xs group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-black tracking-tight capitalize">
                        {pillar.title.toLowerCase()}
                      </h3>
                      <span className="text-[11px] font-sans font-semibold text-gray-500 block mt-0.5">
                        {pillar.subtitle}
                      </span>
                    </div>

                    <p className="font-sans text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200/80 flex items-center gap-1 text-[11px] font-bold text-black uppercase tracking-wider">
                    <span>Certified Standard</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Four-Step Solution Delivery (PDF Page 10) */}
      <section className="w-full bg-white py-16 sm:py-20 border-b border-gray-200/80">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
              OUR PROCESS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-black tracking-tight">
              Acoustic Solution Approach
            </h2>
            <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
              A proven four-phase engineering methodology ensuring predictable silence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflow.map((w, idx) => (
              <div key={idx} className="p-6 bg-[#FAF9F6] border border-gray-200/80 space-y-3 relative group hover:border-black transition-colors">
                <span className="font-serif text-3xl font-light text-gray-400 block">
                  {w.num}
                </span>
                <h4 className="font-serif text-base font-normal text-black tracking-tight capitalize">
                  {w.step.toLowerCase()}
                </h4>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
