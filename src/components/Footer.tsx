"use client";

import React from "react";

import Link from "next/link";
import { useWhatsAppNumber } from "@/lib/use-whatsapp-number";

export default function Footer() {
  const { activeNumber } = useWhatsAppNumber();
  return (
    <footer className="w-full bg-[#111315] text-white pt-16 pb-8">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-heading text-2xl md:text-3xl font-bold tracking-tight uppercase leading-none">
                SKYLINK
              </span>
              <span className="block text-[10px] font-sans font-bold tracking-[0.25em] text-white/70 uppercase mt-1">
                ACOUSTICS
              </span>
            </div>
            <p className="text-white/50 font-sans text-sm leading-relaxed max-w-xs">
              Designed for Silence. Engineered for Sound. Professional acoustic and soundproofing solutions for luxury spaces across Bahrain.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-white/70 font-sans text-sm">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Specialty Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Skylink
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>Acoustic Insights &amp; Blog</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/90 uppercase font-semibold">New</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Consultation &amp; Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Office Address */}
          <div className="space-y-4">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
              Location
            </h3>
            <address className="not-italic text-white/70 font-sans text-sm leading-relaxed space-y-1">
              <p className="font-semibold text-white">KANOO TOWER — MANAMA</p>
              <p>155 Road 1703, Block 317, Diplomatic Area</p>
              <p>Kingdom of Bahrain, 88, 317 Rd No 1901, Manama</p>
            </address>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
              Contact Us
            </h3>
            <div className="space-y-3 text-white/70 font-sans text-sm">
              <a
                href={`tel:${activeNumber.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {activeNumber}
              </a>
              <a
                href="mailto:office@skylinkec.com"
                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                office@skylinkec.com
              </a>
              <a
                href="https://skylinkec.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                skylinkec.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans font-medium text-white/40 uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white/60 text-xs">SKYLINK ACOUSTICS</span>
            <span>Engineering &amp; Construction</span>
          </div>
          <div>KANOO TOWER — MANAMA</div>
          <div>© {new Date().getFullYear()} Skylink Acoustics. All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
}
