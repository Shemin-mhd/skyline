"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function ServicesPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111315] font-sans selection:bg-black selection:text-white">
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main className="pt-20">
        <ServicesSection
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          initialView="grid"
        />
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
