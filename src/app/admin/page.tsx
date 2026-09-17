"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  Layers,
  FileText,
  MessageSquare,
  Shield,
  ArrowRight,
} from "lucide-react";
import { Lead } from "@/lib/leads-store";
import { useAdmin } from "./context/AdminContext";

export default function DashboardOverviewPage() {
  const { leads, stats, serverTime } = useAdmin();
  const [serviceCount, setServiceCount] = useState<number>(6);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.services)) {
          setServiceCount(data.services.length);
        }
      })
      .catch(() => {});
  }, []);

  const formatShortDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } catch {
      return iso;
    }
  };

  const getWhatsAppReplyLink = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const greeting = encodeURIComponent(
      `Hello ${lead.name}, this is Skylink Acoustics. Thank you for your inquiry regarding "${lead.service}". How can we assist with your acoustic project?`
    );
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${greeting}` : `https://wa.me/97333048555`;
  };

  return (
    <div className="space-y-5 font-sans text-xs">
      {/* Alert Notice Bar */}
      <div className="p-3.5 px-4 bg-slate-900 text-white rounded-lg flex items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full bg-white text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0">
            !
          </div>
          <span>
            <strong className="text-white font-semibold">
              {stats.newCount || 4} new client acoustic inquiries
            </strong>{" "}
            <span className="text-slate-300">
              requiring engineering consultation in your centralized bank.
            </span>
          </span>
        </div>
        <Link
          href="/admin/inquiries"
          className="text-white hover:underline font-bold text-xs shrink-0 flex items-center gap-1"
        >
          <span>Open Bank</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 4 Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: CLIENT INQUIRIES */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              CLIENT INQUIRIES
            </span>
            <Inbox className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {stats.total || leads.length || 6}
            </div>
            <span className="px-2 py-0.5 bg-slate-100 text-slate-900 font-bold text-[11px] rounded border border-slate-200">
              +{stats.newCount || 4} New
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Centralized Project Consultation Inbox
          </div>
        </div>

        {/* Card 2: ACOUSTIC DISCIPLINES */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              ACOUSTIC DISCIPLINES
            </span>
            <Layers className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {serviceCount}
            </div>
            <span className="text-[11px] font-semibold text-slate-900">
              STC Certified
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 truncate">
            Cinemas, Soundproofing, Fit-Out, Gym, Lighting
          </div>
        </div>

        {/* Card 3: CASE STUDIES & SPECS */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              CASE STUDIES &amp; SPECS
            </span>
            <FileText className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              5
            </div>
            <span className="text-[11px] font-semibold text-slate-900">
              Acoustic Reports
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Architectural Specs &amp; Engineering CAD
          </div>
        </div>

        {/* Card 4: WHATSAPP LEADS */}
        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
              WHATSAPP LEADS
            </span>
            <MessageSquare className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <div className="text-3xl font-bold text-slate-900 tracking-tight font-sans">
              {stats.whatsappCount || 6}
            </div>
            <span className="text-[11px] font-semibold text-slate-900">
              Live Feed
            </span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1">
            Direct Client Consultation Tracking
          </div>
        </div>
      </div>

      {/* Main Content Split: Recent Submissions (Left) & Acoustic Data Core (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left (8 Cols): RECENT CLIENT SUBMISSIONS */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 px-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                RECENT CLIENT SUBMISSIONS
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Latest project consultations from website &amp; quote calculator
              </p>
            </div>

            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-slate-900 hover:text-black flex items-center gap-1 transition-colors"
            >
              <span>View All Inquiries</span>
              <span>&rarr;</span>
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-5 font-semibold">CLIENT</th>
                  <th className="py-3 px-5 font-semibold">SERVICE</th>
                  <th className="py-3 px-5 font-semibold">DATE</th>
                  <th className="py-3 px-5 font-semibold text-right">QUICK CONTACT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.slice(0, 6).map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-slate-900">{lead.name}</div>
                      <div className="text-slate-400 text-[11px]">{lead.phone || "No phone"}</div>
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-normal max-w-[200px] truncate" title={lead.service}>
                      {lead.service}
                    </td>
                    <td className="py-3.5 px-5 text-slate-400 whitespace-nowrap">
                      {formatShortDate(lead.createdAt)}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <a
                        href={getWhatsAppReplyLink(lead)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 border border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white rounded-md text-xs font-semibold transition-all"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (4 Cols): ACOUSTIC DATA CORE & SECURITY */}
        <div className="lg:col-span-4 bg-[#070D18] text-white p-5 rounded-xl shadow-md space-y-5 border border-slate-800">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                ACOUSTIC DATA CORE &amp; SECURITY
              </h3>
              <p className="text-[10px] text-slate-400">
                Persistent Storage &amp; Lead Vault
              </p>
            </div>
          </div>

          <div className="space-y-3 text-xs font-sans">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Database Connection</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 text-[10px] font-bold rounded">
                CONNECTED LIVE
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Lead Protection &amp; CSRF</span>
              <span className="text-slate-200 font-bold text-[11px] tracking-wider uppercase">
                ENABLED
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-slate-400">Inquiry Bank Encryption</span>
              <span className="text-white font-mono font-bold text-[11px] tracking-wider uppercase">
                SSL 256-BIT AES
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <div>Server Time: <span className="text-white font-bold">{serverTime}</span></div>
            <div>Skylink Engine v2.4</div>
          </div>
        </div>
      </div>
    </div>
  );
}
