"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { X, ArrowRight, ArrowLeft, CheckCircle2, Sliders, ShieldCheck, Compass, Phone, ArrowUpRight } from "lucide-react";
import { trackWhatsAppLead } from "@/lib/track";

export interface ServiceDetail {
  id: string;
  num: string;
  tag: string;
  title: string;
  headline: string;
  specs: string;
  desc: string;
  longDesc: string;
  statement?: string;
  targetClients?: string;
  applications: string[];
  features: { title: string; desc: string }[];
  process: { step: string; title: string; desc: string }[];
  image: string;
  href: string;
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export default function ServiceDetailModal({
  service,
  isOpen,
  onClose,
  onOpenQuoteModal,
}: ServiceDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Skylink Acoustics, I would like to discuss: ${service.title} (${service.tag}).`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container - Curved */}
      <div className="relative z-10 w-full max-w-5xl bg-white border border-gray-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-up rounded-2xl sm:rounded-3xl">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-gray-300 text-black text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs group mr-1"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
            <span className="px-3 py-1 bg-black text-white text-[10px] font-sans font-bold tracking-widest uppercase rounded-full">
              {service.num}
            </span>
            <span className="text-xs font-sans font-semibold tracking-widest text-gray-500 uppercase">
              {service.tag}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white hover:bg-gray-200 border border-gray-300 flex items-center justify-center text-black transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-10">
          
          {/* Section 1: Hero Split (Image + Core Headline) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-6 relative overflow-hidden border border-gray-200 shadow-md aspect-[16/11] bg-black">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-sans font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 inline-block mb-1">
                  {service.specs}
                </span>
                <p className="text-xs text-white/80 font-sans line-clamp-1">{service.title} Architectural Engineering</p>
              </div>
            </div>

            {/* Right Headline & Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-sans font-bold tracking-[0.24em] text-gray-400 uppercase block">
                  {service.tag}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal text-black tracking-tight leading-[1.08]">
                  {service.headline}
                </h2>
              </div>

              <p className="font-sans text-sm text-gray-700 leading-relaxed">
                {service.desc}
              </p>

              <p className="font-sans text-xs sm:text-sm text-gray-500 leading-relaxed">
                {service.longDesc}
              </p>

              {/* Statement Quote */}
              {service.statement && (
                <div className="p-3.5 bg-[#FAF9F6] border-l-2 border-black rounded-r-xl">
                  <p className="font-sans text-xs sm:text-sm font-semibold text-[#111] italic">
                    {service.statement}
                  </p>
                </div>
              )}

              {/* Spatial Applications Tags */}
              <div className="pt-2">
                <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-2">
                  IDEAL FOR APPLICATION IN:
                </span>
                <div className="flex flex-wrap gap-2">
                  {service.applications.map((app, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1 bg-[#F5F5F7] border border-gray-200 text-black text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider uppercase rounded-full"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Target Clients */}
              {service.targetClients && (
                <div className="pt-1">
                  <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase block mb-1">
                    TARGET CLIENTS:
                  </span>
                  <span className="text-xs font-sans text-gray-600 font-medium">
                    {service.targetClients}
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Section 2: Core Engineering Pillars & Benefits */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans font-bold tracking-[0.24em] text-gray-500 uppercase">
                ENGINEERING SPECIFICATIONS &amp; BENEFITS
              </span>
              <div className="w-12 h-[1px] bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#FAF9F6] border border-gray-200/80 rounded-xl space-y-1.5 hover:border-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
                    <h4 className="font-sans text-xs sm:text-sm font-bold text-black tracking-tight">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed pl-6">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Engineering Process & Methodology */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans font-bold tracking-[0.24em] text-gray-500 uppercase">
                TURNKEY IMPLEMENTATION PROCESS
              </span>
              <div className="w-12 h-[1px] bg-gray-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="p-4 bg-white border border-gray-200 rounded-xl space-y-2 shadow-2xs"
                >
                  <span className="text-[10px] font-sans font-bold tracking-widest text-gray-400 uppercase">
                    PHASE {step.step}
                  </span>
                  <h5 className="font-sans text-xs sm:text-sm font-bold text-black tracking-tight">
                    {step.title}
                  </h5>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Modal Action Bar */}
        <div className="px-6 py-4 border-t border-gray-200 bg-[#FAF9F6] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="px-7 py-3.5 bg-[#111] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg rounded-full transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Request Engineering Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://wa.me/97333048555?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead("Service Modal CTA", service.title)}
              className="px-6 py-3.5 bg-white hover:bg-gray-100 border border-gray-300 text-black font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp Direct</span>
            </a>
          </div>

          <Link
            href={service.href}
            onClick={onClose}
            className="text-xs font-sans font-bold uppercase tracking-wider text-black hover:text-gray-600 flex items-center gap-1.5 transition-colors underline underline-offset-4"
          >
            <span>Visit Full Dedicated Page</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
