"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Shield, VolumeX, Bed, Star, Layers, Activity } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function AcousticInsulationSection({ onOpenQuoteModal }: Props) {
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

  const technicalSpecs = [
    { label: "Sound Transmission Class", value: "STC 65 - 72", benchmark: "Standard Drywall is only STC 35" },
    { label: "Noise Reduction Coefficient", value: "NRC 0.95+", benchmark: "High-absorption mineral core" },
    { label: "Impact Sound Insulation", value: "ΔLw 28 - 34 dB", benchmark: "Eliminates heavy footfall thumps" },
    { label: "Fire Safety Rating", value: "Class A / Non-Combustible", benchmark: "Compliant with international building codes" },
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

        {/* Top Category Breadcrumb Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3 py-1 bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase">
            02
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-500 uppercase">
            ACOUSTIC INSULATION
          </span>
          <div className="w-12 h-[1px] bg-gray-300" />
        </div>

        {/* Headline & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#111] leading-[1.08] tracking-tight">
              Quiet Spaces.<br />
              Better Living.
            </h1>

            <p className="text-gray-700 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              Effective acoustic insulation designed to reduce sound transmission between rooms and neighboring spaces.
            </p>

            <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed max-w-lg">
              Whether retrofitting luxury private suites or engineering hotel partitions from the ground up, Skylink delivers certified high-STC sound barrier assemblies that isolate airborne conversations, HVAC air rumble, and impact noise.
            </p>

            {/* Applications Pills */}
            <div className="pt-2">
              <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-3">
                APPLICATION SECTORS:
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {applications.map((app, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 bg-white border border-gray-200 text-black text-xs font-sans font-semibold tracking-wider uppercase shadow-2xs"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons - Curved Pill Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request Acoustic Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/97470076272?text=Hello%20Skylink,%20I%20am%20interested%20in%20Acoustic%20Insulation%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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

      {/* 3. Technical Specifications & Acoustic Comparison */}
      <section className="w-full bg-[#FAF9F6] py-16 sm:py-20 border-b border-gray-200/80">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-10">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
              PERFORMANCE BENCHMARKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-black tracking-tight">
              Laboratory-Tested Performance
            </h2>
            <p className="text-gray-600 font-sans text-xs sm:text-sm leading-relaxed">
              We specify and install tested acoustic assemblies with verified Sound Transmission Class (STC) ratings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {technicalSpecs.map((spec, idx) => (
              <div key={idx} className="p-6 bg-white border border-gray-200 shadow-2xs space-y-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-gray-400 block">
                  {spec.label}
                </span>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-black">
                  {spec.value}
                </div>
                <div className="text-xs font-sans text-gray-500 pt-2 border-t border-gray-100">
                  {spec.benchmark}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Four-Step Solution Delivery (PDF Page 10) */}
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

          {/* CTA Banner at bottom - Curved with Rounded Button */}
          <div className="p-8 sm:p-10 bg-[#111] text-white flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl sm:rounded-3xl shadow-xl">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight">
                Ready to engineer silence into your project?
              </h3>
              <p className="text-gray-400 font-sans text-xs sm:text-sm">
                Speak with our lead acoustic engineers today for spatial review and budgeting.
              </p>
            </div>

            <button
              onClick={onOpenQuoteModal}
              className="px-8 py-3.5 bg-white hover:bg-gray-100 text-black font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer shrink-0 rounded-full"
            >
              Request Engineering Quote
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}
