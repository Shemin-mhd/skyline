"use client";

import React, { useState } from "react";
import { FileText, Plus, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  specs: string;
  status: "Published" | "Draft";
  client: string;
  location: string;
}

export default function CMSPage() {
  const [caseStudies] = useState<CaseStudy[]>([
    {
      id: "cs-1",
      title: "Amwaj Luxury Villa Cinema",
      category: "Home Theater",
      specs: "STC 68 Soundproofing · 4K Laser Projection · Starry Sky Optical Ceiling",
      status: "Published",
      client: "Private VIP Villa",
      location: "Amwaj Islands, Bahrain",
    },
    {
      id: "cs-2",
      title: "Seef Executive Financial Tower Fit-Out",
      category: "Commercial Fit-Out",
      specs: "Acoustic Timber Micro-Perforated Slats · NRC 0.90 Reverberation Control",
      status: "Published",
      client: "Investment Bank HQ",
      location: "Seef District, Manama",
    },
    {
      id: "cs-3",
      title: "Apex Fitness Decoupled Gym Floor",
      category: "Gym Acoustic Flooring",
      specs: "Delta Lw 32dB Impact Noise Damping · 50mm Underlay Elastomer Isolation",
      status: "Published",
      client: "Commercial Gym Facility",
      location: "Saar, Kingdom of Bahrain",
    },
    {
      id: "cs-4",
      title: "Diplomatic Area Conference Hall",
      category: "Conference Acoustics",
      specs: "Speech Intelligibility STI 0.75+ · Decoupled Partition Walls",
      status: "Published",
      client: "Government Ministry",
      location: "Diplomatic Area, Manama",
    },
    {
      id: "cs-5",
      title: "Riffa Luxury Residence Soundproofing",
      category: "Architectural Isolation",
      specs: "Floating Ceiling Decouplers · STC 62 Wall Assemblies",
      status: "Published",
      client: "Royal Court Residence",
      location: "Riffa Views",
    },
  ]);

  return (
    <div className="space-y-5 font-sans text-xs">
      {/* Header Banner */}
      <div className="bg-white p-5 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Architectural Case Studies &amp; Projects CMS
            </h3>
            <p className="text-xs text-slate-500">
              Showcase luxury private cinemas, commercial fit-outs, and gym floor acoustic installations
            </p>
          </div>
        </div>

        <span className="px-3 py-1 bg-slate-900 text-white rounded-full font-bold text-xs shrink-0 w-fit">
          {caseStudies.length} Projects Live
        </span>
      </div>

      {/* Grid of Case Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
        {caseStudies.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/90 rounded-xl p-5 shadow-2xs hover:shadow-md hover:border-slate-900/60 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-bold rounded-full">
                  {item.category}
                </span>
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full">
                  ● {item.status}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>

              <div className="text-[11px] text-slate-500">
                <span>{item.client}</span> &middot; <span>{item.location}</span>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-600 font-mono text-[11px] flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item.specs}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/#portfolio"
                target="_blank"
                className="text-slate-900 hover:text-black font-bold inline-flex items-center gap-1 transition-colors"
              >
                <span>View on Website</span>
                <ExternalLink className="w-3 h-3" />
              </Link>

              <span className="text-[10px] text-slate-400 font-mono">
                CAD Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
