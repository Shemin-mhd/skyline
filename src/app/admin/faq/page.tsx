"use client";

import React, { useState } from "react";
import { HelpCircle, Plus, Search, ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [faqs] = useState<FAQItem[]>([
    {
      q: "What STC rating is recommended for private villa home cinemas?",
      a: "We engineer private home cinemas to STC 65+ to completely decouple sub-bass frequencies (20Hz–80Hz) from adjacent master suites and upper-floor living quarters.",
      category: "Private Cinema",
    },
    {
      q: "How does floating gym floor acoustic insulation prevent vibration transmission?",
      a: "Our multi-tier decoupled elastomers and high-density impact pads attenuate weight-drop shock before energy couples into the building slab.",
      category: "Gym Acoustics",
    },
    {
      q: "Are the acoustic wood slat panels fire-rated for commercial interiors?",
      a: "Yes, all Skylink micro-perforated timber slats and acoustic backer felts are certified to BS EN 13501-1 Class B/A fire safety standards.",
      category: "Fit-Out & Materials",
    },
    {
      q: "How long does a full architectural acoustic inspection and RT60 report take in Bahrain?",
      a: "Our certified acoustic engineers typically complete on-site calibrated noise audits and 3D reverberation RT60 mapping within 24–48 hours, followed by full engineering submittals.",
      category: "Consultation & Testing",
    },
    {
      q: "Can soundproofing be retrofitted without completely demolishing existing walls?",
      a: "Yes, through our slimline decoupled resilient channel system and acoustic mass-loaded vinyl dampening membranes, we achieve significant dB attenuation with minimal lost floor space.",
      category: "Soundproofing",
    },
  ]);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Header Banner */}
      <div className="bg-white p-5 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Acoustic Engineering FAQ Knowledgebase
            </h3>
            <p className="text-xs text-slate-500">
              Manage client answers for STC sound isolation ratings, reverberation control, and installation timelines
            </p>
          </div>
        </div>

        <div className="relative w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions or terms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-slate-800"
          />
        </div>
      </div>

      {/* FAQ Items */}
      <div className="bg-white p-6 border border-slate-200/90 rounded-xl shadow-2xs space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            No questions matched your search term.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:border-slate-400 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <span className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold rounded shrink-0">
                  {faq.category}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed pl-5 text-xs">
                {faq.a}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
