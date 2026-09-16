"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import ServiceDetailModal, { ServiceDetail } from "@/components/ServiceDetailModal";

interface ServicesSectionProps {
  onOpenQuoteModal?: () => void;
}

export default function ServicesSection({ onOpenQuoteModal }: ServicesSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Exact 6 services sorted to match PDF Page 2 to Page 7
  const services: ServiceDetail[] = [
    {
      id: "home-theater",
      num: "01",
      tag: "01 / HOME THEATER",
      title: "Home Theater",
      headline: "YOUR HOME. YOUR CINEMA.",
      specs: "Dolby Atmos • Acoustic Wall Paneling",
      desc: "Transform your home into a private cinematic experience with professionally designed acoustic solutions that improve sound clarity, reduce unwanted noise and create a comfortable entertainment environment.",
      longDesc: "From custom acoustic fabric wall systems and soundproof doors to precision RT60 reverberation tuning and bass trap integration, Skylink engineers every cinema for audiophile-grade immersion.",
      applications: ["PRIVATE VILLAS", "MEDIA ROOMS", "HOME THEATERS", "ENTERTAINMENT ROOMS"],
      features: [
        {
          title: "Dolby Atmos Isolation",
          desc: "Multi-layered acoustic decoupling ensures 100% immersive audio without disturbing neighboring living areas.",
        },
        {
          title: "Acoustic Wall Paneling",
          desc: "Bespoke acoustic fabric baffles, wooden diffusers, and micro-perforated sound absorption panels.",
        },
        {
          title: "Calibrated Sound Clarity",
          desc: "Eliminates room flutter echoes, standing waves, and harsh reflections for crystal-clear dialogue.",
        },
        {
          title: "Turnkey Cinema Build",
          desc: "Complete interior execution including tiered seating, concealed cabling, and cinema lighting.",
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
      tag: "02 / ACOUSTIC INSULATION",
      title: "Acoustic Insulation",
      headline: "QUIET SPACES. BETTER LIVING.",
      specs: "Decoupled Framing • STC 65+ Rating",
      desc: "Effective acoustic insulation designed to reduce sound transmission between rooms and neighboring spaces.",
      longDesc: "Engineered wall, ceiling, and subfloor partition systems that block airborne and structure-borne noise, delivering serene silence for luxury hospitality, multi-unit residential, and executive offices.",
      applications: ["HOTELS", "APARTMENTS", "GUEST ROOMS", "CORRIDORS", "COMMON AREAS"],
      features: [
        {
          title: "Maximum Privacy",
          desc: "Laboratory-certified STC 65+ acoustic wall assemblies protect private conversations between suites.",
        },
        {
          title: "Superior Comfort",
          desc: "Lowers background noise floors significantly to provide deep rest and undisturbed focus.",
        },
        {
          title: "Noise Reduction",
          desc: "Decoupled stud walls and resilient vibration channels stop footfall, plumbing, and airborne noise.",
        },
        {
          title: "Better Guest Experience",
          desc: "Ensures international 5-star hotel acoustic standards across guest rooms, adjoining doors, and suites.",
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
      tag: "03 / NEW BUILD PROJECTS",
      title: "New Build Projects",
      headline: "PLAN ACOUSTICS FROM THE START.",
      specs: "Architectural Planning • CAD Simulation",
      desc: "Skylink integrates acoustic treatments and insulation during planning and construction—for superior sound control and occupant comfort.",
      longDesc: "By collaborating with architects, structural engineers, and MEP contractors before drywall installation, we prevent costly retrofits and ensure acoustic perfection throughout the building lifecycle.",
      applications: ["RESIDENTIAL TOWERS", "LUXURY VILLAS", "COMMERCIAL COMPLEXES", "MIXED-USE DEVELOPMENTS"],
      features: [
        {
          title: "01 Design Phase",
          desc: "Comprehensive CAD acoustic modeling and sound pathway isolation planning.",
        },
        {
          title: "02 Material Selection",
          desc: "Sourcing certified fire-rated, non-combustible soundproofing and elastomeric floor isolators.",
        },
        {
          title: "03 Installation Oversight",
          desc: "Dedicated site engineers ensure zero acoustic flanking paths during MEP and drywall execution.",
        },
        {
          title: "04 Performance Verification",
          desc: "Pre-occupancy sound testing and acoustic certification for regulatory compliance.",
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
      tag: "04 / FIT-OUT & PROJECT SOLUTIONS",
      title: "Fit-Out & Project Solutions",
      headline: "FROM EMPTY SPACE TO PERFECTLY FINISHED SPACE.",
      specs: "Turnkey Joinery • Coffered Ceilings",
      desc: "Customized acoustic solutions for homeowners, contractors, developers, consultants and project teams—from concept through professional installation.",
      longDesc: "We transform bare concrete shell & core units into bespoke, architecturally finished spaces integrating custom acoustic wood slats, coffered acoustic ceilings, and turnkey joinery.",
      applications: ["CORPORATE OFFICES", "BOUTIQUE HOTELS", "PENTHOUSES", "RESTAURANTS & LOUNGES"],
      features: [
        {
          title: "Customized Solutions",
          desc: "Tailor-made architectural millwork, perforated timber acoustic panels, and aesthetic baffles.",
        },
        {
          title: "Professional Installation",
          desc: "Skilled joiners and specialty craftsmen guarantee immaculate detailing and concealed fixings.",
        },
        {
          title: "Project Support",
          desc: "Single-point project management, procurement coordination, and strict timeline adherence.",
        },
        {
          title: "Integrated Architectural Finishes",
          desc: "Flawless integration of concealed linear LED lighting, air conditioning diffusers, and audio.",
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
      tag: "05 / GYM FLOOR ACOUSTICS",
      title: "Gym Floor Acoustics",
      headline: "POWERFUL WORKOUTS. QUIETER SPACES.",
      specs: "Vibration Damping • High-Impact Underlay",
      desc: "Specialized floor systems reduce impact noise, vibration and structural sound transmission from equipment and heavy workouts.",
      longDesc: "High-impact athletic drop zones and multi-layered elastomeric rubber systems designed to absorb severe kinetic energy from barbells and treadmills without transferring thump to rooms below.",
      applications: ["COMMERCIAL GYMS", "PRIVATE VILLA GYMS", "HOTEL FITNESS CENTERS", "CROSSFIT & WEIGHT ROOMS"],
      features: [
        {
          title: "Impact Noise Reduction",
          desc: "Absorbs shock from dropped free weights up to 32dB Delta Lw impact sound reduction.",
        },
        {
          title: "Vibration Control",
          desc: "Elastomeric decoupled pads dissipate motor rumble from treadmills and cable machines.",
        },
        {
          title: "Floor Protection",
          desc: "Heavy-duty vulcanized composite rubber shields concrete subfloors from point impact fractures.",
        },
        {
          title: "Improved Athlete Comfort",
          desc: "Anti-fatigue elastic rebound reduces joint stress and enhances stability during training.",
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
      tag: "06 / STAR SKY LIGHTING",
      title: "Star Sky Lighting",
      headline: "BRING THE STARS INTO YOUR SPACE.",
      specs: "Fiber-Optic Modules • Acoustic Ceilings",
      desc: "Customized fiber-optic lighting creates an elegant, immersive atmosphere for theaters, bedrooms, lounges, hotels and luxury interiors.",
      longDesc: "Bespoke ceiling installations combining sound-absorbing acoustic fabric panels with hundreds of pinpoint fiber-optic stars, shooting stars, and constellation effects controllable via smart home systems.",
      applications: ["HOME THEATERS", "MASTER BEDROOMS", "VIP LOUNGES", "LUXURY SPAS & POOLS"],
      features: [
        {
          title: "Elegant Aesthetics",
          desc: "Hand-threaded fiber optic points create realistic night sky depth and celestial constellations.",
        },
        {
          title: "Customizable Lighting",
          desc: "Dimmable twinkle speeds, shooting star animations, and custom color presets.",
        },
        {
          title: "Immersive Atmosphere",
          desc: "Black velvet or acoustical fabric panels absorb overhead echo while stars glow overhead.",
        },
        {
          title: "Long-Life LED Tech",
          desc: "Solid-state silent illuminators with zero heat generation and 50,000+ hour lifespan.",
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

  return (
    <section id="services" className="w-full bg-[#F5F5F7] min-h-[calc(100vh-76px)] flex items-center py-12 lg:py-16 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* Header Row: Title on Left, Description on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-sans font-bold tracking-[0.24em] text-gray-500 uppercase">
                OUR SPECIALIZATION
              </span>
              <div className="w-8 h-[1px] bg-gray-300" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111] tracking-tight">
              Catalog of Our Services
            </h2>
          </div>

          <p className="text-gray-500 font-sans text-xs sm:text-sm max-w-sm sm:text-right leading-relaxed">
            Sorted and engineered exactly according to Skylink proposal specifications. Click any card to explore full blueprints.
          </p>
        </div>

        {/* Horizontal Scrollable Cards Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-6 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group relative flex-none w-[270px] sm:w-[310px] lg:w-[330px] h-[420px] sm:h-[460px] overflow-hidden bg-black snap-start shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-300/60"
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
                <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-[11px] font-sans font-bold tracking-widest text-white border border-white/20 uppercase">
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

                <h3 className="font-serif text-xl sm:text-2xl font-normal text-white leading-snug tracking-tight mb-2 group-hover:text-gray-200 transition-colors">
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
            </div>
          ))}
        </div>

        {/* Bottom Control Bar: Curved CTA on Left, Round Arrows on Right */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200/80">
          {/* Left Action - Curved Pill Button */}
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all shadow-md hover:shadow-lg active:scale-95 rounded-full"
          >
            <span>View All Solutions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Right Round Arrow Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-11 h-11 bg-white hover:bg-gray-100 active:scale-95 border border-gray-300 shadow-xs flex items-center justify-center text-[#111] rounded-full transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-11 h-11 bg-white hover:bg-gray-100 active:scale-95 border border-gray-300 shadow-xs flex items-center justify-center text-[#111] rounded-full transition-all cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Detail Modal for clicked service card */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        onOpenQuoteModal={onOpenQuoteModal || (() => {})}
      />
    </section>
  );
}
