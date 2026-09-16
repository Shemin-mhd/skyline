"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HomeTheaterSection from "@/components/HomeTheaterSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseSection from "@/components/WhyChooseSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import ProjectApplicationsSection from "@/components/ProjectApplicationsSection";
import ProjectsShowcaseSection from "@/components/ProjectsShowcaseSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function Home() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const openModal = () => setIsQuoteModalOpen(true);

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white">
      {/* Global Fixed Header */}
      <Header onOpenQuoteModal={openModal} />

      <main>
        {/* 01. Hero Section */}
        <Hero onOpenQuoteModal={openModal} />

        {/* 02. Crafting Spaces With Precision (Architecture & Features) */}
        <HomeTheaterSection onOpenQuoteModal={openModal} />

        {/* 03. Catalog of Our Services (Sorted by PDF + Interactive Modal) */}
        <ServicesSection onOpenQuoteModal={openModal} />

        {/* 04. Why Choose Skylink (Animated Marquee) */}
        <WhyChooseSection />

        {/* 05. How We Work (3-Step Process) */}
        <HowWeWorkSection />

        {/* 06. Project Applications (Sectors & Spaces) */}
        <ProjectApplicationsSection />

        {/* 07. Projects Showcase (Featured Portfolio) */}
        <ProjectsShowcaseSection />

        {/* 08. Contact & Consultation */}
        <ContactSection />

        {/* Global Footer */}
        <Footer />
      </main>

      {/* Interactive Consultation Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
