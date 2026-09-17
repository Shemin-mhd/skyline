"use client";

import React, { useState, useMemo } from "react";
import {
  MessageSquare,
  RefreshCw,
  Trash2,
  Search,
  Zap,
  TrendingUp,
  MapPin,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Lead } from "@/lib/leads-store";
import { useAdmin } from "../context/AdminContext";

export default function WhatsAppClicksPage() {
  const { leads, fetchLeads } = useAdmin();

  const [waSearchQuery, setWaSearchQuery] = useState<string>("");
  const [waLocationFilter, setWaLocationFilter] = useState<string>("all");
  const [isClearLogsModalOpen, setIsClearLogsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // All WhatsApp Clicks
  const waClicks = useMemo(() => {
    return leads.filter((l) => l.type === "whatsapp");
  }, [leads]);

  // Today's WA count
  const todayWaCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return waClicks.filter((l) => l.createdAt && l.createdAt.slice(0, 10) === today).length;
  }, [waClicks]);

  // Distribution by location
  const locationDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    waClicks.forEach((l) => {
      const loc = l.triggerLocation || l.source || "Floating WhatsApp Widget";
      counts[loc] = (counts[loc] || 0) + 1;
    });
    const total = waClicks.length || 1;
    return Object.entries(counts)
      .map(([location, count]) => ({
        location,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [waClicks]);

  const topLocation = locationDistribution[0] || { location: "Floating WhatsApp Widget", count: 0 };

  // Distribution by page
  const pageDistribution = useMemo(() => {
    const counts: Record<string, number> = {};
    waClicks.forEach((l) => {
      const p = l.pagePath || "/";
      counts[p] = (counts[p] || 0) + 1;
    });
    const total = waClicks.length || 1;
    return Object.entries(counts)
      .map(([page, count]) => ({
        page,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [waClicks]);

  const topPage = pageDistribution[0] || { page: "/", count: 0 };

  // Unique trigger locations for filter dropdown
  const allWaLocations = useMemo(() => {
    const set = new Set<string>();
    waClicks.forEach((l) => {
      if (l.triggerLocation) set.add(l.triggerLocation);
      else if (l.source) set.add(l.source);
    });
    return Array.from(set);
  }, [waClicks]);

  // Filtered WA clicks
  const filteredWaClicks = useMemo(() => {
    return waClicks.filter((l) => {
      const loc = l.triggerLocation || l.source || "";
      if (waLocationFilter !== "all" && loc !== waLocationFilter) return false;
      if (waSearchQuery.trim()) {
        const q = waSearchQuery.toLowerCase();
        const matchLoc = loc.toLowerCase().includes(q);
        const matchName = l.name.toLowerCase().includes(q);
        const matchPage = (l.pagePath || "").toLowerCase().includes(q);
        const matchService = (l.service || "").toLowerCase().includes(q);
        const matchMsg = (l.message || "").toLowerCase().includes(q);
        if (!matchLoc && !matchName && !matchPage && !matchService && !matchMsg) return false;
      }
      return true;
    });
  }, [waClicks, waLocationFilter, waSearchQuery]);

  // Date formatters
  const formatShortDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } catch {
      return iso;
    }
  };

  const formatFullDateTime = (iso: string) => {
    try {
      const d = new Date(iso);
      return `${d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}, ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`;
    } catch {
      return iso;
    }
  };

  // Pre-filled WhatsApp reply link
  const getWhatsAppReplyLink = (lead: Lead) => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, "");
    const greeting = encodeURIComponent(
      `Hello ${lead.name}, this is Skylink Acoustics. Thank you for connecting with us on WhatsApp. How can we assist with your acoustic project?`
    );
    return cleanPhone ? `https://wa.me/${cleanPhone}?text=${greeting}` : `https://wa.me/97333048555`;
  };

  // Clear WhatsApp logs handler
  const handleClearWaLogs = async () => {
    try {
      const res = await fetch("/api/leads?type=whatsapp", { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setIsClearLogsModalOpen(false);
        fetchLeads();
      }
    } catch (err) {
      console.error("Failed to clear WhatsApp logs:", err);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await fetchLeads();
    setIsLoading(false);
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Action Banner Card */}
      <div className="bg-white p-4 border border-slate-200/90 rounded-lg shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 fill-slate-900/10" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              WhatsApp Click Analytics &amp; Leads Tracker
            </h3>
            <p className="text-xs text-slate-500">
              Track every WhatsApp click location, page path, date &amp; time across the site
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            <span>Refresh Logs</span>
          </button>

          <button
            onClick={() => setIsClearLogsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-bold rounded-md transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5 text-slate-900" />
            <span>Clear All Logs</span>
          </button>

          <div className="relative w-48 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search location, service, page..."
              value={waSearchQuery}
              onChange={(e) => setWaSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50/50 border border-slate-200 rounded-md text-xs placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
            />
          </div>

          <select
            value={waLocationFilter}
            onChange={(e) => setWaLocationFilter(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-800 focus:outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="all">All Locations</option>
            {allWaLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>TOTAL WA CLICKS</span>
            <MessageSquare className="w-4 h-4 text-slate-900" />
          </div>
          <div className="text-3xl font-black text-slate-900 tracking-tight">
            {waClicks.length}
          </div>
          <div className="text-[11px] text-slate-400">
            Recorded Lead Triggers
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>TODAY&apos;S CLICKS</span>
            <Zap className="w-4 h-4 text-slate-900" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {todayWaCount}
            </span>
            <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/80 text-slate-900 text-[10px] font-bold rounded-full">
              Live Today
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            {formatShortDate(new Date().toISOString())}
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>TOP LOCATION TRIGGER</span>
            <TrendingUp className="w-4 h-4 text-slate-900" />
          </div>
          <div className="text-base font-bold text-slate-900 truncate" title={topLocation.location}>
            {topLocation.location}
          </div>
          <div className="text-[11px] text-slate-400">
            {topLocation.count} Total Clicks
          </div>
        </div>

        <div className="p-4 bg-white border border-slate-200/90 rounded-lg shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>TOP REFERRING PAGE</span>
            <MapPin className="w-4 h-4 text-slate-900" />
          </div>
          <div className="text-base font-bold text-slate-900 truncate font-mono">
            {topPage.page}
          </div>
          <div className="text-[11px] text-slate-400">
            {topPage.count} Click Events
          </div>
        </div>
      </div>

      {/* Middle Distribution: 2 Progress Bar Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-5 border border-slate-200/90 rounded-lg shadow-2xs space-y-4">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            CLICKS DISTRIBUTION BY BUTTON LOCATION
          </h4>
          <div className="space-y-4">
            {locationDistribution.map((item) => (
              <div key={item.location} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{item.location}</span>
                  <span className="text-slate-500 font-medium">{item.count} clicks ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/90 rounded-lg shadow-2xs space-y-4">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            CLICKS DISTRIBUTION BY WEBSITE PAGE
          </h4>
          <div className="space-y-4">
            {pageDistribution.map((item) => (
              <div key={item.page} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-800 font-semibold">{item.page}</span>
                  <span className="text-slate-500 font-medium">{item.count} clicks ({item.percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-600 rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Click Logs Table */}
      <div className="bg-white border border-slate-200/90 rounded-lg shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50/70">
                <th className="py-3 px-5">DATE &amp; TIME</th>
                <th className="py-3 px-5">CUSTOMER &amp; LEAD</th>
                <th className="py-3 px-5">TRIGGER LOCATION</th>
                <th className="py-3 px-5">PAGE PATH</th>
                <th className="py-3 px-5">CONTEXT &amp; SERVICE DETAILS</th>
                <th className="py-3 px-5">DEVICE</th>
                <th className="py-3 px-5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredWaClicks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No WhatsApp clicks match your current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredWaClicks.map((click) => (
                  <tr key={click.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-5 text-slate-500 whitespace-nowrap">
                      {formatFullDateTime(click.createdAt)}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-slate-900">
                      {click.name || "Website Visitor"}
                    </td>
                    <td className="py-3.5 px-5 text-slate-700 font-medium">
                      {click.triggerLocation || click.source || "Hero Primary CTA"}
                    </td>
                    <td className="py-3.5 px-5">
                      <a
                        href={click.pagePath || "/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-900 font-mono text-[11px] hover:underline font-semibold"
                      >
                        {click.pagePath || "/"}
                      </a>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600 max-w-sm">
                      <div className="truncate font-sans" title={click.message || click.service}>
                        {click.message || click.service}
                      </div>
                    </td>
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      {click.device === "Mobile" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-100 text-slate-800 text-[11px] font-medium">
                          <Smartphone className="w-3 h-3" />
                          <span>Mobile</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 text-[11px] font-medium">
                          <Monitor className="w-3 h-3 text-slate-500" />
                          <span>Desktop</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={click.pagePath || "/"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-900 hover:text-black font-semibold text-[11px] hover:underline"
                        >
                          Target Link
                        </a>
                        <a
                          href={getWhatsAppReplyLink(click)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 bg-slate-900 hover:bg-black text-white rounded text-[11px] font-bold shadow-2xs transition-colors"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clear Logs Modal */}
      {isClearLogsModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Clear All WhatsApp Logs?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to permanently clear all <strong className="text-slate-900">{waClicks.length}</strong> recorded WhatsApp click leads and trigger events?
              </p>
              <div className="p-2.5 bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-700 text-left mt-2">
                This will reset analytics counters, location triggers, and referring page distributions. This action cannot be undone.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsClearLogsModalOpen(false)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleClearWaLogs}
                className="w-1/2 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
