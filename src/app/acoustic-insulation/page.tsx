"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import AcousticInsulationSection from "@/components/AcousticInsulationSection";
import Footer from "@/components/Footer";
import QuoteModal from "@/components/QuoteModal";

export default function AcousticInsulationPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F3] text-[#111315] font-sans selection:bg-[#A87932] selection:text-white">
      {/* Reusing global Header */}
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      {/* PAGE 03: Acoustic Insulation */}
      <main>
        <AcousticInsulationSection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      </main>

      <Footer />

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
