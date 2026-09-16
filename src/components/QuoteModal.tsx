"use client";

import React, { useState } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Home Theater",
    message: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#FBF9F5] border border-[#E5E0D8] rounded-2xl shadow-2xl p-6 md:p-8 text-[#1A1815]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full hover:bg-black/5"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-[#9E814D] mx-auto" />
            <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111]">Quote Request Received</h3>
            <p className="text-xs text-gray-600 font-sans max-w-xs mx-auto">
              Thank you. A senior engineer from Skylink Engineering & Construction will contact you shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#1A1815] text-white font-sans text-xs font-semibold uppercase tracking-wider"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-[#9E814D] uppercase block">
                SKYLINK CONSULTATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-[#111]">
                Get A Quote
              </h3>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D8] focus:border-black focus:outline-none"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D8] focus:border-black focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D8] focus:border-black focus:outline-none"
                />
              </div>

              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D8] focus:border-black focus:outline-none"
              >
                <option value="Home Theater">01 Home Theater</option>
                <option value="Acoustic Solutions">02 Acoustic Solutions</option>
                <option value="Fit-Out Solutions">03 Fit-Out Solutions</option>
                <option value="Star Sky">04 Star Sky Lighting</option>
              </select>

              <textarea
                rows={3}
                placeholder="Project Description / Requirements"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3.5 rounded-xl bg-white border border-[#E5E0D8] focus:border-black focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1A1815] hover:bg-[#9E814D] text-white font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Submit Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
