"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SpacesSection() {
  const cards = [
    {
      title: "Home Theater",
      href: "/home-theater",
      image: "/images/theater-bright.jpg",
    },
    {
      title: "Acoustic Solutions",
      href: "/acoustic-insulation",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Fit-Out Solutions",
      href: "/fit-out",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Star Sky",
      href: "/star-sky",
      image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section id="solutions" className="w-full bg-[#FBF9F5] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header Row matching reference image */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-[#E5E0D8]">
          <div className="space-y-2">
            <span className="text-[#9E814D] font-sans text-[10px] uppercase font-bold tracking-[0.25em] block">
              SPACES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1815] uppercase tracking-tight font-semibold">
              SPACES THAT INSPIRE
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-[#6B6355] font-sans text-xs md:text-sm leading-relaxed">
              From private home theaters to luxury residences, hotels, gyms and commercial spaces — we create environments that sound better, feel better and look extraordinary.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="w-12 h-[1px] bg-[#9E814D]" />
              <Link
                href="/projects"
                className="text-[#1A1815] hover:text-[#9E814D] font-sans text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9E814D] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid matching reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10 md:mt-14">
          {cards.map((card, idx) => (
            <Link
              key={idx}
              href={card.href}
              className="group relative h-[380px] sm:h-[420px] rounded-xl overflow-hidden shadow-md border border-[#E5E0D8] cursor-pointer block"
            >
              {/* Image */}
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.7]"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Bottom Title & Arrow matching reference image */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                <h3 className="font-serif text-lg md:text-xl font-medium text-white tracking-wide">
                  {card.title}
                </h3>
                <div className="w-8 h-8 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm flex items-center justify-center text-[#D4B57E] group-hover:border-[#D4B57E] group-hover:bg-[#D4B57E] group-hover:text-[#1A1815] transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

