"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import ProjectApplicationsSection from "@/components/ProjectApplicationsSection";
import QuoteModal from "@/components/QuoteModal";

export default function ApplicationsPage() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F3] text-[#111315] font-sans selection:bg-[#A87932] selection:text-white">
      <Header onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />
      <main>
        <ProjectApplicationsSection />
      </main>
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </div>
  );
}
