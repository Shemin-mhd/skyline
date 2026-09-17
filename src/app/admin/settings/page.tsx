"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Save,
  MessageSquare,
  Share2,
  Building,
  Lock,
  ExternalLink,
  Mail,
  CheckCircle2,
  Check,
  Copy,
  Plus,
  Trash2,
  RefreshCw,
  X,
  AlertCircle,
} from "lucide-react";
import WhatsAppChatIcon from "@/components/WhatsAppChatIcon";
import { WhatsAppNumber } from "@/lib/settings-store";

export default function GeneralSettingsPage() {
  const [generalSettingsTab, setGeneralSettingsTab] = useState<"whatsapp" | "social" | "company" | "security">("whatsapp");
  
  // WhatsApp and General state
  const [activeWhatsApp, setActiveWhatsApp] = useState<string>("+973 33048555");
  const [publicDisplayPhone, setPublicDisplayPhone] = useState<string>("+973 3304 8555");
  const [notificationEmail, setNotificationEmail] = useState<string>("office@skylinkec.com");
  const [defaultGreetingMessage, setDefaultGreetingMessage] = useState<string>(
    "Hello Skylink Acoustics, I would like to inquire about acoustic engineering consultation and architectural soundproofing services."
  );
  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/skylinkacoustics",
    linkedin: "https://linkedin.com/company/skylink-acoustics",
    facebook: "",
    youtube: "",
    x: "",
  });
  const [companyProfile, setCompanyProfile] = useState({
    legalName: "Skylink Acoustics & Engineering Services W.L.L.",
    address: "Kanoo Tower · Diplomatic Area / Seef",
    cityCountry: "Kingdom of Bahrain",
    hours: "8:00 AM – 6:00 PM (Sun – Thu)",
  });
  const [whatsAppNumbers, setWhatsAppNumbers] = useState<WhatsAppNumber[]>([]);

  // Credentials State
  const [settingsForm, setSettingsForm] = useState({
    currentPassword: "",
    newEmail: "office@skylinkec.com",
    newPassword: "",
    confirmPassword: "",
  });
  const [settingsError, setSettingsError] = useState<string>("");
  const [settingsSuccess, setSettingsSuccess] = useState<string>("");

  // Loading & Feedback
  const [isSavingGeneralSettings, setIsSavingGeneralSettings] = useState<boolean>(false);
  const [generalSettingsFeedback, setGeneralSettingsFeedback] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Modal Add WA Number
  const [isAddWaModalOpen, setIsAddWaModalOpen] = useState<boolean>(false);
  const [waModalForm, setWaModalForm] = useState({
    name: "",
    phone: "",
    setActiveImmediately: true,
  });
  const [waActionLoading, setWaActionLoading] = useState<boolean>(false);

  const cleanDigits = (val: string) => (val || "").replace(/\D/g, "");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings", { cache: "no-store" });
      const data = await res.json();
      if (data?.success && data?.settings) {
        setWhatsAppNumbers(data.settings.whatsAppNumbers || []);
        setActiveWhatsApp(data.settings.activeWhatsApp || "+973 33048555");
        if (data.settings.publicDisplayPhone) setPublicDisplayPhone(data.settings.publicDisplayPhone);
        if (data.settings.notificationEmail) setNotificationEmail(data.settings.notificationEmail);
        if (data.settings.defaultGreetingMessage) setDefaultGreetingMessage(data.settings.defaultGreetingMessage);
        if (data.settings.socialLinks) setSocialLinks((prev) => ({ ...prev, ...data.settings.socialLinks }));
        if (data.settings.companyProfile) setCompanyProfile((prev) => ({ ...prev, ...data.settings.companyProfile }));
      }
    } catch (err) {
      console.error("Failed to load settings:", err);
    }
  };

  useEffect(() => {
    fetchSettings();
    if (typeof window !== "undefined") {
      const savedEmail = localStorage.getItem("skylink_admin_email");
      if (savedEmail) {
        setSettingsForm((prev) => ({ ...prev, newEmail: savedEmail }));
      }
    }
  }, []);

  const handleSaveGeneralSettings = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSavingGeneralSettings(true);
    setGeneralSettingsFeedback("");
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "saveGeneral",
          activeWhatsApp,
          publicDisplayPhone,
          notificationEmail,
          defaultGreetingMessage,
          socialLinks,
          companyProfile,
        }),
      });
      const data = await res.json();
      if (data?.success && data?.settings) {
        setWhatsAppNumbers(data.settings.whatsAppNumbers || []);
        setActiveWhatsApp(data.settings.activeWhatsApp);
        setGeneralSettingsFeedback("General Settings updated & synced across all live website touchpoints!");
        setTimeout(() => setGeneralSettingsFeedback(""), 4000);
      }
    } catch (err) {
      console.error("Failed to save general settings:", err);
      setGeneralSettingsFeedback("Failed to save settings. Please try again.");
    } finally {
      setIsSavingGeneralSettings(false);
    }
  };

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
        setGeneralSettingsFeedback("Active WhatsApp number updated!");
        setTimeout(() => setGeneralSettingsFeedback(""), 3000);
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
        setGeneralSettingsFeedback("New WhatsApp line registered!");
        setTimeout(() => setGeneralSettingsFeedback(""), 3000);
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
        setGeneralSettingsFeedback("WhatsApp line removed.");
        setTimeout(() => setGeneralSettingsFeedback(""), 3000);
      }
    } catch (err) {
      console.error("Failed to delete WhatsApp number:", err);
    } finally {
      setWaActionLoading(false);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError("");
    setSettingsSuccess("");

    if (settingsForm.newPassword !== settingsForm.confirmPassword) {
      setSettingsError("New password and confirmation do not match.");
      return;
    }

    try {
      const res = await fetch("/api/admin/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: settingsForm.currentPassword,
          newEmail: settingsForm.newEmail,
          newPassword: settingsForm.newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSuccess("Admin credentials successfully updated!");
        localStorage.setItem("skylink_admin_email", settingsForm.newEmail);
        setTimeout(() => {
          setSettingsSuccess("");
          setSettingsForm({
            currentPassword: "",
            newEmail: settingsForm.newEmail,
            newPassword: "",
            confirmPassword: "",
          });
        }, 2000);
      } else {
        setSettingsError(data.error || "Failed to update credentials.");
      }
    } catch {
      setSettingsError("Server error while updating credentials.");
    }
  };

  return (
    <div className="space-y-5 text-xs font-sans">
      {/* Top Banner Card: General Settings Control Center */}
      <div className="bg-white p-5 lg:p-6 border border-slate-200/90 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-900 shrink-0">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                General Settings Control Center
              </h2>
              <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-800 text-[10px] font-bold tracking-wider rounded uppercase">
                LIVE REAL-TIME SYNC
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Manage centralized WhatsApp routing, social media channels, and business contact information.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => handleSaveGeneralSettings()}
            disabled={isSavingGeneralSettings}
            className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-lg font-bold shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 text-xs"
          >
            {isSavingGeneralSettings ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>{isSavingGeneralSettings ? "Saving Settings..." : "Save Settings"}</span>
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {generalSettingsFeedback && (
        <div className="p-3 bg-slate-900 text-white rounded-lg flex items-center justify-between text-xs animate-fade-in shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
            <span className="font-semibold">{generalSettingsFeedback}</span>
          </div>
          <button onClick={() => setGeneralSettingsFeedback("")} className="text-slate-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4 Navigation Tabs Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-100/70 p-1.5 rounded-xl border border-slate-200/80">
        <button
          type="button"
          onClick={() => setGeneralSettingsTab("whatsapp")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
            generalSettingsTab === "whatsapp"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-transparent text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>1. WhatsApp Optimization</span>
        </button>

        <button
          type="button"
          onClick={() => setGeneralSettingsTab("social")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
            generalSettingsTab === "social"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-transparent text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>2. Social Media Links</span>
        </button>

        <button
          type="button"
          onClick={() => setGeneralSettingsTab("company")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
            generalSettingsTab === "company"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-transparent text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <Building className="w-3.5 h-3.5" />
          <span>3. Company Profile &amp; Hours</span>
        </button>

        <button
          type="button"
          onClick={() => setGeneralSettingsTab("security")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-bold text-xs transition-all cursor-pointer ${
            generalSettingsTab === "security"
              ? "bg-slate-900 text-white shadow-xs"
              : "bg-transparent text-slate-600 hover:text-slate-950 hover:bg-white/60"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>4. Admin Security &amp; Credentials</span>
        </button>
      </div>

      {/* TAB 1: WhatsApp Optimization */}
      {generalSettingsTab === "whatsapp" && (
        <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs space-y-0">
          <div className="bg-[#070D18] text-white p-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Centralized WhatsApp Optimization
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Controls target WhatsApp number for all floating widgets, service CTAs &amp; contact buttons
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanDigits(activeWhatsApp)}?text=${encodeURIComponent(defaultGreetingMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 w-fit"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Test WhatsApp Redirection</span>
            </a>
          </div>

          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 text-xs">
                    WhatsApp Target Phone Number
                  </label>
                  <span className="text-[11px] font-mono text-slate-500 font-semibold">
                    Clean Digits: <strong className="text-slate-900">{cleanDigits(activeWhatsApp) || "None"}</strong>
                  </span>
                </div>
                <input
                  type="text"
                  value={activeWhatsApp}
                  onChange={(e) => setActiveWhatsApp(e.target.value)}
                  placeholder="+973 33048555"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
                />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Accepts international format with country code (e.g. <span className="font-mono text-slate-700 font-semibold">+973 33048555</span> or <span className="font-mono text-slate-700 font-semibold">97333048555</span>). All non-digit symbols are stripped automatically for <code className="font-mono text-slate-800">wa.me</code> links.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-900 text-xs block">
                  Public Display Phone Number Format
                </label>
                <input
                  type="text"
                  value={publicDisplayPhone}
                  onChange={(e) => setPublicDisplayPhone(e.target.value)}
                  placeholder="+973 3304 8555"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
                />
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Formatted text shown visually in Header, Footer, and Contact cards for visitors to read.
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-700" />
                  <span>Target Notification Email Address</span>
                </label>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 text-[10px] font-bold rounded">
                  CONNECTED TO INQUIRIES
                </span>
              </div>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                placeholder="office@skylinkec.com"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800 transition-colors"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Direct client inquiry forms on the website send notification alerts &amp; submissions directly to this email address.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900 text-xs block">
                Default WhatsApp Initial Greeting Message
              </label>
              <textarea
                rows={3}
                value={defaultGreetingMessage}
                onChange={(e) => setDefaultGreetingMessage(e.target.value)}
                placeholder="Hello Skylink Acoustics, I would like to inquire about acoustic engineering consultation and architectural soundproofing services."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800 transition-colors leading-relaxed"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                This is the default message pre-filled in the user's WhatsApp input box when clicking general consultation links.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-900" />
                  <span className="font-bold text-slate-900 text-xs">
                    Real-Time WhatsApp Target Link Status
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-slate-900 text-white text-[10px] font-bold rounded">
                  ONLINE &amp; ROUTING ACTIVE
                </span>
              </div>

              <div className="p-2.5 bg-white border border-slate-200 rounded-lg font-mono text-[11px] text-slate-800 break-all select-all">
                {`https://wa.me/${cleanDigits(activeWhatsApp)}?text=${encodeURIComponent(defaultGreetingMessage)}`}
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const link = `https://wa.me/${cleanDigits(activeWhatsApp)}?text=${encodeURIComponent(defaultGreetingMessage)}`;
                    navigator.clipboard.writeText(link);
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                      <span>Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-700" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${cleanDigits(activeWhatsApp)}?text=${encodeURIComponent(defaultGreetingMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-md font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Test Live Redirection</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    Registered WhatsApp Routing Lines
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Configure multiple phone numbers for departments or campaigns and switch active target instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWaModalForm({ name: "", phone: "", setActiveImmediately: true });
                    setIsAddWaModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Another Number</span>
                </button>
              </div>

              {whatsAppNumbers.length === 0 ? (
                <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-slate-500 text-xs">
                  Current primary number is <strong className="text-slate-900 font-mono">{activeWhatsApp}</strong>. Click "+ Add Another Number" to register alternate lines.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {whatsAppNumbers.map((item) => {
                    const isActive = item.phone === activeWhatsApp || cleanDigits(item.phone) === cleanDigits(activeWhatsApp);
                    return (
                      <div
                        key={item.id}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isActive
                            ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                            : "bg-white text-slate-900 border-slate-200 hover:border-slate-400"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="min-w-0">
                            <div className="font-bold text-xs truncate">{item.name}</div>
                            <div className={`font-mono text-xs font-semibold ${isActive ? "text-slate-200" : "text-slate-600"}`}>
                              {item.phone}
                            </div>
                          </div>
                          {isActive && (
                            <span className="px-2 py-0.5 bg-white text-slate-950 font-bold text-[9px] rounded uppercase shrink-0">
                              ACTIVE
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-200/20 text-[11px]">
                          {isActive ? (
                            <span className="text-slate-300 font-medium">Currently Live</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetActiveWhatsApp(item.id)}
                              disabled={waActionLoading}
                              className="font-bold text-slate-900 hover:underline cursor-pointer"
                            >
                              Set as Active
                            </button>
                          )}

                          {whatsAppNumbers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteWhatsAppNumber(item.id)}
                              disabled={waActionLoading}
                              className={`hover:opacity-75 cursor-pointer ${isActive ? "text-slate-300" : "text-slate-400 hover:text-slate-900"}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Social Media Links */}
      {generalSettingsTab === "social" && (
        <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-[#070D18] text-white p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Social Media &amp; Public Channels
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Links to official company channels displayed in header, footer, and contact touchpoints.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">Instagram Profile URL</label>
                <input
                  type="url"
                  value={socialLinks.instagram}
                  onChange={(e) => setSocialLinks({ ...socialLinks, instagram: e.target.value })}
                  placeholder="https://instagram.com/skylinkacoustics"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">LinkedIn Company Page URL</label>
                <input
                  type="url"
                  value={socialLinks.linkedin}
                  onChange={(e) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/company/skylink-acoustics"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">Facebook Page URL</label>
                <input
                  type="url"
                  value={socialLinks.facebook}
                  onChange={(e) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
                  placeholder="https://facebook.com/skylinkacoustics"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">YouTube Channel URL</label>
                <input
                  type="url"
                  value={socialLinks.youtube}
                  onChange={(e) => setSocialLinks({ ...socialLinks, youtube: e.target.value })}
                  placeholder="https://youtube.com/@skylinkacoustics"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveGeneralSettings()}
                disabled={isSavingGeneralSettings}
                className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Social Channels</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Company Profile & Hours */}
      {generalSettingsTab === "company" && (
        <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-[#070D18] text-white p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Company Identity &amp; Operating Hours
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Official corporate identity shown across public disclosures, website footers, and consultation notices.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">Legal Corporate Entity Name</label>
                <input
                  type="text"
                  value={companyProfile.legalName}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, legalName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">City &amp; Country</label>
                <input
                  type="text"
                  value={companyProfile.cityCountry}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, cityCountry: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-800 text-xs">Primary Physical HQ Address</label>
                <input
                  type="text"
                  value={companyProfile.address}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="font-bold text-slate-800 text-xs">Engineering Consultation Hours</label>
                <input
                  type="text"
                  value={companyProfile.hours}
                  onChange={(e) => setCompanyProfile({ ...companyProfile, hours: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => handleSaveGeneralSettings()}
                disabled={isSavingGeneralSettings}
                className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile &amp; Hours</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Admin Security & Credentials */}
      {generalSettingsTab === "security" && (
        <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-2xs">
          <div className="bg-[#070D18] text-white p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  Admin Security &amp; Credentials
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Update master authentication email and portal passcode.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-xl space-y-4">
            <form onSubmit={handleUpdateCredentials} className="space-y-3.5">
              {settingsError && (
                <div className="p-3 bg-slate-100 border border-slate-300 text-slate-900 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-slate-900 shrink-0" />
                  <span>{settingsError}</span>
                </div>
              )}
              {settingsSuccess && (
                <div className="p-3 bg-slate-900 text-white rounded-lg text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>{settingsSuccess}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">Admin Access Email</label>
                <input
                  type="email"
                  value={settingsForm.newEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, newEmail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-800 text-xs">Current Passcode</label>
                <input
                  type="password"
                  value={settingsForm.currentPassword}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currentPassword: e.target.value })}
                  placeholder="Current password (default: skylink2026)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-xs">New Passcode</label>
                  <input
                    type="password"
                    value={settingsForm.newPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, newPassword: e.target.value })}
                    placeholder="New secure passcode"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-800 text-xs">Confirm New Passcode</label>
                  <input
                    type="password"
                    value={settingsForm.confirmPassword}
                    onChange={(e) => setSettingsForm({ ...settingsForm, confirmPassword: e.target.value })}
                    placeholder="Repeat new passcode"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-800"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Update Credentials</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
    </div>
  );
}
