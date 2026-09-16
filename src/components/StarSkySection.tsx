"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Sparkles, Moon, Sun, Sliders, ShieldCheck } from "lucide-react";

interface Props {
  onOpenQuoteModal: () => void;
}

export default function StarSkySection({ onOpenQuoteModal }: Props) {
  const tags = ["ELEGANT", "CUSTOMIZABLE", "IMMERSIVE", "LUXURY"];

  const features = [
    {
      title: "Pinpoint Fiber Optics",
      desc: "Thousands of individual optical fiber strands creating realistic celestial depth and constellations.",
      icon: Sparkles,
    },
    {
      title: "Sound-Absorbing Ceiling",
      desc: "Integrated into acoustic acoustic fabric panels that eliminate overhead flutter echo and reverberation.",
      icon: Moon,
    },
    {
      title: "Smart App & Voice Control",
      desc: "Adjust twinkle speeds, shooting star animations, and color temperatures via Lutron, Crestron, or smartphone.",
      icon: Sliders,
    },
    {
      title: "Zero Heat & Zero Maintenance",
      desc: "Solid-state cold light source with 50,000+ hour operating life and zero bulb replacement inside ceilings.",
      icon: ShieldCheck,
    },
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
            <span className="text-white font-semibold">Star Sky Lighting</span>
          </div>
        </div>

        {/* Top Breadcrumb */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-white text-black text-[11px] font-sans font-bold tracking-widest uppercase">
            06
          </span>
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-[0.24em] text-gray-400 uppercase">
            STAR SKY LIGHTING
          </span>
          <div className="w-12 h-[1px] bg-white/20" />
        </div>

        {/* Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal text-white leading-[1.08] tracking-tight">
              Bring The Stars<br />
              Into Your Space.
            </h1>

            <p className="text-gray-300 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              Customized fiber-optic lighting creates an elegant, immersive atmosphere for theaters, bedrooms, lounges, hotels and luxury interiors.
            </p>

            <p className="text-gray-400 font-sans text-xs sm:text-sm leading-relaxed max-w-lg">
              We combine micro-fiber optic lighting technology with high-performance acoustic ceiling tiles. The result is a breathtaking night-sky ambiance that also enhances room acoustics by absorbing flutter echoes.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 bg-white/10 border border-white/20 text-white text-xs font-sans font-semibold tracking-wider uppercase rounded-full"
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
                <span>Request Starlight Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/97470076272?text=Hello%20Skylink,%20I%20am%20interested%20in%20Star%20Sky%20Lighting%20solutions."
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-3.5 bg-transparent hover:bg-white/10 border border-white/30 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative overflow-hidden border border-white/20 shadow-2xl aspect-[16/11] bg-black group">
              <img
                src="/images/starsky-bright.jpg"
                alt="Luxury Star Sky Ceiling Installation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 border border-white/20 inline-block mb-1">
                  CELESTIAL FIBER-OPTICS
                </span>
                <p className="text-xs font-sans text-gray-300">Custom Constellations &amp; Dimmable Twinkle Control</p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Feature Pillars */}
        <div className="pt-8 border-t border-white/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-white/5 border border-white/10 hover:border-white/40 transition-colors space-y-3"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-normal text-white tracking-tight">{f.title}</h3>
                  <p className="font-sans text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </section>
    </div>
  );
}
