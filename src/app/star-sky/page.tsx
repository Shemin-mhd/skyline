"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import StarSkySection from "@/components/StarSkySection";
import QuoteModal from "@/components/QuoteModal";

export default function StarSkyPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0C0B] text-white font-sans selection:bg-[#A87932] selection:text-white">
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main>
        <StarSkySection onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      </main>
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
