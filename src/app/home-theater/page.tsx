"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import HomeTheaterDedicatedSection from "@/components/HomeTheaterDedicatedSection";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function HomeTheaterPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F3] text-[#111315] font-sans selection:bg-[#A87932] selection:text-white">
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main>
        <HomeTheaterDedicatedSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      </main>
      <Footer />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
