"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#111315] text-white pt-16 pb-8">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
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
              Designed for Silence. Engineered for Sound. Professional acoustic and sound solutions for modern spaces.
            </p>
          </div>

          {/* Office Address */}
          <div className="space-y-4">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
              Location
            </h3>
            <address className="not-italic text-white/70 font-sans text-sm leading-relaxed space-y-1">
              <p className="font-semibold text-white">KANOO TOWER — MANAMA</p>
              <p>Diplomatic Area, Manama</p>
              <p>Kingdom of Bahrain</p>
            </address>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-sans text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
              Contact Us
            </h3>
            <div className="space-y-3 text-white/70 font-sans text-sm">
              <a
                href="tel:+97333048555"
                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                +973 33048555
              </a>
              <a
                href="https://wa.me/97333048555"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-white transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +973 33048555 (WhatsApp)
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
