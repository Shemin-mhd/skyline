"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X, Menu } from "lucide-react";

interface HeaderProps {
  onOpenQuoteModal: () => void;
}

export default function Header({ onOpenQuoteModal }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0D0C0B] border-b border-white/10 text-white shadow-xl backdrop-blur-md transition-all">
        <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-4.5 flex items-center justify-between">
          {/* Brand Logo with 3-bar icon */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center gap-[3px] h-6">
              <span className="w-1 h-3.5 bg-white group-hover:bg-gray-300 transition-colors" />
              <span className="w-1 h-6 bg-white group-hover:bg-gray-300 transition-colors" />
              <span className="w-1 h-4 bg-white group-hover:bg-gray-300 transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white uppercase leading-none group-hover:text-gray-300 transition-colors">
                SKYLINK
              </span>
              <span className="text-[7px] sm:text-[7.5px] font-sans font-semibold tracking-[0.24em] text-white/70 uppercase mt-1">
                ENGINEERING &amp; CONSTRUCTION
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 text-xs md:text-sm font-sans font-medium transition-colors ${
                    isActive
                      ? "text-white border-b-2 border-white font-semibold"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs: Get a Quote pill + circular menu */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-gray-200 text-black font-sans text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#141210] border-t border-[#2B251E] px-6 py-6 space-y-3 shadow-2xl text-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-lg bg-[#1A1A1A] border border-[#333] text-sm font-sans font-medium text-white hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQuoteModal();
            }}
            className="w-full mt-4 px-5 py-3 rounded-full bg-white text-black font-sans font-semibold text-xs tracking-wide uppercase flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
      </header>
      {/* Structural Spacer so content is never cut off beneath the fixed black header */}
      <div className="h-[68px] sm:h-[76px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
