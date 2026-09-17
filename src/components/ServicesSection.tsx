"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import ServiceDetailModal, { ServiceDetail } from "@/components/ServiceDetailModal";

interface ServicesSectionProps {
  onOpenQuoteModal?: () => void;
  initialView?: "carousel" | "grid";
}

export default function ServicesSection({ onOpenQuoteModal, initialView = "carousel" }: ServicesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [viewMode, setViewMode] = useState<"carousel" | "grid">(initialView);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Exact 6 services matching official Skylink Acoustics specification
  const services: ServiceDetail[] = [
    {
      id: "home-theater",
      num: "01",
      tag: "01 — LUXURY HOME THEATERS",
      title: "Luxury Home Theater Solutions",
      headline: "YOUR HOME. YOUR CINEMA. PERFECT SOUND.",
      specs: "Acoustic Wall & Ceiling Treatment",
      desc: "Transform your private entertainment room into an immersive cinematic experience. Our home theater acoustic solutions are designed to control unwanted reflections, improve sound clarity and create a balanced listening environment.",
      longDesc: "Experience every dialogue, detail and soundtrack with greater clarity through calibrated speaker integration, bass management, reverberation control and professional installation.",
      statement: "“Experience every dialogue, detail and soundtrack with greater clarity.”",
      targetClients: "Luxury Villa Owners · Homeowners · Private Cinema Projects · Interior Designers",
      applications: ["LUXURY VILLAS", "MEDIA ROOMS", "HOME THEATERS", "ENTERTAINMENT ROOMS"],
      features: [
        {
          title: "Acoustic Wall & Ceiling Treatment",
          desc: "Architectural stretched-fabric systems and wooden diffusers for precise reverberation control.",
        },
        {
          title: "Sound Isolation & Decoupling",
          desc: "Structural wall decoupling and perimeter seals prevent sound leakage into adjoining living areas.",
        },
        {
          title: "Speaker Integration & Bass Management",
          desc: "Corner bass traps and acoustic baffles eliminate standing waves and room flutter echo.",
        },
        {
          title: "Customized Acoustic Design",
          desc: "Single-point turnkey delivery from acoustic blueprint modeling to certified field sign-off.",
        },
      ],
      process: [
        { step: "01", title: "Consultation", desc: "Room acoustic audit & client entertainment vision." },
        { step: "02", title: "Design", desc: "3D acoustic simulation, RT60 calculations & layout." },
        { step: "03", title: "Installation", desc: "Precision framing, acoustic baffles & speaker integration." },
        { step: "04", title: "Final Delivery", desc: "Audio calibration, measurement report & handover." },
      ],
      image: "/images/theater-bright.jpg",
      href: "/home-theater",
    },
    {
      id: "acoustic-insulation",
      num: "02",
      tag: "02 — HOTELS & APARTMENTS",
      title: "Hotel & Apartment Acoustic Insulation",
      headline: "PRIVACY IS THE NEW LUXURY.",
      specs: "Wall & Ceiling Sound Isolation",
      desc: "In hospitality and residential environments, acoustic privacy is a critical part of comfort and quality. Our acoustic insulation solutions help reduce unwanted sound transmission between guest rooms, apartments, corridors, service areas, mechanical areas and common spaces.",
      longDesc: "Certified STC high-performance sound barrier assemblies engineered for room-to-room isolation, impact noise control, and mechanical rumble attenuation.",
      statement: "“Quieter spaces. Greater privacy. Better guest experiences.”",
      targetClients: "Hotels · Apartments · Residential Developers · Hospitality Projects",
      applications: ["HOTELS", "APARTMENTS", "GUEST ROOMS", "CORRIDORS", "COMMON AREAS"],
      features: [
        {
          title: "Wall & Ceiling Acoustic Insulation",
          desc: "High-density mineral cores and resilient channels blocking speech and media transmission.",
        },
        {
          title: "Room-to-Room Sound Isolation",
          desc: "Certified STC assemblies providing total privacy between neighboring suites.",
        },
        {
          title: "Impact & Mechanical Noise Control",
          desc: "Isolates HVAC duct vibration, plumbing drainage rush, and structure-borne footfalls.",
        },
        {
          title: "New Build & Fit-Out Applications",
          desc: "Seamlessly deployed in both early construction phases and existing interior fit-out renovations.",
        },
      ],
      process: [
        { step: "01", title: "Consultation", desc: "Review architectural drawings & acoustic targets." },
        { step: "02", title: "Design", desc: "Specify decoupled partition details & resilient clips." },
        { step: "03", title: "Installation", desc: "Supply certified high-density insulation & damping membranes." },
        { step: "04", title: "Final Delivery", desc: "On-site acoustic decibel drop testing & sign-off." },
      ],
      image: "/images/bedroom-bright.jpg",
      href: "/acoustic-insulation",
    },
    {
      id: "new-build",
      num: "03",
      tag: "03 — NEW BUILDINGS",
      title: "Acoustic Treatment for New Buildings",
      headline: "BUILD QUIETER. LIVE BETTER.",
      specs: "Acoustic Planning & Architecture",
      desc: "Acoustic performance should be considered during the design and construction stage — not after the problem appears. Skylink Acoustics provides acoustic solutions that can be incorporated into new building projects from the planning stage.",
      longDesc: "Early coordination with developers, architects, consultants, and contractors to build performance directly into structural slabs, partitions, and MEP corridors.",
      statement: "“Plan acoustics early. Build performance into the project.”",
      targetClients: "Developers · Architects · Consultants · Contractors · Project Managers",
      applications: ["RESIDENTIAL DEVELOPMENTS", "VILLAS & APARTMENTS", "HOTELS & HOSPITALITY", "OFFICES & COMMERCIAL"],
      features: [
        {
          title: "Acoustic Consultation & Planning",
          desc: "BIM/CAD acoustic modeling and spatial sound transmission mapping during blueprint development.",
        },
        {
          title: "Material Selection & Certification",
          desc: "Specifying certified non-combustible sound insulation, decoupled clips, and acoustic barriers.",
        },
        {
          title: "Project Coordination & MEP Alignment",
          desc: "Liaising with structural, mechanical, and drywall teams to prevent acoustic flanking leaks.",
        },
        {
          title: "Professional Installation & Sign-Off",
          desc: "On-site certified installation oversight and pre-occupancy acoustic verification.",
        },
      ],
      process: [
        { step: "01", title: "Consultation", desc: "Architectural drawing review & noise zone mapping." },
        { step: "02", title: "Design", desc: "Acoustic engineering specifications & BIM details." },
        { step: "03", title: "Installation", desc: "Contractor coordination, supervision & installation." },
        { step: "04", title: "Final Delivery", desc: "Acoustic field measurement & compliance certificate." },
      ],
      image: "/images/villa-bright.jpg",
      href: "/new-build",
    },
    {
      id: "fit-out",
      num: "04",
      tag: "04 — FIT-OUT PROJECTS",
      title: "Residential & Commercial Fit-Out Solutions",
      headline: "FROM ONE ROOM TO AN ENTIRE PROJECT.",
      specs: "Customized Fit-Out Acoustic Systems",
      desc: "Whether it is a single residential room or a major commercial development, Skylink Acoustics provides project-specific acoustic solutions designed around the space, application and performance requirements.",
      longDesc: "Tailored acoustic wall systems, suspended ceilings, reverberation control, and sound isolation that integrate gracefully with architectural millwork and interior designs.",
      statement: "“One specialist. Multiple project scales.”",
      targetClients: "Villas & Residences · Offices & Restaurants · Hotels · Retail · Commercial Interiors",
      applications: ["01 SINGLE ROOM", "02 HOME THEATER", "03 OFFICE / RESTAURANT", "04 HOTEL / LARGE-SCALE"],
      features: [
        {
          title: "Scalable Project Delivery",
          desc: "From single private suites and executive boardrooms to full hotel and commercial developments.",
        },
        {
          title: "Acoustic Wall & Ceiling Systems",
          desc: "Architectural micro-perforated timber slats, fabric baffles, and suspended acoustic clouds.",
        },
        {
          title: "Reverberation & Echo Control",
          desc: "Tuning room acoustics for speech intelligibility in restaurants, offices, and conference rooms.",
        },
        {
          title: "Professional Installation",
          desc: "Expert fit-out craftsmen ensuring seamless alignment with architectural finishes.",
        },
      ],
      process: [
        { step: "01", title: "Consultation", desc: "Space inspection, 3D measurements & design brief." },
        { step: "02", title: "Design", desc: "Shop drawings, finish sample approvals & MEP alignment." },
        { step: "03", title: "Installation", desc: "Precision joinery assembly, acoustic paneling & painting." },
        { step: "04", title: "Final Delivery", desc: "Punch-list inspection & flawless turnkey handover." },
      ],
      image: "/images/fitout-bright.jpg",
      href: "/fit-out",
    },
    {
      id: "gym-floor",
      num: "05",
      tag: "05 — GYM FLOOR INSULATION",
      title: "Gym Floor Acoustic Insulation",
      headline: "POWER WITHOUT THE NOISE.",
      specs: "Impact & Vibration Control",
      desc: "Heavy equipment, dropped weights and high-impact exercise can generate significant impact noise and vibration. Our acoustic floor solutions control impact noise, weight-drop thump, structural vibration and footfalls.",
      longDesc: "High performance above. Controlled impact below. Multi-layered elastomeric rubber systems absorb severe kinetic energy before vibration transmits into building structures.",
      statement: "“High performance above. Controlled impact below.”",
      targetClients: "Commercial Gyms · Fitness Centers · Private Gyms · Residential Gyms · Hotels · Wellness Centers",
      applications: ["COMMERCIAL GYMS", "FITNESS CENTERS", "PRIVATE GYMS", "RESIDENTIAL GYMS", "HOTEL WELLNESS"],
      features: [
        {
          title: "Impact & Drop-Weight Absorption",
          desc: "Dampens heavy dumbbell and barbell drops with up to 32dB Delta Lw impact sound reduction.",
        },
        {
          title: "Structural Vibration Isolation",
          desc: "Decoupled elastomeric sub-base prevents motor rumble from treadmills and cardio equipment.",
        },
        {
          title: "Subfloor Concrete Protection",
          desc: "Protects concrete slabs from structural cracking and point-load impact stress.",
        },
        {
          title: "Athlete Stability & Rebound",
          desc: "Engineered surface resilience delivers optimal joint comfort and steady footing.",
        },
      ],
      process: [
        { step: "01", title: "Consultation", desc: "Equipment layout review & slab vibration assessment." },
        { step: "02", title: "Design", desc: "Zoned flooring system (heavy drop vs cardio areas)." },
        { step: "03", title: "Installation", desc: "Layered rubber underlay, bonding & seamless tile laying." },
        { step: "04", title: "Final Delivery", desc: "Drop-test verification & maintenance guidelines." },
      ],
      image: "/images/gym-pdf-hero.jpg",
      href: "/gym-floor",
    },
    {
      id: "star-sky",
      num: "06",
      tag: "06 — STARRY SKY LIGHTING",
      title: "Starry Sky Luxury Lighting",
      headline: "BRING THE STARS IN.",
      specs: "Bespoke Fibre-Optic Ceilings",
      desc: "Transform ordinary ceilings into extraordinary experiences with bespoke Starry Sky Lighting — an elegant, subtle effect that complements acoustic ceilings and home theater projects.",
      longDesc: "A ceiling that becomes the experience. Thousands of hand-threaded optical fibers combined with sound-absorbing acoustic fabric panels, shooting stars, and constellation effects.",
      statement: "“A ceiling that becomes the experience.”",
      targetClients: "Luxury Home Theaters · Bedrooms · VIP Spaces · Entertainment Rooms · Lounges · Hospitality",
      applications: ["LUXURY HOME THEATERS", "BEDROOMS", "VIP SPACES", "ENTERTAINMENT ROOMS", "LOUNGES"],
      features: [
        {
          title: "Fibre Optic Lighting",
          desc: "Pinpoint optical fibers produce realistic celestial constellations with subtle twinkle depth.",
        },
        {
          title: "Acoustic Ceiling Integration",
          desc: "Handcrafted acoustic fabric panels absorb overhead echo while glowing with stars.",
        },
        {
          title: "Custom Star Patterns",
          desc: "Tailored constellations, shooting star animations, and custom color temperature control.",
        },
        {
          title: "Integrated Interior Design",
          desc: "Solid-state, silent, zero-heat illuminators with 50,000+ hour operating life.",
        },
      ],
      process: [
        { step: "01", title: "Consultation", desc: "Ceiling dimension audit & constellation pattern selection." },
        { step: "02", title: "Design", desc: "Modular acoustic panel layout & wiring schematics." },
        { step: "03", title: "Installation", desc: "Panel mounting, fiber harness connection & lighting setup." },
        { step: "04", title: "Final Delivery", desc: "Smart home automation programming & client handover." },
      ],
      image: "/images/starsky-bright.jpg",
      href: "/star-sky",
    },
  ];

  // Triple array for seamless infinite floating marquee
  const marqueeServices = [...services, ...services, ...services];

  return (
    <section id="services" className="w-full bg-[#F5F5F7] min-h-[calc(100vh-76px)] flex items-center py-12 lg:py-16 border-b border-gray-200/80 overflow-hidden">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Header Row: Title */}
        <div className="mb-8 sm:mb-12">
          {initialView === "grid" && (
            <div className="mb-4">
              <Link
                href="/#services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:text-blue-700 group-hover:-translate-x-1.5 transition-all duration-200" />
                <span className="underline decoration-blue-400/60 underline-offset-4 group-hover:decoration-blue-700">Back to Home</span>
              </Link>
            </div>
          )}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111] tracking-[-0.03em] uppercase">
            Our Acoustic &amp; Interior Solutions
          </h2>
        </div>

        {/* Dynamic Display: Floating Continuous Carousel or Grid */}
        {viewMode === "carousel" ? (
          <>
            {/* Continuous Animated Floating Track (Left to Right) */}
            <div
              className="relative w-full overflow-hidden py-3"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex gap-5 sm:gap-6 w-max cursor-grab active:cursor-grabbing px-3"
                animate={{
                  x: isPaused ? undefined : ["-33.333%", "0%"],
                }}
                transition={{
                  x: {
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {marqueeServices.map((service, idx) => (
                  <Link
                    key={`${service.id}-${idx}`}
                    href={service.href}
                    className="group relative flex-none w-[275px] sm:w-[315px] lg:w-[335px] h-[430px] sm:h-[470px] overflow-hidden bg-black shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-300/70 rounded-2xl block"
                  >
                    {/* Background Architectural Photo */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-105"
                    />

                    {/* Ambient Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 via-50% to-black/20 group-hover:from-black transition-colors duration-500" />

                    {/* Top Step Number Badge from PDF */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-[11px] font-sans font-bold tracking-widest text-white border border-white/20 uppercase rounded-full">
                        {service.num}
                      </span>
                    </div>

                    {/* Top Right Quick Click Action */}
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Bottom Content Block */}
                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
                      <span className="text-[10px] sm:text-[11px] font-sans font-bold text-gray-300 tracking-[0.2em] uppercase block mb-1">
                        {service.tag}
                      </span>

                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-2 group-hover:text-gray-200 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-gray-300 font-sans text-xs leading-relaxed line-clamp-2 mb-3">
                        {service.headline}
                      </p>

                      {/* Explore Pill Button */}
                      <div className="pt-3 border-t border-white/20 flex items-center justify-between text-white text-xs font-semibold">
                        <span className="tracking-wide uppercase text-[11px] group-hover:underline underline-offset-4">
                          Explore Solution
                        </span>
                        <div className="w-7 h-7 bg-white/20 group-hover:bg-white group-hover:text-black flex items-center justify-center rounded-full transition-all duration-300">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Bottom Control Bar - Aligned right, vibrant blue link with arrow */}
            <div className="flex items-center justify-end mt-6 pt-4 border-t border-gray-200/60">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span className="underline decoration-blue-400/60 underline-offset-4 group-hover:decoration-blue-700">View More</span>
                <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1.5 transition-all duration-200" />
              </Link>
            </div>
          </>
        ) : (
          /* Grid View: Lists all 6 solutions cleanly */
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="group bg-white border border-gray-200/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden rounded-2xl"
                >
                  {/* Top Image Banner */}
                  <Link
                    href={service.href}
                    className="relative h-[230px] sm:h-[250px] overflow-hidden bg-black cursor-pointer block"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Number Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[11px] font-sans font-bold tracking-widest text-white border border-white/20 uppercase rounded-full">
                        {service.num}
                      </span>
                    </div>

                    {/* Top Right Quick Action */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg group-hover:bg-white group-hover:scale-110 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Category Tag on bottom of image */}
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <span className="text-[10px] font-sans font-bold text-gray-200 tracking-[0.2em] uppercase block">
                        {service.tag}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <Link
                        href={service.href}
                        className="block font-heading text-xl font-bold text-black tracking-tight cursor-pointer hover:text-gray-700 transition-colors"
                      >
                        {service.title}
                      </Link>
                      <p className="text-xs font-sans font-bold uppercase tracking-wider text-[#C49B5B]">
                        {service.headline}
                      </p>
                      <p className="text-xs sm:text-sm font-sans text-gray-600 leading-relaxed line-clamp-3">
                        {service.desc}
                      </p>
                    </div>

                    {/* Target Clients */}
                    {service.targetClients && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-[11px] font-sans text-gray-500 font-medium">
                          <span className="font-bold text-gray-800 uppercase tracking-wider">Clients: </span>
                          {service.targetClients}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons Row */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className="px-4 py-2 bg-gray-100 hover:bg-black hover:text-white text-black text-xs font-sans font-semibold rounded-full uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Quick Specs
                      </button>
                      <Link
                        href={service.href}
                        className="inline-flex items-center gap-1 text-xs font-sans font-bold text-black hover:text-gray-600 uppercase tracking-wider transition-colors"
                      >
                        <span>View Full Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Bar in Grid Mode */}
            <div className="flex items-center justify-start mt-6 pt-4 border-t border-gray-200/60">
              <Link
                href="/#services"
                className="group inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-blue-600 group-hover:text-blue-700 group-hover:-translate-x-1.5 transition-all duration-200" />
                <span className="underline decoration-blue-400/60 underline-offset-4 group-hover:decoration-blue-700">Back to Home</span>
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Interactive Detail Modal for clicked service card */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        onOpenQuoteModal={onOpenQuoteModal || (() => { })}
      />
    </section>
  );
}
