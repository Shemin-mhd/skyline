"use client";

import React from "react";
import WhatsAppChatIcon from "@/components/WhatsAppChatIcon";
import { trackWhatsAppLead } from "@/lib/track";
import { useWhatsAppNumber } from "@/lib/use-whatsapp-number";

export default function FloatingWhatsApp() {
  const { getWhatsAppUrl } = useWhatsAppNumber();
  const whatsappUrl = getWhatsAppUrl("Hello Skylink Acoustics, I would like to request acoustic assistance.");

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-6 right-6 z-40 flex items-center">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppLead("Floating WhatsApp Help")}
        className="group inline-flex items-center gap-2 px-4 sm:px-4.5 py-2.5 rounded-full bg-[#00A859] hover:bg-[#009650] text-white font-sans text-[14px] sm:text-[14.5px] font-bold tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.24)] hover:scale-[1.03] active:scale-95 transition-all duration-300"
      >
        <WhatsAppChatIcon className="w-[18px] h-[18px] fill-white shrink-0" />
        <span className="whitespace-nowrap">WhatsApp Help</span>
      </a>
    </aside>
  );
}
