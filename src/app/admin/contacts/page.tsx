"use client";

import React, { useState, useEffect } from "react";
import {
  Building,
  Plus,
  Phone,
  Mail,
  Clock,
  MapPin,
  Pencil,
  Trash2,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  X,
} from "lucide-react";
import WhatsAppChatIcon from "@/components/WhatsAppChatIcon";
import { BranchItem } from "@/lib/branches-store";
import { WhatsAppNumber } from "@/lib/settings-store";

export default function ContactsPage() {
  // Branches state
  const [branches, setBranches] = useState<BranchItem[]>([]);
  const [isLoadingBranches, setIsLoadingBranches] = useState<boolean>(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState<boolean>(false);
  const [branchModalMode, setBranchModalMode] = useState<"add" | "edit">("add");
  const [editingBranchId, setEditingBranchId] = useState<string | null>(null);
  const [branchToDelete, setBranchToDelete] = useState<BranchItem | null>(null);
  const [branchForm, setBranchForm] = useState({
    name: "",
    type: "Branch Office",
    address: "",
    cityCountry: "Manama, Kingdom of Bahrain",
    phone: "+973 33048555",
    email: "office@skylinkec.com",
    hours: "8:00 AM – 6:00 PM (Sun – Thu)",
    isPrimary: false,
  });

  // Dynamic WhatsApp numbers
  const [whatsAppNumbers, setWhatsAppNumbers] = useState<WhatsAppNumber[]>([]);
  const [activeWhatsApp, setActiveWhatsApp] = useState<string>("+973 33048555");
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(false);
  const [isAddWaModalOpen, setIsAddWaModalOpen] = useState<boolean>(false);
  const [waModalForm, setWaModalForm] = useState({
    name: "",
    phone: "",
    setActiveImmediately: true,
  });
  const [waActionLoading, setWaActionLoading] = useState<boolean>(false);
  const [waFeedbackMessage, setWaFeedbackMessage] = useState<string>("");

  const fetchBranches = async () => {
    try {
      setIsLoadingBranches(true);
      const res = await fetch("/api/branches");
      const data = await res.json();
      if (data.success && Array.isArray(data.branches)) {
        setBranches(data.branches);
      }
    } catch (err) {
      console.error("Failed to load branches:", err);
    } finally {
      setIsLoadingBranches(false);
    }
  };

  const fetchSettings = async () => {
    try {
      setIsLoadingSettings(true);
      const res = await fetch("/api/settings", { cache: "no-store" });
      const data = await res.json();
      if (data?.success && data?.settings) {
        setWhatsAppNumbers(data.settings.whatsAppNumbers || []);
        setActiveWhatsApp(data.settings.activeWhatsApp || "+973 33048555");
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    } finally {
      setIsLoadingSettings(false);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchSettings();
  }, []);

  // WhatsApp Actions
  const handleSetActiveWhatsApp = async (id: string) => {
    setWaActionLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setActive", id }),
      });
      const data = await res.json();
      if (data?.success && data?.settings) {
        setWhatsAppNumbers(data.settings.whatsAppNumbers || []);
        setActiveWhatsApp(data.settings.activeWhatsApp);
        setWaFeedbackMessage("Active WhatsApp line updated! All live website touchpoints now route to this number.");
        setTimeout(() => setWaFeedbackMessage(""), 4000);
      }
    } catch (err) {
      console.error("Failed to set active WhatsApp number:", err);
    } finally {
      setWaActionLoading(false);
    }
  };

  const handleAddWhatsAppNumber = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waModalForm.phone.trim()) return;
    setWaActionLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          name: waModalForm.name.trim() || "WhatsApp Line",
          phone: waModalForm.phone.trim(),
          setActiveImmediately: waModalForm.setActiveImmediately,
        }),
      });
      const data = await res.json();
      if (data?.success && data?.settings) {
        setWhatsAppNumbers(data.settings.whatsAppNumbers || []);
        setActiveWhatsApp(data.settings.activeWhatsApp);
        setIsAddWaModalOpen(false);
        setWaModalForm({ name: "", phone: "", setActiveImmediately: true });
        setWaFeedbackMessage("New WhatsApp number successfully added to routing pool!");
        setTimeout(() => setWaFeedbackMessage(""), 4000);
      }
    } catch (err) {
      console.error("Failed to add WhatsApp number:", err);
    } finally {
      setWaActionLoading(false);
    }
  };

  const handleDeleteWhatsAppNumber = async (id: string) => {
    if (!window.confirm("Remove this WhatsApp number from the routing pool?")) return;
    setWaActionLoading(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const data = await res.json();
      if (data?.success && data?.settings) {
        setWhatsAppNumbers(data.settings.whatsAppNumbers || []);
        setActiveWhatsApp(data.settings.activeWhatsApp);
        setWaFeedbackMessage("WhatsApp number removed from routing pool.");
        setTimeout(() => setWaFeedbackMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed to delete WhatsApp number:", err);
    } finally {
      setWaActionLoading(false);
    }
  };

  // Branch Actions
  const handleOpenAddBranch = () => {
    setBranchModalMode("add");
    setEditingBranchId(null);
    setBranchForm({
      name: "",
      type: "Branch Office",
      address: "",
      cityCountry: "Manama, Kingdom of Bahrain",
      phone: "+973 33048555",
      email: "office@skylinkec.com",
      hours: "8:00 AM – 6:00 PM (Sun – Thu)",
      isPrimary: false,
    });
    setIsBranchModalOpen(true);
  };

  const handleOpenEditBranch = (b: BranchItem) => {
    setBranchModalMode("edit");
    setEditingBranchId(b.id);
    setBranchForm({
      name: b.name,
      type: b.type,
      address: b.address,
      cityCountry: b.cityCountry,
      phone: b.phone,
      email: b.email,
      hours: b.hours,
      isPrimary: !!b.isPrimary,
    });
    setIsBranchModalOpen(true);
  };

  const handleSaveBranch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (branchModalMode === "add") {
        const res = await fetch("/api/branches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(branchForm),
        });
        const data = await res.json();
        if (data.success) {
          fetchBranches();
          setIsBranchModalOpen(false);
        }
      } else if (editingBranchId) {
        const res = await fetch(`/api/branches/${editingBranchId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(branchForm),
        });
        const data = await res.json();
        if (data.success) {
          fetchBranches();
          setIsBranchModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Failed to save branch:", err);
    }
  };

  const handleConfirmDeleteBranch = async () => {
    if (!branchToDelete) return;
    try {
      const res = await fetch(`/api/branches/${branchToDelete.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setBranches((prev) => prev.filter((b) => b.id !== branchToDelete.id));
        setBranchToDelete(null);
      }
    } catch (err) {
      console.error("Failed to delete branch:", err);
    }
  };

  return (
    <div className="space-y-6 text-xs font-sans">
      {/* ── DYNAMIC WHATSAPP ROUTING & NUMBERS CARD ── */}
      <div className="bg-white p-6 border border-slate-200/90 rounded-xl shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <WhatsAppChatIcon className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  WhatsApp Dynamic Inquiries Routing
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-pulse" />
                  Live Routing Active
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Control customer inquiry destination. Clicking WhatsApp buttons or consultation links across the website routes to the designated <strong>Active Line</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAddWaModalOpen(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add WhatsApp Number</span>
          </button>
        </div>

        {waFeedbackMessage && (
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span className="font-semibold">{waFeedbackMessage}</span>
          </div>
        )}

        {/* Current Active Live Route */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Current Public Destination for All Enquiries
              </div>
              <div className="flex items-center gap-3 flex-wrap mt-0.5">
                <span className="text-xl font-black text-slate-900 font-mono tracking-tight">
                  {activeWhatsApp}
                </span>
                <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded-full">
                  {whatsAppNumbers.find((n) => n.isActive)?.name || "Main Headquarters"}
                </span>
              </div>
            </div>
          </div>

          <a
            href={`https://wa.me/${activeWhatsApp.replace(/\D/g, "")}?text=${encodeURIComponent(
              "Testing live dynamic routing from Skylink Acoustics Admin"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Test Active Link</span>
          </a>
        </div>

        {/* Numbers Pool Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Registered WhatsApp Lines Pool ({whatsAppNumbers.length})
            </span>
            <span className="text-[10px] text-slate-400">
              Switching active status updates all website links in real time
            </span>
          </div>

          {isLoadingSettings ? (
            <div className="p-10 text-center text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl">
              <RefreshCw className="w-5 h-5 animate-spin mx-auto text-slate-600 mb-2" />
              <span>Loading numbers pool...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whatsAppNumbers.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 shadow-2xs ${
                    item.isActive
                      ? "bg-white border-slate-900 ring-1 ring-slate-900/10 shadow-xs"
                      : "bg-slate-50/60 hover:bg-slate-50 border-slate-200/90 hover:border-slate-300"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      {item.isActive ? (
                        <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-slate-900 text-white shadow-2xs flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
                          ACTIVE ROUTE
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-slate-200/70 text-slate-600 border border-slate-200">
                          Standby Line
                        </span>
                      )}

                      {whatsAppNumbers.length > 1 && (
                        <button
                          onClick={() => handleDeleteWhatsAppNumber(item.id)}
                          disabled={waActionLoading}
                          className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          title="Remove number from pool"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <WhatsAppChatIcon className="w-3.5 h-3.5 fill-slate-900 shrink-0" />
                        <span className="text-slate-900 font-mono font-black text-sm">
                          {item.phone}
                        </span>
                      </div>
                      <div className="text-slate-400 text-[10px] mt-1">
                        Registered: {new Date(item.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70">
                    {item.isActive ? (
                      <div className="py-1.5 text-center text-slate-900 font-bold text-[11px] flex items-center justify-center gap-1.5 bg-slate-100 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
                        <span>Receiving All Live Inquiries</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSetActiveWhatsApp(item.id)}
                        disabled={waActionLoading}
                        className="w-full py-1.5 bg-white hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300 hover:border-slate-900 rounded-lg text-[11px] font-bold transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Set as Active Route</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div
                onClick={() => setIsAddWaModalOpen(true)}
                className="border-2 border-dashed border-slate-200 hover:border-slate-900 bg-slate-50/40 hover:bg-slate-100/60 rounded-xl p-4 flex flex-col items-center justify-center gap-2 text-slate-400 hover:text-slate-900 transition-all cursor-pointer min-h-[140px] group"
              >
                <div className="w-9 h-9 rounded-full bg-white border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-2xs">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="text-center">
                  <div className="font-bold text-slate-800 group-hover:text-slate-900 text-xs">
                    + Add Another WhatsApp Line
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Register alternative department or mobile desk
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BRANCHES & OFFICES CARD ── */}
      <div className="bg-white p-6 border border-slate-200/90 rounded-xl shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Kingdom of Bahrain Headquarters &amp; Operations
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Official registered engineering office, branches, and client consultation facilities.
            </p>
          </div>
          <button
            onClick={handleOpenAddBranch}
            className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer text-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Branch Office</span>
          </button>
        </div>

        {isLoadingBranches && branches.length === 0 ? (
          <div className="p-12 text-center text-slate-400 bg-slate-50/50 border border-slate-200 rounded-xl">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-slate-900 mb-2" />
            <span>Loading facilities...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {branches.map((b) => (
              <div
                key={b.id}
                className={`bg-white rounded-xl border p-5 flex flex-col justify-between space-y-4 shadow-2xs transition-all ${
                  b.isPrimary
                    ? "border-slate-900 ring-1 ring-slate-900/10 shadow-xs"
                    : "border-slate-200/90 hover:border-slate-400"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        b.isPrimary
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}
                    >
                      {b.type}
                    </span>

                    <button
                      onClick={() => handleOpenEditBranch(b)}
                      className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      title="Edit Branch"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{b.name}</h4>

                  <div className="mt-3 space-y-2 text-slate-600 text-[11px]">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-900 shrink-0 mt-0.5" />
                      <span>{b.address}, {b.cityCountry}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <Phone className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span>{b.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span>{b.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`https://wa.me/${b.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-slate-900 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Direct WhatsApp Desk</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {!b.isPrimary && (
                    <button
                      onClick={() => setBranchToDelete(b)}
                      className="p-1 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                      title="Remove Branch"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div
              onClick={handleOpenAddBranch}
              className="border-2 border-dashed border-slate-200 hover:border-slate-900 bg-slate-50/40 hover:bg-slate-100/60 rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-slate-400 hover:text-slate-900 transition-all cursor-pointer min-h-[220px] group"
            >
              <div className="w-11 h-11 rounded-full bg-white border border-slate-200 group-hover:border-slate-900 group-hover:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors shadow-2xs">
                <Plus className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-800 group-hover:text-slate-900 text-xs">
                  + Add Another Branch
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 max-w-[200px]">
                  Register a regional office, showroom, or facility
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: Add WhatsApp Number */}
      {isAddWaModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <WhatsAppChatIcon className="w-5 h-5 fill-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Add WhatsApp Contact Number</h3>
                  <p className="text-[11px] text-slate-400">Configure phone number for dynamic customer enquiries</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddWaModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddWhatsAppNumber} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department / Line Label
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sales Desk, Engineering Support, Executive Direct"
                  value={waModalForm.name}
                  onChange={(e) => setWaModalForm({ ...waModalForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  WhatsApp Phone Number (with Country Code)
                </label>
                <input
                  type="text"
                  required
                  placeholder="+973 33048555"
                  value={waModalForm.phone}
                  onChange={(e) => setWaModalForm({ ...waModalForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-900 text-slate-800 text-xs font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Format: International format with country code (e.g. +973 33048555 or 97333048555)
                </p>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={waModalForm.setActiveImmediately}
                    onChange={(e) => setWaModalForm({ ...waModalForm, setActiveImmediately: e.target.checked })}
                    className="w-4 h-4 mt-0.5 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                  />
                  <div>
                    <span className="font-semibold text-slate-800 block text-xs">
                      Make this the active number immediately
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      All live WhatsApp enquiries across the site will instantly route to this number upon saving.
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddWaModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={waActionLoading}
                  className="px-5 py-2 bg-slate-900 hover:bg-black disabled:opacity-50 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  {waActionLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  )}
                  <span>Save Number</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add / Edit Branch */}
      {isBranchModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {branchModalMode === "add" ? "Register New Facility" : "Edit Facility Details"}
                  </h3>
                  <p className="text-[11px] text-slate-400">Configure address, contact info, and business hours</p>
                </div>
              </div>
              <button
                onClick={() => setIsBranchModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBranch} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facility Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Skylink Acoustics Engineering HQ — Manama"
                  value={branchForm.name}
                  onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Facility Type</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Primary HQ, Branch Office"
                    value={branchForm.type}
                    onChange={(e) => setBranchForm({ ...branchForm, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">City / Country</label>
                  <input
                    type="text"
                    required
                    placeholder="Kingdom of Bahrain"
                    value={branchForm.cityCountry}
                    onChange={(e) => setBranchForm({ ...branchForm, cityCountry: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Physical Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kanoo Tower · Diplomatic Area / Seef"
                  value={branchForm.address}
                  onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+973 33048555"
                    value={branchForm.phone}
                    onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="office@skylinkec.com"
                    value={branchForm.email}
                    onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Operating Hours</label>
                <input
                  type="text"
                  placeholder="8:00 AM – 6:00 PM (Sun – Thu)"
                  value={branchForm.hours}
                  onChange={(e) => setBranchForm({ ...branchForm, hours: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-800 text-xs"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={branchForm.isPrimary}
                    onChange={(e) => setBranchForm({ ...branchForm, isPrimary: e.target.checked })}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900 border-slate-300"
                  />
                  <span className="font-semibold text-slate-800 text-xs">Set as Primary Corporate HQ</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBranchModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{branchModalMode === "add" ? "Save Facility" : "Update Facility"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Delete Branch Confirmation */}
      {branchToDelete && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in text-xs font-sans">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">Remove Facility?</h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to remove <strong className="text-slate-900">{branchToDelete.name}</strong> from published regional contacts?
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBranchToDelete(null)}
                className="w-1/2 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors cursor-pointer text-xs text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteBranch}
                className="w-1/2 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer text-xs text-center"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
