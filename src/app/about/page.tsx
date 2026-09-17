"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Layers,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Sparkles,
  Phone,
  ArrowUpRight,
  Sliders,
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";
import WhatsAppChatIcon from "@/components/WhatsAppChatIcon";
import { useWhatsAppNumber } from "@/lib/use-whatsapp-number";

export default function AboutPage() {
  const { getWhatsAppUrl } = useWhatsAppNumber();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const stats = [
    { value: "10+", label: "Years of Engineering Experience" },
    { value: "250+", label: "Acoustic & Theater Projects Delivered" },
    { value: "STC 65+", label: "Certified Sound Isolation Standard" },
    { value: "100%", label: "Turnkey Single-Point Accountability" },
  ];

  const pillars = [
    {
      icon: Volume2,
      title: "Acoustic Physics & Precision",
      desc: "We don't guess; we measure. From sound transmission class (STC) modeling to RT60 reverberation control, every partition and assembly is engineered for acoustic perfection.",
    },
    {
      icon: Layers,
      title: "Architectural Integration",
      desc: "Our acoustic materials seamlessly blend into your architecture. Hidden absorptive cores, bespoke architectural slats, and recessed lighting enhance design without aesthetic compromise.",
    },
    {
      icon: Cpu,
      title: "Custom In-House Craftsmanship",
      desc: "Every wall baffle, bass trap, and starry sky ceiling module is custom fabricated to exact room dimensions, ensuring airtight perimeter seals and zero sound leakage.",
    },
    {
      icon: ShieldCheck,
      title: "Single-Point Turnkey Delivery",
      desc: "From early architectural blueprint consultations and structural decoupling through certified installation and decibel field verification, we take complete responsibility.",
    },
  ];

  const methodology = [
    {
      step: "01",
      title: "Site Acoustic Inspection",
      desc: "Baseline decibel measurements, spatial frequency audits, and partition transmission mapping on-site.",
    },
    {
      step: "02",
      title: "CAD & BIM Simulation",
      desc: "Acoustic modeling of structural vibrations, flanking paths, and bespoke resilient channel detailing.",
    },
    {
      step: "03",
      title: "Certified Installation",
      desc: "Professional site deployment with high-density mineral wool, decoupled clips, and acoustic sealants.",
    },
    {
      step: "04",
      title: "Field Acoustic Sign-Off",
      desc: "Pre-occupancy decibel transmission testing, certified STC reporting, and formal client handover.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white">
      {/* Global Fixed Header */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main>
        {/* 1. ARCHITECTURAL HERO SECTION - WARM EDITORIAL SPLIT */}
        <section className="w-full bg-[#FAF9F6] border-b border-gray-200/80 pt-10 sm:pt-14 lg:pt-16 pb-16 lg:pb-20">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

            {/* Category Breadcrumb Tag */}
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <span className="px-3.5 py-1 bg-black text-white text-[11px] font-sans font-bold tracking-widest uppercase rounded-full">
                02
              </span>
              <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-500 uppercase">
                ABOUT SKYLINK ACOUSTICS
              </span>
              <div className="w-12 h-[1px] bg-gray-300" />
            </div>

            {/* Main Hero Split Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* Left Column: Heading & Mission */}
              <div className="lg:col-span-6 space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-[50px] xl:text-[56px] font-bold text-[#111] leading-[1.08] tracking-[-0.03em] uppercase">
                  Engineering Better Sound Experiences
                </h1>

                <div className="space-y-4 text-gray-700 font-sans text-sm sm:text-base leading-relaxed max-w-xl">
                  <p className="font-medium text-[#111]">
                    Skylink Acoustics delivers professional acoustic solutions designed to improve sound quality, reduce unwanted noise, control reverberation and create comfortable, high-performance spaces.
                  </p>

                  <p className="text-gray-600">
                    We are a specialist acoustic and interior solutions provider serving residential, hospitality, commercial and large-scale projects. Our solutions can be integrated into both new construction and existing fit-out projects — from a single private room to a full-scale development.
                  </p>

                  <p className="text-gray-500 text-xs sm:text-sm">
                    Every engagement begins with the space itself: its use, its geometry, its materials and the experience it needs to deliver. From that understanding, we design and install acoustic and interior systems that perform quietly in the background and beautifully in the room.
                  </p>
                </div>

                {/* Focus Areas */}
                <div className="pt-2">
                  <span className="text-[10px] font-sans font-bold tracking-[0.16em] text-gray-400 uppercase block mb-2">
                    CORE FOCUS:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-800">
                    {["Acoustic Treatment", "Acoustic Insulation", "Home Theater", "Starry Sky Lighting", "Professional Installation"].map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-gray-200 rounded-full shadow-2xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Curved Pill Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="px-8 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg rounded-full flex items-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Request a Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppUrl("Hello Skylink Acoustics, I would like to discuss an acoustic project.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all rounded-full flex items-center gap-2 shadow-xs active:scale-95"
                  >
                    <WhatsAppChatIcon className="w-4 h-4 fill-[#00A859]" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Architectural Photography with Floating Precision Card */}
              <div className="lg:col-span-6 relative">
                <div className="relative overflow-hidden border border-gray-200/80 shadow-2xl aspect-[16/11] bg-black group">
                  <img
                    src="/images/villa-pool-story.jpg"
                    alt="Skylink Architectural Luxury Villa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Bottom Image Overlay Description */}
                  <div className="absolute bottom-5 left-6 right-6 text-white">
                    <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-black/70 backdrop-blur-md px-3.5 py-1 border border-white/20 rounded-full inline-block mb-1.5">
                      INTEGRATED ACOUSTIC ARCHITECTURE
                    </span>
                    <p className="text-xs font-sans text-gray-300">
                      Bespoke acoustic treatment engineered directly into villa partitions and cinema suites.
                    </p>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white p-5 border border-gray-200 shadow-xl rounded-2xl items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-serif text-2xl font-normal text-black block leading-none">STC 65+</span>
                    <span className="text-[11px] font-sans font-semibold text-gray-500 uppercase tracking-wider mt-0.5 block">
                      Certified Soundproofing
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. STATS & PERFORMANCE BENCHMARKS BAR */}
        <section className="w-full bg-white py-12 sm:py-16 border-b border-gray-200/80">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-200/80">
              {stats.map((stat, idx) => (
                <div key={idx} className={`space-y-2 ${idx > 0 ? "pt-6 lg:pt-0" : ""}`}>
                  <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black tracking-tight block">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 font-sans font-medium block max-w-[200px] mx-auto leading-snug">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. OUR STORY & CRAFTSMANSHIP (SPLIT SECTION) */}
        <section className="w-full bg-[#FAF9F6] py-16 sm:py-24 border-b border-gray-200/80">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Column: Perspective Blueprint Art */}
              <div className="lg:col-span-6 relative">
                <div className="relative overflow-hidden border border-gray-200/80 shadow-xl bg-white aspect-[16/11]">
                  <img
                    src="/images/about-sketch-render.jpg"
                    alt="Architectural Blueprint to Reality"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 border border-gray-200 rounded-full text-[11px] font-sans font-bold tracking-wider uppercase text-black">
                    Concept CAD to Completion
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative Story */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block mb-2">
                    OUR HERITAGE &amp; MISSION
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight leading-[1.1]">
                    Engineered Sound. <br />
                    Architectural Harmony.
                  </h2>
                </div>

                <p className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed">
                  Founded with a vision to eliminate acoustic compromise, Skylink Engineering &amp; Construction has grown into a trusted partner for luxury homeowners, architects, commercial developers, and cinema enthusiasts.
                </p>

                <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                  Whether creating an ultra-private basement home theater with 120dB containment, treating luxury high-rise master suites with decoupled acoustic wall assemblies, or installing vibration-damped gym flooring, our multidisciplinary team handles everything from physics modeling to final aesthetic finish.
                </p>

                {/* 3 Discipline Badges */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-medium text-gray-800">
                      Decoupled wall, ceiling &amp; floating floor isolation assemblies
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-medium text-gray-800">
                      Bespoke starry sky fiber-optic modular acoustic panels
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-sans font-medium text-gray-800">
                      Comprehensive turnkey interior fit-out, joinery &amp; millwork
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-black hover:text-gray-600 underline underline-offset-4 transition-colors"
                  >
                    <span>View Our Project Portfolio</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. THE SKYLINK STANDARD - 4 PRINCIPLES */}
        <section className="w-full bg-white py-16 sm:py-24 border-b border-gray-200/80">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-12">

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
                OUR PRINCIPLES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
                The Skylink Standard
              </h2>
              <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                Four foundational pillars that guarantee extraordinary acoustic comfort and long-term durability.
              </p>
            </div>

            {/* 4 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-[#FAF9F6] p-7 sm:p-8 rounded-2xl border border-gray-200/80 shadow-2xs hover:border-black hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-normal text-black leading-snug tracking-tight">
                        {pillar.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-[13px] text-gray-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-gray-400 group-hover:text-black transition-colors">
                      <span>Core Standard</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. METHODOLOGY & WORKFLOW */}
        <section className="w-full bg-[#FAF9F6] py-16 sm:py-24 border-b border-gray-200/80">
          <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 space-y-12">

            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase block">
                OUR METHODOLOGY
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-black tracking-tight">
                How We Deliver Perfection
              </h2>
              <p className="text-gray-500 font-sans text-xs sm:text-sm leading-relaxed">
                A structured engineering approach from initial decibel audit through final handover.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodology.map((m) => (
                <div
                  key={m.step}
                  className="p-6 sm:p-7 bg-white border border-gray-200/80 rounded-2xl shadow-2xs hover:border-black transition-colors space-y-3 group"
                >
                  <span className="font-serif text-3xl font-light text-gray-400 group-hover:text-black transition-colors block">
                    {m.step}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg font-normal text-black tracking-tight">
                    {m.title}
                  </h4>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />

      {/* Consultation Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
