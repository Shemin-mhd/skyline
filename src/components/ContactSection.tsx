"use client";

import React, { useState } from "react";
import { Phone, Mail, Globe, MapPin, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "Home Theater",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          service: form.projectType,
          message: form.message,
          source: "Contact Section Form",
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    { icon: Phone, text: "+973 33048555", href: "tel:+97333048555" },
    { icon: Mail, text: "office@skylinkec.com", href: "mailto:office@skylinkec.com" },
    { icon: Globe, text: "skylinkec.com", href: "https://skylinkec.com" },
    { icon: MapPin, text: "KANOO TOWER — MANAMA", href: "#" },
  ];

  return (
    <section id="contact" className="w-full bg-[#F5F5F7] py-14 sm:py-20 border-b border-gray-200/80">
      <div className="w-full max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left Contact Details */}
          <div className="space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111] leading-[1.1] tracking-[-0.03em] uppercase">
                Let&apos;s Build a Quieter, <br />
                Better Space.
              </h2>
              <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-md">
                From private residences to hotels, apartments, commercial developments and large-scale fit-out projects, Skylink Acoustics delivers premium acoustic and interior solutions designed around your project.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {contactItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center gap-4 group transition-colors"
                >
                  <div className="w-11 h-11 bg-white border border-gray-200/80 rounded-full flex items-center justify-center text-[#111] shadow-xs group-hover:bg-black group-hover:text-white transition-colors">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-sans font-semibold text-sm text-[#111] group-hover:text-gray-600 transition-colors">
                    {item.text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Form Card - Curved with Rounded Inputs and Pill Button */}
          <div className="bg-white p-6 sm:p-8 md:p-10 border border-gray-200/80 shadow-sm rounded-2xl sm:rounded-3xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#111] text-white flex items-center justify-center mx-auto shadow-md rounded-full">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111] tracking-tight">Request Received</h3>
                <p className="text-gray-600 font-sans text-sm max-w-xs mx-auto">
                  Thank you. A senior acoustic engineer from Skylink will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-8 py-3.5 bg-[#111] text-white font-sans text-xs font-bold uppercase tracking-wider hover:bg-black transition-all rounded-full shadow-md hover:shadow-lg cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full p-4 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none text-sm font-sans text-[#111] transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full p-4 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none text-sm font-sans text-[#111] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full p-4 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none text-sm font-sans text-[#111] transition-all"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-4 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none text-sm font-sans text-[#111] transition-all"
                  />
                </div>

                <select
                  value={form.projectType}
                  onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                  className="w-full p-4 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none text-sm font-sans text-[#111] transition-all"
                >
                  <option value="Home Theater">Home Theater</option>
                  <option value="Acoustic Insulation">Acoustic Insulation</option>
                  <option value="New Build Acoustics">New Build Acoustics</option>
                  <option value="Fit-Out Solutions">Fit-Out Solutions</option>
                  <option value="Gym Floor Acoustics">Gym Floor Acoustics</option>
                  <option value="Star Sky Lighting">Star Sky Lighting</option>
                </select>

                <textarea
                  rows={4}
                  placeholder="Message / Project Details"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-4 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:border-black focus:bg-white focus:outline-none text-sm font-sans text-[#111] transition-all"
                />

                <button
                  type="submit"
                  className="w-full py-4 bg-[#111] hover:bg-black text-white font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all rounded-full cursor-pointer"
                >
                  <span>Discuss Your Project with Skylink Acoustics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
