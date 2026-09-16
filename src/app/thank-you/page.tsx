"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ThankYouSection from "@/components/ThankYouSection";
import QuoteModal from "@/components/QuoteModal";

export default function ThankYouPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F3] text-[#111315] font-sans selection:bg-[#A87932] selection:text-white flex flex-col justify-between">
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main className="flex-1 flex items-center">
        <ThankYouSection />
      </main>
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
