"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, Moon, Star, Layers, Palette, CheckCircle2 } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function StarSkySection({ onOpenQuoteModal }: Props) {
  const tags = ["FIBRE OPTIC LIGHTING", "CUSTOM STAR PATTERNS", "BESPOKE CEILING DESIGN", "ACOUSTIC INTEGRATION"];

  const features = [
    {
      title: "Fibre Optic Lighting",
      desc: "Micro-strand optical fibers providing pure, cold light points with customizable twinkle frequencies.",
      icon: Sparkles,
    },
    {
      title: "Custom Star Patterns",
      desc: "True-to-life celestial constellations, custom Milky Way designs, and shooting star effects.",
      icon: Star,
    },
    {
      title: "Bespoke Ceiling Design",
      desc: "Handcrafted acoustic fabric panels precision-fitted to room geometries with perimeter indirect cove LEDs.",
      icon: Moon,
    },
    {
      title: "Integrated Interior Design",
      desc: "Seamless acoustic absorption and hidden cable routing that preserve the architectural finish of luxury rooms.",
      icon: Palette,
    },
  ];

  const applications = [
    "Luxury home theaters",
    "Bedrooms",
    "VIP spaces",
    "Entertainment rooms",
    "Lounges",
    "Hospitality interiors",
  ];

  return (
    <div className="w-full bg-[#0B0C0E] text-white">
      <section id="star-sky" className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-16 space-y-12">
        
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white hover:text-black text-white border border-white/20 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-xs group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Go Back</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-gray-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/#services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white font-semibold">Starry Sky Lighting</span>
          </div>
        </div>

        {/* Top Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white text-black text-[11px] font-sans font-bold tracking-widest uppercase">
            06
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-400 uppercase">
            STARRY SKY LUXURY LIGHTING
          </span>
          <div className="w-12 h-[1px] bg-white/20" />
        </div>

        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
              Premium Starry Sky &amp; Fibre Optic Ceiling Lighting
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-bold text-white leading-[1.08] tracking-tight">
              BRING THE STARS IN.
            </h1>

            <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              Transform ordinary ceilings into extraordinary experiences with bespoke Starry Sky Lighting — an elegant, subtle effect that complements acoustic ceilings and home theater projects.
            </p>

            {/* Statement Quote */}
            <div className="p-5 bg-white/5 border-l-2 border-[#C49B5B] border-y border-r border-white/10">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C49B5B] block mb-1">
                Design Philosophy
              </span>
              <p className="font-heading text-lg font-semibold text-white tracking-tight">
                “A ceiling that becomes the experience.”
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-white/10 border border-white/15 text-gray-200 text-xs font-sans font-medium tracking-wider uppercase rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-8 py-3.5 bg-white hover:bg-gray-200 text-black font-sans text-xs font-bold uppercase tracking-wider shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Discuss Starlight Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/97333048555?text=Hello%20Skylink%20Acoustics,%20I%20am%20interested%20in%20Starry%20Sky%20Lighting%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-transparent hover:bg-white/10 border border-white/30 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <span>WhatsApp +973 33048555</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-white/20 shadow-2xl aspect-[16/11] bg-black group rounded-2xl">
              <img
                src="/images/starsky-bright.jpg"
                alt="Luxury Starry Sky Ceiling Installation by Skylink Acoustics"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 border border-white/20 inline-block mb-1.5 rounded-full">
                  BESPOKE FIBRE-OPTIC ARTISTRY
                </span>
                <p className="text-xs font-sans text-gray-300">Acoustically absorptive core with micro-aperture celestial constellations.</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Features */}
        <div className="pt-8 border-t border-white/15 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-bold uppercase tracking-[0.24em] text-gray-400">
              CORE FEATURES
            </span>
            <div className="flex-1 h-[1px] bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white/5 border border-white/10 hover:border-white/40 transition-colors space-y-3 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5 text-[#C49B5B]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white tracking-tight">{f.title}</h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Applications */}
        <div className="p-8 bg-white/5 border border-white/10 rounded-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-[#C49B5B]">
              Luxury Environments
            </span>
            <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
              Applications
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {applications.map((app, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-center flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C49B5B]" />
                <span className="text-xs font-sans font-semibold text-gray-200">{app}</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
